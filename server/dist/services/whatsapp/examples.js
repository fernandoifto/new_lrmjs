"use strict";
/**
 * Exemplo de uso do serviço WhatsApp
 *
 * Este arquivo demonstra como usar o serviço de WhatsApp no código.
 */
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
exports.enviarNotificacaoAgendamento = enviarNotificacaoAgendamento;
exports.configurarRecebimentoMensagens = configurarRecebimentoMensagens;
exports.enviarMensagemSegura = enviarMensagemSegura;
exports.formatarTelefoneBR = formatarTelefoneBR;
const whatsappService_1 = require("./whatsappService");
/**
 * Exemplo: Enviar mensagem de notificação de agendamento
 */
function enviarNotificacaoAgendamento(telefone, nome, data, endereco) {
    return __awaiter(this, void 0, void 0, function* () {
        const mensagem = `Olá ${nome}!\n\n` +
            `Seu agendamento foi confirmado para:\n` +
            `📅 Data: ${data}\n` +
            `📍 Endereço: ${endereco}\n\n` +
            `Aguardamos você!`;
        const result = yield whatsappService_1.whatsappService.sendMessage(telefone, mensagem);
        if (result.success) {
            console.log(`✅ Notificação enviada para ${telefone}`);
            return true;
        }
        else {
            console.error(`❌ Erro ao enviar notificação: ${result.error}`);
            return false;
        }
    });
}
/**
 * Exemplo: Configurar callback para receber mensagens
 */
function configurarRecebimentoMensagens() {
    whatsappService_1.whatsappService.onMessage((message) => {
        console.log('📨 Mensagem recebida:');
        console.log(`   De: ${message.from}`);
        console.log(`   Nome: ${message.name || 'Não informado'}`);
        console.log(`   Mensagem: ${message.body}`);
        console.log(`   Data: ${message.timestamp}`);
        // Aqui você pode processar a mensagem
        // Por exemplo, integrar com agente de IA, salvar no banco, etc.
    });
}
/**
 * Exemplo: Verificar status antes de enviar
 */
function enviarMensagemSegura(telefone, mensagem) {
    return __awaiter(this, void 0, void 0, function* () {
        // Verifica se está conectado
        if (!whatsappService_1.whatsappService.isConnected()) {
            return {
                success: false,
                error: 'WhatsApp não está conectado. Aguarde a conexão.'
            };
        }
        // Envia mensagem
        const result = yield whatsappService_1.whatsappService.sendMessage(telefone, mensagem);
        return result;
    });
}
/**
 * Exemplo: Formatar número de telefone brasileiro
 */
function formatarTelefoneBR(telefone) {
    // Remove caracteres não numéricos
    const numeros = telefone.replace(/\D/g, '');
    // Se já tem código do país, retorna como está
    if (numeros.startsWith('55')) {
        return numeros;
    }
    // Adiciona código do país (Brasil)
    return '55' + numeros;
}
