import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaEnvelope,
  FaInstagram,
  FaLeaf,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRecycle,
  FaTruck,
  FaYoutube,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

const socialLinks = [
  { href: "#", label: "TikTok", icon: FaTiktok },
  { href: "#", label: "Instagram", icon: FaInstagram },
  { href: "#", label: "YouTube", icon: FaYoutube },
];

const brandPillars = [
  { icon: FaLeaf, label: "Saúde solidária" },
  { icon: FaRecycle, label: "Descarte consciente" },
  { icon: FaTruck, label: "Coleta gratuita" },
];

const brandLinks = [
  { href: "/agendar", label: "Agendar coleta" },
  { href: "#doe-medicamentos", label: "Como doar" },
  { href: "#contato", label: "Fale conosco" },
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
          <div className="grid gap-10 md:grid-cols-2 lg:gap-14">

            {/* Contato e redes — esquerda */}
            <div>
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

            {/* Marca — direita */}
            <div>
              <div className="flex flex-col items-center rounded-md border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm">
                <h3 className="mb-4 w-full text-sm font-semibold uppercase tracking-wider text-emerald-400">
                  Sobre a GiftMed
                </h3>

                <Link
                  href="/"
                  className="group mb-4 inline-block transition-transform hover:scale-[1.02]"
                >
                  <Image
                    src="/giftmedquadrado.png"
                    alt="GiftMed - Conectando Saúde e Solidariedade"
                    width={200}
                    height={200}
                    className="h-auto w-32 max-w-full rounded-md bg-white/95 p-2 shadow-sm transition-shadow group-hover:shadow-md sm:w-36"
                  />
                </Link>

                <p className="mb-1 text-sm font-semibold italic text-emerald-300">
                  Conectando Saúde e Solidariedade
                </p>
                <p className="mb-5 max-w-xs text-sm leading-relaxed text-slate-300">
                  Tecnologia social para farmácia solidária — doação de
                  medicamentos válidos e descarte ambientalmente correto de
                  resíduos farmacêuticos.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-5 text-center sm:px-6 lg:px-8">
          <p className="text-xs text-slate-400 sm:text-sm">
            &copy; {new Date().getFullYear()} GiftMed. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
