import "../types/express-augment";
import { Request, Response, NextFunction } from "express";
import prismaClient from "../tools/prisma";

const PERMISSION_CACHE_TTL_MS = 60_000;
const permissionCache = new Map<number, { expiresAt: number; permissions: Set<string> }>();

async function getPermissionsForUser(userId: number): Promise<Set<string>> {
    const now = Date.now();
    const cached = permissionCache.get(userId);
    if (cached && cached.expiresAt > now) {
        return cached.permissions;
    }

    const userRoles = await prismaClient.userRoles.findMany({
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

    const permissions = new Set<string>();
    for (const userRole of userRoles) {
        for (const rolePermissao of userRole.role.rolePermissoes) {
            permissions.add(rolePermissao.permissao.nome);
        }
    }

    permissionCache.set(userId, { permissions, expiresAt: now + PERMISSION_CACHE_TTL_MS });
    return permissions;
}

export function hasPermission(permissionName: string) {
    return async (request: Request, response: Response, next: NextFunction) => {
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
            const permissions = await getPermissionsForUser(authenticatedUser.id);
            const hasPermission = permissions.has(permissionName);

            if (!hasPermission) {
                return response.status(403).json({ error: "Acesso negado. Permissão necessária: " + permissionName });
            }

            request.query.userId = String(authenticatedUser.id);
            return next();
        } catch (error) {
            return response.status(401).json({ error: "Token inválido" });
        }
    };
}

