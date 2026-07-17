"use client";

import Header from "./home/components/header";
import HeaderRight from "./home/components/headerRight";
import Banner from "./home/components/banner";
import Hero from "./home/components/hero";
import Footer from "./home/components/footer";
import HowToDonate from "./home/components/howToDonate";
import Partners from "./home/components/partners";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header>
        <HeaderRight />
      </Header>
      <Banner />
      <Hero />
      <HowToDonate />
      <Partners />
      <Footer />
    </main>
  );
}
