"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("./types/express-augment");
const validateEnv_1 = require("./config/validateEnv");
const app_1 = require("./app");
(0, validateEnv_1.validateRequiredEnv)();
// Inicialização opcional do WhatsApp (ambiente de desenvolvimento)
// Em produção com Business API, não é necessário inicializar aqui
if (process.env.AUTO_INIT_WHATSAPP === "true" && process.env.USE_WHATSAPP_BUSINESS_API !== "true") {
    Promise.resolve().then(() => __importStar(require("./services/whatsapp/whatsappService"))).then(({ whatsappService }) => {
        console.log("🔄 Inicializando WhatsApp automaticamente...");
        whatsappService.initialize().catch((error) => {
            console.error("❌ Erro ao inicializar WhatsApp automaticamente:", error.message);
            console.log("💡 Você pode inicializar manualmente via POST /whatsapp/initialize");
        });
    });
}
const app = (0, app_1.buildApp)();
app.listen(3333, () => {
    console.log("Server is running on port 3333");
});
