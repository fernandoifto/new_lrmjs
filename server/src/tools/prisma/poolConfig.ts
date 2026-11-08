import type { PoolConfig } from "pg";

export type DatabasePoolSettings = {
    poolConfig: PoolConfig;
    schema?: string;
};

/**
 * O driver `pg` (usado pelo Prisma 7) interpreta `sslmode=require` e `prefer`
 * como TLS com verificação de certificado. O Prisma 6 seguia o libpq: esses
 * modos só exigem criptografia. Em Postgres gerenciado isso derruba a primeira
 * query (o processo continua no ar e o /health segue 200).
 */
const RELAXED_SSL = new Set(["require", "prefer", "no-verify"]);

export function databasePoolSettings(connectionString: string): DatabasePoolSettings {
    const url = new URL(connectionString);
    const schema = url.searchParams.get("schema") || undefined;
    url.searchParams.delete("schema");

    const sslmode = url.searchParams.get("sslmode");
    const poolConfig: PoolConfig = {};

    if (sslmode && RELAXED_SSL.has(sslmode)) {
        // A connection string sobrescreve `ssl` dentro do pg. O modo precisa sair da URL.
        url.searchParams.delete("sslmode");
        poolConfig.ssl = { rejectUnauthorized: false };
    } else if (sslmode === "disable") {
        url.searchParams.delete("sslmode");
        poolConfig.ssl = false;
    }

    poolConfig.connectionString = url.toString();
    return { poolConfig, schema };
}
