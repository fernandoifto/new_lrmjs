'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { api } from '@/api/api';
import Header from '../home/components/header';
import HeaderRight from '../home/components/headerRight';
import Footer from '../home/components/footer';
import styles from './page.module.css';
import { FaBoxes, FaHandHoldingHeart, FaCheckCircle, FaClock, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';
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
}

interface Solicitacao {
    id: number;
    qtde: number;
    status: string;
    created: string;
    modified: string;
    lotes: {
        id: number;
        numero: string;
        medicamento: {
            id: number;
            descricao: string;
        };
    };
}

export default function LotesDisponiveisPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pacienteId = searchParams.get('paciente');
    
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [loading, setLoading] = useState(true);
    const [solicitacoes, setSolicitacoes] = useState<Record<number, number>>({}); // loteId -> quantidade
    const [saving, setSaving] = useState(false);
    const [solicitacoesExistentes, setSolicitacoesExistentes] = useState<Solicitacao[]>([]);
    const [loadingSolicitacoes, setLoadingSolicitacoes] = useState(true);

    useEffect(() => {
        if (!pacienteId) {
            toast.error('ID do paciente não informado');
            router.push('/solicitar-doacao');
            return;
        }
        loadLotes();
        loadSolicitacoes();
    }, [pacienteId, router]);

    const loadLotes = async () => {
        try {
            setLoading(true);
            const response = await api.get('/lotes-disponiveis');
            setLotes(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar lotes:', error);
            toast.error('Erro ao carregar medicamentos disponíveis');
        } finally {
            setLoading(false);
        }
    };

    const loadSolicitacoes = async () => {
        if (!pacienteId) return;
        
        try {
            setLoadingSolicitacoes(true);
            const response = await api.get(`/solicitacoes/paciente?paciente=${pacienteId}`);
            setSolicitacoesExistentes(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar solicitações:', error);
            // Não mostrar erro para o usuário, apenas logar
        } finally {
            setLoadingSolicitacoes(false);
        }
    };

    const handleQuantidadeChange = (loteId: number, quantidade: number) => {
        const qtd = parseInt(quantidade.toString()) || 0;
        if (qtd < 0) return;
        
        setSolicitacoes(prev => {
            const newSolicitacoes = { ...prev };
            if (qtd === 0) {
                delete newSolicitacoes[loteId];
            } else {
                newSolicitacoes[loteId] = qtd;
            }
            return newSolicitacoes;
        });
    };

    const handleSolicitar = async () => {
        if (!pacienteId) {
            toast.error('ID do paciente não informado');
            return;
        }

        const solicitacoesArray = Object.entries(solicitacoes).map(([loteId, qtde]) => ({
            id_lotes: parseInt(loteId),
            qtde
        }));

        if (solicitacoesArray.length === 0) {
            toast.error('Selecione pelo menos um medicamento para solicitar');
            return;
        }

        // Validar quantidades
        for (const solic of solicitacoesArray) {
            const lote = lotes.find(l => l.id === solic.id_lotes);
            if (!lote) continue;
            if (solic.qtde > lote.qtde) {
                toast.error(`Quantidade solicitada para ${lote.medicamento.descricao} excede o disponível (${lote.qtde})`);
                return;
            }
        }

        setSaving(true);

        try {
            // Criar solicitações
            const promises = solicitacoesArray.map(solic =>
                api.post('/solicitacao', {
                    qtde: solic.qtde,
                    id_lotes: solic.id_lotes,
                    id_pacientes: parseInt(pacienteId)
                })
            );

            await Promise.all(promises);

            // Limpar seleções
            setSolicitacoes({});
            
            // Recarregar solicitações
            await loadSolicitacoes();

            toast.success('Solicitações enviadas com sucesso! Aguarde a confirmação de um atendente.');
        } catch (error: any) {
            console.error('Erro ao criar solicitações:', error);
            toast.error(error.response?.data?.error || 'Erro ao enviar solicitações');
        } finally {
            setSaving(false);
        }
    };

    const formatDate = (dateString: string, includeTime: boolean = false) => {
        const date = new Date(dateString);
        if (includeTime) {
            return date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        return date.toLocaleDateString('pt-BR');
    };

    const getQuantidadeSolicitada = (loteId: number) => {
        return solicitacoes[loteId] || 0;
    };

    const getSolicitacoesPorLote = (loteId: number) => {
        return solicitacoesExistentes.filter(s => s.lotes.id === loteId);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pendente':
                return { text: 'Pendente', icon: FaClock, color: '#ffc107', bgColor: '#fff3cd' };
            case 'confirmada':
                return { text: 'Confirmada', icon: FaCheckCircle, color: '#28a745', bgColor: '#d4edda' };
            case 'recusada':
                return { text: 'Recusada', icon: FaTimesCircle, color: '#dc3545', bgColor: '#f8d7da' };
            default:
                return { text: status, icon: FaClock, color: '#6c757d', bgColor: '#e9ecef' };
        }
    };

    const totalSolicitacoes = Object.keys(solicitacoes).length;

    return (
        <>
            <Header>
                <HeaderRight />
            </Header>
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/solicitar-doacao" className={styles.btnBack}>
                                <FaArrowLeft size={16} /> Voltar
                            </Link>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando medicamentos disponíveis...</p>
                            </div>
                        ) : lotes.length === 0 ? (
                            <div className={styles.emptyContainer}>
                                <p>Não há medicamentos disponíveis no momento.</p>
                            </div>
                        ) : (
                            <>
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.cardIcon}>
                                            <FaBoxes size={24} />
                                        </div>
                                        <h1>Medicamentos Disponíveis</h1>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <div className={styles.section}>
                                            <p className={styles.sectionDescription}>Selecione os medicamentos que você precisa</p>
                                            <div className={styles.lotesGrid}>
                                                {lotes.map((lote) => {
                                                    const quantidadeSolicitada = getQuantidadeSolicitada(lote.id);
                                                    const isSelected = quantidadeSolicitada > 0;
                                                    const solicitacoesLote = getSolicitacoesPorLote(lote.id);
                                                    
                                                    return (
                                                        <div key={lote.id} className={`${styles.loteCard} ${isSelected ? styles.selected : ''}`}>
                                                            <div className={styles.loteHeader}>
                                                                <h3>{lote.medicamento.descricao}</h3>
                                                                {isSelected && (
                                                                    <FaCheckCircle className={styles.checkIcon} size={20} />
                                                                )}
                                                            </div>
                                                            <div className={styles.loteBody}>
                                                                {solicitacoesLote.length > 0 && (
                                                                    <div className={styles.solicitacoesLote}>
                                                                        <span className={styles.solicitacoesLabel}>Solicitações anteriores:</span>
                                                                        {solicitacoesLote.map((sol) => {
                                                                            const statusBadge = getStatusBadge(sol.status);
                                                                            const StatusIcon = statusBadge.icon;
                                                                            return (
                                                                                <div 
                                                                                    key={sol.id}
                                                                                    className={styles.statusBadgeSmall}
                                                                                    style={{ 
                                                                                        backgroundColor: statusBadge.bgColor,
                                                                                        color: statusBadge.color,
                                                                                        borderColor: statusBadge.color
                                                                                    }}
                                                                                >
                                                                                    <StatusIcon size={12} />
                                                                                    <span>{statusBadge.text} ({sol.qtde} un.)</span>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                )}
                                                                <div className={styles.loteInfo}>
                                                                    <span className={styles.label}>Princípio Ativo:</span>
                                                                    <span className={styles.value}>{lote.medicamento.principioativo}</span>
                                                                </div>
                                                                <div className={styles.loteInfo}>
                                                                    <span className={styles.label}>Forma Farmacêutica:</span>
                                                                    <span className={styles.value}>{lote.formaFarmaceutica.descricao}</span>
                                                                </div>
                                                                <div className={styles.loteInfo}>
                                                                    <span className={styles.label}>Tipo:</span>
                                                                    <span className={styles.value}>{lote.tipoMedicamento.descricao}</span>
                                                                </div>
                                                                <div className={styles.loteInfo}>
                                                                    <span className={styles.label}>Lote:</span>
                                                                    <span className={styles.value}>{lote.numero}</span>
                                                                </div>
                                                                <div className={styles.loteInfo}>
                                                                    <span className={styles.label}>Vencimento:</span>
                                                                    <span className={styles.value}>{formatDate(lote.datavencimento)}</span>
                                                                </div>
                                                                <div className={styles.loteInfo}>
                                                                    <span className={styles.label}>Disponível:</span>
                                                                    <span className={styles.value}>{lote.qtde} unidades</span>
                                                                </div>
                                                            </div>
                                                            <div className={styles.loteFooter}>
                                                                <label className={styles.quantidadeLabel}>
                                                                    <span>Quantidade:</span>
                                                                    <input
                                                                        type="number"
                                                                        min="0"
                                                                        max={lote.qtde}
                                                                        value={quantidadeSolicitada}
                                                                        onChange={(e) => handleQuantidadeChange(lote.id, parseInt(e.target.value) || 0)}
                                                                        className={styles.quantidadeInput}
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                        {!loadingSolicitacoes && solicitacoesExistentes.length > 0 && (
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>
                                        <FaHandHoldingHeart size={24} />
                                    </div>
                                    <h1>Solicitações Anteriores</h1>
                                </div>
                                <div className={styles.cardBody}>
                                    <div className={styles.section}>
                                        <div className={styles.solicitacoesList}>
                                            {solicitacoesExistentes.map((solicitacao) => {
                                                const statusBadge = getStatusBadge(solicitacao.status);
                                                const StatusIcon = statusBadge.icon;
                                                return (
                                                    <div key={solicitacao.id} className={styles.solicitacaoItem}>
                                                        <div className={styles.solicitacaoInfo}>
                                                            <h4>{solicitacao.lotes.medicamento.descricao}</h4>
                                                            <p>Lote: {solicitacao.lotes.numero} | Quantidade: {solicitacao.qtde}</p>
                                                            <p className={styles.solicitacaoDate}>
                                                                Solicitado em: {formatDate(solicitacao.created, true)}
                                                            </p>
                                                        </div>
                                                        <div 
                                                            className={styles.statusBadge}
                                                            style={{ 
                                                                backgroundColor: statusBadge.bgColor,
                                                                color: statusBadge.color,
                                                                borderColor: statusBadge.color
                                                            }}
                                                        >
                                                            <StatusIcon size={14} />
                                                            <span>{statusBadge.text}</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {totalSolicitacoes > 0 && (
                            <div className={styles.footer}>
                                <div className={styles.footerInfo}>
                                    <p>
                                        <strong>{totalSolicitacoes}</strong> medicamento{totalSolicitacoes > 1 ? 's' : ''} selecionado{totalSolicitacoes > 1 ? 's' : ''}
                                    </p>
                                </div>
                                <button
                                    onClick={handleSolicitar}
                                    className={styles.btnSolicitar}
                                    disabled={saving}
                                >
                                    <FaHandHoldingHeart size={18} />
                                    {saving ? 'Enviando...' : 'Solicitar Medicamentos'}
                                </button>
                            </div>
                        )}
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
