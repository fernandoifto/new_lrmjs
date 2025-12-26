import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './page.module.css';
import Link from 'next/link';
import { api } from '@/api/api';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function Login() {

  async function handleLogin(formData: FormData) {

    'use server'
    const email = formData.get('email')
    const password = formData.get('password')
    
    if(email === "" || password === "") {
      console.log('Por favor, preencha todos os campos.')
      return;
    }
  
    try{
      const response = await api.post('/auth', { 
        email, 
        password 
      })

    if(!response.data.token) {
      return;
    }

    const expressTime = 60 * 60 * 24 * 30 * 1000;
    const cookieStore = await cookies();
    cookieStore.set('session', response.data.token, {
      httpOnly: false,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: expressTime,
    })
    } catch (error) {
      console.log('Erro ao fazer login. Verifique suas credenciais.')
      return;
    }

    redirect('/dashboard');
    
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
            <form action={handleLogin} className={styles.loginForm}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input type="email" className="form-control" id="email" placeholder="Digite seu e-mail" required />
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha</label>
                <input type="password" className="form-control" id="password" placeholder="Digite sua senha" required />
              </div>
              
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Entrar
                </button>
              </div>
              
              <div className="text-center mt-3">
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