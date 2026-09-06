"use client";

import Link from "next/link";

type Variant = "ghost" | "outline" | "solid";

const navLinks: { href: string; label: string; variant: Variant }[] = [
  {
    href: "/login",
    label: "Login",
    variant: "ghost",
  },
  {
    href: "/agendar",
    label: "Agendar Coleta",
    variant: "solid",
  },
];

const baseClass =
  "inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold transition-all duration-300 active:translate-y-0";

const variantClass: Record<Variant, string> = {
  ghost:
    "border border-slate-200 bg-white !text-slate-800 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50",
  outline:
    "border-2 border-emerald-600 bg-white !text-emerald-700 hover:-translate-y-0.5 hover:bg-emerald-50",
  solid:
    "bg-gradient-to-r from-emerald-600 to-teal-500 !text-white shadow-md shadow-emerald-600/25 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-600/35",
};

export default function HeaderRight() {
  return (
    <>
      <nav
        className="hidden items-center gap-6 lg:flex"
        aria-label="Navegação principal"
      >
        {navLinks.map(({ href, label, variant }) => (
          <Link
            key={href}
            href={href}
            className={`${baseClass} ${variantClass[variant]}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <nav
        className="flex flex-col gap-3 lg:hidden"
        aria-label="Navegação mobile"
      >
        {navLinks.map(({ href, label, variant }) => (
          <Link
            key={href}
            href={href}
            className={`${baseClass} ${variantClass[variant]} py-4 text-base`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
