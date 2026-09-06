'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaTags, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import type { PaginationMeta } from '@/lib/pagedApi';
import {
    ListPageHeader,
    ListSearchToolbar,
    ListFooter,
    useDebouncedValue,
    listStyles as styles,
} from '@/components/list';

interface TipoMedicamento {
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

export default function TiposMedicamentosPage() {
    const router = useRouter();
    const { hasPermission } = usePermissions();
    const [tiposMedicamentos, setTiposMedicamentos] = useState<TipoMedicamento[]>([]);
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
        loadTiposMedicamentos();
    }, [mounted, page, activeSearchTerm, sortBy, sortOrder, pageSize]);

    const loadTiposMedicamentos = async () => {
        try {
            setLoading(true);
            const response = await api.get('/tipos-medicamentos', {
                params: {
                    page,
                    pageSize,
                    sortBy,
                    sortOrder,
                    ...(activeSearchTerm.trim() ? { q: activeSearchTerm.trim() } : {}),
                },
            });
            setTiposMedicamentos(response.data.data);
            setPagination(response.data.pagination);
        } catch (error: any) {
            console.error('Erro ao carregar tipos de medicamentos:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar tipos de medicamentos');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, descricao: string) => {
        if (!confirm(`Tem certeza que deseja excluir o tipo de medicamento "${descricao}"?`)) return;
        try {
            await api.delete(`/tipo-medicamento/${id}`, {});
            toast.success('Tipo de medicamento excluído com sucesso!');
            loadTiposMedicamentos();
        } catch (error: any) {
            console.error('Erro ao excluir tipo de medicamento:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir tipo de medicamento');
            }
        }
    };

    const renderActions = (tipo: TipoMedicamento) => (
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
            {hasPermission('tipos_medicamentos.ver') && (
                <Link href={`/tipos-medicamentos/${tipo.id}`} className={styles.btnIcon} title="Ver detalhes">
                    <FaEye size={14} />
                </Link>
            )}
            {hasPermission('tipos_medicamentos.editar') && (
                <Link
                    href={`/tipos-medicamentos/${tipo.id}/editar`}
                    className={`${styles.btnIcon} ${styles.btnIconEdit}`}
                    title="Editar"
                >
                    <FaEdit size={14} />
                </Link>
            )}
            {hasPermission('tipos_medicamentos.excluir') && (
                <button
                    type="button"
                    onClick={() => handleDelete(tipo.id, tipo.descricao)}
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
        <WithPermission requiredPermission="tipos_medicamentos.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <ListPageHeader
                            icon={<FaTags size={24} />}
                            title="Tipos de Medicamentos"
                            subtitle="Gerencie os tipos de medicamentos do sistema"
                            actions={
                                hasPermission('tipos_medicamentos.criar') ? (
                                    <Link href="/tipos-medicamentos/novo" className={styles.btnNew}>
                                        <FaPlus size={16} />
                                        Novo Tipo
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
                                <p>Carregando tipos de medicamentos…</p>
                            </div>
                        ) : tiposMedicamentos.length === 0 ? (
                            <div className={styles.empty}>
                                <p>
                                    {activeSearchTerm
                                        ? 'Nenhum tipo encontrado com os critérios de busca'
                                        : 'Nenhum tipo de medicamento cadastrado'}
                                </p>
                                {!activeSearchTerm && hasPermission('tipos_medicamentos.criar') && (
                                    <Link href="/tipos-medicamentos/novo" className={styles.btnNew}>
                                        Cadastrar primeiro tipo
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
                                            {tiposMedicamentos.map((tipo) => (
                                                <tr
                                                    key={tipo.id}
                                                    className={styles.row}
                                                    onClick={() => router.push(`/tipos-medicamentos/${tipo.id}`)}
                                                >
                                                    <td>
                                                        <strong className={styles.primaryText}>{tipo.descricao}</strong>
                                                    </td>
                                                    <td>{formatDate(tipo.created)}</td>
                                                    <td className={styles.actionsCol}>{renderActions(tipo)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className={styles.mobileList}>
                                    {tiposMedicamentos.map((tipo) => (
                                        <div
                                            key={tipo.id}
                                            className={`${styles.mobileCard} ${styles.mobileCardClickable}`}
                                            onClick={() => router.push(`/tipos-medicamentos/${tipo.id}`)}
                                        >
                                            <div className={styles.mobileCardHeader}>
                                                <strong>{tipo.descricao}</strong>
                                                <span className={styles.subText}>{formatDate(tipo.created)}</span>
                                            </div>
                                            <div className={styles.mobileActions}>{renderActions(tipo)}</div>
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
