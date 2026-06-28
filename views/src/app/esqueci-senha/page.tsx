'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaArrowLeft, FaKey } from 'react-icons/fa';
import { api } from '@/api/api';
import { toast } from 'react-toastify';

const inputClass =
  'w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:bg-slate-100';

export default function EsqueciSenha() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      toast.error('Por favor, informe seu e-mail!');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor, insira um e-mail válido!');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/forgot-password', { email });

      if (response.data) {
        toast.success(
          'Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha!'
        );
        setEmailSent(true);
      }
    } catch (error: unknown) {
      console.error('Erro ao solicitar recuperação:', error);
      toast.error('Erro ao solicitar recuperação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

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
              <FaKey size={18} aria-hidden />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#1e3a5f]">
                Recuperar Senha
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Enviaremos um link para redefinir sua senha
              </p>
            </div>
          </div>

          <div className="p-6">
            {!emailSent ? (
              <>
                <p className="mb-5 text-center text-sm text-slate-500">
                  Digite seu e-mail cadastrado e enviaremos um link para
                  redefinir sua senha.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={inputClass}
                      placeholder="Digite seu e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={loading}
                  >
                    {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
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
                  E-mail Enviado!
                </h2>
                <p className="mb-2 text-sm text-slate-600">
                  Se o e-mail <strong>{email}</strong> estiver cadastrado, você
                  receberá um link para redefinir sua senha.
                </p>
                <p className="text-sm text-slate-500">
                  Verifique sua caixa de entrada e também a pasta de spam.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  O link expira em 1 hora.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
