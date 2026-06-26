"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_PAGE_SIZE = exports.DEFAULT_PAGE_SIZE = void 0;
exports.parsePaginationParams = parsePaginationParams;
exports.paginatedResponse = paginatedResponse;
exports.DEFAULT_PAGE_SIZE = 20;
exports.MAX_PAGE_SIZE = 200;
/**
 * Lê `page` (1-based) e `pageSize` ou `limit` da query string.
 */
function parsePaginationParams(query) {
    var _a;
    let page = 1;
    const rawPage = query.page;
    if (rawPage !== undefined && rawPage !== "") {
        const p = parseInt(String(rawPage), 10);
        if (!Number.isNaN(p) && p > 0) {
            page = p;
        }
    }
    let pageSize = exports.DEFAULT_PAGE_SIZE;
    const rawSize = (_a = query.pageSize) !== null && _a !== void 0 ? _a : query.limit;
    if (rawSize !== undefined && rawSize !== "") {
        const ps = parseInt(String(rawSize), 10);
        if (!Number.isNaN(ps) && ps > 0) {
            pageSize = Math.min(ps, exports.MAX_PAGE_SIZE);
        }
    }
    const skip = (page - 1) * pageSize;
    return { page, pageSize, skip, take: pageSize };
}
function paginatedResponse(items, total, page, pageSize) {
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
