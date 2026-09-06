'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaUsers, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
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
}

interface User {
    id: number;
    username: string;
    email: string;
    grupos?: Grupo[];
    created: string;
    modified: string;
}

const SORT_OPTIONS = [
    { value: 'username', label: 'Nome' },
    { value: 'email', label: 'Email' },
    { value: 'created', label: 'Data de criação' },
];

function formatGrupos(grupos?: Grupo[]) {
    if (!grupos || grupos.length === 0) return null;
    return grupos.map((g) => g.nome).join(', ');
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

export default function UsersListPage() {
    const router = useRouter();
    const { isAdmin } = usePermissions();
    const [users, setUsers] = useState<User[]>([]);
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
        loadUsers();
    }, [mounted, page, activeSearchTerm, sortBy, sortOrder, pageSize]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users', {
                params: {
                    page,
                    pageSize,
                    sortBy,
                    sortOrder,
                    ...(activeSearchTerm.trim() ? { q: activeSearchTerm.trim() } : {}),
                },
            });
            setUsers(response.data.data);
            setPagination(response.data.pagination);
        } catch (error: any) {
            console.error('Erro ao carregar usuários:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar usuários');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, username: string) => {
        if (!confirm(`Tem certeza que deseja excluir o usuário "${username}"?`)) return;
        try {
            await api.delete(`/user/${id}`, {});
            toast.success('Usuário excluído com sucesso!');
            loadUsers();
        } catch (error: any) {
            console.error('Erro ao excluir usuário:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir usuário');
            }
        }
    };

    const renderActions = (user: User) => (
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
            <Link href={`/users/${user.id}`} className={styles.btnIcon} title="Ver detalhes">
                <FaEye size={14} />
            </Link>
            {isAdmin && (
                <Link
                    href={`/users/${user.id}/editar`}
                    className={`${styles.btnIcon} ${styles.btnIconEdit}`}
                    title="Editar"
                >
                    <FaEdit size={14} />
                </Link>
            )}
            {isAdmin && (
                <button
                    type="button"
                    onClick={() => handleDelete(user.id, user.username)}
                    className={`${styles.btnIcon} ${styles.btnIconDelete}`}
                    title="Excluir usuário"
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
                            icon={<FaUsers size={24} />}
                            title="Usuários"
                            subtitle="Lista de todos os usuários cadastrados"
                            actions={
                                isAdmin ? (
                                    <Link href="/users/novo" className={styles.btnNew}>
                                        <FaPlus size={16} />
                                        Novo Usuário
                                    </Link>
                                ) : null
                            }
                        />

                        <ListSearchToolbar
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Buscar por nome ou email…"
                            sortOptions={SORT_OPTIONS}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortByChange={setSortBy}
                            onSortOrderToggle={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
                        />

                        {loading ? (
                            <div className={styles.loading}>
                                <p>Carregando usuários…</p>
                            </div>
                        ) : users.length === 0 ? (
                            <div className={styles.empty}>
                                <p>
                                    {activeSearchTerm
                                        ? 'Nenhum usuário encontrado com os critérios de busca'
                                        : 'Nenhum usuário encontrado'}
                                </p>
                                {!activeSearchTerm && isAdmin && (
                                    <Link href="/users/novo" className={styles.btnNew}>
                                        Criar primeiro usuário
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
                                                <th>Email</th>
                                                <th>Grupo</th>
                                                <th className={styles.hideTablet}>Criado em</th>
                                                <th className={styles.actionsCol}>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className={styles.row}
                                                    onClick={() => router.push(`/users/${user.id}`)}
                                                >
                                                    <td>
                                                        <strong className={styles.primaryText}>{user.username}</strong>
                                                    </td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        {user.grupos && user.grupos.length > 0 ? (
                                                            <div className={styles.badges}>
                                                                {user.grupos.map((grupo) => (
                                                                    <span
                                                                        key={grupo.id}
                                                                        className={`${styles.badge} ${styles.badgeSuccess}`}
                                                                    >
                                                                        {grupo.nome}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            '—'
                                                        )}
                                                    </td>
                                                    <td className={styles.hideTablet}>{formatDate(user.created)}</td>
                                                    <td className={styles.actionsCol}>{renderActions(user)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className={styles.mobileList}>
                                    {users.map((user) => (
                                        <div
                                            key={user.id}
                                            className={`${styles.mobileCard} ${styles.mobileCardClickable}`}
                                            onClick={() => router.push(`/users/${user.id}`)}
                                        >
                                            <div className={styles.mobileCardHeader}>
                                                <strong>{user.username}</strong>
                                                <span className={styles.subText}>{user.email}</span>
                                            </div>
                                            <p className={styles.mobileMeta}>
                                                {formatGrupos(user.grupos) || 'Sem grupo'}
                                            </p>
                                            <p className={styles.mobileMeta}>{formatDate(user.created)}</p>
                                            <div className={styles.mobileActions}>{renderActions(user)}</div>
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
