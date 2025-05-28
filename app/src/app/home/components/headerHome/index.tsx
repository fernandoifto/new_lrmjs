'use client';

import Image from 'next/image';
import styles from './styles.module.css';

export default function HeaderHome() {
  return (
    <>
        <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div>
              <Image
                src="/remed_logo.png"
                alt="Remed - Logística Reversa de Medicamentos"
                width={150}
                height={60}
                priority
                className={styles.logoImage}
              />
            </div>
            {/* Header Right */}
            <div>
              <div className={styles.headerTitle}>
                <span className={styles.highlight}>REMED</span>
                <span className={styles.subtitle}>Descarte consciente de medicamentos</span>
              </div>
              <nav className={styles.headerNav}>
                <a href="#agendar" className={styles.headerButton}>Agendar</a>
                <a href="#como-descartar" className={styles.headerButton}>Como Descartar</a>
                <a href="#contato" className={styles.headerButton}>Contato</a>
              </nav>
            </div>
            {/* End Header Right */}  
          </div>
        </div>
      </header>      
    </>
  );
}