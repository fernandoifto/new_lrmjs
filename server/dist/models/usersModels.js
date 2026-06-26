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
exports.DeleteUserModel = exports.UpdateUserModel = exports.GetUserModel = exports.ListUsersModel = exports.CreateUserModel = exports.AuthUserModel = exports.ResetPasswordModel = exports.ForgotPasswordModel = void 0;
const prisma_1 = __importDefault(require("../tools/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const emailService_1 = require("../services/emailService");
const jwtOptions_1 = require("../config/jwtOptions");
class AuthUserModel {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            // Validação de campos obrigatórios
            if (!email || !password) {
                throw new Error("Email and password are required");
            }
            const user = yield prisma_1.default.users.findFirst({
                where: {
                    email: email
                }
            });
            if (!user) {
                throw new Error("User/password incorrect");
            }
            const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error("User/password incorrect");
            }
            const token = (0, jsonwebtoken_1.sign)({
                email: user.email
            }, process.env.JWT_SECRET, {
                algorithm: jwtOptions_1.JWT_ALGORITHM,
                subject: user.id.toString(),
                expiresIn: "1d"
            });
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                is_admin: user.is_admin,
                token: token
            };
        });
    }
}
exports.AuthUserModel = AuthUserModel;
class CreateUserModel {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, email, password, grupos_ids }) {
            if (!email) {
                throw new Error("Email is required");
            }
            if (!username) {
                throw new Error("Username is required");
            }
            if (!password || password.length < 6) {
                throw new Error("Password must be at least 6 characters");
            }
            const userAlreadyExists = yield prisma_1.default.users.findFirst({
                where: {
                    email: email
                }
            });
            if (userAlreadyExists) {
                throw new Error("User already exists");
            }
            // Hash da senha antes de salvar
            const passwordHash = yield bcryptjs_1.default.hash(password, 10);
            const user = yield prisma_1.default.users.create({
                data: {
                    username: username,
                    email: email,
                    password: passwordHash
                },
                select: {
                    id: true,
                    username: true,
                    email: true
                }
            });
            // Atribuir grupos ao usuário se fornecidos (apenas IDs inteiros positivos)
            if (grupos_ids && grupos_ids.length > 0) {
                const roleIds = grupos_ids
                    .map((id) => (typeof id === "string" ? parseInt(id, 10) : id))
                    .filter((id) => Number.isInteger(id) && id > 0);
                if (roleIds.length !== grupos_ids.length) {
                    throw new Error("IDs de grupos inválidos");
                }
                yield prisma_1.default.userRoles.createMany({
                    data: roleIds.map((id_role) => ({
                        id_user: user.id,
                        id_role,
                    })),
                });
            }
            return user;
        });
    }
}
exports.CreateUserModel = CreateUserModel;
class ForgotPasswordModel {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            if (!email) {
                throw new Error("Email is required");
            }
            const user = yield prisma_1.default.users.findFirst({
                where: {
                    email: email
                }
            });
            // Por segurança, não informamos se o e-mail existe ou não
            if (!user) {
                // Retornamos sucesso mesmo se o usuário não existir para não expor informações
                return { message: "If the email exists, a password reset link has been sent." };
            }
            // Gerar token de recuperação com expiração de 1 hora
            const resetToken = (0, jsonwebtoken_1.sign)({
                email: user.email,
                type: "password_reset"
            }, process.env.JWT_SECRET, {
                subject: user.id.toString(),
                expiresIn: "1h"
            });
            // Enviar e-mail com o link de recuperação
            const emailService = new emailService_1.EmailService();
            yield emailService.sendPasswordResetEmail(user.email, resetToken);
            return { message: "If the email exists, a password reset link has been sent." };
        });
    }
}
exports.ForgotPasswordModel = ForgotPasswordModel;
class ResetPasswordModel {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ token, password }) {
            if (!token || !password) {
                throw new Error("Token and password are required");
            }
            if (password.length < 6) {
                throw new Error("Password must be at least 6 characters");
            }
            let decoded;
            try {
                decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET, jwtOptions_1.JWT_VERIFY_OPTIONS);
                // Verificar se o token é do tipo password_reset
                if (decoded.type !== "password_reset") {
                    throw new Error("Invalid token type");
                }
            }
            catch (error) {
                throw new Error("Invalid or expired token");
            }
            const userId = parseInt(decoded.sub);
            const user = yield prisma_1.default.users.findUnique({
                where: {
                    id: userId
                }
            });
            if (!user) {
                throw new Error("User not found");
            }
            // Hash da nova senha
            const passwordHash = yield bcryptjs_1.default.hash(password, 10);
            // Atualizar senha do usuário
            yield prisma_1.default.users.update({
                where: {
                    id: userId
                },
                data: {
                    password: passwordHash
                }
            });
            return { message: "Password has been reset successfully" };
        });
    }
}
exports.ResetPasswordModel = ResetPasswordModel;
//Modelo de listar usuários
class ListUsersModel {
    execute(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const base = {
                select: {
                    id: true,
                    username: true,
                    email: true,
                    created: true,
                    modified: true
                },
                orderBy: {
                    created: 'desc'
                }
            };
            const [total, items] = yield Promise.all([
                prisma_1.default.users.count(),
                prisma_1.default.users.findMany(Object.assign(Object.assign({}, base), { skip: p.skip, take: p.take })),
            ]);
            return { items, total };
        });
    }
}
exports.ListUsersModel = ListUsersModel;
//Modelo de visualizar usuário
class GetUserModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.users.findUnique({
                where: {
                    id: id
                },
                include: {
                    userRoles: {
                        include: {
                            role: {
                                select: {
                                    id: true,
                                    nome: true,
                                    descricao: true
                                }
                            }
                        }
                    }
                }
            });
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                is_admin: user.is_admin,
                created: user.created,
                modified: user.modified,
                grupos: user.userRoles.map((ur) => ur.role)
            };
        });
    }
}
exports.GetUserModel = GetUserModel;
//Modelo de editar usuário
class UpdateUserModel {
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield prisma_1.default.users.findUnique({
                where: { id: id }
            });
            if (!userExists) {
                throw new Error("Usuário não encontrado");
            }
            const updateData = {};
            if (data.username) {
                updateData.username = data.username;
            }
            if (data.email) {
                // Verificar se o email já existe em outro usuário
                const emailExists = yield prisma_1.default.users.findFirst({
                    where: {
                        email: data.email,
                        id: { not: id }
                    }
                });
                if (emailExists) {
                    throw new Error("Email já está em uso por outro usuário");
                }
                updateData.email = data.email;
            }
            if (data.password) {
                if (data.password.length < 6) {
                    throw new Error("A senha deve ter no mínimo 6 caracteres");
                }
                updateData.password = yield bcryptjs_1.default.hash(data.password, 10);
            }
            const user = yield prisma_1.default.users.update({
                where: {
                    id: id
                },
                data: updateData,
                select: {
                    id: true,
                    username: true,
                    email: true,
                    created: true,
                    modified: true
                }
            });
            return user;
        });
    }
}
exports.UpdateUserModel = UpdateUserModel;
//Modelo de deletar usuário
class DeleteUserModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield prisma_1.default.users.findUnique({
                where: { id: id }
            });
            if (!userExists) {
                throw new Error("Usuário não encontrado");
            }
            yield prisma_1.default.users.delete({
                where: {
                    id: id
                }
            });
            return { message: "Usuário deletado com sucesso" };
        });
    }
}
exports.DeleteUserModel = DeleteUserModel;
