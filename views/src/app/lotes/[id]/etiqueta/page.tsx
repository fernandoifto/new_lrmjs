'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { api } from '@/api/api';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import WithPermission from '@/components/withPermission';
import Link from 'next/link';
import JsBarcode from 'jsbarcode';
import { buildCodigoRastreioUnidade, formatValidadeBr } from '@/lib/loteRastreio';
import styles from './page.module.css';

interface Lote {
    id: number;
    numero: string;
    datavencimento: string;
    qtde: number;
    medicamento: {
        descricao: string;
        principioativo: string;
    };
    formaFarmaceutica: {
        descricao: string;
    };
    user?: {
        id: number;
        username: string;
        email: string;
    };
}

function isLoteVencido(datavencimento: string): boolean {
    const vencimento = new Date(datavencimento);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    vencimento.setHours(0, 0, 0, 0);
    return vencimento < hoje;
}

function BarcodeSvg({ value }: { value: string }) {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current || !value) return;
        try {
            JsBarcode(svgRef.current, value, {
                format: 'CODE128',
                displayValue: true,
                fontSize: 10,
                height: 36,
                width: 1.2,
                margin: 0,
                textMargin: 2,
            });
        } catch (error) {
            console.error('Erro ao gerar código de barras:', error);
        }
    }, [value]);

    return <svg ref={svgRef} className={styles.barcode} />;
}

