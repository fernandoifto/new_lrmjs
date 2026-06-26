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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePermissaoModel = exports.UpdatePermissaoModel = exports.GetPermissaoModel = exports.ListPermissoesModel = exports.CreatePermissaoModel = void 0;
const prisma_1 = __importDefault(require("../tools/prisma"));
class CreatePermissaoModel {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nome, descricao, pagina, acao }) {
            if (!nome || nome.trim() === '') {
                throw new Error("Nome é obrigatório");
            }
            const permissaoExists = yield prisma_1.default.permissoes.findFirst({
                where: {
                    nome: nome
                }
            });
            if (permissaoExists) {
                throw new Error("Permissão já existe");
            }
            const permissao = yield prisma_1.default.permissoes.create({
                data: {
                    nome,
                    descricao: descricao || null,
                    pagina: pagina || null,
                    acao: acao || null
                }
            });
            return permissao;
        });
    }
}
exports.CreatePermissaoModel = CreatePermissaoModel;
class ListPermissoesModel {
    execute(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderBy = { nome: 'asc' };
            const [total, items] = yield Promise.all([
                prisma_1.default.permissoes.count(),
                prisma_1.default.permissoes.findMany({
                    orderBy,
                    skip: p.skip,
                    take: p.take,
                }),
            ]);
            return { items, total };
        });
    }
}
exports.ListPermissoesModel = ListPermissoesModel;
class GetPermissaoModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const permissao = yield prisma_1.default.permissoes.findUnique({
                where: {
                    id: id
                }
            });
            if (!permissao) {
                throw new Error("Permissão não encontrada");
            }
            return permissao;
        });
    }
}
exports.GetPermissaoModel = GetPermissaoModel;
class UpdatePermissaoModel {
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const permissaoExists = yield prisma_1.default.permissoes.findUnique({
                where: { id: id }
            });
            if (!permissaoExists) {
                throw new Error("Permissão não encontrada");
            }
            if (data.nome && data.nome.trim() !== '') {
                const permissaoComMesmoNome = yield prisma_1.default.permissoes.findFirst({
                    where: {
                        nome: data.nome,
                        id: { not: id }
                    }
                });
                if (permissaoComMesmoNome) {
                    throw new Error("Já existe uma permissão com este nome");
                }
            }
            const permissao = yield prisma_1.default.permissoes.update({
                where: { id: id },
                data: {
                    nome: data.nome,
                    descricao: data.descricao,
                    pagina: data.pagina,
                    acao: data.acao
                }
            });
            return permissao;
        });
    }
}
exports.UpdatePermissaoModel = UpdatePermissaoModel;
class DeletePermissaoModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const permissaoExists = yield prisma_1.default.permissoes.findUnique({
                where: { id: id }
            });
            if (!permissaoExists) {
                throw new Error("Permissão não encontrada");
            }
            yield prisma_1.default.permissoes.delete({
                where: { id: id }
            });
            return { message: "Permissão excluída com sucesso" };
        });
    }
}
exports.DeletePermissaoModel = DeletePermissaoModel;
