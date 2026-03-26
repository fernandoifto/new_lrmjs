'use client';

import styles from './PaginationBar.module.css';

type Props = {
    page: number;
    totalPages: number;
    total: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
};

export function PaginationBar({ page, totalPages, total, onPageChange, disabled }: Props) {
    if (totalPages <= 1) {
        return total > 0 ? (
            <p className={styles.meta}>{total} registro(s)</p>
        ) : null;
    }

    return (
        <nav className={styles.nav} aria-label="Paginação">
            <button
                type="button"
                className={styles.btn}
                disabled={disabled || page <= 1}
                onClick={() => onPageChange(page - 1)}
            >
                Anterior
            </button>
            <span className={styles.info}>
                Página {page} de {totalPages} ({total} registro(s))
            </span>
            <button
                type="button"
                className={styles.btn}
                disabled={disabled || page >= totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                Próxima
            </button>
        </nav>
    );
}
