'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { api } from '@/api/api';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import {
    FaHandHoldingHeart,
    FaEye,
    FaFilePdf,
    FaFileMedical,
    FaCheck,
    FaCheckCircle,
    FaTimes,
    FaTimesCircle,
} from 'react-icons/fa';
import Link from 'next/link';
import jsPDF from 'jspdf';
import type { PaginationMeta } from '@/lib/pagedApi';
import {
    ListPageHeader,
    ListSearchToolbar,
    ListFooter,
    useDebouncedValue,
    listStyles as styles,
} from '@/components/list';
import modalStyles from './SolicitacoesList.module.css';

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

type FilterKey = 'todas' | 'pendentes' | 'aprovadas' | 'concluidas' | 'recusadas';

const FILTERS: { key: FilterKey; label: string; status?: string }[] = [
    { key: 'todas', label: 'Todas' },
    { key: 'pendentes', label: 'Pendentes', status: 'pendente_de_aprovacao' },
    { key: 'aprovadas', label: 'Aprovadas', status: 'aprovado_para_retirada' },
    { key: 'concluidas', label: 'Concluídas', status: 'retirada_concluida' },
    { key: 'recusadas', label: 'Recusadas', status: 'recusada' },
];

const FILTER_PDF_LABEL: Record<Exclude<FilterKey, 'todas'>, string> = {
    pendentes: 'Pendentes de Aprovação',
    aprovadas: 'Aprovadas para Retirada',
    concluidas: 'Retiradas Concluídas',
    recusadas: 'Recusadas',
};

const SORT_OPTIONS = [
    { value: 'created', label: 'Data de criação' },
    { value: 'status', label: 'Status' },
    { value: 'qtde', label: 'Quantidade' },
];

function statusParamFromFilter(filter: FilterKey): string | undefined {
    return FILTERS.find((f) => f.key === filter)?.status;
}

function getStatusLabel(status: string) {
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
}

