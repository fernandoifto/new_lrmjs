'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../home/components/header';
import Menu from '../components/menu';
import styles from './page.module.css';
import Link from 'next/link';

interface Role {
    id: number;
    nome: string;
    descricao?: string;
    _count?: {
        userRoles: number;
    };
}

interface Permissao {
    id: number;
    nome: string;
    descricao?: string;
    pagina?: string;
    acao?: string;
}

export default function PermissoesPage() {
    const router = useRouter();
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getCookieClient();
        if (!token) {
            toast.error('Você precisa estar logado para acessar esta página');
            router.push('/login');
            return;
        }
        loadRoles();
    }, [router]);

    const loadRoles = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();
            if (!token) return;

            const response = await api.get('/roles', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setRoles(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar roles:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar roles');
            }
        } finally {
            setLoading(false);
        }
    };

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
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 15v2M9 11.24l-1.5-1.5a4.5 4.5 0 0 1 0-6.36l6.36 6.36a4.5 4.5 0 0 1 0 6.36L9 11.24zM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1>Gerenciar Permissões</h1>
                                    <p>Configure as permissões de acesso para cada tipo de usuário</p>
                                </div>
                            </div>
                            <div className={styles.headerActions}>
                                <Link href="/permissoes/novo" className={styles.btnNew}>
                                    Nova Permissão
                                </Link>
                                <Link href="/permissoes/roles/novo" className={styles.btnNew}>
                                    Nova Role
                                </Link>
                            </div>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando roles...</p>
                            </div>
                        ) : roles.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>Nenhuma role cadastrada. Crie uma nova role para começar.</p>
                                <Link href="/permissoes/roles/novo" className={styles.btnNew}>
                                    Criar Primeira Role
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.grid}>
                                {roles.map((role) => (
                                    <Link key={role.id} href={`/permissoes/roles/${role.id}`} className={styles.card}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.cardIcon}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                    <circle cx="9" cy="7" r="4" />
                                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                                </svg>
                                            </div>
                                            <h3>{role.nome}</h3>
                                        </div>
                                        <div className={styles.cardBody}>
                                            {role.descricao && (
                                                <p className={styles.description}>{role.descricao}</p>
                                            )}
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Usuários:</span>
                                                <span>{role._count?.userRoles || 0}</span>
                                            </div>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            <span className={styles.btnView}>Configurar Permissões</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

