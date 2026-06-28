'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaSignInAlt } from 'react-icons/fa';

const inputClass =
  'w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:bg-slate-100';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      toast.error('Por favor, preencha todos os campos!');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor, insira um e-mail válido!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        toast.error(
          (data as { error?: string }).error ||
            'Erro ao fazer login. Tente novamente.'
        );
        return;
      }

      toast.success('Login realizado com sucesso!');
      setTimeout(() => {
        router.push('/agendamentos');
      }, 1000);
    } catch (error: unknown) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600"
        >
          <FaArrowLeft size={14} aria-hidden />
          Voltar para a página inicial
        </Link>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-start gap-4 border-b border-slate-200 bg-emerald-50/60 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <FaSignInAlt size={18} aria-hidden />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#1e3a5f]">Login</h1>
              <p className="mt-1 text-sm text-slate-500">
                Acesse a área administrativa do GiftMed
              </p>
            </div>
          </div>

          <div className="p-6">
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={inputClass}
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>

              <p className="text-center text-sm">
                <Link
                  href="/esqueci-senha"
                  className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Esqueceu sua senha?
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
