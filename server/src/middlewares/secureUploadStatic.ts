import { Request, Response, NextFunction } from "express";
import { verifyUploadAccessToken } from "../services/uploadAccessToken";

/**
 * Montado em /uploads. `req.path` é relativo ao mount (ex.: /receitas/arquivo.jpg).
 */
export function requireUploadAccessToken(req: Request, res: Response, next: NextFunction) {
    const rel = req.path.replace(/^\/+/, "");
    if (!rel || rel.includes("..")) {
        return res.status(400).json({ error: "Caminho inválido" });
    }
    const token = typeof req.query.t === "string" ? req.query.t : "";
    if (!token || !verifyUploadAccessToken(token, rel)) {
        return res.status(403).json({ error: "Acesso negado ao arquivo" });
    }
    return next();
}
