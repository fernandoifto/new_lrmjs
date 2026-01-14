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

interface TipoMedicamento {
    id: number;
    descricao: string;
    created: string;
    modified: string;
}

export default function TipoMedicamentoViewPage() {
    const router = useRouter();
    const params = useParams();
    const { hasPermission } = usePermissions();
    const [tipoMedicamento, setTipoMedicamento] = useState<TipoMedicamento | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (params.id) {
            loadTipoMedicamento(Number(params.id));
        }
    }, [params.id]);

    const loadTipoMedicamento = async (id: number) => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get(`/tipo-medicamento/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTipoMedicamento(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar tipo de medicamento:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Tipo de medicamento não encontrado');
                router.push('/tipos-medicamentos');
            } else {
                toast.error('Erro ao carregar tipo de medicamento');
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
        if (!confirm('Tem certeza que deseja excluir este tipo de medicamento? Esta ação não pode ser desfeita.')) {
            return;
        }

        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.delete(`/tipo-medicamento/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Tipo de medicamento excluído com sucesso!');
            router.push('/tipos-medicamentos');
        } catch (error: any) {
            console.error('Erro ao excluir tipo de medicamento:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir tipo de medicamento');
            }
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <WithPermission requiredPermission="tipos_medicamentos.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/tipos-medicamentos" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <div className={styles.headerActions}>
                                {tipoMedicamento && hasPermission('tipos_medicamentos.editar') && (
                                    <Link 
                                        href={`/tipos-medicamentos/${tipoMedicamento.id}/editar`}
                                        className={styles.btnEdit}
                                    >
                                        <FaEdit size={16} />
                                        Editar
                                    </Link>
                                )}
                                {tipoMedicamento && hasPermission('tipos_medicamentos.excluir') && (
                                    <button
                                        onClick={() => handleDelete(tipoMedicamento.id)}
                                        className={styles.btnDelete}
                                        title="Excluir tipo de medicamento"
                                    >
                                        <FaTrash size={18} />
                                        Excluir
                                    </button>
                                )}
                            </div>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando tipo de medicamento...</p>
                            </div>
                        ) : !tipoMedicamento ? (
                            <div className={styles.errorContainer}>
                                <p>Tipo de medicamento não encontrado</p>
                                <Link href="/tipos-medicamentos" className={styles.btnBack}>
                                    Voltar para lista
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                    </div>
                                    <h1>{tipoMedicamento.descricao}</h1>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.section}>
                                        <h3>Informações do Tipo de Medicamento</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Descrição</span>
                                                <span className={styles.value}>{tipoMedicamento.descricao}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.section}>
                                        <h3>Informações do Sistema</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Criado em</span>
                                                <span className={styles.value}>{formatDate(tipoMedicamento.created)}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Última atualização</span>
                                                <span className={styles.value}>{formatDate(tipoMedicamento.modified)}</span>
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

