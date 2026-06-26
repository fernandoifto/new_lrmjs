"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePacienteContextQuery = requirePacienteContextQuery;
exports.requirePacienteContextBodyId = requirePacienteContextBodyId;
const pacienteContextToken_1 = require("../services/pacienteContextToken");
function readPacienteContextHeader(req) {
    const h = req.headers["x-paciente-context"];
    if (typeof h === "string")
        return h.trim();
    if (Array.isArray(h) && h[0])
        return h[0].trim();
    return undefined;
}
/** GET ...?paciente=<id> — exige header X-Paciente-Context com JWT emitido após prova de CPF/cadastro. */
function requirePacienteContextQuery(req, res, next) {
    const raw = req.query.paciente;
    const pacienteParam = typeof raw === "string" ? parseInt(raw, 10) : NaN;
    if (!pacienteParam || Number.isNaN(pacienteParam)) {
        return res.status(400).json({ error: "ID do paciente é obrigatório" });
    }
    const token = readPacienteContextHeader(req);
    const idFromToken = (0, pacienteContextToken_1.verifyPacienteContextToken)(token);
    if (idFromToken !== pacienteParam) {
        return res.status(403).json({ error: "Token de contexto do paciente inválido ou expirado" });
    }
    return next();
}
/** POST com id_pacientes no body (multipart ou json) — valida contra X-Paciente-Context. */
function requirePacienteContextBodyId(req, res, next) {
    var _a;
    const raw = (_a = req.body) === null || _a === void 0 ? void 0 : _a.id_pacientes;
    const idBody = typeof raw === "string" ? parseInt(raw, 10) : parseInt(String(raw), 10);
    if (!idBody || Number.isNaN(idBody)) {
        return res.status(400).json({ error: "ID do paciente é obrigatório" });
    }
    const token = readPacienteContextHeader(req);
    const idFromToken = (0, pacienteContextToken_1.verifyPacienteContextToken)(token);
    if (idFromToken !== idBody) {
        return res.status(403).json({ error: "Token de contexto do paciente inválido ou expirado" });
    }
    return next();
}
