import axios, { AxiosInstance } from 'axios';
import axios, { AxiosInstance } from 'axios';
import { IWhatsAppService } from '../interfaces/IWhatsAppService';
import { IncomingMessage, MessageResult, WhatsAppConfig } from '../types';

/**
 * Implementação usando WhatsApp Business API (oficial, para produção)
 * 
 * Esta implementação usa a API oficial do Meta/Facebook para WhatsApp Business.
 * Requer configuração prévia no Meta Business Manager.
 */
export class WhatsAppBusinessService implements IWhatsAppService {
    private apiUrl: string;
    private accessToken: string;
    private phoneNumberId: string;
    private webhookVerifyToken: string;
    private webhookCallback?: (message: IncomingMessage) => void;
    private axiosInstance: AxiosInstance;

    constructor(config?: WhatsAppConfig) {
        this.apiUrl = config?.apiUrl || process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v18.0';
        this.accessToken = config?.accessToken || process.env.WHATSAPP_ACCESS_TOKEN || '';
        this.phoneNumberId = config?.phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID || '';
        this.webhookVerifyToken = config?.webhookVerifyToken || process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || '';

        if (!this.accessToken || !this.phoneNumberId) {
            throw new Error('WhatsApp Business API: Access Token e Phone Number ID são obrigatórios');
        }

        this.axiosInstance = axios.create({
            baseURL: this.apiUrl,
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async initialize(): Promise<void> {
        // Business API não precisa de inicialização como Web
        // A conexão é via HTTP/Webhooks
        console.log('✅ WhatsApp Business API configurado');
        
        // Verificar se as credenciais são válidas
        try {
            await this.verifyCredentials();
        } catch (error) {
            console.error('⚠️ Erro ao verificar credenciais do WhatsApp Business API:', error);
            throw new Error('Credenciais inválidas do WhatsApp Business API');
        }
    }

    private async verifyCredentials(): Promise<void> {
        try {
            const response = await this.axiosInstance.get(`/${this.phoneNumberId}`);
            console.log('✅ Credenciais verificadas. Número:', response.data.display_phone_number);
        } catch (error: any) {
            if (error.response?.status === 401) {
                throw new Error('Access Token inválido');
            }
            throw error;
        }
    }

    async sendMessage(to: string, message: string): Promise<MessageResult> {
        try {
            // Formatar número (remover caracteres não numéricos, exceto +)
            const formattedNumber = this.formatPhoneNumber(to);

            const response = await this.axiosInstance.post(
                `/${this.phoneNumberId}/messages`,
                {
                    messaging_product: 'whatsapp',
                    to: formattedNumber,
                    type: 'text',
                    text: { body: message }
                }
            );

            return {
                success: true,
                messageId: response.data.messages[0].id
            };
        } catch (error: any) {
            console.error('Erro ao enviar mensagem via Business API:', error.response?.data || error.message);
            
            const errorMessage = error.response?.data?.error?.message || error.message || 'Erro desconhecido';
            
            return {
                success: false,
                error: errorMessage
            };
        }
    }

    /**
     * Processa mensagem recebida via webhook
     * Deve ser chamado pelo controller de webhook
     */
    handleWebhookMessage(webhookData: any): void {
        try {
            const entry = webhookData.entry?.[0];
            const changes = entry?.changes?.[0];
            const value = changes?.value;

            if (!value || !value.messages) return;

            const message = value.messages[0];
            
            if (message.type === 'text' && this.webhookCallback) {
                this.webhookCallback({
                    from: message.from,
                    body: message.text.body,
                    timestamp: new Date(parseInt(message.timestamp) * 1000),
                    messageId: message.id,
                    name: value.contacts?.[0]?.profile?.name
                });
            }
        } catch (error) {
            console.error('Erro ao processar webhook:', error);
        }
    }

    /**
     * Verifica webhook (challenge do Meta)
     */
    verifyWebhook(mode: string, token: string, challenge: string): string | null {
        if (mode === 'subscribe' && token === this.webhookVerifyToken) {
            return challenge;
        }
        return null;
    }

    onMessage(callback: (message: IncomingMessage) => void): void {
        this.webhookCallback = callback;
    }

    isConnected(): boolean {
        // Business API sempre está "conectado" via HTTP
        return true;
    }

    async disconnect(): Promise<void> {
        // Não há desconexão necessária para Business API
        console.log('WhatsApp Business API desconectado (não requer ação)');
    }

    getConnectionInfo(): { number?: string; name?: string; platform?: string } {
        return {
            platform: 'whatsapp-business-api',
            number: this.phoneNumberId
        };
    }

    /**
     * Formata número de telefone para o formato do WhatsApp Business API
     * Exemplo: (11) 99999-9999 ou 11999999999 -> 5511999999999
     */
    private formatPhoneNumber(phone: string): string {
        // Remove caracteres não numéricos, exceto +
        let cleaned = phone.replace(/[^\d+]/g, '');

        // Remove + se existir
        cleaned = cleaned.replace('+', '');

        // Adiciona código do país se não tiver (assumindo Brasil - 55)
        if (!cleaned.startsWith('55') && cleaned.length <= 11) {
            cleaned = '55' + cleaned;
        }

        return cleaned;
    }
}
