'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../home/components/header';
import Menu from '../components/menu';
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
        <>
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" fill="currentColor" />
                                            <circle cx="18" cy="11.5" r="1" fill="currentColor" />
                                        </svg>
                                        Gerar PDF
                                    </button>
                                )}
                                <Link href="/lotes/novo" className={styles.btnNew}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14m7-7H5" />
                                    </svg>
                                    Novo Lote
                                </Link>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className={styles.searchIcon}>
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="currentColor" />
                                        </svg>
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
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-4-9h8v2H8v-2z" fill="currentColor" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        className={styles.searchButton}
                                        title="Buscar"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="currentColor" />
                                        </svg>
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
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                    </svg>
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
                                                <Link href={`/lotes/${lote.id}`} className={styles.btnView} title="Ver detalhes">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                </Link>
                                                <Link href={`/lotes/${lote.id}/editar`} className={styles.btnEdit} title="Editar">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                </Link>
                                                {vencimentoStatus.status === 'vencido' ? (
                                                    <button
                                                        className={`${styles.btnDoar} ${styles.btnDisabled}`}
                                                        disabled
                                                        title="Não é possível doar medicamento vencido"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                            <circle cx="8.5" cy="7" r="4" />
                                                            <path d="M20 8v6M23 11l-3-3-3 3" />
                                                        </svg>
                                                        Doar
                                                    </button>
                                                ) : (
                                                    <Link 
                                                        href={`/retiradas/novo?lote=${lote.id}`}
                                                        className={styles.btnDoar}
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                            <circle cx="8.5" cy="7" r="4" />
                                                            <path d="M20 8v6M23 11l-3-3-3 3" />
                                                        </svg>
                                                        Doar
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(lote.id, lote.numero)}
                                                    className={styles.btnDelete}
                                                    title="Excluir"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

