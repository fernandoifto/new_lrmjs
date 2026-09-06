'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '../../../home/components/header';
import Menu from '../../../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaUsersCog, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import type { PaginationMeta } from '@/lib/pagedApi';
import {
    ListPageHeader,
    ListSearchToolbar,
    ListFooter,
    useDebouncedValue,
    listStyles as styles,
} from '@/components/list';

interface Grupo {
    id: number;
    nome: string;
    descricao?: string;
    _count?: {
        userRoles: number;
    };
    created: string;
    modified: string;
}

const SORT_OPTIONS = [
    { value: 'nome', label: 'Nome' },
    { value: 'created', label: 'Data de criação' },
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

export default function GruposListPage() {
    const router = useRouter();
    const { isAdmin } = usePermissions();
    const [grupos, setGrupos] = useState<Grupo[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [pagination, setPagination] = useState<PaginationMeta | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('nome');
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
        loadGrupos();
    }, [mounted, page, activeSearchTerm, sortBy, sortOrder, pageSize]);

    const loadGrupos = async () => {
        try {
            setLoading(true);
            const response = await api.get('/roles', {
                params: {
                    page,
                    pageSize,
                    sortBy,
                    sortOrder,
                    ...(activeSearchTerm.trim() ? { q: activeSearchTerm.trim() } : {}),
                },
            });
            setGrupos(response.data.data);
            setPagination(response.data.pagination);
        } catch (error: any) {
            console.error('Erro ao carregar grupos:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar grupos');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, nome: string) => {
        if (!confirm(`Tem certeza que deseja excluir o grupo "${nome}"?`)) return;
        try {
            await api.delete(`/role/${id}`, {});
            toast.success('Grupo excluído com sucesso!');
            loadGrupos();
        } catch (error: any) {
            console.error('Erro ao excluir grupo:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir grupo');
            }
        }
    };

    const renderActions = (grupo: Grupo) => (
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
            <Link href={`/permissoes/grupos/${grupo.id}`} className={styles.btnIcon} title="Ver detalhes">
                <FaEye size={14} />
            </Link>
            {isAdmin && (
                <Link
                    href={`/permissoes/grupos/${grupo.id}/editar`}
                    className={`${styles.btnIcon} ${styles.btnIconEdit}`}
                    title="Editar"
                >
                    <FaEdit size={14} />
                </Link>
            )}
            {isAdmin && (
                <button
                    type="button"
                    onClick={() => handleDelete(grupo.id, grupo.nome)}
                    className={`${styles.btnIcon} ${styles.btnIconDelete}`}
                    title="Excluir grupo"
                >
                    <FaTrash size={14} />
                </button>
            )}
        </div>
    );

    if (!mounted) return null;

    return (
        <WithPermission requiredPermission="admin">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <ListPageHeader
                            icon={<FaUsersCog size={24} />}
                            title="Grupos"
                            subtitle="Lista de todos os grupos cadastrados"
                            actions={
                                isAdmin ? (
                                    <Link href="/permissoes/grupos/novo" className={styles.btnNew}>
                                        <FaPlus size={16} />
                                        Novo Grupo
                                    </Link>
                                ) : null
                            }
                        />

                        <ListSearchToolbar
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Buscar por nome ou descrição…"
                            sortOptions={SORT_OPTIONS}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortByChange={setSortBy}
                            onSortOrderToggle={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
                        />

                        {loading ? (
                            <div className={styles.loading}>
                                <p>Carregando grupos…</p>
                            </div>
                        ) : grupos.length === 0 ? (
                            <div className={styles.empty}>
                                <p>
                                    {activeSearchTerm
                                        ? 'Nenhum grupo encontrado com os critérios de busca'
                                        : 'Nenhum grupo encontrado'}
                                </p>
                                {!activeSearchTerm && isAdmin && (
                                    <Link href="/permissoes/grupos/novo" className={styles.btnNew}>
                                        Criar primeiro grupo
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className={styles.tableWrap}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Descrição</th>
                                                <th>Usuários</th>
                                                <th>Criado em</th>
                                                <th className={styles.actionsCol}>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {grupos.map((grupo) => (
                                                <tr
                                                    key={grupo.id}
                                                    className={styles.row}
                                                    onClick={() => router.push(`/permissoes/grupos/${grupo.id}`)}
                                                >
                                                    <td>
                                                        <strong className={styles.primaryText}>{grupo.nome}</strong>
                                                    </td>
                                                    <td>{grupo.descricao || '—'}</td>
                                                    <td>{grupo._count?.userRoles || 0}</td>
                                                    <td>{formatDate(grupo.created)}</td>
                                                    <td className={styles.actionsCol}>{renderActions(grupo)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className={styles.mobileList}>
                                    {grupos.map((grupo) => (
                                        <div
                                            key={grupo.id}
                                            className={`${styles.mobileCard} ${styles.mobileCardClickable}`}
                                            onClick={() => router.push(`/permissoes/grupos/${grupo.id}`)}
                                        >
                                            <div className={styles.mobileCardHeader}>
                                                <strong>{grupo.nome}</strong>
                                                <span className={styles.subText}>
                                                    {grupo._count?.userRoles || 0} usuário(s)
                                                </span>
                                            </div>
                                            {grupo.descricao ? (
                                                <p className={styles.mobileMeta}>{grupo.descricao}</p>
                                            ) : null}
                                            <p className={styles.mobileMeta}>{formatDate(grupo.created)}</p>
                                            <div className={styles.mobileActions}>{renderActions(grupo)}</div>
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
