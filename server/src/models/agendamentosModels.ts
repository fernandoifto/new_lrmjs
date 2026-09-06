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
    id_user_marcado?: number | null;
}

export type AgendamentoStatus = "AGUARDANDO_AGENDAMENTO" | "VISITA_MARCADA_PARA_HOJE" | "VISITADO";

export type AgendamentoSortField = "created" | "nome" | "setor" | "datavisita";

export interface AgendamentoViewerContext {
    userId: number;
    canViewAll: boolean;
}

export interface ListAgendamentosOptions {
    q?: string;
    status?: AgendamentoStatus;
    id_turno?: number;
    setor?: string;
    sortBy?: AgendamentoSortField;
    sortOrder?: "asc" | "desc";
    viewer?: AgendamentoViewerContext;
}

const userSelect = {
    id: true,
    username: true,
    email: true,
} as const;

const agendamentoInclude = {
    turno: true,
    user: { select: userSelect },
    userMarcado: { select: userSelect },
} as const;

function buildSearchWhere(term: string) {
    const digits = term.replace(/\D/g, "");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const OR: any[] = [
        { nome: { contains: term, mode: "insensitive" } },
        { endereco: { contains: term, mode: "insensitive" } },
        { setor: { contains: term, mode: "insensitive" } },
        { datavisita: { contains: term, mode: "insensitive" } },
        { turno: { descricao: { contains: term, mode: "insensitive" } } },
    ];
    if (digits.length > 0) {
        OR.push({ telefone: { contains: digits } });
        OR.push({ cep: { contains: digits } });
    }
    return { OR };
}

function buildOrderBy(sortBy: AgendamentoSortField, sortOrder: "asc" | "desc") {
    if (sortBy === "nome" || sortBy === "setor" || sortBy === "datavisita") {
        return { [sortBy]: sortOrder };
    }
    return { created: sortOrder };
}

function isAgendamentoStatus(value: unknown): value is AgendamentoStatus {
    return value === "AGUARDANDO_AGENDAMENTO" || value === "VISITA_MARCADA_PARA_HOJE" || value === "VISITADO";
}

function validateStatusTransition(current: AgendamentoStatus, next: AgendamentoStatus) {
    if (current === next) return;

    const allowed: Record<AgendamentoStatus, AgendamentoStatus[]> = {
        AGUARDANDO_AGENDAMENTO: ["VISITA_MARCADA_PARA_HOJE"],
        VISITA_MARCADA_PARA_HOJE: ["VISITADO", "AGUARDANDO_AGENDAMENTO"],
        VISITADO: [],
    };

    if (!allowed[current].includes(next)) {
        throw new Error("Transição de status inválida");
    }
}

/** Agentes sem visão elevada só veem "hoje" se forem o dono do claim (ou legado sem claim). */
function buildVisibilityWhere(viewer?: AgendamentoViewerContext) {
    if (!viewer || viewer.canViewAll) return null;
    return {
        OR: [
            { status: { not: "VISITA_MARCADA_PARA_HOJE" } },
            { id_user_marcado: null },
            { id_user_marcado: viewer.userId },
        ],
    };
}

function assertClaimAccess(
    agendamento: { status: string; id_user_marcado: number | null },
    userId: number | undefined,
    canOverrideClaim: boolean,
    actionLabel: string
) {
    if (canOverrideClaim) return;
    if (agendamento.status !== "VISITA_MARCADA_PARA_HOJE") return;
    if (agendamento.id_user_marcado == null) return;
    if (!userId || agendamento.id_user_marcado !== userId) {
        throw new Error(`Este agendamento já está marcado para outro agente. Não é possível ${actionLabel}.`);
    }
}

//Modelo de criar agendamento (público: nunca aceita id_user do cliente)
class CreateAgendamentosModel{
    async execute({ nome, endereco, numero, setor, cep, telefone, datavisita, fotos, google_maps_url, id_turno }: 
        IAgendamento) {
        const safeMapsUrl = parseAndValidateGoogleMapsUrl(google_maps_url);
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
                google_maps_url: safeMapsUrl,
                id_turno: id_turno,
                id_user: null,
                status: "AGUARDANDO_AGENDAMENTO",
            },
            include: agendamentoInclude,
        });
        return agendamento;
    }
}

