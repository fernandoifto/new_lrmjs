"use strict";
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
exports.WhatsAppController = void 0;
const whatsappService_1 = require("../services/whatsapp/whatsappService");
const WhatsAppBusinessService_1 = require("../services/whatsapp/implementations/WhatsAppBusinessService");
const whatsappMcpAdapter_1 = require("../services/whatsapp/mcp/whatsappMcpAdapter");
/**
 * Controller para endpoints relacionados ao WhatsApp
 */
class WhatsAppController {
    /**
     * GET /whatsapp/status
     * Retorna status da conexão WhatsApp
     */
    getStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const service = whatsappService_1.whatsappService;
                const isConnected = service.isConnected();
                const connectionInfo = ((_a = service.getConnectionInfo) === null || _a === void 0 ? void 0 : _a.call(service)) || {};
                // Se for WhatsApp Web ou MCP, tentar obter QR Code
                let qrCode = null;
                if ('getQRCode' in service && typeof service.getQRCode === 'function') {
                    qrCode = service.getQRCode();
                }
                else if (service instanceof whatsappMcpAdapter_1.WhatsAppMcpAdapter) {
                    // Para MCP, obter QR Code via método específico (retorna WhatsAppMcpResult, não string)
                    const qrResult = (yield service.getQRCode());
                    if ((qrResult === null || qrResult === void 0 ? void 0 : qrResult.success) && ((_b = qrResult === null || qrResult === void 0 ? void 0 : qrResult.data) === null || _b === void 0 ? void 0 : _b.qrCode)) {
                        qrCode = qrResult.data.qrCode;
                    }
                }
                // Se for MCP, obter status completo
                let statusData = {
                    connected: isConnected,
                    platform: connectionInfo.platform || 'unknown',
                    number: connectionInfo.number || null,
                    name: connectionInfo.name || null,
                    qrCode: qrCode || null
                };
                if (service instanceof whatsappMcpAdapter_1.WhatsAppMcpAdapter) {
                    const statusResult = yield service.getStatus();
                    if (statusResult.success && statusResult.data) {
                        statusData = Object.assign(Object.assign({}, statusData), statusResult.data);
                    }
                }
                return res.json(statusData);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    /**
     * POST /whatsapp/send
     * Envia mensagem via WhatsApp
     */
    sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { to, message } = req.body;
                if (!to || !message) {
                    return res.status(400).json({
                        error: 'Campos "to" e "message" são obrigatórios'
                    });
                }
                const service = whatsappService_1.whatsappService;
                const result = yield service.sendMessage(to, message);
                if (result.success) {
                    return res.json({
                        success: true,
                        messageId: result.messageId,
                        message: 'Mensagem enviada com sucesso'
                    });
                }
                else {
                    return res.status(400).json({
                        success: false,
                        error: result.error
                    });
                }
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    /**
     * GET /whatsapp/webhook
     * Webhook verification (WhatsApp Business API)
     * Meta envia GET para verificar o webhook
     */
    verifyWebhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mode = req.query['hub.mode'];
                const token = req.query['hub.verify_token'];
                const challenge = req.query['hub.challenge'];
                const service = whatsappService_1.whatsappService;
                // Se for Business API, verifica webhook (MCP não usa webhook)
                if (service instanceof WhatsAppBusinessService_1.WhatsAppBusinessService) {
                    const verifiedChallenge = service.verifyWebhook(mode, token, challenge);
                    if (verifiedChallenge) {
                        console.log('✅ Webhook verificado com sucesso');
                        return res.status(200).send(verifiedChallenge);
                    }
                    else {
                        console.log('❌ Falha na verificação do webhook');
                        return res.status(403).json({ error: 'Token de verificação inválido' });
                    }
                }
                // Para whatsapp-web.js e MCP, não há webhook
                return res.status(404).json({ error: 'Webhook não disponível para esta implementação' });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    /**
     * POST /whatsapp/webhook
     * Recebe mensagens do WhatsApp (Business API)
     */
    receiveWebhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = whatsappService_1.whatsappService;
                // Se for Business API, processa webhook (MCP não usa webhook)
                if (service instanceof WhatsAppBusinessService_1.WhatsAppBusinessService) {
                    service.handleWebhookMessage(req.body);
                    // Responde 200 OK imediatamente (Meta requer resposta rápida)
                    return res.status(200).json({ status: 'ok' });
                }
                // Para whatsapp-web.js e MCP, mensagens são recebidas via event listener ou recursos MCP
                return res.status(404).json({ error: 'Webhook não disponível para esta implementação' });
            }
            catch (error) {
                console.error('Erro ao processar webhook:', error);
                // Sempre retorna 200 para evitar retentativas do Meta
                return res.status(200).json({ error: error.message });
            }
        });
    }
    /**
     * POST /whatsapp/initialize
     * Inicializa conexão WhatsApp (WhatsApp Web.js ou MCP)
     */
    initialize(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const service = whatsappService_1.whatsappService;
                // Verifica se já está conectado
                if (service.isConnected()) {
                    return res.json({
                        success: true,
                        message: 'WhatsApp já está conectado',
                        connectionInfo: (_a = service.getConnectionInfo) === null || _a === void 0 ? void 0 : _a.call(service)
                    });
                }
                // Inicializa conexão
                yield service.initialize();
                return res.json({
                    success: true,
                    message: 'WhatsApp inicializado com sucesso',
                    connectionInfo: (_b = service.getConnectionInfo) === null || _b === void 0 ? void 0 : _b.call(service)
                });
            }
            catch (error) {
                return res.status(500).json({
                    error: error.message,
                    message: 'Erro ao inicializar WhatsApp. Verifique os logs para mais detalhes.'
                });
            }
        });
    }
}
exports.WhatsAppController = WhatsAppController;
