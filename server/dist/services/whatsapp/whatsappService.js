"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsappService = exports.WhatsAppServiceFactory = void 0;
const WhatsAppWebService_1 = require("./implementations/WhatsAppWebService");
const WhatsAppBusinessService_1 = require("./implementations/WhatsAppBusinessService");
const whatsappMcpAdapter_1 = require("./mcp/whatsappMcpAdapter");
/**
 * Factory para criar instância do serviço de WhatsApp
 * Escolhe automaticamente entre:
 * - MCP (Model Context Protocol) - se USE_WHATSAPP_MCP=true
 * - WhatsApp Business API - se USE_WHATSAPP_BUSINESS_API=true
 * - WhatsApp Web.js (padrão) - caso contrário
 *
 * Configuração via variável de ambiente:
 * - USE_WHATSAPP_MCP=true -> Usa MCP (recomendado)
 * - USE_WHATSAPP_BUSINESS_API=true -> Usa Business API
 * - Ambos false ou não definidos -> Usa whatsapp-web.js
 */
class WhatsAppServiceFactory {
    static create(config) {
        var _a, _b;
        // Se já existe instância, retorna ela
        if (this.instance) {
            return this.instance;
        }
        // Verifica qual implementação usar (prioridade: MCP > Business API > Web.js)
        const useMCP = (_a = config === null || config === void 0 ? void 0 : config.useMCP) !== null && _a !== void 0 ? _a : process.env.USE_WHATSAPP_MCP === 'true';
        const useBusinessAPI = (_b = config === null || config === void 0 ? void 0 : config.useBusinessAPI) !== null && _b !== void 0 ? _b : process.env.USE_WHATSAPP_BUSINESS_API === 'true';
        if (useMCP) {
            console.log('📱 Usando WhatsApp via MCP (Model Context Protocol)');
            this.instance = new whatsappMcpAdapter_1.WhatsAppMcpAdapter();
        }
        else if (useBusinessAPI) {
            console.log('📱 Usando WhatsApp Business API');
            this.instance = new WhatsAppBusinessService_1.WhatsAppBusinessService(config);
        }
        else {
            console.log('📱 Usando WhatsApp Web.js (desenvolvimento/teste)');
            this.instance = new WhatsAppWebService_1.WhatsAppWebService();
        }
        return this.instance;
    }
    /**
     * Reseta a instância (útil para testes ou troca de implementação)
     */
    static reset() {
        if (this.instance) {
            this.instance.disconnect().catch(console.error);
        }
        this.instance = null;
    }
    /**
     * Obtém a instância atual (singleton)
     */
    static getInstance() {
        return this.instance;
    }
}
exports.WhatsAppServiceFactory = WhatsAppServiceFactory;
WhatsAppServiceFactory.instance = null;
// Exporta instância padrão
exports.whatsappService = WhatsAppServiceFactory.create();
