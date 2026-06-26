"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicDataLimiter = exports.passwordResetLimiter = exports.loginLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const noopLimiter = (_req, _res, next) => next();
const skipRateLimit = process.env.NODE_ENV === "test";
exports.loginLimiter = skipRateLimit
    ? noopLimiter
    : (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 30,
        standardHeaders: true,
        legacyHeaders: false,
        message: { error: "Muitas tentativas. Tente novamente em alguns minutos." },
    });
exports.passwordResetLimiter = skipRateLimit
    ? noopLimiter
    : (0, express_rate_limit_1.default)({
        windowMs: 60 * 60 * 1000,
        max: 10,
        standardHeaders: true,
        legacyHeaders: false,
        message: { error: "Muitas solicitações de recuperação. Tente mais tarde." },
    });
exports.publicDataLimiter = skipRateLimit
    ? noopLimiter
    : (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: { error: "Muitas requisições. Aguarde e tente novamente." },
    });
