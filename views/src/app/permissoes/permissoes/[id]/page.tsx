'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../../home/components/header';
import Menu from '../../../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';

interface Permissao {
    id: number;
    nome: string;
    descricao?: string;
    pagina?: string;
    acao?: string;
    created: string;
    modified: string;
}

export default function PermissaoViewPage() {
    const router = useRouter();
    const params = useParams();
    const { isAdmin } = usePermissions();
    const [permissao, setPermissao] = useState<Permissao | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (params.id) {
            loadPermissao(Number(params.id));
        }
    }, [params.id]);

    const loadPermissao = async (id: number) => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get(`/permissao/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setPermissao(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar permissão:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Permissão não encontrada');
                router.push('/permissoes/permissoes/list');
            } else {
                toast.error('Erro ao carregar permissão');
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

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir esta permissão? Esta ação não pode ser desfeita.')) {
            return;
        }

        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.delete(`/permissao/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Permissão excluída com sucesso!');
            router.push('/permissoes/permissoes/list');
        } catch (error: any) {
            console.error('Erro ao excluir permissão:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir permissão');
            }
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <WithPermission requiredPermission="admin">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/permissoes/permissoes/list" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <div className={styles.headerActions}>
                                {permissao && isAdmin && (
                                    <Link
                                        href={`/permissoes/permissoes/${permissao.id}/editar`}
                                        className={styles.btnEdit}
                                    >
                                        <FaEdit size={16} />
                                        Editar
                                    </Link>
                                )}
                                {permissao && isAdmin && (
                                    <button
                                        onClick={() => handleDelete(permissao.id)}
                                        className={styles.btnDelete}
                                        title="Excluir permissão"
                                    >
                                        <FaTrash size={18} />
                                        Excluir
                                    </button>
                                )}
                            </div>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando permissão...</p>
                            </div>
                        ) : !permissao ? (
                            <div className={styles.errorContainer}>
                                <p>Permissão não encontrada</p>
                                <Link href="/permissoes/permissoes/list" className={styles.btnBack}>
                                    Voltar para lista
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 15v2M9 11.24l-1.5-1.5a4.5 4.5 0 0 1 0-6.36l6.36 6.36a4.5 4.5 0 0 1 0 6.36L9 11.24zM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                                        </svg>
                                    </div>
                                    <h1>{permissao.nome}</h1>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.section}>
                                        <h3>Informações da Permissão</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Nome</span>
                                                <span className={styles.value}>{permissao.nome}</span>
                                            </div>
                                            {permissao.descricao && (
                                                <div className={styles.infoItem}>
                                                    <span className={styles.label}>Descrição</span>
                                                    <span className={styles.value}>{permissao.descricao}</span>
                                                </div>
                                            )}
                                            {permissao.pagina && (
                                                <div className={styles.infoItem}>
                                                    <span className={styles.label}>Página</span>
                                                    <span className={styles.value}>{permissao.pagina}</span>
                                                </div>
                                            )}
                                            {permissao.acao && (
                                                <div className={styles.infoItem}>
                                                    <span className={styles.label}>Ação</span>
                                                    <span className={styles.value}>{permissao.acao}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.section}>
                                        <h3>Informações do Sistema</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Criado em</span>
                                                <span className={styles.value}>{formatDate(permissao.created)}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Última atualização</span>
                                                <span className={styles.value}>{formatDate(permissao.modified)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}
