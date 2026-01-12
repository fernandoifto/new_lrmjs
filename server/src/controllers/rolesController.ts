import { 
    CreateRoleModel, 
    ListRolesModel, 
    GetRoleModel, 
    UpdateRoleModel, 
    DeleteRoleModel,
    UpdateRolePermissoesModel,
    GetUserPermissoesModel
} from "../models/rolesModels";
import { Request, Response } from "express";

export class CreateRoleController {
    async handle(request: Request, response: Response) {
        try {
            const { nome, descricao } = request.body;
            const createRole = new CreateRoleModel();
            const role = await createRole.execute({ nome, descricao });
            return response.json(role);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class ListRolesController {
    async handle(request: Request, response: Response) {
        try {
            const listRoles = new ListRolesModel();
            const roles = await listRoles.execute();
            return response.json(roles);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class GetRoleController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const getRole = new GetRoleModel();
            const role = await getRole.execute(Number(id));
            return response.json(role);
        } catch (error: any) {
            return response.status(404).json({ error: error.message });
        }
    }
}

export class UpdateRoleController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { nome, descricao } = request.body;
            const updateRole = new UpdateRoleModel();
            const role = await updateRole.execute(Number(id), { nome, descricao });
            return response.json(role);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class DeleteRoleController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const deleteRole = new DeleteRoleModel();
            const result = await deleteRole.execute(Number(id));
            return response.json(result);
        } catch (error: any) {
            return response.status(404).json({ error: error.message });
        }
    }
}

export class UpdateRolePermissoesController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { permissoes_ids } = request.body;
            const updateRolePermissoes = new UpdateRolePermissoesModel();
            const role = await updateRolePermissoes.execute(Number(id), permissoes_ids || []);
            return response.json(role);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export class GetUserPermissoesController {
    async handle(request: Request, response: Response) {
        try {
            const userId = request.query.userId as string;
            if (!userId) {
                return response.status(400).json({ error: "User ID é obrigatório" });
            }
            const getUserPermissoes = new GetUserPermissoesModel();
            const permissoes = await getUserPermissoes.execute(Number(userId));
            return response.json({ permissoes });
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