//Modelo de listar agendamentos
class ListAgendamentosModel {
    async execute(p: ParsedPagination, opts?: ListAgendamentosOptions) {
        const t = opts?.q?.trim();
        const filtroStatus = opts?.status;
        const sortBy = opts?.sortBy ?? "created";
        const sortOrder = opts?.sortOrder ?? "desc";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const andParts: any[] = [];
        const visibility = buildVisibilityWhere(opts?.viewer);
        if (visibility) {
            andParts.push(visibility);
        }
        if (filtroStatus) {
            andParts.push({ status: filtroStatus });
        }
        if (opts?.id_turno) {
            andParts.push({ id_turno: opts.id_turno });
        }
        if (opts?.setor?.trim()) {
            andParts.push({ setor: { equals: opts.setor.trim(), mode: "insensitive" } });
        }
        if (t) {
            andParts.push(buildSearchWhere(t));
        }
        const where = andParts.length > 0 ? { AND: andParts } : {};

        const base = {
            where,
            include: agendamentoInclude,
            orderBy: buildOrderBy(sortBy, sortOrder),
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

class AgendamentosStatsModel {
    async execute(viewer?: AgendamentoViewerContext) {
        const visibility = buildVisibilityWhere(viewer);
        const baseWhere = visibility ? { AND: [visibility] } : {};

        const [total, aguardando, visitaHoje, visitado, setoresRows] = await Promise.all([
            prismaClient.agendamentos.count({ where: baseWhere }),
            prismaClient.agendamentos.count({
                where: visibility
                    ? { AND: [visibility, { status: "AGUARDANDO_AGENDAMENTO" }] }
                    : { status: "AGUARDANDO_AGENDAMENTO" },
            }),
            prismaClient.agendamentos.count({
                where: visibility
                    ? { AND: [visibility, { status: "VISITA_MARCADA_PARA_HOJE" }] }
                    : { status: "VISITA_MARCADA_PARA_HOJE" },
            }),
            prismaClient.agendamentos.count({
                where: visibility
                    ? { AND: [visibility, { status: "VISITADO" }] }
                    : { status: "VISITADO" },
            }),
            prismaClient.agendamentos.findMany({
                where: baseWhere,
                select: { setor: true },
                distinct: ["setor"],
                orderBy: { setor: "asc" },
            }),
        ]);

        return {
            total,
            aguardando_agendamento: aguardando,
            visita_marcada_hoje: visitaHoje,
            visitado,
            setores: setoresRows.map((row) => row.setor).filter(Boolean),
        };
    }
}

//Modelo de visualizar agendamento
class GetAgendamentoModel {
    async execute(id: number, viewer?: AgendamentoViewerContext) {
        const agendamento = await prismaClient.agendamentos.findUnique({
            where: {
                id: id
            },
            include: {
                ...agendamentoInclude,
                lotes: {
                    include: {
                        medicamento: true,
                        formaFarmaceutica: true,
                        tipoMedicamento: true,
                    },
                    orderBy: { created: "desc" },
                },
            }
        });
        
        if (!agendamento) {
            throw new Error("Agendamento não encontrado");
        }

        if (
            viewer &&
            !viewer.canViewAll &&
            agendamento.status === "VISITA_MARCADA_PARA_HOJE" &&
            agendamento.id_user_marcado != null &&
            agendamento.id_user_marcado !== viewer.userId
        ) {
            throw new Error("Agendamento não encontrado");
        }
        
        return agendamento;
    }
}

//Modelo de editar agendamento
class UpdateAgendamentoModel {
    async execute(
        id: number,
        data: IUpdateAgendamento,
        opts?: { actorUserId?: number; canOverrideClaim?: boolean }
    ) {
        // Verificar se o agendamento existe
        const agendamentoExists = await prismaClient.agendamentos.findUnique({
            where: { id: id }
        });
        
        if (!agendamentoExists) {
            throw new Error("Agendamento não encontrado");
        }
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            validateStatusTransition(currentStatus, data.status);
            if (currentStatus === "VISITADO" && data.status !== "VISITADO") {
                const lotesVinculados = await prismaClient.lotes.count({ where: { id_agendamento: id } });
                if (lotesVinculados > 0) {
                    throw new Error("Não é possível alterar o status de um agendamento que possui lotes vinculados");
                }
            }
            updateData.status = data.status;
            if (data.status === "VISITA_MARCADA_PARA_HOJE") {
                if (!opts?.actorUserId) {
                    throw new Error("É necessário informar o agente que está marcando a visita");
                }
                assertClaimAccess(
                    agendamentoExists,
                    opts.actorUserId,
                    Boolean(opts?.canOverrideClaim),
                    "alterar"
                );
                updateData.id_user = null;
                updateData.id_user_marcado = opts.actorUserId;
            } else if (data.status === "AGUARDANDO_AGENDAMENTO") {
                assertClaimAccess(
                    agendamentoExists,
                    opts?.actorUserId,
                    Boolean(opts?.canOverrideClaim),
                    "desmarcar"
                );
                updateData.id_user = null;
                updateData.id_user_marcado = null;
            } else if (data.status === "VISITADO") {
                assertClaimAccess(
                    agendamentoExists,
                    opts?.actorUserId,
                    Boolean(opts?.canOverrideClaim),
                    "concluir"
                );
                if (updateData.id_user === undefined && agendamentoExists.id_user == null && !opts?.actorUserId) {
                    throw new Error("É necessário informar o usuário responsável ao marcar como visitado");
                }
                if (updateData.id_user === undefined && opts?.actorUserId) {
                    updateData.id_user = opts.actorUserId;
                }
            }
        }
        
        const agendamento = await prismaClient.agendamentos.update({
            where: {
                id: id
            },
            data: updateData,
            include: agendamentoInclude,
        });
        
        return agendamento;
    }
}

//Modelo de marcar agendamento como visitado
class MarcarVisitadoModel {
    async execute(id: number, idUserVisitou: number, canOverrideClaim = false) {
        const atualizar = new AtualizarStatusAgendamentoModel();
        return atualizar.execute(id, "VISITADO", {
            idUser: idUserVisitou,
            canOverrideClaim,
        });
    }
}

class AtualizarStatusAgendamentoModel {
    async execute(
        id: number,
        status: AgendamentoStatus,
        opts?: { idUser?: number | null; canOverrideClaim?: boolean }
    ) {
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
        validateStatusTransition(currentStatus, status);

        if (currentStatus === "VISITADO" && status !== "VISITADO") {
            const lotesVinculados = await prismaClient.lotes.count({ where: { id_agendamento: id } });
            if (lotesVinculados > 0) {
                throw new Error("Não é possível alterar o status de um agendamento que possui lotes vinculados");
            }
        }

        const idUser = opts?.idUser ?? null;
        const canOverrideClaim = Boolean(opts?.canOverrideClaim);

        if (status === "VISITADO" && (!idUser || Number.isNaN(idUser))) {
            throw new Error("É necessário informar o usuário responsável ao marcar como visitado");
        }

        // Claim atômico: evita dois agentes marcarem o mesmo agendamento em paralelo.
        if (status === "VISITA_MARCADA_PARA_HOJE") {
            if (!idUser || Number.isNaN(idUser)) {
                throw new Error("É necessário informar o agente que está marcando a visita");
            }
            const claimed = await prismaClient.agendamentos.updateMany({
                where: {
                    id,
                    status: "AGUARDANDO_AGENDAMENTO",
                },
                data: {
                    status: "VISITA_MARCADA_PARA_HOJE",
                    id_user: null,
                    id_user_marcado: idUser,
                },
            });
            if (claimed.count === 0) {
                throw new Error("Agendamento indisponível para marcação (já reservado ou status alterado)");
            }
            return prismaClient.agendamentos.findUniqueOrThrow({
                where: { id },
                include: agendamentoInclude,
            });
        }

        if (status === "AGUARDANDO_AGENDAMENTO") {
            assertClaimAccess(agendamentoExists, idUser ?? undefined, canOverrideClaim, "desmarcar");
            const whereDesmarcar = canOverrideClaim
                ? { id, status: "VISITA_MARCADA_PARA_HOJE" as const }
                : {
                    id,
                    status: "VISITA_MARCADA_PARA_HOJE" as const,
                    OR: [{ id_user_marcado: idUser }, { id_user_marcado: null }],
                };
            const cleared = await prismaClient.agendamentos.updateMany({
                where: whereDesmarcar,
                data: {
                    status: "AGUARDANDO_AGENDAMENTO",
                    id_user: null,
                    id_user_marcado: null,
                },
            });
            if (cleared.count === 0) {
                throw new Error("Não foi possível desmarcar este agendamento");
            }
            return prismaClient.agendamentos.findUniqueOrThrow({
                where: { id },
                include: agendamentoInclude,
            });
        }

        // VISITADO
        assertClaimAccess(agendamentoExists, idUser ?? undefined, canOverrideClaim, "concluir");
        const whereVisitar = canOverrideClaim
            ? { id, status: "VISITA_MARCADA_PARA_HOJE" as const }
            : {
                id,
                status: "VISITA_MARCADA_PARA_HOJE" as const,
                OR: [{ id_user_marcado: idUser }, { id_user_marcado: null }],
            };
        const visited = await prismaClient.agendamentos.updateMany({
            where: whereVisitar,
            data: {
                status: "VISITADO",
                id_user: idUser!,
            },
        });
        if (visited.count === 0) {
            throw new Error("Não foi possível concluir a visita deste agendamento");
        }
        return prismaClient.agendamentos.findUniqueOrThrow({
            where: { id },
            include: agendamentoInclude,
        });
    }
}

//Modelo de deletar agendamento
class DeleteAgendamentoModel {
    async execute(id: number, viewer?: AgendamentoViewerContext) {
        const agendamentoExists = await prismaClient.agendamentos.findUnique({
            where: { id: id }
        });
        
        if (!agendamentoExists) {
            throw new Error("Agendamento não encontrado");
        }

        if (
            viewer &&
            !viewer.canViewAll &&
            agendamentoExists.status === "VISITA_MARCADA_PARA_HOJE" &&
            agendamentoExists.id_user_marcado != null &&
            agendamentoExists.id_user_marcado !== viewer.userId
        ) {
            throw new Error("Agendamento não encontrado");
        }

        const lotesVinculados = await prismaClient.lotes.count({ where: { id_agendamento: id } });
        if (lotesVinculados > 0) {
            throw new Error("Não é possível excluir um agendamento que possui lotes vinculados");
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
    AgendamentosStatsModel,
    GetAgendamentoModel,
    UpdateAgendamentoModel,
    MarcarVisitadoModel,
    AtualizarStatusAgendamentoModel,
    DeleteAgendamentoModel
}
