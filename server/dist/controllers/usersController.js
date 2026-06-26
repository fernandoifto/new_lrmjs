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
exports.DeleteUserController = exports.UpdateUserController = exports.GetUserController = exports.ListUsersController = exports.ResetPasswordController = exports.ForgotPasswordController = exports.DetailUserController = exports.CreateUserController = exports.AuthUserController = void 0;
const usersModels_1 = require("../models/usersModels");
const pagination_1 = require("../utils/pagination");
const prisma_1 = __importDefault(require("../tools/prisma"));
class AuthUserController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = request.body;
                const authUser = new usersModels_1.AuthUserModel();
                const user = yield authUser.execute({ email, password });
                return response.json(user);
            }
            catch (error) {
                return response.status(401).json({ error: error.message });
            }
        });
    }
}
exports.AuthUserController = AuthUserController;
class CreateUserController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, grupos_ids } = request.body;
                const createUser = new usersModels_1.CreateUserModel();
                const user = yield createUser.execute({ username, email, password, grupos_ids });
                return response.status(201).json(user);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
class DetailUserController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.query.userId;
                if (!userId) {
                    return response.status(401).json({ error: "User ID not found" });
                }
                const user = yield prisma_1.default.users.findUnique({
                    where: {
                        id: parseInt(userId)
                    },
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        is_admin: true
                    }
                });
                if (!user) {
                    return response.status(404).json({ error: "User not found" });
                }
                return response.json(user);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.DetailUserController = DetailUserController;
class ForgotPasswordController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = request.body;
                const forgotPassword = new usersModels_1.ForgotPasswordModel();
                const result = yield forgotPassword.execute({ email });
                return response.json(result);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ForgotPasswordController = ForgotPasswordController;
class ResetPasswordController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, password } = request.body;
                const resetPassword = new usersModels_1.ResetPasswordModel();
                const result = yield resetPassword.execute({ token, password });
                return response.json(result);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ResetPasswordController = ResetPasswordController;
class ListUsersController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = (0, pagination_1.parsePaginationParams)(request.query);
                const listUsers = new usersModels_1.ListUsersModel();
                const { items, total } = yield listUsers.execute(p);
                return response.json((0, pagination_1.paginatedResponse)(items, total, p.page, p.pageSize));
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ListUsersController = ListUsersController;
class GetUserController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const getUser = new usersModels_1.GetUserModel();
                const user = yield getUser.execute(parseInt(id));
                return response.json(user);
            }
            catch (error) {
                return response.status(404).json({ error: error.message });
            }
        });
    }
}
exports.GetUserController = GetUserController;
class UpdateUserController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const { username, email, password } = request.body;
                const updateUser = new usersModels_1.UpdateUserModel();
                const user = yield updateUser.execute(parseInt(id), {
                    username,
                    email,
                    password
                });
                return response.json(user);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UpdateUserController = UpdateUserController;
class DeleteUserController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const deleteUser = new usersModels_1.DeleteUserModel();
                const result = yield deleteUser.execute(parseInt(id));
                return response.json(result);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.DeleteUserController = DeleteUserController;
