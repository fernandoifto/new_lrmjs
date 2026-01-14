'use client';
import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaCalendarAlt, FaFilePdf, FaPlus, FaSearch, FaTimes, FaCheckCircle, FaEye, FaEdit, FaTrash, FaUserCircle } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';
import jsPDF from 'jspdf';

interface Agendamento {
    id: number;
    nome: string;
    endereco: string;
    numero: string;
    setor: string;
    cep: string;
    telefone: string;
    datavisita: string | null;
    created: string;
    modified: string;
    turno: {
        id: number;
        descricao: string;
    };
    user: {
        id: number;
        username: string;
        email: string;
    } | null;
}

export default function AgendamentosListPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { hasPermission } = usePermissions();
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [filteredAgendamentos, setFilteredAgendamentos] = useState<Agendamento[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('nome');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [activeSearchOption, setActiveSearchOption] = useState('nome');

    const filtro = searchParams.get('filtro') || 'todos';

    useEffect(() => {
        setMounted(true);
        loadAgendamentos();
    }, []);

    useEffect(() => {
        filterAgendamentos();
    }, [agendamentos, filtro, activeSearchTerm, activeSearchOption]);

    const loadAgendamentos = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get('/agendamentos', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAgendamentos(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar agendamentos:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar agendamentos');
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

    const formatPhone = (phone: string) => {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (cleaned.length === 10) {
            return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return phone;
    };

    const formatCEP = (cep: string) => {
        const cleaned = cep.replace(/\D/g, '');
        if (cleaned.length === 8) {
            return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
        }
        return cep;
    };

    const filterAgendamentos = () => {
        let filtered = [...agendamentos];
        
        // Filtro por status (visitados/não visitados)
        if (filtro === 'visitados') {
            filtered = agendamentos.filter(ag => ag.user !== null);
        } else if (filtro === 'nao-visitados') {
            filtered = agendamentos.filter(ag => ag.user === null);
        }
        
        // Filtro por busca no campo selecionado
        if (activeSearchTerm.trim() !== '') {
            const searchLower = activeSearchTerm.toLowerCase().trim();
            filtered = filtered.filter(ag => {
                switch (activeSearchOption) {
                    case 'nome':
                        return ag.nome.toLowerCase().includes(searchLower);
                    case 'endereco':
                        return ag.endereco.toLowerCase().includes(searchLower);
                    case 'setor':
                        return ag.setor.toLowerCase().includes(searchLower);
                    case 'telefone':
                        return ag.telefone.replace(/\D/g, '').includes(searchLower.replace(/\D/g, ''));
                    case 'cep':
                        return ag.cep.replace(/\D/g, '').includes(searchLower.replace(/\D/g, ''));
                    case 'datavisita':
                        return ag.datavisita?.toLowerCase().includes(searchLower) || false;
                    case 'turno':
                        return ag.turno.descricao.toLowerCase().includes(searchLower);
                    default:
                        return true;
                }
            });
        }
        
        setFilteredAgendamentos(filtered);
    };

    const handleSearch = () => {
        setActiveSearchTerm(searchTerm);
        setActiveSearchOption(searchOption);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setActiveSearchTerm('');
        setActiveSearchOption('nome');
        setSearchOption('nome');
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
            doc.text('Lista de Agendamentos', pageWidth / 2, y, { align: 'center' });
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

            if (filtro !== 'todos') {
                doc.setFontSize(10);
                doc.text(`Filtro: ${filtro === 'visitados' ? 'Visitados' : 'Não Visitados'}`, margin, y);
                y += 5;
            }
            if (activeSearchTerm) {
                doc.setFontSize(10);
                const campoBusca = {
                    'nome': 'Nome',
                    'endereco': 'Endereço',
                    'setor': 'Setor',
                    'telefone': 'Telefone/WhatsApp',
                    'cep': 'CEP',
                    'datavisita': 'Melhor Data',
                    'turno': 'Turno'
                }[activeSearchOption] || 'Campo';
                doc.text(`Busca: ${campoBusca} - "${activeSearchTerm}"`, margin, y);
                y += 5;
            }
            y += 5;

            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            const colWidths = [35, 40, 20, 30, 30, 30, 20, 30];
            const headers = ['Nome', 'Endereço', 'Nº', 'Bairro/Setor', 'Telefone', 'CEP', 'Turno', 'Status'];
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
            
            filteredAgendamentos.forEach((agendamento) => {
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
                    agendamento.nome || '',
                    agendamento.endereco || '',
                    agendamento.numero || '',
                    agendamento.setor || '',
                    formatPhone(agendamento.telefone) || '',
                    formatCEP(agendamento.cep) || '',
                    agendamento.turno?.descricao || '',
                    agendamento.user ? 'Visitado' : 'Não Visitado'
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
                    `Página ${i} de ${totalPages} - Total de agendamentos: ${filteredAgendamentos.length}`,
                    pageWidth / 2,
                    pageHeight - 5,
                    { align: 'center' }
                );
            }

            const fileName = `agendamentos_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);
            
            toast.success('PDF gerado com sucesso!');
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            toast.error('Erro ao gerar PDF');
        }
    };

    const handleVisitar = async (id: number) => {
        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.patch(`/agendamento/${id}/visitar`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Agendamento marcado como visitado!');
            loadAgendamentos();
        } catch (error: any) {
            console.error('Erro ao marcar como visitado:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao marcar como visitado');
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir este agendamento? Esta ação não pode ser desfeita.')) {
            return;
        }

        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.delete(`/agendamento/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Agendamento excluído com sucesso!');
            loadAgendamentos();
        } catch (error: any) {
            console.error('Erro ao excluir agendamento:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir agendamento');
            }
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <WithPermission requiredPermission="agendamentos.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <FaCalendarAlt size={24} />
                                </div>
                                <div>
                                    <h1>Agendamentos</h1>
                                    <p>
                                        {filtro === 'visitados' 
                                            ? 'Lista de agendamentos visitados' 
                                            : filtro === 'nao-visitados'
                                            ? 'Lista de agendamentos não visitados'
                                            : 'Lista de todos os agendamentos cadastrados'}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.headerActions}>
                                <div className={styles.filterButtons}>
                                    <Link 
                                        href="/agendamentos/list?filtro=todos"
                                        className={`${styles.filterBtn} ${filtro === 'todos' ? styles.filterBtnActive : ''}`}
                                    >
                                        Todos
                                    </Link>
                                    <Link 
                                        href="/agendamentos/list?filtro=visitados"
                                        className={`${styles.filterBtn} ${filtro === 'visitados' ? styles.filterBtnActive : ''}`}
                                    >
                                        Visitados
                                    </Link>
                                    <Link 
                                        href="/agendamentos/list?filtro=nao-visitados"
                                        className={`${styles.filterBtn} ${filtro === 'nao-visitados' ? styles.filterBtnActive : ''}`}
                                    >
                                        Não Visitados
                                    </Link>
                                </div>
                                {filteredAgendamentos.length > 0 && (
                                    <button
                                        onClick={handleGeneratePDF}
                                        className={styles.btnPDF}
                                        title="Gerar PDF dos agendamentos listados"
                                    >
                                        <FaFilePdf size={20} />
                                        Gerar PDF
                                    </button>
                                )}
                                {hasPermission('agendamentos.criar') && (
                                    <Link href="/agendamentos/novo" className={styles.btnNew}>
                                        <FaPlus size={20} />
                                        Novo Agendamento
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
                                                value="nome"
                                                checked={searchOption === 'nome'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Nome</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="endereco"
                                                checked={searchOption === 'endereco'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Endereço</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="setor"
                                                checked={searchOption === 'setor'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Setor</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="telefone"
                                                checked={searchOption === 'telefone'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Fone/WhatsApp</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="cep"
                                                checked={searchOption === 'cep'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>CEP</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="datavisita"
                                                checked={searchOption === 'datavisita'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Melhor data</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="turno"
                                                checked={searchOption === 'turno'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Turno</span>
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
                                            {filteredAgendamentos.length > 0 ? (
                                                <span>{filteredAgendamentos.length} resultado(s) encontrado(s)</span>
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
                                <p>Carregando agendamentos...</p>
                            </div>
                        ) : filteredAgendamentos.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>
                                    {filtro === 'visitados' 
                                        ? 'Nenhum agendamento visitado encontrado' 
                                        : filtro === 'nao-visitados'
                                        ? 'Nenhum agendamento não visitado encontrado'
                                        : 'Nenhum agendamento encontrado'}
                                </p>
                                {filtro !== 'visitados' && hasPermission('agendamentos.criar') && (
                                    <Link href="/agendamentos/novo" className={styles.btnNew}>
                                        Criar primeiro agendamento
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className={styles.grid}>
                            {filteredAgendamentos.map((agendamento) => (
                                <div key={agendamento.id} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.cardIcon}>
                                                <FaUserCircle size={20} />
                                        </div>
                                        <h3>{agendamento.nome}</h3>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Telefone:</span>
                                            <span>{formatPhone(agendamento.telefone)}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Endereço:</span>
                                            <span>{agendamento.endereco}, {agendamento.numero}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Bairro/Setor:</span>
                                            <span>{agendamento.setor}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>CEP:</span>
                                            <span>{formatCEP(agendamento.cep)}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Turno:</span>
                                            <span>{agendamento.turno.descricao}</span>
                                        </div>
                                        {agendamento.datavisita && (
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Melhor Data:</span>
                                                <span>{agendamento.datavisita}</span>
                                            </div>
                                        )}
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Criado em:</span>
                                            <span>{formatDate(agendamento.created)}</span>
                                        </div>
                                        {agendamento.user && (
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Visitado por:</span>
                                                <span>{agendamento.user.username}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.cardFooter}>
                                        {hasPermission('agendamentos.ver') && (
                                            <Link 
                                                href={`/agendamentos/${agendamento.id}`}
                                                className={styles.btnView}
                                                title="Ver detalhes"
                                            >
                                                <FaEye size={16} />
                                            </Link>
                                        )}
                                        {hasPermission('agendamentos.editar') && (
                                            <Link 
                                                href={`/agendamentos/${agendamento.id}/editar`}
                                                className={styles.btnEdit}
                                                title="Editar"
                                            >
                                                <FaEdit size={16} />
                                            </Link>
                                        )}
                                        {hasPermission('agendamentos.excluir') && (
                                            <button
                                                onClick={() => handleDelete(agendamento.id)}
                                                className={styles.btnDelete}
                                                title="Excluir"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        )}
                                        {!agendamento.user && hasPermission('agendamentos.visitar') && (
                                            <button
                                                onClick={() => handleVisitar(agendamento.id)}
                                                className={styles.btnVisitar}
                                                title="Marcar como visitado"
                                            >
                                                <FaCheckCircle size={18} />
                                                Visitar
                                            </button>
                                        )}
                                        {agendamento.user && (
                                            <span className={styles.visitadoBadge}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
                                                </svg>
                                                Visitado
                                            </span>
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

