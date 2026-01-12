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

interface Lote {
    id: number;
    numero: string;
    datavencimento: string;
    datafabricacao: string;
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
    created: string;
    modified: string;
}

export default function LotesPage() {
    const router = useRouter();
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        loadLotes();
    }, []);

    const loadLotes = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get('/lotes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setLotes(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar lotes:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar lotes');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, numero: string) => {
        if (!confirm(`Tem certeza que deseja excluir o lote "${numero}"?`)) {
            return;
        }

        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.delete(`/lote/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Lote excluído com sucesso!');
            loadLotes();
        } catch (error: any) {
            console.error('Erro ao excluir lote:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir lote');
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

    const getVencimentoStatus = (dateString: string) => {
        const vencimento = new Date(dateString);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        vencimento.setHours(0, 0, 0, 0);
        
        const diffTime = vencimento.getTime() - hoje.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            return { status: 'vencido', days: diffDays, className: styles.expired };
        } else if (diffDays <= 90) {
            return { status: 'proximo', days: diffDays, className: styles.warning };
        } else {
            return { status: 'ok', days: diffDays, className: styles.safe };
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
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <div>
                                    <h1>Lotes</h1>
                                    <p>Gerencie os lotes de medicamentos do sistema</p>
                                </div>
                            </div>
                            <Link href="/lotes/novo" className={styles.btnNew}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 5v14m7-7H5" />
                                </svg>
                                Novo Lote
                            </Link>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando...</p>
                            </div>
                        ) : lotes.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>Nenhum lote cadastrado</p>
                                <Link href="/lotes/novo" className={styles.btnNew}>
                                    Cadastrar Primeiro Lote
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.grid}>
                                {lotes.map((lote) => {
                                    const vencimentoStatus = getVencimentoStatus(lote.datavencimento);
                                    return (
                                        <div key={lote.id} className={styles.card}>
                                            <div className={styles.cardHeader}>
                                                <div className={styles.cardIcon}>
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                    </svg>
                                                </div>
                                                <h3>Lote {lote.numero}</h3>
                                            </div>
                                            <div className={styles.cardBody}>
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Medicamento:</span>
                                                    <span>{lote.medicamento.descricao}</span>
                                                </div>
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Forma Farmacêutica:</span>
                                                    <span>{lote.formaFarmaceutica.descricao}</span>
                                                </div>
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Tipo:</span>
                                                    <span>{lote.tipoMedicamento.descricao}</span>
                                                </div>
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Quantidade:</span>
                                                    <span>{lote.qtde}</span>
                                                </div>
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Fabricação:</span>
                                                    <span>{formatDate(lote.datafabricacao)}</span>
                                                </div>
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Vencimento:</span>
                                                    <span className={vencimentoStatus.className}>
                                                        {formatDate(lote.datavencimento)}
                                                        {vencimentoStatus.status === 'vencido' && ' (Vencido)'}
                                                        {vencimentoStatus.status === 'proximo' && ` (${vencimentoStatus.days} dias)`}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={styles.cardFooter}>
                                                <Link href={`/lotes/${lote.id}`} className={styles.btnView}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                    Ver
                                                </Link>
                                                <Link href={`/lotes/${lote.id}/editar`} className={styles.btnEdit}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(lote.id, lote.numero)}
                                                    className={styles.btnDelete}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                    </svg>
                                                    Excluir
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

