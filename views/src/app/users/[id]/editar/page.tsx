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

interface Grupo {
    id: number;
    nome: string;
    descricao?: string;
}

interface User {
    id: number;
    username: string;
    email: string;
    role: string | null;
    grupos?: Grupo[];
}

export default function EditarUserPage() {
    const router = useRouter();
    const params = useParams();
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [mounted, setMounted] = useState(false);
    const [grupos, setGrupos] = useState<Grupo[]>([]);
    const [selectedGrupos, setSelectedGrupos] = useState<number[]>([]);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        setMounted(true);
        if (params.id) {
            loadUser(Number(params.id));
        }
    }, [params.id]);

    const loadUser = async (id: number) => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            const [userRes, gruposRes] = await Promise.all([
                api.get(`/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }),
                api.get('/roles', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            ]);

            setUser(userRes.data);
            setGrupos(gruposRes.data);
            setFormData({
                username: userRes.data.username,
                email: userRes.data.email,
                password: '',
                confirmPassword: ''
            });

            // Marcar grupos já atribuídos
            if (userRes.data.grupos) {
                const gruposIds = userRes.data.grupos.map((g: Grupo) => g.id);
                setSelectedGrupos(gruposIds);
            }
        } catch (error: any) {
            console.error('Erro ao carregar usuário:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Usuário não encontrado');
                router.push('/users/list');
            } else {
                toast.error('Erro ao carregar usuário');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleToggleGrupo = (grupoId: number) => {
        setSelectedGrupos(prev => {
            if (prev.includes(grupoId)) {
                return prev.filter(id => id !== grupoId);
            } else {
                return [...prev, grupoId];
            }
        });
    };

    const handleSelectAllGrupos = () => {
        const allGruposIds = grupos.map(g => g.id);
        setSelectedGrupos(allGruposIds);
    };

    const handleDeselectAllGrupos = () => {
        setSelectedGrupos([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        // Validações
        if (!formData.username || !formData.email) {
            toast.error('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        if (formData.password && formData.password !== formData.confirmPassword) {
            toast.error('As senhas não coincidem!');
            return;
        }

        if (formData.password && formData.password.length < 6) {
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
            // Atualizar dados do usuário
            const updateData: any = {
                username: formData.username,
                email: formData.email
            };

            if (formData.password) {
                updateData.password = formData.password;
            }

            await Promise.all([
                api.put(`/user/${user.id}`, updateData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }),
                api.put(`/user/${user.id}/grupos`, {
                    grupos_ids: selectedGrupos
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            ]);

            toast.success('Usuário atualizado com sucesso!');
            setTimeout(() => {
                router.push(`/users/${user.id}`);
            }, 1500);
        } catch (error: any) {
            console.error('Erro ao atualizar usuário:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao atualizar usuário');
            }
        } finally {
            setSaving(false);
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <WithPermission requiredPermission="admin">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link
                                href={user ? `/users/${user.id}` : '/users/list'}
                                className={styles.btnBack}
                            >
                                ← Voltar
                            </Link>
                            <h1>Editar Usuário</h1>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando dados...</p>
                            </div>
                        ) : !user ? (
                            <div className={styles.errorContainer}>
                                <p>Usuário não encontrado</p>
                                <Link href="/users/list" className={styles.btnBack}>
                                    Voltar para lista
                                </Link>
                            </div>
                        ) : (
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
                                        <h3>Alterar Senha (Opcional)</h3>
                                    </div>
                                    <div className={formStyles.cardBody}>
                                        <div className={formStyles.inputRow}>
                                            <div className={formStyles.inputGroup}>
                                            <label htmlFor="password">
                                                <span>Nova Senha</span>
                                                <input 
                                                    type="password" 
                                                    id="password" 
                                                    name="password"
                                                    placeholder="Deixe em branco para manter a senha atual" 
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    minLength={6}
                                                />
                                            </label>
                                        </div>
                                        {formData.password && (
                                                <div className={formStyles.inputGroup}>
                                                <label htmlFor="confirmPassword">
                                                    <span>Confirmar Nova Senha</span>
                                                    <input 
                                                        type="password" 
                                                        id="confirmPassword" 
                                                        name="confirmPassword"
                                                        placeholder="Confirme a nova senha" 
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        minLength={6}
                                                    />
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={formStyles.card}>
                                    <div className={formStyles.cardHeader}>
                                        <div className={formStyles.cardIcon}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                        </div>
                                        <h3>Grupos</h3>
                                    </div>
                                    <div className={formStyles.cardBody}>
                                        <div className={formStyles.gruposHeader}>
                                            <p>Selecione os grupos para este usuário:</p>
                                            <div className={formStyles.selectButtons}>
                                                <button
                                                    type="button"
                                                    onClick={handleSelectAllGrupos}
                                                    className={formStyles.btnSelectAll}
                                                >
                                                    Marcar Tudo
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleDeselectAllGrupos}
                                                    className={formStyles.btnDeselectAll}
                                                >
                                                    Desmarcar Tudo
                                                </button>
                                            </div>
                                        </div>
                                        {grupos.length === 0 ? (
                                            <div className={formStyles.emptyState}>
                                                <p>Nenhum grupo cadastrado. Crie grupos primeiro.</p>
                                            </div>
                                        ) : (
                                            <div className={formStyles.gruposList}>
                                                {grupos.map((grupo) => (
                                                    <label
                                                        key={grupo.id}
                                                        className={`${formStyles.grupoItem} ${selectedGrupos.includes(grupo.id) ? formStyles.selected : ''}`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedGrupos.includes(grupo.id)}
                                                            onChange={() => handleToggleGrupo(grupo.id)}
                                                        />
                                                        <div className={formStyles.grupoContent}>
                                                            <span className={formStyles.grupoNome}>{grupo.nome}</span>
                                                            {grupo.descricao && (
                                                                <span className={formStyles.grupoDescricao}>{grupo.descricao}</span>
                                                            )}
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
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
                        )}
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}

