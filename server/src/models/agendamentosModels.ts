import prismaClient from "../tools/prisma";
import { parseAndValidateGoogleMapsUrl } from "../utils/safeGoogleMapsUrl";
import type { ParsedPagination } from "../utils/pagination";

//Interface do agendamento
interface IAgendamento {
    nome: string;
    endereco: string;
    numero: string;
    setor: string;
    cep: string;
    telefone: string;
    datavisita: string;
    fotos?: string; // JSON array com URLs das fotos
    google_maps_url?: string; // URL do Google Maps ou coordenadas
    id_turno: number;
    id_user?: number;
    status?: AgendamentoStatus;
}

interface IUpdateAgendamento {
    nome?: string;
    endereco?: string;
    numero?: string;
    setor?: string;
    cep?: string;
    telefone?: string;
    datavisita?: string;
    fotos?: string;
    google_maps_url?: string; // URL do Google Maps ou coordenadas
    id_turno?: number;
    id_user?: number;
    status?: AgendamentoStatus;
}

export type AgendamentoStatus = "AGUARDANDO_AGENDAMENTO" | "VISITA_MARCADA_PARA_HOJE" | "VISITADO";

function isAgendamentoStatus(value: unknown): value is AgendamentoStatus {
    return value === "AGUARDANDO_AGENDAMENTO" || value === "VISITA_MARCADA_PARA_HOJE" || value === "VISITADO";
}

function validateStatusTransition(current: AgendamentoStatus, next: AgendamentoStatus, allowRollback = true) {
    if (current === next) return;

    if (allowRollback) return;

    const allowedForward: Record<AgendamentoStatus, AgendamentoStatus[]> = {
        AGUARDANDO_AGENDAMENTO: ["VISITA_MARCADA_PARA_HOJE"],
        VISITA_MARCADA_PARA_HOJE: ["VISITADO"],
        VISITADO: [],
    };

    if (!allowedForward[current].includes(next)) {
        throw new Error("Transição de status inválida");
    }
}

