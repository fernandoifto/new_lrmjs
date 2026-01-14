'use client';

import { useState, useRef, useEffect } from 'react';
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
import { maskPhone, maskCPF } from '@/app/agendar/utils/masks';

export default function EditarPacientePage() {
    const router = useRouter();
    const params = useParams();
    const formRef = useRef<HTMLFormElement>(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [phoneValue, setPhoneValue] = useState('');
    const [cpfValue, setCpfValue] = useState('');
    const [formData, setFormData] = useState({
        nome: '',
        datanascimento: '',
        cartaosus: ''
    });

    useEffect(() => {
        setMounted(true);
        if (params.id) {
            loadPaciente(Number(params.id));
        }
    }, [params.id]);

    const loadPaciente = async (id: number) => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            const response = await api.get(`/paciente/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const paciente = response.data;
            setFormData({
                nome: paciente.nome || '',
                datanascimento: paciente.datanascimento ? paciente.datanascimento.split('T')[0] : '',
                cartaosus: paciente.cartaosus || ''
            });
            setCpfValue(paciente.cpf || '');
            setPhoneValue(paciente.telefone || '');
        } catch (error: any) {
            console.error('Erro ao carregar paciente:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Paciente não encontrado');
                router.push('/pacientes');
            } else {
                toast.error('Erro ao carregar paciente');
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

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = maskPhone(e.target.value);
        setPhoneValue(masked);
    };

    const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = maskCPF(e.target.value);
        setCpfValue(masked);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nome || formData.nome.trim() === '') {
            toast.error('Por favor, preencha o nome!');
            return;
        }

        if (!cpfValue || cpfValue.replace(/\D/g, '').length !== 11) {
            toast.error('Por favor, preencha um CPF válido!');
            return;
        }

        if (!formData.datanascimento) {
            toast.error('Por favor, preencha a data de nascimento!');
            return;
        }

        if (!phoneValue || phoneValue.replace(/\D/g, '').length < 10) {
            toast.error('Por favor, preencha um telefone válido!');
            return;
        }

        if (!formData.cartaosus || formData.cartaosus.trim() === '') {
            toast.error('Por favor, preencha o Cartão SUS!');
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
            await api.put(`/paciente/${params.id}`, {
                nome: formData.nome.trim(),
                cpf: cpfValue.replace(/\D/g, ''),
                datanascimento: formData.datanascimento,
                telefone: phoneValue.replace(/\D/g, ''),
                cartaosus: formData.cartaosus.trim()
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Paciente atualizado com sucesso!');
            setTimeout(() => {
                router.push(`/pacientes/${params.id}`);
            }, 1500);
        } catch (error: any) {
            console.error('Erro ao atualizar paciente:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao atualizar paciente');
            }
        } finally {
            setSaving(false);
        }
    };

    if (!mounted) {
        return null;
    }

    if (loading) {
        return (
            <WithPermission requiredPermission="pacientes.editar">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <p>Carregando...</p>
                </div>
            </WithPermission>
        );
    }

    return (
        <WithPermission requiredPermission="pacientes.editar">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href={`/pacientes/${params.id}`} className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <h1>Editar Paciente</h1>
                            <p>Atualize os dados do paciente abaixo</p>
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
                                    <h3>Informações do Paciente</h3>
                                </div>
                                <div className={formStyles.cardBody}>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="nome">
                                                <span>Nome Completo *</span>
                                                <input 
                                                    type="text" 
                                                    id="nome" 
                                                    name="nome"
                                                    required 
                                                    placeholder="Nome completo do paciente" 
                                                    value={formData.nome}
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        </div>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="cpf">
                                                <span>CPF *</span>
                                                <input 
                                                    type="text" 
                                                    id="cpf" 
                                                    name="cpf"
                                                    required 
                                                    placeholder="000.000.000-00" 
                                                    value={cpfValue}
                                                    onChange={handleCPFChange}
                                                    maxLength={14}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="datanascimento">
                                                <span>Data de Nascimento *</span>
                                                <input 
                                                    type="date" 
                                                    id="datanascimento" 
                                                    name="datanascimento"
                                                    required 
                                                    value={formData.datanascimento}
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        </div>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="telefone">
                                                <span>Telefone *</span>
                                                <input 
                                                    type="text" 
                                                    id="telefone" 
                                                    name="telefone"
                                                    required 
                                                    placeholder="(00) 00000-0000" 
                                                    value={phoneValue}
                                                    onChange={handlePhoneChange}
                                                    maxLength={15}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="cartaosus">
                                                <span>Cartão SUS *</span>
                                                <input 
                                                    type="text" 
                                                    id="cartaosus" 
                                                    name="cartaosus"
                                                    required 
                                                    placeholder="Número do Cartão SUS" 
                                                    value={formData.cartaosus}
                                                    onChange={handleChange}
                                                    maxLength={20}
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
