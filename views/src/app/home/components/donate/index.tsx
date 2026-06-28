import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

const benefits = [
  "Ajude quem não tem condições de comprar medicamentos",
  "Reduza o desperdício de medicamentos em boas condições",
  "Participe de campanhas de arrecadação",
];

export default function DonatePanel() {
  return (
    <div className="flex h-full flex-col rounded-md border border-emerald-100 bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white shadow-lg sm:p-8">
      <div className="mb-5 flex justify-center overflow-hidden rounded-md bg-white/10 py-3">
        <Image
          src="/doacao.png"
          alt="Doação de medicamentos pelo GiftMed"
          width={500}
          height={280}
          className="h-[163px] w-auto max-w-[338px] object-contain sm:h-[190px] sm:max-w-[406px]"
          loading="lazy"
        />
      </div>

      <h2 className="mb-3 text-xl font-bold sm:text-2xl">
        Doe Medicamentos Não Utilizados
      </h2>

      <p className="mb-5 text-sm leading-relaxed text-emerald-50 sm:text-base">
        Medicamentos dentro do prazo de validade e em boas condições podem fazer
        a diferença na vida de quem precisa.
      </p>

      <ul className="mb-6 flex-1 space-y-2.5">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2.5">
            <FaCheckCircle
              className="mt-0.5 shrink-0 text-emerald-200"
              size={16}
              aria-hidden
            />
            <span className="text-sm text-white/95 sm:text-base">{benefit}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/agendar"
        className="inline-flex w-full items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold !text-[#1e3a5f] shadow-md transition-all hover:bg-emerald-50 hover:!text-[#1e3a5f] sm:text-base"
      >
        Agende sua doação ou descarte
      </Link>
    </div>
  );
}
