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
import { FaUsersCog, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';

interface Grupo {
    id: number;
    nome: string;
    descricao?: string;
    _count?: {
        userRoles: number;
    };
    created: string;
    modified: string;
}

export default function GruposListPage() {
    const router = useRouter();
    const { isAdmin } = usePermissions();
    const [grupos, setGrupos] = useState<Grupo[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        loadGrupos();
    }, []);

    const loadGrupos = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get('/roles', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setGrupos(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar grupos:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar grupos');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, nome: string) => {
        if (!confirm(`Tem certeza que deseja excluir o grupo "${nome}"?`)) {
            return;
        }

        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.delete(`/role/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Grupo excluído com sucesso!');
            loadGrupos();
        } catch (error: any) {
            console.error('Erro ao excluir grupo:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir grupo');
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
                                    <FaUsersCog size={24} />
                                </div>
                                <div>
                                    <h1>Grupos</h1>
                                    <p>Lista de todos os grupos cadastrados</p>
                                </div>
                            </div>
                            {isAdmin && (
                                <Link href="/permissoes/grupos/novo" className={styles.btnNew}>
                                    <FaPlus size={20} />
                                    Novo Grupo
                                </Link>
                            )}
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando grupos...</p>
                            </div>
                        ) : grupos.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>Nenhum grupo encontrado</p>
                                {isAdmin && (
                                    <Link href="/permissoes/grupos/novo" className={styles.btnNew}>
                                        Criar primeiro grupo
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className={styles.grid}>
                                {grupos.map((grupo) => (
                                    <div key={grupo.id} className={styles.card}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.cardIcon}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                    <circle cx="9" cy="7" r="4" />
                                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                                </svg>
                                            </div>
                                            <h3>{grupo.nome}</h3>
                                        </div>
                                        <div className={styles.cardBody}>
                                            {grupo.descricao && (
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Descrição:</span>
                                                    <span>{grupo.descricao}</span>
                                                </div>
                                            )}
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Usuários:</span>
                                                <span>{grupo._count?.userRoles || 0}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Criado em:</span>
                                                <span>{formatDate(grupo.created)}</span>
                                            </div>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            <Link 
                                                href={`/permissoes/grupos/${grupo.id}`}
                                                className={styles.btnView}
                                                title="Ver detalhes"
                                            >
                                                <FaEye size={16} />
                                            </Link>
                                            {isAdmin && (
                                                <Link 
                                                    href={`/permissoes/grupos/${grupo.id}/editar`}
                                                    className={styles.btnEdit}
                                                    title="Editar"
                                                >
                                                    <FaEdit size={16} />
                                                </Link>
                                            )}
                                            {isAdmin && (
                                                <button
                                                    onClick={() => handleDelete(grupo.id, grupo.nome)}
                                                    className={styles.btnDelete}
                                                    title="Excluir grupo"
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
