'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import WithPermission from '@/components/withPermission';
import styles from './page.module.css';
import Link from 'next/link';

interface FormaFarmaceutica {
    id: number;
    descricao: string;
    created: string;
    modified: string;
}

export default function FormaFarmaceuticaViewPage() {
    const router = useRouter();
    const params = useParams();
    const [formaFarmaceutica, setFormaFarmaceutica] = useState<FormaFarmaceutica | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (params.id) {
            loadFormaFarmaceutica(Number(params.id));
        }
    }, [params.id]);

    const loadFormaFarmaceutica = async (id: number) => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get(`/forma-farmaceutica/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setFormaFarmaceutica(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar forma farmacêutica:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Forma farmacêutica não encontrada');
                router.push('/formas-farmaceuticas');
            } else {
                toast.error('Erro ao carregar forma farmacêutica');
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
        <WithPermission requiredPermission="formas_farmaceuticas.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/formas-farmaceuticas" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            {formaFarmaceutica && (
                                <Link 
                                    href={`/formas-farmaceuticas/${formaFarmaceutica.id}/editar`}
                                    className={styles.btnEdit}
                                >
                                    Editar
                                </Link>
                            )}
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando forma farmacêutica...</p>
                            </div>
                        ) : !formaFarmaceutica ? (
                            <div className={styles.errorContainer}>
                                <p>Forma farmacêutica não encontrada</p>
                                <Link href="/formas-farmaceuticas" className={styles.btnBack}>
                                    Voltar para lista
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                    </div>
                                    <h1>{formaFarmaceutica.descricao}</h1>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.section}>
                                        <h3>Informações da Forma Farmacêutica</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Descrição</span>
                                                <span className={styles.value}>{formaFarmaceutica.descricao}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.section}>
                                        <h3>Informações do Sistema</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Criado em</span>
                                                <span className={styles.value}>{formatDate(formaFarmaceutica.created)}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Última atualização</span>
                                                <span className={styles.value}>{formatDate(formaFarmaceutica.modified)}</span>
                                            </div>
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

