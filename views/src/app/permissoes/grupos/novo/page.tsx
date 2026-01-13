'use client';

import { useState, useRef, useEffect } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../../home/components/header';
import Menu from '../../../components/menu';
import WithPermission from '@/components/withPermission';
import styles from './page.module.css';
import formStyles from '@/app/agendar/forms/style/styles.module.css';
import Link from 'next/link';

export default function NovoGrupoPage() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: ''
    });

    useEffect(() => {
        const token = getCookieClient();
        if (!token) {
            toast.error('Você precisa estar logado para acessar esta página');
            router.push('/login');
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nome || formData.nome.trim() === '') {
            toast.error('Por favor, preencha o nome do grupo!');
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
            const response = await api.post('/role', {
                nome: formData.nome.trim(),
                descricao: formData.descricao.trim() || null
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data) {
                toast.success('Grupo criado com sucesso!');
                setTimeout(() => {
                    router.push(`/permissoes/grupos/${response.data.id}`);
                }, 1500);
            }
        } catch (error: any) {
            console.error('Erro ao criar grupo:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao criar grupo');
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <WithPermission requiredPermission="admin">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/permissoes" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <h1>Novo Grupo</h1>
                            <p>Preencha os dados abaixo para criar um novo grupo</p>
                        </div>

                        <form ref={formRef} className={formStyles.form} onSubmit={handleSubmit}>
                            <div className={formStyles.card}>
                                <div className={formStyles.cardHeader}>
                                    <div className={formStyles.cardIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </div>
                                    <h3>Informações do Grupo</h3>
                                </div>
                                <div className={formStyles.cardBody}>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="nome">
                                                <span>Nome *</span>
                                                <input 
                                                    type="text" 
                                                    id="nome" 
                                                    name="nome"
                                                    required 
                                                    placeholder="Ex: Farmacêutico, Atendente, etc." 
                                                    value={formData.nome}
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="descricao">
                                                <span>Descrição</span>
                                                <textarea 
                                                    id="descricao" 
                                                    name="descricao"
                                                    rows={4}
                                                    placeholder="Descreva as responsabilidades deste grupo..." 
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
                                    {saving ? 'Criando...' : 'Criar Grupo'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}
