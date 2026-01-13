'use client';

import { useEffect, useState, useRef } from 'react';
import { api } from '@/api/api';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../../home/components/header';
import Menu from '../../../components/menu';
import WithPermission from '@/components/withPermission';
import styles from './page.module.css';
import formStyles from '@/app/agendar/forms/style/styles.module.css';
import Link from 'next/link';

interface Medicamento {
    id: number;
    descricao: string;
    principioativo: string;
}

export default function EditarMedicamentoPage() {
    const router = useRouter();
    const params = useParams();
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [medicamento, setMedicamento] = useState<Medicamento | null>(null);
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        descricao: '',
        principioativo: ''
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
                descricao: response.data.descricao,
                principioativo: response.data.principioativo
            });
        } catch (error: any) {
            console.error('Erro ao carregar medicamento:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Medicamento não encontrado');
                router.push('/medicamentos/list');
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
        if (!medicamento) return;

        if (!formData.descricao || formData.descricao.trim() === '') {
            toast.error('Por favor, preencha a descrição!');
            return;
        }

        if (!formData.principioativo || formData.principioativo.trim() === '') {
            toast.error('Por favor, preencha o princípio ativo!');
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
            await api.put(`/medicamento/${medicamento.id}`, {
                descricao: formData.descricao.trim(),
                principioativo: formData.principioativo.trim()
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Medicamento atualizado com sucesso!');
            setTimeout(() => {
                router.push('/medicamentos/list');
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
            <>
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
            </>
        );
    }

    return (
        <WithPermission requiredPermission="medicamentos.editar">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/medicamentos/list" className={styles.btnBack}>
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
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
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
                                                    placeholder="Ex: Paracetamol, Ibuprofeno, etc." 
                                                    value={formData.descricao}
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        </div>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="principioativo">
                                                <span>Princípio Ativo *</span>
                                                <input 
                                                    type="text" 
                                                    id="principioativo" 
                                                    name="principioativo"
                                                    required 
                                                    placeholder="Ex: Paracetamol, Ibuprofeno, etc." 
                                                    value={formData.principioativo}
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

