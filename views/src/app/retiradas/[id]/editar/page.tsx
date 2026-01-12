'use client';

import { useEffect, useState, useRef } from 'react';
import { api } from '@/api/api';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../../home/components/header';
import Menu from '../../../components/menu';
import styles from './page.module.css';
import formStyles from '@/app/agendar/forms/style/styles.module.css';
import Link from 'next/link';

interface Paciente {
    id: number;
    nome: string;
    cpf: string;
}

interface Lote {
    id: number;
    numero: string;
    qtde: number;
    datavencimento: string;
    medicamento: {
        descricao: string;
    };
    formaFarmaceutica: {
        descricao: string;
    };
    tipoMedicamento: {
        descricao: string;
    };
}

interface Retirada {
    id: number;
    qtde: number;
    id_lotes: number;
    id_pacientes: number;
    lotes: Lote;
    paciente: Paciente;
}

export default function EditarRetiradaPage() {
    const router = useRouter();
    const params = useParams();
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [retirada, setRetirada] = useState<Retirada | null>(null);
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        id_pacientes: '',
        id_lotes: '',
        qtde: '',
        paciente_search: '',
        lote_search: ''
    });
    const [loteSelecionado, setLoteSelecionado] = useState<Lote | null>(null);

    useEffect(() => {
        setMounted(true);
        if (params.id) {
            loadData(Number(params.id));
        }
    }, [params.id]);

    useEffect(() => {
        if (formData.id_lotes) {
            const lote = lotes.find(l => l.id === parseInt(formData.id_lotes));
            setLoteSelecionado(lote || null);
        } else {
            setLoteSelecionado(null);
        }
    }, [formData.id_lotes, lotes]);

    const loadData = async (id: number) => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            // Carregar pacientes e lotes
            const [pacientesRes, lotesRes, retiradaRes] = await Promise.all([
                api.get('/pacientes', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                api.get('/lotes', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                api.get(`/retirada/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            setPacientes(pacientesRes.data);
            // Filtrar apenas lotes com quantidade disponível e não vencidos
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            const lotesDisponiveis = lotesRes.data.filter((lote: Lote) => {
                if (lote.qtde <= 0) return false;
                const dataVencimento = new Date(lote.datavencimento);
                dataVencimento.setHours(0, 0, 0, 0);
                return dataVencimento >= hoje;
            });
            // Incluir o lote atual mesmo se não tiver estoque ou estiver vencido (para permitir edição)
            const loteAtual = retiradaRes.data.lotes;
            if (!lotesDisponiveis.find((l: Lote) => l.id === loteAtual.id)) {
                lotesDisponiveis.push(loteAtual);
            }
            setLotes(lotesDisponiveis);

            const retiradaData = retiradaRes.data;
            setRetirada(retiradaData);

            setFormData({
                id_pacientes: retiradaData.id_pacientes.toString(),
                id_lotes: retiradaData.id_lotes.toString(),
                qtde: retiradaData.qtde.toString(),
                paciente_search: `${retiradaData.paciente.nome} - CPF: ${retiradaData.paciente.cpf}`,
                lote_search: `${retiradaData.lotes.numero} - ${retiradaData.lotes.medicamento.descricao} (Disponível: ${retiradaData.lotes.qtde})`
            });
        } catch (error: any) {
            console.error('Erro ao carregar dados:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Retirada não encontrada');
                router.push('/retiradas');
            } else {
                toast.error('Erro ao carregar dados');
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

    const handlePacienteSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        const paciente = pacientes.find(p => 
            `${p.nome} - CPF: ${p.cpf}` === value
        );

        if (paciente) {
            setFormData(prev => ({
                ...prev,
                id_pacientes: paciente.id.toString(),
                paciente_search: `${paciente.nome} - CPF: ${paciente.cpf}`
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                paciente_search: value,
                id_pacientes: ''
            }));
        }
    };

    const handleLoteSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        const lote = lotes.find(l => {
            const loteText = `${l.numero} - ${l.medicamento.descricao} (Disponível: ${l.qtde})`;
            return loteText === value;
        });

        if (lote) {
            setFormData(prev => ({
                ...prev,
                id_lotes: lote.id.toString(),
                lote_search: `${lote.numero} - ${lote.medicamento.descricao} (Disponível: ${lote.qtde})`
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                lote_search: value,
                id_lotes: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.id_pacientes) {
            toast.error('Por favor, selecione um paciente!');
            return;
        }

        if (!formData.id_lotes) {
            toast.error('Por favor, selecione um lote!');
            return;
        }

        if (!formData.qtde || parseInt(formData.qtde) <= 0) {
            toast.error('Por favor, informe uma quantidade válida!');
            return;
        }

        const quantidade = parseInt(formData.qtde);
        
        // Se o lote não mudou, considerar a quantidade já retirada
        if (loteSelecionado && retirada && parseInt(formData.id_lotes) === retirada.id_lotes) {
            // Quantidade disponível atual + quantidade já retirada = estoque total disponível
            const estoqueTotalDisponivel = loteSelecionado.qtde + retirada.qtde;
            if (quantidade > estoqueTotalDisponivel) {
                toast.error(`Quantidade insuficiente. Disponível: ${estoqueTotalDisponivel} (${loteSelecionado.qtde} atual + ${retirada.qtde} já retirado)`);
                return;
            }
        } else if (loteSelecionado && quantidade > loteSelecionado.qtde) {
            // Se mudou o lote, validar normalmente
            toast.error(`Quantidade insuficiente. Disponível: ${loteSelecionado.qtde}`);
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
            await api.put(`/retirada/${params.id}`, {
                qtde: quantidade,
                id_lotes: parseInt(formData.id_lotes),
                id_pacientes: parseInt(formData.id_pacientes)
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Retirada atualizada com sucesso!');
            setTimeout(() => {
                router.push(`/retiradas/${params.id}`);
            }, 1500);
        } catch (error: any) {
            console.error('Erro ao atualizar retirada:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao atualizar retirada');
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
            <>
                <Header />
                <Menu />
                <main className={styles.main}>
                    <div className={styles.container}>
                        <div className={styles.contentWrapper}>
                            <div className={styles.loadingContainer}>
                                <p>Carregando dados...</p>
                            </div>
                        </div>
                    </div>
                </main>
            </>
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
                            <Link href={`/retiradas/${params.id}`} className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <h1>Editar Retirada</h1>
                        </div>

                        <form ref={formRef} className={formStyles.form} onSubmit={handleSubmit}>
                            <div className={formStyles.card}>
                                <div className={formStyles.cardHeader}>
                                    <div className={formStyles.cardIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <h3>Dados da Retirada</h3>
                                </div>
                                <div className={formStyles.cardBody}>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="paciente_search">
                                                <span>Paciente *</span>
                                                <input
                                                    type="text"
                                                    id="paciente_search"
                                                    name="paciente_search"
                                                    list="pacientes_list"
                                                    required
                                                    placeholder="Digite para buscar o paciente..."
                                                    value={formData.paciente_search}
                                                    onChange={handlePacienteSelect}
                                                    autoComplete="off"
                                                />
                                                <datalist id="pacientes_list">
                                                    {pacientes.map((paciente) => (
                                                        <option key={paciente.id} value={`${paciente.nome} - CPF: ${paciente.cpf}`} data-id={paciente.id} />
                                                    ))}
                                                </datalist>
                                                <input type="hidden" name="id_pacientes" value={formData.id_pacientes} />
                                            </label>
                                        </div>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="lote_search">
                                                <span>Lote *</span>
                                                <input
                                                    type="text"
                                                    id="lote_search"
                                                    name="lote_search"
                                                    list="lotes_list"
                                                    required
                                                    placeholder="Digite para buscar o lote..."
                                                    value={formData.lote_search}
                                                    onChange={handleLoteSelect}
                                                    autoComplete="off"
                                                />
                                                <datalist id="lotes_list">
                                                    {lotes.map((lote) => (
                                                        <option key={lote.id} value={`${lote.numero} - ${lote.medicamento.descricao} (Disponível: ${lote.qtde})`} data-id={lote.id} />
                                                    ))}
                                                </datalist>
                                                <input type="hidden" name="id_lotes" value={formData.id_lotes} />
                                            </label>
                                        </div>
                                    </div>
                                    {loteSelecionado && (
                                        <div className={formStyles.inputRow}>
                                            <div className={formStyles.inputGroup}>
                                                <label>
                                                    <span>Medicamento:</span>
                                                    <input
                                                        type="text"
                                                        value={loteSelecionado.medicamento.descricao}
                                                        disabled
                                                    />
                                                </label>
                                            </div>
                                            <div className={formStyles.inputGroup}>
                                                <label>
                                                    <span>Quantidade Disponível:</span>
                                                    <input
                                                        type="text"
                                                        value={retirada && parseInt(formData.id_lotes) === retirada.id_lotes 
                                                            ? `${loteSelecionado.qtde} (${loteSelecionado.qtde + retirada.qtde} total considerando retirada atual)`
                                                            : loteSelecionado.qtde}
                                                        disabled
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="qtde">
                                                <span>Quantidade *</span>
                                                <input
                                                    type="number"
                                                    id="qtde"
                                                    name="qtde"
                                                    required
                                                    min="1"
                                                    max={retirada && loteSelecionado && parseInt(formData.id_lotes) === retirada.id_lotes
                                                        ? (loteSelecionado.qtde + retirada.qtde)
                                                        : (loteSelecionado?.qtde || 999999)}
                                                    placeholder="Quantidade a retirar"
                                                    value={formData.qtde}
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
        </>
    );
}

