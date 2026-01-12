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

interface Medicamento {
    id: number;
    descricao: string;
    principioativo: string;
    created: string;
    modified: string;
}

export default function MedicamentoViewPage() {
    const router = useRouter();
    const params = useParams();
    const [medicamento, setMedicamento] = useState<Medicamento | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (params.id) {
            loadMedicamento(Number(params.id));
        }
    }, [params.id]);

    const loadMedicamento = async (id: number) => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get(`/medicamento/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMedicamento(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar medicamento:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Tipo de medicamento não encontrado');
                router.push('/medicamentos');
            } else {
                toast.error('Erro ao carregar medicamento');
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
                            <Link href="/medicamentos/list" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            {medicamento && (
                                <Link 
                                    href={`/medicamentos/${medicamento.id}/editar`}
                                    className={styles.btnEdit}
                                >
                                    Editar
                                </Link>
                            )}
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando medicamento...</p>
                            </div>
                        ) : !medicamento ? (
                            <div className={styles.errorContainer}>
                                <p>Medicamento não encontrado</p>
                                <Link href="/medicamentos/list" className={styles.btnBack}>
                                    Voltar para lista
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                    <h1>{medicamento.descricao}</h1>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.section}>
                                        <h3>Informações do Medicamento</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Descrição</span>
                                                <span className={styles.value}>{medicamento.descricao}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Princípio Ativo</span>
                                                <span className={styles.value}>{medicamento.principioativo}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.section}>
                                        <h3>Informações do Sistema</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Criado em</span>
                                                <span className={styles.value}>{formatDate(medicamento.created)}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Última atualização</span>
                                                <span className={styles.value}>{formatDate(medicamento.modified)}</span>
                                            </div>
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

