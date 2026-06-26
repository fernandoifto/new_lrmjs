"use strict";
/**
 * Cliente MCP (Model Context Protocol) para WhatsApp
 *
 * Este cliente consome ferramentas do servidor MCP de WhatsApp,
 * permitindo que o sistema use WhatsApp através do protocolo MCP.
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
exports.WhatsAppMcpClient = void 0;
const index_js_1 = require("@modelcontextprotocol/sdk/client/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/client/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
/**
 * Cliente MCP para WhatsApp
 */
class WhatsAppMcpClient {
    constructor(serverCommand = ['node', 'dist/services/whatsapp/mcp/server.js']) {
        this.transport = null;
        this.connected = false;
        this.client = new index_js_1.Client({
            name: 'whatsapp-mcp-client',
            version: '1.0.0',
        }, {
            capabilities: {},
        });
        // Configura transporte stdio (conecta ao servidor MCP via processo filho)
        this.transport = new stdio_js_1.StdioClientTransport({
            command: serverCommand[0],
            args: serverCommand.slice(1),
        });
    }
    /**
     * Conecta ao servidor MCP
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connected) {
                return;
            }
            if (!this.transport) {
                throw new Error('Transport não inicializado');
            }
            yield this.client.connect(this.transport);
            this.connected = true;
        });
    }
    /**
     * Desconecta do servidor MCP
     */
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connected) {
                return;
            }
            yield this.client.close();
            this.connected = false;
        });
    }
    /**
     * Lista ferramentas disponíveis
     */
    listTools() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureConnected();
            const response = (yield this.client.request({
                method: 'tools/list',
            }, types_js_1.ListToolsRequestSchema));
            return response.tools;
        });
    }
    /**
     * Envia mensagem via WhatsApp
     */
    sendMessage(to, message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            yield this.ensureConnected();
            try {
                const response = (yield this.client.request({
                    method: 'tools/call',
                    params: {
                        name: 'whatsapp_send_message',
                        arguments: {
                            to,
                            message,
                        },
                    },
                }, types_js_1.CallToolRequestSchema));
                const content = (_a = response.content) === null || _a === void 0 ? void 0 : _a[0];
                if ((content === null || content === void 0 ? void 0 : content.type) === 'text') {
                    const raw = (_b = content.text) !== null && _b !== void 0 ? _b : '{}';
                    const result = JSON.parse(raw);
                    if (response.isError) {
                        return {
                            success: false,
                            error: result.error || 'Erro desconhecido',
                        };
                    }
                    return {
                        success: result.success || true,
                        data: result,
                    };
                }
                return {
                    success: false,
                    error: 'Resposta inválida do servidor MCP',
                };
            }
            catch (error) {
                return {
                    success: false,
                    error: error.message,
                };
            }
        });
    }
    /**
     * Obtém status da conexão WhatsApp
     */
    getStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            yield this.ensureConnected();
            try {
                const response = (yield this.client.request({
                    method: 'tools/call',
                    params: {
                        name: 'whatsapp_get_status',
                        arguments: {},
                    },
                }, types_js_1.CallToolRequestSchema));
                const content = (_a = response.content) === null || _a === void 0 ? void 0 : _a[0];
                if ((content === null || content === void 0 ? void 0 : content.type) === 'text') {
                    const raw = (_b = content.text) !== null && _b !== void 0 ? _b : '{}';
                    const result = JSON.parse(raw);
                    return {
                        success: true,
                        data: result,
                    };
                }
                return {
                    success: false,
                    error: 'Resposta inválida do servidor MCP',
                };
            }
            catch (error) {
                return {
                    success: false,
                    error: error.message,
                };
            }
        });
    }
    /**
     * Inicializa WhatsApp
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            yield this.ensureConnected();
            try {
                const response = (yield this.client.request({
                    method: 'tools/call',
                    params: {
                        name: 'whatsapp_initialize',
                        arguments: {},
                    },
                }, types_js_1.CallToolRequestSchema));
                const content = (_a = response.content) === null || _a === void 0 ? void 0 : _a[0];
                if ((content === null || content === void 0 ? void 0 : content.type) === 'text') {
                    const raw = (_b = content.text) !== null && _b !== void 0 ? _b : '{}';
                    const result = JSON.parse(raw);
                    if (response.isError) {
                        return {
                            success: false,
                            error: result.error || 'Erro desconhecido',
                        };
                    }
                    return {
                        success: result.success || true,
                        data: result,
                    };
                }
                return {
                    success: false,
                    error: 'Resposta inválida do servidor MCP',
                };
            }
            catch (error) {
                return {
                    success: false,
                    error: error.message,
                };
            }
        });
    }
    /**
     * Obtém QR Code
     */
    getQRCode() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            yield this.ensureConnected();
            try {
                const response = (yield this.client.request({
                    method: 'tools/call',
                    params: {
                        name: 'whatsapp_get_qr_code',
                        arguments: {},
                    },
                }, types_js_1.CallToolRequestSchema));
                const content = (_a = response.content) === null || _a === void 0 ? void 0 : _a[0];
                if ((content === null || content === void 0 ? void 0 : content.type) === 'text') {
                    const raw = (_b = content.text) !== null && _b !== void 0 ? _b : '{}';
                    const result = JSON.parse(raw);
                    if (response.isError) {
                        return {
                            success: false,
                            error: result.error || 'Erro desconhecido',
                        };
                    }
                    return {
                        success: true,
                        data: result,
                    };
                }
                return {
                    success: false,
                    error: 'Resposta inválida do servidor MCP',
                };
            }
            catch (error) {
                return {
                    success: false,
                    error: error.message,
                };
            }
        });
    }
    /**
     * Garante que está conectado
     */
    ensureConnected() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connected) {
                yield this.connect();
            }
        });
    }
}
exports.WhatsAppMcpClient = WhatsAppMcpClient;
