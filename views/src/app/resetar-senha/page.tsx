'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
import { api } from '@/api/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const inputClass =
  'w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:bg-slate-100';

function ResetarSenhaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [passwordReset, setPasswordReset] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      toast.error('Token inválido ou ausente!');
      setTimeout(() => {
        router.push('/esqueci-senha');
      }, 2000);
    } else {
      setToken(tokenParam);
    }
  }, [searchParams, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.password || !formData.confirmPassword) {
      toast.error('Por favor, preencha todos os campos!');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem!');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres!');
      setLoading(false);
      return;
    }

    if (!token) {
      toast.error('Token inválido!');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/reset-password', {
        token,
        password: formData.password,
      });

      if (response.data) {
        toast.success('Senha redefinida com sucesso!');
        setPasswordReset(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error: unknown) {
      console.error('Erro ao redefinir senha:', error);
      const axiosError = error as { response?: { data?: { error?: string } }; message?: string };
      const errorMessage =
        axiosError.response?.data?.error ||
        axiosError.message ||
        'Erro ao redefinir senha. O token pode ter expirado.';
      toast.error(errorMessage);

      if (
        errorMessage.includes('expired') ||
        errorMessage.includes('Invalid')
      ) {
        setTimeout(() => {
          router.push('/esqueci-senha');
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-slate-500">
            Token inválido ou ausente. Redirecionando...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        <Link
          href="/login"
          className="mb-5 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600"
        >
          <FaArrowLeft size={14} aria-hidden />
          Voltar para o login
        </Link>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-start gap-4 border-b border-slate-200 bg-emerald-50/60 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <FaShieldAlt size={18} aria-hidden />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#1e3a5f]">
                Redefinir Senha
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Escolha uma nova senha para sua conta
              </p>
            </div>
          </div>

          <div className="p-6">
            {!passwordReset ? (
              <>
                <p className="mb-5 text-center text-sm text-slate-500">
                  Digite sua nova senha abaixo.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={inputClass}
                      placeholder="Digite sua nova senha (mínimo 6 caracteres)"
                      value={formData.password}
                      onChange={handleChange}
                      minLength={6}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className={inputClass}
                      placeholder="Confirme sua nova senha"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      minLength={6}
                      required
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={loading}
                  >
                    {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-4 flex justify-center text-emerald-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5a.75.75 0 0 0-.022-1.08z" />
                  </svg>
                </div>
                <h2 className="mb-3 text-lg font-semibold text-[#1e3a5f]">
                  Senha Redefinida!
                </h2>
                <p className="text-sm text-slate-600">
                  Sua senha foi redefinida com sucesso. Redirecionando para o
                  login...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ResetarSenha() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="text-sm text-slate-500">Carregando...</p>
        </main>
      }
    >
      <ResetarSenhaContent />
    </Suspense>
  );
}
