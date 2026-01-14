'use client';

import Link from 'next/link';
import { FaCalendarAlt, FaHandHoldingHeart, FaSignInAlt } from 'react-icons/fa';
import styles from './styles.module.css';

export default function HeaderRight() {
  return (
    <div>
      <div className={styles.headerTitle}>
        <div className={styles.titleContent}>
          <div className={styles.iconWrapper}>
            <FaHandHoldingHeart size={32} />
          </div>
          <div className={styles.titleText}>
            <span className={styles.highlight}>REMED</span>
            <span className={styles.subtitle}>Descarte consciente de medicamentos</span>
          </div>
        </div>
      </div>
      <nav className={styles.headerNav}>
        <Link href="/agendar" className={styles.headerButton}>
          <FaCalendarAlt size={16} />
          Agendar Coleta
        </Link>
        <Link href="/solicitar-doacao" className={styles.headerButton}>
          <FaHandHoldingHeart size={16} />
          Solicitar Doação
        </Link>
        <Link href="/login" className={styles.headerButton}>
          <FaSignInAlt size={16} />
          Login
        </Link>
      </nav>
    </div>
  );
}
