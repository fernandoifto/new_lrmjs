import DonatePanel from "../donate";
import Reveal from "../reveal";

const steps = [
  {
    number: 1,
    title: "Separe",
    description:
      "Organize os medicamentos em desuso — válidos para doação ou vencidos para descarte.",
  },
  {
    number: 2,
    title: "Agende",
    description:
      "Marque a coleta domiciliar gratuita pelo GiftMed, informando endereço e contato.",
  },
  {
    number: 3,
    title: "Aguarde",
    description:
      "Um agente da prefeitura passará no local na data combinada para retirar os itens.",
  },
  {
    number: 4,
    title: "Compartilhe",
    description:
      "Conte para familiares e vizinhos — quanto mais pessoas participam, maior o impacto.",
  },
];

export default function HowToDonate() {
  return (
    <section className="relative bg-slate-50 py-14 sm:py-20" id="doe-medicamentos">
      <div className="animate-shimmer-line absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1e3a5f] via-emerald-500 to-teal-400" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal direction="left">
            <div className="hover-lift flex h-full flex-col rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                Passo a passo
              </p>
              <h3 className="mb-8 text-xl font-bold text-[#1e3a5f] sm:text-2xl">
                Como doar ou descartar corretamente
              </h3>

              <ol className="relative flex flex-1 flex-col gap-0">
                {steps.map((step, index) => (
                  <Reveal key={step.number} delay={index * 100}>
                    <li className="group relative flex gap-4 pb-8 last:pb-0">
                      {index < steps.length - 1 && (
                        <span
                          className="absolute left-5 top-10 h-[calc(100%-2rem)] w-0.5 bg-emerald-100 transition-colors duration-300 group-hover:bg-emerald-300"
                          aria-hidden
                        />
                      )}

                      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-emerald-600 text-sm font-bold text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:shadow-lg">
                        {step.number}
                      </span>

                      <div className="min-w-0 flex-1 pt-0.5 transition-transform duration-300 group-hover:translate-x-1">
                        <h4 className="mb-1 text-base font-semibold text-[#1e3a5f] sm:text-lg">
                          {step.title}
                        </h4>
                        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <DonatePanel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