//Modelo de criar agendamento
class CreateAgendamentosModel{
    async execute({ nome, endereco, numero, setor, cep, telefone, datavisita, fotos, google_maps_url, id_turno, id_user }: 
        IAgendamento) {
        const agendamento = await prismaClient.agendamentos.create({
            data: {
                nome: nome,
                endereco: endereco,
                numero: numero,
                setor: setor,
                cep: cep,
                telefone: telefone,
                datavisita: datavisita,
                fotos: fotos || null,
                google_maps_url: google_maps_url || null,
                id_turno: id_turno,
                id_user: id_user,
                status: "AGUARDANDO_AGENDAMENTO",
            },
            include: {
                turno: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        });
        return agendamento;
    }
}

//Modelo de listar agendamentos
class ListAgendamentosModel {
    async execute(p: ParsedPagination, opts?: { q?: string; status?: AgendamentoStatus }) {
        const t = opts?.q?.trim();
        const filtroStatus = opts?.status;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const andParts: any[] = [];
        if (filtroStatus) {
            andParts.push({ status: filtroStatus });
        }
        if (t) {
            const digits = t.replace(/\D/g, "");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const OR: any[] = [
                { nome: { contains: t, mode: "insensitive" } },
                { endereco: { contains: t, mode: "insensitive" } },
                { setor: { contains: t, mode: "insensitive" } },
            ];
            if (digits.length > 0) {
                OR.push({ telefone: { contains: digits } });
            }
            andParts.push({ OR });
        }
        const where = andParts.length > 0 ? { AND: andParts } : {};

        const base = {
            where,
            include: {
                turno: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            },
            orderBy: {
                created: 'desc' as const
            }
        };
        const [total, items] = await Promise.all([
            prismaClient.agendamentos.count({ where }),
            prismaClient.agendamentos.findMany({
                ...base,
                skip: p.skip,
                take: p.take,
            }),
        ]);
        return { items, total };
    }
}

//Modelo de visualizar agendamento
class GetAgendamentoModel {
    async execute(id: number) {
        const agendamento = await prismaClient.agendamentos.findUnique({
            where: {
                id: id
            },
            include: {
                turno: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        });
        
        if (!agendamento) {
            throw new Error("Agendamento não encontrado");
        }
        
        return agendamento;
    }
}

//Modelo de editar agendamento
class UpdateAgendamentoModel {
    async execute(id: number, data: IUpdateAgendamento) {
        // Verificar se o agendamento existe
        const agendamentoExists = await prismaClient.agendamentos.findUnique({
            where: { id: id }
        });
        
        if (!agendamentoExists) {
            throw new Error("Agendamento não encontrado");
        }
        
        const updateData: any = {};
        
        if (data.nome) updateData.nome = data.nome;
        if (data.endereco) updateData.endereco = data.endereco;
        if (data.numero) updateData.numero = data.numero;
        if (data.setor) updateData.setor = data.setor;
        if (data.cep) updateData.cep = data.cep;
        if (data.telefone) updateData.telefone = data.telefone;
        if (data.datavisita !== undefined) updateData.datavisita = data.datavisita;
        if (data.fotos !== undefined) updateData.fotos = data.fotos;
        if (data.google_maps_url !== undefined) {
            updateData.google_maps_url = parseAndValidateGoogleMapsUrl(data.google_maps_url);
        }
        if (data.id_turno) updateData.id_turno = data.id_turno;
        if (data.id_user !== undefined) updateData.id_user = data.id_user;
        if (data.status !== undefined) {
            if (!isAgendamentoStatus(data.status)) {
                throw new Error("Status de agendamento inválido");
            }
            const currentStatus = (agendamentoExists.status as AgendamentoStatus) || "AGUARDANDO_AGENDAMENTO";
            validateStatusTransition(currentStatus, data.status, true);
            updateData.status = data.status;
            if (data.status !== "VISITADO") {
                updateData.id_user = null;
            } else if (updateData.id_user === undefined && agendamentoExists.id_user == null) {
                throw new Error("É necessário informar o usuário responsável ao marcar como visitado");
            }
        }
        
        const agendamento = await prismaClient.agendamentos.update({
            where: {
                id: id
            },
            data: updateData,
            include: {
                turno: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        });
        
        return agendamento;
    }
}

//Modelo de marcar agendamento como visitado
class MarcarVisitadoModel {
    async execute(id: number, idUserVisitou: number) {
        const agendamentoExists = await prismaClient.agendamentos.findUnique({
            where: { id: id }
        });
        
        if (!agendamentoExists) {
            throw new Error("Agendamento não encontrado");
        }
        
        const currentStatus = (agendamentoExists.status as AgendamentoStatus) || "AGUARDANDO_AGENDAMENTO";
        if (currentStatus === "VISITADO") {
            throw new Error("Agendamento já foi visitado");
        }
        if (currentStatus !== "VISITA_MARCADA_PARA_HOJE") {
            throw new Error("Para concluir a visita, primeiro marque como 'Visita marcada para hoje'");
        }
        
        const agendamento = await prismaClient.agendamentos.update({
            where: {
                id: id
            },
            data: {
                id_user: idUserVisitou,
                status: "VISITADO"
            },
            include: {
                turno: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        });
        
        return agendamento;
    }
}

class AtualizarStatusAgendamentoModel {
    async execute(id: number, status: AgendamentoStatus, idUserVisitou?: number | null) {
        if (!isAgendamentoStatus(status)) {
            throw new Error("Status de agendamento inválido");
        }

        const agendamentoExists = await prismaClient.agendamentos.findUnique({
            where: { id },
        });
        if (!agendamentoExists) {
            throw new Error("Agendamento não encontrado");
        }

        const currentStatus = (agendamentoExists.status as AgendamentoStatus) || "AGUARDANDO_AGENDAMENTO";
        validateStatusTransition(currentStatus, status, false);

        if (status === "VISITADO" && (!idUserVisitou || Number.isNaN(idUserVisitou))) {
            throw new Error("É necessário informar o usuário responsável ao marcar como visitado");
        }

        const agendamento = await prismaClient.agendamentos.update({
            where: { id },
            data: {
                status,
                id_user: status === "VISITADO" ? idUserVisitou! : null,
            },
            include: {
                turno: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
            },
        });
        return agendamento;
    }
}

//Modelo de deletar agendamento
class DeleteAgendamentoModel {
    async execute(id: number) {
        const agendamentoExists = await prismaClient.agendamentos.findUnique({
            where: { id: id }
        });
        
        if (!agendamentoExists) {
            throw new Error("Agendamento não encontrado");
        }
        
        await prismaClient.agendamentos.delete({
            where: {
                id: id
            }
        });
        
        return { message: "Agendamento deletado com sucesso" };
    }
}

export {
    CreateAgendamentosModel,
    ListAgendamentosModel,
    GetAgendamentoModel,
    UpdateAgendamentoModel,
    MarcarVisitadoModel,
    AtualizarStatusAgendamentoModel,
    DeleteAgendamentoModel
}

