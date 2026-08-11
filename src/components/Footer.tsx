import Image from "next/image";
import { InstagramLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
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
    </footer>
  );
}
