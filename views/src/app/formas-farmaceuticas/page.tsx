'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaFlask, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
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
    const { hasPermission } = usePermissions();
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
        <WithPermission requiredPermission="formas_farmaceuticas.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <FaFlask size={24} />
                                </div>
                                <div>
                                    <h1>Formas Farmacêuticas</h1>
                                    <p>Gerencie as formas farmacêuticas do sistema</p>
                                </div>
                            </div>
                            {hasPermission('formas_farmaceuticas.criar') && (
                                <Link href="/formas-farmaceuticas/novo" className={styles.btnNew}>
                                    <FaPlus size={20} />
                                    Nova Forma
                                </Link>
                            )}
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando...</p>
                            </div>
                        ) : formasFarmaceuticas.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>Nenhuma forma farmacêutica cadastrada</p>
                                {hasPermission('formas_farmaceuticas.criar') && (
                                    <Link href="/formas-farmaceuticas/novo" className={styles.btnNew}>
                                        Cadastrar Primeira Forma
                                    </Link>
                                )}
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
                                            {hasPermission('formas_farmaceuticas.ver') && (
                                                <Link href={`/formas-farmaceuticas/${forma.id}`} className={styles.btnView} title="Ver detalhes">
                                                    <FaEye size={16} />
                                                </Link>
                                            )}
                                            {hasPermission('formas_farmaceuticas.editar') && (
                                                <Link href={`/formas-farmaceuticas/${forma.id}/editar`} className={styles.btnEdit} title="Editar">
                                                    <FaEdit size={16} />
                                                </Link>
                                            )}
                                            {hasPermission('formas_farmaceuticas.excluir') && (
                                                <button
                                                    onClick={() => handleDelete(forma.id, forma.descricao)}
                                                    className={styles.btnDelete}
                                                    title="Excluir"
                                                >
                                                    <FaTrash size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}

