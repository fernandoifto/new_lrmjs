import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import router from "./routes";
import { requireUploadAccessToken } from "./middlewares/secureUploadStatic";

const isProd = process.env.NODE_ENV === "production";

/**
 * Aplicação Express (sem listen) — usada em testes com Supertest.
 */
export function buildApp() {
    const app = express();
    // Mantém o parser estendido do Express 4. A versão instalada do qs já inclui a correção de segurança.
    app.set("query parser", "extended");

    const frontendOrigin = process.env.FRONTEND_ORIGIN;
    app.use(
        frontendOrigin
            ? cors({ origin: frontendOrigin, credentials: true })
            : cors()
    );

    app.use(cookieParser());

    app.use(
        "/uploads",
        requireUploadAccessToken,
        express.static(path.join(__dirname, "../uploads"))
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(router);

    app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
        if (res.headersSent) {
            next(err);
            return;
        }

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
