export type AgendamentoStatus =
    | 'AGUARDANDO_AGENDAMENTO'
    | 'VISITA_MARCADA_PARA_HOJE'
    | 'VISITADO';

export type FiltroAgendamento =
    | 'todos'
    | 'aguardando_agendamento'
    | 'visita_marcada_hoje'
    | 'visitado';

export type SortField = 'created' | 'nome' | 'setor' | 'datavisita';

export const statusLabel: Record<AgendamentoStatus, string> = {
    AGUARDANDO_AGENDAMENTO: 'Aguardando',
    VISITA_MARCADA_PARA_HOJE: 'Agendado para hoje',
    VISITADO: 'Concluida',
};

export const filtroLabel: Record<FiltroAgendamento, string> = {
    todos: 'Todos',
    aguardando_agendamento: 'Aguardando',
    visita_marcada_hoje: 'Agendado para hoje',
    visitado: 'Concluidas',
};

export const sortOptions: { value: SortField; label: string }[] = [
    { value: 'created', label: 'Data de criação' },
    { value: 'datavisita', label: 'Melhor data' },
    { value: 'nome', label: 'Nome' },
    { value: 'setor', label: 'Setor' },
];

export function statusBadgeClass(status: AgendamentoStatus): string {
    switch (status) {
        case 'AGUARDANDO_AGENDAMENTO':
            return 'badgeAguardando';
        case 'VISITA_MARCADA_PARA_HOJE':
            return 'badgeHoje';
        case 'VISITADO':
            return 'badgeConcluida';
        default:
            return '';
    }
}
