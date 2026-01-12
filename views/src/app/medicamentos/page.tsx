'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../home/components/header';
import Menu from '../components/menu';
import styles from './page.module.css';
import Link from 'next/link';

export default function MedicamentosPage() {
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
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                                <div>
                                    <h1>Medicamentos</h1>
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttonsGrid}>
                            
                            <Link href="/lotes" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h3>Lotes</h3>
                                <p>Gerencie os lotes de medicamentos do sistema</p>
                            </Link>

                            <Link href="/retiradas" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11l-3-3-3 3" />
                                    </svg>
                                </div>
                                <h3>Doações</h3>
                                <p>Gerencie as doações e retiradas de medicamentos</p>
                            </Link>

                            <Link href="/pacientes" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <h3>Pacientes</h3>
                                <p>Gerencie os pacientes do sistema</p>
                            </Link>

                            <Link href="/medicamentos/list" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                                <h3>Medicamentos</h3>
                                <p>Gerencie os medicamentos do sistema</p>
                            </Link>

                            <Link href="/tipos-medicamentos" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 7h16M4 12h16M4 17h16" />
                                        <circle cx="2" cy="7" r="1" />
                                        <circle cx="2" cy="12" r="1" />
                                        <circle cx="2" cy="17" r="1" />
                                    </svg>
                                </div>
                                <h3>Tipos de Medicamentos</h3>
                                <p>Gerencie os tipos de medicamentos do sistema</p>
                            </Link>

                            <Link href="/formas-farmaceuticas" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="8" width="18" height="12" rx="2" />
                                        <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
                                        <circle cx="12" cy="14" r="2" />
                                    </svg>
                                </div>
                                <h3>Formas Farmacêuticas</h3>
                                <p>Gerencie as formas farmacêuticas do sistema</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

