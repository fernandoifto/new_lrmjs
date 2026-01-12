import { Request, Response } from "express";
import { CreateRetiradaModel, ListRetiradasModel, GetRetiradaModel, UpdateRetiradaModel, DeleteRetiradaModel } from "../models/retiradasModels";

class CreateRetiradaController {
    async handle(req: Request, res: Response) {
        try {
            const { qtde, id_lotes, id_pacientes } = req.body;
            const id_users = parseInt(req.query.userId as string); // ID do usuário logado

            if (!id_users) {
                return res.status(401).json({ error: "Usuário não autenticado" });
            }

            const createRetiradaModel = new CreateRetiradaModel();
            const retirada = await createRetiradaModel.execute({
                qtde,
                id_users,
                id_lotes,
                id_pacientes
            });

            return res.status(201).json(retirada);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

class ListRetiradasController {
    async handle(req: Request, res: Response) {
        try {
            const listRetiradasModel = new ListRetiradasModel();
            const retiradas = await listRetiradasModel.execute();

            return res.status(200).json(retiradas);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

class GetRetiradaController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const getRetiradaModel = new GetRetiradaModel();
            const retirada = await getRetiradaModel.execute(parseInt(id));

            return res.status(200).json(retirada);
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }
}

class UpdateRetiradaController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { qtde, id_lotes, id_pacientes } = req.body;

            const updateRetiradaModel = new UpdateRetiradaModel();
            const retirada = await updateRetiradaModel.execute(parseInt(id), {
                qtde,
                id_lotes,
                id_pacientes
            });

            return res.status(200).json(retirada);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

class DeleteRetiradaController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const deleteRetiradaModel = new DeleteRetiradaModel();
            const result = await deleteRetiradaModel.execute(parseInt(id));

            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateRetiradaController, ListRetiradasController, GetRetiradaController, UpdateRetiradaController, DeleteRetiradaController }

