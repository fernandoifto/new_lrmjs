'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { api } from '@/api/api';
import Header from '../home/components/header';
import HeaderRight from '../home/components/headerRight';
import { maskCPF } from '../agendar/utils/masks';
import styles from './page.module.css';
import { FaHandHoldingHeart } from 'react-icons/fa';

export default function SolicitarDoacaoPage() {
    const router = useRouter();
    const [cpf, setCpf] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = maskCPF(e.target.value);
        setCpf(masked);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const cpfLimpo = cpf.replace(/\D/g, '');
        if (cpfLimpo.length !== 11) {
            toast.error('Por favor, preencha um CPF válido!');
            return;
        }

        setLoading(true);

        try {
            // Buscar paciente por CPF (endpoint público)
            const response = await api.get(`/paciente/cpf/${cpfLimpo}`);
            const paciente = response.data;

            // Se paciente existe, redirecionar para lotes disponíveis
            toast.success('Paciente encontrado! Redirecionando...');
            setTimeout(() => {
                router.push(`/lotes-disponiveis?paciente=${paciente.id}`);
            }, 1000);
        } catch (error: any) {
            if (error.response?.status === 404) {
                // Paciente não encontrado, redirecionar para cadastro
                toast.info('Paciente não encontrado. Você será redirecionado para o cadastro.');
                setTimeout(() => {
                    router.push(`/pacientes/novo?cpf=${cpfLimpo}`);
                }, 1500);
            } else {
                toast.error('Erro ao verificar CPF. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header>
                <HeaderRight />
            </Header>
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.iconWrapper}>
                                <FaHandHoldingHeart size={20} />
                            </div>
                            <div>
                                <h1>Solicitar Doação</h1>
                                <p>Digite seu CPF para verificar se você já está cadastrado</p>
                            </div>
                        </div>
                        <div className={styles.cardBody}>
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="cpf">
                                        <span>CPF *</span>
                                        <input
                                            type="text"
                                            id="cpf"
                                            name="cpf"
                                            required
                                            placeholder="000.000.000-00"
                                            value={cpf}
                                            onChange={handleCPFChange}
                                            maxLength={14}
                                            disabled={loading}
                                        />
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className={styles.btnSubmit}
                                    disabled={loading}
                                >
                                    {loading ? 'Verificando...' : 'Verificar CPF'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
