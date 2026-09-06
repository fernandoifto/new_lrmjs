export function parseSortOrder(raw?: string): "asc" | "desc" {
    return raw === "asc" ? "asc" : "desc";
}

export function parseSortField<T extends string>(
    raw: string | undefined,
    allowed: readonly T[],
    fallback: T
): T {
    if (raw && (allowed as readonly string[]).includes(raw)) {
        return raw as T;
    }
    return fallback;
}
