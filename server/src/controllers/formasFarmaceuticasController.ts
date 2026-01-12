import { Request, Response } from "express";
import { 
    CreateFormaFarmaceuticaModel, 
    ListFormasFarmaceuticasModel, 
    GetFormaFarmaceuticaModel, 
    UpdateFormaFarmaceuticaModel, 
    DeleteFormaFarmaceuticaModel 
} from "../models/formasFarmaceuticasModels";

export class CreateFormaFarmaceuticaController {
    async handle(request: Request, response: Response) {
        try {
            const { descricao } = request.body;
            const createFormaFarmaceutica = new CreateFormaFarmaceuticaModel();

            const formaFarmaceutica = await createFormaFarmaceutica.execute({ descricao });
            return response.status(201).json(formaFarmaceutica);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class ListFormasFarmaceuticasController {
    async handle(request: Request, response: Response) {
        try {
            const listFormasFarmaceuticas = new ListFormasFarmaceuticasModel();
            const formasFarmaceuticas = await listFormasFarmaceuticas.execute();
            return response.json(formasFarmaceuticas);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class GetFormaFarmaceuticaController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const getFormaFarmaceutica = new GetFormaFarmaceuticaModel();
            const formaFarmaceutica = await getFormaFarmaceutica.execute(parseInt(id));
            return response.json(formaFarmaceutica);
        } catch (error: any) {
            return response.status(404).json({ error: error.message });
        }
    }
}

export class UpdateFormaFarmaceuticaController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { descricao } = request.body;
            const updateFormaFarmaceutica = new UpdateFormaFarmaceuticaModel();
            
            const formaFarmaceutica = await updateFormaFarmaceutica.execute(parseInt(id), { descricao });
            return response.json(formaFarmaceutica);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class DeleteFormaFarmaceuticaController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const deleteFormaFarmaceutica = new DeleteFormaFarmaceuticaModel();
            
            const result = await deleteFormaFarmaceutica.execute(parseInt(id));
            return response.json(result);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

