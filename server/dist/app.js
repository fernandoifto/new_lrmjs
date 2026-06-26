"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = buildApp;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const secureUploadStatic_1 = require("./middlewares/secureUploadStatic");
const isProd = process.env.NODE_ENV === "production";
/**
 * Aplicação Express (sem listen) — usada em testes com Supertest.
 */
function buildApp() {
    const app = (0, express_1.default)();
    const frontendOrigin = process.env.FRONTEND_ORIGIN;
    app.use(frontendOrigin
        ? (0, cors_1.default)({ origin: frontendOrigin, credentials: true })
        : (0, cors_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use("/uploads", secureUploadStatic_1.requireUploadAccessToken, express_1.default.static(path_1.default.join(__dirname, "../uploads")));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(routes_1.default);
    app.use((err, _req, res, _next) => {
        if (err instanceof Error) {
            // eslint-disable-next-line no-console
            console.error(err);
            return res.status(400).json({
                error: isProd ? "Requisição inválida" : err.message,
            });
        }
        return res.status(500).json({
            error: isProd ? "Erro interno" : "Internal server error",
        });
    });
    return app;
}
