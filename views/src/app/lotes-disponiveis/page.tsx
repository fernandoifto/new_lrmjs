'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { api } from '@/api/api';
import Header from '../home/components/header';
import HeaderRight from '../home/components/headerRight';
import Footer from '../home/components/footer';
import styles from './page.module.css';
import { FaBoxes, FaHandHoldingHeart, FaCheckCircle, FaClock, FaTimesCircle, FaArrowLeft, FaFileMedical, FaUpload, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
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
    const [fotoReceita, setFotoReceita] = useState<File | null>(null);
    const [fotoReceitaPreview, setFotoReceitaPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!pacienteId) {
            toast.error('ID do paciente não informado');
            router.push('/solicitar-doacao');
            return;
        }
        loadLotes();
        loadSolicitacoes();
        
        // Recarregar solicitações a cada 10 segundos para verificar confirmações
        const interval = setInterval(() => {
            loadSolicitacoes();
        }, 10000);
        
        return () => clearInterval(interval);
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validar tipo de arquivo
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            toast.error('Apenas arquivos de imagem são permitidos (JPEG, PNG, GIF, WEBP)');
            return;
        }

        // Validar tamanho (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('A foto da receita deve ter no máximo 5MB');
            return;
        }

        setFotoReceita(file);

        // Criar preview
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                setFotoReceitaPreview(e.target.result as string);
            }
        };
        reader.readAsDataURL(file);
    };

    const removeFotoReceita = () => {
        setFotoReceita(null);
        setFotoReceitaPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSolicitar = async () => {
        if (!pacienteId) {
            toast.error('ID do paciente não informado');
            return;
        }

        if (!fotoReceita) {
            toast.error('É obrigatório enviar a foto da receita médica');
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
            // Criar FormData para cada solicitação com a foto da receita
            const promises = solicitacoesArray.map(solic => {
                const formData = new FormData();
                formData.append('qtde', solic.qtde.toString());
                formData.append('id_lotes', solic.id_lotes.toString());
                formData.append('id_pacientes', pacienteId);
                formData.append('foto_receita', fotoReceita);

                return api.post('/solicitacao', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            });

            await Promise.all(promises);

            // Limpar seleções e foto
            setSolicitacoes({});
            setFotoReceita(null);
            setFotoReceitaPreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            
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
            case 'pendente_de_aprovacao':
                return { text: 'Pendente de Aprovação', icon: FaClock, color: '#ffc107', bgColor: '#fff3cd' };
            case 'aprovado_para_retirada':
                return { text: 'Aprovado para Retirada', icon: FaCheckCircle, color: '#28a745', bgColor: '#d4edda' };
            case 'retirada_concluida':
                return { text: 'Retirada Concluída', icon: FaCheckCircle, color: '#17a2b8', bgColor: '#d1ecf1' };
            case 'recusada':
                return { text: 'Recusada', icon: FaTimesCircle, color: '#dc3545', bgColor: '#f8d7da' };
            default:
                return { text: status, icon: FaClock, color: '#6c757d', bgColor: '#e9ecef' };
        }
    };

    const totalSolicitacoes = Object.keys(solicitacoes).length;
    const solicitacoesConfirmadas = solicitacoesExistentes.filter(s => s.status === 'aprovado_para_retirada');

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

                        {totalSolicitacoes > 0 && (
                            <>
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.cardIcon}>
                                            <FaFileMedical size={20} />
                                        </div>
                                        <h3>Foto da Receita Médica</h3>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <div className={styles.receitaUploadSection}>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                id="foto_receita"
                                                name="foto_receita"
                                                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                                onChange={handleFileChange}
                                                className={styles.fileInput}
                                                required
                                            />
                                            <label htmlFor="foto_receita" className={styles.fileInputLabel}>
                                                <FaUpload size={18} />
                                                <span>{fotoReceita ? 'Trocar Foto' : 'Selecionar Foto da Receita'}</span>
                                            </label>
                                            
                                            {fotoReceitaPreview && (
                                                <div className={styles.receitaPreview}>
                                                    <img 
                                                        src={fotoReceitaPreview} 
                                                        alt="Preview da receita médica"
                                                        className={styles.receitaPreviewImage}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeFotoReceita}
                                                        className={styles.removeReceitaButton}
                                                        title="Remover foto"
                                                    >
                                                        <FaTimes size={14} />
                                                    </button>
                                                </div>
                                            )}
                                            
                                            <div style={{ 
                                                marginTop: '1rem', 
                                                fontSize: '0.9rem', 
                                                color: '#856404', 
                                                padding: '0.75rem', 
                                                backgroundColor: '#fff3cd', 
                                                borderRadius: '6px', 
                                                border: '1px solid #ffc107' 
                                            }}>
                                                <strong>⚠️ Importante:</strong> É obrigatório enviar uma foto nítida da receita médica. O medicamento só será entregue mediante apresentação da receita médica original no momento da retirada.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.footer}>
                                    <div className={styles.footerInfo}>
                                        <p>
                                            <strong>{totalSolicitacoes}</strong> medicamento{totalSolicitacoes > 1 ? 's' : ''} selecionado{totalSolicitacoes > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleSolicitar}
                                        className={styles.btnSolicitar}
                                        disabled={saving || !fotoReceita}
                                    >
                                        <FaHandHoldingHeart size={18} />
                                        {saving ? 'Enviando...' : 'Solicitar Medicamentos'}
                                    </button>
                                </div>
                            </>
                        )}

                        {!loadingSolicitacoes && solicitacoesExistentes.length > 0 && (
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>
                                        <FaHandHoldingHeart size={24} />
                                    </div>
                                    <h1>Solicitações Anteriores</h1>
                                </div>
                                <div className={styles.cardBody}>
                                    {solicitacoesConfirmadas.length > 0 && (
                                        <div style={{ 
                                            padding: '1rem', 
                                            backgroundColor: '#fff', 
                                            borderRadius: '8px',
                                            border: '2px solid #ffc107',
                                            boxShadow: '0 2px 4px rgba(255, 193, 7, 0.2)',
                                            marginBottom: '1.5rem'
                                        }}>
                                            <div style={{ 
                                                margin: 0, 
                                                fontSize: '1.1rem', 
                                                fontWeight: 'bold',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}>
                                                <div className={styles.cardIcon} style={{ width: '32px', height: '32px' }}>
                                                    <FaExclamationTriangle size={16} />
                                                </div>
                                                <span>Lembre de levar a receita médica para retirar a medicação.</span>
                                            </div>
                                            <p style={{ 
                                                marginTop: '0.75rem', 
                                                marginBottom: 0, 
                                                fontSize: '0.95rem'
                                            }}>
                                                Você tem <strong>{solicitacoesConfirmadas.length}</strong> solicitação{solicitacoesConfirmadas.length > 1 ? 'ões' : ''} aprovada{solicitacoesConfirmadas.length > 1 ? 's' : ''} para retirada e pode retirar os medicamentos.
                                            </p>
                                        </div>
                                    )}
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
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
