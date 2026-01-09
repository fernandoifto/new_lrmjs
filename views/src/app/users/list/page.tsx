'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
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

export default function UsersListPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get('/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsers(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar usuários:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar usuários');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, username: string) => {
        if (!confirm(`Tem certeza que deseja excluir o usuário "${username}"?`)) {
            return;
        }

        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.delete(`/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Usuário excluído com sucesso!');
            loadUsers();
        } catch (error: any) {
            console.error('Erro ao excluir usuário:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir usuário');
            }
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
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
                                    </svg>
                                </div>
                                <div>
                                    <h1>Usuários</h1>
                                    <p>Lista de todos os usuários cadastrados</p>
                                </div>
                            </div>
                            <Link href="/users/novo" className={styles.btnNew}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" fill="currentColor" />
                                </svg>
                                Novo Usuário
                            </Link>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando usuários...</p>
                            </div>
                        ) : users.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>Nenhum usuário encontrado</p>
                                <Link href="/users/novo" className={styles.btnNew}>
                                    Criar primeiro usuário
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.grid}>
                                {users.map((user) => (
                                    <div key={user.id} className={styles.card}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.cardIcon}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
                                                </svg>
                                            </div>
                                            <h3>{user.username}</h3>
                                        </div>
                                        <div className={styles.cardBody}>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Email:</span>
                                                <span>{user.email}</span>
                                            </div>
                                            {user.role && (
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Função:</span>
                                                    <span>{user.role}</span>
                                                </div>
                                            )}
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Criado em:</span>
                                                <span>{formatDate(user.created)}</span>
                                            </div>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            <Link 
                                                href={`/users/${user.id}`}
                                                className={styles.btnView}
                                            >
                                                Ver Detalhes
                                            </Link>
                                            <Link 
                                                href={`/users/${user.id}/editar`}
                                                className={styles.btnEdit}
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(user.id, user.username)}
                                                className={styles.btnDelete}
                                                title="Excluir usuário"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" fill="currentColor" />
                                                </svg>
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

