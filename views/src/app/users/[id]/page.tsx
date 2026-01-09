'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import styles from './page.module.css';
import Link from 'next/link';

interface User {
    id: number;
    username: string;
    email: string;
    role: string | null;
    created: string;
    modified: string;
}

export default function UserViewPage() {
    const router = useRouter();
    const params = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (params.id) {
            loadUser(Number(params.id));
        }
    }, [params.id]);

    const loadUser = async (id: number) => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get(`/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUser(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar usuário:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Usuário não encontrado');
                router.push('/users/list');
            } else {
                toast.error('Erro ao carregar usuário');
            }
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!mounted) {
        return null;
    }

    return (
        <>
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/users/list" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            {user && (
                                <Link 
                                    href={`/users/${user.id}/editar`}
                                    className={styles.btnEdit}
                                >
                                    Editar
                                </Link>
                            )}
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando usuário...</p>
                            </div>
                        ) : !user ? (
                            <div className={styles.errorContainer}>
                                <p>Usuário não encontrado</p>
                                <Link href="/users/list" className={styles.btnBack}>
                                    Voltar para lista
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <h1>{user.username}</h1>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.section}>
                                        <h3>Informações Pessoais</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Nome de Usuário</span>
                                                <span className={styles.value}>{user.username}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Email</span>
                                                <span className={styles.value}>{user.email}</span>
                                            </div>
                                            {user.role && (
                                                <div className={styles.infoItem}>
                                                    <span className={styles.label}>Função</span>
                                                    <span className={styles.value}>{user.role}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.section}>
                                        <h3>Informações do Sistema</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Criado em</span>
                                                <span className={styles.value}>{formatDate(user.created)}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Última atualização</span>
                                                <span className={styles.value}>{formatDate(user.modified)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

