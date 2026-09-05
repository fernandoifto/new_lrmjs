'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import {
    FaCalendarAlt,
    FaFilePdf,
    FaPlus,
    FaSearch,
    FaTimes,
    FaClipboardCheck,
    FaEdit,
    FaTrash,
    FaCalendarDay,
} from 'react-icons/fa';
import styles from './AgendamentosListView.module.css';
import Link from 'next/link';
import jsPDF from 'jspdf';
import type { PaginationMeta } from '@/lib/pagedApi';
import { PaginationBar } from '@/components/PaginationBar';
import {
    AgendamentoStatus,
    FiltroAgendamento,
    SortField,
    filtroLabel,
    sortOptions,
    statusBadgeClass,
    statusLabel,
} from '../lib/status';

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
    turno: { id: number; descricao: string };
    user: { id: number; username: string; email: string } | null;
    status: AgendamentoStatus;
}

interface Stats {
    total: number;
    aguardando_agendamento: number;
    visita_marcada_hoje: number;
    visitado: number;
}

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
const FILTROS: FiltroAgendamento[] = [
    'todos',
    'visita_marcada_hoje',
    'aguardando_agendamento',
    'visitado',
];

function formatPhone(phone: string) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    if (cleaned.length === 10) return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    return phone;
}

function formatAddress(endereco: string, numero: string) {
    return `${endereco}, ${numero}`.trim();
}

function AgendamentosListViewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { hasPermission } = usePermissions();

    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pagination, setPagination] = useState<PaginationMeta | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');

    const rawFiltro = searchParams.get('filtro');
    const filtro: FiltroAgendamento = FILTROS.includes(rawFiltro as FiltroAgendamento)
        ? (rawFiltro as FiltroAgendamento)
        : 'todos';
    const sortBy = (searchParams.get('sortBy') as SortField) || 'created';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';

    const updateParams = useCallback(
        (updates: Record<string, string | null>) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(updates).forEach(([key, value]) => {
                if (value === null || value === '') params.delete(key);
                else params.set(key, value);
            });
            router.push(`/agendamentos?${params.toString()}`);
        },
        [router, searchParams]
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setPage(1);
    }, [filtro, sortBy, sortOrder, activeSearchTerm, pageSize]);

    useEffect(() => {
        if (!mounted) return;
        const timer = setTimeout(() => {
            setActiveSearchTerm(searchTerm.trim());
        }, 400);
        return () => clearTimeout(timer);
    }, [searchTerm, mounted]);

    useEffect(() => {
        if (!mounted) return;
        loadAgendamentos();
    }, [mounted, page, filtro, activeSearchTerm, sortBy, sortOrder, pageSize]);

    useEffect(() => {
        if (!mounted) return;
        loadStats();
    }, [mounted]);

    const loadStats = async () => {
        try {
            const response = await api.get('/agendamentos/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        }
    };

    const loadAgendamentos = async () => {
        try {
            setLoading(true);
            const visitadoParam = filtro === 'todos' ? undefined : filtro;
            const response = await api.get('/agendamentos', {
                params: {
                    page,
                    pageSize,
                    ...(visitadoParam ? { filtro: visitadoParam } : {}),
                    ...(activeSearchTerm ? { q: activeSearchTerm } : {}),
                    sortBy,
                    sortOrder,
                },
            });
            setAgendamentos(response.data.data);
            setPagination(response.data.pagination);
        } catch (error: unknown) {
            const err = error as { response?: { status?: number } };
            console.error('Erro ao carregar agendamentos:', error);
            if (err.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar agendamentos');
            }
        } finally {
            setLoading(false);
        }
    };

    const refreshAll = () => {
        loadAgendamentos();
        loadStats();
    };

    const handleVisitar = async (id: number) => {
        try {
            const userResponse = await api.get('/detail', {});
            await api.patch(`/agendamento/${id}/visitar?userId=${userResponse.data.id}`, {}, {});
            toast.success('Agendamento concluído!');
            refreshAll();
        } catch (error: unknown) {
            const err = error as { response?: { status?: number; data?: { error?: string } } };
            if (err.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(err.response?.data?.error || 'Erro ao concluir agendamento');
            }
        }
    };

    const handleMarcarParaHoje = async (id: number) => {
        try {
            await api.patch(`/agendamento/${id}/status`, { status: 'VISITA_MARCADA_PARA_HOJE' }, {});
            toast.success('Visita marcada para hoje!');
            refreshAll();
        } catch (error: unknown) {
            const err = error as { response?: { data?: { error?: string } } };
            toast.error(err.response?.data?.error || 'Erro ao atualizar status');
        }
    };

    const handleDelete = async (id: number, nome: string) => {
        if (!confirm(`Excluir o agendamento de "${nome}"? Esta ação não pode ser desfeita.`)) return;
        try {
            await api.delete(`/agendamento/${id}`, {});
            toast.success('Agendamento excluído com sucesso!');
            refreshAll();
        } catch (error: unknown) {
            const err = error as { response?: { status?: number; data?: { error?: string } } };
            if (err.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(err.response?.data?.error || 'Erro ao excluir agendamento');
            }
        }
    };

    const handleGeneratePDF = async () => {
        try {
            const visitadoParam = filtro === 'todos' ? undefined : filtro;
            const pdfRes = await api.get('/agendamentos', {
                params: {
                    page: 1,
                    pageSize: 200,
                    ...(visitadoParam ? { filtro: visitadoParam } : {}),
                    ...(activeSearchTerm ? { q: activeSearchTerm } : {}),
                    sortBy,
                    sortOrder,
                },
            });
            const rows = pdfRes.data.data as Agendamento[];
            const doc = new jsPDF('landscape', 'mm', 'a4');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 10;
            let y = 20;

            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('Lista de Agendamentos', pageWidth / 2, y, { align: 'center' });
            y += 15;

            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            const colWidths = [40, 55, 35, 30, 30];
            const headers = ['Nome', 'Endereço/Setor', 'Telefone', 'Melhor data', 'Coleta'];
            let x = margin;
            headers.forEach((header, index) => {
                doc.text(header, x, y);
                x += colWidths[index];
            });
            y += 7;
            doc.line(margin, y - 2, pageWidth - margin, y - 2);
            y += 2;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            rows.forEach((ag) => {
                if (y > pageHeight - 20) {
                    doc.addPage();
                    y = 20;
                }
                x = margin;
                const rowData = [
                    ag.nome,
                    `${formatAddress(ag.endereco, ag.numero)} — ${ag.setor}`,
                    formatPhone(ag.telefone),
                    ag.datavisita || '',
                    statusLabel[ag.status],
                ];
                rowData.forEach((data, idx) => {
                    doc.text(doc.splitTextToSize(data || '', colWidths[idx] - 2), x + 1, y);
                    x += colWidths[idx];
                });
                y += 8;
            });

            doc.save(`agendamentos_${new Date().toISOString().split('T')[0]}.pdf`);
            toast.success('PDF gerado com sucesso!');
        } catch {
            toast.error('Erro ao gerar PDF');
        }
    };

    const kpiCount = (f: FiltroAgendamento) => {
        if (!stats) return '—';
        if (f === 'todos') return stats.total;
        return stats[f];
    };

    const renderPrimaryAction = (ag: Agendamento) => {
        if (ag.status === 'AGUARDANDO_AGENDAMENTO' && hasPermission('agendamentos.visitar')) {
            return (
                <button
                    type="button"
                    className={styles.btnPrimary}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleMarcarParaHoje(ag.id);
                    }}
                >
                    <FaCalendarDay size={14} />
                    Marcar para hoje
                </button>
            );
        }
        if (ag.status === 'VISITA_MARCADA_PARA_HOJE' && hasPermission('agendamentos.visitar')) {
            return (
                <button
                    type="button"
                    className={styles.btnPrimary}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleVisitar(ag.id);
                    }}
                >
                    <FaClipboardCheck size={14} />
                    Concluir
                </button>
            );
        }
        return null;
    };

    const renderRowActions = (ag: Agendamento) => (
        <div className={styles.actions}>
            {renderPrimaryAction(ag)}
            {hasPermission('agendamentos.editar') && (
                <Link
                    href={`/agendamentos/${ag.id}/editar`}
                    className={`${styles.btnIcon} ${styles.btnIconEdit}`}
                    title="Editar"
                    onClick={(e) => e.stopPropagation()}
                >
                    <FaEdit size={14} />
                </Link>
            )}
            {hasPermission('agendamentos.excluir') && (
                <button
                    type="button"
                    className={`${styles.btnIcon} ${styles.btnIconDelete}`}
                    title="Excluir"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(ag.id, ag.nome);
                    }}
                >
                    <FaTrash size={14} />
                </button>
            )}
        </div>
    );

    if (!mounted) return null;

    return (
        <WithPermission requiredPermission="agendamentos.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.pageHeader}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <FaCalendarAlt size={24} />
                                </div>
                                <div>
                                    <h1>Agendamentos</h1>
                                    <p>Gerencie visitas e coletas de medicamentos</p>
                                </div>
                            </div>
                            <div className={styles.headerActions}>
                                {agendamentos.length > 0 && (
                                    <button type="button" onClick={handleGeneratePDF} className={styles.btnPDF}>
                                        <FaFilePdf size={18} />
                                        Exportar PDF
                                    </button>
                                )}
                                {hasPermission('agendamentos.criar') && (
                                    <Link href="/agendamentos/novo" className={styles.btnNew}>
                                        <FaPlus size={18} />
                                        Novo
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className={styles.kpiGrid}>
                            {FILTROS.map((f) => (
                                <button
                                    key={f}
                                    type="button"
                                    className={`${styles.kpiCard} ${filtro === f ? styles.kpiActive : ''}`}
                                    onClick={() => updateParams({ filtro: f === 'todos' ? null : f })}
                                >
                                    <span className={styles.kpiCount}>{kpiCount(f)}</span>
                                    <span className={styles.kpiLabel}>{filtroLabel[f]}</span>
                                </button>
                            ))}
                        </div>

                        <div className={styles.toolbar}>
                            <div className={styles.searchBox}>
                                <FaSearch size={16} className={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Buscar por nome, telefone, endereço, setor ou CEP…"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={styles.searchInput}
                                />
                                {searchTerm && (
                                    <button type="button" className={styles.clearBtn} onClick={() => setSearchTerm('')} aria-label="Limpar busca">
                                        <FaTimes size={16} />
                                    </button>
                                )}
                            </div>
                            <div className={styles.filtersRow}>
                                <select
                                    className={styles.select}
                                    value={sortBy}
                                    onChange={(e) => updateParams({ sortBy: e.target.value })}
                                >
                                    {sortOptions.map((o) => (
                                        <option key={o.value} value={o.value}>Ordenar: {o.label}</option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className={styles.sortToggle}
                                    onClick={() => updateParams({ sortOrder: sortOrder === 'asc' ? 'desc' : 'asc' })}
                                    title={sortOrder === 'asc' ? 'Crescente' : 'Decrescente'}
                                >
                                    {sortOrder === 'asc' ? '↑' : '↓'}
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className={styles.loading}>Carregando agendamentos…</div>
                        ) : agendamentos.length === 0 ? (
                            <div className={styles.empty}>
                                <p>Nenhum agendamento encontrado{filtro !== 'todos' ? ` em "${filtroLabel[filtro]}"` : ''}.</p>
                                {hasPermission('agendamentos.criar') && (
                                    <Link href="/agendamentos/novo" className={styles.btnNew}>Criar agendamento</Link>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className={styles.tableWrap}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th className={styles.hideMobile}>Endereço/Setor</th>
                                                <th className={styles.hideTablet}>Melhor data</th>
                                                <th className={styles.hideMobile}>Telefone</th>
                                                <th>Coleta</th>
                                                <th className={styles.actionsCol}>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {agendamentos.map((ag) => (
                                                <tr
                                                    key={ag.id}
                                                    className={styles.row}
                                                    onClick={() => router.push(`/agendamentos/${ag.id}`)}
                                                >
                                                    <td>
                                                        <strong className={styles.nomeText}>{ag.nome}</strong>
                                                    </td>
                                                    <td className={styles.hideMobile}>
                                                        <div className={styles.enderecoCell}>
                                                            <span>{formatAddress(ag.endereco, ag.numero)}</span>
                                                            <span className={styles.subText}>{ag.setor}</span>
                                                        </div>
                                                    </td>
                                                    <td className={styles.hideTablet}>{ag.datavisita || '—'}</td>
                                                    <td className={styles.hideMobile}>
                                                        <a
                                                            href={`tel:${ag.telefone.replace(/\D/g, '')}`}
                                                            className={styles.phoneLink}
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            {formatPhone(ag.telefone)}
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <span className={`${styles.badge} ${styles[statusBadgeClass(ag.status)]}`}>
                                                            {statusLabel[ag.status]}
                                                        </span>
                                                    </td>
                                                    <td className={styles.actionsCol} onClick={(e) => e.stopPropagation()}>
                                                        {renderRowActions(ag)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className={styles.mobileList}>
                                    {agendamentos.map((ag) => (
                                        <div
                                            key={ag.id}
                                            className={styles.mobileCard}
                                            onClick={() => router.push(`/agendamentos/${ag.id}`)}
                                        >
                                            <div className={styles.mobileCardHeader}>
                                                <strong>{ag.nome}</strong>
                                            </div>
                                            <p className={styles.mobileMeta}>
                                                {formatAddress(ag.endereco, ag.numero)} — {ag.setor}
                                                {ag.datavisita ? ` · ${ag.datavisita}` : ''}
                                            </p>
                                            <div className={styles.mobileStatus}>
                                                <span className={`${styles.badge} ${styles[statusBadgeClass(ag.status)]}`}>
                                                    {statusLabel[ag.status]}
                                                </span>
                                            </div>
                                            <div className={styles.mobileActions} onClick={(e) => e.stopPropagation()}>
                                                {renderRowActions(ag)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.footer}>
                                    <div className={styles.pageSizeWrap}>
                                        <label htmlFor="pageSize">Por página:</label>
                                        <select
                                            id="pageSize"
                                            value={pageSize}
                                            onChange={(e) => setPageSize(Number(e.target.value))}
                                            className={styles.select}
                                        >
                                            {PAGE_SIZE_OPTIONS.map((n) => (
                                                <option key={n} value={n}>{n}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {pagination && (
                                        <PaginationBar
                                            page={pagination.page}
                                            totalPages={pagination.totalPages}
                                            total={pagination.total}
                                            onPageChange={setPage}
                                            disabled={loading}
                                        />
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}

export default function AgendamentosListView() {
    return (
        <Suspense fallback={null}>
            <AgendamentosListViewContent />
        </Suspense>
    );
}
