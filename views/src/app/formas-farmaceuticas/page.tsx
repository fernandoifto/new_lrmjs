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

interface FormaFarmaceutica {
    id: number;
    descricao: string;
    created: string;
    modified: string;
}

export default function FormasFarmaceuticasPage() {
    const router = useRouter();
    const [formasFarmaceuticas, setFormasFarmaceuticas] = useState<FormaFarmaceutica[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        loadFormasFarmaceuticas();
    }, []);

    const loadFormasFarmaceuticas = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get('/formas-farmaceuticas', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setFormasFarmaceuticas(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar formas farmacêuticas:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar formas farmacêuticas');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, descricao: string) => {
        if (!confirm(`Tem certeza que deseja excluir a forma farmacêutica "${descricao}"?`)) {
            return;
        }

        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.delete(`/forma-farmaceutica/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Forma farmacêutica excluída com sucesso!');
            loadFormasFarmaceuticas();
        } catch (error: any) {
            console.error('Erro ao excluir forma farmacêutica:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir forma farmacêutica');
            }
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
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
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1>Formas Farmacêuticas</h1>
                                    <p>Gerencie as formas farmacêuticas do sistema</p>
                                </div>
                            </div>
                            <Link href="/formas-farmaceuticas/novo" className={styles.btnNew}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 5v14m7-7H5" />
                                </svg>
                                Nova Forma
                            </Link>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando...</p>
                            </div>
                        ) : formasFarmaceuticas.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>Nenhuma forma farmacêutica cadastrada</p>
                                <Link href="/formas-farmaceuticas/novo" className={styles.btnNew}>
                                    Cadastrar Primeira Forma
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.grid}>
                                {formasFarmaceuticas.map((forma) => (
                                    <div key={forma.id} className={styles.card}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.cardIcon}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                </svg>
                                            </div>
                                            <h3>{forma.descricao}</h3>
                                        </div>
                                        <div className={styles.cardBody}>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Criado em:</span>
                                                <span>{formatDate(forma.created)}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Modificado em:</span>
                                                <span>{formatDate(forma.modified)}</span>
                                            </div>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            <Link href={`/formas-farmaceuticas/${forma.id}`} className={styles.btnView} title="Ver detalhes">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            </Link>
                                            <Link href={`/formas-farmaceuticas/${forma.id}/editar`} className={styles.btnEdit} title="Editar">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(forma.id, forma.descricao)}
                                                className={styles.btnDelete}
                                                title="Excluir"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                </svg>
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

