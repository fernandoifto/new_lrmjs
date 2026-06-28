"use client";

import Header from "./home/components/header";
import HeaderRight from "./home/components/headerRight";
import Hero from "./home/components/hero";
import Footer from "./home/components/footer";
import HowToDonate from "./home/components/howToDonate";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header>
        <HeaderRight />
      </Header>
      <Hero />
      <HowToDonate />
      <Footer />
    </main>
  );
}
