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
import Link from 'next/link';
import { maskPhone, maskCEP } from '@/app/agendar/utils/masks';

interface Agendamento {
    id: number;
    nome: string;
    endereco: string;
    numero: string;
    setor: string;
    cep: string;
    telefone: string;
    datavisita: string | null;
    id_turno: number;
    user: {
        id: number;
        username: string;
        email: string;
    } | null;
}

interface Turno {
    id: number;
    descricao: string;
}

interface User {
    id: number;
    username: string;
    email: string;
}

export default function EditarAgendamentoPage() {
    const router = useRouter();
    const params = useParams();
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [agendamento, setAgendamento] = useState<Agendamento | null>(null);
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [phoneValue, setPhoneValue] = useState('');
    const [cepValue, setCepValue] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (params.id) {
            loadData(Number(params.id));
        }
    }, [params.id]);

    const loadData = async (id: number) => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            // Carregar turnos
            const turnosResponse = await api.get('/turnos');
            setTurnos(turnosResponse.data);

            // Carregar usuários
            const usersResponse = await api.get('/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(usersResponse.data);

            // Carregar agendamento
            const agendamentoResponse = await api.get(`/agendamento/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const agendamentoData = agendamentoResponse.data;
            setAgendamento(agendamentoData);
            setPhoneValue(agendamentoData.telefone);
            setCepValue(agendamentoData.cep);
        } catch (error: any) {
            console.error('Erro ao carregar dados:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Agendamento não encontrado');
                router.push('/agendamentos/list');
            } else {
                toast.error('Erro ao carregar dados');
            }
        } finally {
            setLoading(false);
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
        if (!agendamento) return;

        setSaving(true);
        const token = getCookieClient();

        if (!token) {
            toast.error('Você precisa estar logado');
            router.push('/login');
            return;
        }

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const turnoIndex = parseInt(formData.get('turno') as string);
        const selectedTurno = turnos[turnoIndex];

        if (!selectedTurno) {
            toast.error('Turno inválido!');
            setSaving(false);
            return;
        }

        const idUserValue = formData.get('id_user');
        const id_user = idUserValue && idUserValue !== '' ? parseInt(idUserValue as string) : null;

        try {
            const response = await api.put(
                `/agendamento/${agendamento.id}`,
                {
                    nome: formData.get('nome'),
                    endereco: formData.get('endereco'),
                    numero: formData.get('numero'),
                    setor: formData.get('setor'),
                    cep: cepValue.replace(/\D/g, ''),
                    telefone: phoneValue.replace(/\D/g, ''),
                    datavisita: formData.get('datavisita'),
                    id_turno: selectedTurno.id,
                    id_user: id_user
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data) {
                toast.success('Agendamento atualizado com sucesso!');
                router.push(`/agendamentos/${agendamento.id}`);
            }
        } catch (error: any) {
            console.error('Erro ao atualizar agendamento:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao atualizar agendamento');
            }
        } finally {
            setSaving(false);
        }
    };

    if (!mounted) {
        return null;
    }

    // Encontrar o índice do turno atual
    const currentTurnoIndex = agendamento ? turnos.findIndex(t => t.id === agendamento.id_turno) : -1;

    return (
        <WithPermission requiredPermission="agendamentos.editar">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link 
                                href={agendamento ? `/agendamentos/${agendamento.id}` : '/agendamentos/list'} 
                                className={styles.btnBack}
                            >
                                ← Voltar
                            </Link>
                            <h1>Editar Agendamento</h1>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando dados...</p>
                            </div>
                        ) : !agendamento ? (
                            <div className={styles.errorContainer}>
                                <p>Agendamento não encontrado</p>
                                <Link href="/agendamentos/list" className={styles.btnBack}>
                                    Voltar para lista
                                </Link>
                            </div>
                        ) : (
                            <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
                        {/* Cartão de Dados Pessoais */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
                                    </svg>
                                </div>
                                <h3>Contato e endereço</h3>
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.inputRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="nome">
                                            <span>Nome Completo</span>
                                            <input 
                                                type="text" 
                                                id="nome" 
                                                required 
                                                placeholder="Seu nome completo" 
                                                name="nome" 
                                                defaultValue={agendamento.nome}
                                            />
                                        </label>
                                    </div>
                                    <div className={styles.inputGroup}>
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
                                <div className={styles.inputRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="endereco">
                                            <span>Endereço</span>
                                            <input 
                                                type="text" 
                                                id="endereco" 
                                                required 
                                                placeholder="Rua, Avenida, etc" 
                                                name="endereco" 
                                                defaultValue={agendamento.endereco}
                                            />
                                        </label>
                                    </div>
                                    <div className={styles.inputGroupSmall}>
                                        <label htmlFor="numero">
                                            <span>Número</span>
                                            <input 
                                                type="text" 
                                                id="numero" 
                                                required 
                                                placeholder="Nº" 
                                                name="numero" 
                                                defaultValue={agendamento.numero}
                                            />
                                        </label>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="setor">
                                            <span>Bairro/Setor</span>
                                            <input 
                                                type="text" 
                                                id="setor" 
                                                required 
                                                placeholder="Seu bairro ou setor" 
                                                name="setor" 
                                                defaultValue={agendamento.setor}
                                            />
                                        </label>
                                    </div>
                                    <div className={styles.inputGroupSmall}>
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
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 8H4v8h16v-8zm-5-6H9v2H7V5H4v4h16V5h-3v2h-2V5zm-9 8h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z" fill="currentColor" />
                                    </svg>
                                </div>
                                <h3>Melhor dia e horário para coleta</h3>
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.inputRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="turno">
                                            <span>Turno</span>
                                            <select id="turno" name="turno" required defaultValue={currentTurnoIndex}>
                                                {turnos.map((turno, index) => (
                                                    <option key={turno.id} value={index}>
                                                        {turno.descricao}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="datavisita">
                                            <span>Melhor Data</span>
                                            <textarea 
                                                id="datavisita" 
                                                placeholder="Qual melhores dias da semana ou do mês para a coleta?" 
                                                required 
                                                rows={2} 
                                                name="datavisita" 
                                                defaultValue={agendamento.datavisita || ''}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cartão de Visitação */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
                                    </svg>
                                </div>
                                <h3>Usuário que Visitou</h3>
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.inputRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="id_user">
                                            <span>Selecione o usuário que visitou (opcional)</span>
                                            <select id="id_user" name="id_user" defaultValue={agendamento.user?.id || ''}>
                                                <option value="">Nenhum (não visitado)</option>
                                                {users.map((user) => (
                                                    <option 
                                                        key={user.id} 
                                                        value={user.id}
                                                    >
                                                        {user.username} ({user.email})
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.formFooter}>
                            <button 
                                type="submit" 
                                className={styles.btnSubmit}
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

