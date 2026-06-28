import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

const partners = [
  {
    src: "/parceiros/fapt-1.png",
    alt: "FAPT — Fundo de Apoio à Pesquisa e Tecnologia",
  },
  {
    src: "/parceiros/rede-deser.png",
    alt: "Rede DESER",
  },
  {
    src: "/parceiros/araguaina.png",
    alt: "Prefeitura de Araguaína",
  },
  {
    src: "/parceiros/ifto.png",
    alt: "IFTO — Instituto Federal do Tocantins",
  }
];

const socialLinks = [
  { href: "#", label: "TikTok", icon: FaTiktok },
  { href: "#", label: "Instagram", icon: FaInstagram },
  { href: "#", label: "YouTube", icon: FaYoutube },
];

const contactItems = [
  {
    icon: FaMapMarkerAlt,
    label: "Localização",
    value: "Araguaína — TO",
    href: null,
  },
  {
    icon: FaEnvelope,
    label: "E-mail",
    value: "contato@giftmed.org",
    href: "mailto:contato@giftmed.org",
  },
  {
    icon: FaPhoneAlt,
    label: "Telefone",
    value: "(XX) XXXX-XXXX",
    href: null,
  },
];

export default function Footer() {
  return (
    <footer id="contato">
      <div
        className="h-1 w-full bg-gradient-to-r from-[#1e3a5f] via-emerald-500 to-teal-400"
        aria-hidden
      />

      <div className="bg-[#1e3a5f] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Marca — esquerda */}
            <div className="md:order-1">
              <Link href="/" className="inline-block">
                <Image
                  src="/giftmedquadrado.png"
                  alt="GiftMed - Conectando Saúde e Solidariedade"
                  width={200}
                  height={200}
                  className="mb-4 h-auto w-36 max-w-full rounded-md bg-white/95 p-2 sm:w-40"
                />
              </Link>
              <p className="mb-2 text-sm font-medium italic text-emerald-300">
                Conectando Saúde e Solidariedade
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-slate-300">
                Plataforma para doação e descarte consciente de medicamentos em
                Araguaína — TO.
              </p>
            </div>

            {/* Parceiros — centro */}
            <div className="text-center md:order-2">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Parceiros
              </h3>
              <div className="mx-auto grid max-w-sm grid-cols-2 gap-3">
                {partners.map((partner) => (
                  <div
                    key={partner.src}
                    className="flex items-center justify-center rounded-md bg-white p-3 shadow-sm transition-transform hover:scale-[1.02]"
                  >
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      width={160}
                      height={80}
                      className="h-12 w-full object-contain sm:h-14"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Contato e redes — direita */}
            <div className="md:order-3">
              <div className="rounded-md border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                  Contato
                </h3>
                <ul className="mb-6 space-y-3">
                  {contactItems.map(({ icon: Icon, label, value, href }) => (
                    <li key={label}>
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-600/80 text-white">
                          <Icon size={14} aria-hidden />
                        </span>
                        <div className="min-w-0 text-left">
                          <p className="text-[10px] font-medium uppercase tracking-wide text-emerald-300/80">
                            {label}
                          </p>
                          {href ? (
                            <a
                              href={href}
                              className="text-sm text-white transition-colors hover:text-emerald-200 hover:underline"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="text-sm text-slate-100">{value}</p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 pt-4">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                    Siga-nos
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map(({ href, label, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="group flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 transition-all hover:border-emerald-500 hover:bg-emerald-600"
                      >
                        <Icon
                          size={15}
                          className="text-emerald-300 group-hover:text-white"
                        />
                        <span className="text-xs font-medium text-slate-200 group-hover:text-white">
                          {label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-5 text-center sm:px-6 lg:px-8">
          <p className="text-xs text-slate-400 sm:text-sm">
            &copy; {new Date().getFullYear()} GiftMed. Todos os direitos
            reservados.
          </p>
          <p className="mx-auto mt-2 max-w-3xl text-xs leading-relaxed text-slate-400 sm:text-sm">
            Este sistema foi desenvolvido com recursos obtidos por meio do
            projeto aprovado no Edital nº 02/2024 – FAPT/SEPLAN, no âmbito do
            Projeto Rede DESER.
          </p>
        </div>
      </div>
    </footer>
  );
}
