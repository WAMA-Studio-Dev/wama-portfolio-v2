"use client";

import { motion } from "motion/react";
import {
  GitBranch,
  Gauge,
  MagnifyingGlass,
  PaintBrushBroad,
} from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";

const BADGES = [
  { icon: GitBranch, label: "Clean Architecture" },
  { icon: Gauge, label: "60 FPS Animations" },
  { icon: MagnifyingGlass, label: "SEO Focus" },
  { icon: PaintBrushBroad, label: "Custom Web" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-line bg-bg py-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <Reveal>
          <p className="font-mono-wama text-[11px] uppercase tracking-[0.22em] text-tinto">
            Equipo
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 font-sora text-4xl font-semibold tracking-tight text-text md:text-5xl">
            WAMA <span className="italic text-text-dim">Studio</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-3 font-mono-wama text-xs uppercase tracking-[0.16em] text-text-dim">
            Ingeniería de software · Diseño web · Dirección creativa
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-dim">
            <span className="font-semibold text-text">
              Somos dos ingenieros informáticos con una obsesión por el
              software bien hecho.
            </span>{" "}
            WAMA nació de la frustración con las plantillas genéricas y el
            código desechable. Somos dos estudiantes de Ingeniería
            Informática que decidimos convertir esa frustración en un
            estudio: cada proyecto se construye desde cero, con{" "}
            <span className="font-semibold text-text">
              arquitectura limpia, rendimiento medido
            </span>{" "}
            y una estética que no se parece a ningún generador automático.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-3">
          {BADGES.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.span
                key={badge.label}
                data-cursor
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  transform: "translateY(-3px)",
                  borderColor: "var(--line-strong)",
                }}
                className="flex items-center gap-2 rounded-full border border-line bg-fill-ghost px-4 py-2.5 text-sm text-text-dim transition-colors duration-200"
              >
                <Icon size={15} className="text-tinto" />
                {badge.label}
              </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
