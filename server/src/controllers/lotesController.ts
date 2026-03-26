import { Request, Response } from "express";
import { parsePaginationParams, paginatedResponse } from "../utils/pagination";
import { 
    CreateLoteModel, 
    ListLotesModel,
    ListLotesDisponiveisModel,
    GetLoteModel, 
    UpdateLoteModel, 
    DeleteLoteModel 
} from "../models/lotesModels";

export class CreateLoteController {
    async handle(request: Request, response: Response) {
        try {
            const { numero, datavencimento, datafabricacao, qtde, id_medicamento, id_forma_farmaceutica, id_tipo_medicamento } = request.body;
            const createLote = new CreateLoteModel();

            const lote = await createLote.execute({ 
                numero, 
                datavencimento, 
                datafabricacao, 
                qtde, 
                id_medicamento, 
                id_forma_farmaceutica, 
                id_tipo_medicamento 
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
            const campo = request.query.campo ? String(request.query.campo) : undefined;
            const rawMed = request.query.idMedicamento;
            let idMedicamento: number | undefined;
            if (rawMed !== undefined && String(rawMed) !== "") {
                const n = parseInt(String(rawMed), 10);
                if (!Number.isNaN(n)) {
                    idMedicamento = n;
                }
            }
            const listLotes = new ListLotesModel();
            const { items, total } = await listLotes.execute(p, { q, campo, idMedicamento });
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
            const { numero, datavencimento, datafabricacao, qtde, id_medicamento, id_forma_farmaceutica, id_tipo_medicamento } = request.body;
            const updateLote = new UpdateLoteModel();
            
            const lote = await updateLote.execute(parseInt(id), { 
                numero, 
                datavencimento, 
                datafabricacao, 
                qtde, 
                id_medicamento, 
                id_forma_farmaceutica, 
                id_tipo_medicamento 
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

