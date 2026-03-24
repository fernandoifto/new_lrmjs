import { IWhatsAppService } from './interfaces/IWhatsAppService';
import { WhatsAppWebService } from './implementations/WhatsAppWebService';
import { WhatsAppBusinessService } from './implementations/WhatsAppBusinessService';
import { WhatsAppMcpAdapter } from './mcp/whatsappMcpAdapter';
import { WhatsAppConfig } from './types';

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
export class WhatsAppServiceFactory {
    private static instance: IWhatsAppService | null = null;

    static create(config?: WhatsAppConfig): IWhatsAppService {
        // Se já existe instância, retorna ela
        if (this.instance) {
            return this.instance;
        }

        // Verifica qual implementação usar (prioridade: MCP > Business API > Web.js)
        const useMCP = config?.useMCP ?? 
            process.env.USE_WHATSAPP_MCP === 'true';
        
        const useBusinessAPI = config?.useBusinessAPI ?? 
            process.env.USE_WHATSAPP_BUSINESS_API === 'true';

        if (useMCP) {
            console.log('📱 Usando WhatsApp via MCP (Model Context Protocol)');
            this.instance = new WhatsAppMcpAdapter();
        } else if (useBusinessAPI) {
            console.log('📱 Usando WhatsApp Business API');
            this.instance = new WhatsAppBusinessService(config);
        } else {
            console.log('📱 Usando WhatsApp Web.js (desenvolvimento/teste)');
            this.instance = new WhatsAppWebService();
        }

        return this.instance!;
    }

    /**
     * Reseta a instância (útil para testes ou troca de implementação)
     */
    static reset(): void {
        if (this.instance) {
            this.instance.disconnect().catch(console.error);
        }
        this.instance = null;
    }

    /**
     * Obtém a instância atual (singleton)
     */
    static getInstance(): IWhatsAppService | null {
        return this.instance;
    }
}

// Exporta instância padrão
export const whatsappService = WhatsAppServiceFactory.create();
