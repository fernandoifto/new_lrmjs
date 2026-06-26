"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserPermissoesController = exports.UpdateRolePermissoesController = exports.DeleteRoleController = exports.UpdateRoleController = exports.GetRoleController = exports.ListRolesController = exports.CreateRoleController = void 0;
const rolesModels_1 = require("../models/rolesModels");
const pagination_1 = require("../utils/pagination");
class CreateRoleController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, descricao } = request.body;
                const createRole = new rolesModels_1.CreateRoleModel();
                const role = yield createRole.execute({ nome, descricao });
                return response.json(role);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CreateRoleController = CreateRoleController;
class ListRolesController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = (0, pagination_1.parsePaginationParams)(request.query);
                const listRoles = new rolesModels_1.ListRolesModel();
                const { items, total } = yield listRoles.execute(p);
                return response.json((0, pagination_1.paginatedResponse)(items, total, p.page, p.pageSize));
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ListRolesController = ListRolesController;
class GetRoleController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const getRole = new rolesModels_1.GetRoleModel();
                const role = yield getRole.execute(Number(id));
                return response.json(role);
            }
            catch (error) {
                return response.status(404).json({ error: error.message });
            }
        });
    }
}
exports.GetRoleController = GetRoleController;
class UpdateRoleController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const { nome, descricao } = request.body;
                const updateRole = new rolesModels_1.UpdateRoleModel();
                const role = yield updateRole.execute(Number(id), { nome, descricao });
                return response.json(role);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UpdateRoleController = UpdateRoleController;
class DeleteRoleController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const deleteRole = new rolesModels_1.DeleteRoleModel();
                const result = yield deleteRole.execute(Number(id));
                return response.json(result);
            }
            catch (error) {
                return response.status(404).json({ error: error.message });
            }
        });
    }
}
exports.DeleteRoleController = DeleteRoleController;
class UpdateRolePermissoesController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const { permissoes_ids } = request.body;
                const updateRolePermissoes = new rolesModels_1.UpdateRolePermissoesModel();
                const role = yield updateRolePermissoes.execute(Number(id), permissoes_ids || []);
                return response.json(role);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UpdateRolePermissoesController = UpdateRolePermissoesController;
class GetUserPermissoesController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.query.userId;
                if (!userId) {
                    return response.status(400).json({ error: "User ID é obrigatório" });
                }
                const getUserPermissoes = new rolesModels_1.GetUserPermissoesModel();
                const permissoes = yield getUserPermissoes.execute(Number(userId));
                return response.json({ permissoes });
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.GetUserPermissoesController = GetUserPermissoesController;
