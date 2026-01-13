'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../home/components/header';
import Menu from '../components/menu';
import WithPermission from '@/components/withPermission';
import styles from './page.module.css';
import Link from 'next/link';
import { FaUsers, FaUsersCog, FaShieldAlt } from 'react-icons/fa';

export default function PermissoesPage() {
    const router = useRouter();

    useEffect(() => {
        const token = getCookieClient();
        if (!token) {
            toast.error('Você precisa estar logado para acessar esta página');
            router.push('/login');
        }
    }, [router]);

    return (
        <WithPermission requiredPermission="admin">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerIcon}>
                                    <FaUsersCog size={24} />
                                </div>
                                <div>
                                    <h1>Grupos e Usuários</h1>
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttonsGrid}>
                            <Link href="/users/list" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <FaUsers size={32} />
                                </div>
                                <h3>Usuários</h3>
                                <p>Gerencie os usuários do sistema</p>
                            </Link>

                            <Link href="/permissoes/grupos/list" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <FaUsersCog size={32} />
                                </div>
                                <h3>Grupos</h3>
                                <p>Gerencie os grupos de usuários do sistema</p>
                            </Link>

                            <Link href="/permissoes/permissoes/list" className={styles.buttonCard}>
                                <div className={styles.buttonIcon}>
                                    <FaShieldAlt size={32} />
                                </div>
                                <h3>Permissões</h3>
                                <p>Gerencie as permissões do sistema</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}
