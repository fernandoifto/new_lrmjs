'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './page.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ResetarSenha() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validações
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
        token: token,
        password: formData.password
      });

      if (response.data) {
        toast.success('Senha redefinida com sucesso!');
        setPasswordReset(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Erro ao redefinir senha:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Erro ao redefinir senha. O token pode ter expirado.';
      toast.error(errorMessage);
      
      if (errorMessage.includes('expired') || errorMessage.includes('Invalid')) {
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
      <main className={styles.page}>
        <div className={styles.loginContainer}>
          <div className={styles.loginCard}>
            <div className={styles.cardBody}>
              <div className={styles.errorMessage}>
                <p>Token inválido ou ausente. Redirecionando...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
              </svg>
            </div>
            <h2>Redefinir Senha</h2>
          </div>
          
          <div className={styles.cardBody}>
            {!passwordReset ? (
              <>
                <p className={styles.description}>
                  Digite sua nova senha abaixo.
                </p>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Nova Senha</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      name="password"
                      placeholder="Digite sua nova senha (mínimo 6 caracteres)" 
                      value={formData.password}
                      onChange={handleChange}
                      minLength={6}
                      required 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Nova Senha</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="confirmPassword" 
                      name="confirmPassword"
                      placeholder="Confirme sua nova senha" 
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
                      {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5a.75.75 0 0 0-.022-1.08z"/>
                  </svg>
                </div>
                <h3>Senha Redefinida!</h3>
                <p>
                  Sua senha foi redefinida com sucesso. Redirecionando para o login...
                </p>
              </div>
            )}
            
            <div className="text-center mt-3">
              <Link href="/login" className="text-decoration-none">
                ← Voltar para o login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

