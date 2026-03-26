import { parsePaginationParams, paginatedResponse, MAX_PAGE_SIZE, DEFAULT_PAGE_SIZE } from "../src/utils/pagination";

describe("pagination", () => {
    it("parsePaginationParams usa defaults", () => {
        const p = parsePaginationParams({});
        expect(p.page).toBe(1);
        expect(p.pageSize).toBe(DEFAULT_PAGE_SIZE);
        expect(p.skip).toBe(0);
        expect(p.take).toBe(DEFAULT_PAGE_SIZE);
    });

    it("respeita page e limit e limita pageSize", () => {
        const p = parsePaginationParams({ page: "3", limit: "500" });
        expect(p.page).toBe(3);
        expect(p.skip).toBe((3 - 1) * MAX_PAGE_SIZE);
        expect(p.pageSize).toBe(MAX_PAGE_SIZE);
        expect(p.take).toBe(MAX_PAGE_SIZE);
    });

    it("paginatedResponse calcula totalPages", () => {
        const body = paginatedResponse([1, 2], 42, 2, 20);
        expect(body.data).toEqual([1, 2]);
        expect(body.pagination.total).toBe(42);
        expect(body.pagination.totalPages).toBe(3);
    });
});
