'use client';
import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
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
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 8H4v8h16v-8zm-5-6H9v2H7V5H4v4h16V5h-3v2h-2V5zm-9 8h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z" fill="currentColor" />
                                    </svg>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" fill="currentColor" />
                                            <circle cx="18" cy="11.5" r="1" fill="currentColor" />
                                        </svg>
                                        Gerar PDF
                                    </button>
                                )}
                                <Link href="/agendamentos/novo" className={styles.btnNew}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" fill="currentColor" />
                                    </svg>
                                    Novo Agendamento
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
                                {filtro !== 'visitados' && (
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
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
                                            </svg>
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
                                        <Link 
                                            href={`/agendamentos/${agendamento.id}`}
                                            className={styles.btnView}
                                        >
                                            Ver Detalhes
                                        </Link>
                                        <Link 
                                            href={`/agendamentos/${agendamento.id}/editar`}
                                            className={styles.btnEdit}
                                        >
                                            Editar
                                        </Link>
                                        {!agendamento.user && (
                                            <button
                                                onClick={() => handleVisitar(agendamento.id)}
                                                className={styles.btnVisitar}
                                                title="Marcar como visitado"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
                                                </svg>
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
        </>
    );
}

