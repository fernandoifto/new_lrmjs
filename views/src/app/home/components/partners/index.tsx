import Image from "next/image";
import { FaHandshake } from "react-icons/fa";

type Partner = {
  src: string;
  alt: string;
};

type PartnerGroup = {
  title: string;
  partners: Partner[];
  featured?: boolean;
  columns?: 2 | 3 | 4;
};

const partnerGroups: PartnerGroup[] = [
  {
    title: "Instituições Fomentadoras",
    featured: true,
    partners: [
      {
        src: "/parceiros/fapt-1.png",
        alt: "FAPT — Fundo de Apoio à Pesquisa e Tecnologia",
      },
      {
        src: "/parceiros/rede-deser.png",
        alt: "Rede DESER",
      },
    ],
  },
  {
    title: "Parceiros públicos",
    columns: 3,
    partners: [
      {
        src: "/parceiros/govestado.png",
        alt: "Governo do Tocantins",
      },
      {
        src: "/parceiros/araguaina.png",
        alt: "Prefeitura de Araguaína",
      },
      {
        src: "/parceiros/sus.png",
        alt: "SUS — Sistema Único de Saúde",
      },
    ],
  },
  {
    title: "Parceiros acadêmicos",
    columns: 3,
    partners: [
      {
        src: "/parceiros/ifto.png",
        alt: "IFTO — Instituto Federal do Tocantins",
      },
      {
        src: "/parceiros/utfpr.png",
        alt: "UTFPR — Universidade Tecnológica Federal do Paraná",
      },
      {
        src: "/parceiros/ppgep.png",
        alt: "PPGEP — Programa de Pós-Graduação em Engenharia de Produção",
      },
    ],
  },
];

function getPartnerGridClass(group: PartnerGroup): string {
  if (group.featured) {
    return "grid-cols-1 sm:grid-cols-2";
  }

  const columns = group.columns ?? group.partners.length;

  if (columns === 2) {
    return "mx-auto max-w-2xl grid-cols-2";
  }

  if (columns === 3) {
    return "grid-cols-1 sm:grid-cols-3";
  }

  return "grid-cols-2 lg:grid-cols-4";
}

function PartnerLogo({
  partner,
  featured = false,
}: {
  partner: Partner;
  featured?: boolean;
}) {
  return (
    <div
      className={`group flex h-full items-center justify-center rounded-lg border bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5 ${
        featured
          ? "min-h-[112px] border-emerald-200/80 ring-1 ring-emerald-100 hover:border-emerald-300 sm:min-h-[128px]"
          : "min-h-[88px] border-slate-100 hover:border-emerald-200 sm:min-h-[96px]"
      }`}
    >
      <Image
        src={partner.src}
        alt={partner.alt}
        width={220}
        height={110}
        className={`w-full object-contain transition-transform duration-200 group-hover:scale-105 ${
          featured ? "h-14 sm:h-16 lg:h-[4.5rem]" : "h-11 sm:h-12 lg:h-14"
        }`}
        loading="lazy"
      />
    </div>
  );
}

export default function Partners() {
  return (
    <section
      id="parceiros"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-14 sm:py-20"
      aria-labelledby="partners-heading"
    >
      <div
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1e3a5f] via-emerald-500 to-teal-400"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-12 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-teal-100/40 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                <FaHandshake size={12} aria-hidden />
                Rede de colaboração
              </p>
              <h2
                id="partners-heading"
                className="mb-4 text-2xl font-bold tracking-tight text-[#1e3a5f] sm:text-3xl"
              >
                Instituições que apoiam a GiftMed
              </h2>
              <p className="text-pretty text-justify text-base leading-relaxed text-slate-600">
                O projeto nasceu com recursos do projeto O CDR Médio Norte
                Tocantins Edital nº 02/2024 — FAPT/SEPLAN, no âmbito da Rede
                DESER, e conta com instituições fomentadoras, parceiros
                públicos e acadêmicos comprometidos com saúde solidária e
                descarte consciente.
              </p>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-8 lg:space-y-10">
            {partnerGroups.map((group) => (
              <article
                key={group.title}
                className={
                  group.featured
                    ? "rounded-xl border border-emerald-200/60 bg-emerald-50/30 p-5 sm:p-6"
                    : "rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"
                }
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="h-px flex-1 bg-gradient-to-r from-emerald-200 to-transparent"
                    aria-hidden
                  />
                  <h3 className="shrink-0 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    {group.title}
                  </h3>
                  <span
                    className="h-px flex-1 bg-gradient-to-l from-emerald-200 to-transparent"
                    aria-hidden
                  />
                </div>

                <ul className={`grid gap-4 sm:gap-5 ${getPartnerGridClass(group)}`}>
                  {group.partners.map((partner) => (
                    <li key={partner.src}>
                      <PartnerLogo
                        partner={partner}
                        featured={group.featured}
                      />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
