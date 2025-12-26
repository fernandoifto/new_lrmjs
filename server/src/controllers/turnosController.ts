import { Request, Response } from "express";
import { ListTurnosModel } from "../models/turnosModels";

class ListTurnosController {
    async handle(request: Request, response: Response) {
        const listTurnos = new ListTurnosModel();
        const turnos = await listTurnos.execute();
        return response.json(turnos);
    }
}

export { ListTurnosController }