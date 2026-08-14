"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { InstagramLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import SpecularButton from "./ui/SpecularButton";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-5">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "flex h-14 w-full max-w-5xl items-center justify-between rounded-full border border-line px-3 pl-4 backdrop-blur-xl transition-colors duration-300 md:h-16 md:px-4 md:pl-5",
          scrolled ? "bg-bg/80 shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : "bg-bg/40"
        )}
      >
        <a
          href="#inicio"
          data-cursor
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#inicio")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group flex items-center gap-2"
        >
          <motion.span
            className="relative block h-8 w-8 overflow-hidden rounded-[10px] md:h-9 md:w-9"
            style={{ perspective: 400 }}
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/logo.png"
              alt="WAMA"
              fill
              sizes="36px"
              className="object-cover drop-shadow-[0_0_12px_rgba(122,26,36,0.45)]"
              priority
            />
          </motion.span>
          <span className="font-sora text-sm font-semibold tracking-tight text-text">
            WAMA<span className="align-super text-[9px] text-text-dim">®</span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <SpecularButton
            as="a"
            href="https://instagram.com/wama.lab"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            aria-label="Instagram de WAMA"
            radius={999}
            lineColor="#ffffff"
            textColor="var(--text-dim)"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 font-mono-wama text-[11.5px] uppercase tracking-[0.06em] text-text-dim transition-colors duration-200 hover:border-line-strong hover:text-text md:px-4"
          >
            <InstagramLogo size={14} />
            <span className="hidden sm:inline">Instagram</span>
          </SpecularButton>
          <SpecularButton
            as="a"
            href="mailto:wamastudio.contacto@gmail.com"
            data-cursor
            aria-label="Email de WAMA"
            radius={999}
            lineColor="#ffffff"
            textColor="var(--text-dim)"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 font-mono-wama text-[11.5px] uppercase tracking-[0.06em] text-text-dim transition-colors duration-200 hover:border-line-strong hover:text-text md:px-4"
          >
            <EnvelopeSimple size={14} />
            <span className="hidden sm:inline">Email</span>
          </SpecularButton>
        </div>
      </motion.nav>
    </header>
  );
}
