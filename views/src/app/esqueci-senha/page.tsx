'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './page.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { api } from '@/api/api';
import { toast } from 'react-toastify';

export default function EsqueciSenha() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validações
    if (!email) {
      toast.error('Por favor, informe seu e-mail!');
      setLoading(false);
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor, insira um e-mail válido!');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/forgot-password', {
        email: email
      });

      if (response.data) {
        toast.success('Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha!');
        setEmailSent(true);
      }
    } catch (error: any) {
      console.error('Erro ao solicitar recuperação:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Erro ao solicitar recuperação. Tente novamente.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
              </svg>
            </div>
            <h2>Recuperar Senha</h2>
          </div>
          
          <div className={styles.cardBody}>
            {!emailSent ? (
              <>
                <p className={styles.description}>
                  Digite seu e-mail cadastrado e enviaremos um link para redefinir sua senha.
                </p>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email"
                      placeholder="Digite seu e-mail" 
                      value={email}
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
                      {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
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
                <h3>E-mail Enviado!</h3>
                <p>
                  Se o e-mail <strong>{email}</strong> estiver cadastrado, você receberá um link para redefinir sua senha.
                </p>
                <p className={styles.smallText}>
                  Verifique sua caixa de entrada e também a pasta de spam.
                </p>
                <p className={styles.smallText}>
                  O link expira em 1 hora.
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

