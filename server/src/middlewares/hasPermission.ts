import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../tools/prisma";

interface IPayload {
    sub: string;
}

export function hasPermission(permissionName: string) {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            const authToken = request.headers.authorization;
            
            if (!authToken) {
                return response.status(401).json({ error: "Token não fornecido" });
            }
            
            const token = authToken.split(" ")[1];
            const { sub } = verify(token, process.env.JWT_SECRET as string) as IPayload;
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

