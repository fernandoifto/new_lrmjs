'use client';

import { PaginationBar } from '@/components/PaginationBar';
import type { PaginationMeta } from '@/lib/pagedApi';
import styles from './ListPage.module.css';

export const LIST_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

type Props = {
    pagination: PaginationMeta | null;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    disabled?: boolean;
    pageSizeOptions?: number[];
};

export function ListFooter({
    pagination,
    pageSize,
    onPageChange,
    onPageSizeChange,
    disabled,
    pageSizeOptions = LIST_PAGE_SIZE_OPTIONS,
}: Props) {
    if (!pagination) return null;

    return (
        <div className={styles.footer}>
            <div className={styles.pageSizeWrap}>
                <label htmlFor="list-page-size">Por página</label>
                <select
                    id="list-page-size"
                    className={styles.select}
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    disabled={disabled}
                >
                    {pageSizeOptions.map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
            </div>
            <PaginationBar
                page={pagination.page}
                totalPages={pagination.totalPages}
                total={pagination.total}
                onPageChange={onPageChange}
                disabled={disabled}
            />
        </div>
    );
}
