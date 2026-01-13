'use client';

import { useState, useRef, useEffect } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import WithPermission from '@/components/withPermission';
import styles from './page.module.css';
import formStyles from '@/app/agendar/forms/style/styles.module.css';
import Link from 'next/link';

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

export default function NovoLotePage() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
    const [formasFarmaceuticas, setFormasFarmaceuticas] = useState<FormaFarmaceutica[]>([]);
    const [tiposMedicamentos, setTiposMedicamentos] = useState<TipoMedicamento[]>([]);
    const [formData, setFormData] = useState({
        numero: '',
        datavencimento: '',
        datafabricacao: '',
        qtde: '',
        id_medicamento: '',
        id_forma_farmaceutica: '',
        id_tipo_medicamento: ''
    });
    
    // Estados para modais
    const [showModalMedicamento, setShowModalMedicamento] = useState(false);
    const [showModalForma, setShowModalForma] = useState(false);
    const [showModalTipo, setShowModalTipo] = useState(false);
    const [savingModal, setSavingModal] = useState(false);
    
    // Estados para formulários dos modais
    const [modalMedicamentoData, setModalMedicamentoData] = useState({
        descricao: '',
        principioativo: ''
    });
    const [modalFormaData, setModalFormaData] = useState({
        descricao: ''
    });
    const [modalTipoData, setModalTipoData] = useState({
        descricao: ''
    });

    useEffect(() => {
        const token = getCookieClient();
        if (!token) {
            toast.error('Você precisa estar logado para acessar esta página');
            router.push('/login');
            return;
        }
        loadData();
    }, [router]);

    const loadData = async () => {
        try {
            setLoading(true);
            const token = getCookieClient();

            if (!token) {
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
        } catch (error: any) {
            console.error('Erro ao carregar dados:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar dados do formulário');
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

    // Funções para criar novos itens via modal
    const handleCreateMedicamento = async () => {
        if (!modalMedicamentoData.descricao.trim() || !modalMedicamentoData.principioativo.trim()) {
            toast.error('Por favor, preencha todos os campos!');
            return;
        }

        setSavingModal(true);
        const token = getCookieClient();

        try {
            const response = await api.post('/medicamento', {
                descricao: modalMedicamentoData.descricao.trim(),
                principioativo: modalMedicamentoData.principioativo.trim()
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Medicamento criado com sucesso!');
            setMedicamentos([...medicamentos, response.data]);
            setFormData(prev => ({ ...prev, id_medicamento: response.data.id.toString() }));
            setShowModalMedicamento(false);
            setModalMedicamentoData({ descricao: '', principioativo: '' });
        } catch (error: any) {
            console.error('Erro ao criar medicamento:', error);
            toast.error(error.response?.data?.error || 'Erro ao criar medicamento');
        } finally {
            setSavingModal(false);
        }
    };

    const handleCreateFormaFarmaceutica = async () => {
        if (!modalFormaData.descricao.trim()) {
            toast.error('Por favor, preencha a descrição!');
            return;
        }

        setSavingModal(true);
        const token = getCookieClient();

        try {
            const response = await api.post('/forma-farmaceutica', {
                descricao: modalFormaData.descricao.trim()
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Forma farmacêutica criada com sucesso!');
            setFormasFarmaceuticas([...formasFarmaceuticas, response.data]);
            setFormData(prev => ({ ...prev, id_forma_farmaceutica: response.data.id.toString() }));
            setShowModalForma(false);
            setModalFormaData({ descricao: '' });
        } catch (error: any) {
            console.error('Erro ao criar forma farmacêutica:', error);
            toast.error(error.response?.data?.error || 'Erro ao criar forma farmacêutica');
        } finally {
            setSavingModal(false);
        }
    };

    const handleCreateTipoMedicamento = async () => {
        if (!modalTipoData.descricao.trim()) {
            toast.error('Por favor, preencha a descrição!');
            return;
        }

        setSavingModal(true);
        const token = getCookieClient();

        try {
            const response = await api.post('/tipo-medicamento', {
                descricao: modalTipoData.descricao.trim()
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Tipo de medicamento criado com sucesso!');
            setTiposMedicamentos([...tiposMedicamentos, response.data]);
            setFormData(prev => ({ ...prev, id_tipo_medicamento: response.data.id.toString() }));
            setShowModalTipo(false);
            setModalTipoData({ descricao: '' });
        } catch (error: any) {
            console.error('Erro ao criar tipo de medicamento:', error);
            toast.error(error.response?.data?.error || 'Erro ao criar tipo de medicamento');
        } finally {
            setSavingModal(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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

        if (!formData.id_medicamento) {
            toast.error('Por favor, selecione um medicamento!');
            return;
        }

        if (!formData.id_forma_farmaceutica) {
            toast.error('Por favor, selecione uma forma farmacêutica!');
            return;
        }

        if (!formData.id_tipo_medicamento) {
            toast.error('Por favor, selecione um tipo de medicamento!');
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
            await api.post('/lote', {
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

            toast.success('Lote criado com sucesso!');
            setTimeout(() => {
                router.push('/lotes');
            }, 1500);
        } catch (error: any) {
            console.error('Erro ao criar lote:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error(error.response?.data?.error || 'Erro ao criar lote');
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
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
        <WithPermission requiredPermission="lotes.criar">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/lotes" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            <h1>Novo Lote</h1>
                            <p>Preencha os dados abaixo para criar um novo lote</p>
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
                                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                                                    <select 
                                                        id="id_medicamento" 
                                                        name="id_medicamento"
                                                        required 
                                                        value={formData.id_medicamento}
                                                        onChange={handleChange}
                                                        style={{ flex: 1 }}
                                                    >
                                                        <option value="">Selecione um medicamento</option>
                                                        {medicamentos.map((medicamento) => (
                                                            <option key={medicamento.id} value={medicamento.id}>
                                                                {medicamento.descricao} - {medicamento.principioativo}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowModalMedicamento(true)}
                                                        className={styles.btnQuickAdd}
                                                        title="Cadastro rápido de medicamento"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M12 5v14m7-7H5" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </label>
                                        </div>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="id_forma_farmaceutica">
                                                <span>Forma Farmacêutica *</span>
                                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                                                    <select 
                                                        id="id_forma_farmaceutica" 
                                                        name="id_forma_farmaceutica"
                                                        required 
                                                        value={formData.id_forma_farmaceutica}
                                                        onChange={handleChange}
                                                        style={{ flex: 1 }}
                                                    >
                                                        <option value="">Selecione uma forma farmacêutica</option>
                                                        {formasFarmaceuticas.map((forma) => (
                                                            <option key={forma.id} value={forma.id}>
                                                                {forma.descricao}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowModalForma(true)}
                                                        className={styles.btnQuickAdd}
                                                        title="Cadastro rápido de forma farmacêutica"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M12 5v14m7-7H5" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={formStyles.inputRow}>
                                        <div className={formStyles.inputGroup}>
                                            <label htmlFor="id_tipo_medicamento">
                                                <span>Tipo de Medicamento *</span>
                                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                                                    <select 
                                                        id="id_tipo_medicamento" 
                                                        name="id_tipo_medicamento"
                                                        required 
                                                        value={formData.id_tipo_medicamento}
                                                        onChange={handleChange}
                                                        style={{ flex: 1 }}
                                                    >
                                                        <option value="">Selecione um tipo de medicamento</option>
                                                        {tiposMedicamentos.map((tipo) => (
                                                            <option key={tipo.id} value={tipo.id}>
                                                                {tipo.descricao}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowModalTipo(true)}
                                                        className={styles.btnQuickAdd}
                                                        title="Cadastro rápido de tipo de medicamento"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M12 5v14m7-7H5" />
                                                        </svg>
                                                    </button>
                                                </div>
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
                                    {saving ? 'Criando...' : 'Criar Lote'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            {/* Modal de Cadastro Rápido - Medicamento */}
            {showModalMedicamento && (
                <div className={styles.modalOverlay} onClick={() => setShowModalMedicamento(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Cadastro Rápido - Medicamento</h2>
                            <button 
                                className={styles.modalClose}
                                onClick={() => {
                                    setShowModalMedicamento(false);
                                    setModalMedicamentoData({ descricao: '', principioativo: '' });
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.modalInputGroup}>
                                <label>
                                    <span>Descrição *</span>
                                    <input
                                        type="text"
                                        value={modalMedicamentoData.descricao}
                                        onChange={(e) => setModalMedicamentoData({ ...modalMedicamentoData, descricao: e.target.value })}
                                        placeholder="Ex: Paracetamol"
                                    />
                                </label>
                            </div>
                            <div className={styles.modalInputGroup}>
                                <label>
                                    <span>Princípio Ativo *</span>
                                    <input
                                        type="text"
                                        value={modalMedicamentoData.principioativo}
                                        onChange={(e) => setModalMedicamentoData({ ...modalMedicamentoData, principioativo: e.target.value })}
                                        placeholder="Ex: Paracetamol"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button
                                type="button"
                                className={styles.modalBtnCancel}
                                onClick={() => {
                                    setShowModalMedicamento(false);
                                    setModalMedicamentoData({ descricao: '', principioativo: '' });
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className={styles.modalBtnSave}
                                onClick={handleCreateMedicamento}
                                disabled={savingModal}
                            >
                                {savingModal ? 'Salvando...' : 'Salvar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Cadastro Rápido - Forma Farmacêutica */}
            {showModalForma && (
                <div className={styles.modalOverlay} onClick={() => setShowModalForma(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Cadastro Rápido - Forma Farmacêutica</h2>
                            <button 
                                className={styles.modalClose}
                                onClick={() => {
                                    setShowModalForma(false);
                                    setModalFormaData({ descricao: '' });
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.modalInputGroup}>
                                <label>
                                    <span>Descrição *</span>
                                    <input
                                        type="text"
                                        value={modalFormaData.descricao}
                                        onChange={(e) => setModalFormaData({ ...modalFormaData, descricao: e.target.value })}
                                        placeholder="Ex: Comprimidos, Cápsulas, Xarope"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button
                                type="button"
                                className={styles.modalBtnCancel}
                                onClick={() => {
                                    setShowModalForma(false);
                                    setModalFormaData({ descricao: '' });
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className={styles.modalBtnSave}
                                onClick={handleCreateFormaFarmaceutica}
                                disabled={savingModal}
                            >
                                {savingModal ? 'Salvando...' : 'Salvar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Cadastro Rápido - Tipo de Medicamento */}
            {showModalTipo && (
                <div className={styles.modalOverlay} onClick={() => setShowModalTipo(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Cadastro Rápido - Tipo de Medicamento</h2>
                            <button 
                                className={styles.modalClose}
                                onClick={() => {
                                    setShowModalTipo(false);
                                    setModalTipoData({ descricao: '' });
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.modalInputGroup}>
                                <label>
                                    <span>Descrição *</span>
                                    <input
                                        type="text"
                                        value={modalTipoData.descricao}
                                        onChange={(e) => setModalTipoData({ ...modalTipoData, descricao: e.target.value })}
                                        placeholder="Ex: Controlado, Genérico, Similar"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button
                                type="button"
                                className={styles.modalBtnCancel}
                                onClick={() => {
                                    setShowModalTipo(false);
                                    setModalTipoData({ descricao: '' });
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className={styles.modalBtnSave}
                                onClick={handleCreateTipoMedicamento}
                                disabled={savingModal}
                            >
                                {savingModal ? 'Salvando...' : 'Salvar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </WithPermission>
    );
}

