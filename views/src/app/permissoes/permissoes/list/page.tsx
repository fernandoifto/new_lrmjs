'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../../home/components/header';
import Menu from '../../../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaShieldAlt, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
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

export default function PermissoesListPage() {
    const router = useRouter();
    const { isAdmin } = usePermissions();
    const [permissoes, setPermissoes] = useState<Permissao[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        loadPermissoes();
    }, []);

    const loadPermissoes = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get('/permissoes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setPermissoes(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar permissões:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar permissões');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, nome: string) => {
        if (!confirm(`Tem certeza que deseja excluir a permissão "${nome}"?`)) {
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
            loadPermissoes();
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
        <WithPermission requiredPermission="admin">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <FaShieldAlt size={24} />
                                </div>
                                <div>
                                    <h1>Permissões</h1>
                                    <p>Lista de todas as permissões cadastradas</p>
                                </div>
                            </div>
                            {isAdmin && (
                                <Link href="/permissoes/novo" className={styles.btnNew}>
                                    <FaPlus size={20} />
                                    Nova Permissão
                                </Link>
                            )}
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando permissões...</p>
                            </div>
                        ) : permissoes.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>Nenhuma permissão encontrada</p>
                                {isAdmin && (
                                    <Link href="/permissoes/novo" className={styles.btnNew}>
                                        Criar primeira permissão
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className={styles.grid}>
                                {permissoes.map((permissao) => (
                                    <div key={permissao.id} className={styles.card}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.cardIcon}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M12 15v2M9 11.24l-1.5-1.5a4.5 4.5 0 0 1 0-6.36l6.36 6.36a4.5 4.5 0 0 1 0 6.36L9 11.24zM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                                                </svg>
                                            </div>
                                            <h3>{permissao.nome}</h3>
                                        </div>
                                        <div className={styles.cardBody}>
                                            {permissao.descricao && (
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Descrição:</span>
                                                    <span>{permissao.descricao}</span>
                                                </div>
                                            )}
                                            {permissao.pagina && (
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Página:</span>
                                                    <span>{permissao.pagina}</span>
                                                </div>
                                            )}
                                            {permissao.acao && (
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Ação:</span>
                                                    <span>{permissao.acao}</span>
                                                </div>
                                            )}
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Criado em:</span>
                                                <span>{formatDate(permissao.created)}</span>
                                            </div>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            <Link 
                                                href={`/permissoes/permissoes/${permissao.id}`}
                                                className={styles.btnView}
                                                title="Ver detalhes"
                                            >
                                                <FaEye size={16} />
                                            </Link>
                                            {isAdmin && (
                                                <Link 
                                                    href={`/permissoes/permissoes/${permissao.id}/editar`}
                                                    className={styles.btnEdit}
                                                    title="Editar"
                                                >
                                                    <FaEdit size={16} />
                                                </Link>
                                            )}
                                            {isAdmin && (
                                                <button
                                                    onClick={() => handleDelete(permissao.id, permissao.nome)}
                                                    className={styles.btnDelete}
                                                    title="Excluir permissão"
                                                >
                                                    <FaTrash size={18} />
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
