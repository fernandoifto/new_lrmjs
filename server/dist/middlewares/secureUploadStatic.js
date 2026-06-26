"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUploadAccessToken = requireUploadAccessToken;
const uploadAccessToken_1 = require("../services/uploadAccessToken");
/**
 * Montado em /uploads. `req.path` é relativo ao mount (ex.: /receitas/arquivo.jpg).
 */
function requireUploadAccessToken(req, res, next) {
    const rel = req.path.replace(/^\/+/, "");
    if (!rel || rel.includes("..")) {
        return res.status(400).json({ error: "Caminho inválido" });
    }
    const token = typeof req.query.t === "string" ? req.query.t : "";
    if (!token || !(0, uploadAccessToken_1.verifyUploadAccessToken)(token, rel)) {
        return res.status(403).json({ error: "Acesso negado ao arquivo" });
    }
    return next();
}
