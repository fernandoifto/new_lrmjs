'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';
import { FaCalendarAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';

export default function AgendamentosPage() {
    const router = useRouter();

    useEffect(() => {
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
                                    <p>Gerencie agendamentos por status de visita</p>
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

                            <Link href="/agendamentos/list?filtro=aguardando_agendamento" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <FaCheckCircle size={32} />
                                </div>
                                <h3>Aguardando Agendamento</h3>
                                <p>Visualize os agendamentos ainda não marcados para hoje</p>
                            </Link>

                            <Link href="/agendamentos/list?filtro=visita_marcada_hoje" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <FaExclamationCircle size={32} />
                                </div>
                                <h3>Visita Marcada para Hoje</h3>
                                <p>Visualize os agendamentos previstos para atendimento hoje</p>
                            </Link>

                            <Link href="/agendamentos/list?filtro=visitado" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <FaCheckCircle size={32} />
                                </div>
                                <h3>Visitado</h3>
                                <p>Visualize os agendamentos já concluídos</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}
