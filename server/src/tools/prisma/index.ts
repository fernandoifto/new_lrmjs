import { PrismaClient } from "../generated/prisma";

// Garantir que DATABASE_URL está definida
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Inicializar PrismaClient com a URL de conexão padrão
// O Prisma Client já tem suporte nativo para PostgreSQL através da DATABASE_URL
const prismaClient = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

export default prismaClient;