#!/usr/bin/env node
"use strict";
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
const whatsappMcpServer_1 = require("./whatsappMcpServer");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new whatsappMcpServer_1.WhatsAppMcpServer();
        try {
            yield server.startStdio();
            // Mantém o processo vivo
            process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
                yield server.stop();
                process.exit(0);
            }));
            process.on('SIGTERM', () => __awaiter(this, void 0, void 0, function* () {
                yield server.stop();
                process.exit(0);
            }));
        }
        catch (error) {
            console.error('Erro ao iniciar servidor MCP:', error);
            process.exit(1);
        }
    });
}
// Executa apenas se for chamado diretamente
if (require.main === module) {
    main().catch((error) => {
        console.error('Erro fatal:', error);
        process.exit(1);
    });
}
