'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';
import { FaCalendarAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
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
        <WithPermission requiredPermission="agendamentos.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <FaCalendarAlt size={24} />
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
                                    <FaCalendarAlt size={32} />
                                </div>
                                <h3>Todos os Agendamentos</h3>
                                <p>Visualize todos os agendamentos cadastrados no sistema</p>
                            </Link>

                            <Link href="/agendamentos/list?filtro=visitados" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <FaCheckCircle size={32} />
                                </div>
                                <h3>Agendamentos Visitados</h3>
                                <p>Visualize apenas os agendamentos que já foram visitados</p>
                            </Link>

                            <Link href="/agendamentos/list?filtro=nao-visitados" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <FaExclamationCircle size={32} />
                                </div>
                                <h3>Agendamentos Não Visitados</h3>
                                <p>Visualize apenas os agendamentos que ainda não foram visitados</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}
