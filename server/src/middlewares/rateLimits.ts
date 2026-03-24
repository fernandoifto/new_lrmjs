import type { RequestHandler } from "express";
import rateLimit from "express-rate-limit";

const noopLimiter: RequestHandler = (_req, _res, next) => next();

const skipRateLimit = process.env.NODE_ENV === "test";

export const loginLimiter = skipRateLimit
    ? noopLimiter
    : rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Muitas tentativas. Tente novamente em alguns minutos." },
    });

export const passwordResetLimiter = skipRateLimit
    ? noopLimiter
    : rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Muitas solicitações de recuperação. Tente mais tarde." },
    });

export const publicDataLimiter = skipRateLimit
    ? noopLimiter
    : rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Muitas requisições. Aguarde e tente novamente." },
    });
