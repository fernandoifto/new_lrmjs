import { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { getCookieClient } from '@/lib/cookieClient';

export function usePermissions() {
    const [permissoes, setPermissoes] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadPermissions();
    }, []);

    const loadPermissions = async () => {
        try {
            const token = getCookieClient();
            if (!token) {
                setLoading(false);
                return;
            }

            const response = await api.get('/user-permissoes', {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Verificar se o usuário é admin (se retornar todas as permissões ou um flag especial)
            const userDetail = await api.get('/detail', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setIsAdmin(userDetail.data.is_admin || false);
            setPermissoes(response.data.permissoes || []);
        } catch (error) {
            console.error('Erro ao carregar permissões:', error);
            setPermissoes([]);
        } finally {
            setLoading(false);
        }
    };

    const hasPermission = (permissionName: string): boolean => {
        if (isAdmin) return true;
        return permissoes.includes(permissionName);
    };

    const hasAnyPermission = (permissionNames: string[]): boolean => {
        if (isAdmin) return true;
        return permissionNames.some(name => permissoes.includes(name));
    };

    const hasAllPermissions = (permissionNames: string[]): boolean => {
        if (isAdmin) return true;
        return permissionNames.every(name => permissoes.includes(name));
    };

    return {
        permissoes,
        isAdmin,
        loading,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        reloadPermissions: loadPermissions
    };
}

