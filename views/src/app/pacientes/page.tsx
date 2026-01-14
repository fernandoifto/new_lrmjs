'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaUserFriends, FaPlus, FaSearch, FaTimes, FaEye, FaEdit, FaTrash, FaHandHoldingHeart } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';

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

export default function PacientesPage() {
    const router = useRouter();
    const { hasPermission } = usePermissions();
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [filteredPacientes, setFilteredPacientes] = useState<Paciente[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('nome');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [activeSearchOption, setActiveSearchOption] = useState('nome');

    useEffect(() => {
        setMounted(true);
        loadPacientes();
    }, []);

    useEffect(() => {
        filterPacientes();
    }, [pacientes, activeSearchTerm, activeSearchOption]);

    const loadPacientes = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get('/pacientes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setPacientes(response.data);
            setFilteredPacientes(response.data);
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCPF = (cpf: string) => {
        const cleaned = cpf.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
        return cpf;
    };

    const formatPhone = (phone: string) => {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (cleaned.length === 10) {
            return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return phone;
    };

    const filterPacientes = () => {
        let filtered = [...pacientes];
        
        if (activeSearchTerm.trim() !== '') {
            const searchLower = activeSearchTerm.toLowerCase().trim();
            filtered = filtered.filter(paciente => {
                switch (activeSearchOption) {
                    case 'nome':
                        return paciente.nome.toLowerCase().includes(searchLower);
                    case 'cpf':
                        return paciente.cpf.replace(/\D/g, '').includes(searchLower.replace(/\D/g, ''));
                    case 'telefone':
                        return paciente.telefone.replace(/\D/g, '').includes(searchLower.replace(/\D/g, ''));
                    case 'cartaosus':
                        return paciente.cartaosus.toLowerCase().includes(searchLower);
                    default:
                        return true;
                }
            });
        }
        
        setFilteredPacientes(filtered);
    };

    const handleSearch = () => {
        setActiveSearchTerm(searchTerm);
        setActiveSearchOption(searchOption);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setActiveSearchTerm('');
        setActiveSearchOption('nome');
        setSearchOption('nome');
    };

    const handleDelete = async (id: number, nome: string) => {
        if (!confirm(`Tem certeza que deseja excluir o paciente "${nome}"?`)) {
            return;
        }

        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.delete(`/paciente/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

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

    if (!mounted) {
        return null;
    }

    return (
        <WithPermission requiredPermission="pacientes.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <FaUserFriends size={24} />
                                </div>
                                <div>
                                    <h1>Pacientes</h1>
                                    <p>Gerencie os pacientes do sistema</p>
                                </div>
                            </div>
                            {hasPermission('pacientes.criar') && (
                                <Link href="/pacientes/novo" className={styles.btnNew}>
                                    <FaPlus size={20} />
                                    Novo Paciente
                                </Link>
                            )}
                        </div>

                        {/* Campo de Busca */}
                        <div className={styles.searchContainer}>
                            <div className={styles.searchPanel}>
                                <div className={styles.searchHeader}>
                                    <b>Buscar por:</b>
                                    <div className={styles.searchOptions}>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="nome"
                                                checked={searchOption === 'nome'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Nome</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="cpf"
                                                checked={searchOption === 'cpf'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>CPF</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="telefone"
                                                checked={searchOption === 'telefone'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Telefone</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="cartaosus"
                                                checked={searchOption === 'cartaosus'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Cartão SUS</span>
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.searchBody}>
                                    <div className={styles.searchBox}>
                                        <FaSearch size={20} className={styles.searchIcon} />
                                        <input
                                            type="text"
                                            placeholder="Digite aqui sua pesquisa"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSearch();
                                                }
                                            }}
                                            className={styles.searchInput}
                                        />
                                        {searchTerm && (
                                            <button
                                                onClick={handleClearSearch}
                                                className={styles.clearButton}
                                                title="Limpar busca"
                                            >
                                                <FaTimes size={18} />
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        className={styles.searchButton}
                                        title="Buscar"
                                    >
                                        <FaSearch size={20} />
                                        Buscar
                                    </button>
                                    {activeSearchTerm && (
                                        <div className={styles.searchResults}>
                                            {filteredPacientes.length > 0 ? (
                                                <span>{filteredPacientes.length} resultado(s) encontrado(s)</span>
                                            ) : (
                                                <span>Nenhum resultado encontrado</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando pacientes...</p>
                            </div>
                        ) : filteredPacientes.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>
                                    {activeSearchTerm 
                                        ? 'Nenhum paciente encontrado com os critérios de busca' 
                                        : 'Nenhum paciente cadastrado'}
                                </p>
                                {!activeSearchTerm && (
                                    <Link href="/pacientes/novo" className={styles.btnNew}>
                                        Cadastrar Primeiro Paciente
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className={styles.grid}>
                                {filteredPacientes.map((paciente) => (
                                    <div key={paciente.id} className={styles.card}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.cardIcon}>
                                                <FaUserFriends size={20} />
                                            </div>
                                            <h3>{paciente.nome}</h3>
                                        </div>
                                        <div className={styles.cardBody}>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>CPF:</span>
                                                <span>{formatCPF(paciente.cpf)}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Telefone:</span>
                                                <span>{formatPhone(paciente.telefone)}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Data de Nascimento:</span>
                                                <span>{formatDate(paciente.datanascimento)}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Cartão SUS:</span>
                                                <span>{paciente.cartaosus}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Cadastrado em:</span>
                                                <span>{formatDate(paciente.created)}</span>
                                            </div>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            {hasPermission('pacientes.ver') && (
                                                <Link href={`/pacientes/${paciente.id}`} className={styles.btnView} title="Ver detalhes">
                                                    <FaEye size={16} />
                                                </Link>
                                            )}
                                            {hasPermission('pacientes.editar') && (
                                                <Link href={`/pacientes/${paciente.id}/editar`} className={styles.btnEdit} title="Editar">
                                                    <FaEdit size={16} />
                                                </Link>
                                            )}
                                            {hasPermission('retiradas.criar') && (
                                                <Link 
                                                    href={`/retiradas/novo?paciente=${paciente.id}`}
                                                    className={styles.btnDoar}
                                                    title="Doar medicamento"
                                                >
                                                    <FaHandHoldingHeart size={16} />
                                                    Doar
                                                </Link>
                                            )}
                                            {hasPermission('pacientes.excluir') && (
                                                <button
                                                    onClick={() => handleDelete(paciente.id, paciente.nome)}
                                                    className={styles.btnDelete}
                                                    title="Excluir"
                                                >
                                                    <FaTrash size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}

