'use client';

import { useState, useEffect } from 'react';
import { api } from '@/api/api';

type PermissionCache = {
    isAdmin: boolean;
    permissoes: string[];
    expiresAt: number;
};

const PERMISSION_CACHE_TTL_MS = 60_000;
let permissionCache: PermissionCache | null = null;
let inFlightPermissionRequest: Promise<PermissionCache> | null = null;

export function usePermissions() {
    const [permissoes, setPermissoes] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadPermissions();
    }, []);

    const loadPermissions = async () => {
        try {
            const cache = await fetchPermissionsWithCache();
            setIsAdmin(cache.isAdmin);
            setPermissoes(cache.permissoes);
        } catch (error) {
            console.error('Erro ao carregar permissões:', error);
            setPermissoes([]);
            setIsAdmin(false);
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

async function fetchPermissionsWithCache(): Promise<PermissionCache> {
    const now = Date.now();
    if (permissionCache && permissionCache.expiresAt > now) {
        return permissionCache;
    }

    if (inFlightPermissionRequest) {
        return inFlightPermissionRequest;
    }

    inFlightPermissionRequest = (async () => {
        const userDetail = await api.get('/detail', {});
        const isAdmin = Boolean(userDetail.data.is_admin);

        if (isAdmin) {
            const cached = {
                isAdmin: true,
                permissoes: [],
                expiresAt: Date.now() + PERMISSION_CACHE_TTL_MS,
            };
            permissionCache = cached;
            return cached;
        }

        const response = await api.get('/user-permissoes', {});
        const cached = {
            isAdmin: false,
            permissoes: response.data.permissoes || [],
            expiresAt: Date.now() + PERMISSION_CACHE_TTL_MS,
        };
        permissionCache = cached;
        return cached;
    })();

    try {
        return await inFlightPermissionRequest;
    } finally {
        inFlightPermissionRequest = null;
    }
}

