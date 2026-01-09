'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './page.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { api } from '@/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { setCookie } from 'cookies-next';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    // Validações
    if (!formData.email || !formData.password) {
      toast.error('Por favor, preencha todos os campos!');
      setLoading(false);
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor, insira um e-mail válido!');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth', {
        email: formData.email,
        password: formData.password
      });

      if (response.data && response.data.token) {
        // Salvar token no cookie
        const expressTime = 60 * 60 * 24 * 30; // 30 dias em segundos
        setCookie('session', response.data.token, {
          maxAge: expressTime,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
        });

        toast.success('Login realizado com sucesso!');
        setTimeout(() => {
          router.push('/agendamentos');
        }, 1000);
      } else {
        toast.error('Erro ao fazer login. Tente novamente.');
      }
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Erro ao fazer login. Verifique suas credenciais.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-person-fill" viewBox="0 0 16 16">
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11"/>
                </svg>  
            </div>
            <h2> <Link className={styles.link} href="/">Login</Link></h2>
          </div>
          
          <div className={styles.cardBody}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
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
                  placeholder="Digite sua senha" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="d-grid gap-2">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
              </div>
              
              <div className="text-center mt-3">
                <span className="text-muted">Não tem uma conta? </span>
                <Link href="/users" className="text-decoration-none">
                  Cadastre-se
                </Link>
              </div>
              
              <div className="text-center mt-2">
                <Link href="/esqueci-senha" className="text-decoration-none">
                  Esqueceu sua senha?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
 }