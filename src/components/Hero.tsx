"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import CmdTypewriter from "./CmdTypewriter";
import SpecularButton from "./ui/SpecularButton";
import { useContactDrawer } from "@/lib/contact-drawer-context";

// `three` pesa ~600kB: se separa del bundle inicial (no bloquea el LCP del
// texto/CTAs, que sí van en el HTML servido) y solo tiene sentido en
// cliente (WebGL), así que va sin SSR.
const FloatingLines = dynamic(() => import("./FloatingLines"), {
  ssr: false,
});

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
  // Fundido orgánico del horizonte a negro puro a medida que el Hero sale
  // de la vista, para que la transición a la siguiente sección no tenga
  // un corte brusco.
  const blackout = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative flex min-h-[100dvh] w-full items-center bg-bg"
    >
      <motion.div
        style={{ scale, borderRadius, willChange: "transform" }}
        className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-bg"
      >
        {/* Líneas flotantes (three.js) sobre las partículas de fondo.
            mix-blend-mode: screen + fondo negro puro del shader = el negro
            no tapa nada de lo que hay detrás, solo se suman las líneas. */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          {/* Sobredimensionado (-170px en cada borde = 1 tile de 340px) para
              que la deriva de las partículas no descubra bordes vacíos; el
              contenedor padre recorta el sobrante. */}
          <div
            className="hero-horizon-stars absolute opacity-70"
            style={{ inset: "-170px" }}
          />
          <FloatingLines
            enabledWaves={["top", "middle", "bottom"]}
            lineCount={6}
            lineDistance={6}
            bendRadius={6}
            bendStrength={-1.2}
            interactive
            parallax
            parallaxStrength={0.15}
            animationSpeed={0.8}
            linesGradient={["#4d1017", "#7a1a24", "#ff3b52"]}
            mixBlendMode="screen"
            className="absolute inset-0 floating-lines-fade-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-transparent" />
        </div>

        {/* Scrim sutil detrás del bloque de texto para garantizar contraste
            frente a la cinta en movimiento */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{
            background:
              "radial-gradient(ellipse 62% 48% at 50% 40%, rgba(11,11,12,0.6), transparent 72%)",
          }}
        />

        {/* Overlay que se funde al fondo base (var(--bg)) conforme se hace
            scroll, para que empalme sin corte con el fondo de la siguiente
            sección (que usa el mismo tono, no negro puro). */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[6] bg-bg"
          style={{ opacity: blackout }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 pt-24 pb-16 text-center md:px-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 font-mono-wama text-[11px] uppercase tracking-[0.22em] text-tinto"
          >
            Desarrollo web a medida
          </motion.p>

          <CmdTypewriter
            as="h1"
            showPrefix={false}
            wordHover
            loop
            speed={28}
            text="Desarrollamos webs rápidas y seguras diseñadas para hacer crecer tu negocio."
            className="text-center font-sora text-3xl font-semibold leading-[1.08] tracking-tighter text-text sm:text-4xl lg:text-5xl xl:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-text-dim"
          >
            Construimos arquitectura web de alto rendimiento para marcas
            que no se conforman con plantillas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <SpecularButton
              type="button"
              data-cursor
              onClick={open}
              radius={999}
              lineColor="#ffffff"
              textColor="var(--text)"
              className="group inline-flex items-center gap-2 rounded-full bg-tinto px-7 py-3.5 font-sora text-sm font-semibold text-text transition-transform duration-200 ease-out active:scale-[0.97]"
            >
              Iniciar Proyecto
              <ArrowUpRight
                size={16}
                weight="bold"
                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </SpecularButton>
            <SpecularButton
              as="a"
              href="#proyectos"
              data-cursor
              radius={999}
              lineColor="#ffffff"
              textColor="var(--text-dim)"
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-sora text-sm font-semibold text-text-dim transition-colors duration-200 hover:border-line-strong hover:text-text"
            >
              Ver Proyectos
            </SpecularButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
