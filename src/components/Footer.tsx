"use client";

import Image from "next/image";
import Link from "next/link";
import { InstagramLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { useCookieConsent } from "@/lib/cookie-consent-context";

export default function Footer() {
  const { openSettings } = useCookieConsent();

  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between md:px-10">
        <div className="flex items-center gap-2">
          <span className="relative block h-6 w-6 overflow-hidden rounded-[7px]">
            <Image src="/logo.png" alt="WAMA" fill sizes="24px" className="object-cover" />
          </span>
          <span className="font-sora text-sm text-text-dim">
            WAMA<span className="align-super text-[8px]">®</span> — Web &amp; Creative Studio
          </span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://instagram.com/wama.lab"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            aria-label="Instagram de WAMA"
            className="text-text-dimmer transition-colors duration-200 hover:text-text"
          >
            <InstagramLogo size={18} />
          </a>
          <a
            href="mailto:wamastudio.contacto@gmail.com"
            data-cursor
            aria-label="Email de WAMA"
            className="text-text-dimmer transition-colors duration-200 hover:text-text"
          >
            <EnvelopeSimple size={18} />
          </a>
        </div>

        <p className="font-mono-wama text-[11px] text-text-dimmer">
          © {new Date().getFullYear()} WAMA Studio. Todos los derechos reservados.
        </p>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-5 md:justify-start md:px-10">
          <Link
            href="/aviso-legal"
            data-cursor
            className="font-mono-wama text-[11px] uppercase tracking-[0.1em] text-text-dimmer transition-colors duration-200 hover:text-text"
          >
            Aviso Legal
          </Link>
          <Link
            href="/terminos-y-condiciones"
            data-cursor
            className="font-mono-wama text-[11px] uppercase tracking-[0.1em] text-text-dimmer transition-colors duration-200 hover:text-text"
          >
            Términos y Condiciones
          </Link>
          <Link
            href="/politica-de-privacidad"
            data-cursor
            className="font-mono-wama text-[11px] uppercase tracking-[0.1em] text-text-dimmer transition-colors duration-200 hover:text-text"
          >
            Política de Privacidad
          </Link>
          <Link
            href="/politica-de-cookies"
            data-cursor
            className="font-mono-wama text-[11px] uppercase tracking-[0.1em] text-text-dimmer transition-colors duration-200 hover:text-text"
          >
            Política de Cookies
          </Link>
          <button
            type="button"
            data-cursor
            onClick={openSettings}
            className="font-mono-wama text-[11px] uppercase tracking-[0.1em] text-text-dimmer transition-colors duration-200 hover:text-text"
          >
            Configurar cookies
          </button>
        </div>
      </div>
    </footer>
  );
}
