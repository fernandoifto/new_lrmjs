import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
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

    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
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
