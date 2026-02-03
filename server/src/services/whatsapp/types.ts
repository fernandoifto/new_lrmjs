// Tipos compartilhados para WhatsApp Service

export interface IncomingMessage {
    from: string;        // Número do remetente (formato: 5511999999999@c.us)
    body: string;        // Texto da mensagem
    timestamp: Date;     // Data/hora
    messageId?: string;  // ID da mensagem (Business API)
    name?: string;       // Nome do contato (se disponível)
}

export interface MessageResult {
    success: boolean;
    messageId?: string;
    error?: string;
}

export interface WhatsAppConfig {
    useMCP?: boolean;              // Usar MCP (Model Context Protocol)
    useBusinessAPI?: boolean;       // Usar Business API
    accessToken?: string;
    phoneNumberId?: string;
    apiUrl?: string;
    webhookVerifyToken?: string;
    mcpServerCommand?: string[];   // Comando para iniciar servidor MCP
}
