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
import { FaHandHoldingHeart, FaFilePdf, FaPlus, FaSearch, FaTimes, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';
import jsPDF from 'jspdf';

interface Retirada {
    id: number;
    qtde: number;
    created: string;
    lotes: {
        id: number;
        numero: string;
        medicamento: {
            descricao: string;
        };
        formaFarmaceutica: {
            descricao: string;
        };
    };
    paciente: {
        id: number;
        nome: string;
        cpf: string;
    };
    user: {
        username: string;
    };
}

export default function RetiradasPage() {
    const router = useRouter();
    const { hasPermission } = usePermissions();
    const [retiradas, setRetiradas] = useState<Retirada[]>([]);
    const [filteredRetiradas, setFilteredRetiradas] = useState<Retirada[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('paciente');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [activeSearchOption, setActiveSearchOption] = useState('paciente');

    useEffect(() => {
        setMounted(true);
        loadRetiradas();
    }, []);

    useEffect(() => {
        filterRetiradas();
    }, [retiradas, activeSearchTerm, activeSearchOption]);

    const loadRetiradas = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get('/retiradas', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setRetiradas(response.data);
            setFilteredRetiradas(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar retiradas:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar retiradas');
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

    const formatCPF = (cpf: string) => {
        const cleaned = cpf.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
        return cpf;
    };

    const filterRetiradas = () => {
        let filtered = [...retiradas];
        
        if (activeSearchTerm.trim() !== '') {
            const searchLower = activeSearchTerm.toLowerCase().trim();
            filtered = filtered.filter(retirada => {
                switch (activeSearchOption) {
                    case 'paciente':
                        return retirada.paciente.nome.toLowerCase().includes(searchLower);
                    case 'cpf':
                        return retirada.paciente.cpf.replace(/\D/g, '').includes(searchLower.replace(/\D/g, ''));
                    case 'medicamento':
                        return retirada.lotes.medicamento.descricao.toLowerCase().includes(searchLower);
                    case 'lote':
                        return retirada.lotes.numero.toLowerCase().includes(searchLower);
                    case 'usuario':
                        return retirada.user.username.toLowerCase().includes(searchLower);
                    default:
                        return true;
                }
            });
        }
        
        setFilteredRetiradas(filtered);
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
            doc.text('Lista de Doações e Retiradas', pageWidth / 2, y, { align: 'center' });
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
                    'paciente': 'Paciente',
                    'cpf': 'CPF',
                    'medicamento': 'Medicamento',
                    'lote': 'Lote',
                    'usuario': 'Usuário'
                }[activeSearchOption] || 'Campo';
                doc.text(`Busca: ${campoBusca} - "${activeSearchTerm}"`, margin, y);
                y += 5;
            }
            y += 5;

            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            const colWidths = [30, 50, 30, 30, 25, 30, 25];
            const headers = ['Data', 'Paciente', 'CPF', 'Medicamento', 'Lote', 'Quantidade', 'Usuário'];
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
            
            filteredRetiradas.forEach((retirada) => {
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

                x = margin;
                const rowData = [
                    formatDate(retirada.created || ''),
                    retirada.paciente.nome || '',
                    formatCPF(retirada.paciente.cpf) || '',
                    retirada.lotes.medicamento.descricao || '',
                    retirada.lotes.numero || '',
                    retirada.qtde.toString() || '',
                    retirada.user.username || ''
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
                    `Página ${i} de ${totalPages} - Total de retiradas: ${filteredRetiradas.length}`,
                    pageWidth / 2,
                    pageHeight - 5,
                    { align: 'center' }
                );
            }

            const fileName = `retiradas_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);
            
            toast.success('PDF gerado com sucesso!');
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            toast.error('Erro ao gerar PDF');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir esta retirada? O estoque será revertido.')) {
            return;
        }

        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.delete(`/retirada/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Retirada excluída com sucesso e estoque revertido!');
            loadRetiradas();
        } catch (error: any) {
            console.error('Erro ao excluir retirada:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir retirada');
            }
        }
    };

    if (!mounted) {
        return null;
    }

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
                                    <h1>Doações e Retiradas</h1>
                                    <p>Gerencie as doações e retiradas de medicamentos</p>
                                </div>
                            </div>
                            <div className={styles.headerActions}>
                                {filteredRetiradas.length > 0 && (
                                    <button
                                        onClick={handleGeneratePDF}
                                        className={styles.btnPDF}
                                        title="Gerar PDF das retiradas listadas"
                                    >
                                        <FaFilePdf size={20} />
                                        Gerar PDF
                                    </button>
                                )}
                                {hasPermission('retiradas.criar') && (
                                    <Link href="/retiradas/novo" className={styles.btnNew}>
                                        <FaPlus size={20} />
                                        Nova Retirada
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
                                            <span>Lote</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="usuario"
                                                checked={searchOption === 'usuario'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Usuário</span>
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
                                            {filteredRetiradas.length > 0 ? (
                                                <span>{filteredRetiradas.length} resultado(s) encontrado(s)</span>
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
                                <p>Carregando retiradas...</p>
                            </div>
                        ) : filteredRetiradas.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>
                                    {activeSearchTerm 
                                        ? 'Nenhuma retirada encontrada com os critérios de busca' 
                                        : 'Nenhuma retirada registrada'}
                                </p>
                                {!activeSearchTerm && hasPermission('retiradas.criar') && (
                                    <Link href="/retiradas/novo" className={styles.btnNew}>
                                        Registrar Primeira Retirada
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className={styles.grid}>
                                {filteredRetiradas.map((retirada) => (
                                    <div key={retirada.id} className={styles.card}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.cardIcon}>
                                                <FaHandHoldingHeart size={20} />
                                            </div>
                                            <h3>Retirada #{retirada.id}</h3>
                                        </div>
                                        <div className={styles.cardBody}>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Paciente:</span>
                                                <span>{retirada.paciente.nome}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>CPF:</span>
                                                <span>{formatCPF(retirada.paciente.cpf)}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Medicamento:</span>
                                                <span>{retirada.lotes.medicamento.descricao}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Forma Farmacêutica:</span>
                                                <span>{retirada.lotes.formaFarmaceutica.descricao}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Lote:</span>
                                                <span>{retirada.lotes.numero}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Quantidade:</span>
                                                <span>{retirada.qtde}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Data:</span>
                                                <span>{formatDate(retirada.created || '')}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Registrado por:</span>
                                                <span>{retirada.user.username}</span>
                                            </div>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            {hasPermission('retiradas.ver') && (
                                                <Link href={`/retiradas/${retirada.id}`} className={styles.btnView} title="Ver detalhes">
                                                    <FaEye size={16} />
                                                </Link>
                                            )}
                                            {hasPermission('retiradas.editar') && (
                                                <Link href={`/retiradas/${retirada.id}/editar`} className={styles.btnEdit} title="Editar">
                                                    <FaEdit size={16} />
                                                </Link>
                                            )}
                                            {hasPermission('retiradas.excluir') && (
                                                <button
                                                    onClick={() => handleDelete(retirada.id)}
                                                    className={styles.btnDelete}
                                                    title="Excluir"
                                                >
                                                    <FaTrash size={16} />
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

