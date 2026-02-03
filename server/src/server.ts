import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import path from "path";

import router from "./routes";

// Inicialização opcional do WhatsApp (apenas para desenvolvimento)
// Para produção com Business API, não é necessário inicializar aqui
if (process.env.AUTO_INIT_WHATSAPP === 'true' && process.env.USE_WHATSAPP_BUSINESS_API !== 'true') {
    import('./services/whatsapp/whatsappService').then(({ whatsappService }) => {
        console.log('🔄 Inicializando WhatsApp automaticamente...');
        whatsappService.initialize().catch((error) => {
            console.error('❌ Erro ao inicializar WhatsApp automaticamente:', error.message);
            console.log('💡 Você pode inicializar manualmente via POST /whatsapp/initialize');
        });
    });
}

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
