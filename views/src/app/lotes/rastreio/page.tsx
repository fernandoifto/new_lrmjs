'use client';

import { FormEvent, useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import WithPermission from '@/components/withPermission';
import { FaSearch, FaBarcode } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';

interface RastreioResult {
    codigo: string;
    codigoBase: string;
    unidade: number | null;
    lote: {
        id: number;
        numero: string;
        datavencimento: string;
        datafabricacao: string;
        qtde: number;
        created: string;
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
        agendamento?: {
            id: number;
            nome: string;
            endereco: string;
            numero: string;
            setor: string;
            cep: string;
            telefone: string;
            status: string;
            datavisita: string | null;
        };
        user?: {
            id: number;
            username: string;
            email: string;
        };
    };
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

function formatDateTime(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function LoteRastreioPage() {
    const router = useRouter();
    const [codigo, setCodigo] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<RastreioResult | null>(null);
    const [notFound, setNotFound] = useState(false);

    const handleSearch = async (e?: FormEvent) => {
        e?.preventDefault();
        const q = codigo.trim();
        if (!q) {
            toast.error('Informe o código da etiqueta');
            return;
        }

        try {
            setLoading(true);
            setNotFound(false);
            setResult(null);
            const response = await api.get('/lotes/rastreio', {
                params: { codigo: q },
            });
            setResult(response.data);
        } catch (error: any) {
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
                return;
            }
            const msg = error.response?.data?.error || 'Etiqueta não encontrada';
            if (error.response?.status === 404) {
                setNotFound(true);
            } else {
                toast.error(msg);
            }
        } finally {
            setLoading(false);
        }
    };

    const lote = result?.lote;
    const isExpired = lote
        ? new Date(lote.datavencimento) < new Date(new Date().setHours(0, 0, 0, 0))
        : false;

    return (
        <WithPermission requiredPermission="lotes.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/lotes" className={styles.btnBack}>
                                Voltar
                            </Link>
                        </div>

                        <div className={styles.searchCard}>
                            <div className={styles.searchHeader}>
                                <div className={styles.searchIcon}>
                                    <FaBarcode size={22} />
                                </div>
                                <div>
                                    <h1>Consultar etiqueta</h1>
                                    <p>Pesquise pelo código impresso na etiqueta unitarizada</p>
                                </div>
                            </div>

                            <form className={styles.searchForm} onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                    placeholder="Ex.: L2-000225446-2610063"
                                    autoFocus
                                    autoComplete="off"
                                    spellCheck={false}
                                />
                                <button type="submit" className={styles.btnSearch} disabled={loading}>
                                    <FaSearch size={16} />
                                    {loading ? 'Buscando…' : 'Buscar'}
                                </button>
                            </form>
                        </div>

                        {loading && (
                            <div className={styles.loadingContainer}>
                                <p>Consultando etiqueta…</p>
                            </div>
                        )}

                        {!loading && notFound && (
                            <div className={styles.emptyState}>
                                <p>Nenhuma etiqueta encontrada com esse código.</p>
                                <p className={styles.emptyHint}>
                                    Confira se o código está completo, incluindo o número da unidade no final.
                                </p>
                            </div>
                        )}

                        {!loading && result && lote && (
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>
                                        <FaBarcode size={22} />
                                    </div>
                                    <div>
                                        <h2>{result.codigo}</h2>
                                        {result.unidade != null && (
                                            <p className={styles.unidadeBadge}>
                                                Unidade {result.unidade} de {lote.qtde}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.section}>
                                        <h3>Medicamento</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Nome</span>
                                                <span className={styles.value}>
                                                    <Link href={`/medicamentos/${lote.medicamento.id}`}>
                                                        {lote.medicamento.descricao}
                                                    </Link>
                                                </span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Princípio ativo</span>
                                                <span className={styles.value}>
                                                    {lote.medicamento.principioativo}
                                                </span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Forma farmacêutica</span>
                                                <span className={styles.value}>
                                                    {lote.formaFarmaceutica.descricao}
                                                </span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Tipo</span>
                                                <span className={styles.value}>
                                                    {lote.tipoMedicamento.descricao}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.section}>
                                        <h3>Lote</h3>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Número</span>
                                                <span className={styles.value}>
                                                    <Link href={`/lotes/${lote.id}`}>{lote.numero}</Link>
                                                </span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Quantidade unitarizada</span>
                                                <span className={styles.value}>{lote.qtde}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Fabricação</span>
                                                <span className={styles.value}>
                                                    {formatDate(lote.datafabricacao)}
                                                </span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Validade</span>
                                                <span
                                                    className={`${styles.value} ${isExpired ? styles.expired : ''}`}
                                                >
                                                    {formatDate(lote.datavencimento)}
                                                    {isExpired ? ' (Vencido)' : ''}
                                                </span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Código base do lote</span>
                                                <span className={styles.value}>{result.codigoBase}</span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>Cadastrado em</span>
                                                <span className={styles.value}>
                                                    {formatDateTime(lote.created)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {lote.agendamento && (
                                        <div className={styles.section}>
                                            <h3>Doador</h3>
                                            <div className={styles.infoGrid}>
                                                <div className={styles.infoItem}>
                                                    <span className={styles.label}>Nome</span>
                                                    <span className={styles.value}>
                                                        <Link href={`/agendamentos/${lote.agendamento.id}`}>
                                                            {lote.agendamento.nome}
                                                        </Link>
                                                    </span>
                                                </div>
                                                <div className={styles.infoItem}>
                                                    <span className={styles.label}>Telefone</span>
                                                    <span className={styles.value}>
                                                        {lote.agendamento.telefone || '—'}
                                                    </span>
                                                </div>
                                                <div className={styles.infoItem}>
                                                    <span className={styles.label}>Endereço</span>
                                                    <span className={styles.value}>
                                                        {lote.agendamento.endereco}
                                                        {lote.agendamento.numero
                                                            ? `, ${lote.agendamento.numero}`
                                                            : ''}
                                                        {lote.agendamento.setor
                                                            ? ` — ${lote.agendamento.setor}`
                                                            : ''}
                                                    </span>
                                                </div>
                                                <div className={styles.infoItem}>
                                                    <span className={styles.label}>CEP</span>
                                                    <span className={styles.value}>
                                                        {lote.agendamento.cep || '—'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {lote.user && (
                                        <div className={styles.section}>
                                            <h3>Triagem / cadastro</h3>
                                            <div className={styles.infoGrid}>
                                                <div className={styles.infoItem}>
                                                    <span className={styles.label}>Responsável</span>
                                                    <span className={styles.value}>{lote.user.username}</span>
                                                </div>
                                                <div className={styles.infoItem}>
                                                    <span className={styles.label}>E-mail</span>
                                                    <span className={styles.value}>{lote.user.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}
