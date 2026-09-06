'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaHandHoldingHeart, FaFilePdf, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
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

const SORT_OPTIONS = [
    { value: 'created', label: 'Data de criação' },
    { value: 'qtde', label: 'Quantidade' },
];

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function formatCPF(cpf: string) {
    const cleaned = cpf.replace(/\D/g, '');
    if (cleaned.length === 11) {
        return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
}

export default function RetiradasPage() {
    const router = useRouter();
    const { hasPermission } = usePermissions();
    const [retiradas, setRetiradas] = useState<Retirada[]>([]);
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
        loadRetiradas();
    }, [mounted, page, activeSearchTerm, sortBy, sortOrder, pageSize]);

    const loadRetiradas = async () => {
        try {
            setLoading(true);
            const response = await api.get('/retiradas', {
                params: {
                    page,
                    pageSize,
                    sortBy,
                    sortOrder,
                    ...(activeSearchTerm.trim() ? { q: activeSearchTerm.trim() } : {}),
                },
            });
            setRetiradas(response.data.data);
            setPagination(response.data.pagination);
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

    const handleGeneratePDF = async () => {
        try {
            const pdfRes = await api.get('/retiradas', {
                params: {
                    page: 1,
                    pageSize: 200,
                    sortBy,
                    sortOrder,
                    ...(activeSearchTerm.trim() ? { q: activeSearchTerm.trim() } : {}),
                },
            });
            const rows = pdfRes.data.data as Retirada[];

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

            rows.forEach((retirada) => {
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
                    retirada.user.username || '',
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
            await api.delete(`/retirada/${id}`, {});
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

    const renderActions = (retirada: Retirada) => (
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
            {hasPermission('retiradas.ver') && (
                <Link href={`/retiradas/${retirada.id}`} className={styles.btnIcon} title="Ver detalhes">
                    <FaEye size={14} />
                </Link>
            )}
            {hasPermission('retiradas.editar') && (
                <Link
                    href={`/retiradas/${retirada.id}/editar`}
                    className={`${styles.btnIcon} ${styles.btnIconEdit}`}
                    title="Editar"
                >
                    <FaEdit size={14} />
                </Link>
            )}
            {hasPermission('retiradas.excluir') && (
                <button
                    type="button"
                    onClick={() => handleDelete(retirada.id)}
                    className={`${styles.btnIcon} ${styles.btnIconDelete}`}
                    title="Excluir"
                >
                    <FaTrash size={14} />
                </button>
            )}
        </div>
    );

    if (!mounted) return null;

    return (
        <WithPermission requiredPermission="retiradas.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <ListPageHeader
                            icon={<FaHandHoldingHeart size={24} />}
                            title="Doações e Retiradas"
                            subtitle="Gerencie as doações e retiradas de medicamentos"
                            actions={
                                <>
                                    {pagination != null && pagination.total > 0 && (
                                        <button
                                            type="button"
                                            onClick={handleGeneratePDF}
                                            className={styles.btnPDF}
                                            title="Gerar PDF das retiradas listadas"
                                        >
                                            <FaFilePdf size={16} />
                                            Gerar PDF
                                        </button>
                                    )}
                                    {hasPermission('retiradas.criar') && (
                                        <Link href="/retiradas/novo" className={styles.btnNew}>
                                            <FaPlus size={16} />
                                            Nova Retirada
                                        </Link>
                                    )}
                                </>
                            }
                        />

                        <ListSearchToolbar
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Buscar por paciente, CPF, medicamento, lote ou usuário…"
                            sortOptions={SORT_OPTIONS}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortByChange={setSortBy}
                            onSortOrderToggle={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
                        />

                        {loading ? (
                            <div className={styles.loading}>
                                <p>Carregando retiradas…</p>
                            </div>
                        ) : retiradas.length === 0 ? (
                            <div className={styles.empty}>
                                <p>
                                    {activeSearchTerm
                                        ? 'Nenhuma retirada encontrada com os critérios de busca'
                                        : 'Nenhuma retirada registrada'}
                                </p>
                                {!activeSearchTerm && hasPermission('retiradas.criar') && (
                                    <Link href="/retiradas/novo" className={styles.btnNew}>
                                        Registrar primeira retirada
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className={styles.tableWrap}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>Data</th>
                                                <th>Paciente</th>
                                                <th>Medicamento</th>
                                                <th className={styles.hideTablet}>Lote</th>
                                                <th>Qtde</th>
                                                <th className={styles.hideTablet}>Usuário</th>
                                                <th className={styles.actionsCol}>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {retiradas.map((retirada) => (
                                                <tr
                                                    key={retirada.id}
                                                    className={styles.row}
                                                    onClick={() => router.push(`/retiradas/${retirada.id}`)}
                                                >
                                                    <td>{formatDate(retirada.created || '')}</td>
                                                    <td>
                                                        <strong className={styles.primaryText}>
                                                            {retirada.paciente.nome}
                                                        </strong>
                                                        <span className={styles.subText}>
                                                            {formatCPF(retirada.paciente.cpf)}
                                                        </span>
                                                    </td>
                                                    <td>{retirada.lotes.medicamento.descricao}</td>
                                                    <td className={styles.hideTablet}>{retirada.lotes.numero}</td>
                                                    <td>{retirada.qtde}</td>
                                                    <td className={styles.hideTablet}>{retirada.user.username}</td>
                                                    <td className={styles.actionsCol}>{renderActions(retirada)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className={styles.mobileList}>
                                    {retiradas.map((retirada) => (
                                        <div
                                            key={retirada.id}
                                            className={`${styles.mobileCard} ${styles.mobileCardClickable}`}
                                            onClick={() => router.push(`/retiradas/${retirada.id}`)}
                                        >
                                            <div className={styles.mobileCardHeader}>
                                                <strong>{retirada.paciente.nome}</strong>
                                                <span className={styles.subText}>
                                                    {formatCPF(retirada.paciente.cpf)}
                                                </span>
                                            </div>
                                            <p className={styles.mobileMeta}>
                                                {retirada.lotes.medicamento.descricao} · Lote {retirada.lotes.numero}
                                            </p>
                                            <p className={styles.mobileMeta}>
                                                {formatDate(retirada.created || '')} · Qtde {retirada.qtde} ·{' '}
                                                {retirada.user.username}
                                            </p>
                                            <div className={styles.mobileActions}>{renderActions(retirada)}</div>
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
