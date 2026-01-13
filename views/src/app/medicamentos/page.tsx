'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';
import { FaPills, FaBoxes, FaHandHoldingHeart, FaUserFriends, FaTags, FaFlask } from 'react-icons/fa';
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
        <WithPermission requiredPermission="medicamentos.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <FaPills size={24} />
                                </div>
                                <div>
                                    <h1>Medicamentos</h1>
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttonsGrid}>
                            
                            <Link href="/lotes" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <FaBoxes size={32} />
                                </div>
                                <h3>Lotes</h3>
                                <p>Gerencie os lotes de medicamentos do sistema</p>
                            </Link>

                            <Link href="/retiradas" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <FaHandHoldingHeart size={32} />
                                </div>
                                <h3>Doações</h3>
                                <p>Gerencie as doações e retiradas de medicamentos</p>
                            </Link>

                            <Link href="/pacientes" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <FaUserFriends size={32} />
                                </div>
                                <h3>Pacientes</h3>
                                <p>Gerencie os pacientes do sistema</p>
                            </Link>

                            <Link href="/medicamentos/list" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <FaPills size={32} />
                                </div>
                                <h3>Medicamentos</h3>
                                <p>Gerencie os medicamentos do sistema</p>
                            </Link>

                            <Link href="/tipos-medicamentos" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <FaTags size={32} />
                                </div>
                                <h3>Tipos de Medicamentos</h3>
                                <p>Gerencie os tipos de medicamentos do sistema</p>
                            </Link>

                            <Link href="/formas-farmaceuticas" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <FaFlask size={32} />
                                </div>
                                <h3>Formas Farmacêuticas</h3>
                                <p>Gerencie as formas farmacêuticas do sistema</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}

