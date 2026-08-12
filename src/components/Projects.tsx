"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Eye, PlayCircle, Code, X } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";
import CmdTypewriter from "./CmdTypewriter";

interface RealProject {
  kind: "real";
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  longDescription: string;
  stack: string[];
  demoUrl: string;
  /** Solo se define para proyectos con repositorio público (poco frecuente:
   * el código de cliente permanece privado por defecto). */
  codeUrl?: string;
}

interface ComingSoonSlot {
  kind: "coming-soon";
  id: string;
}

type GridItem = RealProject | ComingSoonSlot;

// TODO(WAMA): sustituir por el segundo proyecto real entregado (nombre,
// categoría, capturas propias y stack) cuando esté disponible.
const REAL_PROJECTS: RealProject[] = [
  {
    kind: "real",
    id: "bykanot",
    name: "ByKanot",
    category: "Comunidad & Danza Urbana",
    image: "/projects/kanot/logo.png",
    description:
      "Sitio web para ByKanot, grupo de danza urbana y competición liderado por Ariadna y Eric.",
    longDescription:
      "ByKanot es el grupo de danza urbana y competición liderado por Ariadna y Eric. Diseñamos y desarrollamos su web desde cero para unificar en un mismo sitio todo su ecosistema de marca: la presentación del equipo (Kanot Krew), las temporadas de competición con galería de fotos por edición, Kodigo Klub (su comunidad/eventos), un canal de podcast propio y un sistema de inscripción a formaciones con notificación automática por email al equipo.",
      stack: ["Next.js 16", "React 19", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://www.bykanot.com/",
  },
];

const COMING_SOON_SLOTS: ComingSoonSlot[] = [
  { kind: "coming-soon", id: "confidencial-1" },
  { kind: "coming-soon", id: "confidencial-2" },
];

const GRID_ITEMS: GridItem[] = [...REAL_PROJECTS, ...COMING_SOON_SLOTS];

const CARD_BUTTON_CLASS =
  "inline-flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 font-sora text-xs font-semibold text-text-dim transition-colors duration-200 hover:border-line-strong hover:text-text";

/**
 * Misma estructura de caja que la tarjeta de proyecto real (bloque
 * aspect-video + bloque p-5) para que la altura coincida exactamente en
 * cualquier tamaño de pantalla, sin necesidad de valores mágicos.
 */
function ComingSoonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden px-4">
        <CmdTypewriter
          text="PRÓXIMAMENTE"
          speed={90}
          loop
          showPrefix={false}
          className="text-center font-mono-wama text-2xl uppercase tracking-[0.1em] text-tinto sm:text-3xl sm:tracking-[0.14em] md:text-4xl md:tracking-[0.18em]"
        />
      </div>
      <div className="p-5">
        <p aria-hidden className="invisible font-mono-wama text-[10.5px] uppercase tracking-[0.16em]">
          &nbsp;
        </p>
        <p aria-hidden className="invisible mt-1.5 font-sora text-base font-semibold">
          &nbsp;
        </p>
        <div aria-hidden className="mt-4 flex flex-wrap gap-2">
          <span className={cn(CARD_BUTTON_CLASS, "invisible")}>&nbsp;</span>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<RealProject | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section
      id="proyectos"
      className="relative border-t border-line bg-bg py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <h2 className="max-w-lg font-sora text-3xl font-semibold leading-tight tracking-tight text-text md:text-4xl">
            Proyectos que hablan por sí solos.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-text-dim">
            Una muestra del trabajo entregado. El código fuente de cada
            cliente permanece privado.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {GRID_ITEMS.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.07}>
              {item.kind === "real" && (
                <div className="group overflow-hidden rounded-xl border border-line bg-fill-ghost transition-colors duration-300 hover:border-line-strong">
                  <div className="relative aspect-video w-full overflow-hidden bg-[#111113]">
                    <Image
                      src={item.image}
                      alt={`Captura del proyecto ${item.name}`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-mono-wama text-[10.5px] uppercase tracking-[0.16em] text-tinto">
                      {item.category}
                    </p>
                    <p className="mt-1.5 font-sora text-base font-semibold text-text">
                      {item.name}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        data-cursor
                        onClick={() => setActive(item)}
                        className={CARD_BUTTON_CLASS}
                      >
                        <Eye size={14} weight="bold" />
                        Ver detalles
                      </button>
                      <a
                        href={item.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor
                        className={CARD_BUTTON_CLASS}
                      >
                        <PlayCircle size={14} weight="bold" />
                        Demo
                      </a>
                      {item.codeUrl && (
                        <a
                          href={item.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor
                          className={CARD_BUTTON_CLASS}
                        >
                          <Code size={14} weight="bold" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {item.kind === "coming-soon" && <ComingSoonCard />}
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 10, scale: 0.97, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#131315]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
            >
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <button
                  type="button"
                  aria-label="Cerrar"
                  data-cursor
                  onClick={() => setActive(null)}
                  className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-text-dimmer transition-colors duration-200 hover:bg-white/10 hover:text-text"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={active.image}
                  alt={`Captura del proyecto ${active.name}`}
                  fill
                  sizes="672px"
                  className="object-cover"
                />
              </div>

              <div className="p-6 md:p-8">
                <p className="font-mono-wama text-[10.5px] uppercase tracking-[0.16em] text-tinto">
                  {active.category}
                </p>
                <h3 className="mt-1.5 font-sora text-2xl font-semibold text-text">
                  {active.name}
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-text-dim">
                  {active.longDescription}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {active.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line bg-fill-ghost px-3 py-1 font-mono-wama text-[11px] text-text-dim"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={active.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-tinto px-6 py-3 font-sora text-sm font-semibold text-text transition-transform duration-200 ease-out active:scale-[0.97]"
                >
                  Ver proyecto
                  <ArrowUpRight size={15} weight="bold" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
