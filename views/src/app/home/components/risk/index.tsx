import Image from "next/image";

const risks = [
  {
    icon: "/agua.png",
    alt: "Contaminação da água",
    title: "Contaminação da Água",
    description:
      "Rios, lagos e lençóis freáticos podem ser contaminados, afetando ecossistemas e a água potável.",
  },
  {
    icon: "/saude.png",
    alt: "Riscos à saúde",
    title: "Riscos à Saúde",
    description:
      "Consumo acidental ou contato com substâncias ativas pode causar intoxicações e outros problemas.",
  },
  {
    icon: "/ambiente.png",
    alt: "Impacto ambiental",
    title: "Impacto Ambiental",
    description:
      "Resíduos farmacêuticos afetam fauna, flora e desequilibram ecossistemas inteiros.",
  },
];

export default function RiskPanel() {
  return (
    <aside className="flex h-full flex-col rounded-md bg-gradient-to-br from-[#1e3a5f] via-teal-800 to-emerald-800 p-5 text-white shadow-xl sm:p-6 lg:p-7">
      <div className="mb-5 border-b border-white/15 pb-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
          Atenção
        </p>
        <h2 className="text-xl font-bold leading-snug sm:text-2xl">
          Riscos do Descarte Incorreto
        </h2>
      </div>

      <ul className="flex flex-1 flex-col gap-3">
        {risks.map((risk) => (
          <li
            key={risk.title}
            className="flex gap-3 rounded-md border border-white/10 bg-white/10 p-3 backdrop-blur-sm transition-colors hover:bg-white/15 sm:gap-4 sm:p-4"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-white/95 sm:h-16 sm:w-16">
              <Image
                src={risk.icon}
                alt={risk.alt}
                width={56}
                height={56}
                className="h-10 w-10 object-contain sm:h-12 sm:w-12"
                loading="lazy"
              />
            </div>
            <div className="min-w-0">
              <h3 className="mb-1 text-sm font-semibold text-white sm:text-base">
                {risk.title}
              </h3>
              <p className="text-xs leading-relaxed text-teal-100/90 sm:text-sm">
                {risk.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
