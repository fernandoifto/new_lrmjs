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

interface Lote {
    id: number;
    numero: string;
    datavencimento: string;
    datafabricacao: string;
    qtde: number;
    medicamento: {
        id: number;
        descricao: string;
        principioativo: string;
    };
    formaFarmaceutica: {
        id: number;
        descricao: string;
    };
    tipoMedicamento: {
        id: number;
        descricao: string;
    };
}

interface Medicamento {
    id: number;
    descricao: string;
    principioativo: string;
}

interface FormaFarmaceutica {
    id: number;
    descricao: string;
}

interface TipoMedicamento {
    id: number;
    descricao: string;
}

export default function EditarLotePage() {
    const router = useRouter();
    const params = useParams();
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [lote, setLote] = useState<Lote | null>(null);
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
    const [formasFarmaceuticas, setFormasFarmaceuticas] = useState<FormaFarmaceutica[]>([]);
    const [tiposMedicamentos, setTiposMedicamentos] = useState<TipoMedicamento[]>([]);
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        numero: '',
        datavencimento: '',
        datafabricacao: '',
        qtde: '',
        id_medicamento: '',
        id_forma_farmaceutica: '',
        id_tipo_medicamento: ''
    });

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
                toast.error('Você precisa estar logado');
                router.push('/login');
                return;
            }

            // Carregar medicamentos
            const medicamentosResponse = await api.get('/medicamentos', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMedicamentos(medicamentosResponse.data);

            // Carregar formas farmacêuticas
            const formasResponse = await api.get('/formas-farmaceuticas', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFormasFarmaceuticas(formasResponse.data);

            // Carregar tipos de medicamentos
            const tiposResponse = await api.get('/tipos-medicamentos', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTiposMedicamentos(tiposResponse.data);

            // Carregar lote
            const loteResponse = await api.get(`/lote/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const loteData = loteResponse.data;
            setLote(loteData);
            
            // Formatar datas para input date (YYYY-MM-DD)
            const formatDateForInput = (dateString: string) => {
                const date = new Date(dateString);
                return date.toISOString().split('T')[0];
            };

            setFormData({
                numero: loteData.numero,
                datavencimento: formatDateForInput(loteData.datavencimento),
                datafabricacao: formatDateForInput(loteData.datafabricacao),
                qtde: loteData.qtde.toString(),
                id_medicamento: loteData.medicamento.id.toString(),
                id_forma_farmaceutica: loteData.formaFarmaceutica.id.toString(),
                id_tipo_medicamento: loteData.tipoMedicamento.id.toString()
            });
        } catch (error: any) {
            console.error('Erro ao carregar dados:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Lote não encontrado');
                router.push('/lotes');
            } else {
                toast.error('Erro ao carregar dados');
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!lote) return;

        if (!formData.numero || formData.numero.trim() === '') {
            toast.error('Por favor, preencha o número do lote!');
            return;
        }

        if (!formData.datavencimento) {
            toast.error('Por favor, preencha a data de vencimento!');
            return;
        }

        if (!formData.datafabricacao) {
            toast.error('Por favor, preencha a data de fabricação!');
            return;
        }

        if (!formData.qtde || parseInt(formData.qtde) < 0) {
            toast.error('Por favor, preencha uma quantidade válida!');
            return;
        }

        // Validar que data de fabricação é anterior à data de vencimento
        const dataFabricacao = new Date(formData.datafabricacao);
        const dataVencimento = new Date(formData.datavencimento);

        if (dataFabricacao >= dataVencimento) {
            toast.error('A data de fabricação deve ser anterior à data de vencimento!');
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
            await api.put(`/lote/${lote.id}`, {
                numero: formData.numero.trim(),
                datavencimento: formData.datavencimento,
                datafabricacao: formData.datafabricacao,
                qtde: parseInt(formData.qtde),
                id_medicamento: parseInt(formData.id_medicamento),
                id_forma_farmaceutica: parseInt(formData.id_forma_farmaceutica),
                id_tipo_medicamento: parseInt(formData.id_tipo_medicamento)
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Lote atualizado com sucesso!');
            setTimeout(() => {
                router.push('/lotes');
            }, 1500);
        } catch (error: any) {
            console.error('Erro ao atualizar lote:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao atualizar lote');
            }
        } finally {
            setSaving(false);
        }
    };

    if (!mounted || loading) {
        return (
            <>
                <Header />
                <Menu />
                <main className={styles.main}>
                    <div className={styles.container}>
                        <div className={styles.contentWrapper}>
                            <div className={styles.loadingContainer}>
                                <p>Carregando...</p>
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
                            <Link href="/lotes" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <h1>Editar Lote</h1>
                            <p>Atualize os dados do lote</p>
                        </div>

                        <form ref={formRef} className={formStyles.form} onSubmit={handleSubmit}>
                            <div className={formStyles.card}>
                                <div className={formStyles.cardHeader}>
                                    <div className={formStyles.cardIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                    <h3>Informações do Lote</h3>
                                </div>
                                <div className={formStyles.cardBody}>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="numero">
                                                <span>Número do Lote *</span>
                                                <input 
                                                    type="text" 
                                                    id="numero" 
                                                    name="numero"
                                                    required 
                                                    placeholder="Ex: LOTE001, LOTE2024-001" 
                                                    value={formData.numero}
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        </div>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="qtde">
                                                <span>Quantidade *</span>
                                                <input 
                                                    type="number" 
                                                    id="qtde" 
                                                    name="qtde"
                                                    required 
                                                    min="0"
                                                    placeholder="Ex: 100" 
                                                    value={formData.qtde}
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="datafabricacao">
                                                <span>Data de Fabricação *</span>
                                                <input 
                                                    type="date" 
                                                    id="datafabricacao" 
                                                    name="datafabricacao"
                                                    required 
                                                    value={formData.datafabricacao}
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        </div>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="datavencimento">
                                                <span>Data de Vencimento *</span>
                                                <input 
                                                    type="date" 
                                                    id="datavencimento" 
                                                    name="datavencimento"
                                                    required 
                                                    value={formData.datavencimento}
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
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                    <h3>Informações do Medicamento</h3>
                                </div>
                                <div className={formStyles.cardBody}>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="id_medicamento">
                                                <span>Medicamento *</span>
                                                <select 
                                                    id="id_medicamento" 
                                                    name="id_medicamento"
                                                    required 
                                                    value={formData.id_medicamento}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Selecione um medicamento</option>
                                                    {medicamentos.map((medicamento) => (
                                                        <option key={medicamento.id} value={medicamento.id}>
                                                            {medicamento.descricao} - {medicamento.principioativo}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                        </div>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="id_forma_farmaceutica">
                                                <span>Forma Farmacêutica *</span>
                                                <select 
                                                    id="id_forma_farmaceutica" 
                                                    name="id_forma_farmaceutica"
                                                    required 
                                                    value={formData.id_forma_farmaceutica}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Selecione uma forma farmacêutica</option>
                                                    {formasFarmaceuticas.map((forma) => (
                                                        <option key={forma.id} value={forma.id}>
                                                            {forma.descricao}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="id_tipo_medicamento">
                                                <span>Tipo de Medicamento *</span>
                                                <select 
                                                    id="id_tipo_medicamento" 
                                                    name="id_tipo_medicamento"
                                                    required 
                                                    value={formData.id_tipo_medicamento}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Selecione um tipo de medicamento</option>
                                                    {tiposMedicamentos.map((tipo) => (
                                                        <option key={tipo.id} value={tipo.id}>
                                                            {tipo.descricao}
                                                        </option>
                                                    ))}
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

