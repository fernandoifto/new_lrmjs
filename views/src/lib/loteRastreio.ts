/** Código de rastreabilidade unitarizado: L{id}-{numero}-{validade AAMMDD}. */

/** Datas de lote são calendário (BR); evita divergência UTC vs navegador. */
const TZ_LOTE = 'America/Sao_Paulo';

function datePartsInTimeZone(
    datavencimento: string | Date,
    timeZone: string
): { year: number; month: number; day: number } {
    const d = new Date(datavencimento);
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(d);
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
    return {
        year: parseInt(get('year'), 10),
        month: parseInt(get('month'), 10),
        day: parseInt(get('day'), 10),
    };
}

function aammddFromParts(year: number, month: number, day: number): string {
    const yy = String(year).slice(-2);
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${yy}${mm}${dd}`;
}

/** Validade AAMMDD no fuso do sistema (America/Sao_Paulo). */
export function formatValidadeAammdd(datavencimento: string | Date): string {
    const { year, month, day } = datePartsInTimeZone(datavencimento, TZ_LOTE);
    return aammddFromParts(year, month, day);
}

export function sanitizeNumeroLoteParaCodigo(numero: string): string {
    return (
        String(numero || '')
            .trim()
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '')
            .slice(0, 20) || 'SEMNUM'
    );
}

export function buildCodigoRastreioLote(opts: {
    id: number;
    numero: string;
    datavencimento: string | Date;
}): string {
    const numero = sanitizeNumeroLoteParaCodigo(opts.numero);
    const validade = formatValidadeAammdd(opts.datavencimento);
    return `L${opts.id}-${numero}-${validade}`;
}

/** Código único por unidade: base + número da unidade (ex.: ...2610063). */
export function buildCodigoRastreioUnidade(
    opts: {
        id: number;
        numero: string;
        datavencimento: string | Date;
    },
    unidade: number
): string {
    return `${buildCodigoRastreioLote(opts)}${unidade}`;
}

export type CodigoRastreioParsed = {
    idLote: number;
    numero: string;
    validadeAammdd: string;
    unidade: number | null;
    codigoBase: string;
    codigo: string;
};

/**
 * Interpreta códigos L{id}-{numero}-{AAMMDD} ou L{id}-{numero}-{AAMMDD}{unidade}.
 * Ex.: L2-000225446-2610063 → unidade 3.
 */
export function parseCodigoRastreio(raw: string): CodigoRastreioParsed | null {
    const codigo = String(raw || '')
        .trim()
        .toUpperCase()
        .replace(/\s+/g, '');
    const m = codigo.match(/^L(\d+)-([A-Z0-9]+)-(\d{6})(\d*)$/);
    if (!m) {
        return null;
    }
    const idLote = parseInt(m[1], 10);
    const numero = m[2];
    const validadeAammdd = m[3];
    const unidadeStr = m[4];
    const unidade = unidadeStr ? parseInt(unidadeStr, 10) : null;
    if (Number.isNaN(idLote) || idLote < 1) {
        return null;
    }
    if (unidade !== null && (Number.isNaN(unidade) || unidade < 1)) {
        return null;
    }
    return {
        idLote,
        numero,
        validadeAammdd,
        unidade,
        codigoBase: `L${idLote}-${numero}-${validadeAammdd}`,
        codigo,
    };
}

export function formatValidadeBr(datavencimento: string | Date): string {
    return new Date(datavencimento).toLocaleDateString('pt-BR', {
        timeZone: TZ_LOTE,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}
