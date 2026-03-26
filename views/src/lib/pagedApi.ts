/** Resposta paginada padrão da API Express (`paginatedResponse`). */
export type PaginationMeta = {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
};

export type PagedBody<T> = {
    data: T[];
    pagination: PaginationMeta;
};

/** Itens por página nas telas de listagem. */
export const LIST_PAGE_SIZE = 20;

/** Limite alto para selects (dropdowns) que precisam de muitos registros. */
export const SELECT_PAGE_SIZE = 200;
