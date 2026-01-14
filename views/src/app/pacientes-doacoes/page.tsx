'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import { FaHandHoldingHeart, FaUserFriends } from 'react-icons/fa';
import styles from './page.module.css';
import Link from 'next/link';

export default function PacientesDoacoesPage() {
    const router = useRouter();
    const { hasPermission, hasAnyPermission, isAdmin, loading } = usePermissions();

    useEffect(() => {
        const token = getCookieClient();
        if (!token) {
            toast.error('Você precisa estar logado para acessar esta página');
            router.push('/login');
        }
    }, [router]);

    return (
        <WithPermission requiredPermission="pacientes.ver">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <FaHandHoldingHeart size={24} />
                                </div>
                                <div>
                                    <h1>Pacientes e Doações</h1>
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttonsGrid}>
                            {(isAdmin || hasPermission('pacientes.ver')) && (
                                <Link href="/pacientes" className={styles.buttonCard}>
                                    <div className={styles.buttonIcon}>
                                        <FaUserFriends size={32} />
                                    </div>
                                    <h3>Pacientes</h3>
                                    <p>Gerencie os pacientes do sistema</p>
                                </Link>
                            )}

                            {(isAdmin || hasPermission('retiradas.ver')) && (
                                <Link href="/retiradas" className={styles.buttonCard}>
                                    <div className={styles.buttonIcon}>
                                        <FaHandHoldingHeart size={32} />
                                    </div>
                                    <h3>Doações</h3>
                                    <p>Gerencie as doações e retiradas de medicamentos</p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}
