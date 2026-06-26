"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachTokenToUploadUrl = attachTokenToUploadUrl;
exports.attachUploadTokensToSolicitacao = attachUploadTokensToSolicitacao;
exports.attachUploadTokensToSolicitacoes = attachUploadTokensToSolicitacoes;
exports.stripFotoReceitaFromSolicitacao = stripFotoReceitaFromSolicitacao;
exports.stripFotoReceitaFromSolicitacoes = stripFotoReceitaFromSolicitacoes;
exports.attachUploadTokensToAgendamentoFotos = attachUploadTokensToAgendamentoFotos;
exports.attachUploadTokensToAgendamentos = attachUploadTokensToAgendamentos;
const uploadAccessToken_1 = require("../services/uploadAccessToken");
const UPLOADS_PREFIX = "/uploads/";
function toRelativeUploadPath(storedPath) {
    if (!storedPath.startsWith(UPLOADS_PREFIX))
        return null;
    return storedPath.slice(UPLOADS_PREFIX.length);
}
/** Anexa token de leitura à URL persistida no banco (não altera o valor armazenado). */
function attachTokenToUploadUrl(storedPath) {
    if (!storedPath)
        return storedPath;
    if (storedPath.startsWith("http://") || storedPath.startsWith("https://"))
        return storedPath;
    const rel = toRelativeUploadPath(storedPath);
    if (!rel)
        return storedPath;
    try {
        const t = (0, uploadAccessToken_1.signUploadRelativePath)(rel);
        return `${storedPath}?t=${encodeURIComponent(t)}`;
    }
    catch (_a) {
        return storedPath;
    }
}
function attachUploadTokensToSolicitacao(s) {
    var _a;
    if (!(s === null || s === void 0 ? void 0 : s.foto_receita))
        return s;
    return Object.assign(Object.assign({}, s), { foto_receita: (_a = attachTokenToUploadUrl(s.foto_receita)) !== null && _a !== void 0 ? _a : s.foto_receita });
}
function attachUploadTokensToSolicitacoes(list) {
    return list.map(attachUploadTokensToSolicitacao);
}
/** Remove foto da receita em respostas públicas (evita vazar URL mesmo com token). */
function stripFotoReceitaFromSolicitacao(s) {
    const { foto_receita: _f } = s, rest = __rest(s, ["foto_receita"]);
    return rest;
}
function stripFotoReceitaFromSolicitacoes(list) {
    return list.map(stripFotoReceitaFromSolicitacao);
}
function attachUploadTokensToAgendamentoFotos(ag) {
    if (!(ag === null || ag === void 0 ? void 0 : ag.fotos))
        return ag;
    try {
        const arr = JSON.parse(ag.fotos);
        if (!Array.isArray(arr))
            return ag;
        const mapped = arr.map((u) => { var _a; return (_a = attachTokenToUploadUrl(u)) !== null && _a !== void 0 ? _a : u; });
        return Object.assign(Object.assign({}, ag), { fotos: JSON.stringify(mapped) });
    }
    catch (_a) {
        return ag;
    }
}
function attachUploadTokensToAgendamentos(list) {
    return list.map(attachUploadTokensToAgendamentoFotos);
}
