import { UpdateUserGruposModel } from "../models/userGruposModels";
import { Request, Response } from "express";

export class UpdateUserGruposController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { grupos_ids } = request.body;
            const updateUserGrupos = new UpdateUserGruposModel();
            const user = await updateUserGrupos.execute(Number(id), grupos_ids || []);
            return response.json(user);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}
