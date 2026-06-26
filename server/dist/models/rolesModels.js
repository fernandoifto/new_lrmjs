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
exports.GetUserPermissoesModel = exports.UpdateRolePermissoesModel = exports.DeleteRoleModel = exports.UpdateRoleModel = exports.GetRoleModel = exports.ListRolesModel = exports.CreateRoleModel = void 0;
const prisma_1 = __importDefault(require("../tools/prisma"));
class CreateRoleModel {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nome, descricao }) {
            if (!nome || nome.trim() === '') {
                throw new Error("Nome é obrigatório");
            }
            const roleExists = yield prisma_1.default.roles.findFirst({
                where: {
                    nome: nome
                }
            });
            if (roleExists) {
                throw new Error("Role já existe");
            }
            const role = yield prisma_1.default.roles.create({
                data: {
                    nome,
                    descricao: descricao || null
                }
            });
            return role;
        });
    }
}
exports.CreateRoleModel = CreateRoleModel;
class ListRolesModel {
    execute(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const base = {
                include: {
                    _count: {
                        select: {
                            userRoles: true
                        }
                    }
                },
                orderBy: {
                    nome: 'asc'
                }
            };
            const [total, items] = yield Promise.all([
                prisma_1.default.roles.count(),
                prisma_1.default.roles.findMany(Object.assign(Object.assign({}, base), { skip: p.skip, take: p.take })),
            ]);
            return { items, total };
        });
    }
}
exports.ListRolesModel = ListRolesModel;
class GetRoleModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield prisma_1.default.roles.findUnique({
                where: {
                    id: id
                },
                include: {
                    rolePermissoes: {
                        include: {
                            permissao: true
                        }
                    }
                }
            });
            if (!role) {
                throw new Error("Role não encontrada");
            }
            return role;
        });
    }
}
exports.GetRoleModel = GetRoleModel;
class UpdateRoleModel {
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleExists = yield prisma_1.default.roles.findUnique({
                where: { id: id }
            });
            if (!roleExists) {
                throw new Error("Role não encontrada");
            }
            if (data.nome && data.nome.trim() !== '') {
                const roleComMesmoNome = yield prisma_1.default.roles.findFirst({
                    where: {
                        nome: data.nome,
                        id: { not: id }
                    }
                });
                if (roleComMesmoNome) {
                    throw new Error("Já existe uma role com este nome");
                }
            }
            const role = yield prisma_1.default.roles.update({
                where: { id: id },
                data: {
                    nome: data.nome,
                    descricao: data.descricao
                }
            });
            return role;
        });
    }
}
exports.UpdateRoleModel = UpdateRoleModel;
class DeleteRoleModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleExists = yield prisma_1.default.roles.findUnique({
                where: { id: id }
            });
            if (!roleExists) {
                throw new Error("Role não encontrada");
            }
            yield prisma_1.default.roles.delete({
                where: { id: id }
            });
            return { message: "Role excluída com sucesso" };
        });
    }
}
exports.DeleteRoleModel = DeleteRoleModel;
class UpdateRolePermissoesModel {
    execute(id_role, permissoes_ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleExists = yield prisma_1.default.roles.findUnique({
                where: { id: id_role }
            });
            if (!roleExists) {
                throw new Error("Role não encontrada");
            }
            // Remover todas as permissões atuais
            yield prisma_1.default.rolePermissoes.deleteMany({
                where: {
                    id_role: id_role
                }
            });
            // Adicionar as novas permissões
            if (permissoes_ids.length > 0) {
                yield prisma_1.default.rolePermissoes.createMany({
                    data: permissoes_ids.map(id_permissao => ({
                        id_role,
                        id_permissao
                    }))
                });
            }
            const role = yield prisma_1.default.roles.findUnique({
                where: { id: id_role },
                include: {
                    rolePermissoes: {
                        include: {
                            permissao: true
                        }
                    }
                }
            });
            return role;
        });
    }
}
exports.UpdateRolePermissoesModel = UpdateRolePermissoesModel;
class GetUserPermissoesModel {
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.users.findUnique({
                where: { id: userId },
                include: {
                    userRoles: {
                        include: {
                            role: {
                                include: {
                                    rolePermissoes: {
                                        include: {
                                            permissao: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            // Se for admin, retorna todas as permissões
            if (user.is_admin) {
                const allPermissoes = yield prisma_1.default.permissoes.findMany();
                return allPermissoes.map((p) => p.nome);
            }
            // Coletar todas as permissões únicas dos roles do usuário
            const permissoesSet = new Set();
            user.userRoles.forEach((userRole) => {
                userRole.role.rolePermissoes.forEach((rp) => {
                    permissoesSet.add(rp.permissao.nome);
                });
            });
            return Array.from(permissoesSet);
        });
    }
}
exports.GetUserPermissoesModel = GetUserPermissoesModel;
