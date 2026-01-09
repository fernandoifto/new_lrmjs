'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import { ReactNode } from 'react';

type HeaderProps = {
  children?: ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerContent}>
          <div>
            <Link href="/">
              <Image
                src="/remed_logo.png"
                alt="Remed - Logística Reversa de Medicamentos"
                width={150}
                height={60}
                priority
                className={styles.logoImage}
              />
            </Link>
          </div>
          {children}
        </div>
      </div>
    </header>
  );
}
