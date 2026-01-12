'use client';

import { useState, useRef, useEffect } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import styles from './page.module.css';
import formStyles from '@/app/agendar/forms/style/styles.module.css';
import Link from 'next/link';

export default function NovaPermissaoPage() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        pagina: '',
        acao: ''
    });

    useEffect(() => {
        const token = getCookieClient();
        if (!token) {
            toast.error('Você precisa estar logado para acessar esta página');
            router.push('/login');
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nome || formData.nome.trim() === '') {
            toast.error('Por favor, preencha o nome da permissão!');
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
            await api.post('/permissao', {
                nome: formData.nome.trim(),
                descricao: formData.descricao.trim() || null,
                pagina: formData.pagina.trim() || null,
                acao: formData.acao.trim() || null
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Permissão criada com sucesso!');
            setTimeout(() => {
                router.push('/permissoes');
            }, 1500);
        } catch (error: any) {
            console.error('Erro ao criar permissão:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao criar permissão');
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/permissoes" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <h1>Nova Permissão</h1>
                            <p>Preencha os dados abaixo para criar uma nova permissão</p>
                        </div>

                        <form ref={formRef} className={formStyles.form} onSubmit={handleSubmit}>
                            <div className={formStyles.card}>
                                <div className={formStyles.cardHeader}>
                                    <div className={formStyles.cardIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 15v2M9 11.24l-1.5-1.5a4.5 4.5 0 0 1 0-6.36l6.36 6.36a4.5 4.5 0 0 1 0 6.36L9 11.24zM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                                        </svg>
                                    </div>
                                    <h3>Informações da Permissão</h3>
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
                                                    placeholder="Ex: medicamentos.ver, usuarios.criar, etc." 
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
                                                    placeholder="Descreva o que esta permissão permite fazer..." 
                                                    value={formData.descricao}
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="pagina">
                                                <span>Página</span>
                                                <input 
                                                    type="text" 
                                                    id="pagina" 
                                                    name="pagina"
                                                    placeholder="Ex: /medicamentos, /usuarios, etc." 
                                                    value={formData.pagina}
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        </div>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="acao">
                                                <span>Ação</span>
                                                <select 
                                                    id="acao" 
                                                    name="acao"
                                                    value={formData.acao}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Selecione uma ação</option>
                                                    <option value="ver">Ver</option>
                                                    <option value="criar">Criar</option>
                                                    <option value="editar">Editar</option>
                                                    <option value="excluir">Excluir</option>
                                                    <option value="gerenciar">Gerenciar</option>
                                                </select>
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
                                    {saving ? 'Criando...' : 'Criar Permissão'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}
