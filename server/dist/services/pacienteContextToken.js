"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.issuePacienteContextToken = issuePacienteContextToken;
exports.verifyPacienteContextToken = verifyPacienteContextToken;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwtOptions_1 = require("../config/jwtOptions");
const TYP = "paciente_ctx";
function issuePacienteContextToken(pacienteId) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET não configurado");
    }
    return (0, jsonwebtoken_1.sign)({ typ: TYP, pacienteId }, secret, { expiresIn: "8h" });
}
/** Retorna o id do paciente se o token for válido; caso contrário null. */
function verifyPacienteContextToken(token) {
    if (!token)
        return null;
    const secret = process.env.JWT_SECRET;
    if (!secret)
        return null;
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, secret, jwtOptions_1.JWT_VERIFY_OPTIONS);
        if (payload.typ !== TYP || typeof payload.pacienteId !== "number") {
            return null;
        }
        return payload.pacienteId;
    }
    catch (_a) {
        return null;
    }
}
