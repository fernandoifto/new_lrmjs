'use client';

import Image from 'next/image';
import styles from './styles.module.css';

export default function Header() {
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
          </div>
        </div>
      </header>      
    </>
  );
}