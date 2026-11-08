/**
 * Express 5 tipa parâmetros de rota como string ou lista.
 * As rotas deste sistema declaram um único valor.
 */
export function routeParam(value: string | string[] | undefined): string {
    if (Array.isArray(value)) {
        return value[0] ?? "";
    }
    return value ?? "";
}

/**
 * Parseia IDs positivos estritos (apenas dígitos, sem "12abc" → 12).
 */
export function parsePositiveInt(raw: unknown, label = "ID"): number {
    if (raw == null || String(raw).trim() === "") {
        throw new Error(`${label} inválido`);
    }
    const s = String(raw).trim();
    if (!/^\d+$/.test(s)) {
        throw new Error(`${label} inválido`);
    }
    const n = Number(s);
    if (!Number.isInteger(n) || n < 1 || n > Number.MAX_SAFE_INTEGER) {
        throw new Error(`${label} inválido`);
    }
    return n;
}

export function tryParsePositiveInt(raw: unknown): number | undefined {
    try {
        return parsePositiveInt(raw);
    } catch {
        return undefined;
    }
}
