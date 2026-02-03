/**
 * Exemplo de uso do serviço WhatsApp
 * 
 * Este arquivo demonstra como usar o serviço de WhatsApp no código.
 */

import { whatsappService } from './whatsappService';

/**
 * Exemplo: Enviar mensagem de notificação de agendamento
 */
export async function enviarNotificacaoAgendamento(
    telefone: string,
    nome: string,
    data: string,
    endereco: string
): Promise<boolean> {
    const mensagem = `Olá ${nome}!\n\n` +
        `Seu agendamento foi confirmado para:\n` +
        `📅 Data: ${data}\n` +
        `📍 Endereço: ${endereco}\n\n` +
        `Aguardamos você!`;

    const result = await whatsappService.sendMessage(telefone, mensagem);
    
    if (result.success) {
        console.log(`✅ Notificação enviada para ${telefone}`);
        return true;
    } else {
        console.error(`❌ Erro ao enviar notificação: ${result.error}`);
        return false;
    }
}

/**
 * Exemplo: Configurar callback para receber mensagens
 */
export function configurarRecebimentoMensagens(): void {
    whatsappService.onMessage((message) => {
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
export async function enviarMensagemSegura(
    telefone: string,
    mensagem: string
): Promise<{ success: boolean; error?: string }> {
    // Verifica se está conectado
    if (!whatsappService.isConnected()) {
        return {
            success: false,
            error: 'WhatsApp não está conectado. Aguarde a conexão.'
        };
    }

    // Envia mensagem
    const result = await whatsappService.sendMessage(telefone, mensagem);
    
    return result;
}

/**
 * Exemplo: Formatar número de telefone brasileiro
 */
export function formatarTelefoneBR(telefone: string): string {
    // Remove caracteres não numéricos
    const numeros = telefone.replace(/\D/g, '');
    
    // Se já tem código do país, retorna como está
    if (numeros.startsWith('55')) {
        return numeros;
    }
    
    // Adiciona código do país (Brasil)
    return '55' + numeros;
}
