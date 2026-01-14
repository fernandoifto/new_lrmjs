'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaEdit, FaTrash, FaUserFriends, FaHandHoldingHeart } from 'react-icons/fa';
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
    retiradas?: {
        id: number;
        qtde: number;
        created: string;
        lotes: {
            id: number;
            numero: string;
            medicamento: {
                descricao: string;
                principioativo: string;
            };
        };
        user: {
            username: string;
        };
    }[];
}

export default function PacienteViewPage() {
    const router = useRouter();
    const params = useParams();
    const { hasPermission } = usePermissions();
    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (params.id) {
            loadPaciente(Number(params.id));
        }
    }, [params.id]);

    const loadPaciente = async (id: number) => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get(`/paciente/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setPaciente(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar paciente:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Paciente não encontrado');
                router.push('/pacientes');
            } else {
                toast.error('Erro ao carregar paciente');
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
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDateOnly = (dateString: string) => {
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

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir este paciente? Esta ação não pode ser desfeita.')) {
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
            router.push('/pacientes');
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
                            <Link href="/pacientes" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <div className={styles.headerActions}>
                                {paciente && hasPermission('pacientes.editar') && (
                                    <Link 
                                        href={`/pacientes/${paciente.id}/editar`}
                                        className={styles.btnEdit}
                                    >
                                        <FaEdit size={16} />
                                        Editar
                                    </Link>
                                )}
                                {paciente && hasPermission('pacientes.excluir') && (
                                    <button
                                        onClick={() => handleDelete(paciente.id)}
                                        className={styles.btnDelete}
                                        title="Excluir paciente"
                                    >
                                        <FaTrash size={18} />
                                        Excluir
                                    </button>
                                )}
                            </div>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando paciente...</p>
                            </div>
                        ) : !paciente ? (
                            <div className={styles.errorContainer}>
                                <p>Paciente não encontrado</p>
                                <Link href="/pacientes" className={styles.btnBack}>
                                    Voltar para lista
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>
                                        <FaUserFriends size={24} />
                                    </div>
                                    <h1>{paciente.nome}</h1>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.section}>
                                        <h3>Informações do Paciente</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Nome</span>
                                                <span className={styles.value}>{paciente.nome}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>CPF</span>
                                                <span className={styles.value}>{formatCPF(paciente.cpf)}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Data de Nascimento</span>
                                                <span className={styles.value}>{formatDateOnly(paciente.datanascimento)}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Telefone</span>
                                                <span className={styles.value}>{formatPhone(paciente.telefone)}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Cartão SUS</span>
                                                <span className={styles.value}>{paciente.cartaosus}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {paciente.retiradas && paciente.retiradas.length > 0 && (
                                        <div className={styles.section}>
                                            <h3>Histórico de Retiradas</h3>
                                            <div className={styles.retiradasList}>
                                                {paciente.retiradas.map((retirada) => (
                                                    <div key={retirada.id} className={styles.retiradaCard}>
                                                        <div className={styles.retiradaHeader}>
                                                            <div className={styles.retiradaInfo}>
                                                                <span className={styles.retiradaLabel}>Medicamento:</span>
                                                                <span className={styles.retiradaValue}>{retirada.lotes.medicamento.descricao}</span>
                                                            </div>
                                                            <div className={styles.retiradaInfo}>
                                                                <span className={styles.retiradaLabel}>Quantidade:</span>
                                                                <span className={styles.retiradaValue}>{retirada.qtde}</span>
                                                            </div>
                                                        </div>
                                                        <div className={styles.retiradaFooter}>
                                                            <div className={styles.retiradaInfo}>
                                                                <span className={styles.retiradaLabel}>Data:</span>
                                                                <span className={styles.retiradaValue}>{formatDate(retirada.created)}</span>
                                                            </div>
                                                            {hasPermission('retiradas.ver') && (
                                                                <Link href={`/retiradas/${retirada.id}`} className={styles.btnViewRetirada}>
                                                                    Ver Detalhes
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className={styles.section}>
                                        <h3>Informações do Sistema</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Criado em</span>
                                                <span className={styles.value}>{formatDate(paciente.created)}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Última atualização</span>
                                                <span className={styles.value}>{formatDate(paciente.modified)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {hasPermission('retiradas.criar') && (
                                    <div className={styles.cardFooter}>
                                        <Link 
                                            href={`/retiradas/novo?paciente=${paciente.id}`}
                                            className={styles.btnDoar}
                                        >
                                            <FaHandHoldingHeart size={18} />
                                            Registrar Doação
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}
