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
exports.DeletePermissaoController = exports.UpdatePermissaoController = exports.GetPermissaoController = exports.ListPermissoesController = exports.CreatePermissaoController = void 0;
const permissoesModels_1 = require("../models/permissoesModels");
const pagination_1 = require("../utils/pagination");
class CreatePermissaoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, descricao, pagina, acao } = request.body;
                const createPermissao = new permissoesModels_1.CreatePermissaoModel();
                const permissao = yield createPermissao.execute({ nome, descricao, pagina, acao });
                return response.json(permissao);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CreatePermissaoController = CreatePermissaoController;
class ListPermissoesController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = (0, pagination_1.parsePaginationParams)(request.query);
                const listPermissoes = new permissoesModels_1.ListPermissoesModel();
                const { items, total } = yield listPermissoes.execute(p);
                return response.json((0, pagination_1.paginatedResponse)(items, total, p.page, p.pageSize));
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ListPermissoesController = ListPermissoesController;
class GetPermissaoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const getPermissao = new permissoesModels_1.GetPermissaoModel();
                const permissao = yield getPermissao.execute(Number(id));
                return response.json(permissao);
            }
            catch (error) {
                return response.status(404).json({ error: error.message });
            }
        });
    }
}
exports.GetPermissaoController = GetPermissaoController;
class UpdatePermissaoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const { nome, descricao, pagina, acao } = request.body;
                const updatePermissao = new permissoesModels_1.UpdatePermissaoModel();
                const permissao = yield updatePermissao.execute(Number(id), { nome, descricao, pagina, acao });
                return response.json(permissao);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UpdatePermissaoController = UpdatePermissaoController;
class DeletePermissaoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const deletePermissao = new permissoesModels_1.DeletePermissaoModel();
                const result = yield deletePermissao.execute(Number(id));
                return response.json(result);
            }
            catch (error) {
                return response.status(404).json({ error: error.message });
            }
        });
    }
}
exports.DeletePermissaoController = DeletePermissaoController;
