'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../home/components/header';
import Menu from '../components/menu';
import styles from './page.module.css';

export default function SemPermissaoPage() {
    const router = useRouter();

    return (
        <>
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.card}>
                            <div className={styles.cardIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" fill="currentColor" />
                                </svg>
                            </div>
                            <h1>Acesso Negado</h1>
                            <p className={styles.message}>
                                Você não tem permissão para acessar esta página.
                            </p>
                            <p className={styles.submessage}>
                                Entre em contato com o administrador do sistema se você acredita que deveria ter acesso a esta funcionalidade.
                            </p>
                            <div className={styles.actions}>
                                <Link href="/" className={styles.btnPrimary}>
                                    Voltar para Home
                                </Link>
                                <button 
                                    onClick={() => router.back()} 
                                    className={styles.btnSecondary}
                                >
                                    Voltar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
