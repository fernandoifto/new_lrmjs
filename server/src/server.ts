import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import path from "path";

import router from "./routes";

const app = express();

app.use(cors());
// Servir arquivos estáticos (fotos de agendamentos) - antes do express.json para evitar conflitos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para processar form-data

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        error: "Internal server error"
    });
});

app.listen(3333, () => {
    console.log("Server is running on port 3333");
});
