'use client';

import { useEffect, useState, useRef } from 'react';
import { api } from '@/api/api';
import { useRouter, AppRouterInstance } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import { hooksAgendamentoForm, ITurno } from '@/app/agendar/hooks/hooksAgendamentoForm';
import { maskPhone, maskCEP } from '@/app/agendar/utils/masks';
import styles from './page.module.css';
import formStyles from '@/app/agendar/forms/style/styles.module.css';

interface ITurno {
    id: number;
    descricao: string;
}

export default function NovoAgendamentoPage() {
    const router = useRouter();
    const [turnos, setTurnos] = useState<ITurno[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        loadTurnos();
    }, []);

    const loadTurnos = async () => {
        try {
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get('/turnos');
            setTurnos(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar turnos:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar turnos');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <>
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <h1>Novo Agendamento</h1>
                            <p>Preencha os dados abaixo para criar um novo agendamento</p>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando dados...</p>
                            </div>
                        ) : (
                            <NovoAgendamentoForm turnos={turnos} router={router} />
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

function NovoAgendamentoForm({ turnos, router }: { turnos: ITurno[]; router: AppRouterInstance }) {
    const formRef = useRef<HTMLFormElement>(null);
    const { handleCreateAgendamento } = hooksAgendamentoForm(turnos);
    const [phoneValue, setPhoneValue] = useState('');
    const [cepValue, setCepValue] = useState('');

    const resetForm = () => {
        if (formRef.current) {
            formRef.current.reset();
            setPhoneValue('');
            setCepValue('');
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = maskPhone(e.target.value);
        setPhoneValue(masked);
    };

    const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = maskCEP(e.target.value);
        setCepValue(masked);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set('telefone', phoneValue.replace(/\D/g, ''));
        formData.set('cep', cepValue.replace(/\D/g, ''));
        
        const success = await handleCreateAgendamento(formData, resetForm);
        if (success) {
            setTimeout(() => {
                router.push('/agendamentos/list');
            }, 1500);
        }
    };

    return (
        <form 
            ref={formRef}
            className={formStyles.form} 
            onSubmit={handleSubmit}
        >
            {/* Cartão de Dados Pessoais */}
            <div className={formStyles.card}>
                <div className={formStyles.cardHeader}>
                    <div className={formStyles.cardIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
                        </svg>
                    </div>
                    <h3>Contato e endereço</h3>
                </div>
                <div className={formStyles.cardBody}>
                    <div className={formStyles.inputRow}>
                        <div className={formStyles.inputGroup}>
                            <label htmlFor="nome">
                                <span>Nome Completo</span>
                                <input type="text" id="nome" required placeholder="Seu nome completo" name="nome" />
                            </label>
                        </div>
                        <div className={formStyles.inputGroup}>
                            <label htmlFor="telefone">
                                <span>Telefone/WhatsApp</span>
                                <input 
                                    type="tel" 
                                    id="telefone" 
                                    required 
                                    placeholder="(XX) XXXXX-XXXX" 
                                    name="telefone" 
                                    value={phoneValue}
                                    onChange={handlePhoneChange}
                                    maxLength={15}
                                />
                            </label>
                        </div>
                    </div>
                    <div className={formStyles.inputRow}>
                        <div className={formStyles.inputGroup}>
                            <label htmlFor="endereco">
                                <span>Endereço</span>
                                <input type="text" id="endereco" required placeholder="Rua, Avenida, etc" name="endereco" />
                            </label>
                        </div>
                        <div className={formStyles.inputGroupSmall}>
                            <label htmlFor="numero">
                                <span>Número</span>
                                <input type="text" id="numero" required placeholder="Nº" name="numero" />
                            </label>
                        </div>
                        <div className={formStyles.inputGroup}>
                            <label htmlFor="setor">
                                <span>Bairro/Setor</span>
                                <input type="text" id="setor" required placeholder="Seu bairro ou setor" name="setor" />
                            </label>
                        </div>
                        <div className={formStyles.inputGroupSmall}>
                            <label htmlFor="cep">
                                <span>CEP</span>
                                <input 
                                    type="text" 
                                    id="cep" 
                                    required 
                                    placeholder="XXXXX-XXX" 
                                    name="cep" 
                                    value={cepValue}
                                    onChange={handleCEPChange}
                                    maxLength={9}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cartão de Detalhes da Coleta */}
            <div className={formStyles.card}>
                <div className={formStyles.cardHeader}>
                    <div className={formStyles.cardIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 8H4v8h16v-8zm-5-6H9v2H7V5H4v4h16V5h-3v2h-2V5zm-9 8h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z" fill="currentColor" />
                        </svg>
                    </div>
                    <h3>Melhor dia e horário para coleta</h3>
                </div>
                <div className={formStyles.cardBody}>
                    <div className={formStyles.inputRow}>
                        <div className={formStyles.inputGroup}>
                            <label htmlFor="turno">
                                <span>Turno</span>
                                <select id="turno" name="turno" required>
                                    {turnos.map((turno, index) => (
                                        <option key={turno.id} value={index}>
                                            {turno.descricao}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className={formStyles.inputGroup}>
                            <label htmlFor="datavisita">
                                <span>Melhor Data</span>
                                <textarea id="datavisita" placeholder="Qual melhores dias da semana ou do mês para a coleta?" required rows={2} name="datavisita" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={formStyles.formFooter}>
                <button type="submit" className={formStyles.btnSubmit}>Confirmar Agendamento</button>
            </div>
        </form>
    );
}

