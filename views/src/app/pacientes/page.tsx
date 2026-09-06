'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaUserFriends, FaPlus, FaEye, FaEdit, FaTrash, FaHandHoldingHeart } from 'react-icons/fa';
import Link from 'next/link';
import type { PaginationMeta } from '@/lib/pagedApi';
import {
    ListPageHeader,
    ListSearchToolbar,
    ListFooter,
    useDebouncedValue,
    listStyles as styles,
} from '@/components/list';

interface Paciente {
    id: number;
    nome: string;
    cpf: string;
    datanascimento: string;
    telefone: string;
    cartaosus: string;
    created: string;
    modified: string;
}

const SORT_OPTIONS = [
    { value: 'nome', label: 'Nome' },
    { value: 'cpf', label: 'CPF' },
    { value: 'datanascimento', label: 'Nascimento' },
    { value: 'created', label: 'Data de criação' },
];

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

function formatCPF(cpf: string) {
    const cleaned = cpf.replace(/\D/g, '');
    if (cleaned.length === 11) {
        return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
}

function formatPhone(phone: string) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    if (cleaned.length === 10) return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    return phone;
}

export default function PacientesPage() {
    const router = useRouter();
    const { hasPermission } = usePermissions();
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
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
        loadPacientes();
    }, [mounted, page, activeSearchTerm, sortBy, sortOrder, pageSize]);

    const loadPacientes = async () => {
        try {
            setLoading(true);
            const response = await api.get('/pacientes', {
                params: {
                    page,
                    pageSize,
                    sortBy,
                    sortOrder,
                    ...(activeSearchTerm.trim() ? { q: activeSearchTerm.trim() } : {}),
                },
            });
            setPacientes(response.data.data);
            setPagination(response.data.pagination);
        } catch (error: any) {
            console.error('Erro ao carregar pacientes:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar pacientes');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, nome: string) => {
        if (!confirm(`Tem certeza que deseja excluir o paciente "${nome}"?`)) return;
        try {
            await api.delete(`/paciente/${id}`, {});
            toast.success('Paciente excluído com sucesso!');
            loadPacientes();
        } catch (error: any) {
            console.error('Erro ao excluir paciente:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir paciente');
            }
        }
    };

    const renderActions = (paciente: Paciente) => (
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
            {hasPermission('pacientes.ver') && (
                <Link href={`/pacientes/${paciente.id}`} className={styles.btnIcon} title="Ver detalhes">
                    <FaEye size={14} />
                </Link>
            )}
            {hasPermission('pacientes.editar') && (
                <Link href={`/pacientes/${paciente.id}/editar`} className={`${styles.btnIcon} ${styles.btnIconEdit}`} title="Editar">
                    <FaEdit size={14} />
                </Link>
            )}
            {hasPermission('retiradas.criar') && (
                <Link
                    href={`/retiradas/novo?paciente=${paciente.id}`}
                    className={`${styles.btnIcon} ${styles.btnIconDoar}`}
                    title="Doar medicamento"
                >
                    <FaHandHoldingHeart size={14} />
                </Link>
            )}
            {hasPermission('pacientes.excluir') && (
                <button
                    type="button"
                    onClick={() => handleDelete(paciente.id, paciente.nome)}
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
        <WithPermission requiredPermission="pacientes.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <ListPageHeader
                            icon={<FaUserFriends size={24} />}
                            title="Pacientes"
                            subtitle="Gerencie os pacientes do sistema"
                            actions={
                                hasPermission('pacientes.criar') ? (
                                    <Link href="/pacientes/novo" className={styles.btnNew}>
                                        <FaPlus size={16} />
                                        Novo Paciente
                                    </Link>
                                ) : null
                            }
                        />

                        <ListSearchToolbar
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Buscar por nome, CPF, telefone ou cartão SUS…"
                            sortOptions={SORT_OPTIONS}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortByChange={setSortBy}
                            onSortOrderToggle={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
                        />

                        {loading ? (
                            <div className={styles.loading}>
                                <p>Carregando pacientes…</p>
                            </div>
                        ) : pacientes.length === 0 ? (
                            <div className={styles.empty}>
                                <p>
                                    {activeSearchTerm
                                        ? 'Nenhum paciente encontrado com os critérios de busca'
                                        : 'Nenhum paciente cadastrado'}
                                </p>
                                {!activeSearchTerm && hasPermission('pacientes.criar') && (
                                    <Link href="/pacientes/novo" className={styles.btnNew}>
                                        Cadastrar primeiro paciente
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
                                                <th>CPF</th>
                                                <th className={styles.hideMobile}>Telefone</th>
                                                <th className={styles.hideTablet}>Nascimento</th>
                                                <th className={styles.hideTablet}>Cartão SUS</th>
                                                <th className={styles.actionsCol}>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pacientes.map((paciente) => (
                                                <tr
                                                    key={paciente.id}
                                                    className={styles.row}
                                                    onClick={() => router.push(`/pacientes/${paciente.id}`)}
                                                >
                                                    <td>
                                                        <strong className={styles.primaryText}>{paciente.nome}</strong>
                                                    </td>
                                                    <td>{formatCPF(paciente.cpf)}</td>
                                                    <td className={styles.hideMobile}>{formatPhone(paciente.telefone)}</td>
                                                    <td className={styles.hideTablet}>{formatDate(paciente.datanascimento)}</td>
                                                    <td className={styles.hideTablet}>{paciente.cartaosus}</td>
                                                    <td className={styles.actionsCol}>{renderActions(paciente)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className={styles.mobileList}>
                                    {pacientes.map((paciente) => (
                                        <div
                                            key={paciente.id}
                                            className={`${styles.mobileCard} ${styles.mobileCardClickable}`}
                                            onClick={() => router.push(`/pacientes/${paciente.id}`)}
                                        >
                                            <div className={styles.mobileCardHeader}>
                                                <strong>{paciente.nome}</strong>
                                                <span className={styles.subText}>{formatCPF(paciente.cpf)}</span>
                                            </div>
                                            <p className={styles.mobileMeta}>{formatPhone(paciente.telefone)}</p>
                                            <p className={styles.mobileMeta}>SUS: {paciente.cartaosus}</p>
                                            <div className={styles.mobileActions}>{renderActions(paciente)}</div>
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
