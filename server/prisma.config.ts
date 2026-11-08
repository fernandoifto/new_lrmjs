import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * A CLI usa a conexão direta nas migrações. O cliente em runtime continua
 * na DATABASE_URL (pooler) pelo adapter do PostgreSQL.
 * Sem variável no ambiente, o generate ainda roda; migrate exige uma URL.
 */
const url = process.env.DIRECT_URL || process.env.DATABASE_URL || "";

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url,
    },
});
