import axios from "axios";
import { AgendarForm } from "./forms";
import { api } from "@/api/api";
import type { ITurno } from "@/app/agendar/hooks/hooksAgendamentoForm";
import Header from "../home/components/header";
import HeaderRight from "../home/components/headerRight";
import Footer from "../home/components/footer";

export const dynamic = "force-dynamic";

function isUnreachableApiError(e: unknown): boolean {
  if (!axios.isAxiosError(e)) return false;
  const code = e.code;
  return (
    code === "ECONNREFUSED" ||
    code === "ENOTFOUND" ||
    code === "ETIMEDOUT" ||
    code === "ECONNRESET"
  );
}

export default async function Agendar() {
  let turnos: ITurno[] = [];
  let apiMessage: string | null = null;

  try {
    const response = await api.get("/turnos", {
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
      apiMessage =
        "Não foi possível carregar os turnos. Tente novamente em instantes.";
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header>
        <HeaderRight />
      </Header>

      <main className="flex-1">
        {apiMessage ? (
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div
              className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
              role="alert"
            >
              {apiMessage}
            </div>
          </div>
        ) : null}
        <AgendarForm turnos={turnos} />
      </main>

      <Footer />
    </div>
  );
}
