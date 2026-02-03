/**
 * Cliente MCP (Model Context Protocol) para WhatsApp
 * 
 * Este cliente consome ferramentas do servidor MCP de WhatsApp,
 * permitindo que o sistema use WhatsApp através do protocolo MCP.
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, Tool } from '@modelcontextprotocol/sdk/types.js';

export interface WhatsAppMcpResult {
    success: boolean;
    data?: any;
    error?: string;
}

/**
 * Cliente MCP para WhatsApp
 */
export class WhatsAppMcpClient {
    private client: Client;
    private transport: StdioClientTransport | null = null;
    private connected: boolean = false;

    constructor(serverCommand: string[] = ['node', 'dist/services/whatsapp/mcp/server.js']) {
        this.client = new Client(
            {
                name: 'whatsapp-mcp-client',
                version: '1.0.0',
            },
            {
                capabilities: {},
            }
        );

        // Configura transporte stdio (conecta ao servidor MCP via processo filho)
        this.transport = new StdioClientTransport({
            command: serverCommand[0],
            args: serverCommand.slice(1),
        });
    }

    /**
     * Conecta ao servidor MCP
     */
    async connect(): Promise<void> {
        if (this.connected) {
            return;
        }

        if (!this.transport) {
            throw new Error('Transport não inicializado');
        }

        await this.client.connect(this.transport);
        this.connected = true;
    }

    /**
     * Desconecta do servidor MCP
     */
    async disconnect(): Promise<void> {
        if (!this.connected) {
            return;
        }

        await this.client.close();
        this.connected = false;
    }

    /**
     * Lista ferramentas disponíveis
     */
    async listTools(): Promise<Tool[]> {
        await this.ensureConnected();

        const response = await this.client.request(
            {
                method: 'tools/list',
            },
            ListToolsRequestSchema
        );

        return response.tools;
    }

    /**
     * Envia mensagem via WhatsApp
     */
    async sendMessage(to: string, message: string): Promise<WhatsAppMcpResult> {
        await this.ensureConnected();

        try {
            const response = await this.client.request(
                {
                    method: 'tools/call',
                    params: {
                        name: 'whatsapp_send_message',
                        arguments: {
                            to,
                            message,
                        },
                    },
                },
                CallToolRequestSchema
            );

            const content = response.content[0];
            if (content.type === 'text') {
                const result = JSON.parse(content.text);
                
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
        } catch (error: any) {
            return {
                success: false,
                error: error.message,
            };
        }
    }

    /**
     * Obtém status da conexão WhatsApp
     */
    async getStatus(): Promise<WhatsAppMcpResult> {
        await this.ensureConnected();

        try {
            const response = await this.client.request(
                {
                    method: 'tools/call',
                    params: {
                        name: 'whatsapp_get_status',
                        arguments: {},
                    },
                },
                CallToolRequestSchema
            );

            const content = response.content[0];
            if (content.type === 'text') {
                const result = JSON.parse(content.text);
                return {
                    success: true,
                    data: result,
                };
            }

            return {
                success: false,
                error: 'Resposta inválida do servidor MCP',
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message,
            };
        }
    }

    /**
     * Inicializa WhatsApp
     */
    async initialize(): Promise<WhatsAppMcpResult> {
        await this.ensureConnected();

        try {
            const response = await this.client.request(
                {
                    method: 'tools/call',
                    params: {
                        name: 'whatsapp_initialize',
                        arguments: {},
                    },
                },
                CallToolRequestSchema
            );

            const content = response.content[0];
            if (content.type === 'text') {
                const result = JSON.parse(content.text);
                
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
        } catch (error: any) {
            return {
                success: false,
                error: error.message,
            };
        }
    }

    /**
     * Obtém QR Code
     */
    async getQRCode(): Promise<WhatsAppMcpResult> {
        await this.ensureConnected();

        try {
            const response = await this.client.request(
                {
                    method: 'tools/call',
                    params: {
                        name: 'whatsapp_get_qr_code',
                        arguments: {},
                    },
                },
                CallToolRequestSchema
            );

            const content = response.content[0];
            if (content.type === 'text') {
                const result = JSON.parse(content.text);
                
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
        } catch (error: any) {
            return {
                success: false,
                error: error.message,
            };
        }
    }

    /**
     * Garante que está conectado
     */
    private async ensureConnected(): Promise<void> {
        if (!this.connected) {
            await this.connect();
        }
    }
}
