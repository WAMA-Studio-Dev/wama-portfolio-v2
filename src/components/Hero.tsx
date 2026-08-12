"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight, InstagramLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import CmdTypewriter from "./CmdTypewriter";
import { useContactDrawer } from "@/lib/contact-drawer-context";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260806_133255_956f653f-5d80-4b06-abd5-0f46c98b60fa.mp4";

// TODO(WAMA): subir una versión comprimida del vídeo para mobile (ideal <2MB,
// h264, sin audio) a /public/videos/hero-mobile.mp4 y pegar la ruta aquí.
const HERO_VIDEO_MOBILE = "";
// TODO(WAMA): subir un poster (frame estático, jpg/webp) a /public/hero-poster.jpg
// y pegar la ruta aquí para evitar el flash negro mientras carga el vídeo.
const HERO_POSTER = "";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { open } = useContactDrawer();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1, 0.92]
  );
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 32]
  );

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative flex min-h-[100dvh] w-full items-center bg-bg"
    >
      <motion.div
        style={{ scale, borderRadius, willChange: "transform" }}
        className="relative flex min-h-[100dvh] w-full items-center overflow-hidden"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_POSTER || undefined}
        >
          {HERO_VIDEO_MOBILE && (
            <source
              media="(max-width: 767px)"
              src={HERO_VIDEO_MOBILE}
              type="video/mp4"
            />
          )}
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
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
            <CmdTypewriter
              as="h1"
              showPrefix={false}
              wordHover
              loop
              speed={28}
              text="Desarrollamos webs rápidas y seguras diseñadas para hacer crecer tu negocio."
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
                Construimos arquitectura web de alto rendimiento para marcas
                que no se conforman con plantillas.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <button
                  type="button"
                  data-cursor
                  onClick={open}
                  className="group inline-flex items-center gap-2 rounded-full bg-tinto px-7 py-3.5 font-sora text-sm font-semibold text-text transition-transform duration-200 ease-out active:scale-[0.97]"
                >
                  Iniciar Proyecto
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
                <a
                  href="#proyectos"
                  data-cursor
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
      </motion.div>
    </section>
  );
}
