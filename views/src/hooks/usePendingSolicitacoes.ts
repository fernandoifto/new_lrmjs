'use client';

import { useState, useEffect } from 'react';
import { api } from '@/api/api';

export function usePendingSolicitacoes() {
    const [pendingCount, setPendingCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPendingCount();
        
        // Atualizar a cada 30 segundos
        const interval = setInterval(() => {
            loadPendingCount();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const loadPendingCount = async () => {
        try {
            const response = await api.get('/solicitacoes', {
                params: { status: 'pendente_de_aprovacao', page: 1, pageSize: 1 },
            });

            const total = response.data?.pagination?.total;
            setPendingCount(typeof total === 'number' ? total : (response.data?.data?.length ?? 0));
        } catch (error: any) {
            console.error('Erro ao carregar solicitações pendentes:', error);
            setPendingCount(0);
        } finally {
            setLoading(false);
        }
    };

    return { pendingCount, loading, refresh: loadPendingCount };
}
