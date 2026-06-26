"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
// Garantir que DATABASE_URL está definida
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
}
// Inicializar PrismaClient com a URL de conexão padrão
// O Prisma Client já tem suporte nativo para PostgreSQL através da DATABASE_URL
const prismaClient = new prisma_1.PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});
exports.default = prismaClient;
