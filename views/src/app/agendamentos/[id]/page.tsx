'use client';
import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
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
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/agendamentos/list" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                {agendamento && !agendamento.user && (
                                    <button
                                        onClick={() => handleVisitar(agendamento.id)}
                                        className={styles.btnVisitar}
                                        title="Marcar como visitado"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
                                        </svg>
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
                                {agendamento && (
                                    <Link 
                                        href={`/agendamentos/${agendamento.id}/editar`}
                                        className={styles.btnEdit}
                                    >
                                        Editar
                                    </Link>
                                )}
                                {agendamento && (
                                    <button
                                        onClick={() => handleDelete(agendamento.id)}
                                        className={styles.btnDelete}
                                        title="Excluir agendamento"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" fill="currentColor" />
                                        </svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
                                </svg>
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
        </>
    );
}

