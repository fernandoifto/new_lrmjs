'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { usePermissions } from '@/hooks/usePermissions';
import { getRequiredPermission } from '@/lib/routePermissions';

interface WithPermissionProps {
    children: React.ReactNode;
    requiredPermission?: string;
}

export default function WithPermission({ children, requiredPermission }: WithPermissionProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { hasPermission, isAdmin, loading, permissoes } = usePermissions();
    const [checking, setChecking] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        if (loading) {
            return;
        }

        // Se não há permissão específica, tentar obter da rota
        const permission = requiredPermission || getRequiredPermission(pathname);

        // Se não há permissão necessária, permitir acesso
        if (!permission) {
            setHasAccess(true);
            setChecking(false);
            return;
        }

        // Se requer admin
        if (permission === 'admin') {
            if (!isAdmin) {
                router.replace('/sem-permissao');
                return;
            }
            setHasAccess(true);
            setChecking(false);
            return;
        }

        // Verificar permissão específica
        const hasAccessToPage = hasPermission(permission);
        
        if (!hasAccessToPage) {
            router.replace('/sem-permissao');
            return;
        }

        setHasAccess(true);
        setChecking(false);
    }, [loading, isAdmin, permissoes, pathname, requiredPermission, router, hasPermission]);

    if (loading || checking) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                fontSize: '1.1rem',
                color: '#666'
            }}>
                Verificando permissões...
            </div>
        );
    }

    if (!hasAccess) {
        return null;
    }

    return <>{children}</>;
}
