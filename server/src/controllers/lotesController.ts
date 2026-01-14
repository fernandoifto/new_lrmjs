import { Request, Response } from "express";
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
            const listLotes = new ListLotesModel();
            const lotes = await listLotes.execute();
            return response.json(lotes);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class ListLotesDisponiveisController {
    async handle(request: Request, response: Response) {
        try {
            const listLotesDisponiveis = new ListLotesDisponiveisModel();
            const lotes = await listLotesDisponiveis.execute();
            return response.json(lotes);
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

