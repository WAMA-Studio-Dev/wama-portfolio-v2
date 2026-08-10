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
          <h2 className="font-sora text-3xl font-semibold leading-tight tracking-tight text-text md:text-4xl">
            Dos ingenieros informáticos. Una obsesión por el software bien
            hecho.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-dim">
            WAMA nació de la frustración con las plantillas genéricas y el
            código desechable. Somos dos estudiantes de Ingeniería
            Informática que decidimos convertir esa frustración en un
            estudio: cada proyecto se construye desde cero, con arquitectura
            limpia, rendimiento medido y una estética que no se parece a
            ningún generador automático.
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
