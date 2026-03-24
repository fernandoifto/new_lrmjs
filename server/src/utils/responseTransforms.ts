import { signUploadRelativePath } from "../services/uploadAccessToken";

const UPLOADS_PREFIX = "/uploads/";

function toRelativeUploadPath(storedPath: string): string | null {
    if (!storedPath.startsWith(UPLOADS_PREFIX)) return null;
    return storedPath.slice(UPLOADS_PREFIX.length);
}

/** Anexa token de leitura à URL persistida no banco (não altera o valor armazenado). */
export function attachTokenToUploadUrl(storedPath: string | null | undefined): string | null | undefined {
    if (!storedPath) return storedPath;
    if (storedPath.startsWith("http://") || storedPath.startsWith("https://")) return storedPath;
    const rel = toRelativeUploadPath(storedPath);
    if (!rel) return storedPath;
    try {
        const t = signUploadRelativePath(rel);
        return `${storedPath}?t=${encodeURIComponent(t)}`;
    } catch {
        return storedPath;
    }
}

export function attachUploadTokensToSolicitacao<T extends { foto_receita?: string | null }>(s: T): T {
    if (!s?.foto_receita) return s;
    return {
        ...s,
        foto_receita: attachTokenToUploadUrl(s.foto_receita) ?? s.foto_receita,
    };
}

export function attachUploadTokensToSolicitacoes<T extends { foto_receita?: string | null }>(list: T[]): T[] {
    return list.map(attachUploadTokensToSolicitacao);
}

/** Remove foto da receita em respostas públicas (evita vazar URL mesmo com token). */
export function stripFotoReceitaFromSolicitacao<T extends { foto_receita?: string | null }>(s: T): T {
    const { foto_receita: _f, ...rest } = s;
    return rest as T;
}

export function stripFotoReceitaFromSolicitacoes<T extends { foto_receita?: string | null }>(list: T[]): T[] {
    return list.map(stripFotoReceitaFromSolicitacao);
}

export function attachUploadTokensToAgendamentoFotos<T extends { fotos?: string | null }>(ag: T): T {
    if (!ag?.fotos) return ag;
    try {
        const arr = JSON.parse(ag.fotos) as string[];
        if (!Array.isArray(arr)) return ag;
        const mapped = arr.map((u) => attachTokenToUploadUrl(u) ?? u);
        return { ...ag, fotos: JSON.stringify(mapped) };
    } catch {
        return ag;
    }
}

export function attachUploadTokensToAgendamentos<T extends { fotos?: string | null }>(list: T[]): T[] {
    return list.map(attachUploadTokensToAgendamentoFotos);
}
