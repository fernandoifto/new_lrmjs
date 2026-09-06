import { Request, Response } from "express";
import { parsePaginationParams, paginatedResponse } from "../utils/pagination";
import {
    CreateAgendamentosModel,
    ListAgendamentosModel,
    AgendamentosStatsModel,
    GetAgendamentoModel,
    UpdateAgendamentoModel,
    MarcarVisitadoModel,
    AtualizarStatusAgendamentoModel,
    DeleteAgendamentoModel,
    AgendamentoStatus,
    AgendamentoSortField,
    AgendamentoViewerContext,
} from "../models/agendamentosModels";
import { uploadMultiple } from "../middlewares/upload";
import { attachUploadTokensToAgendamentoFotos, attachUploadTokensToAgendamentos } from "../utils/responseTransforms";
import { whatsappService } from "../services/whatsapp/whatsappService";
import { userCanViewAllAgendamentos } from "../middlewares/hasPermission";
import { parsePositiveInt, tryParsePositiveInt } from "../utils/parseId";

function parseStatusFilter(raw?: string): AgendamentoStatus | undefined {
    if (!raw || raw === "todos") return undefined;
    if (raw === "aguardando_agendamento") return "AGUARDANDO_AGENDAMENTO";
    if (raw === "visita_marcada_hoje") return "VISITA_MARCADA_PARA_HOJE";
    if (raw === "visitado") return "VISITADO";
    if (raw === "visitados") return "VISITADO";
    if (raw === "nao-visitados") return "AGUARDANDO_AGENDAMENTO";
    return undefined;
}

function formatPhoneForWhatsApp(telefone: string): string {
    const digits = telefone.replace(/\D/g, "");
    if (digits.startsWith("55")) return digits;
    return `55${digits}`;
}

