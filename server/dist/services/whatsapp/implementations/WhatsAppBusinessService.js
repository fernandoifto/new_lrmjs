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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppBusinessService = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * Implementação usando WhatsApp Business API (oficial, para produção)
 *
 * Esta implementação usa a API oficial do Meta/Facebook para WhatsApp Business.
 * Requer configuração prévia no Meta Business Manager.
 */
class WhatsAppBusinessService {
    constructor(config) {
        this.apiUrl = (config === null || config === void 0 ? void 0 : config.apiUrl) || process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v18.0';
        this.accessToken = (config === null || config === void 0 ? void 0 : config.accessToken) || process.env.WHATSAPP_ACCESS_TOKEN || '';
        this.phoneNumberId = (config === null || config === void 0 ? void 0 : config.phoneNumberId) || process.env.WHATSAPP_PHONE_NUMBER_ID || '';
        this.webhookVerifyToken = (config === null || config === void 0 ? void 0 : config.webhookVerifyToken) || process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || '';
        if (!this.accessToken || !this.phoneNumberId) {
            throw new Error('WhatsApp Business API: Access Token e Phone Number ID são obrigatórios');
        }
        this.axiosInstance = axios_1.default.create({
            baseURL: this.apiUrl,
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            }
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            // Business API não precisa de inicialização como Web
            // A conexão é via HTTP/Webhooks
            console.log('✅ WhatsApp Business API configurado');
            // Verificar se as credenciais são válidas
            try {
                yield this.verifyCredentials();
            }
            catch (error) {
                console.error('⚠️ Erro ao verificar credenciais do WhatsApp Business API:', error);
                throw new Error('Credenciais inválidas do WhatsApp Business API');
            }
        });
    }
    verifyCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield this.axiosInstance.get(`/${this.phoneNumberId}`);
                console.log('✅ Credenciais verificadas. Número:', response.data.display_phone_number);
            }
            catch (error) {
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                    throw new Error('Access Token inválido');
                }
                throw error;
            }
        });
    }
    sendMessage(to, message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                // Formatar número (remover caracteres não numéricos, exceto +)
                const formattedNumber = this.formatPhoneNumber(to);
                const response = yield this.axiosInstance.post(`/${this.phoneNumberId}/messages`, {
                    messaging_product: 'whatsapp',
                    to: formattedNumber,
                    type: 'text',
                    text: { body: message }
                });
                return {
                    success: true,
                    messageId: response.data.messages[0].id
                };
            }
            catch (error) {
                console.error('Erro ao enviar mensagem via Business API:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                const errorMessage = ((_d = (_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message) || error.message || 'Erro desconhecido';
                return {
                    success: false,
                    error: errorMessage
                };
            }
        });
    }
    /**
     * Processa mensagem recebida via webhook
     * Deve ser chamado pelo controller de webhook
     */
    handleWebhookMessage(webhookData) {
        var _a, _b, _c, _d, _e;
        try {
            const entry = (_a = webhookData.entry) === null || _a === void 0 ? void 0 : _a[0];
            const changes = (_b = entry === null || entry === void 0 ? void 0 : entry.changes) === null || _b === void 0 ? void 0 : _b[0];
            const value = changes === null || changes === void 0 ? void 0 : changes.value;
            if (!value || !value.messages)
                return;
            const message = value.messages[0];
            if (message.type === 'text' && this.webhookCallback) {
                this.webhookCallback({
                    from: message.from,
                    body: message.text.body,
                    timestamp: new Date(parseInt(message.timestamp) * 1000),
                    messageId: message.id,
                    name: (_e = (_d = (_c = value.contacts) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.profile) === null || _e === void 0 ? void 0 : _e.name
                });
            }
        }
        catch (error) {
            console.error('Erro ao processar webhook:', error);
        }
    }
    /**
     * Verifica webhook (challenge do Meta)
     */
    verifyWebhook(mode, token, challenge) {
        if (mode === 'subscribe' && token === this.webhookVerifyToken) {
            return challenge;
        }
        return null;
    }
    onMessage(callback) {
        this.webhookCallback = callback;
    }
    isConnected() {
        // Business API sempre está "conectado" via HTTP
        return true;
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            // Não há desconexão necessária para Business API
            console.log('WhatsApp Business API desconectado (não requer ação)');
        });
    }
    getConnectionInfo() {
        return {
            platform: 'whatsapp-business-api',
            number: this.phoneNumberId
        };
    }
    /**
     * Formata número de telefone para o formato do WhatsApp Business API
     * Exemplo: (11) 99999-9999 ou 11999999999 -> 5511999999999
     */
    formatPhoneNumber(phone) {
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
exports.WhatsAppBusinessService = WhatsAppBusinessService;
