"use client";
import Header from "@/app/agendar/components/header";
import styles from "../page.module.css";
import Footer from "@/app/agendar/components/footer";

export default function Agendar() {
  return (
    <main className={styles.page}>
      <Header />
      <Footer />
    </main>
  );
}