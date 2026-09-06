'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '../../../home/components/header';
import Menu from '../../../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaShieldAlt, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import type { PaginationMeta } from '@/lib/pagedApi';
import {
    ListPageHeader,
    ListSearchToolbar,
    ListFooter,
    useDebouncedValue,
    listStyles as styles,
} from '@/components/list';

interface Permissao {
    id: number;
    nome: string;
    descricao?: string;
    pagina?: string;
    acao?: string;
    created: string;
    modified: string;
}

const SORT_OPTIONS = [
    { value: 'nome', label: 'Nome' },
    { value: 'pagina', label: 'Página' },
    { value: 'created', label: 'Data de criação' },
];

export default function PermissoesListPage() {
    const router = useRouter();
    const { isAdmin } = usePermissions();
    const [permissoes, setPermissoes] = useState<Permissao[]>([]);
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
        loadPermissoes();
    }, [mounted, page, activeSearchTerm, sortBy, sortOrder, pageSize]);

    const loadPermissoes = async () => {
        try {
            setLoading(true);
            const response = await api.get('/permissoes', {
                params: {
                    page,
                    pageSize,
                    sortBy,
                    sortOrder,
                    ...(activeSearchTerm.trim() ? { q: activeSearchTerm.trim() } : {}),
                },
            });
            setPermissoes(response.data.data);
            setPagination(response.data.pagination);
        } catch (error: any) {
            console.error('Erro ao carregar permissões:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar permissões');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, nome: string) => {
        if (!confirm(`Tem certeza que deseja excluir a permissão "${nome}"?`)) return;
        try {
            await api.delete(`/permissao/${id}`, {});
            toast.success('Permissão excluída com sucesso!');
            loadPermissoes();
        } catch (error: any) {
            console.error('Erro ao excluir permissão:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir permissão');
            }
        }
    };

    const renderActions = (permissao: Permissao) => (
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
            <Link
                href={`/permissoes/permissoes/${permissao.id}`}
                className={styles.btnIcon}
                title="Ver detalhes"
            >
                <FaEye size={14} />
            </Link>
            {isAdmin && (
                <Link
                    href={`/permissoes/permissoes/${permissao.id}/editar`}
                    className={`${styles.btnIcon} ${styles.btnIconEdit}`}
                    title="Editar"
                >
                    <FaEdit size={14} />
                </Link>
            )}
            {isAdmin && (
                <button
                    type="button"
                    onClick={() => handleDelete(permissao.id, permissao.nome)}
                    className={`${styles.btnIcon} ${styles.btnIconDelete}`}
                    title="Excluir permissão"
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
                            icon={<FaShieldAlt size={24} />}
                            title="Permissões"
                            subtitle="Lista de todas as permissões cadastradas"
                            actions={
                                isAdmin ? (
                                    <Link href="/permissoes/novo" className={styles.btnNew}>
                                        <FaPlus size={16} />
                                        Nova Permissão
                                    </Link>
                                ) : null
                            }
                        />

                        <ListSearchToolbar
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Buscar por nome, descrição, página ou ação…"
                            sortOptions={SORT_OPTIONS}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortByChange={setSortBy}
                            onSortOrderToggle={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
                        />

                        {loading ? (
                            <div className={styles.loading}>
                                <p>Carregando permissões…</p>
                            </div>
                        ) : permissoes.length === 0 ? (
                            <div className={styles.empty}>
                                <p>
                                    {activeSearchTerm
                                        ? 'Nenhuma permissão encontrada com os critérios de busca'
                                        : 'Nenhuma permissão encontrada'}
                                </p>
                                {!activeSearchTerm && isAdmin && (
                                    <Link href="/permissoes/novo" className={styles.btnNew}>
                                        Criar primeira permissão
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
                                                <th>Página</th>
                                                <th>Ação</th>
                                                <th className={styles.actionsCol}>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {permissoes.map((permissao) => (
                                                <tr
                                                    key={permissao.id}
                                                    className={styles.row}
                                                    onClick={() =>
                                                        router.push(`/permissoes/permissoes/${permissao.id}`)
                                                    }
                                                >
                                                    <td>
                                                        <strong className={styles.primaryText}>{permissao.nome}</strong>
                                                    </td>
                                                    <td>{permissao.descricao || '—'}</td>
                                                    <td>{permissao.pagina || '—'}</td>
                                                    <td>{permissao.acao || '—'}</td>
                                                    <td className={styles.actionsCol}>{renderActions(permissao)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className={styles.mobileList}>
                                    {permissoes.map((permissao) => (
                                        <div
                                            key={permissao.id}
                                            className={`${styles.mobileCard} ${styles.mobileCardClickable}`}
                                            onClick={() =>
                                                router.push(`/permissoes/permissoes/${permissao.id}`)
                                            }
                                        >
                                            <div className={styles.mobileCardHeader}>
                                                <strong>{permissao.nome}</strong>
                                                <span className={styles.subText}>
                                                    {[permissao.pagina, permissao.acao].filter(Boolean).join(' · ') ||
                                                        '—'}
                                                </span>
                                            </div>
                                            {permissao.descricao ? (
                                                <p className={styles.mobileMeta}>{permissao.descricao}</p>
                                            ) : null}
                                            <div className={styles.mobileActions}>{renderActions(permissao)}</div>
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
