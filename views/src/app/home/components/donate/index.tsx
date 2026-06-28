import Image from "next/image";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaHandHoldingHeart,
  FaPills,
  FaShieldAlt,
  FaTimesCircle,
} from "react-icons/fa";

const canDonate = [
  "Medicamentos dentro do prazo de validade",
  "Embalagem original fechada ou bem conservada",
  "Comprimidos, cápsulas e similares",
];

const cannotDonate = [
  "Medicamentos vencidos ou sem identificação",
  "Seringas, agulhas ou materiais perfurocortantes",
];

export default function DonatePanel() {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-md border border-emerald-200/80 bg-white shadow-lg">
      <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-[#1e3a5f] px-6 pb-8 pt-6 text-white sm:px-8 sm:pt-8">
        <div
          className="pointer-events-none absolute -right-10 top-0 h-32 w-32 rounded-full bg-white/10 blur-2xl"
          aria-hidden
        />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex shrink-0 justify-center sm:justify-start">
            <div className="rounded-md border border-white/20 bg-white/10 p-3">
              <Image
                src="/doacao.png"
                alt="Ilustração de doação de medicamentos"
                width={400}
                height={220}
                className="h-[120px] w-auto object-contain sm:h-[140px]"
                loading="lazy"
              />
            </div>
          </div>

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-100">
              <FaHandHoldingHeart size={11} aria-hidden />
              Doe Medicamentos
            </p>
            <h2 className="text-xl font-bold leading-tight sm:text-2xl">
              Doe com segurança.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-emerald-50/90">
              Agende a coleta em casa e contribua para quem não tem condições
              de comprar medicamentos.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-emerald-100 bg-emerald-50/60 p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-800">
              <FaPills size={14} className="text-emerald-600" aria-hidden />
              Pode doar
            </h3>
            <ul className="space-y-2">
              {canDonate.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-snug text-slate-700"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-red-100 bg-red-50/50 p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-red-900">
              <FaTimesCircle size={14} className="text-red-500" aria-hidden />
              Não aceitamos
            </h3>
            <ul className="space-y-2">
              {cannotDonate.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-snug text-slate-700"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mb-6 flex items-start gap-2 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <FaShieldAlt
            className="mt-0.5 shrink-0 text-emerald-600"
            size={15}
            aria-hidden
          />
          Toda doação passa por triagem técnica antes de ser disponibilizada na
          rede solidária.
        </p>
      </div>
    </article>
  );
}
