"use strict";
/**
 * Adapter que integra o cliente MCP com o sistema existente
 *
 * Este adapter permite usar o WhatsApp via MCP de forma transparente,
 * mantendo compatibilidade com a interface IWhatsAppService.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppMcpAdapter = void 0;
const whatsappMcpClient_1 = require("./whatsappMcpClient");
/**
 * Adapter que implementa IWhatsAppService usando MCP
 */
class WhatsAppMcpAdapter {
    constructor(serverCommand) {
        this.initialized = false;
        this.mcpClient = new whatsappMcpClient_1.WhatsAppMcpClient(serverCommand);
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initialized) {
                return;
            }
            // Conecta ao servidor MCP
            yield this.mcpClient.connect();
            // Inicializa WhatsApp via MCP
            const result = yield this.mcpClient.initialize();
            if (!result.success) {
                throw new Error(result.error || 'Erro ao inicializar WhatsApp via MCP');
            }
            this.initialized = true;
        });
    }
    sendMessage(to, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureInitialized();
            const result = yield this.mcpClient.sendMessage(to, message);
            if (result.success && result.data) {
                return {
                    success: true,
                    messageId: result.data.messageId,
                };
            }
            else {
                return {
                    success: false,
                    error: result.error || 'Erro desconhecido ao enviar mensagem',
                };
            }
        });
    }
    onMessage(callback) {
        this.messageCallback = callback;
        // Nota: Para receber mensagens via MCP, seria necessário
        // implementar recursos (resources) ou prompts no servidor MCP
        // Por enquanto, mantemos compatibilidade com a interface
        console.warn('onMessage configurado, mas recebimento via MCP requer implementação adicional');
    }
    isConnected() {
        // Verifica status via MCP
        // Por enquanto, retorna true se inicializado
        // Idealmente, deveria fazer uma chamada MCP para verificar
        return this.initialized;
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mcpClient.disconnect();
            this.initialized = false;
        });
    }
    getConnectionInfo() {
        // Retorna informações básicas
        // Para informações completas, usar getStatus via MCP
        return {
            platform: 'mcp',
        };
    }
    /**
     * Garante que está inicializado
     */
    ensureInitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.initialized) {
                yield this.initialize();
            }
        });
    }
    /**
     * Obtém status completo via MCP
     */
    getStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureInitialized();
            return yield this.mcpClient.getStatus();
        });
    }
    /**
     * Obtém QR Code via MCP
     */
    getQRCode() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureInitialized();
            return yield this.mcpClient.getQRCode();
        });
    }
}
exports.WhatsAppMcpAdapter = WhatsAppMcpAdapter;
