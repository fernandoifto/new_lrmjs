'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaPills, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import type { PaginationMeta } from '@/lib/pagedApi';
import {
    ListPageHeader,
    ListSearchToolbar,
    ListFooter,
    useDebouncedValue,
    listStyles as styles,
} from '@/components/list';

interface Medicamento {
    id: number;
    descricao: string;
    principioativo: string;
    created: string;
    modified: string;
}

const SORT_OPTIONS = [
    { value: 'descricao', label: 'Descrição' },
    { value: 'principioativo', label: 'Princípio ativo' },
    { value: 'created', label: 'Data de criação' },
];

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export default function MedicamentosListPage() {
    const router = useRouter();
    const { hasPermission } = usePermissions();
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
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
        loadMedicamentos();
    }, [mounted, page, activeSearchTerm, sortBy, sortOrder, pageSize]);

    const loadMedicamentos = async () => {
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

            const response = await api.get('/medicamentos', { params });

            setMedicamentos(response.data.data);
            setPagination(response.data.pagination);
        } catch (error: any) {
            console.error('Erro ao carregar medicamentos:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar medicamentos');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, descricao: string) => {
        if (!confirm(`Tem certeza que deseja excluir o medicamento "${descricao}"?`)) {
            return;
        }

        try {
            await api.delete(`/medicamento/${id}`, {});

            toast.success('Medicamento excluído com sucesso!');
            loadMedicamentos();
        } catch (error: any) {
            console.error('Erro ao excluir medicamento:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir medicamento');
            }
        }
    };

    const renderActions = (medicamento: Medicamento) => (
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
            {hasPermission('medicamentos.ver') && (
                <Link href={`/medicamentos/${medicamento.id}`} className={styles.btnIcon} title="Ver detalhes">
                    <FaEye size={14} />
                </Link>
            )}
            {hasPermission('medicamentos.editar') && (
                <Link
                    href={`/medicamentos/${medicamento.id}/editar`}
                    className={`${styles.btnIcon} ${styles.btnIconEdit}`}
                    title="Editar"
                >
                    <FaEdit size={14} />
                </Link>
            )}
            {hasPermission('medicamentos.excluir') && (
                <button
                    type="button"
                    onClick={() => handleDelete(medicamento.id, medicamento.descricao)}
                    className={`${styles.btnIcon} ${styles.btnIconDelete}`}
                    title="Excluir"
                >
                    <FaTrash size={14} />
                </button>
            )}
        </div>
    );

    if (!mounted) {
        return null;
    }

    return (
        <WithPermission requiredPermission="medicamentos.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <ListPageHeader
                            icon={<FaPills size={24} />}
                            title="Medicamentos"
                            subtitle="Gerencie os medicamentos do sistema"
                            actions={
                                hasPermission('medicamentos.criar') ? (
                                    <Link href="/medicamentos/novo" className={styles.btnNew}>
                                        <FaPlus size={16} />
                                        Novo Medicamento
                                    </Link>
                                ) : null
                            }
                        />

                        <ListSearchToolbar
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Buscar por descrição ou princípio ativo…"
                            sortOptions={SORT_OPTIONS}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortByChange={setSortBy}
                            onSortOrderToggle={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
                        />

                        {loading ? (
                            <div className={styles.loading}>
                                <p>Carregando medicamentos…</p>
                            </div>
                        ) : medicamentos.length === 0 ? (
                            <div className={styles.empty}>
                                <p>
                                    {activeSearchTerm
                                        ? 'Nenhum medicamento encontrado com os critérios de busca'
                                        : 'Nenhum medicamento cadastrado'}
                                </p>
                                {!activeSearchTerm && hasPermission('medicamentos.criar') && (
                                    <Link href="/medicamentos/novo" className={styles.btnNew}>
                                        Cadastrar Primeiro Medicamento
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
                                                <th>Princípio ativo</th>
                                                <th className={styles.hideTablet}>Criado em</th>
                                                <th className={styles.actionsCol}>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {medicamentos.map((medicamento) => (
                                                <tr
                                                    key={medicamento.id}
                                                    className={styles.row}
                                                    onClick={() => router.push(`/medicamentos/${medicamento.id}`)}
                                                >
                                                    <td>
                                                        <strong className={styles.primaryText}>
                                                            {medicamento.descricao}
                                                        </strong>
                                                    </td>
                                                    <td>{medicamento.principioativo}</td>
                                                    <td className={styles.hideTablet}>
                                                        {formatDate(medicamento.created)}
                                                    </td>
                                                    <td className={styles.actionsCol}>
                                                        {renderActions(medicamento)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className={styles.mobileList}>
                                    {medicamentos.map((medicamento) => (
                                        <div
                                            key={medicamento.id}
                                            className={`${styles.mobileCard} ${styles.mobileCardClickable}`}
                                            onClick={() => router.push(`/medicamentos/${medicamento.id}`)}
                                        >
                                            <div className={styles.mobileCardHeader}>
                                                <strong>{medicamento.descricao}</strong>
                                                <span className={styles.subText}>
                                                    {medicamento.principioativo}
                                                </span>
                                            </div>
                                            <p className={styles.mobileMeta}>
                                                Criado em: {formatDate(medicamento.created)}
                                            </p>
                                            <div className={styles.mobileActions}>
                                                {renderActions(medicamento)}
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
        </WithPermission>
    );
}
