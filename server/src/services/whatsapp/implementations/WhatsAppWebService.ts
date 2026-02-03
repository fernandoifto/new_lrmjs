import { Client, LocalAuth, Message } from 'whatsapp-web.js';
import { IWhatsAppService } from '../interfaces/IWhatsAppService';
import { IncomingMessage, MessageResult } from '../types';
import * as qrcode from 'qrcode';

/**
 * Implementação usando whatsapp-web.js (gratuito, para desenvolvimento/teste)
 * 
 * IMPORTANTE: Esta implementação pode violar termos de uso do WhatsApp.
 * Use apenas para desenvolvimento/teste. Para produção, use WhatsApp Business API.
 */
export class WhatsAppWebService implements IWhatsAppService {
    private client: Client;
    private messageCallback?: (message: IncomingMessage) => void;
    private qrCode: string | null = null;
    private isReady: boolean = false;

    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth({
                dataPath: './whatsapp-session'
            }),
            puppeteer: {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-gpu'
                ]
            }
        });

        this.setupEventHandlers();
    }

    private setupEventHandlers(): void {
        // QR Code gerado
        this.client.on('qr', async (qr) => {
            console.log('📱 QR Code gerado. Escaneie com seu WhatsApp.');
            this.qrCode = qr;
            
            // Gerar QR Code como imagem (opcional, para exibir em interface web)
            try {
                const qrImage = await qrcode.toDataURL(qr);
                console.log('QR Code (base64):', qrImage.substring(0, 100) + '...');
            } catch (error) {
                console.error('Erro ao gerar QR Code:', error);
            }
        });

        // Cliente pronto
        this.client.on('ready', () => {
            console.log('✅ WhatsApp Web conectado!');
            this.isReady = true;
            this.qrCode = null;
        });

        // Autenticação realizada
        this.client.on('authenticated', () => {
            console.log('✅ Autenticação realizada!');
        });

        // Falha na autenticação
        this.client.on('auth_failure', (msg) => {
            console.error('❌ Falha na autenticação:', msg);
            this.isReady = false;
        });

        // Desconectado
        this.client.on('disconnected', (reason) => {
            console.log('⚠️ WhatsApp desconectado:', reason);
            this.isReady = false;
        });

        // Mensagem recebida
        this.client.on('message', async (msg: Message) => {
            // Ignorar mensagens próprias
            if (msg.fromMe) return;

            // Ignorar mensagens de grupos (opcional)
            if (msg.from.includes('@g.us')) return;

            if (this.messageCallback) {
                const contact = await msg.getContact();
                this.messageCallback({
                    from: msg.from,
                    body: msg.body,
                    timestamp: new Date(msg.timestamp * 1000),
                    messageId: msg.id._serialized,
                    name: contact.pushname || contact.name || undefined
                });
            }
        });
    }

    async initialize(): Promise<void> {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Timeout ao inicializar WhatsApp. Verifique se o QR Code foi escaneado.'));
            }, 120000); // 2 minutos

            this.client.once('ready', () => {
                clearTimeout(timeout);
                resolve();
            });

            this.client.once('auth_failure', (error) => {
                clearTimeout(timeout);
                reject(new Error(`Falha na autenticação: ${error}`));
            });

            this.client.initialize().catch((error) => {
                clearTimeout(timeout);
                reject(error);
            });
        });
    }

    async sendMessage(to: string, message: string): Promise<MessageResult> {
        try {
            if (!this.isReady) {
                return {
                    success: false,
                    error: 'WhatsApp não está conectado. Aguarde a conexão.'
                };
            }

            // Formatar número (remover caracteres especiais, adicionar @c.us se necessário)
            const formattedNumber = this.formatPhoneNumber(to);
            
            const result = await this.client.sendMessage(formattedNumber, message);
            
            return {
                success: true,
                messageId: result.id._serialized
            };
        } catch (error: any) {
            console.error('Erro ao enviar mensagem:', error);
            return {
                success: false,
                error: error.message || 'Erro desconhecido ao enviar mensagem'
            };
        }
    }

    onMessage(callback: (message: IncomingMessage) => void): void {
        this.messageCallback = callback;
    }

    isConnected(): boolean {
        return this.isReady;
    }

    getQRCode(): string | null {
        return this.qrCode;
    }

    async disconnect(): Promise<void> {
        try {
            await this.client.destroy();
            this.isReady = false;
            console.log('WhatsApp desconectado');
        } catch (error) {
            console.error('Erro ao desconectar:', error);
        }
    }

    getConnectionInfo(): { number?: string; name?: string; platform?: string } {
        if (!this.isReady || !this.client.info) {
            return {};
        }

        return {
            number: this.client.info.wid.user,
            name: this.client.info.pushname,
            platform: 'whatsapp-web.js'
        };
    }

    /**
     * Formata número de telefone para o formato do WhatsApp
     * Exemplo: (11) 99999-9999 ou 11999999999 -> 5511999999999@c.us
     */
    private formatPhoneNumber(phone: string): string {
        // Remove caracteres não numéricos
        let cleaned = phone.replace(/\D/g, '');

        // Se já tem @c.us, retorna como está
        if (phone.includes('@c.us')) {
            return phone;
        }

        // Adiciona código do país se não tiver (assumindo Brasil - 55)
        if (!cleaned.startsWith('55') && cleaned.length <= 11) {
            cleaned = '55' + cleaned;
        }

        // Adiciona sufixo @c.us
        return `${cleaned}@c.us`;
    }
}
