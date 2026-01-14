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

interface Medicamento {
    id: number;
    descricao: string;
    principioativo: string;
    created: string;
    modified: string;
}

interface Lote {
    id: number;
    numero: string;
    datavencimento: string;
    datafabricacao: string;
    qtde: number;
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

export default function MedicamentoViewPage() {
    const router = useRouter();
    const params = useParams();
    const { hasPermission } = usePermissions();
    const [medicamento, setMedicamento] = useState<Medicamento | null>(null);
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingLotes, setLoadingLotes] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (params.id) {
            const medicamentoId = Number(params.id);
            loadMedicamento(medicamentoId);
            loadLotes(medicamentoId);
        }
    }, [params.id]);

    const loadMedicamento = async (id: number) => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get(`/medicamento/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMedicamento(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar medicamento:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Tipo de medicamento não encontrado');
                router.push('/medicamentos');
            } else {
                toast.error('Erro ao carregar medicamento');
            }
        } finally {
            setLoading(false);
        }
    };

    const loadLotes = async (medicamentoId: number) => {
        try {
            setLoadingLotes(true);
            const token = getCookieClient();

            if (!token) {
                return;
            }

            const response = await api.get('/lotes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Filtrar lotes que pertencem a este medicamento
            const lotesDoMedicamento = response.data.filter((lote: any) => 
                lote.medicamento?.id === medicamentoId
            );

            setLotes(lotesDoMedicamento);
        } catch (error: any) {
            console.error('Erro ao carregar lotes:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar lotes');
            }
        } finally {
            setLoadingLotes(false);
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

    const formatDateOnly = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getVencimentoStatus = (dataVencimento: string) => {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const vencimento = new Date(dataVencimento);
        vencimento.setHours(0, 0, 0, 0);
        const diffTime = vencimento.getTime() - hoje.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return { status: 'vencido', label: 'Vencido', className: 'expired' };
        } else if (diffDays <= 90) {
            return { status: 'proximo', label: 'Próximo do vencimento', className: 'warning' };
        } else {
            return { status: 'ok', label: 'OK', className: 'safe' };
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir este medicamento? Esta ação não pode ser desfeita.')) {
            return;
        }

        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.delete(`/medicamento/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Medicamento excluído com sucesso!');
            router.push('/medicamentos/list');
        } catch (error: any) {
            console.error('Erro ao excluir medicamento:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir medicamento');
            }
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <WithPermission requiredPermission="medicamentos.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/medicamentos/list" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <div className={styles.headerActions}>
                                {medicamento && hasPermission('medicamentos.editar') && (
                                    <Link
                                        href={`/medicamentos/${medicamento.id}/editar`}
                                        className={styles.btnEdit}
                                    >
                                        <FaEdit size={16} />
                                        Editar
                                    </Link>
                                )}
                                {medicamento && hasPermission('medicamentos.excluir') && (
                                    <button
                                        onClick={() => handleDelete(medicamento.id)}
                                        className={styles.btnDelete}
                                        title="Excluir medicamento"
                                    >
                                        <FaTrash size={18} />
                                        Excluir
                                    </button>
                                )}
                            </div>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando medicamento...</p>
                            </div>
                        ) : !medicamento ? (
                            <div className={styles.errorContainer}>
                                <p>Medicamento não encontrado</p>
                                <Link href="/medicamentos/list" className={styles.btnBack}>
                                    Voltar para lista
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                    <h1>{medicamento.descricao}</h1>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.section}>
                                        <h3>Informações do Medicamento</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Descrição</span>
                                                <span className={styles.value}>{medicamento.descricao}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Princípio Ativo</span>
                                                <span className={styles.value}>{medicamento.principioativo}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.section}>
                                        <h3>Informações do Sistema</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Criado em</span>
                                                <span className={styles.value}>{formatDate(medicamento.created)}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Última atualização</span>
                                                <span className={styles.value}>{formatDate(medicamento.modified)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.section}>
                                        <h3>Lotes deste Medicamento</h3>
                                        {loadingLotes ? (
                                            <div className={styles.loadingLotes}>
                                                <p>Carregando lotes...</p>
                                            </div>
                                        ) : lotes.length === 0 ? (
                                            <div className={styles.emptyLotes}>
                                                <p>Nenhum lote encontrado para este medicamento.</p>
                                            </div>
                                        ) : (
                                            <div className={styles.lotesGrid}>
                                                {lotes.map((lote) => {
                                                    const vencimentoStatus = getVencimentoStatus(lote.datavencimento);
                                                    return (
                                                        <div key={lote.id} className={styles.loteCard}>
                                                            <div className={styles.loteHeader}>
                                                                <h4>Lote {lote.numero}</h4>
                                                                <span className={styles[vencimentoStatus.className]}>
                                                                    {vencimentoStatus.label}
                                                                </span>
                                                            </div>
                                                            <div className={styles.loteBody}>
                                                                <div className={styles.loteInfo}>
                                                                    <span className={styles.loteLabel}>Quantidade:</span>
                                                                    <span className={styles.loteValue}>{lote.qtde}</span>
                                                                </div>
                                                                <div className={styles.loteInfo}>
                                                                    <span className={styles.loteLabel}>Data de Fabricação:</span>
                                                                    <span className={styles.loteValue}>{formatDateOnly(lote.datafabricacao)}</span>
                                                                </div>
                                                                <div className={styles.loteInfo}>
                                                                    <span className={styles.loteLabel}>Data de Vencimento:</span>
                                                                    <span className={`${styles.loteValue} ${styles[vencimentoStatus.className]}`}>
                                                                        {formatDateOnly(lote.datavencimento)}
                                                                    </span>
                                                                </div>
                                                                <div className={styles.loteInfo}>
                                                                    <span className={styles.loteLabel}>Forma Farmacêutica:</span>
                                                                    <span className={styles.loteValue}>{lote.formaFarmaceutica.descricao}</span>
                                                                </div>
                                                                <div className={styles.loteInfo}>
                                                                    <span className={styles.loteLabel}>Tipo de Medicamento:</span>
                                                                    <span className={styles.loteValue}>{lote.tipoMedicamento.descricao}</span>
                                                                </div>
                                                            </div>
                                                            <div className={styles.loteFooter}>
                                                                {hasPermission('lotes.ver') && (
                                                                    <Link href={`/lotes/${lote.id}`} className={styles.btnViewLote}>
                                                                        Ver Detalhes
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
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

