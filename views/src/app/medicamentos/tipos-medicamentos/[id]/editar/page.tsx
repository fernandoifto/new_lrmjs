'use client';

import { useEffect, useState, useRef } from 'react';
import { api } from '@/api/api';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../../../home/components/header';
import Menu from '../../../../components/menu';
import WithPermission from '@/components/withPermission';
import styles from './page.module.css';
import formStyles from '@/app/agendar/forms/style/styles.module.css';
import Link from 'next/link';

interface Medicamento {
    id: number;
    descricao: string;
}

export default function EditarMedicamentoPage() {
    const router = useRouter();
    const params = useParams();
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [tipoMedicamento, setMedicamento] = useState<Medicamento | null>(null);
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        descricao: ''
    });

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
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            const response = await api.get(`/medicamento/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMedicamento(response.data);
            setFormData({
                descricao: response.data.descricao
            });
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tipoMedicamento) return;

        if (!formData.descricao || formData.descricao.trim() === '') {
            toast.error('Por favor, preencha a descrição!');
            return;
        }

        setSaving(true);
        const token = getCookieClient();

        if (!token) {
            toast.error('Você precisa estar logado');
            router.push('/login');
            return;
        }

        try {
            await api.put(`/medicamento/${tipoMedicamento.id}`, {
                descricao: formData.descricao.trim()
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Tipo de medicamento atualizado com sucesso!');
            setTimeout(() => {
                router.push('/medicamentos');
            }, 1500);
        } catch (error: any) {
            console.error('Erro ao atualizar medicamento:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao atualizar medicamento');
            }
        } finally {
            setSaving(false);
        }
    };

    if (!mounted || loading) {
        return (
            <WithPermission requiredPermission="tipos_medicamentos.editar">
                <Header />
                <Menu />
                <main className={styles.main}>
                    <div className={styles.container}>
                        <div className={styles.contentWrapper}>
                            <div className={styles.loadingContainer}>
                                <p>Carregando...</p>
                            </div>
                        </div>
                    </div>
                </main>
            </WithPermission>
        );
    }

    return (
        <>
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/medicamentos" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <h1>Editar Medicamento</h1>
                            <p>Atualize os dados do medicamento</p>
                        </div>

                        <form ref={formRef} className={formStyles.form} onSubmit={handleSubmit}>
                            <div className={formStyles.card}>
                                <div className={formStyles.cardHeader}>
                                    <div className={formStyles.cardIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                    </div>
                                    <h3>Informações do Medicamento</h3>
                                </div>
                                <div className={formStyles.cardBody}>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="descricao">
                                                <span>Descrição *</span>
                                                <input 
                                                    type="text" 
                                                    id="descricao" 
                                                    name="descricao"
                                                    required 
                                                    placeholder="Ex: Antibiótico, Analgésico, etc." 
                                                    value={formData.descricao}
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={formStyles.formFooter}>
                                <button
                                    type="submit"
                                    className={formStyles.btnSubmit}
                                    disabled={saving}
                                >
                                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}

