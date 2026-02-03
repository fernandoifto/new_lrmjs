/**
 * Adapter que integra o cliente MCP com o sistema existente
 * 
 * Este adapter permite usar o WhatsApp via MCP de forma transparente,
 * mantendo compatibilidade com a interface IWhatsAppService.
 */

import { WhatsAppMcpClient, WhatsAppMcpResult } from './whatsappMcpClient';
import { IWhatsAppService } from '../interfaces/IWhatsAppService';
import { IncomingMessage, MessageResult } from '../types';

/**
 * Adapter que implementa IWhatsAppService usando MCP
 */
export class WhatsAppMcpAdapter implements IWhatsAppService {
    private mcpClient: WhatsAppMcpClient;
    private messageCallback?: (message: IncomingMessage) => void;
    private initialized: boolean = false;

    constructor(serverCommand?: string[]) {
        this.mcpClient = new WhatsAppMcpClient(serverCommand);
    }

    async initialize(): Promise<void> {
        if (this.initialized) {
            return;
        }

        // Conecta ao servidor MCP
        await this.mcpClient.connect();

        // Inicializa WhatsApp via MCP
        const result = await this.mcpClient.initialize();
        
        if (!result.success) {
            throw new Error(result.error || 'Erro ao inicializar WhatsApp via MCP');
        }

        this.initialized = true;
    }

    async sendMessage(to: string, message: string): Promise<MessageResult> {
        await this.ensureInitialized();

        const result = await this.mcpClient.sendMessage(to, message);

        if (result.success && result.data) {
            return {
                success: true,
                messageId: result.data.messageId,
            };
        } else {
            return {
                success: false,
                error: result.error || 'Erro desconhecido ao enviar mensagem',
            };
        }
    }

    onMessage(callback: (message: IncomingMessage) => void): void {
        this.messageCallback = callback;
        
        // Nota: Para receber mensagens via MCP, seria necessário
        // implementar recursos (resources) ou prompts no servidor MCP
        // Por enquanto, mantemos compatibilidade com a interface
        console.warn('onMessage configurado, mas recebimento via MCP requer implementação adicional');
    }

    isConnected(): boolean {
        // Verifica status via MCP
        // Por enquanto, retorna true se inicializado
        // Idealmente, deveria fazer uma chamada MCP para verificar
        return this.initialized;
    }

    async disconnect(): Promise<void> {
        await this.mcpClient.disconnect();
        this.initialized = false;
    }

    getConnectionInfo?(): { number?: string; name?: string; platform?: string } {
        // Retorna informações básicas
        // Para informações completas, usar getStatus via MCP
        return {
            platform: 'mcp',
        };
    }

    /**
     * Garante que está inicializado
     */
    private async ensureInitialized(): Promise<void> {
        if (!this.initialized) {
            await this.initialize();
        }
    }

    /**
     * Obtém status completo via MCP
     */
    async getStatus(): Promise<WhatsAppMcpResult> {
        await this.ensureInitialized();
        return await this.mcpClient.getStatus();
    }

    /**
     * Obtém QR Code via MCP
     */
    async getQRCode(): Promise<WhatsAppMcpResult> {
        await this.ensureInitialized();
        return await this.mcpClient.getQRCode();
    }
}
