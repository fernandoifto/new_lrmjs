/** Base URL da API (sem path). Normaliza erros comuns de configuração no Coolify. */
export function resolveApiInternalUrl(): string {
    const fallback = "http://127.0.0.1:3333";
    const raw = process.env.API_INTERNAL_URL?.trim();
    if (!raw) {
        return fallback;
    }

    let url = raw;

    // Ex.: "Value https://api.giftmed.org/auth" colado do painel
    if (/^value\s+/i.test(url)) {
        url = url.replace(/^value\s+/i, "").trim();
    }

    url = url.replace(/^["']|["']$/g, "");

    try {
        const parsed = new URL(url);
        return parsed.origin;
    } catch {
        return fallback;
    }
}
