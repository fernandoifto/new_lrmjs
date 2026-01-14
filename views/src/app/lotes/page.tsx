'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaBoxes, FaFilePdf, FaPlus, FaSearch, FaTimes, FaEye, FaEdit, FaTrash, FaHandHoldingHeart } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';
import jsPDF from 'jspdf';

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

export default function LotesPage() {
    const router = useRouter();
    const { hasPermission } = usePermissions();
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [filteredLotes, setFilteredLotes] = useState<Lote[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('numero');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [activeSearchOption, setActiveSearchOption] = useState('numero');

    useEffect(() => {
        setMounted(true);
        loadLotes();
    }, []);

    useEffect(() => {
        filterLotes();
    }, [lotes, activeSearchTerm, activeSearchOption]);

    const loadLotes = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get('/lotes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setLotes(response.data);
            setFilteredLotes(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar lotes:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar lotes');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, numero: string) => {
        if (!confirm(`Tem certeza que deseja excluir o lote "${numero}"?`)) {
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
            loadLotes();
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getVencimentoStatus = (dateString: string) => {
        const vencimento = new Date(dateString);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        vencimento.setHours(0, 0, 0, 0);
        
        const diffTime = vencimento.getTime() - hoje.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            return { status: 'vencido', days: diffDays, className: styles.expired };
        } else if (diffDays <= 90) {
            return { status: 'proximo', days: diffDays, className: styles.warning };
        } else {
            return { status: 'ok', days: diffDays, className: styles.safe };
        }
    };

    const filterLotes = () => {
        let filtered = [...lotes];
        
        if (activeSearchTerm.trim() !== '') {
            const searchLower = activeSearchTerm.toLowerCase().trim();
            filtered = filtered.filter(lote => {
                switch (activeSearchOption) {
                    case 'numero':
                        return lote.numero.toLowerCase().includes(searchLower);
                    case 'medicamento':
                        return lote.medicamento.descricao.toLowerCase().includes(searchLower);
                    case 'principioativo':
                        return lote.medicamento.principioativo.toLowerCase().includes(searchLower);
                    case 'formafarmaceutica':
                        return lote.formaFarmaceutica.descricao.toLowerCase().includes(searchLower);
                    case 'tipomedicamento':
                        return lote.tipoMedicamento.descricao.toLowerCase().includes(searchLower);
                    case 'quantidade':
                        return lote.qtde.toString().includes(searchLower);
                    case 'datafabricacao':
                        return formatDate(lote.datafabricacao).toLowerCase().includes(searchLower);
                    case 'datavencimento':
                        return formatDate(lote.datavencimento).toLowerCase().includes(searchLower);
                    default:
                        return true;
                }
            });
        }
        
        setFilteredLotes(filtered);
    };

    const handleSearch = () => {
        setActiveSearchTerm(searchTerm);
        setActiveSearchOption(searchOption);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setActiveSearchTerm('');
        setActiveSearchOption('numero');
        setSearchOption('numero');
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
            doc.text('Lista de Lotes', pageWidth / 2, y, { align: 'center' });
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
            y += 10;

            if (activeSearchTerm) {
                doc.setFontSize(10);
                const campoBusca = {
                    'numero': 'Número',
                    'medicamento': 'Medicamento',
                    'principioativo': 'Princípio Ativo',
                    'formafarmaceutica': 'Forma Farmacêutica',
                    'tipomedicamento': 'Tipo de Medicamento',
                    'quantidade': 'Quantidade',
                    'datafabricacao': 'Data de Fabricação',
                    'datavencimento': 'Data de Vencimento'
                }[activeSearchOption] || 'Campo';
                doc.text(`Busca: ${campoBusca} - "${activeSearchTerm}"`, margin, y);
                y += 5;
            }
            y += 5;

            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            const colWidths = [25, 50, 35, 30, 25, 25, 25, 25];
            const headers = ['Número', 'Medicamento', 'Forma Farm.', 'Tipo', 'Qtde', 'Fab.', 'Venc.', 'Status'];
            let x = margin;

            headers.forEach((header, index) => {
                doc.text(header, x, y);
                x += colWidths[index];
            });
            y += 7;

            doc.setLineWidth(0.5);
            doc.line(margin, y - 2, pageWidth - margin, y - 2);
            y += 2;

            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            
            filteredLotes.forEach((lote) => {
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
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'normal');
                }

                const vencimentoStatus = getVencimentoStatus(lote.datavencimento);
                const statusText = vencimentoStatus.status === 'vencido' 
                    ? 'Vencido' 
                    : vencimentoStatus.status === 'proximo' 
                    ? `${vencimentoStatus.days}d` 
                    : 'OK';

                x = margin;
                const rowData = [
                    lote.numero || '',
                    lote.medicamento.descricao || '',
                    lote.formaFarmaceutica.descricao || '',
                    lote.tipoMedicamento.descricao || '',
                    lote.qtde.toString() || '',
                    formatDate(lote.datafabricacao) || '',
                    formatDate(lote.datavencimento) || '',
                    statusText
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
                    `Página ${i} de ${totalPages} - Total de lotes: ${filteredLotes.length}`,
                    pageWidth / 2,
                    pageHeight - 5,
                    { align: 'center' }
                );
            }

            const fileName = `lotes_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);
            
            toast.success('PDF gerado com sucesso!');
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            toast.error('Erro ao gerar PDF');
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
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <FaBoxes size={24} />
                                </div>
                                <div>
                                    <h1>Lotes</h1>
                                    <p>Gerencie os lotes de medicamentos do sistema</p>
                                </div>
                            </div>
                            <div className={styles.headerActions}>
                                {filteredLotes.length > 0 && (
                                    <button
                                        onClick={handleGeneratePDF}
                                        className={styles.btnPDF}
                                        title="Gerar PDF dos lotes listados"
                                    >
                                        <FaFilePdf size={20} />
                                        Gerar PDF
                                    </button>
                                )}
                                {hasPermission('lotes.criar') && (
                                    <Link href="/lotes/novo" className={styles.btnNew}>
                                        <FaPlus size={20} />
                                        Novo Lote
                                    </Link>
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
                                                value="numero"
                                                checked={searchOption === 'numero'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Número</span>
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
                                                value="principioativo"
                                                checked={searchOption === 'principioativo'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Princípio Ativo</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="formafarmaceutica"
                                                checked={searchOption === 'formafarmaceutica'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Forma Farmacêutica</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="tipomedicamento"
                                                checked={searchOption === 'tipomedicamento'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Tipo de Medicamento</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="quantidade"
                                                checked={searchOption === 'quantidade'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Quantidade</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="datafabricacao"
                                                checked={searchOption === 'datafabricacao'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Data Fabricação</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="datavencimento"
                                                checked={searchOption === 'datavencimento'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Data Vencimento</span>
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
                                            {filteredLotes.length > 0 ? (
                                                <span>{filteredLotes.length} resultado(s) encontrado(s)</span>
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
                                <p>Carregando...</p>
                            </div>
                        ) : filteredLotes.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>
                                    {activeSearchTerm 
                                        ? 'Nenhum lote encontrado com os critérios de busca' 
                                        : 'Nenhum lote cadastrado'}
                                </p>
                                {!activeSearchTerm && (
                                    <Link href="/lotes/novo" className={styles.btnNew}>
                                        Cadastrar Primeiro Lote
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className={styles.grid}>
                                {filteredLotes.map((lote) => {
                                    const vencimentoStatus = getVencimentoStatus(lote.datavencimento);
                                    return (
                                        <div key={lote.id} className={styles.card}>
                                            <div className={styles.cardHeader}>
                                                <div className={styles.cardIcon}>
                                                    <FaBoxes size={20} />
                                                </div>
                                                <h3>Lote {lote.numero}</h3>
                                            </div>
                                            <div className={styles.cardBody}>
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Medicamento:</span>
                                                    <span>{lote.medicamento.descricao}</span>
                                                </div>
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Forma Farmacêutica:</span>
                                                    <span>{lote.formaFarmaceutica.descricao}</span>
                                                </div>
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Tipo:</span>
                                                    <span>{lote.tipoMedicamento.descricao}</span>
                                                </div>
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Quantidade:</span>
                                                    <span>{lote.qtde}</span>
                                                </div>
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Fabricação:</span>
                                                    <span>{formatDate(lote.datafabricacao)}</span>
                                                </div>
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Vencimento:</span>
                                                    <span className={vencimentoStatus.className}>
                                                        {formatDate(lote.datavencimento)}
                                                        {vencimentoStatus.status === 'vencido' && ' (Vencido)'}
                                                        {vencimentoStatus.status === 'proximo' && ` (${vencimentoStatus.days} dias)`}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={styles.cardFooter}>
                                                {hasPermission('lotes.ver') && (
                                                    <Link href={`/lotes/${lote.id}`} className={styles.btnView} title="Ver detalhes">
                                                        <FaEye size={16} />
                                                    </Link>
                                                )}
                                                {hasPermission('lotes.editar') && (
                                                    <Link href={`/lotes/${lote.id}/editar`} className={styles.btnEdit} title="Editar">
                                                        <FaEdit size={16} />
                                                    </Link>
                                                )}
                                                {vencimentoStatus.status === 'vencido' ? (
                                                    hasPermission('retiradas.criar') && (
                                                        <button
                                                            className={`${styles.btnDoar} ${styles.btnDisabled}`}
                                                            disabled
                                                            title="Não é possível doar medicamento vencido"
                                                        >
                                                            <FaHandHoldingHeart size={16} />
                                                            Doar
                                                        </button>
                                                    )
                                                ) : (
                                                    hasPermission('retiradas.criar') && (
                                                        <Link 
                                                            href={`/retiradas/novo?lote=${lote.id}`}
                                                            className={styles.btnDoar}
                                                            title="Doar medicamento"
                                                        >
                                                            <FaHandHoldingHeart size={16} />
                                                            Doar
                                                        </Link>
                                                    )
                                                )}
                                                {hasPermission('lotes.excluir') && (
                                                    <button
                                                        onClick={() => handleDelete(lote.id, lote.numero)}
                                                        className={styles.btnDelete}
                                                        title="Excluir"
                                                    >
                                                        <FaTrash size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}

