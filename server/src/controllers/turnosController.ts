import { Request, Response } from "express";
import { ListTurnosModel } from "../models/turnosModels";
import { parsePaginationParams, paginatedResponse } from "../utils/pagination";

class ListTurnosController {
    async handle(request: Request, response: Response) {
        const p = parsePaginationParams(request.query);
        const listTurnos = new ListTurnosModel();
        const { items, total } = await listTurnos.execute(p);
        return response.json(paginatedResponse(items, total, p.page, p.pageSize));
    }
}

export { ListTurnosController }