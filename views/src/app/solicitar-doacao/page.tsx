'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { api } from '@/api/api';
import Header from '../home/components/header';
import HeaderRight from '../home/components/headerRight';
import Footer from '../home/components/footer';
import { maskCPF } from '../agendar/utils/masks';
import { FaHandHoldingHeart } from 'react-icons/fa';

const inputClass =
  'w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:bg-slate-100';

export default function SolicitarDoacaoPage() {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      toast.error('Por favor, preencha um CPF válido!');
      return;
    }

    setLoading(true);

    try {
      const response = await api.get(`/paciente/cpf/${cpfLimpo}`);
      const { id, pacienteContextToken } = response.data;

      if (typeof window !== 'undefined' && pacienteContextToken) {
        sessionStorage.setItem(
          'lrm_paciente_ctx',
          JSON.stringify({ id, token: pacienteContextToken })
        );
      }

      toast.success('Paciente encontrado! Redirecionando...');
      setTimeout(() => {
        router.push(`/lotes-disponiveis?paciente=${id}`);
      }, 1000);
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 404) {
        toast.info(
          'Paciente não encontrado. Você será redirecionado para o cadastro.'
        );
        setTimeout(() => {
          router.push(`/pacientes/novo?cpf=${cpfLimpo}`);
        }, 1500);
      } else {
        toast.error('Erro ao verificar CPF. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header>
        <HeaderRight />
      </Header>

      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex items-start gap-4 border-b border-slate-200 bg-emerald-50/60 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <FaHandHoldingHeart size={18} aria-hidden />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#1e3a5f]">
                  Solicitar Doação
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Digite seu CPF para verificar se você já está cadastrado
                </p>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="cpf"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    CPF *
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    className={inputClass}
                    required
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(maskCPF(e.target.value))}
                    maxLength={14}
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? 'Verificando...' : 'Verificar CPF'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
