'use client';

import { ReactNode } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styles from './ListPage.module.css';

export type SortOption = {
    value: string;
    label: string;
};

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    sortOptions?: SortOption[];
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    onSortByChange?: (value: string) => void;
    onSortOrderToggle?: () => void;
    filters?: ReactNode;
};

export function ListSearchToolbar({
    value,
    onChange,
    placeholder = 'Buscar…',
    sortOptions,
    sortBy,
    sortOrder = 'desc',
    onSortByChange,
    onSortOrderToggle,
    filters,
}: Props) {
    const hasSort = Boolean(sortOptions?.length && onSortByChange && onSortOrderToggle);
    const hasFilters = Boolean(filters) || hasSort;

    return (
        <div className={styles.toolbar}>
            <div className={styles.searchBox} style={hasFilters ? undefined : { marginBottom: 0 }}>
                <FaSearch size={16} className={styles.searchIcon} />
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                {value ? (
                    <button
                        type="button"
                        className={styles.clearBtn}
                        onClick={() => onChange('')}
                        aria-label="Limpar busca"
                    >
                        <FaTimes size={16} />
                    </button>
                ) : null}
            </div>
            {hasFilters ? (
                <div className={styles.filtersRow}>
                    {filters}
                    {hasSort ? (
                        <>
                            <select
                                className={styles.select}
                                value={sortBy}
                                onChange={(e) => onSortByChange!(e.target.value)}
                                aria-label="Ordenar por"
                            >
                                {sortOptions!.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        Ordenar: {o.label}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                className={styles.sortToggle}
                                onClick={onSortOrderToggle}
                                title={sortOrder === 'asc' ? 'Crescente' : 'Decrescente'}
                                aria-label={sortOrder === 'asc' ? 'Ordenação crescente' : 'Ordenação decrescente'}
                            >
                                {sortOrder === 'asc' ? '↑' : '↓'}
                            </button>
                        </>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