async function notifyVisitaMarcadaHoje(agendamento: {
    nome?: string;
    telefone?: string;
    endereco?: string;
    numero?: string;
    turno?: { descricao?: string } | null;
}) {
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

async function resolveViewer(request: Request): Promise<AgendamentoViewerContext | undefined> {
    const user = request.user;
    if (!user?.id) return undefined;
    const canViewAll = await userCanViewAllAgendamentos(user);
    return { userId: user.id, canViewAll };
}

/** Sempre do token/sessão — nunca de query/body do cliente. */
function resolveActorUserId(request: Request): number | undefined {
    const id = request.user?.id ? Number(request.user.id) : undefined;
    return id && !Number.isNaN(id) ? id : undefined;
}

class CreateAgendamentosController{
    async handle(request: Request, response: Response) {
        try {
            uploadMultiple(request, response, async (err) => {
                if (err) {
                    return response.status(400).json({ error: err.message });
                }

                try {
                    const { nome, endereco, numero, setor, cep, telefone, datavisita, google_maps_url, id_turno } = request.body;

                    let fotosJson: string | undefined = undefined;
                    if (request.files && Array.isArray(request.files) && request.files.length > 0) {
                        const fotosUrls = (request.files as Express.Multer.File[]).map(file => {
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
                        id_turno: parsePositiveInt(id_turno, "Turno"),
                    });
                    return response.status(201).json(attachUploadTokensToAgendamentoFotos(agendamento));
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "Erro ao criar agendamento";
                    return response.status(400).json({ error: message });
                }
            });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao criar agendamento";
            return response.status(400).json({ error: message });
        }
    }
}

function parseSortField(raw?: string): AgendamentoSortField {
    if (raw === "nome" || raw === "setor" || raw === "datavisita" || raw === "created") {
        return raw;
    }
    return "created";
}

function parseSortOrder(raw?: string): "asc" | "desc" {
    return raw === "asc" ? "asc" : "desc";
}

class ListAgendamentosController {
    async handle(request: Request, response: Response) {
        try {
            const p = parsePaginationParams(request.query);
            const q = request.query.q ? String(request.query.q) : undefined;
            const filtro = request.query.filtro ? String(request.query.filtro) : "todos";
            const status = parseStatusFilter(filtro);
            const id_turno = tryParsePositiveInt(request.query.id_turno);
            const setor = request.query.setor ? String(request.query.setor) : undefined;
            const sortBy = parseSortField(request.query.sortBy ? String(request.query.sortBy) : undefined);
            const sortOrder = parseSortOrder(request.query.sortOrder ? String(request.query.sortOrder) : undefined);
            const viewer = await resolveViewer(request);

            const listAgendamentos = new ListAgendamentosModel();
            const { items, total } = await listAgendamentos.execute(p, {
                q,
                status,
                id_turno,
                setor,
                sortBy,
                sortOrder,
                viewer,
            });
            const data = attachUploadTokensToAgendamentos(items);
            return response.json(paginatedResponse(data, total, p.page, p.pageSize));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao listar agendamentos";
            return response.status(400).json({ error: message });
        }
    }
}

class AgendamentosStatsController {
    async handle(request: Request, response: Response) {
        try {
            const viewer = await resolveViewer(request);
            const stats = new AgendamentosStatsModel();
            const data = await stats.execute(viewer);
            return response.json(data);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao carregar estatísticas";
            return response.status(400).json({ error: message });
        }
    }
}

class GetAgendamentoController {
    async handle(request: Request, response: Response) {
        try {
            const id = parsePositiveInt(request.params.id, "ID do agendamento");
            const viewer = await resolveViewer(request);
            const getAgendamento = new GetAgendamentoModel();
            const agendamento = await getAgendamento.execute(id, viewer);
            return response.json(attachUploadTokensToAgendamentoFotos(agendamento));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Agendamento não encontrado";
            const status = message.includes("inválido") ? 400 : 404;
            return response.status(status).json({ error: message });
        }
    }
}

class UpdateAgendamentoController {
    async handle(request: Request, response: Response) {
        try {
            const id = parsePositiveInt(request.params.id, "ID do agendamento");
            const { nome, endereco, numero, setor, cep, telefone, datavisita, fotos, google_maps_url, id_turno } = request.body;
            const updateAgendamento = new UpdateAgendamentoModel();
            const getAgendamento = new GetAgendamentoModel();
            const viewer = await resolveViewer(request);
            const before = await getAgendamento.execute(id, viewer);
            const actorUserId = resolveActorUserId(request);
            
            const agendamento = await updateAgendamento.execute(
                id,
                {
                    nome,
                    endereco,
                    numero,
                    setor,
                    cep,
                    telefone,
                    datavisita,
                    fotos,
                    google_maps_url: google_maps_url || undefined,
                    id_turno: id_turno ? parsePositiveInt(id_turno, "Turno") : undefined,
                    status: request.body.status || undefined,
                },
                {
                    actorUserId,
                    canOverrideClaim: Boolean(viewer?.canViewAll),
                }
            );

            if (before.status !== "VISITA_MARCADA_PARA_HOJE" && agendamento.status === "VISITA_MARCADA_PARA_HOJE") {
                await notifyVisitaMarcadaHoje(agendamento);
            }
            
            return response.json(attachUploadTokensToAgendamentoFotos(agendamento));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao atualizar agendamento";
            return response.status(400).json({ error: message });
        }
    }
}

class DesmarcarAgendamentoController {
    async handle(request: Request, response: Response) {
        try {
            const id = parsePositiveInt(request.params.id, "ID do agendamento");
            const viewer = await resolveViewer(request);
            const getAgendamento = new GetAgendamentoModel();
            const existing = await getAgendamento.execute(id, viewer);

            if (existing.status !== "VISITA_MARCADA_PARA_HOJE") {
                return response.status(400).json({ error: "Agendamento não está marcado para hoje" });
            }

            const actorUserId = resolveActorUserId(request);
            if (!actorUserId) {
                return response.status(401).json({ error: "Usuário não autenticado" });
            }

            const atualizarStatus = new AtualizarStatusAgendamentoModel();
            const agendamento = await atualizarStatus.execute(id, "AGUARDANDO_AGENDAMENTO", {
                idUser: actorUserId,
                canOverrideClaim: Boolean(viewer?.canViewAll),
            });

            return response.json(attachUploadTokensToAgendamentoFotos(agendamento));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao desmarcar agendamento";
            return response.status(400).json({ error: message });
        }
    }
}

class MarcarVisitadoController {
    async handle(request: Request, response: Response) {
        try {
            const id = parsePositiveInt(request.params.id, "ID do agendamento");
            const actorUserId = resolveActorUserId(request);
            
            if (!actorUserId) {
                return response.status(401).json({ error: "Usuário não autenticado" });
            }

            const viewer = await resolveViewer(request);
            const marcarVisitado = new MarcarVisitadoModel();
            
            const agendamento = await marcarVisitado.execute(
                id,
                actorUserId,
                Boolean(viewer?.canViewAll)
            );
            
            return response.json(attachUploadTokensToAgendamentoFotos(agendamento));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao concluir visita";
            return response.status(400).json({ error: message });
        }
    }
}

class AtualizarStatusAgendamentoController {
    async handle(request: Request, response: Response) {
        try {
            const id = parsePositiveInt(request.params.id, "ID do agendamento");
            const { status } = request.body as { status?: AgendamentoStatus };
            if (!status) {
                return response.status(400).json({ error: "Status é obrigatório" });
            }
            const viewer = await resolveViewer(request);
            const idUser = resolveActorUserId(request);
            if (!idUser) {
                return response.status(401).json({ error: "Usuário não autenticado" });
            }

            const atualizarStatus = new AtualizarStatusAgendamentoModel();
            const agendamento = await atualizarStatus.execute(id, status, {
                idUser,
                canOverrideClaim: Boolean(viewer?.canViewAll),
            });

            if (status === "VISITA_MARCADA_PARA_HOJE") {
                await notifyVisitaMarcadaHoje(agendamento);
            }

            return response.json(attachUploadTokensToAgendamentoFotos(agendamento));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao atualizar status";
            return response.status(400).json({ error: message });
        }
    }
}

class DeleteAgendamentoController {
    async handle(request: Request, response: Response) {
        try {
            const id = parsePositiveInt(request.params.id, "ID do agendamento");
            const viewer = await resolveViewer(request);
            const deleteAgendamento = new DeleteAgendamentoModel();
            
            const result = await deleteAgendamento.execute(id, viewer);
            
            return response.json(result);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao excluir agendamento";
            const status = message === "Agendamento não encontrado"
                ? 404
                : message.includes("inválido")
                    ? 400
                    : 400;
            return response.status(status).json({ error: message });
        }
    }
}

export {
    CreateAgendamentosController,
    ListAgendamentosController,
    AgendamentosStatsController,
    GetAgendamentoController,
    UpdateAgendamentoController,
    MarcarVisitadoController,
    DesmarcarAgendamentoController,
    AtualizarStatusAgendamentoController,
    DeleteAgendamentoController
}
