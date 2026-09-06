import { Request, Response } from "express";
import { parsePaginationParams, paginatedResponse } from "../utils/pagination";
import { parseSortField, parseSortOrder } from "../utils/sorting";
import { parsePositiveInt, tryParsePositiveInt } from "../utils/parseId";
import { 
    CreateLoteModel, 
    ListLotesModel,
    ListLotesDisponiveisModel,
    GetLoteModel,
    GetLoteByRastreioModel,
    UpdateLoteModel, 
    DeleteLoteModel 
} from "../models/lotesModels";
import { GetAgendamentoModel } from "../models/agendamentosModels";
import { userCanViewAllAgendamentos } from "../middlewares/hasPermission";

export class CreateLoteController {
    async handle(request: Request, response: Response) {
        try {
            const { numero, datavencimento, datafabricacao, qtde, id_medicamento, id_forma_farmaceutica, id_tipo_medicamento, id_agendamento } = request.body;
            const id_user = request.user?.id;
            if (!id_user) {
                return response.status(401).json({ error: "Usuário não autenticado" });
            }

            const createLote = new CreateLoteModel();

            const lote = await createLote.execute({ 
                numero, 
                datavencimento, 
                datafabricacao, 
                qtde: parsePositiveInt(qtde, "Quantidade"), 
                id_medicamento: parsePositiveInt(id_medicamento, "Medicamento"), 
                id_forma_farmaceutica: parsePositiveInt(id_forma_farmaceutica, "Forma farmacêutica"), 
                id_tipo_medicamento: parsePositiveInt(id_tipo_medicamento, "Tipo de medicamento"),
                id_agendamento: parsePositiveInt(id_agendamento, "Agendamento"),
                id_user,
            });
            return response.status(201).json(lote);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao criar lote";
            return response.status(400).json({ error: message });
        }
    }
}

export class ListLotesController {
    async handle(request: Request, response: Response) {
        try {
            const p = parsePaginationParams(request.query);
            const q = request.query.q ? String(request.query.q) : undefined;
            const idMedicamento = tryParsePositiveInt(request.query.idMedicamento);
            const idAgendamento = tryParsePositiveInt(
                request.query.idAgendamento ?? request.query.id_agendamento
            );
            const listLotes = new ListLotesModel();
            const sortBy = parseSortField(
                request.query.sortBy ? String(request.query.sortBy) : undefined,
                ["created", "numero", "datavencimento", "qtde"] as const,
                "created"
            );
            const sortOrder = parseSortOrder(request.query.sortOrder ? String(request.query.sortOrder) : undefined);
            const { items, total } = await listLotes.execute(p, { q, idMedicamento, idAgendamento, sortBy, sortOrder });
            return response.json(paginatedResponse(items, total, p.page, p.pageSize));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao listar lotes";
            return response.status(400).json({ error: message });
        }
    }
}

export class ListLotesDisponiveisController {
    async handle(request: Request, response: Response) {
        try {
            const p = parsePaginationParams(request.query);
            const listLotesDisponiveis = new ListLotesDisponiveisModel();
            const { items, total } = await listLotesDisponiveis.execute(p);
            return response.json(paginatedResponse(items, total, p.page, p.pageSize));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao listar lotes disponíveis";
            return response.status(400).json({ error: message });
        }
    }
}

export class GetLoteController {
    async handle(request: Request, response: Response) {
        try {
            const id = parsePositiveInt(request.params.id, "ID do lote");
            const getLote = new GetLoteModel();
            const lote = await getLote.execute(id);
            return response.json(lote);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Lote não encontrado";
            const status = message.includes("inválido") ? 400 : 404;
            return response.status(status).json({ error: message });
        }
    }
}

export class GetLoteByRastreioController {
    async handle(request: Request, response: Response) {
        try {
            const codigo = request.query.codigo != null ? String(request.query.codigo) : "";
            if (!codigo.trim()) {
                return response.status(400).json({ error: "Informe o código da etiqueta" });
            }
            const getByRastreio = new GetLoteByRastreioModel();
            const result = await getByRastreio.execute(codigo);
            return response.json(result);
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : "Erro ao consultar etiqueta";
            const status =
                msg.includes("inválido") || msg.includes("Informe") || msg.includes("Unidade")
                    ? 400
                    : 404;
            return response.status(status).json({ error: msg });
        }
    }
}

export class UpdateLoteController {
    async handle(request: Request, response: Response) {
        try {
            const id = parsePositiveInt(request.params.id, "ID do lote");
            const { numero, datavencimento, datafabricacao, qtde, id_medicamento, id_forma_farmaceutica, id_tipo_medicamento, id_agendamento } = request.body;
            const updateLote = new UpdateLoteModel();

            const parsedAgendamento = id_agendamento !== undefined && id_agendamento !== null && String(id_agendamento) !== ""
                ? parsePositiveInt(id_agendamento, "Agendamento")
                : undefined;
            
            const lote = await updateLote.execute(id, { 
                numero, 
                datavencimento, 
                datafabricacao, 
                qtde: qtde !== undefined ? parsePositiveInt(qtde, "Quantidade") : undefined, 
                id_medicamento: id_medicamento !== undefined ? parsePositiveInt(id_medicamento, "Medicamento") : undefined, 
                id_forma_farmaceutica: id_forma_farmaceutica !== undefined ? parsePositiveInt(id_forma_farmaceutica, "Forma farmacêutica") : undefined, 
                id_tipo_medicamento: id_tipo_medicamento !== undefined ? parsePositiveInt(id_tipo_medicamento, "Tipo de medicamento") : undefined,
                id_agendamento: parsedAgendamento,
            });
            return response.json(lote);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao atualizar lote";
            return response.status(400).json({ error: message });
        }
    }
}

export class DeleteLoteController {
    async handle(request: Request, response: Response) {
        try {
            const id = parsePositiveInt(request.params.id, "ID do lote");
            const deleteLote = new DeleteLoteModel();
            
            const result = await deleteLote.execute(id);
            return response.json(result);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao excluir lote";
            const status = message.includes("inválido") ? 400 : message.includes("não encontrado") ? 404 : 400;
            return response.status(status).json({ error: message });
        }
    }
}

export class ListLotesByAgendamentoController {
    async handle(request: Request, response: Response) {
        try {
            const idAgendamento = parsePositiveInt(request.params.id, "ID do agendamento");

            const viewer = request.user?.id
                ? {
                    userId: request.user.id,
                    canViewAll: await userCanViewAllAgendamentos(request.user),
                }
                : undefined;

            const getAgendamento = new GetAgendamentoModel();
            await getAgendamento.execute(idAgendamento, viewer);

            const p = parsePaginationParams(request.query);
            const listLotes = new ListLotesModel();
            const { items, total } = await listLotes.execute(p, { idAgendamento });
            return response.json(paginatedResponse(items, total, p.page, p.pageSize));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao listar lotes";
            const status = message === "Agendamento não encontrado" ? 404 : 400;
            return response.status(status).json({ error: message });
        }
    }
}
