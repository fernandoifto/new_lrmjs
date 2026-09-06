import { CreatePermissaoModel, ListPermissoesModel, GetPermissaoModel, UpdatePermissaoModel, DeletePermissaoModel } from "../models/permissoesModels";
import { Request, Response } from "express";
import { parsePaginationParams, paginatedResponse } from "../utils/pagination";
import { parseSortField, parseSortOrder } from "../utils/sorting";

export class CreatePermissaoController {
    async handle(request: Request, response: Response) {
        try {
            const { nome, descricao, pagina, acao } = request.body;
            const createPermissao = new CreatePermissaoModel();
            const permissao = await createPermissao.execute({ nome, descricao, pagina, acao });
            return response.json(permissao);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class ListPermissoesController {
    async handle(request: Request, response: Response) {
        try {
            const p = parsePaginationParams(request.query);
            const q = request.query.q ? String(request.query.q) : undefined;
            const sortBy = parseSortField(
                request.query.sortBy ? String(request.query.sortBy) : undefined,
                ["nome", "pagina", "created"] as const,
                "nome"
            );
            const sortOrder = parseSortOrder(request.query.sortOrder ? String(request.query.sortOrder) : undefined);
            const listPermissoes = new ListPermissoesModel();
            const { items, total } = await listPermissoes.execute(p, { q, sortBy, sortOrder });
            return response.json(paginatedResponse(items, total, p.page, p.pageSize));
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class GetPermissaoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const getPermissao = new GetPermissaoModel();
            const permissao = await getPermissao.execute(Number(id));
            return response.json(permissao);
        } catch (error: any) {
            return response.status(404).json({ error: error.message });
        }
    }
}

export class UpdatePermissaoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { nome, descricao, pagina, acao } = request.body;
            const updatePermissao = new UpdatePermissaoModel();
            const permissao = await updatePermissao.execute(Number(id), { nome, descricao, pagina, acao });
            return response.json(permissao);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class DeletePermissaoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const deletePermissao = new DeletePermissaoModel();
            const result = await deletePermissao.execute(Number(id));
            return response.json(result);
        } catch (error: any) {
            return response.status(404).json({ error: error.message });
        }
    }
}

