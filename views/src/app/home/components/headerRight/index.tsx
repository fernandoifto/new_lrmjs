"use client";

import Link from "next/link";
import {
  FaCalendarAlt,
  FaHandHoldingHeart,
  FaSignInAlt,
} from "react-icons/fa";

const navLinks = [
  {
    href: "/agendar",
    label: "Agendar Coleta",
    icon: FaCalendarAlt,
  },
  {
    href: "/solicitar-doacao",
    label: "Solicitar Doação",
    icon: FaHandHoldingHeart,
  },
  {
    href: "/login",
    label: "Login",
    icon: FaSignInAlt,
  },
];

const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold !text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:!text-white hover:shadow-lg [&_svg]:!text-white";

export default function HeaderRight() {
  return (
    <>
      <nav
        className="hidden items-center gap-3 lg:flex"
        aria-label="Navegação principal"
      >
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={buttonClass}>
            <Icon size={16} aria-hidden />
            {label}
          </Link>
        ))}
      </nav>

      <nav
        className="flex flex-col gap-3 lg:hidden"
        aria-label="Navegação mobile"
      >
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`${buttonClass} py-4 text-base`}
          >
            <Icon size={18} aria-hidden />
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
