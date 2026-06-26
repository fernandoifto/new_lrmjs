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
exports.hasPermission = hasPermission;
require("../types/express-augment");
const prisma_1 = __importDefault(require("../tools/prisma"));
const PERMISSION_CACHE_TTL_MS = 60000;
const permissionCache = new Map();
function getPermissionsForUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const now = Date.now();
        const cached = permissionCache.get(userId);
        if (cached && cached.expiresAt > now) {
            return cached.permissions;
        }
        const userRoles = yield prisma_1.default.userRoles.findMany({
            where: { id_user: userId },
            select: {
                role: {
                    select: {
                        rolePermissoes: {
                            select: {
                                permissao: {
                                    select: { nome: true }
                                }
                            }
                        }
                    }
                }
            }
        });
        const permissions = new Set();
        for (const userRole of userRoles) {
            for (const rolePermissao of userRole.role.rolePermissoes) {
                permissions.add(rolePermissao.permissao.nome);
            }
        }
        permissionCache.set(userId, { permissions, expiresAt: now + PERMISSION_CACHE_TTL_MS });
        return permissions;
    });
}
function hasPermission(permissionName) {
    return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const authenticatedUser = request.user;
            if (!authenticatedUser) {
                return response.status(401).json({ error: "Usuário não autenticado" });
            }
            // Se for admin, permite tudo
            if (authenticatedUser.is_admin) {
                request.query.userId = String(authenticatedUser.id);
                return next();
            }
            // Verificar se o usuário tem a permissão necessária
            const permissions = yield getPermissionsForUser(authenticatedUser.id);
            const hasPermission = permissions.has(permissionName);
            if (!hasPermission) {
                return response.status(403).json({ error: "Acesso negado. Permissão necessária: " + permissionName });
            }
            request.query.userId = String(authenticatedUser.id);
            return next();
        }
        catch (error) {
            return response.status(401).json({ error: "Token inválido" });
        }
    });
}
