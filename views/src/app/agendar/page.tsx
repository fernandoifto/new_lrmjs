import axios from "axios";
import { AgendarForm } from './forms';
import { api } from "@/api/api";
import type { ITurno } from '@/app/agendar/hooks/hooksAgendamentoForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../home/components/header';
import HeaderRight from '../home/components/headerRight';

export const dynamic = 'force-dynamic';

function isUnreachableApiError(e: unknown): boolean {
    if (!axios.isAxiosError(e)) return false;
    const code = e.code;
    return code === "ECONNREFUSED" || code === "ENOTFOUND" || code === "ETIMEDOUT" || code === "ECONNRESET";
}

export default async function Agendar() {
    let turnos: ITurno[] = [];
    let apiMessage: string | null = null;

    try {
        const response = await api.get('/turnos', {
            params: { page: 1, pageSize: 100 },
        });
        turnos = response.data?.data ?? [];
    } catch (e) {
        if (isUnreachableApiError(e)) {
            apiMessage =
                "Não foi possível conectar ao servidor da API. Verifique API_INTERNAL_URL no serviço views (Coolify) e redeploy.";
        } else if (axios.isAxiosError(e)) {
            const status = e.response?.status;
            apiMessage = status
                ? `Não foi possível carregar os turnos (API respondeu ${status}). Tente novamente em instantes.`
                : "Não foi possível carregar os turnos. Tente novamente em instantes.";
        } else {
            apiMessage = "Não foi possível carregar os turnos. Tente novamente em instantes.";
        }
    }

    return (
        <>
            <Header>
                <HeaderRight />
            </Header>
            {apiMessage ? (
                <div className="container py-3">
                    <div className="alert alert-warning mb-0" role="alert">
                        {apiMessage}
                    </div>
                </div>
            ) : null}
            <AgendarForm turnos={turnos} />
        </>
    );
}