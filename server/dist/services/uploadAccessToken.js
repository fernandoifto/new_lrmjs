"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUploadRelativePath = signUploadRelativePath;
exports.verifyUploadAccessToken = verifyUploadAccessToken;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwtOptions_1 = require("../config/jwtOptions");
const TYP = "upload_access";
/** Caminho relativo à pasta uploads, ex.: receitas/arquivo.jpg */
function signUploadRelativePath(relativePath) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET não configurado");
    }
    if (relativePath.includes("..") || relativePath.startsWith("/")) {
        throw new Error("Caminho de upload inválido");
    }
    return (0, jsonwebtoken_1.sign)({ typ: TYP, p: relativePath }, secret, { expiresIn: "1h" });
}
function verifyUploadAccessToken(token, relativePath) {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        return false;
    if (relativePath.includes(".."))
        return false;
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, secret, jwtOptions_1.JWT_VERIFY_OPTIONS);
        return payload.typ === TYP && typeof payload.p === "string" && payload.p === relativePath;
    }
    catch (_a) {
        return false;
    }
}
