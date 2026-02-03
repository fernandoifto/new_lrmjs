#!/usr/bin/env node

/**
 * Servidor MCP standalone para WhatsApp
 * 
 * Este arquivo pode ser executado como processo independente para fornecer
 * ferramentas de WhatsApp via MCP através de stdio.
 * 
 * Uso:
 *   node dist/services/whatsapp/mcp/server.js
 *   ou
 *   ts-node src/services/whatsapp/mcp/server.ts
 */

import { WhatsAppMcpServer } from './whatsappMcpServer';

async function main() {
    const server = new WhatsAppMcpServer();
    
    try {
        await server.startStdio();
        
        // Mantém o processo vivo
        process.on('SIGINT', async () => {
            await server.stop();
            process.exit(0);
        });
        
        process.on('SIGTERM', async () => {
            await server.stop();
            process.exit(0);
        });
    } catch (error) {
        console.error('Erro ao iniciar servidor MCP:', error);
        process.exit(1);
    }
}

// Executa apenas se for chamado diretamente
if (require.main === module) {
    main().catch((error) => {
        console.error('Erro fatal:', error);
        process.exit(1);
    });
}
