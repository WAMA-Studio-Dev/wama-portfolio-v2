"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X } from "@phosphor-icons/react/dist/ssr";
import { List } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { useContactDrawer } from "@/lib/contact-drawer-context";

const LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#tech-stack", label: "Herramientas" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#about", label: "Sobre WAMA" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open: openContactDrawer } = useContactDrawer();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
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
              handleNav("#inicio");
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

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  className="rounded-full px-4 py-2 font-mono-wama text-[12.5px] uppercase tracking-[0.08em] text-text-dim transition-colors duration-200 hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-cursor
              onClick={() => {
                setOpen(false);
                openContactDrawer();
              }}
              className="hidden items-center rounded-full bg-tinto px-5 py-2.5 font-sora text-[13px] font-semibold text-text transition-transform duration-200 ease-out active:scale-[0.97] md:inline-flex"
            >
              EMPECEMOS
            </button>
            <button
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              data-cursor
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-text lg:hidden"
            >
              {open ? <X size={18} /> : <List size={18} />}
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(2% at 92% 5%)" }}
            animate={{ clipPath: "circle(150% at 92% 5%)" }}
            exit={{ clipPath: "circle(2% at 92% 5%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-bg lg:hidden"
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.href);
                }}
                className="px-6 py-3 font-sora text-3xl font-light text-text"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + LINKS.length * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setOpen(false);
                openContactDrawer();
              }}
              className="mt-4 rounded-full bg-tinto px-8 py-3 font-sora text-sm font-semibold text-text"
            >
              EMPECEMOS
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
