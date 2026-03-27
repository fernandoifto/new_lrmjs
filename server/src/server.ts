import "dotenv/config";
import "./types/express-augment";
import { validateRequiredEnv } from "./config/validateEnv";
import { buildApp } from "./app";

validateRequiredEnv();

// Inicialização opcional do WhatsApp (apenas para desenvolvimento)
// Para produção com Business API, não é necessário inicializar aqui
if (process.env.AUTO_INIT_WHATSAPP === "true" && process.env.USE_WHATSAPP_BUSINESS_API !== "true") {
    import("./services/whatsapp/whatsappService").then(({ whatsappService }) => {
        console.log("🔄 Inicializando WhatsApp automaticamente...");
        whatsappService.initialize().catch((error: Error) => {
            console.error("❌ Erro ao inicializar WhatsApp automaticamente:", error.message);
            console.log("💡 Você pode inicializar manualmente via POST /whatsapp/initialize");
        });
    });
}

const app = buildApp();

app.listen(3333, () => {
    console.log("Server is running on port 3333");
});
