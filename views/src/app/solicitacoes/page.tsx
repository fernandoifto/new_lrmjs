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
import { FaHandHoldingHeart, FaCheckCircle, FaTimesCircle, FaClock, FaEye, FaSearch, FaTimes, FaFilePdf, FaFileMedical } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';
import jsPDF from 'jspdf';

interface Solicitacao {
    id: number;
    qtde: number;
    status: string;
    created: string;
    modified: string;
    foto_receita?: string;
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
    const [filteredSolicitacoes, setFilteredSolicitacoes] = useState<Solicitacao[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [filter, setFilter] = useState<'todas' | 'pendentes' | 'aprovadas' | 'concluidas' | 'recusadas'>('pendentes');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('paciente');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [activeSearchOption, setActiveSearchOption] = useState('paciente');
    const [modalFotoAberta, setModalFotoAberta] = useState(false);
    const [fotoSelecionada, setFotoSelecionada] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        loadSolicitacoes();
    }, [filter]);

    useEffect(() => {
        filterSolicitacoes();
    }, [solicitacoes, activeSearchTerm, activeSearchOption]);

    const loadSolicitacoes = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const statusParam = filter === 'todas' ? undefined : 
                filter === 'pendentes' ? 'pendente_de_aprovacao' : 
                filter === 'aprovadas' ? 'aprovado_para_retirada' : 
                filter === 'concluidas' ? 'retirada_concluida' : 
                'recusada';
            const url = statusParam ? `/solicitacoes?status=${statusParam}` : '/solicitacoes';

            const response = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSolicitacoes(response.data);
            setFilteredSolicitacoes(response.data);
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
        if (!confirm('Tem certeza que deseja aprovar esta solicitação para retirada? A retirada será registrada e o estoque será atualizado.')) {
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

            toast.success('Solicitação aprovada para retirada com sucesso!');
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

    const filterSolicitacoes = () => {
        let filtered = [...solicitacoes];
        
        if (activeSearchTerm.trim() !== '') {
            const searchLower = activeSearchTerm.toLowerCase().trim();
            filtered = filtered.filter(solicitacao => {
                switch (activeSearchOption) {
                    case 'paciente':
                        return solicitacao.paciente.nome.toLowerCase().includes(searchLower);
                    case 'cpf':
                        return solicitacao.paciente.cpf.replace(/\D/g, '').includes(searchLower.replace(/\D/g, ''));
                    case 'medicamento':
                        return solicitacao.lotes.medicamento.descricao.toLowerCase().includes(searchLower);
                    case 'lote':
                        return solicitacao.lotes.numero.toLowerCase().includes(searchLower);
                    case 'status':
                        return getStatusLabel(solicitacao.status).toLowerCase().includes(searchLower);
                    case 'data':
                        return formatDate(solicitacao.created).toLowerCase().includes(searchLower);
                    default:
                        return true;
                }
            });
        }
        
        setFilteredSolicitacoes(filtered);
    };

    const handleSearch = () => {
        setActiveSearchTerm(searchTerm);
        setActiveSearchOption(searchOption);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setActiveSearchTerm('');
        setActiveSearchOption('paciente');
        setSearchOption('paciente');
    };

    const handleGeneratePDF = () => {
        try {
            const doc = new jsPDF('landscape', 'mm', 'a4');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 10;
            const startY = 20;
            let y = startY;

            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('Lista de Solicitações', pageWidth / 2, y, { align: 'center' });
            y += 10;

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            const dataGeracao = new Date().toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            doc.text(`Gerado em: ${dataGeracao}`, pageWidth / 2, y, { align: 'center' });
            y += 5;

            if (filter !== 'todas') {
                doc.setFontSize(10);
                const filterLabel = {
                    'pendentes': 'Pendentes de Aprovação',
                    'aprovadas': 'Aprovadas para Retirada',
                    'concluidas': 'Retiradas Concluídas',
                    'recusadas': 'Recusadas'
                }[filter] || filter;
                doc.text(`Filtro: ${filterLabel}`, margin, y);
                y += 5;
            }

            if (activeSearchTerm) {
                doc.setFontSize(10);
                const campoBusca = {
                    'paciente': 'Paciente',
                    'cpf': 'CPF',
                    'medicamento': 'Medicamento',
                    'lote': 'Número do Lote',
                    'status': 'Status',
                    'data': 'Data'
                }[activeSearchOption] || 'Campo';
                doc.text(`Busca: ${campoBusca} - "${activeSearchTerm}"`, margin, y);
                y += 5;
            }
            y += 5;

            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            const colWidths = [30, 40, 35, 30, 25, 30, 25, 25];
            const headers = ['Paciente', 'CPF', 'Medicamento', 'Lote', 'Qtde', 'Status', 'Data', 'Estoque'];
            let x = margin;

            headers.forEach((header, index) => {
                doc.text(header, x, y);
                x += colWidths[index];
            });
            y += 7;

            doc.setLineWidth(0.5);
            doc.line(margin, y - 2, pageWidth - margin, y - 2);
            y += 2;

            doc.setFontSize(7);
            doc.setFont('helvetica', 'normal');
            
            filteredSolicitacoes.forEach((solicitacao) => {
                if (y > pageHeight - 20) {
                    doc.addPage();
                    y = startY;
                    
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'bold');
                    x = margin;
                    headers.forEach((header, idx) => {
                        doc.text(header, x, y);
                        x += colWidths[idx];
                    });
                    y += 7;
                    doc.line(margin, y - 2, pageWidth - margin, y - 2);
                    y += 2;
                    doc.setFontSize(7);
                    doc.setFont('helvetica', 'normal');
                }

                x = margin;
                const rowData = [
                    solicitacao.paciente.nome || '',
                    solicitacao.paciente.cpf || '',
                    solicitacao.lotes.medicamento.descricao || '',
                    solicitacao.lotes.numero || '',
                    solicitacao.qtde.toString() || '',
                    getStatusLabel(solicitacao.status) || '',
                    formatDateOnly(solicitacao.created) || '',
                    solicitacao.lotes.qtde.toString() || ''
                ];

                rowData.forEach((data, idx) => {
                    const text = doc.splitTextToSize(data || '', colWidths[idx] - 2);
                    doc.text(text, x + 1, y);
                    x += colWidths[idx];
                });
                y += 8;
            });

            const totalPages = doc.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setFont('helvetica', 'normal');
                doc.text(
                    `Página ${i} de ${totalPages} - Total de solicitações: ${filteredSolicitacoes.length}`,
                    pageWidth / 2,
                    pageHeight - 5,
                    { align: 'center' }
                );
            }

            const fileName = `solicitacoes_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);
            
            toast.success('PDF gerado com sucesso!');
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            toast.error('Erro ao gerar PDF');
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pendente_de_aprovacao':
                return <FaClock className={styles.statusIconPendente} size={20} />;
            case 'aprovado_para_retirada':
                return <FaCheckCircle className={styles.statusIconConfirmada} size={20} />;
            case 'retirada_concluida':
                return <FaCheckCircle className={styles.statusIconConcluida} size={20} />;
            case 'recusada':
                return <FaTimesCircle className={styles.statusIconRecusada} size={20} />;
            default:
                return null;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pendente_de_aprovacao':
                return 'Pendente de Aprovação';
            case 'aprovado_para_retirada':
                return 'Aprovado para Retirada';
            case 'retirada_concluida':
                return 'Retirada Concluída';
            case 'recusada':
                return 'Recusada';
            default:
                return status;
        }
    };

    const getImageUrl = (path: string): string => {
        if (path.startsWith('http')) return path;
        return `http://localhost:3333${path}`;
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
                            <div className={styles.headerActions}>
                                <div className={styles.filterButtons}>
                                    <button
                                        className={`${styles.filterBtn} ${filter === 'todas' ? styles.filterBtnActive : ''}`}
                                        onClick={() => setFilter('todas')}
                                    >
                                        Todas
                                    </button>
                                    <button
                                        className={`${styles.filterBtn} ${filter === 'pendentes' ? styles.filterBtnActive : ''}`}
                                        onClick={() => setFilter('pendentes')}
                                    >
                                        Pendentes
                                    </button>
                                    <button
                                        className={`${styles.filterBtn} ${filter === 'aprovadas' ? styles.filterBtnActive : ''}`}
                                        onClick={() => setFilter('aprovadas')}
                                    >
                                        Aprovadas
                                    </button>
                                    <button
                                        className={`${styles.filterBtn} ${filter === 'concluidas' ? styles.filterBtnActive : ''}`}
                                        onClick={() => setFilter('concluidas')}
                                    >
                                        Concluídas
                                    </button>
                                    <button
                                        className={`${styles.filterBtn} ${filter === 'recusadas' ? styles.filterBtnActive : ''}`}
                                        onClick={() => setFilter('recusadas')}
                                    >
                                        Recusadas
                                    </button>
                                </div>
                                {filteredSolicitacoes.length > 0 && (
                                    <button
                                        onClick={handleGeneratePDF}
                                        className={styles.btnPDF}
                                        title="Gerar PDF das solicitações listadas"
                                    >
                                        <FaFilePdf size={20} />
                                        Gerar PDF
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Campo de Busca */}
                        <div className={styles.searchContainer}>
                            <div className={styles.searchPanel}>
                                <div className={styles.searchHeader}>
                                    <b>Buscar por:</b>
                                    <div className={styles.searchOptions}>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="paciente"
                                                checked={searchOption === 'paciente'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Paciente</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="cpf"
                                                checked={searchOption === 'cpf'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>CPF</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="medicamento"
                                                checked={searchOption === 'medicamento'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Medicamento</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="lote"
                                                checked={searchOption === 'lote'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Número do Lote</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="status"
                                                checked={searchOption === 'status'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Status</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="data"
                                                checked={searchOption === 'data'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Data</span>
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.searchBody}>
                                    <div className={styles.searchBox}>
                                        <FaSearch size={20} className={styles.searchIcon} />
                                        <input
                                            type="text"
                                            placeholder="Digite aqui sua pesquisa"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSearch();
                                                }
                                            }}
                                            className={styles.searchInput}
                                        />
                                        {searchTerm && (
                                            <button
                                                onClick={handleClearSearch}
                                                className={styles.clearButton}
                                                title="Limpar busca"
                                            >
                                                <FaTimes size={18} />
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        className={styles.searchButton}
                                        title="Buscar"
                                    >
                                        <FaSearch size={20} />
                                        Buscar
                                    </button>
                                    {activeSearchTerm && (
                                        <div className={styles.searchResults}>
                                            {filteredSolicitacoes.length > 0 ? (
                                                <span>{filteredSolicitacoes.length} resultado(s) encontrado(s)</span>
                                            ) : (
                                                <span>Nenhum resultado encontrado</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando solicitações...</p>
                            </div>
                        ) : filteredSolicitacoes.length === 0 ? (
                            <div className={styles.emptyContainer}>
                                <p>Nenhuma solicitação encontrada.</p>
                            </div>
                        ) : (
                            <div className={styles.solicitacoesList}>
                                {filteredSolicitacoes.map((solicitacao) => (
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

                                            {solicitacao.foto_receita && (
                                                <div className={styles.section}>
                                                    <h3>Foto da Receita Médica</h3>
                                                    <button
                                                        onClick={() => {
                                                            if (solicitacao.foto_receita) {
                                                                setFotoSelecionada(getImageUrl(solicitacao.foto_receita));
                                                                setModalFotoAberta(true);
                                                            }
                                                        }}
                                                        className={styles.btnVerFoto}
                                                        title="Visualizar foto da receita"
                                                    >
                                                        <FaFileMedical size={16} />
                                                        Ver Foto da Receita
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {solicitacao.status === 'pendente_de_aprovacao' && (
                                            <div className={styles.solicitacaoFooter}>
                                                {podeConfirmar && (
                                                    <button
                                                        onClick={() => handleConfirmar(solicitacao.id)}
                                                        className={styles.btnConfirmar}
                                                    >
                                                        <FaCheckCircle size={16} />
                                                        Aprovar para Retirada
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

            {/* Modal de Visualização da Foto */}
            {modalFotoAberta && fotoSelecionada && (
                <div 
                    className={styles.modalOverlay}
                    onClick={() => {
                        setModalFotoAberta(false);
                        setFotoSelecionada(null);
                    }}
                >
                    <div 
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.modalHeader}>
                            <h2>Foto da Receita Médica</h2>
                            <button
                                onClick={() => {
                                    setModalFotoAberta(false);
                                    setFotoSelecionada(null);
                                }}
                                className={styles.modalCloseButton}
                                title="Fechar"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <img 
                                src={fotoSelecionada} 
                                alt="Foto da receita médica"
                                className={styles.modalImage}
                            />
                        </div>
                    </div>
                </div>
            )}
        </WithPermission>
    );
}
