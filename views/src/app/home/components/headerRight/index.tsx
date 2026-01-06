'use client';

import Link from 'next/link';
import styles from './styles.module.css';

export default function HeaderRight() {
  return (
    <div>
      <div className={styles.headerTitle}>
        <span className={styles.highlight}>REMED</span>
        <span className={styles.subtitle}>Descarte consciente de medicamentos</span>
      </div>
      <nav className={styles.headerNav}>
        <Link href="/agendar" className={styles.headerButton}>Agendar</Link>
        <Link href="#como-descartar" className={styles.headerButton}>Como Descartar</Link>
        <Link href="#contato" className={styles.headerButton}>Contato</Link>
        <Link href="/login" className={styles.headerButton}>Login</Link>
      </nav>
    </div>
  );
}
