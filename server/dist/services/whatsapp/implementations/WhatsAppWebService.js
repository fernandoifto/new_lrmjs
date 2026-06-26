"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.WhatsAppWebService = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode = __importStar(require("qrcode"));
/**
 * Implementação usando whatsapp-web.js (gratuito, para desenvolvimento/teste)
 *
 * IMPORTANTE: Esta implementação pode violar termos de uso do WhatsApp.
 * Use apenas para desenvolvimento/teste. Para produção, use WhatsApp Business API.
 */
class WhatsAppWebService {
    constructor() {
        this.qrCode = null;
        this.isReady = false;
        this.client = new whatsapp_web_js_1.Client({
            authStrategy: new whatsapp_web_js_1.LocalAuth({
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
    setupEventHandlers() {
        // QR Code gerado
        this.client.on('qr', (qr) => __awaiter(this, void 0, void 0, function* () {
            console.log('📱 QR Code gerado. Escaneie com seu WhatsApp.');
            this.qrCode = qr;
            // Gerar QR Code como imagem (opcional, para exibir em interface web)
            try {
                const qrImage = yield qrcode.toDataURL(qr);
                console.log('QR Code (base64):', qrImage.substring(0, 100) + '...');
            }
            catch (error) {
                console.error('Erro ao gerar QR Code:', error);
            }
        }));
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
        this.client.on('message', (msg) => __awaiter(this, void 0, void 0, function* () {
            // Ignorar mensagens próprias
            if (msg.fromMe)
                return;
            // Ignorar mensagens de grupos (opcional)
            if (msg.from.includes('@g.us'))
                return;
            if (this.messageCallback) {
                const contact = yield msg.getContact();
                this.messageCallback({
                    from: msg.from,
                    body: msg.body,
                    timestamp: new Date(msg.timestamp * 1000),
                    messageId: msg.id._serialized,
                    name: contact.pushname || contact.name || undefined
                });
            }
        }));
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    sendMessage(to, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.isReady) {
                    return {
                        success: false,
                        error: 'WhatsApp não está conectado. Aguarde a conexão.'
                    };
                }
                // Formatar número (remover caracteres especiais, adicionar @c.us se necessário)
                const formattedNumber = this.formatPhoneNumber(to);
                const result = yield this.client.sendMessage(formattedNumber, message);
                return {
                    success: true,
                    messageId: result.id._serialized
                };
            }
            catch (error) {
                console.error('Erro ao enviar mensagem:', error);
                return {
                    success: false,
                    error: error.message || 'Erro desconhecido ao enviar mensagem'
                };
            }
        });
    }
    onMessage(callback) {
        this.messageCallback = callback;
    }
    isConnected() {
        return this.isReady;
    }
    getQRCode() {
        return this.qrCode;
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.destroy();
                this.isReady = false;
                console.log('WhatsApp desconectado');
            }
            catch (error) {
                console.error('Erro ao desconectar:', error);
            }
        });
    }
    getConnectionInfo() {
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
    formatPhoneNumber(phone) {
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
exports.WhatsAppWebService = WhatsAppWebService;
