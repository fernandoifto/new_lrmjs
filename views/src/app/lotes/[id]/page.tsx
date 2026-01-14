'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';

interface Lote {
    id: number;
    numero: string;
    datavencimento: string;
    datafabricacao: string;
    qtde: number;
    medicamento: {
        id: number;
        descricao: string;
        principioativo: string;
    };
    formaFarmaceutica: {
        id: number;
        descricao: string;
    };
    tipoMedicamento: {
        id: number;
        descricao: string;
    };
    created: string;
    modified: string;
}

export default function LoteViewPage() {
    const router = useRouter();
    const params = useParams();
    const { hasPermission } = usePermissions();
    const [lote, setLote] = useState<Lote | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (params.id) {
            loadLote(Number(params.id));
        }
    }, [params.id]);

    const loadLote = async (id: number) => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get(`/lote/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setLote(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar lote:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Lote não encontrado');
                router.push('/lotes');
            } else {
                toast.error('Erro ao carregar lote');
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

    const isExpired = (dateString: string) => {
        const date = new Date(dateString);
        return date < new Date();
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir este lote? Esta ação não pode ser desfeita.')) {
            return;
        }

        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.delete(`/lote/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Lote excluído com sucesso!');
            router.push('/lotes');
        } catch (error: any) {
            console.error('Erro ao excluir lote:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir lote');
            }
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <WithPermission requiredPermission="lotes.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/lotes" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <div className={styles.headerActions}>
                                {lote && hasPermission('lotes.editar') && (
                                    <Link 
                                        href={`/lotes/${lote.id}/editar`}
                                        className={styles.btnEdit}
                                    >
                                        <FaEdit size={16} />
                                        Editar
                                    </Link>
                                )}
                                {lote && hasPermission('lotes.excluir') && (
                                    <button
                                        onClick={() => handleDelete(lote.id)}
                                        className={styles.btnDelete}
                                        title="Excluir lote"
                                    >
                                        <FaTrash size={16} />
                                        Excluir
                                    </button>
                                )}
                            </div>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando lote...</p>
                            </div>
                        ) : !lote ? (
                            <div className={styles.errorContainer}>
                                <p>Lote não encontrado</p>
                                <Link href="/lotes" className={styles.btnBack}>
                                    Voltar para lista
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                    <h1>Lote {lote.numero}</h1>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.section}>
                                        <h3>Informações do Lote</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Número do Lote</span>
                                                <span className={styles.value}>{lote.numero}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Quantidade</span>
                                                <span className={styles.value}>{lote.qtde}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Data de Fabricação</span>
                                                <span className={styles.value}>{formatDate(lote.datafabricacao)}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Data de Vencimento</span>
                                                <span className={`${styles.value} ${isExpired(lote.datavencimento) ? styles.expired : ''}`}>
                                                    {formatDate(lote.datavencimento)}
                                                    {isExpired(lote.datavencimento) && ' (Vencido)'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.section}>
                                        <h3>Informações do Medicamento</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Medicamento</span>
                                                <span className={styles.value}>{lote.medicamento.descricao}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Princípio Ativo</span>
                                                <span className={styles.value}>{lote.medicamento.principioativo}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Forma Farmacêutica</span>
                                                <span className={styles.value}>{lote.formaFarmaceutica.descricao}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Tipo de Medicamento</span>
                                                <span className={styles.value}>{lote.tipoMedicamento.descricao}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.section}>
                                        <h3>Informações do Sistema</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Criado em</span>
                                                <span className={styles.value}>{formatDate(lote.created)}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Última atualização</span>
                                                <span className={styles.value}>{formatDate(lote.modified)}</span>
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

