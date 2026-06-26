"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_VERIFY_OPTIONS = exports.JWT_ALGORITHM = void 0;
/** Algoritmo único do projeto (HMAC + JWT_SECRET). Evita aceitar tokens com outro `alg` na verificação. */
exports.JWT_ALGORITHM = "HS256";
exports.JWT_VERIFY_OPTIONS = {
    algorithms: [exports.JWT_ALGORITHM],
};
