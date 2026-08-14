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
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 md:pt-4">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "grid h-11 w-full max-w-[280px] grid-cols-[auto_1fr_auto] items-center gap-1.5 rounded-full border border-line px-2 backdrop-blur-xl transition-colors duration-300 md:h-12 md:max-w-xs md:px-2.5",
          scrolled ? "bg-bg/80 shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : "bg-bg/40"
        )}
      >
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
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-text-dim transition-colors duration-200 hover:border-line-strong hover:text-text md:h-9 md:w-9"
        >
          <InstagramLogo size={15} />
        </SpecularButton>

        <a
          href="#inicio"
          data-cursor
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#inicio")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group flex items-center justify-center gap-1.5"
        >
          <motion.span
            className="relative block h-6 w-6 overflow-hidden rounded-[7px] md:h-7 md:w-7"
            style={{ perspective: 400 }}
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/logo.png"
              alt="WAMA"
              fill
              sizes="28px"
              className="object-cover drop-shadow-[0_0_12px_rgba(122,26,36,0.45)]"
              priority
            />
          </motion.span>
          <span className="font-sora text-xs font-semibold tracking-tight text-text md:text-sm">
            WAMA<span className="align-super text-[8px] text-text-dim">®</span>
          </span>
        </a>

        <SpecularButton
          as="a"
          href="mailto:wamastudio.contacto@gmail.com"
          data-cursor
          aria-label="Email de WAMA"
          radius={999}
          lineColor="#ffffff"
          textColor="var(--text-dim)"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-text-dim transition-colors duration-200 hover:border-line-strong hover:text-text md:h-9 md:w-9"
        >
          <EnvelopeSimple size={15} />
        </SpecularButton>
      </motion.nav>
    </header>
  );
}
