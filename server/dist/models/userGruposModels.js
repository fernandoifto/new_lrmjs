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
exports.UpdateUserGruposModel = void 0;
const prisma_1 = __importDefault(require("../tools/prisma"));
class UpdateUserGruposModel {
    execute(id_user, grupos_ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield prisma_1.default.users.findUnique({
                where: { id: id_user }
            });
            if (!userExists) {
                throw new Error("Usuário não encontrado");
            }
            // Remover todos os grupos atuais do usuário
            yield prisma_1.default.userRoles.deleteMany({
                where: {
                    id_user: id_user
                }
            });
            // Adicionar os novos grupos
            if (grupos_ids.length > 0) {
                yield prisma_1.default.userRoles.createMany({
                    data: grupos_ids.map(id_role => ({
                        id_user,
                        id_role
                    }))
                });
            }
            const user = yield prisma_1.default.users.findUnique({
                where: { id: id_user },
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
            return user;
        });
    }
}
exports.UpdateUserGruposModel = UpdateUserGruposModel;
