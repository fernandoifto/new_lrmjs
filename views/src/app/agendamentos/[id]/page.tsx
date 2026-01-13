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
import { FaCheckCircle, FaEdit, FaTrash, FaUserCircle, FaArrowLeft } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';

interface Agendamento {
    id: number;
    nome: string;
    endereco: string;
    numero: string;
    setor: string;
    cep: string;
    telefone: string;
    datavisita: string | null;
    created: string;
    modified: string;
    turno: {
        id: number;
        descricao: string;
    };
    user: {
        id: number;
        username: string;
        email: string;
    } | null;
}

export default function AgendamentoViewPage() {
    const router = useRouter();
    const params = useParams();
    const { hasPermission } = usePermissions();
    const [agendamento, setAgendamento] = useState<Agendamento | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (params.id) {
            loadAgendamento(Number(params.id));
        }
    }, [params.id]);

    const loadAgendamento = async (id: number) => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get(`/agendamento/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAgendamento(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar agendamento:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Agendamento não encontrado');
                router.push('/agendamentos/list');
            } else {
                toast.error('Erro ao carregar agendamento');
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

    const formatPhone = (phone: string) => {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (cleaned.length === 10) {
            return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return phone;
    };

    const formatCEP = (cep: string) => {
        const cleaned = cep.replace(/\D/g, '');
        if (cleaned.length === 8) {
            return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
        }
        return cep;
    };

    const handleVisitar = async (id: number) => {
        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            // Obter o ID do usuário atual
            const userResponse = await api.get('/detail', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            await api.patch(`/agendamento/${id}/visitar?userId=${userResponse.data.id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Agendamento marcado como visitado!');
            loadAgendamento(id); // Recarrega a lista
        } catch (error: any) {
            console.error('Erro ao marcar como visitado:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao marcar como visitado');
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir este agendamento? Esta ação não pode ser desfeita.')) {
            return;
        }

        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.delete(`/agendamento/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Agendamento excluído com sucesso!');
            router.push('/agendamentos/list');
        } catch (error: any) {
            console.error('Erro ao excluir agendamento:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir agendamento');
            }
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <WithPermission requiredPermission="agendamentos.ver">
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/agendamentos/list" className={styles.btnBack}>
                                <FaArrowLeft size={16} /> Voltar
                            </Link>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                {agendamento && !agendamento.user && (
                                    <button
                                        onClick={() => handleVisitar(agendamento.id)}
                                        className={styles.btnVisitar}
                                        title="Marcar como visitado"
                                    >
                                        <FaCheckCircle size={18} />
                                        Visitar
                                    </button>
                                )}
                                {agendamento && agendamento.user && (
                                    <span className={styles.visitadoBadge}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
                                        </svg>
                                        Visitado
                                    </span>
                                )}
                                {agendamento && hasPermission('agendamentos.editar') && (
                                    <Link
                                        href={`/agendamentos/${agendamento.id}/editar`}
                                        className={styles.btnEdit}
                                    >
                                        Editar
                                    </Link>
                                )}
                                {agendamento && hasPermission('agendamentos.editar') && (
                                    <button
                                        onClick={() => handleDelete(agendamento.id)}
                                        className={styles.btnDelete}
                                        title="Excluir agendamento"
                                    >
                                        <FaTrash size={18} />
                                        Excluir
                                    </button>
                                )}
                            </div>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando agendamento...</p>
                            </div>
                        ) : !agendamento ? (
                            <div className={styles.errorContainer}>
                                <p>Agendamento não encontrado</p>
                                <Link href="/agendamentos/list" className={styles.btnBack}>
                                    Voltar para lista
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardIcon}>
                                <FaUserCircle size={24} />
                            </div>
                            <h1>{agendamento.nome}</h1>
                        </div>

                        <div className={styles.cardBody}>
                            <div className={styles.section}>
                                <h3>Informações de Contato</h3>
                                <div className={styles.infoGrid}>
                                    <div className={styles.infoItem}>
                                        <span className={styles.label}>Telefone/WhatsApp</span>
                                        <span className={styles.value}>{formatPhone(agendamento.telefone)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h3>Endereço</h3>
                                <div className={styles.infoGrid}>
                                    <div className={styles.infoItem}>
                                        <span className={styles.label}>Endereço</span>
                                        <span className={styles.value}>{agendamento.endereco}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.label}>Número</span>
                                        <span className={styles.value}>{agendamento.numero}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.label}>Bairro/Setor</span>
                                        <span className={styles.value}>{agendamento.setor}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.label}>CEP</span>
                                        <span className={styles.value}>{formatCEP(agendamento.cep)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h3>Detalhes da Coleta</h3>
                                <div className={styles.infoGrid}>
                                    <div className={styles.infoItem}>
                                        <span className={styles.label}>Turno</span>
                                        <span className={styles.value}>{agendamento.turno.descricao}</span>
                                    </div>
                                    {agendamento.datavisita && (
                                        <div className={styles.infoItem}>
                                            <span className={styles.label}>Melhor Data</span>
                                            <span className={styles.value}>{agendamento.datavisita}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h3>Informações do Sistema</h3>
                                <div className={styles.infoGrid}>
                                    <div className={styles.infoItem}>
                                        <span className={styles.label}>Criado em</span>
                                        <span className={styles.value}>{formatDate(agendamento.created)}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.label}>Última atualização</span>
                                        <span className={styles.value}>{formatDate(agendamento.modified)}</span>
                                    </div>
                                    {agendamento.user && (
                                        <div className={styles.infoItem}>
                                            <span className={styles.label}>Visitado por</span>
                                            <span className={styles.value}>{agendamento.user.username}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                        )}
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}