function getStatusBadgeClass(status: string) {
    switch (status) {
        case 'pendente_de_aprovacao':
            return styles.badgeWarning;
        case 'aprovado_para_retirada':
            return styles.badgeInfo;
        case 'retirada_concluida':
            return styles.badgeSuccess;
        case 'recusada':
            return styles.badgeDanger;
        default:
            return styles.badgeNeutral;
    }
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function formatDateOnly(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR');
}

function getImageUrl(path: string): string {
    if (path.startsWith('http')) return path;
    return `http://localhost:3333${path}`;
}

export default function SolicitacoesPage() {
    const router = useRouter();
    const { hasPermission, isAdmin } = usePermissions();
    const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [pagination, setPagination] = useState<PaginationMeta | null>(null);
    const [filter, setFilter] = useState<FilterKey>('pendentes');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('created');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const activeSearchTerm = useDebouncedValue(searchTerm);
    const [modalFotoAberta, setModalFotoAberta] = useState(false);
    const [fotoSelecionada, setFotoSelecionada] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setPage(1);
    }, [filter, activeSearchTerm, sortBy, sortOrder, pageSize]);

    useEffect(() => {
        if (!mounted) return;
        loadSolicitacoes();
    }, [mounted, filter, page, activeSearchTerm, sortBy, sortOrder, pageSize]);

    const loadSolicitacoes = async () => {
        try {
            setLoading(true);
            const statusParam = statusParamFromFilter(filter);
            const response = await api.get('/solicitacoes', {
                params: {
                    page,
                    pageSize,
                    sortBy,
                    sortOrder,
                    ...(statusParam ? { status: statusParam } : {}),
                    ...(activeSearchTerm.trim() ? { search: activeSearchTerm.trim() } : {}),
                },
            });
            setSolicitacoes(response.data.data);
            setPagination(response.data.pagination);
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
        if (
            !confirm(
                'Tem certeza que deseja aprovar esta solicitação para retirada? O solicitante será informado que pode retirar o medicamento.'
            )
        ) {
            return;
        }

        try {
            await api.post(`/solicitacao/${id}/confirmar`, {}, {});
            toast.success('Solicitação aprovada para retirada! O solicitante pode retirar o medicamento.');
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

    const handleConcluirDoacao = async (id: number) => {
        if (
            !confirm(
                'Tem certeza que deseja concluir a doação? A retirada será registrada e o estoque será atualizado.'
            )
        ) {
            return;
        }

        try {
            const userResponse = await api.get('/detail', {});
            await api.post(`/solicitacao/${id}/concluir?userId=${userResponse.data.id}`, {}, {});
            toast.success('Doação concluída com sucesso! Retirada registrada e estoque atualizado.');
            loadSolicitacoes();
        } catch (error: any) {
            console.error('Erro ao concluir doação:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao concluir doação');
            }
        }
    };

    const handleRecusar = async (id: number) => {
        if (!confirm('Tem certeza que deseja recusar esta solicitação?')) {
            return;
        }

        try {
            await api.post(`/solicitacao/${id}/recusar`, {}, {});
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

    const handleGeneratePDF = async () => {
        try {
            const statusParam = statusParamFromFilter(filter);
            const pdfRes = await api.get('/solicitacoes', {
                params: {
                    page: 1,
                    pageSize: 200,
                    sortBy,
                    sortOrder,
                    ...(statusParam ? { status: statusParam } : {}),
                    ...(activeSearchTerm.trim() ? { search: activeSearchTerm.trim() } : {}),
                },
            });
            const rows = pdfRes.data.data as Solicitacao[];

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
                minute: '2-digit',
            });
            doc.text(`Gerado em: ${dataGeracao}`, pageWidth / 2, y, { align: 'center' });
            y += 5;

            if (filter !== 'todas') {
                doc.setFontSize(10);
                doc.text(`Filtro: ${FILTER_PDF_LABEL[filter]}`, margin, y);
                y += 5;
            }

            if (activeSearchTerm.trim()) {
                doc.setFontSize(10);
                doc.text(`Busca: "${activeSearchTerm.trim()}"`, margin, y);
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

            rows.forEach((solicitacao) => {
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
                    solicitacao.lotes.qtde.toString() || '',
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
                    `Página ${i} de ${totalPages} - Total no PDF: ${rows.length}`,
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

    const openFoto = (path: string) => {
        setFotoSelecionada(getImageUrl(path));
        setModalFotoAberta(true);
    };

    const closeFoto = () => {
        setModalFotoAberta(false);
        setFotoSelecionada(null);
    };

    if (!mounted) return null;

    const podeConfirmar = isAdmin || hasPermission('retiradas.criar');
    const podeRecusar = isAdmin || hasPermission('retiradas.editar');

    const renderActions = (solicitacao: Solicitacao) => (
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
            {solicitacao.status === 'pendente_de_aprovacao' && podeConfirmar && (
                <button
                    type="button"
                    className={styles.btnPrimary}
                    onClick={() => handleConfirmar(solicitacao.id)}
                    title="Aprovar para retirada"
                >
                    <FaCheckCircle size={14} />
                    Aprovar
                </button>
            )}
            {solicitacao.status === 'pendente_de_aprovacao' && podeRecusar && (
                <button
                    type="button"
                    className={`${styles.btnIcon} ${styles.btnIconDelete}`}
                    onClick={() => handleRecusar(solicitacao.id)}
                    title="Recusar"
                >
                    <FaTimesCircle size={14} />
                </button>
            )}
            {solicitacao.status === 'aprovado_para_retirada' && podeConfirmar && (
                <button
                    type="button"
                    className={styles.btnPrimary}
                    onClick={() => handleConcluirDoacao(solicitacao.id)}
                    title="Concluir doação"
                >
                    <FaCheck size={14} />
                    Concluir doação
                </button>
            )}
            {solicitacao.foto_receita && (
                <button
                    type="button"
                    className={styles.btnIcon}
                    onClick={() => openFoto(solicitacao.foto_receita!)}
                    title="Ver foto da receita"
                >
                    <FaFileMedical size={14} />
                </button>
            )}
            <Link
                href={`/solicitacoes/${solicitacao.id}`}
                className={styles.btnIcon}
                title="Ver detalhes"
            >
                <FaEye size={14} />
            </Link>
        </div>
    );

    return (
        <WithPermission requiredPermission="retiradas.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <ListPageHeader
                            icon={<FaHandHoldingHeart size={24} />}
                            title="Solicitações de Doação"
                            subtitle="Gerencie as solicitações de medicamentos dos pacientes"
                            actions={
                                solicitacoes.length > 0 ? (
                                    <button
                                        type="button"
                                        onClick={handleGeneratePDF}
                                        className={styles.btnPDF}
                                        title="Gerar PDF das solicitações listadas"
                                    >
                                        <FaFilePdf size={18} />
                                        Gerar PDF
                                    </button>
                                ) : null
                            }
                        />

                        <div className={styles.kpiGrid}>
                            {FILTERS.map((f) => (
                                <button
                                    key={f.key}
                                    type="button"
                                    className={`${styles.kpiCard} ${filter === f.key ? styles.kpiActive : ''}`}
                                    onClick={() => setFilter(f.key)}
                                >
                                    <span className={styles.kpiCount} style={{ fontSize: '1.05rem' }}>
                                        {f.label}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <ListSearchToolbar
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Buscar por paciente, CPF, medicamento, lote…"
                            sortOptions={SORT_OPTIONS}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortByChange={setSortBy}
                            onSortOrderToggle={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
                        />

                        {loading ? (
                            <div className={styles.loading}>
                                <p>Carregando solicitações…</p>
                            </div>
                        ) : solicitacoes.length === 0 ? (
                            <div className={styles.empty}>
                                <p>
                                    {activeSearchTerm.trim()
                                        ? 'Nenhuma solicitação encontrada com os critérios de busca'
                                        : 'Nenhuma solicitação encontrada.'}
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className={styles.tableWrap}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>Paciente</th>
                                                <th>Medicamento</th>
                                                <th className={styles.hideMobile}>Lote</th>
                                                <th className={styles.hideTablet}>Qtde</th>
                                                <th>Status</th>
                                                <th className={styles.hideTablet}>Data</th>
                                                <th className={styles.actionsCol}>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {solicitacoes.map((solicitacao) => (
                                                <tr
                                                    key={solicitacao.id}
                                                    className={styles.row}
                                                    onClick={() =>
                                                        router.push(`/solicitacoes/${solicitacao.id}`)
                                                    }
                                                >
                                                    <td>
                                                        <strong className={styles.primaryText}>
                                                            {solicitacao.paciente.nome}
                                                        </strong>
                                                        <span className={styles.subText}>
                                                            {solicitacao.paciente.cpf}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={styles.primaryText}>
                                                            {solicitacao.lotes.medicamento.descricao}
                                                        </span>
                                                        <span className={styles.subText}>
                                                            {solicitacao.lotes.medicamento.principioativo}
                                                        </span>
                                                    </td>
                                                    <td className={styles.hideMobile}>
                                                        {solicitacao.lotes.numero}
                                                    </td>
                                                    <td className={styles.hideTablet}>{solicitacao.qtde}</td>
                                                    <td>
                                                        <span
                                                            className={`${styles.badge} ${getStatusBadgeClass(solicitacao.status)}`}
                                                        >
                                                            {getStatusLabel(solicitacao.status)}
                                                        </span>
                                                    </td>
                                                    <td className={styles.hideTablet}>
                                                        {formatDate(solicitacao.created)}
                                                    </td>
                                                    <td className={styles.actionsCol}>
                                                        {renderActions(solicitacao)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className={styles.mobileList}>
                                    {solicitacoes.map((solicitacao) => (
                                        <div
                                            key={solicitacao.id}
                                            className={`${styles.mobileCard} ${styles.mobileCardClickable}`}
                                            onClick={() =>
                                                router.push(`/solicitacoes/${solicitacao.id}`)
                                            }
                                        >
                                            <div className={styles.mobileCardHeader}>
                                                <strong>{solicitacao.paciente.nome}</strong>
                                                <span className={styles.subText}>
                                                    {solicitacao.lotes.medicamento.descricao}
                                                </span>
                                            </div>
                                            <p className={styles.mobileMeta}>
                                                Lote {solicitacao.lotes.numero} · Qtde {solicitacao.qtde}
                                            </p>
                                            <p className={styles.mobileMeta}>
                                                {formatDate(solicitacao.created)}
                                            </p>
                                            <div className={styles.mobileStatus}>
                                                <span
                                                    className={`${styles.badge} ${getStatusBadgeClass(solicitacao.status)}`}
                                                >
                                                    {getStatusLabel(solicitacao.status)}
                                                </span>
                                            </div>
                                            <div className={styles.mobileActions}>
                                                {renderActions(solicitacao)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <ListFooter
                                    pagination={pagination}
                                    pageSize={pageSize}
                                    onPageChange={setPage}
                                    onPageSizeChange={setPageSize}
                                    disabled={loading}
                                />
                            </>
                        )}
                    </div>
                </div>
            </main>

            {modalFotoAberta && fotoSelecionada && (
                <div className={modalStyles.modalOverlay} onClick={closeFoto}>
                    <div
                        className={modalStyles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={modalStyles.modalHeader}>
                            <h2>Foto da Receita Médica</h2>
                            <button
                                type="button"
                                onClick={closeFoto}
                                className={modalStyles.modalCloseButton}
                                title="Fechar"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <div className={modalStyles.modalBody}>
                            <img
                                src={fotoSelecionada}
                                alt="Foto da receita médica"
                                className={modalStyles.modalImage}
                            />
                        </div>
                    </div>
                </div>
            )}
        </WithPermission>
    );
}
