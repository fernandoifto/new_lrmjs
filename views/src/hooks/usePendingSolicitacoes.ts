import { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { getCookieClient } from '@/lib/cookieClient';

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
            const token = getCookieClient();
            if (!token) {
                setPendingCount(0);
                setLoading(false);
                return;
            }

            const response = await api.get('/solicitacoes?status=pendente', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setPendingCount(Array.isArray(response.data) ? response.data.length : 0);
        } catch (error: any) {
            console.error('Erro ao carregar solicitações pendentes:', error);
            setPendingCount(0);
        } finally {
            setLoading(false);
        }
    };

    return { pendingCount, loading, refresh: loadPendingCount };
}
