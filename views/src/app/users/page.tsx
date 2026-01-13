'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './page.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';

export default function CadastroUsuarios() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Verificar se o usuário está logado
    const token = getCookieClient();
    if (!token) {
      toast.error('Você precisa estar logado para acessar esta página');
      router.push('/login');
      return;
    }
  }, [router]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = getCookieClient();
    if (!token) {
      toast.error('Você precisa estar logado');
      router.push('/login');
      setLoading(false);
      return;
    }

    // Validações
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
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

    try {
      const response = await api.post('/user', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data) {
        toast.success('Usuário criado com sucesso!');
        setTimeout(() => {
          router.push('/users/list');
        }, 1500);
      }
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      if (error.response?.status === 401) {
        toast.error('Sessão expirada. Faça login novamente.');
        router.push('/login');
      } else {
        const errorMessage = error.response?.data?.error || error.message || 'Erro ao realizar cadastro. Tente novamente.';
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Header />
      <Menu />
      <main className={styles.page}>
        <div className={styles.cadastroContainer}>
        <div className={styles.cadastroCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </div>
            <h2>Cadastro de Usuários</h2>
          </div>
          
          <div className={styles.cardBody}>
            <form onSubmit={handleSubmit} className={styles.cadastroForm}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Nome de Usuário</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="username" 
                  name="username"
                  placeholder="Digite seu nome de usuário" 
                  value={formData.username}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  name="email"
                  placeholder="Digite seu e-mail" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  name="password"
                  placeholder="Digite sua senha (mínimo 6 caracteres)" 
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
                  required 
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirmar Senha</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="confirmPassword" 
                  name="confirmPassword"
                  placeholder="Confirme sua senha" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  minLength={6}
                  required 
                />
              </div>
              
              <div className="d-grid gap-2">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
              </div>
              
              <div className="text-center mt-3">
                <span className="text-muted">Já tem uma conta? </span>
                <Link href="/login" className="text-decoration-none">
                  Faça login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      </main>
    </WithPermission>
  );
}

