/**
 * Falha rápido na subida se variáveis críticas faltarem (exceto em testes Jest).
 */
export function validateRequiredEnv(): void {
    if (process.env.NODE_ENV === "test") {
        return;
    }

    const missing: string[] = [];
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 16) {
        missing.push("JWT_SECRET (mínimo recomendado: 16 caracteres)");
    }
    if (!process.env.DATABASE_URL) {
        missing.push("DATABASE_URL");
    }

    if (missing.length > 0) {
        throw new Error(`Variáveis de ambiente obrigatórias ausentes ou inválidas: ${missing.join(", ")}`);
    }

    if (process.env.NODE_ENV === "production") {
        if (!process.env.FRONTEND_ORIGIN) {
            // eslint-disable-next-line no-console
            console.warn(
                "[segurança] FRONTEND_ORIGIN não definido em produção — CORS pode ficar permissivo. Defina a origem exata do frontend."
            );
        }
    }
}
