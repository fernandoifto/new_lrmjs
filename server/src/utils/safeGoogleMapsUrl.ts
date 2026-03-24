/**
 * Normaliza e valida URL de mapas para armazenamento (evita javascript:, data:, etc.).
 * Permite apenas https e hosts tipicamente usados pelo Google Maps.
 */
const ALLOWED_HOST_SUFFIXES = [
    "google.com",
    "google.com.br",
    "goo.gl",
    "maps.app.goo.gl",
    "gstatic.com",
];

function hostAllowed(hostname: string): boolean {
    const h = hostname.toLowerCase();
    return ALLOWED_HOST_SUFFIXES.some((suffix) => h === suffix || h.endsWith(`.${suffix}`));
}

/**
 * @param raw valor vindos do cliente ou null/undefined
 * @returns string https segura ou null se vazio; lança se inválido
 */
export function parseAndValidateGoogleMapsUrl(raw: string | null | undefined): string | null {
    if (raw == null || String(raw).trim() === "") {
        return null;
    }
    const trimmed = String(raw).trim();
    let url: URL;
    try {
        url = new URL(trimmed);
    } catch {
        throw new Error("URL do Google Maps inválida");
    }
    if (url.protocol !== "https:") {
        throw new Error("URL do Google Maps deve usar HTTPS");
    }
    if (!hostAllowed(url.hostname)) {
        throw new Error("URL do Google Maps não é de um domínio permitido");
    }
    return url.toString();
}
