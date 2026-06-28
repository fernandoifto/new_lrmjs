import DonatePanel from "../donate";

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
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1e3a5f] via-emerald-500 to-teal-400" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-600">
              Passo a passo
            </p>
            <h3 className="mb-8 text-xl font-bold text-[#1e3a5f] sm:text-2xl">
              Como doar ou descartar corretamente
            </h3>

            <ol className="relative flex flex-1 flex-col gap-0">
              {steps.map((step, index) => (
                <li
                  key={step.number}
                  className="relative flex gap-4 pb-8 last:pb-0"
                >
                  {index < steps.length - 1 && (
                    <span
                      className="absolute left-5 top-10 h-[calc(100%-2rem)] w-0.5 bg-emerald-100"
                      aria-hidden
                    />
                  )}

                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-emerald-600 text-sm font-bold text-white shadow-md">
                    {step.number}
                  </span>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <h4 className="mb-1 text-base font-semibold text-[#1e3a5f] sm:text-lg">
                      {step.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <DonatePanel />
        </div>
      </div>
    </section>
  );
}