export default function EtiquetaUnitarizacaoPage() {
    const router = useRouter();
    const params = useParams();
    const [lote, setLote] = useState<Lote | null>(null);
    const [loading, setLoading] = useState(true);
    const [qtdeEtiquetas, setQtdeEtiquetas] = useState(1);
    const [porPagina, setPorPagina] = useState(8);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [modoImpressao, setModoImpressao] = useState<'pagina' | 'todas'>('pagina');
    const [unitarizadoEm] = useState(() => new Date());

    useEffect(() => {
        if (params.id) {
            loadLote(Number(params.id));
        }
    }, [params.id]);

    useEffect(() => {
        const onAfterPrint = () => setModoImpressao('pagina');
        window.addEventListener('afterprint', onAfterPrint);
        return () => window.removeEventListener('afterprint', onAfterPrint);
    }, []);

    const loadLote = async (id: number) => {
        try {
            setLoading(true);
            const response = await api.get(`/lote/${id}`, {});
            const data = response.data as Lote;
            if (isLoteVencido(data.datavencimento)) {
                toast.error('Não é possível gerar etiquetas para lote vencido.');
                router.replace(`/lotes/${id}`);
                return;
            }
            setLote(data);
            setQtdeEtiquetas(Math.max(1, data.qtde || 1));
            setPaginaAtual(1);
        } catch (error: any) {
            console.error('Erro ao carregar lote:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else if (error.response?.status === 404) {
                toast.error('Lote não encontrado');
                router.push('/lotes');
            } else {
                toast.error('Erro ao carregar lote');
            }
        } finally {
            setLoading(false);
        }
    };

    const cabecalhoMedicamento = useMemo(() => {
        if (!lote) return '';
        const base = `${lote.medicamento.descricao}`.trim().toUpperCase();
        const forma = lote.formaFarmaceutica.descricao?.trim();
        return forma ? `${base} — ${forma.toUpperCase()}` : base;
    }, [lote]);

    const timestampUnitarizacao = unitarizadoEm.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const maxEtiquetas = Math.max(1, lote?.qtde || 1);
    const totalEtiquetas = Math.min(Math.max(1, qtdeEtiquetas || 1), maxEtiquetas);
    const etiquetasPorPagina = Math.min(Math.max(1, porPagina || 1), 48);
    const totalPaginas = Math.max(1, Math.ceil(totalEtiquetas / etiquetasPorPagina));

    useEffect(() => {
        if (paginaAtual > totalPaginas) {
            setPaginaAtual(totalPaginas);
        }
    }, [paginaAtual, totalPaginas]);

    const paginas = useMemo(() => {
        return Array.from({ length: totalPaginas }, (_, pageIndex) => {
            const start = pageIndex * etiquetasPorPagina;
            const count = Math.min(etiquetasPorPagina, totalEtiquetas - start);
            return Array.from({ length: count }, (_, i) => start + i + 1);
        });
    }, [totalPaginas, etiquetasPorPagina, totalEtiquetas]);

    const etiquetasPaginaAtual = paginas[paginaAtual - 1] || [];

    const codigoUnidade = (unidade: number) => {
        if (!lote) return '';
        return buildCodigoRastreioUnidade(
            {
                id: lote.id,
                numero: lote.numero,
                datavencimento: lote.datavencimento,
            },
            unidade
        );
    };

    const imprimirPaginaAtual = () => {
        setModoImpressao('pagina');
        requestAnimationFrame(() => window.print());
    };

    const imprimirTodas = () => {
        setModoImpressao('todas');
        requestAnimationFrame(() => window.print());
    };

    if (loading) {
        return (
            <WithPermission requiredPermission="lotes.ver">
                <div className={styles.screen}>
                    <p>Carregando etiquetas…</p>
                </div>
            </WithPermission>
        );
    }

    if (!lote) {
        return (
            <WithPermission requiredPermission="lotes.ver">
                <div className={styles.screen}>
                    <p>Lote não encontrado</p>
                    <Link href="/lotes">Voltar</Link>
                </div>
            </WithPermission>
        );
    }

    const renderEtiqueta = (n: number) => {
        const codigo = codigoUnidade(n);
        return (
            <article key={n} className={styles.label}>
                <header className={styles.labelHeader}>{cabecalhoMedicamento}</header>
                <div className={styles.labelRow}>
                    <span>Cod: {codigo}</span>
                    <span>Val: {formatValidadeBr(lote.datavencimento)}</span>
                </div>
                <div className={styles.labelRow}>
                    <span>Lote: {lote.numero}</span>
                    <span>Farm./Triagem: {lote.user?.username || '—'}</span>
                </div>
                <div className={styles.barcodeWrap}>
                    <BarcodeSvg value={codigo} />
                </div>
                <footer className={styles.labelFooter}>
                    Unitarizado em {timestampUnitarizacao} · GiftMed · un. {n}/{totalEtiquetas}
                </footer>
            </article>
        );
    };

    return (
        <WithPermission requiredPermission="lotes.ver">
            <div
                className={`${styles.screen} ${
                    modoImpressao === 'pagina' ? styles.printModePagina : styles.printModeTodas
                }`}
            >
                <div className={styles.toolbar}>
                    <div className={styles.toolbarLeft}>
                        <Link href={`/lotes/${lote.id}`} className={styles.btnSecondary}>
                            ← Voltar ao lote
                        </Link>
                        <h1>Etiquetas de Unitarização</h1>
                        <p>
                            Lote {lote.numero} · {lote.medicamento.descricao}
                        </p>
                    </div>
                    <div className={styles.toolbarRight}>
                        <label className={styles.qtdeField}>
                            <span>Qtde de etiquetas</span>
                            <input
                                type="number"
                                min={1}
                                max={maxEtiquetas}
                                value={qtdeEtiquetas}
                                onChange={(e) => {
                                    const next = parseInt(e.target.value, 10) || 1;
                                    setQtdeEtiquetas(Math.min(Math.max(1, next), maxEtiquetas));
                                    setPaginaAtual(1);
                                }}
                            />
                        </label>
                        <label className={styles.qtdeField}>
                            <span>Por página</span>
                            <input
                                type="number"
                                min={1}
                                max={48}
                                value={porPagina}
                                onChange={(e) => {
                                    setPorPagina(parseInt(e.target.value, 10) || 1);
                                    setPaginaAtual(1);
                                }}
                            />
                        </label>
                        <div className={styles.pager}>
                            <button
                                type="button"
                                className={styles.btnSecondary}
                                disabled={paginaAtual <= 1}
                                onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
                            >
                                Anterior
                            </button>
                            <span className={styles.pageInfo}>
                                Página {paginaAtual} de {totalPaginas}
                            </span>
                            <button
                                type="button"
                                className={styles.btnSecondary}
                                disabled={paginaAtual >= totalPaginas}
                                onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
                            >
                                Próxima
                            </button>
                        </div>
                        <button type="button" className={styles.btnPrintOutline} onClick={imprimirPaginaAtual}>
                            Imprimir esta página
                        </button>
                        <button type="button" className={styles.btnPrint} onClick={imprimirTodas}>
                            Imprimir todas ({totalPaginas} pág.)
                        </button>
                    </div>
                </div>

                <div className={`${styles.sheet} ${styles.previewSheet}`}>
                    {etiquetasPaginaAtual.map(renderEtiqueta)}
                </div>

                <div className={styles.printAll}>
                    {paginas.map((nums, pageIndex) => (
                        <div key={pageIndex} className={styles.printPage}>
                            <div className={styles.sheet}>{nums.map(renderEtiqueta)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </WithPermission>
    );
}
