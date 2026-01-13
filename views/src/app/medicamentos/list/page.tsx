'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaPills, FaPlus, FaSearch, FaTimes, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';

interface Medicamento {
    id: number;
    descricao: string;
    principioativo: string;
    created: string;
    modified: string;
}

export default function MedicamentosListPage() {
    const router = useRouter();
    const { hasPermission } = usePermissions();
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
    const [filteredMedicamentos, setFilteredMedicamentos] = useState<Medicamento[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('descricao');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [activeSearchOption, setActiveSearchOption] = useState('descricao');

    useEffect(() => {
        setMounted(true);
        loadMedicamentos();
    }, []);

    useEffect(() => {
        filterMedicamentos();
    }, [medicamentos, activeSearchTerm, activeSearchOption]);

    const loadMedicamentos = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get('/medicamentos', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMedicamentos(response.data);
            setFilteredMedicamentos(response.data);
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
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.delete(`/medicamento/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const filterMedicamentos = () => {
        let filtered = [...medicamentos];
        
        if (activeSearchTerm.trim() !== '') {
            const searchLower = activeSearchTerm.toLowerCase().trim();
            filtered = filtered.filter(medicamento => {
                switch (activeSearchOption) {
                    case 'descricao':
                        return medicamento.descricao.toLowerCase().includes(searchLower);
                    case 'principioativo':
                        return medicamento.principioativo.toLowerCase().includes(searchLower);
                    default:
                        return true;
                }
            });
        }
        
        setFilteredMedicamentos(filtered);
    };

    const handleSearch = () => {
        setActiveSearchTerm(searchTerm);
        setActiveSearchOption(searchOption);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setActiveSearchTerm('');
        setActiveSearchOption('descricao');
        setSearchOption('descricao');
    };

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
                        <div className={styles.header}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <FaPills size={24} />
                                </div>
                                <div>
                                    <h1>Medicamentos</h1>
                                    <p>Gerencie os medicamentos do sistema</p>
                                </div>
                            </div>
                            {hasPermission('medicamentos.criar') && (
                                <Link href="/medicamentos/novo" className={styles.btnNew}>
                                    <FaPlus size={20} />
                                    Novo Medicamento
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
                                                value="descricao"
                                                checked={searchOption === 'descricao'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Descrição</span>
                                        </label>
                                        <label className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="searchOption"
                                                value="principioativo"
                                                checked={searchOption === 'principioativo'}
                                                onChange={(e) => setSearchOption(e.target.value)}
                                            />
                                            <span>Princípio Ativo</span>
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
                                            {filteredMedicamentos.length > 0 ? (
                                                <span>{filteredMedicamentos.length} resultado(s) encontrado(s)</span>
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
                                <p>Carregando...</p>
                            </div>
                        ) : filteredMedicamentos.length === 0 ? (
                            <div className={styles.emptyState}>
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
                            <div className={styles.grid}>
                                {filteredMedicamentos.map((medicamento) => (
                                    <div key={medicamento.id} className={styles.card}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.cardIcon}>
                                                <FaPills size={20} />
                                            </div>
                                            <h3>{medicamento.descricao}</h3>
                                        </div>
                                        <div className={styles.cardBody}>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Princípio Ativo:</span>
                                                <span>{medicamento.principioativo}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Criado em:</span>
                                                <span>{formatDate(medicamento.created)}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Modificado em:</span>
                                                <span>{formatDate(medicamento.modified)}</span>
                                            </div>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            <Link href={`/medicamentos/${medicamento.id}`} className={styles.btnView} title="Ver detalhes">
                                                <FaEye size={16} />
                                            </Link>
                                            {hasPermission('medicamentos.editar') && (
                                                <Link href={`/medicamentos/${medicamento.id}/editar`} className={styles.btnEdit} title="Editar">
                                                    <FaEdit size={16} />
                                                </Link>
                                            )}
                                            {hasPermission('medicamentos.editar') && (
                                                <button
                                                    onClick={() => handleDelete(medicamento.id, medicamento.descricao)}
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

