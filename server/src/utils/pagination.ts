import type { Request } from "express";

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 200;

export interface ParsedPagination {
    page: number;
    pageSize: number;
    skip: number;
    take: number;
}

export interface PaginationMeta {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

export interface PaginatedBody<T> {
    data: T[];
    pagination: PaginationMeta;
}

/**
 * Lê `page` (1-based) e `pageSize` ou `limit` da query string.
 */
export function parsePaginationParams(query: Request["query"]): ParsedPagination {
    let page = 1;
    const rawPage = query.page;
    if (rawPage !== undefined && rawPage !== "") {
        const p = parseInt(String(rawPage), 10);
        if (!Number.isNaN(p) && p > 0) {
            page = p;
        }
    }

    let pageSize = DEFAULT_PAGE_SIZE;
    const rawSize = query.pageSize ?? query.limit;
    if (rawSize !== undefined && rawSize !== "") {
        const ps = parseInt(String(rawSize), 10);
        if (!Number.isNaN(ps) && ps > 0) {
            pageSize = Math.min(ps, MAX_PAGE_SIZE);
        }
    }

    const skip = (page - 1) * pageSize;
    return { page, pageSize, skip, take: pageSize };
}

export function paginatedResponse<T>(items: T[], total: number, page: number, pageSize: number): PaginatedBody<T> {
    const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);
    return {
        data: items,
        pagination: {
            page,
            pageSize,
            total,
            totalPages,
        },
    };
}
