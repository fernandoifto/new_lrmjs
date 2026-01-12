import { Request, Response } from "express";
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
            const listMedicamentos = new ListMedicamentosModel();
            const medicamentos = await listMedicamentos.execute();
            return response.json(medicamentos);
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
            const medicamento = await getMedicamento.execute(parseInt(id));
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
            
            const medicamento = await updateMedicamento.execute(parseInt(id), { descricao, principioativo });
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
            
            const result = await deleteMedicamento.execute(parseInt(id));
            return response.json(result);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

