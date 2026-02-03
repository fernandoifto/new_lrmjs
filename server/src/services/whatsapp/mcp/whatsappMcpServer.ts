/**
 * Servidor MCP (Model Context Protocol) para WhatsApp
 * 
 * Este servidor expõe ferramentas de WhatsApp através do protocolo MCP,
 * permitindo que modelos de IA e outros clientes MCP interajam com WhatsApp
 * de forma padronizada.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { WhatsAppWebService } from '../implementations/WhatsAppWebService';
import { WhatsAppBusinessService } from '../implementations/WhatsAppBusinessService';
import { IWhatsAppService } from '../interfaces/IWhatsAppService';
import { WhatsAppServiceFactory } from '../whatsappService';

/**
 * Servidor MCP para WhatsApp
 */
export class WhatsAppMcpServer {
    private server: Server;
    private whatsappService: IWhatsAppService;
    private transport: StdioServerTransport | null = null;

    constructor() {
        // Inicializa serviço WhatsApp usando factory
        this.whatsappService = WhatsAppServiceFactory.create();

        // Cria servidor MCP
        this.server = new Server(
            {
                name: 'whatsapp-mcp-server',
                version: '1.0.0',
            },
            {
                capabilities: {
                    tools: {},
                },
            }
        );

        this.setupHandlers();
    }

    /**
     * Configura handlers do servidor MCP
     */
    private setupHandlers(): void {
        // Lista ferramentas disponíveis
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
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
                ] as Tool[],
            };
        });

        // Executa ferramentas
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;

            try {
                switch (name) {
                    case 'whatsapp_send_message':
                        return await this.handleSendMessage(args as { to: string; message: string });

                    case 'whatsapp_get_status':
                        return await this.handleGetStatus();

                    case 'whatsapp_initialize':
                        return await this.handleInitialize();

                    case 'whatsapp_get_qr_code':
                        return await this.handleGetQRCode();

                    default:
                        throw new Error(`Ferramenta desconhecida: ${name}`);
                }
            } catch (error: any) {
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
        });
    }

    /**
     * Handler: Enviar mensagem
     */
    private async handleSendMessage(args: { to: string; message: string }) {
        const { to, message } = args;

        if (!to || !message) {
            throw new Error('Campos "to" e "message" são obrigatórios');
        }

        const result = await this.whatsappService.sendMessage(to, message);

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
        } else {
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
    }

    /**
     * Handler: Obter status
     */
    private async handleGetStatus() {
        const isConnected = this.whatsappService.isConnected();
        const connectionInfo = this.whatsappService.getConnectionInfo?.() || {};

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
    }

    /**
     * Handler: Inicializar WhatsApp
     */
    private async handleInitialize() {
        if (this.whatsappService.isConnected()) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: true,
                            message: 'WhatsApp já está conectado',
                            connectionInfo: this.whatsappService.getConnectionInfo?.(),
                        }, null, 2),
                    },
                ],
            };
        }

        try {
            await this.whatsappService.initialize();

            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: true,
                            message: 'WhatsApp inicializado com sucesso',
                            connectionInfo: this.whatsappService.getConnectionInfo?.(),
                        }, null, 2),
                    },
                ],
            };
        } catch (error: any) {
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
    }

    /**
     * Handler: Obter QR Code
     */
    private async handleGetQRCode() {
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
            } else {
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
        } else {
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
    }

    /**
     * Inicia o servidor MCP usando stdio (para integração com processos)
     */
    async startStdio(): Promise<void> {
        this.transport = new StdioServerTransport();
        await this.server.connect(this.transport);
        console.error('WhatsApp MCP Server iniciado (stdio)');
    }

    /**
     * Para o servidor MCP
     */
    async stop(): Promise<void> {
        if (this.transport) {
            await this.server.close();
            this.transport = null;
        }
    }

    /**
     * Obtém o servidor MCP (para integração com outros transportes)
     */
    getServer(): Server {
        return this.server;
    }
}
