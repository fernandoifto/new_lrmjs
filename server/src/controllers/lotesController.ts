import { Request, Response } from "express";
import { parsePaginationParams, paginatedResponse } from "../utils/pagination";
import { parseSortField, parseSortOrder } from "../utils/sorting";
import { 
    CreateLoteModel, 
    ListLotesModel,
    ListLotesDisponiveisModel,
    GetLoteModel, 
    UpdateLoteModel, 
    DeleteLoteModel 
} from "../models/lotesModels";
import { GetAgendamentoModel } from "../models/agendamentosModels";

export class CreateLoteController {
    async handle(request: Request, response: Response) {
        try {
            const { numero, datavencimento, datafabricacao, qtde, id_medicamento, id_forma_farmaceutica, id_tipo_medicamento, id_agendamento } = request.body;
            const createLote = new CreateLoteModel();

            const lote = await createLote.execute({ 
                numero, 
                datavencimento, 
                datafabricacao, 
                qtde, 
                id_medicamento: parseInt(id_medicamento, 10), 
                id_forma_farmaceutica: parseInt(id_forma_farmaceutica, 10), 
                id_tipo_medicamento: parseInt(id_tipo_medicamento, 10),
                id_agendamento: parseInt(id_agendamento, 10),
            });
            return response.status(201).json(lote);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class ListLotesController {
    async handle(request: Request, response: Response) {
        try {
            const p = parsePaginationParams(request.query);
            const q = request.query.q ? String(request.query.q) : undefined;
            const rawMed = request.query.idMedicamento;
            let idMedicamento: number | undefined;
            if (rawMed !== undefined && String(rawMed) !== "") {
                const n = parseInt(String(rawMed), 10);
                if (!Number.isNaN(n)) {
                    idMedicamento = n;
                }
            }
            const rawAg = request.query.idAgendamento ?? request.query.id_agendamento;
            let idAgendamento: number | undefined;
            if (rawAg !== undefined && String(rawAg) !== "") {
                const n = parseInt(String(rawAg), 10);
                if (!Number.isNaN(n)) {
                    idAgendamento = n;
                }
            }
            const listLotes = new ListLotesModel();
            const sortBy = parseSortField(
                request.query.sortBy ? String(request.query.sortBy) : undefined,
                ["created", "numero", "datavencimento", "qtde"] as const,
                "created"
            );
            const sortOrder = parseSortOrder(request.query.sortOrder ? String(request.query.sortOrder) : undefined);
            const { items, total } = await listLotes.execute(p, { q, idMedicamento, idAgendamento, sortBy, sortOrder });
            return response.json(paginatedResponse(items, total, p.page, p.pageSize));
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
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
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class GetLoteController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const getLote = new GetLoteModel();
            const lote = await getLote.execute(parseInt(id));
            return response.json(lote);
        } catch (error: any) {
            return response.status(404).json({ error: error.message });
        }
    }
}

export class UpdateLoteController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { numero, datavencimento, datafabricacao, qtde, id_medicamento, id_forma_farmaceutica, id_tipo_medicamento, id_agendamento } = request.body;
            const updateLote = new UpdateLoteModel();

            const parsedAgendamento = id_agendamento !== undefined && id_agendamento !== null && String(id_agendamento) !== ""
                ? parseInt(id_agendamento, 10)
                : undefined;
            
            const lote = await updateLote.execute(parseInt(id), { 
                numero, 
                datavencimento, 
                datafabricacao, 
                qtde, 
                id_medicamento: id_medicamento !== undefined ? parseInt(id_medicamento, 10) : undefined, 
                id_forma_farmaceutica: id_forma_farmaceutica !== undefined ? parseInt(id_forma_farmaceutica, 10) : undefined, 
                id_tipo_medicamento: id_tipo_medicamento !== undefined ? parseInt(id_tipo_medicamento, 10) : undefined,
                id_agendamento: parsedAgendamento,
            });
            return response.json(lote);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class DeleteLoteController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const deleteLote = new DeleteLoteModel();
            
            const result = await deleteLote.execute(parseInt(id));
            return response.json(result);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class ListLotesByAgendamentoController {
    async handle(request: Request, response: Response) {
        try {
            const idAgendamento = parseInt(request.params.id, 10);
            if (Number.isNaN(idAgendamento)) {
                return response.status(400).json({ error: "ID do agendamento inválido" });
            }

            const getAgendamento = new GetAgendamentoModel();
            await getAgendamento.execute(idAgendamento);

            const p = parsePaginationParams(request.query);
            const listLotes = new ListLotesModel();
            const { items, total } = await listLotes.execute(p, { idAgendamento });
            return response.json(paginatedResponse(items, total, p.page, p.pageSize));
        } catch (error: any) {
            const status = error.message === "Agendamento não encontrado" ? 404 : 400;
            return response.status(status).json({ error: error.message });
        }
    }
}

