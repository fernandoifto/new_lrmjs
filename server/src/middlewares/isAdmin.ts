import { Request, Response, NextFunction } from "express";

/**
 * Deve ser usado após `isAuthenticated`.
 * Garante que apenas usuários com `is_admin` acessem rotas sensíveis (RBAC administrativo).
 */
export function isAdmin(request: Request, response: Response, next: NextFunction) {
    const user = (request as Request & { user?: { is_admin?: boolean } }).user;
    if (!user?.is_admin) {
        return response.status(403).json({ error: "Apenas administradores podem acessar este recurso." });
    }
    return next();
}
