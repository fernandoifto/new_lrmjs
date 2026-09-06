'use client';

import Link from 'next/link';
import { FaPlus, FaEye, FaPills } from 'react-icons/fa';
import { usePermissions } from '@/hooks/usePermissions';
import styles from './page.module.css';

export interface LoteDoado {
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

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export default function LotesDoadosSection({
    agendamentoId,
    lotes,
}: {
    agendamentoId: number;
    lotes: LoteDoado[];
}) {
    const { hasPermission } = usePermissions();
    const podeCriar = hasPermission('lotes.criar');
    const podeVer = hasPermission('lotes.ver');

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <h3>
                    <FaPills size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                    Lotes Doados / Medicamentos Coletados
                </h3>
                {podeCriar && (
                    <Link
                        href={`/lotes/novo?agendamento_id=${agendamentoId}`}
                        className={styles.btnAddLote}
                    >
                        <FaPlus size={14} />
                        Adicionar Medicamento
                    </Link>
                )}
            </div>

            {lotes.length === 0 ? (
                <p className={styles.emptyLotes}>
                    Nenhum lote cadastrado para esta doação.
                    {podeCriar ? ' Use o botão acima para registrar os medicamentos coletados.' : ''}
                </p>
            ) : (
                <div className={styles.lotesTableWrap}>
                    <table className={styles.lotesTable}>
                        <thead>
                            <tr>
                                <th>Número</th>
                                <th>Medicamento</th>
                                <th>Forma</th>
                                <th>Qtde</th>
                                <th>Vencimento</th>
                                {podeVer && <th className={styles.lotesActionsCol}>Ações</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {lotes.map((lote) => (
                                <tr key={lote.id}>
                                    <td>
                                        <strong>{lote.numero}</strong>
                                    </td>
                                    <td>
                                        <strong>{lote.medicamento.descricao}</strong>
                                        {lote.medicamento.principioativo && (
                                            <span className={styles.loteSubText}>
                                                {lote.medicamento.principioativo}
                                            </span>
                                        )}
                                    </td>
                                    <td>{lote.formaFarmaceutica.descricao}</td>
                                    <td>{lote.qtde}</td>
                                    <td>{formatDate(lote.datavencimento)}</td>
                                    {podeVer && (
                                        <td className={styles.lotesActionsCol}>
                                            <Link
                                                href={`/lotes/${lote.id}`}
                                                className={styles.btnViewLote}
                                                title="Ver lote"
                                            >
                                                <FaEye size={14} />
                                                Ver
                                            </Link>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
