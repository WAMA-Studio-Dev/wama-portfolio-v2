"use client";

import { motion } from "motion/react";
import { ArrowUpRight, InstagramLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import SplitText from "./SplitText";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260806_133255_956f653f-5d80-4b06-abd5-0f46c98b60fa.mp4";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-bg"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        autoPlay
        muted
        loop
        playsInline
        src={HERO_VIDEO}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/75 to-bg/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/70" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 30%, var(--accent-tinto-glow), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 pt-24 pb-16 md:px-10 md:pt-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 font-mono-wama text-[11px] uppercase tracking-[0.22em] text-text-dim"
          >
            Web &amp; Creative Studio — @wama.lab
          </motion.p>

          <SplitText
            as="h1"
            text="WE BUILD HIGH-PERFORMANCE WEB SYSTEMS THAT SCALE & CONVERT."
            className="font-sora text-3xl font-semibold leading-[1.08] tracking-tighter text-text sm:text-4xl lg:text-5xl xl:text-6xl"
          />
        </div>

        <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-[1.55fr_1fr] md:gap-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md text-base leading-relaxed text-text-dim"
            >
              Diseño y desarrollo web a medida para marcas que compiten en
              serio. Rendimiento extremo, cero plantillas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contacto"
                data-cursor
                data-cursor-label="Ir"
                className="group inline-flex items-center gap-2 rounded-full bg-tinto px-7 py-3.5 font-sora text-sm font-semibold text-text transition-transform duration-200 ease-out active:scale-[0.97]"
              >
                Iniciar Proyecto
                <ArrowUpRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href="#proyectos"
                data-cursor
                data-cursor-label="Ir"
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-sora text-sm font-semibold text-text-dim transition-colors duration-200 hover:border-line-strong hover:text-text"
              >
                Ver Proyectos
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl md:p-7"
          >
          <p className="font-mono-wama text-[11px] uppercase tracking-[0.18em] text-text-dim">
            Contacto directo
          </p>
          <p className="mt-3 text-lg font-medium leading-snug text-text">
            ¿Tienes un proyecto en mente?
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="https://instagram.com/wama.lab"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              data-cursor-label="Abrir"
              className="flex items-center justify-between rounded-xl border border-line bg-fill-ghost px-4 py-3.5 transition-colors duration-200 hover:border-line-strong"
            >
              <span className="flex items-center gap-3 text-sm text-text">
                <InstagramLogo size={18} className="text-tinto" />
                @wama.lab
              </span>
              <ArrowUpRight size={14} className="text-text-dimmer" />
            </a>
            <a
              href="mailto:wamastudio.contacto@gmail.com"
              data-cursor
              data-cursor-label="Escribir"
              className="flex items-center justify-between rounded-xl border border-line bg-fill-ghost px-4 py-3.5 transition-colors duration-200 hover:border-line-strong"
            >
              <span className="flex items-center gap-3 text-sm text-text">
                <EnvelopeSimple size={18} className="text-tinto" />
                wamastudio.contacto@gmail.com
              </span>
              <ArrowUpRight size={14} className="text-text-dimmer" />
            </a>
          </div>

            <p className="mt-6 text-xs leading-relaxed text-text-dimmer">
              Respondemos en menos de 24h. Cuéntanos qué quieres construir.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
