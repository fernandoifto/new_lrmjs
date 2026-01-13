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
import { FaTags, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';

interface TipoMedicamento {
    id: number;
    descricao: string;
    created: string;
    modified: string;
}

export default function TiposMedicamentosPage() {
    const router = useRouter();
    const { hasPermission } = usePermissions();
    const [tiposMedicamentos, setTiposMedicamentos] = useState<TipoMedicamento[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        loadTiposMedicamentos();
    }, []);

    const loadTiposMedicamentos = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get('/tipos-medicamentos', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTiposMedicamentos(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar tipos de medicamentos:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar tipos de medicamentos');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, descricao: string) => {
        if (!confirm(`Tem certeza que deseja excluir o tipo de medicamento "${descricao}"?`)) {
            return;
        }

        try {
            const token = getCookieClient();
            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            await api.delete(`/tipo-medicamento/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Tipo de medicamento excluído com sucesso!');
            loadTiposMedicamentos();
        } catch (error: any) {
            console.error('Erro ao excluir tipo de medicamento:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao excluir tipo de medicamento');
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

    if (!mounted) {
        return null;
    }

    return (
        <WithPermission requiredPermission="tipos_medicamentos.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <FaTags size={24} />
                                </div>
                                <div>
                                    <h1>Tipos de Medicamentos</h1>
                                    <p>Gerencie os tipos de medicamentos do sistema</p>
                                </div>
                            </div>
                            {hasPermission('tipos_medicamentos.criar') && (
                                <Link href="/tipos-medicamentos/novo" className={styles.btnNew}>
                                    <FaPlus size={20} />
                                    Novo Tipo
                                </Link>
                            )}
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando...</p>
                            </div>
                        ) : tiposMedicamentos.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>Nenhum tipo de medicamento cadastrado</p>
                                {hasPermission('tipos_medicamentos.criar') && (
                                    <Link href="/tipos-medicamentos/novo" className={styles.btnNew}>
                                        Cadastrar Primeiro Tipo
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className={styles.grid}>
                                {tiposMedicamentos.map((tipo) => (
                                    <div key={tipo.id} className={styles.card}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.cardIcon}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                </svg>
                                            </div>
                                            <h3>{tipo.descricao}</h3>
                                        </div>
                                        <div className={styles.cardBody}>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Criado em:</span>
                                                <span>{formatDate(tipo.created)}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Modificado em:</span>
                                                <span>{formatDate(tipo.modified)}</span>
                                            </div>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            <Link href={`/tipos-medicamentos/${tipo.id}`} className={styles.btnView} title="Ver detalhes">
                                                <FaEye size={16} />
                                            </Link>
                                            {hasPermission('tipos_medicamentos.editar') && (
                                                <Link href={`/tipos-medicamentos/${tipo.id}/editar`} className={styles.btnEdit} title="Editar">
                                                    <FaEdit size={16} />
                                                </Link>
                                            )}
                                            {hasPermission('tipos_medicamentos.editar') && (
                                                <button
                                                    onClick={() => handleDelete(tipo.id, tipo.descricao)}
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

