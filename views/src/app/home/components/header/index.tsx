"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { FaBars, FaEnvelope, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

type HeaderProps = {
  children?: ReactNode;
};

const infoBar = [
  {
    icon: FaMapMarkerAlt,
    label: "Araguaína — TO",
  },
  {
    icon: FaEnvelope,
    label: "contato@giftmed.org",
    href: "mailto:contato@giftmed.org",
  },
];

export default function Header({ children }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`relative sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "shadow-md shadow-slate-900/5" : "shadow-sm"
      }`}
    >
      {/* Barra superior — contatos e localização */}
      <div className="border-b border-teal-900/10 bg-[#1e3a5f] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-xs sm:justify-between sm:px-6 sm:text-sm lg:px-8">
          {infoBar.map(({ icon: Icon, label, href }) =>
            href ? (
              <a
                key={label}
                href={href}
                className="flex items-center gap-2 transition-colors hover:text-emerald-300"
              >
                <Icon size={13} className="shrink-0 text-emerald-400" aria-hidden />
                {label}
              </a>
            ) : (
              <span key={label} className="flex items-center gap-2">
                <Icon size={13} className="shrink-0 text-emerald-400" aria-hidden />
                {label}
              </span>
            )
          )}
        </div>
      </div>

      {/* Área principal */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-6 lg:gap-8 lg:py-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 items-center"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/giftmedretangular.png"
              alt="GiftMed - Conectando Saúde e Solidariedade"
              width={480}
              height={160}
              priority
              className="h-auto w-44 max-w-full object-contain transition-opacity group-hover:opacity-90 sm:w-52 md:w-60"
            />
          </Link>

          {/* Nav desktop */}
          <div className="hidden shrink-0 lg:block">{children}</div>

          {/* Menu mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-teal-200 bg-teal-50 text-teal-800 transition-colors hover:bg-teal-100 lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Painel mobile */}
      <div
        className={`absolute left-0 right-0 top-full z-40 overflow-hidden border-t border-slate-100 bg-white shadow-xl transition-all duration-300 lg:hidden ${
          menuOpen
            ? "visible max-h-[calc(100dvh-6rem)] opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto px-4 py-6 sm:px-6">
          <div onClick={() => setMenuOpen(false)}>{children}</div>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 top-0 z-[-1] bg-black/25 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
      )}
    </header>
  );
}
