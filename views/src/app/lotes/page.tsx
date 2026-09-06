'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaBoxes, FaFilePdf, FaPlus, FaEye, FaEdit, FaTrash, FaHandHoldingHeart, FaBarcode } from 'react-icons/fa';
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

const SORT_OPTIONS = [
    { value: 'created', label: 'Data de criação' },
    { value: 'numero', label: 'Número' },
    { value: 'datavencimento', label: 'Vencimento' },
    { value: 'qtde', label: 'Quantidade' },
];

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

function getVencimentoStatus(dateString: string) {
    const vencimento = new Date(dateString);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    vencimento.setHours(0, 0, 0, 0);

    const diffTime = vencimento.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return { status: 'vencido' as const, days: diffDays, className: `${styles.badge} ${styles.badgeDanger}` };
    }
    if (diffDays <= 90) {
        return { status: 'proximo' as const, days: diffDays, className: `${styles.badge} ${styles.badgeWarning}` };
    }
    return { status: 'ok' as const, days: diffDays, className: `${styles.badge} ${styles.badgeSuccess}` };
}

export default function LotesPage() {
    const router = useRouter();
    const { hasPermission } = usePermissions();
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [pagination, setPagination] = useState<PaginationMeta | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('created');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const activeSearchTerm = useDebouncedValue(searchTerm);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setPage(1);
    }, [activeSearchTerm, sortBy, sortOrder, pageSize]);

    useEffect(() => {
        if (!mounted) return;
        loadLotes();
    }, [mounted, page, activeSearchTerm, sortBy, sortOrder, pageSize]);

    const loadLotes = async () => {
        try {
            setLoading(true);

            const params: Record<string, string | number> = {
                page,
                pageSize,
                sortBy,
                sortOrder,
            };
            if (activeSearchTerm.trim()) {
                params.q = activeSearchTerm.trim();
            }

            const response = await api.get('/lotes', { params });

            setLotes(response.data.data);
            setPagination(response.data.pagination);
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
            await api.delete(`/lote/${id}`, {});

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

    const handleGeneratePDF = async () => {
        try {
            const baseParams: Record<string, string | number> = {
                pageSize: 200,
                sortBy,
                sortOrder,
            };
            if (activeSearchTerm.trim()) {
                baseParams.q = activeSearchTerm.trim();
            }
            const first = await api.get('/lotes', { params: { ...baseParams, page: 1 } });
            let rows: Lote[] = [...first.data.data];
            const totalApiPages = first.data.pagination.totalPages;
            for (let p = 2; p <= totalApiPages; p++) {
                const r = await api.get('/lotes', { params: { ...baseParams, page: p } });
                rows = rows.concat(r.data.data);
            }

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
                minute: '2-digit',
            });
            doc.text(`Gerado em: ${dataGeracao}`, pageWidth / 2, y, { align: 'center' });
            y += 10;

            if (activeSearchTerm) {
                doc.setFontSize(10);
                doc.text(`Busca: "${activeSearchTerm}"`, margin, y);
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

            rows.forEach((lote) => {
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
                const statusText =
                    vencimentoStatus.status === 'vencido'
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
                    statusText,
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
                    `Página ${i} de ${totalPages} - Total de lotes: ${rows.length}`,
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

    const renderVencimentoBadge = (lote: Lote) => {
        const vencimentoStatus = getVencimentoStatus(lote.datavencimento);
        return (
            <span className={vencimentoStatus.className}>
                {formatDate(lote.datavencimento)}
                {vencimentoStatus.status === 'vencido' && ' (Vencido)'}
                {vencimentoStatus.status === 'proximo' && ` (${vencimentoStatus.days}d)`}
            </span>
        );
    };

    const renderActions = (lote: Lote) => {
        const vencimentoStatus = getVencimentoStatus(lote.datavencimento);
        const isVencido = vencimentoStatus.status === 'vencido';

        return (
            <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
                {hasPermission('lotes.ver') && (
                    <Link href={`/lotes/${lote.id}`} className={styles.btnIcon} title="Ver detalhes">
                        <FaEye size={14} />
                    </Link>
                )}
                {hasPermission('lotes.editar') && (
                    <Link
                        href={`/lotes/${lote.id}/editar`}
                        className={`${styles.btnIcon} ${styles.btnIconEdit}`}
                        title="Editar"
                    >
                        <FaEdit size={14} />
                    </Link>
                )}
                {hasPermission('retiradas.criar') && (
                    <button
                        type="button"
                        className={`${styles.btnIcon} ${styles.btnIconDoar}`}
                        disabled={isVencido}
                        title={
                            isVencido
                                ? 'Não é possível doar medicamento vencido'
                                : 'Doar medicamento'
                        }
                        onClick={() => {
                            if (isVencido) return;
                            router.push(`/retiradas/novo?lote=${lote.id}`);
                        }}
                    >
                        <FaHandHoldingHeart size={14} />
                    </button>
                )}
                {hasPermission('lotes.excluir') && (
                    <button
                        type="button"
                        onClick={() => handleDelete(lote.id, lote.numero)}
                        className={`${styles.btnIcon} ${styles.btnIconDelete}`}
                        title="Excluir"
                    >
                        <FaTrash size={14} />
                    </button>
                )}
            </div>
        );
    };

    if (!mounted) return null;

    return (
        <WithPermission requiredPermission="lotes.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <ListPageHeader
                            icon={<FaBoxes size={24} />}
                            title="Lotes"
                            subtitle="Gerencie os lotes de medicamentos do sistema"
                            actions={
                                <>
                                    <Link href="/lotes/rastreio" className={styles.btnSecondary} title="Consultar etiqueta">
                                        <FaBarcode size={16} />
                                        Consultar etiqueta
                                    </Link>
                                    {pagination != null && pagination.total > 0 && (
                                        <button
                                            type="button"
                                            onClick={handleGeneratePDF}
                                            className={styles.btnPDF}
                                            title="Gerar PDF dos lotes listados"
                                        >
                                            <FaFilePdf size={16} />
                                            Gerar PDF
                                        </button>
                                    )}
                                    {hasPermission('lotes.criar') && (
                                        <Link href="/lotes/novo" className={styles.btnNew}>
                                            <FaPlus size={16} />
                                            Novo Lote
                                        </Link>
                                    )}
                                </>
                            }
                        />

                        <ListSearchToolbar
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Buscar por número, medicamento, princípio, forma ou tipo…"
                            sortOptions={SORT_OPTIONS}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortByChange={setSortBy}
                            onSortOrderToggle={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
                        />

                        {loading ? (
                            <div className={styles.loading}>
                                <p>Carregando lotes…</p>
                            </div>
                        ) : lotes.length === 0 ? (
                            <div className={styles.empty}>
                                <p>
                                    {activeSearchTerm
                                        ? 'Nenhum lote encontrado com os critérios de busca'
                                        : 'Nenhum lote cadastrado'}
                                </p>
                                {!activeSearchTerm && hasPermission('lotes.criar') && (
                                    <Link href="/lotes/novo" className={styles.btnNew}>
                                        Cadastrar primeiro lote
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className={styles.tableWrap}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>Número</th>
                                                <th>Medicamento</th>
                                                <th className={styles.hideTablet}>Forma</th>
                                                <th>Qtde</th>
                                                <th>Vencimento</th>
                                                <th className={styles.actionsCol}>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {lotes.map((lote) => (
                                                <tr
                                                    key={lote.id}
                                                    className={styles.row}
                                                    onClick={() => router.push(`/lotes/${lote.id}`)}
                                                >
                                                    <td>
                                                        <strong className={styles.primaryText}>{lote.numero}</strong>
                                                    </td>
                                                    <td>
                                                        <strong className={styles.primaryText}>
                                                            {lote.medicamento.descricao}
                                                        </strong>
                                                        {lote.medicamento.principioativo && (
                                                            <span className={styles.subText}>
                                                                {lote.medicamento.principioativo}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className={styles.hideTablet}>
                                                        {lote.formaFarmaceutica.descricao}
                                                    </td>
                                                    <td>{lote.qtde}</td>
                                                    <td>{renderVencimentoBadge(lote)}</td>
                                                    <td className={styles.actionsCol}>{renderActions(lote)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className={styles.mobileList}>
                                    {lotes.map((lote) => (
                                        <div
                                            key={lote.id}
                                            className={`${styles.mobileCard} ${styles.mobileCardClickable}`}
                                            onClick={() => router.push(`/lotes/${lote.id}`)}
                                        >
                                            <div className={styles.mobileCardHeader}>
                                                <strong>Lote {lote.numero}</strong>
                                                <span className={styles.subText}>{lote.medicamento.descricao}</span>
                                            </div>
                                            {lote.medicamento.principioativo && (
                                                <p className={styles.mobileMeta}>{lote.medicamento.principioativo}</p>
                                            )}
                                            <p className={styles.mobileMeta}>
                                                {lote.formaFarmaceutica.descricao} · Qtde: {lote.qtde}
                                            </p>
                                            <p className={styles.mobileMeta}>{renderVencimentoBadge(lote)}</p>
                                            <div className={styles.mobileActions}>{renderActions(lote)}</div>
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
        </WithPermission>
    );
}
