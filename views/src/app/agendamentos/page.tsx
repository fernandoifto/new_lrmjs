'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../home/components/header';
import Menu from '../components/menu';
import styles from './page.module.css';
import Link from 'next/link';

export default function AgendamentosPage() {
    const router = useRouter();

    useEffect(() => {
        const token = getCookieClient();
        if (!token) {
            toast.error('Você precisa estar logado para acessar esta página');
            router.push('/login');
        }
    }, [router]);

    return (
        <>
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 8H4v8h16v-8zm-5-6H9v2H7V5H4v4h16V5h-3v2h-2V5zm-9 8h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z" fill="currentColor" />
                                    </svg>
                                </div>
                                <div>
                                    <h1>Agendamentos</h1>
                                    <p>Gerencie agendamentos, visualize visitados e não visitados</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttonsGrid}>
                            <Link href="/agendamentos/list?filtro=todos" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 8H4v8h16v-8zm-5-6H9v2H7V5H4v4h16V5h-3v2h-2V5zm-9 8h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z" />
                                    </svg>
                                </div>
                                <h3>Todos os Agendamentos</h3>
                                <p>Visualize todos os agendamentos cadastrados no sistema</p>
                            </Link>

                            <Link href="/agendamentos/list?filtro=visitados" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                </div>
                                <h3>Agendamentos Visitados</h3>
                                <p>Visualize apenas os agendamentos que já foram visitados</p>
                            </Link>

                            <Link href="/agendamentos/list?filtro=nao-visitados" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                    </svg>
                                </div>
                                <h3>Agendamentos Não Visitados</h3>
                                <p>Visualize apenas os agendamentos que ainda não foram visitados</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
