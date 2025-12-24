"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './page.module.css';
import Header from './home/components/header';
import HeaderRight from './home/components/headerRight';
import Footer from './home/components/footer';
import Risk from './home/components/risk';
import HowToDonate from './home/components/howToDonate';
import Donate from './home/components/donate';

/**
 * Componente principal da página inicial
 * Implementa uma landing page para o sistema de logística reversa de medicamentos
 */
export default function Home() {
  return (
    <main className={styles.page}>
      <Header>
        <HeaderRight />
      </Header>
      <Risk />
      <HowToDonate />
      <Donate />
      <Footer />
    </main>
  );
}