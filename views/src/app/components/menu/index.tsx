'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/api/api';
import { deleteCookie } from 'cookies-next';
import { toast } from 'react-toastify';
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
        if (path === '/users') {
            return pathname.startsWith('/users');
        }
        if (path === '/medicamentos') {
            return pathname === '/medicamentos' || pathname.startsWith('/tipos-medicamentos') || pathname.startsWith('/formas-farmaceuticas') || pathname.startsWith('/lotes') || pathname.startsWith('/pacientes') || pathname.startsWith('/medicamentos/');
        }
        if (path === '/retiradas') {
            return pathname === '/retiradas' || pathname.startsWith('/retiradas/');
        }
        if (path === '/permissoes') {
            return pathname === '/permissoes' || pathname.startsWith('/permissoes/');
        }
        return pathname === path;
    };


    return (
        <nav className={styles.menu}>
            <div className={styles.menuContent}>
                <div className={styles.menuWrapper}>
                    <div className={styles.menuItems}>
                        <Link 
                            href="/agendamentos" 
                            className={`${styles.menuItem} ${isActive('/agendamentos') ? styles.active : ''}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 8H4v8h16v-8zm-5-6H9v2H7V5H4v4h16V5h-3v2h-2V5zm-9 8h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z" fill="currentColor" />
                                </svg>
                                <span>Agendamentos</span>
                                    </Link>

                        <Link 
                            href="/medicamentos" 
                            className={`${styles.menuItem} ${isActive('/medicamentos') ? styles.active : ''}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="currentColor" />
                            </svg>
                            <span>Medicamentos</span>
                        </Link>

    <Link 
        href="/permissoes" 
        className={`${styles.menuItem} ${isActive('/permissoes') ? styles.active : ''}`}
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 15v2M9 11.24l-1.5-1.5a4.5 4.5 0 0 1 0-6.36l6.36 6.36a4.5 4.5 0 0 1 0 6.36L9 11.24zM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" fill="currentColor" />
        </svg>
        <span>Permissões</span>
    </Link>

    <Link 
        href="/users/list" 
        className={`${styles.menuItem} ${isActive('/users') ? styles.active : ''}`}
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
        </svg>
        <span>Usuários</span>
    </Link>
                    </div>

                    {user && (
                        <div className={styles.userSection}>
                            <div className={styles.userInfo}>
                                <div className={styles.userAvatar}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
                                    </svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v4h-2V4H6v16h7v-3h2v4a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z" fill="currentColor" />
                                </svg>
                                <span>Sair</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

