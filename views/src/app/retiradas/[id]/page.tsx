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

interface Retirada {
    id: number;
    qtde: number;
    created: string;
    modified: string;
    lotes: {
        id: number;
        numero: string;
        qtde: number;
        medicamento: {
            id: number;
            descricao: string;
            principioativo: string;
        };
        formaFarmaceutica: {
            id: number;
            descricao: string;
        };
        tipoMedicamento: {
            id: number;
            descricao: string;
        };
    };
    paciente: {
        id: number;
        nome: string;
        cpf: string;
        telefone: string;
        cartaosus: string;
        datanascimento: string;
    };
    user: {
        id: number;
        username: string;
        email: string;
    };
}

export default function RetiradaViewPage() {
    const router = useRouter();
    const params = useParams();
    const [retirada, setRetirada] = useState<Retirada | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (params.id) {
            loadRetirada(Number(params.id));
        }
    }, [params.id]);

    const loadRetirada = async (id: number) => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get(`/retirada/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setRetirada(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar retirada:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Retirada não encontrada');
                router.push('/retiradas');
            } else {
                toast.error('Erro ao carregar retirada');
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

    const formatCPF = (cpf: string) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
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
                            <Link href="/retiradas" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <div className={styles.headerContent}>
                                <h1>Detalhes da Retirada</h1>
                            </div>
                            {retirada && (
                                <Link href={`/retiradas/${retirada.id}/editar`} className={styles.btnEdit}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                    Editar
                                </Link>
                            )}
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando retirada...</p>
                            </div>
                        ) : !retirada ? (
                            <div className={styles.errorContainer}>
                                <p>Retirada não encontrada</p>
                                <Link href="/retiradas" className={styles.btnBack}>
                                    Voltar para lista
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <h1>Retirada #{retirada.id}</h1>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.section}>
                                        <h2>Informações do Paciente</h2>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Nome:</span>
                                            <span>{retirada.paciente.nome}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>CPF:</span>
                                            <span>{formatCPF(retirada.paciente.cpf)}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Telefone:</span>
                                            <span>{retirada.paciente.telefone}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Cartão SUS:</span>
                                            <span>{retirada.paciente.cartaosus}</span>
                                        </div>
                                    </div>

                                    <div className={styles.section}>
                                        <h2>Informações do Medicamento</h2>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Medicamento:</span>
                                            <span>{retirada.lotes.medicamento.descricao}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Princípio Ativo:</span>
                                            <span>{retirada.lotes.medicamento.principioativo}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Forma Farmacêutica:</span>
                                            <span>{retirada.lotes.formaFarmaceutica.descricao}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Tipo de Medicamento:</span>
                                            <span>{retirada.lotes.tipoMedicamento.descricao}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Lote:</span>
                                            <span>{retirada.lotes.numero}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Quantidade Retirada:</span>
                                            <span className={styles.highlight}>{retirada.qtde}</span>
                                        </div>
                                    </div>

                                    <div className={styles.section}>
                                        <h2>Informações da Retirada</h2>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Data de Registro:</span>
                                            <span>{formatDate(retirada.created)}</span>
                                        </div>
                                        {retirada.modified && retirada.modified !== retirada.created && (
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Última Modificação:</span>
                                                <span>{formatDate(retirada.modified)}</span>
                                            </div>
                                        )}
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Registrado por:</span>
                                            <span>{retirada.user.username}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Email do Usuário:</span>
                                            <span>{retirada.user.email}</span>
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

