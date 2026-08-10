"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";

const CATEGORIES = [
  {
    title: "Frontend & UI",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend & BDD",
    items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma"],
  },
  {
    title: "Tools & Workflow",
    items: ["Git", "Figma", "Vercel", "Docker", "Linear"],
  },
  {
    title: "Lenguajes",
    items: ["TypeScript", "Python", "C++", "JavaScript", "SQL"],
  },
];

function WaveRow({ items }: { items: string[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="flex flex-wrap gap-3"
      onMouseLeave={() => setHovered(null)}
    >
      {items.map((item, i) => {
        const distance = hovered === null ? 999 : Math.abs(i - hovered);
        const lift = hovered === null ? 0 : Math.max(14 - distance * 5, 0);

        return (
          <motion.span
            key={item}
            data-cursor
            onMouseEnter={() => setHovered(i)}
            animate={{ transform: `translateY(${-lift}px)` }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 18,
              delay: hovered === null ? 0 : distance * 0.035,
            }}
            className="will-change-transform select-none rounded-full border border-line bg-fill-ghost px-4 py-2 font-mono-wama text-[12.5px] text-text-dim transition-colors duration-200 hover:border-line-strong hover:text-text"
          >
            {item}
          </motion.span>
        );
      })}
    </div>
  );
}

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="relative border-t border-line bg-bg py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <h2 className="max-w-lg font-sora text-3xl font-semibold leading-tight tracking-tight text-text md:text-4xl">
            El stack detrás de cada proyecto.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-text-dim">
            Herramientas probadas en producción, sin dependencias innecesarias.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-12">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.06}>
              <p className="mb-4 font-mono-wama text-[11px] uppercase tracking-[0.18em] text-tinto">
                {cat.title}
              </p>
              <WaveRow items={cat.items} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
