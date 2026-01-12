import { Request, Response } from "express";
import { 
    CreateTipoMedicamentoModel, 
    ListTiposMedicamentosModel, 
    GetTipoMedicamentoModel, 
    UpdateTipoMedicamentoModel, 
    DeleteTipoMedicamentoModel 
} from "../models/tiposMedicamentosModels";

export class CreateTipoMedicamentoController {
    async handle(request: Request, response: Response) {
        try {
            const { descricao } = request.body;
            const createTipoMedicamento = new CreateTipoMedicamentoModel();

            const tipoMedicamento = await createTipoMedicamento.execute({ descricao });
            return response.status(201).json(tipoMedicamento);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class ListTiposMedicamentosController {
    async handle(request: Request, response: Response) {
        try {
            const listTiposMedicamentos = new ListTiposMedicamentosModel();
            const tiposMedicamentos = await listTiposMedicamentos.execute();
            return response.json(tiposMedicamentos);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class GetTipoMedicamentoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const getTipoMedicamento = new GetTipoMedicamentoModel();
            const tipoMedicamento = await getTipoMedicamento.execute(parseInt(id));
            return response.json(tipoMedicamento);
        } catch (error: any) {
            return response.status(404).json({ error: error.message });
        }
    }
}

export class UpdateTipoMedicamentoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { descricao } = request.body;
            const updateTipoMedicamento = new UpdateTipoMedicamentoModel();
            
            const tipoMedicamento = await updateTipoMedicamento.execute(parseInt(id), { descricao });
            return response.json(tipoMedicamento);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class DeleteTipoMedicamentoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const deleteTipoMedicamento = new DeleteTipoMedicamentoModel();
            
            const result = await deleteTipoMedicamento.execute(parseInt(id));
            return response.json(result);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

