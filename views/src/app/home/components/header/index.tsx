"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import {
  FaBars,
  FaEnvelope,
  FaLeaf,
  FaMapMarkerAlt,
  FaRecycle,
  FaTimes,
  FaTruck,
} from "react-icons/fa";

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

const highlights = [
  {
    icon: FaTruck,
    title: "Coleta domiciliar",
    text: "Agende a retirada gratuita dos medicamentos",
  },
  {
    icon: FaRecycle,
    title: "Descarte consciente",
    text: "Evite contaminação do solo e da água",
  },
  {
    icon: FaLeaf,
    title: "Doação solidária",
    text: "Medicamentos válidos vão para quem precisa",
  },
];

export default function Header({ children }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="relative sticky top-0 z-50 bg-white shadow-sm">
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
        <div className="flex items-start justify-between gap-4 py-5 lg:items-center lg:gap-8 lg:py-6">
          {/* Logo + informações complementares */}
          <Link
            href="/"
            className="group flex min-w-0 flex-1 flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/giftmedretangular.png"
              alt="GiftMed - Conectando Saúde e Solidariedade"
              width={480}
              height={160}
              priority
              className="h-auto w-52 max-w-full object-contain transition-opacity group-hover:opacity-90 sm:w-60 md:w-72 lg:w-80 xl:w-[22rem]"
            />

            <div className="min-w-0 flex-1 border-teal-100 sm:border-l sm:pl-6">
              <p className="max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
                Plataforma para doação de medicamentos em boas
                condições e descarte ambientalmente correto de resíduos farmacêuticos.
              </p>
            </div>
          </Link>

          {/* Nav desktop */}
          <div className="hidden shrink-0 pt-2 lg:block">{children}</div>

          {/* Menu mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-teal-200 bg-teal-50 text-teal-800 transition-colors hover:bg-teal-100 lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>

        {/* Destaques — desktop/tablet */}
        <div className="hidden border-t border-slate-100 pb-5 pt-4 md:grid md:grid-cols-3 md:gap-4">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex items-start gap-3 rounded-md border border-slate-100 bg-slate-50/80 px-4 py-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-600 text-white">
                <Icon size={16} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1e3a5f]">{title}</p>
                <p className="text-xs leading-relaxed text-slate-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="h-1 w-full bg-gradient-to-r from-[#1e3a5f] via-emerald-500 to-teal-400"
        aria-hidden
      />

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

          <div className="mb-6 space-y-2">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex items-start gap-3 rounded-md border border-slate-100 bg-slate-50 px-3 py-2.5"
              >
                <Icon
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-600"
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-semibold text-[#1e3a5f]">{title}</p>
                  <p className="text-xs text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>

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
