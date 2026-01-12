'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../home/components/header';
import Menu from '../components/menu';
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
        <>
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
                                    </svg>
                                </div>
                                <div>
                                    <h1>Pacientes</h1>
                                    <p>Gerencie os pacientes do sistema</p>
                                </div>
                            </div>
                            <Link href="/pacientes/novo" className={styles.btnNew}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 5v14m7-7H5" />
                                </svg>
                                Novo Paciente
                            </Link>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className={styles.searchIcon}>
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="currentColor" />
                                        </svg>
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
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-4-9h8v2H8v-2z" fill="currentColor" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        className={styles.searchButton}
                                        title="Buscar"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="currentColor" />
                                        </svg>
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
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
                                                </svg>
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
                                            <Link href={`/pacientes/${paciente.id}`} className={styles.btnView} title="Ver detalhes">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            </Link>
                                            <Link href={`/pacientes/${paciente.id}/editar`} className={styles.btnEdit} title="Editar">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                            </Link>
                                            <Link 
                                                href={`/retiradas/novo?paciente=${paciente.id}`}
                                                className={styles.btnDoar}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                    <circle cx="8.5" cy="7" r="4" />
                                                    <path d="M20 8v6M23 11l-3-3-3 3" />
                                                </svg>
                                                Doar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(paciente.id, paciente.nome)}
                                                className={styles.btnDelete}
                                                title="Excluir"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

