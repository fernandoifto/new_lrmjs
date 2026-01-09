'use client';

import { useState, useRef } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import styles from './page.module.css';
import formStyles from '@/app/agendar/forms/style/styles.module.css';
import Link from 'next/link';

export default function NovoUserPage() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validações
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('As senhas não coincidem!');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('A senha deve ter no mínimo 6 caracteres!');
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
            await api.post('/user', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: formData.role || null
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Usuário criado com sucesso!');
            setTimeout(() => {
                router.push('/users/list');
            }, 1500);
        } catch (error: any) {
            console.error('Erro ao criar usuário:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao criar usuário');
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
                            <Link href="/users/list" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <h1>Novo Usuário</h1>
                            <p>Preencha os dados abaixo para criar um novo usuário</p>
                        </div>

                        <form ref={formRef} className={formStyles.form} onSubmit={handleSubmit}>
                            <div className={formStyles.card}>
                                <div className={formStyles.cardHeader}>
                                    <div className={formStyles.cardIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <h3>Informações do Usuário</h3>
                                </div>
                                <div className={formStyles.cardBody}>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                        <label htmlFor="username">
                                            <span>Nome de Usuário *</span>
                                            <input 
                                                type="text" 
                                                id="username" 
                                                name="username"
                                                required 
                                                placeholder="Nome de usuário" 
                                                value={formData.username}
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>
                                        <div className={formStyles.inputGroup}>
                                        <label htmlFor="email">
                                            <span>Email *</span>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                name="email"
                                                required 
                                                placeholder="email@exemplo.com" 
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>
                                    </div>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                        <label htmlFor="role">
                                            <span>Função</span>
                                            <select 
                                                id="role" 
                                                name="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                            >
                                                <option value="">Sem função</option>
                                                <option value="Administrador">Administrador</option>
                                                <option value="Farmacêutico(a)">Farmacêutico(a)</option>
                                                <option value="Usuário">Usuário</option>
                                            </select>
                                        </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={formStyles.card}>
                                <div className={formStyles.cardHeader}>
                                    <div className={formStyles.cardIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M12 17a2 2 0 0 0 2-2c0-1.11-.89-2-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2h1m-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3Z" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <h3>Senha</h3>
                                </div>
                                <div className={formStyles.cardBody}>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                        <label htmlFor="password">
                                            <span>Senha *</span>
                                            <input 
                                                type="password" 
                                                id="password" 
                                                name="password"
                                                required 
                                                placeholder="Mínimo 6 caracteres" 
                                                value={formData.password}
                                                onChange={handleChange}
                                                minLength={6}
                                            />
                                        </label>
                                    </div>
                                        <div className={formStyles.inputGroup}>
                                        <label htmlFor="confirmPassword">
                                            <span>Confirmar Senha *</span>
                                            <input 
                                                type="password" 
                                                id="confirmPassword" 
                                                name="confirmPassword"
                                                required 
                                                placeholder="Confirme a senha" 
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                minLength={6}
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
                                    {saving ? 'Criando...' : 'Criar Usuário'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

