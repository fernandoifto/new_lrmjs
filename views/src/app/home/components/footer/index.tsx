import Image from "next/image";
import Link from "next/link";
import {
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
import Reveal from "../reveal";

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
    value: "(63) 98122-1957",
    href: "tel:+5563981221957",
  },
];

export default function Footer() {
  return (
    <footer id="contato">
      <div className="bg-[#1e3a5f] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:gap-14">
            <Reveal direction="up">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                  Contato
                </h3>
                <ul className="mb-6 space-y-3">
                  {contactItems.map(({ icon: Icon, label, value, href }) => (
                    <li key={label}>
                      <div className="group flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-600/80 text-white transition-transform duration-300 group-hover:scale-110">
                          <Icon size={14} aria-hidden />
                        </span>
                        <div className="min-w-0 text-left">
                          <p className="text-[10px] font-medium uppercase tracking-wide text-emerald-300/80">
                            {label}
                          </p>
                          {href ? (
                            <a
                              href={href}
                              className="text-sm text-white transition-colors duration-300 hover:text-emerald-200 hover:underline"
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
                        className="group flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500 hover:bg-emerald-600"
                      >
                        <Icon
                          size={15}
                          className="text-emerald-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-white"
                        />
                        <span className="text-xs font-medium text-slate-200 group-hover:text-white">
                          {label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={150}>
              <div className="flex flex-col items-start text-left md:ml-10 lg:ml-20">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                  Sobre a GiftMed
                </h3>

                <Link
                  href="/"
                  className="group mb-4 inline-block transition-transform duration-300 hover:scale-[1.03]"
                >
                  <Image
                    src="/giftmedretangular.png"
                    alt="GiftMed - Conectando Saúde e Solidariedade"
                    width={480}
                    height={160}
                    className="h-auto w-44 max-w-full sm:w-48"
                  />
                </Link>

                <p className="max-w-xs text-sm leading-relaxed text-slate-300">
                  Tecnologia social para farmácia solidária — doação de
                  medicamentos válidos e descarte ambientalmente correto de
                  resíduos farmacêuticos.
                </p>
              </div>
            </Reveal>
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
