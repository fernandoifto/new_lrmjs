"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = isAdmin;
/**
 * Deve ser usado após `isAuthenticated`.
 * Garante que apenas usuários com `is_admin` acessem rotas sensíveis (RBAC administrativo).
 */
function isAdmin(request, response, next) {
    const user = request.user;
    if (!(user === null || user === void 0 ? void 0 : user.is_admin)) {
        return response.status(403).json({ error: "Apenas administradores podem acessar este recurso." });
    }
    return next();
}
