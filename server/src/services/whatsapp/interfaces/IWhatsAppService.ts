import { IncomingMessage, MessageResult } from '../types';

/**
 * Interface comum para serviços de WhatsApp
 * Permite trocar implementação facilmente (whatsapp-web.js ↔ Business API)
 */
export interface IWhatsAppService {
    // Inicializar conexão
    initialize(): Promise<void>;
    
    // Enviar mensagem de texto
    sendMessage(to: string, message: string): Promise<MessageResult>;
    
    // Receber mensagens (via callback ou webhook)
    onMessage(callback: (message: IncomingMessage) => void): void;
    
    // Verificar se está conectado
    isConnected(): boolean;
    
    // Obter QR Code (apenas para whatsapp-web.js)
    getQRCode?(): string | null;
    
    // Desconectar
    disconnect(): Promise<void>;
    
    // Obter informações da conexão
    getConnectionInfo?(): {
        number?: string;
        name?: string;
        platform?: string;
    };
}
