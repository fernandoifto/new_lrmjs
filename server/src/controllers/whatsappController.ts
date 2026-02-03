import { Request, Response } from 'express';
import { whatsappService } from '../services/whatsapp/whatsappService';
import { WhatsAppBusinessService } from '../services/whatsapp/implementations/WhatsAppBusinessService';
import { WhatsAppMcpAdapter } from '../services/whatsapp/mcp/whatsappMcpAdapter';

/**
 * Controller para endpoints relacionados ao WhatsApp
 */
class WhatsAppController {
    /**
     * GET /whatsapp/status
     * Retorna status da conexão WhatsApp
     */
    async getStatus(req: Request, res: Response) {
        try {
            const service = whatsappService;
            const isConnected = service.isConnected();
            const connectionInfo = service.getConnectionInfo?.() || {};

            // Se for WhatsApp Web ou MCP, tentar obter QR Code
            let qrCode = null;
            if ('getQRCode' in service && typeof service.getQRCode === 'function') {
                qrCode = service.getQRCode();
            } else if (service instanceof WhatsAppMcpAdapter) {
                // Para MCP, obter QR Code via método específico
                const qrResult = await service.getQRCode();
                if (qrResult.success && qrResult.data?.qrCode) {
                    qrCode = qrResult.data.qrCode;
                }
            }

            // Se for MCP, obter status completo
            let statusData: any = {
                connected: isConnected,
                platform: connectionInfo.platform || 'unknown',
                number: connectionInfo.number || null,
                name: connectionInfo.name || null,
                qrCode: qrCode || null
            };

            if (service instanceof WhatsAppMcpAdapter) {
                const statusResult = await service.getStatus();
                if (statusResult.success && statusResult.data) {
                    statusData = { ...statusData, ...statusResult.data };
                }
            }

            return res.json(statusData);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    /**
     * POST /whatsapp/send
     * Envia mensagem via WhatsApp
     */
    async sendMessage(req: Request, res: Response) {
        try {
            const { to, message } = req.body;

            if (!to || !message) {
                return res.status(400).json({ 
                    error: 'Campos "to" e "message" são obrigatórios' 
                });
            }

            const service = whatsappService;
            const result = await service.sendMessage(to, message);

            if (result.success) {
                return res.json({
                    success: true,
                    messageId: result.messageId,
                    message: 'Mensagem enviada com sucesso'
                });
            } else {
                return res.status(400).json({
                    success: false,
                    error: result.error
                });
            }
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    /**
     * GET /whatsapp/webhook
     * Webhook verification (WhatsApp Business API)
     * Meta envia GET para verificar o webhook
     */
    async verifyWebhook(req: Request, res: Response) {
        try {
            const mode = req.query['hub.mode'] as string;
            const token = req.query['hub.verify_token'] as string;
            const challenge = req.query['hub.challenge'] as string;

            const service = whatsappService;

            // Se for Business API, verifica webhook (MCP não usa webhook)
            if (service instanceof WhatsAppBusinessService) {
                const verifiedChallenge = service.verifyWebhook(mode, token, challenge);
                
                if (verifiedChallenge) {
                    console.log('✅ Webhook verificado com sucesso');
                    return res.status(200).send(verifiedChallenge);
                } else {
                    console.log('❌ Falha na verificação do webhook');
                    return res.status(403).json({ error: 'Token de verificação inválido' });
                }
            }

            // Para whatsapp-web.js e MCP, não há webhook
            return res.status(404).json({ error: 'Webhook não disponível para esta implementação' });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    /**
     * POST /whatsapp/webhook
     * Recebe mensagens do WhatsApp (Business API)
     */
    async receiveWebhook(req: Request, res: Response) {
        try {
            const service = whatsappService;

            // Se for Business API, processa webhook (MCP não usa webhook)
            if (service instanceof WhatsAppBusinessService) {
                service.handleWebhookMessage(req.body);
                
                // Responde 200 OK imediatamente (Meta requer resposta rápida)
                return res.status(200).json({ status: 'ok' });
            }

            // Para whatsapp-web.js e MCP, mensagens são recebidas via event listener ou recursos MCP
            return res.status(404).json({ error: 'Webhook não disponível para esta implementação' });
        } catch (error: any) {
            console.error('Erro ao processar webhook:', error);
            // Sempre retorna 200 para evitar retentativas do Meta
            return res.status(200).json({ error: error.message });
        }
    }

    /**
     * POST /whatsapp/initialize
     * Inicializa conexão WhatsApp (WhatsApp Web.js ou MCP)
     */
    async initialize(req: Request, res: Response) {
        try {
            const service = whatsappService;

            // Verifica se já está conectado
            if (service.isConnected()) {
                return res.json({
                    success: true,
                    message: 'WhatsApp já está conectado',
                    connectionInfo: service.getConnectionInfo?.()
                });
            }

            // Inicializa conexão
            await service.initialize();

            return res.json({
                success: true,
                message: 'WhatsApp inicializado com sucesso',
                connectionInfo: service.getConnectionInfo?.()
            });
        } catch (error: any) {
            return res.status(500).json({ 
                error: error.message,
                message: 'Erro ao inicializar WhatsApp. Verifique os logs para mais detalhes.'
            });
        }
    }
}

export { WhatsAppController };
