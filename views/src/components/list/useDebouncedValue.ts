'use client';

import { useEffect, useState } from 'react';

/** Debounce de valor (padrão: 400ms, igual à listagem de agendamentos). */
export function useDebouncedValue<T>(value: T, delayMs = 400): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delayMs);
        return () => clearTimeout(timer);
    }, [value, delayMs]);

    return debounced;
}
