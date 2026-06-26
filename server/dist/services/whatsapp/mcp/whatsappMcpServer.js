"use strict";
/**
 * Servidor MCP (Model Context Protocol) para WhatsApp
 *
 * Este servidor expõe ferramentas de WhatsApp através do protocolo MCP,
 * permitindo que modelos de IA e outros clientes MCP interajam com WhatsApp
 * de forma padronizada.
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
exports.WhatsAppMcpServer = void 0;
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const whatsappService_1 = require("../whatsappService");
/**
 * Servidor MCP para WhatsApp
 */
class WhatsAppMcpServer {
    constructor() {
        this.transport = null;
        // Inicializa serviço WhatsApp usando factory
        this.whatsappService = whatsappService_1.WhatsAppServiceFactory.create();
        // Cria servidor MCP
        this.server = new index_js_1.Server({
            name: 'whatsapp-mcp-server',
            version: '1.0.0',
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupHandlers();
    }
    /**
     * Configura handlers do servidor MCP
     */
    setupHandlers() {
        // Lista ferramentas disponíveis
        this.server.setRequestHandler(types_js_1.ListToolsRequestSchema, () => __awaiter(this, void 0, void 0, function* () {
            return {
                tools: [
                    {
                        name: 'whatsapp_send_message',
                        description: 'Envia uma mensagem de texto via WhatsApp para um número de telefone',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                to: {
                                    type: 'string',
                                    description: 'Número de telefone do destinatário (formato: 5511999999999 ou com código do país)',
                                },
                                message: {
                                    type: 'string',
                                    description: 'Texto da mensagem a ser enviada',
                                },
                            },
                            required: ['to', 'message'],
                        },
                    },
                    {
                        name: 'whatsapp_get_status',
                        description: 'Obtém o status da conexão WhatsApp (conectado, número, plataforma)',
                        inputSchema: {
                            type: 'object',
                            properties: {},
                        },
                    },
                    {
                        name: 'whatsapp_initialize',
                        description: 'Inicializa a conexão WhatsApp (apenas para WhatsApp Web.js, requer QR Code)',
                        inputSchema: {
                            type: 'object',
                            properties: {},
                        },
                    },
                    {
                        name: 'whatsapp_get_qr_code',
                        description: 'Obtém o QR Code para autenticação (apenas para WhatsApp Web.js)',
                        inputSchema: {
                            type: 'object',
                            properties: {},
                        },
                    },
                ],
            };
        }));
        // Executa ferramentas
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, (request) => __awaiter(this, void 0, void 0, function* () {
            const { name, arguments: args } = request.params;
            try {
                switch (name) {
                    case 'whatsapp_send_message':
                        return yield this.handleSendMessage(args);
                    case 'whatsapp_get_status':
                        return yield this.handleGetStatus();
                    case 'whatsapp_initialize':
                        return yield this.handleInitialize();
                    case 'whatsapp_get_qr_code':
                        return yield this.handleGetQRCode();
                    default:
                        throw new Error(`Ferramenta desconhecida: ${name}`);
                }
            }
            catch (error) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Erro ao executar ferramenta ${name}: ${error.message}`,
                        },
                    ],
                    isError: true,
                };
            }
        }));
    }
    /**
     * Handler: Enviar mensagem
     */
    handleSendMessage(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { to, message } = args;
            if (!to || !message) {
                throw new Error('Campos "to" e "message" são obrigatórios');
            }
            const result = yield this.whatsappService.sendMessage(to, message);
            if (result.success) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                success: true,
                                messageId: result.messageId,
                                message: 'Mensagem enviada com sucesso',
                            }, null, 2),
                        },
                    ],
                };
            }
            else {
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                success: false,
                                error: result.error,
                            }, null, 2),
                        },
                    ],
                    isError: true,
                };
            }
        });
    }
    /**
     * Handler: Obter status
     */
    handleGetStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const isConnected = this.whatsappService.isConnected();
            const connectionInfo = ((_b = (_a = this.whatsappService).getConnectionInfo) === null || _b === void 0 ? void 0 : _b.call(_a)) || {};
            // Tentar obter QR Code se disponível
            let qrCode = null;
            if ('getQRCode' in this.whatsappService && typeof this.whatsappService.getQRCode === 'function') {
                qrCode = this.whatsappService.getQRCode();
            }
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            connected: isConnected,
                            platform: connectionInfo.platform || 'unknown',
                            number: connectionInfo.number || null,
                            name: connectionInfo.name || null,
                            qrCode: qrCode || null,
                        }, null, 2),
                    },
                ],
            };
        });
    }
    /**
     * Handler: Inicializar WhatsApp
     */
    handleInitialize() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            if (this.whatsappService.isConnected()) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                success: true,
                                message: 'WhatsApp já está conectado',
                                connectionInfo: (_b = (_a = this.whatsappService).getConnectionInfo) === null || _b === void 0 ? void 0 : _b.call(_a),
                            }, null, 2),
                        },
                    ],
                };
            }
            try {
                yield this.whatsappService.initialize();
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                success: true,
                                message: 'WhatsApp inicializado com sucesso',
                                connectionInfo: (_d = (_c = this.whatsappService).getConnectionInfo) === null || _d === void 0 ? void 0 : _d.call(_c),
                            }, null, 2),
                        },
                    ],
                };
            }
            catch (error) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                success: false,
                                error: error.message,
                            }, null, 2),
                        },
                    ],
                    isError: true,
                };
            }
        });
    }
    /**
     * Handler: Obter QR Code
     */
    handleGetQRCode() {
        return __awaiter(this, void 0, void 0, function* () {
            if ('getQRCode' in this.whatsappService && typeof this.whatsappService.getQRCode === 'function') {
                const qrCode = this.whatsappService.getQRCode();
                if (qrCode) {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: JSON.stringify({
                                    qrCode: qrCode,
                                    message: 'Escaneie este QR Code com seu WhatsApp',
                                }, null, 2),
                            },
                        ],
                    };
                }
                else {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: JSON.stringify({
                                    qrCode: null,
                                    message: 'QR Code não disponível. WhatsApp pode já estar conectado ou não foi inicializado.',
                                }, null, 2),
                            },
                        ],
                    };
                }
            }
            else {
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                error: 'QR Code não disponível para esta implementação (apenas WhatsApp Web.js)',
                            }, null, 2),
                        },
                    ],
                    isError: true,
                };
            }
        });
    }
    /**
     * Inicia o servidor MCP usando stdio (para integração com processos)
     */
    startStdio() {
        return __awaiter(this, void 0, void 0, function* () {
            this.transport = new stdio_js_1.StdioServerTransport();
            yield this.server.connect(this.transport);
            console.error('WhatsApp MCP Server iniciado (stdio)');
        });
    }
    /**
     * Para o servidor MCP
     */
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.transport) {
                yield this.server.close();
                this.transport = null;
            }
        });
    }
    /**
     * Obtém o servidor MCP (para integração com outros transportes)
     */
    getServer() {
        return this.server;
    }
}
exports.WhatsAppMcpServer = WhatsAppMcpServer;
