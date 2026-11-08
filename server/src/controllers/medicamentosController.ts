import { Request, Response } from "express";
import { routeParam } from "../utils/parseId";
import { parsePaginationParams, paginatedResponse } from "../utils/pagination";
import { parseSortField, parseSortOrder } from "../utils/sorting";
import { 
    CreateMedicamentoModel, 
    ListMedicamentosModel, 
    GetMedicamentoModel, 
    UpdateMedicamentoModel, 
    DeleteMedicamentoModel 
} from "../models/medicamentosModels";

export class CreateMedicamentoController {
    async handle(request: Request, response: Response) {
        try {
            const { descricao, principioativo } = request.body;
            const createMedicamento = new CreateMedicamentoModel();

            const medicamento = await createMedicamento.execute({ descricao, principioativo });
            return response.status(201).json(medicamento);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class ListMedicamentosController {
    async handle(request: Request, response: Response) {
        try {
            const p = parsePaginationParams(request.query);
            const q = request.query.q ? String(request.query.q) : undefined;
            const sortBy = parseSortField(
                request.query.sortBy ? String(request.query.sortBy) : undefined,
                ["descricao", "principioativo", "created"] as const,
                "descricao"
            );
            const sortOrder = parseSortOrder(request.query.sortOrder ? String(request.query.sortOrder) : undefined);
            const listMedicamentos = new ListMedicamentosModel();
            const { items, total } = await listMedicamentos.execute(p, { q, sortBy, sortOrder });
            return response.json(paginatedResponse(items, total, p.page, p.pageSize));
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class GetMedicamentoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const getMedicamento = new GetMedicamentoModel();
            const medicamento = await getMedicamento.execute(parseInt(routeParam(id)));
            return response.json(medicamento);
        } catch (error: any) {
            return response.status(404).json({ error: error.message });
        }
    }
}

export class UpdateMedicamentoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { descricao, principioativo } = request.body;
            const updateMedicamento = new UpdateMedicamentoModel();
            
            const medicamento = await updateMedicamento.execute(parseInt(routeParam(id)), { descricao, principioativo });
            return response.json(medicamento);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class DeleteMedicamentoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const deleteMedicamento = new DeleteMedicamentoModel();
            
            const result = await deleteMedicamento.execute(parseInt(routeParam(id)));
            return response.json(result);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

