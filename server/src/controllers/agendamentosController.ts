import { Request, Response } from "express";
import { parsePaginationParams, paginatedResponse } from "../utils/pagination";
import {
    CreateAgendamentosModel,
    ListAgendamentosModel,
    GetAgendamentoModel,
    UpdateAgendamentoModel,
    MarcarVisitadoModel,
    AtualizarStatusAgendamentoModel,
    DeleteAgendamentoModel,
    AgendamentoStatus
} from "../models/agendamentosModels";
import { uploadMultiple } from "../middlewares/upload";
import { attachUploadTokensToAgendamentoFotos, attachUploadTokensToAgendamentos } from "../utils/responseTransforms";
import { whatsappService } from "../services/whatsapp/whatsappService";

function parseStatusFilter(raw?: string): AgendamentoStatus | undefined {
    if (!raw || raw === "todos") return undefined;
    if (raw === "aguardando_agendamento") return "AGUARDANDO_AGENDAMENTO";
    if (raw === "visita_marcada_hoje") return "VISITA_MARCADA_PARA_HOJE";
    if (raw === "visitado") return "VISITADO";
    // Compatibilidade com links antigos
    if (raw === "visitados") return "VISITADO";
    if (raw === "nao-visitados") return "AGUARDANDO_AGENDAMENTO";
    return undefined;
}

function formatPhoneForWhatsApp(telefone: string): string {
    const digits = telefone.replace(/\D/g, "");
    if (digits.startsWith("55")) return digits;
    return `55${digits}`;
}

async function notifyVisitaMarcadaHoje(agendamento: any) {
    const telefone = agendamento?.telefone;
    if (!telefone) return;
    if (!whatsappService.isConnected()) return;

    const message = `Olá ${agendamento.nome}!\n\n` +
        `Sua visita foi marcada para hoje.\n` +
        `📍 Endereço: ${agendamento.endereco}, ${agendamento.numero}\n` +
        `🕒 Turno: ${agendamento.turno?.descricao || "Não informado"}\n\n` +
        `Nossa equipe entrará em contato se necessário.`;

    await whatsappService.sendMessage(formatPhoneForWhatsApp(telefone), message);
}

class CreateAgendamentosController{
    async handle(request: Request, response: Response) {
        try {
            // Processar upload de fotos primeiro
            uploadMultiple(request, response, async (err) => {
                if (err) {
                    return response.status(400).json({ error: err.message });
                }

                try {
                    const { nome, endereco, numero, setor, cep, telefone, datavisita, google_maps_url, id_turno, id_user } = request.body;
                    const parsedIdUser = id_user != null && String(id_user) !== "" && String(id_user) !== "null"
                        ? Number(id_user)
                        : undefined;
                    
                    // Processar fotos enviadas
                    let fotosJson: string | undefined = undefined;
                    if (request.files && Array.isArray(request.files) && request.files.length > 0) {
                        const fotosUrls = (request.files as Express.Multer.File[]).map(file => {
                            // Retornar URL relativa para acesso
                            return `/uploads/agendamentos/${file.filename}`;
                        });
                        fotosJson = JSON.stringify(fotosUrls);
                    }

                    const createAgendamentos = new CreateAgendamentosModel();

                    const agendamento = await createAgendamentos.execute({
                        nome,
                        endereco,
                        numero,
                        setor,
                        cep,
                        telefone,
                        datavisita,
                        fotos: fotosJson,
                        google_maps_url: google_maps_url || undefined,
                        id_turno: parseInt(id_turno),
                        id_user: Number.isNaN(parsedIdUser) ? undefined : parsedIdUser
                    });
                    return response.status(201).json(attachUploadTokensToAgendamentoFotos(agendamento));
                } catch (error: any) {
                    return response.status(400).json({ error: error.message });
                }
            });
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

class ListAgendamentosController {
    async handle(request: Request, response: Response) {
        try {
            const p = parsePaginationParams(request.query);
            const q = request.query.q ? String(request.query.q) : undefined;
            const filtro = request.query.filtro ? String(request.query.filtro) : "todos";
            const status = parseStatusFilter(filtro);
            const listAgendamentos = new ListAgendamentosModel();
            const { items, total } = await listAgendamentos.execute(p, { q, status });
            const data = attachUploadTokensToAgendamentos(items);
            return response.json(paginatedResponse(data, total, p.page, p.pageSize));
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

class GetAgendamentoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const getAgendamento = new GetAgendamentoModel();
            const agendamento = await getAgendamento.execute(parseInt(id));
            return response.json(attachUploadTokensToAgendamentoFotos(agendamento));
        } catch (error: any) {
            return response.status(404).json({ error: error.message });
        }
    }
}

class UpdateAgendamentoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { nome, endereco, numero, setor, cep, telefone, datavisita, fotos, google_maps_url, id_turno, id_user } = request.body;
            const parsedIdUser = id_user != null && String(id_user) !== "" && String(id_user) !== "null"
                ? Number(id_user)
                : undefined;
            const updateAgendamento = new UpdateAgendamentoModel();
            const getAgendamento = new GetAgendamentoModel();
            const before = await getAgendamento.execute(parseInt(id));
            
            const agendamento = await updateAgendamento.execute(parseInt(id), {
                nome,
                endereco,
                numero,
                setor,
                cep,
                telefone,
                datavisita,
                fotos,
                google_maps_url: google_maps_url || undefined,
                id_turno: id_turno ? parseInt(id_turno) : undefined,
                id_user: Number.isNaN(parsedIdUser) ? undefined : parsedIdUser,
                status: request.body.status || undefined,
            });

            if (before.status !== "VISITA_MARCADA_PARA_HOJE" && agendamento.status === "VISITA_MARCADA_PARA_HOJE") {
                await notifyVisitaMarcadaHoje(agendamento);
            }
            
            return response.json(attachUploadTokensToAgendamentoFotos(agendamento));
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

class MarcarVisitadoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const userId = request.query.userId as string;
            
            if (!userId) {
                return response.status(401).json({ error: "User ID not found" });
            }
            
            const marcarVisitado = new MarcarVisitadoModel();
            
            const agendamento = await marcarVisitado.execute(parseInt(id), parseInt(userId));
            
            return response.json(attachUploadTokensToAgendamentoFotos(agendamento));
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

class AtualizarStatusAgendamentoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { status } = request.body as { status?: AgendamentoStatus };
            if (!status) {
                return response.status(400).json({ error: "Status é obrigatório" });
            }
            const userIdQuery = request.query.userId ? Number(request.query.userId) : undefined;
            const userIdFromReq = (request as any).user?.id ? Number((request as any).user.id) : undefined;
            const idUserVisitou = userIdQuery || userIdFromReq;

            const atualizarStatus = new AtualizarStatusAgendamentoModel();
            const agendamento = await atualizarStatus.execute(parseInt(id), status, idUserVisitou);

            if (status === "VISITA_MARCADA_PARA_HOJE") {
                await notifyVisitaMarcadaHoje(agendamento);
            }

            return response.json(attachUploadTokensToAgendamentoFotos(agendamento));
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

class DeleteAgendamentoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const deleteAgendamento = new DeleteAgendamentoModel();
            
            const result = await deleteAgendamento.execute(parseInt(id));
            
            return response.json(result);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export {
    CreateAgendamentosController,
    ListAgendamentosController,
    GetAgendamentoController,
    UpdateAgendamentoController,
    MarcarVisitadoController,
    AtualizarStatusAgendamentoController,
    DeleteAgendamentoController
}