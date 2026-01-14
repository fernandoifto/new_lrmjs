'use client';

import Link from 'next/link';
import { FaCalendarAlt, FaRecycle, FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import styles from './styles.module.css';

export default function HeaderRight() {
  return (
    <div>
      <div className={styles.headerTitle}>
        <span className={styles.highlight}>REMED</span>
        <span className={styles.subtitle}>Descarte consciente de medicamentos</span>
      </div>
      <nav className={styles.headerNav}>
        <Link href="/agendar" className={styles.headerButton}>
          <FaCalendarAlt size={16} />
          Agendar
        </Link>
        <Link href="#como-descartar" className={styles.headerButton}>
          <FaRecycle size={16} />
          Como Descartar
        </Link>
        <Link href="#contato" className={styles.headerButton}>
          <FaEnvelope size={16} />
          Contato
        </Link>
        <Link href="/login" className={styles.headerButton}>
          <FaSignInAlt size={16} />
          Login
        </Link>
      </nav>
    </div>
  );
}
