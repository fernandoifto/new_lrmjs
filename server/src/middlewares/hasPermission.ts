import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../tools/prisma";
import { JWT_VERIFY_OPTIONS } from "../config/jwtOptions";
import { getAuthTokenFromRequest } from "./getAuthToken";

interface IPayload {
    sub: string;
}

export function hasPermission(permissionName: string) {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            const token = getAuthTokenFromRequest(request);

            if (!token) {
                return response.status(401).json({ error: "Token não fornecido" });
            }
            const { sub } = verify(token, process.env.JWT_SECRET as string, JWT_VERIFY_OPTIONS) as IPayload;
            const userId = Number(sub);

            // Buscar usuário
            const user = await prismaClient.users.findUnique({
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
                return response.status(401).json({ error: "Usuário não encontrado" });
            }

            // Se for admin, permite tudo
            if (user.is_admin) {
                request.query.userId = sub;
                return next();
            }

            // Verificar se o usuário tem a permissão necessária
            const hasPermission = user.userRoles.some((userRole: { role: { rolePermissoes: Array<{ permissao: { nome: string } }> } }) => 
                userRole.role.rolePermissoes.some((rp: { permissao: { nome: string } }) => 
                    rp.permissao.nome === permissionName
                )
            );

            if (!hasPermission) {
                return response.status(403).json({ error: "Acesso negado. Permissão necessária: " + permissionName });
            }

            request.query.userId = sub;
            return next();
        } catch (error) {
            return response.status(401).json({ error: "Token inválido" });
        }
    };
}

