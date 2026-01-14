'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { api } from '@/api/api';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaHandHoldingHeart, FaCheckCircle, FaTimesCircle, FaClock, FaEye } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';

interface Solicitacao {
    id: number;
    qtde: number;
    status: string;
    created: string;
    modified: string;
    lotes: {
        id: number;
        numero: string;
        datavencimento: string;
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
    };
    paciente: {
        id: number;
        nome: string;
        cpf: string;
        telefone: string;
    };
}

export default function SolicitacoesPage() {
    const router = useRouter();
    const { hasPermission, isAdmin } = usePermissions();
    const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [filter, setFilter] = useState<'todas' | 'pendentes' | 'confirmadas' | 'recusadas'>('pendentes');

    useEffect(() => {
        setMounted(true);
        loadSolicitacoes();
    }, [filter]);

    const loadSolicitacoes = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const statusParam = filter === 'todas' ? undefined : filter === 'pendentes' ? 'pendente' : filter === 'confirmadas' ? 'confirmada' : 'recusada';
            const url = statusParam ? `/solicitacoes?status=${statusParam}` : '/solicitacoes';

            const response = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSolicitacoes(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar solicitações:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar solicitações');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmar = async (id: number) => {
        if (!confirm('Tem certeza que deseja confirmar esta solicitação? A retirada será registrada e o estoque será atualizado.')) {
            return;
        }

        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            // Obter ID do usuário atual
            const userResponse = await api.get('/detail', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            await api.post(`/solicitacao/${id}/confirmar?userId=${userResponse.data.id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Solicitação confirmada com sucesso!');
            loadSolicitacoes();
        } catch (error: any) {
            console.error('Erro ao confirmar solicitação:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao confirmar solicitação');
            }
        }
    };

    const handleRecusar = async (id: number) => {
        if (!confirm('Tem certeza que deseja recusar esta solicitação?')) {
            return;
        }

        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.post(`/solicitacao/${id}/recusar`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Solicitação recusada');
            loadSolicitacoes();
        } catch (error: any) {
            console.error('Erro ao recusar solicitação:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao recusar solicitação');
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

    const formatDateOnly = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pendente':
                return <FaClock className={styles.statusIconPendente} size={20} />;
            case 'confirmada':
                return <FaCheckCircle className={styles.statusIconConfirmada} size={20} />;
            case 'recusada':
                return <FaTimesCircle className={styles.statusIconRecusada} size={20} />;
            default:
                return null;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pendente':
                return 'Pendente';
            case 'confirmada':
                return 'Confirmada';
            case 'recusada':
                return 'Recusada';
            default:
                return status;
        }
    };

    if (!mounted) {
        return null;
    }

    const podeConfirmar = isAdmin || hasPermission('retiradas.criar');
    const podeRecusar = isAdmin || hasPermission('retiradas.editar');

    return (
        <WithPermission requiredPermission="retiradas.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <FaHandHoldingHeart size={24} />
                                </div>
                                <div>
                                    <h1>Solicitações de Doação</h1>
                                    <p>Gerencie as solicitações de medicamentos dos pacientes</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.filters}>
                            <button
                                className={`${styles.filterBtn} ${filter === 'todas' ? styles.active : ''}`}
                                onClick={() => setFilter('todas')}
                            >
                                Todas
                            </button>
                            <button
                                className={`${styles.filterBtn} ${filter === 'pendentes' ? styles.active : ''}`}
                                onClick={() => setFilter('pendentes')}
                            >
                                Pendentes
                            </button>
                            <button
                                className={`${styles.filterBtn} ${filter === 'confirmadas' ? styles.active : ''}`}
                                onClick={() => setFilter('confirmadas')}
                            >
                                Confirmadas
                            </button>
                            <button
                                className={`${styles.filterBtn} ${filter === 'recusadas' ? styles.active : ''}`}
                                onClick={() => setFilter('recusadas')}
                            >
                                Recusadas
                            </button>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando solicitações...</p>
                            </div>
                        ) : solicitacoes.length === 0 ? (
                            <div className={styles.emptyContainer}>
                                <p>Nenhuma solicitação encontrada.</p>
                            </div>
                        ) : (
                            <div className={styles.solicitacoesList}>
                                {solicitacoes.map((solicitacao) => (
                                    <div key={solicitacao.id} className={styles.solicitacaoCard}>
                                        <div className={styles.solicitacaoHeader}>
                                            <div className={styles.solicitacaoStatus}>
                                                {getStatusIcon(solicitacao.status)}
                                                <span className={`${styles.statusLabel} ${styles[`status${solicitacao.status.charAt(0).toUpperCase() + solicitacao.status.slice(1)}`]}`}>
                                                    {getStatusLabel(solicitacao.status)}
                                                </span>
                                            </div>
                                            <span className={styles.solicitacaoDate}>
                                                {formatDate(solicitacao.created)}
                                            </span>
                                        </div>

                                        <div className={styles.solicitacaoBody}>
                                            <div className={styles.section}>
                                                <h3>Informações do Paciente</h3>
                                                <div className={styles.infoGrid}>
                                                    <div className={styles.infoItem}>
                                                        <span className={styles.label}>Nome</span>
                                                        <span className={styles.value}>{solicitacao.paciente.nome}</span>
                                                    </div>
                                                    <div className={styles.infoItem}>
                                                        <span className={styles.label}>CPF</span>
                                                        <span className={styles.value}>{solicitacao.paciente.cpf}</span>
                                                    </div>
                                                    <div className={styles.infoItem}>
                                                        <span className={styles.label}>Telefone</span>
                                                        <span className={styles.value}>{solicitacao.paciente.telefone}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.section}>
                                                <h3>Medicamento Solicitado</h3>
                                                <div className={styles.infoGrid}>
                                                    <div className={styles.infoItem}>
                                                        <span className={styles.label}>Medicamento</span>
                                                        <span className={styles.value}>{solicitacao.lotes.medicamento.descricao}</span>
                                                    </div>
                                                    <div className={styles.infoItem}>
                                                        <span className={styles.label}>Princípio Ativo</span>
                                                        <span className={styles.value}>{solicitacao.lotes.medicamento.principioativo}</span>
                                                    </div>
                                                    <div className={styles.infoItem}>
                                                        <span className={styles.label}>Forma Farmacêutica</span>
                                                        <span className={styles.value}>{solicitacao.lotes.formaFarmaceutica.descricao}</span>
                                                    </div>
                                                    <div className={styles.infoItem}>
                                                        <span className={styles.label}>Tipo</span>
                                                        <span className={styles.value}>{solicitacao.lotes.tipoMedicamento.descricao}</span>
                                                    </div>
                                                    <div className={styles.infoItem}>
                                                        <span className={styles.label}>Lote</span>
                                                        <span className={styles.value}>{solicitacao.lotes.numero}</span>
                                                    </div>
                                                    <div className={styles.infoItem}>
                                                        <span className={styles.label}>Vencimento</span>
                                                        <span className={styles.value}>{formatDateOnly(solicitacao.lotes.datavencimento)}</span>
                                                    </div>
                                                    <div className={styles.infoItem}>
                                                        <span className={styles.label}>Quantidade Solicitada</span>
                                                        <span className={styles.value}>{solicitacao.qtde} unidades</span>
                                                    </div>
                                                    <div className={styles.infoItem}>
                                                        <span className={styles.label}>Disponível no Estoque</span>
                                                        <span className={styles.value}>{solicitacao.lotes.qtde} unidades</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {solicitacao.status === 'pendente' && (
                                            <div className={styles.solicitacaoFooter}>
                                                {podeConfirmar && (
                                                    <button
                                                        onClick={() => handleConfirmar(solicitacao.id)}
                                                        className={styles.btnConfirmar}
                                                    >
                                                        <FaCheckCircle size={16} />
                                                        Confirmar
                                                    </button>
                                                )}
                                                {podeRecusar && (
                                                    <button
                                                        onClick={() => handleRecusar(solicitacao.id)}
                                                        className={styles.btnRecusar}
                                                    >
                                                        <FaTimesCircle size={16} />
                                                        Recusar
                                                    </button>
                                                )}
                                            </div>
                                        )}
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
