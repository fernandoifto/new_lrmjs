'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
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

export default function NovaRetiradaPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { hasPermission } = usePermissions();
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        id_pacientes: '',
        id_lotes: '',
        qtde: '',
        paciente_search: '',
        lote_search: ''
    });
    const [loteSelecionado, setLoteSelecionado] = useState<Lote | null>(null);
    const [pacienteSelecionado, setPacienteSelecionado] = useState<Paciente | null>(null);
    const [podeVerLotes, setPodeVerLotes] = useState(true);
    const [podeVerPacientes, setPodeVerPacientes] = useState(true);

    useEffect(() => {
        const token = getCookieClient();
        if (!token) {
            toast.error('Você precisa estar logado para acessar esta página');
            router.push('/login');
            return;
        }
        loadData();
    }, [router, searchParams]);

    useEffect(() => {
        if (formData.id_lotes) {
            const lote = lotes.find(l => l.id === parseInt(formData.id_lotes));
            setLoteSelecionado(lote || null);
        } else {
            setLoteSelecionado(null);
        }
    }, [formData.id_lotes, lotes]);

    useEffect(() => {
        if (formData.id_pacientes) {
            const paciente = pacientes.find(p => p.id === parseInt(formData.id_pacientes));
            setPacienteSelecionado(paciente || null);
        } else {
            setPacienteSelecionado(null);
        }
    }, [formData.id_pacientes, pacientes]);

    const loadData = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
                return;
            }

            const pacienteIdParam = searchParams.get('paciente');
            const loteIdParam = searchParams.get('lote');

            // Se houver um paciente na query string, buscar apenas esse paciente específico
            // Caso contrário, tentar buscar a lista completa
            let pacientesData: Paciente[] = [];
            if (pacienteIdParam) {
                try {
                    const pacienteId = parseInt(pacienteIdParam);
                    const pacienteRes = await api.get(`/paciente/${pacienteId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    pacientesData = [pacienteRes.data];
                } catch (error: any) {
                    if (error.response?.status === 403) {
                        toast.error('Você não tem permissão para acessar os dados deste paciente. É necessária a permissão "pacientes.ver"');
                        router.push('/retiradas');
                        return;
                    } else if (error.response?.status === 404) {
                        toast.error('Paciente não encontrado');
                        router.push('/retiradas');
                        return;
                    } else {
                        throw error;
                    }
                }
            } else {
                try {
                    const pacientesRes = await api.get('/pacientes', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    pacientesData = pacientesRes.data;
                } catch (error: any) {
                    if (error.response?.status === 403) {
                        // Se não tiver permissão para ver lista, continuar sem ela
                        console.warn('Sem permissão para listar pacientes');
                        setPodeVerPacientes(false);
                    } else {
                        throw error;
                    }
                }
            }

            setPacientes(pacientesData);

            // Buscar lotes - se houver um lote na query string, buscar apenas esse lote específico
            // Caso contrário, tentar buscar a lista completa
            let lotesData: Lote[] = [];
            if (loteIdParam) {
                try {
                    const loteId = parseInt(loteIdParam);
                    const loteRes = await api.get(`/lote/${loteId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    lotesData = [loteRes.data];
                } catch (error: any) {
                    if (error.response?.status === 403) {
                        // Se não tiver permissão para ver o lote, permitir entrada manual do ID
                        console.warn('Sem permissão para ver lote específico');
                        setPodeVerLotes(false);
                        // Pré-preencher o ID do lote na query string
                        setFormData(prev => ({
                            ...prev,
                            id_lotes: loteIdParam,
                            lote_search: `Lote ID: ${loteIdParam}`
                        }));
                        toast.warning('Você não tem permissão para ver os dados deste lote. O ID foi pré-preenchido, mas você precisará confirmar manualmente.');
                    } else if (error.response?.status === 404) {
                        toast.error('Lote não encontrado');
                        setPodeVerLotes(false);
                        // Ainda permitir entrada manual do ID
                        setFormData(prev => ({
                            ...prev,
                            id_lotes: loteIdParam,
                            lote_search: `Lote ID: ${loteIdParam}`
                        }));
                    } else {
                        throw error;
                    }
                }
            } else {
                try {
                    const lotesRes = await api.get('/lotes', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    lotesData = lotesRes.data;
                } catch (error: any) {
                    if (error.response?.status === 403) {
                        // Se não tiver permissão para ver lista, continuar sem ela
                        console.warn('Sem permissão para listar lotes');
                        setPodeVerLotes(false);
                        toast.warning('Você não tem permissão para ver a lista de lotes. Digite o ID do lote manualmente.');
                    } else {
                        throw error;
                    }
                }
            }

            // Filtrar apenas lotes com quantidade disponível e não vencidos
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            let lotesDisponiveis = lotesData.filter((lote: Lote) => {
                if (lote.qtde <= 0) return false;
                const dataVencimento = new Date(lote.datavencimento);
                dataVencimento.setHours(0, 0, 0, 0);
                return dataVencimento >= hoje;
            });
            
            // Se houver um lote específico na query string, incluir mesmo que não esteja disponível
            if (loteIdParam && lotesData.length > 0) {
                const loteId = parseInt(loteIdParam);
                const loteEspecifico = lotesData.find((lote: Lote) => lote.id === loteId);
                if (loteEspecifico) {
                    const jaExiste = lotesDisponiveis.find((l: Lote) => l.id === loteId);
                    if (!jaExiste) {
                        lotesDisponiveis.push(loteEspecifico);
                    }
                }
            }
            
            setLotes(lotesDisponiveis);

            // Verificar se há um lote pré-selecionado via query parameter
            if (loteIdParam && lotesDisponiveis.length > 0) {
                const loteId = parseInt(loteIdParam);
                const lotePreSelecionado = lotesDisponiveis.find((lote: Lote) => lote.id === loteId);
                
                if (lotePreSelecionado) {
                    setFormData(prev => ({
                        ...prev,
                        id_lotes: lotePreSelecionado.id.toString(),
                        lote_search: `${lotePreSelecionado.numero} - ${lotePreSelecionado.medicamento.descricao} (Disponível: ${lotePreSelecionado.qtde})`
                    }));
                }
            } else if (loteIdParam && lotesData.length > 0) {
                // Se o lote foi buscado especificamente mas não está disponível, ainda pré-selecionar
                const loteId = parseInt(loteIdParam);
                const loteEspecifico = lotesData.find((lote: Lote) => lote.id === loteId);
                if (loteEspecifico) {
                    setFormData(prev => ({
                        ...prev,
                        id_lotes: loteEspecifico.id.toString(),
                        lote_search: `${loteEspecifico.numero} - ${loteEspecifico.medicamento.descricao} (Disponível: ${loteEspecifico.qtde})`
                    }));
                }
            }

            // Verificar se há um paciente pré-selecionado via query parameter
            if (pacienteIdParam && pacientesData.length > 0) {
                const pacienteId = parseInt(pacienteIdParam);
                const pacientePreSelecionado = pacientesData.find((paciente: Paciente) => paciente.id === pacienteId);
                
                if (pacientePreSelecionado) {
                    setFormData(prev => ({
                        ...prev,
                        id_pacientes: pacientePreSelecionado.id.toString(),
                        paciente_search: `${pacientePreSelecionado.nome} - CPF: ${pacientePreSelecionado.cpf}`
                    }));
                }
            }
        } catch (error: any) {
            console.error('Erro ao carregar dados:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 403) {
                toast.error('Você não tem permissão para acessar este recurso');
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
        
        // Buscar paciente pelo texto digitado (busca exata primeiro)
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
            // Se não encontrou exato, limpar o ID mas manter o texto para busca
            setFormData(prev => ({
                ...prev,
                paciente_search: value,
                id_pacientes: ''
            }));
        }
    };

    const handleLoteSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        // Buscar lote pelo texto digitado (busca exata primeiro)
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
            // Se não encontrou exato, limpar o ID mas manter o texto para busca
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
        if (loteSelecionado && quantidade > loteSelecionado.qtde) {
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
            await api.post('/retirada', {
                qtde: quantidade,
                id_lotes: parseInt(formData.id_lotes),
                id_pacientes: parseInt(formData.id_pacientes)
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Retirada registrada com sucesso!');
            setTimeout(() => {
                router.push('/retiradas');
            }, 1500);
        } catch (error: any) {
            console.error('Erro ao registrar retirada:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao registrar retirada');
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <WithPermission requiredPermission="retiradas.criar">
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
            </WithPermission>
        );
    }

    return (
        <WithPermission requiredPermission="retiradas.criar">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/retiradas" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <h1>Nova Doação/Retirada</h1>
                            <p>Registre uma nova doação ou retirada de medicamento</p>
                        </div>

                        <form className={formStyles.form} onSubmit={handleSubmit}>
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
                                                {podeVerPacientes ? (
                                                    <>
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
                                                    </>
                                                ) : (
                                                    <input
                                                        type="number"
                                                        id="id_pacientes"
                                                        name="id_pacientes"
                                                        required
                                                        placeholder="Digite o ID do paciente..."
                                                        value={formData.id_pacientes}
                                                        onChange={(e) => {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                id_pacientes: e.target.value,
                                                                paciente_search: e.target.value ? `Paciente ID: ${e.target.value}` : ''
                                                            }));
                                                        }}
                                                        min="1"
                                                    />
                                                )}
                                                <input type="hidden" name="id_pacientes" value={formData.id_pacientes} />
                                            </label>
                                        </div>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="lote_search">
                                                <span>Lote *</span>
                                                {podeVerLotes ? (
                                                    <>
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
                                                    </>
                                                ) : (
                                                    <input
                                                        type="number"
                                                        id="id_lotes"
                                                        name="id_lotes"
                                                        required
                                                        placeholder="Digite o ID do lote..."
                                                        value={formData.id_lotes}
                                                        onChange={(e) => {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                id_lotes: e.target.value,
                                                                lote_search: e.target.value ? `Lote ID: ${e.target.value}` : ''
                                                            }));
                                                        }}
                                                        min="1"
                                                    />
                                                )}
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
                                                        value={loteSelecionado.qtde}
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
                                                    max={loteSelecionado?.qtde || 999999}
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
                                    {saving ? 'Registrando...' : 'Registrar Retirada'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}

