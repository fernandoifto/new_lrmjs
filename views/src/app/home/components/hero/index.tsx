import Link from "next/link";
import { FaCalendarAlt, FaCheck } from "react-icons/fa";
import RiskPanel from "../risk";

const features = [
  "Acesso ampliado a essenciais",
  "Redução do descarte químico",
  "Economia para a Gestão Pública",
  "Gestão 100% Rastreável",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-teal-100/30 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="flex flex-col justify-center">
            <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
              <span className="h-2 w-2 rounded-full bg-teal-600" aria-hidden />
              Plataforma de Saúde Sustentável
            </p>

            <h1 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-[#1e3a5f] sm:text-4xl lg:text-[2.5rem] xl:text-5xl">
              Tecnologia Social para{" "}
              <span className="text-emerald-600">Farmácia Solidária</span>
            </h1>

            <p className="mb-8 text-base leading-relaxed text-slate-600 sm:text-lg">
              Transformando medicamentos sem uso em acesso à saúde para quem
              precisa. Conectamos cidadãos, profissionais, hospitais e gestores
              públicos em uma rede totalmente rastreável.
            </p>

            <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-md border border-slate-100 bg-white px-4 py-3.5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                    <FaCheck size={14} aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-[#1e3a5f] sm:text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:min-h-full">
            <RiskPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
