'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaFlask, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import type { PaginationMeta } from '@/lib/pagedApi';
import {
    ListPageHeader,
    ListSearchToolbar,
    ListFooter,
    useDebouncedValue,
    listStyles as styles,
} from '@/components/list';

interface FormaFarmaceutica {
    id: number;
    descricao: string;
    created: string;
    modified: string;
}

const SORT_OPTIONS = [
    { value: 'descricao', label: 'Descrição' },
    { value: 'created', label: 'Data de criação' },
];

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export default function FormasFarmaceuticasPage() {
    const router = useRouter();
    const { hasPermission } = usePermissions();
    const [formasFarmaceuticas, setFormasFarmaceuticas] = useState<FormaFarmaceutica[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [pagination, setPagination] = useState<PaginationMeta | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('descricao');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const activeSearchTerm = useDebouncedValue(searchTerm);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setPage(1);
    }, [activeSearchTerm, sortBy, sortOrder, pageSize]);

    useEffect(() => {
        if (!mounted) return;
        loadFormasFarmaceuticas();
    }, [mounted, page, activeSearchTerm, sortBy, sortOrder, pageSize]);

    const loadFormasFarmaceuticas = async () => {
        try {
            setLoading(true);
            const response = await api.get('/formas-farmaceuticas', {
                params: {
                    page,
                    pageSize,
                    sortBy,
                    sortOrder,
                    ...(activeSearchTerm.trim() ? { q: activeSearchTerm.trim() } : {}),
                },
            });
            setFormasFarmaceuticas(response.data.data);
            setPagination(response.data.pagination);
        } catch (error: any) {
            console.error('Erro ao carregar formas farmacêuticas:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar formas farmacêuticas');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, descricao: string) => {
        if (!confirm(`Tem certeza que deseja excluir a forma farmacêutica "${descricao}"?`)) return;
        try {
            await api.delete(`/forma-farmaceutica/${id}`, {});
            toast.success('Forma farmacêutica excluída com sucesso!');
            loadFormasFarmaceuticas();
        } catch (error: any) {
            console.error('Erro ao excluir forma farmacêutica:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir forma farmacêutica');
            }
        }
    };

    const renderActions = (forma: FormaFarmaceutica) => (
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
            {hasPermission('formas_farmaceuticas.ver') && (
                <Link href={`/formas-farmaceuticas/${forma.id}`} className={styles.btnIcon} title="Ver detalhes">
                    <FaEye size={14} />
                </Link>
            )}
            {hasPermission('formas_farmaceuticas.editar') && (
                <Link
                    href={`/formas-farmaceuticas/${forma.id}/editar`}
                    className={`${styles.btnIcon} ${styles.btnIconEdit}`}
                    title="Editar"
                >
                    <FaEdit size={14} />
                </Link>
            )}
            {hasPermission('formas_farmaceuticas.excluir') && (
                <button
                    type="button"
                    onClick={() => handleDelete(forma.id, forma.descricao)}
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
        <WithPermission requiredPermission="formas_farmaceuticas.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <ListPageHeader
                            icon={<FaFlask size={24} />}
                            title="Formas Farmacêuticas"
                            subtitle="Gerencie as formas farmacêuticas do sistema"
                            actions={
                                hasPermission('formas_farmaceuticas.criar') ? (
                                    <Link href="/formas-farmaceuticas/novo" className={styles.btnNew}>
                                        <FaPlus size={16} />
                                        Nova Forma
                                    </Link>
                                ) : null
                            }
                        />

                        <ListSearchToolbar
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Buscar por descrição…"
                            sortOptions={SORT_OPTIONS}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortByChange={setSortBy}
                            onSortOrderToggle={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
                        />

                        {loading ? (
                            <div className={styles.loading}>
                                <p>Carregando formas farmacêuticas…</p>
                            </div>
                        ) : formasFarmaceuticas.length === 0 ? (
                            <div className={styles.empty}>
                                <p>
                                    {activeSearchTerm
                                        ? 'Nenhuma forma encontrada com os critérios de busca'
                                        : 'Nenhuma forma farmacêutica cadastrada'}
                                </p>
                                {!activeSearchTerm && hasPermission('formas_farmaceuticas.criar') && (
                                    <Link href="/formas-farmaceuticas/novo" className={styles.btnNew}>
                                        Cadastrar primeira forma
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className={styles.tableWrap}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>Descrição</th>
                                                <th>Criado em</th>
                                                <th className={styles.actionsCol}>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formasFarmaceuticas.map((forma) => (
                                                <tr
                                                    key={forma.id}
                                                    className={styles.row}
                                                    onClick={() => router.push(`/formas-farmaceuticas/${forma.id}`)}
                                                >
                                                    <td>
                                                        <strong className={styles.primaryText}>{forma.descricao}</strong>
                                                    </td>
                                                    <td>{formatDate(forma.created)}</td>
                                                    <td className={styles.actionsCol}>{renderActions(forma)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className={styles.mobileList}>
                                    {formasFarmaceuticas.map((forma) => (
                                        <div
                                            key={forma.id}
                                            className={`${styles.mobileCard} ${styles.mobileCardClickable}`}
                                            onClick={() => router.push(`/formas-farmaceuticas/${forma.id}`)}
                                        >
                                            <div className={styles.mobileCardHeader}>
                                                <strong>{forma.descricao}</strong>
                                                <span className={styles.subText}>{formatDate(forma.created)}</span>
                                            </div>
                                            <div className={styles.mobileActions}>{renderActions(forma)}</div>
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
