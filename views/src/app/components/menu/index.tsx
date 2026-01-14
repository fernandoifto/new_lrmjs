'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/api/api';
import { deleteCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import { usePermissions } from '@/hooks/usePermissions';
import { usePendingSolicitacoes } from '@/hooks/usePendingSolicitacoes';
import { FaUsersCog, FaCalendarAlt, FaPills, FaUserCircle, FaSignOutAlt, FaHandHoldingHeart, FaClipboardList, FaBell } from 'react-icons/fa';
import styles from './styles.module.css';

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

export default function Menu() {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const { hasPermission, hasAnyPermission, isAdmin } = usePermissions();
    const { pendingCount } = usePendingSolicitacoes();

    useEffect(() => {
        setMounted(true);
        loadUser();
    }, [pathname]);

    const loadUser = async () => {
        try {
            const token = getCookieClient();
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await api.get('/detail', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUser(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar usuário:', error);
            if (error.response?.status === 401) {
                deleteCookie('session');
                router.push('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        deleteCookie('session');
        toast.success('Logout realizado com sucesso!');
        router.push('/login');
    };

    if (!mounted || loading) {
        return null;
    }

    const isActive = (path: string) => {
        if (path === '/agendamentos') {
            return pathname === '/agendamentos' || pathname.startsWith('/agendamentos/');
        }
        if (path === '/medicamentos') {
            return pathname === '/medicamentos' || pathname.startsWith('/tipos-medicamentos') || pathname.startsWith('/formas-farmaceuticas') || pathname.startsWith('/lotes') || pathname.startsWith('/medicamentos/');
        }
        if (path === '/pacientes-doacoes') {
            return pathname === '/pacientes-doacoes' || pathname.startsWith('/pacientes') || pathname.startsWith('/retiradas');
        }
        if (path === '/solicitacoes') {
            return pathname === '/solicitacoes' || pathname.startsWith('/solicitacoes/');
        }
        if (path === '/permissoes') {
            return pathname === '/permissoes' || pathname.startsWith('/permissoes/') || pathname.startsWith('/users');
        }
        return pathname === path;
    };


    return (
        <nav className={styles.menu}>
            <div className={styles.menuContent}>
                <div className={styles.menuWrapper}>
                    <div className={styles.menuItems}>
                        {(isAdmin || hasPermission('agendamentos.ver')) && (
                            <Link 
                                href="/agendamentos" 
                                className={`${styles.menuItem} ${isActive('/agendamentos') ? styles.active : ''}`}
                            >
                                <FaCalendarAlt size={20} />
                                <span>Agendamentos</span>
                            </Link>
                        )}

                        {(isAdmin || hasAnyPermission(['medicamentos.ver', 'lotes.ver', 'tipos_medicamentos.ver', 'formas_farmaceuticas.ver'])) && (
                            <Link 
                                href="/medicamentos" 
                                className={`${styles.menuItem} ${isActive('/medicamentos') ? styles.active : ''}`}
                            >
                                <FaPills size={20} />
                                <span>Medicamentos</span>
                            </Link>
                        )}

                        {(isAdmin || hasAnyPermission(['pacientes.ver', 'retiradas.ver'])) && (
                            <Link 
                                href="/pacientes-doacoes" 
                                className={`${styles.menuItem} ${isActive('/pacientes-doacoes') ? styles.active : ''}`}
                            >
                                <FaHandHoldingHeart size={20} />
                                <span>Pacientes e Doações</span>
                            </Link>
                        )}

                        {(isAdmin || hasPermission('retiradas.ver')) && (
                            <Link 
                                href="/solicitacoes" 
                                className={`${styles.menuItem} ${isActive('/solicitacoes') ? styles.active : ''}`}
                            >
                                <div className={styles.menuItemContent}>
                                    <FaClipboardList size={20} />
                                    <span>Solicitações</span>
                                    {pendingCount > 0 && (
                                        <span className={styles.notificationBadge} title={`${pendingCount} solicitação(ões) pendente(s)`}>
                                            {pendingCount > 99 ? '99+' : pendingCount}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        )}

                        {isAdmin && (
                            <Link 
                                href="/permissoes" 
                                className={`${styles.menuItem} ${isActive('/permissoes') || isActive('/users') ? styles.active : ''}`}
                            >
                                <FaUsersCog size={20} />
                                <span>Grupos e Usuários</span>
                            </Link>
                        )}
                    </div>

                    {user && (
                        <div className={styles.userSection}>
                            <div className={styles.userInfo}>
                                <div className={styles.userAvatar}>
                                    <FaUserCircle size={20} />
                                </div>
                                <div className={styles.userDetails}>
                                    <span className={styles.userName}>{user.username}</span>
                                    <span className={styles.userEmail}>{user.email}</span>
                                </div>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className={styles.logoutButton}
                                title="Sair"
                            >
                                <FaSignOutAlt size={18} />
                                <span>Sair</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

