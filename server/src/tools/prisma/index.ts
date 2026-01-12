import { PrismaClient } from "../generated/prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Garantir que DATABASE_URL está definida
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Parsear a URL de conexão
const databaseUrl = String(process.env.DATABASE_URL).trim();
const url = new URL(databaseUrl);

// Extrair parâmetros da URL
const user = decodeURIComponent(url.username);
const password = decodeURIComponent(url.password);
const host = url.hostname;
const port = parseInt(url.port) || 5432;
const database = url.pathname.slice(1).split('?')[0]; // Remove '/' inicial e query params

// Criar pool de conexões PostgreSQL com parâmetros explícitos
const pool = new Pool({
  user: user,
  password: password,
  host: host,
  port: port,
  database: database,
  // Configurações adicionais para garantir conexão estável
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Criar adapter do PostgreSQL
const adapter = new PrismaPg(pool);

// Inicializar PrismaClient com o adapter
const prismaClient = new PrismaClient({ adapter });

export default prismaClient;