"use client";

import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiFigma,
  SiVercel,
  SiTypescript,
  SiPython,
  SiJavascript,
} from "react-icons/si";
import Reveal from "./Reveal";

interface StackItem {
  name: string;
  icon: IconType;
}

const CATEGORIES: { title: string; items: StackItem[]; reverse?: boolean }[] = [
  {
    title: "Diseño y Experiencia Visual",
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    title: "Estructura y Bases de Datos",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Prisma", icon: SiPrisma },
    ],
    reverse: true,
  },
  {
    title: "Gestión y Despliegue",
    items: [
      { name: "Git", icon: SiGit },
      { name: "Figma", icon: SiFigma },
      { name: "Vercel", icon: SiVercel },
    ],
  },
  {
    title: "Lenguajes",
    items: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python", icon: SiPython },
      { name: "JavaScript", icon: SiJavascript },
    ],
    reverse: true,
  },
];

function MarqueeRow({ items, reverse }: { items: StackItem[]; reverse?: boolean }) {
  const track = [...items, ...items];
  const duration = items.length * 5;

  return (
    <div
      className="relative overflow-hidden py-1"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className="flex w-max will-change-transform"
        style={{
          animation: `wama-marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.name}-${i}`}
              className="group flex w-20 flex-shrink-0 flex-col items-center gap-2.5 mr-4"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-fill-ghost transition-colors duration-200 group-hover:border-line-strong">
                <Icon
                  size={24}
                  className="text-text-dim transition-colors duration-200 group-hover:text-tinto"
                />
              </div>
              <span className="whitespace-nowrap font-mono-wama text-[10px] uppercase tracking-[0.12em] text-text-dimmer">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
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
            El motor detrás de tu nueva web.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-text-dim">
            Desarrollamos con las herramientas más sólidas del mercado para
            garantizar que tu página sea rápida, segura y esté lista para
            crecer contigo.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12">
          {CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <p className="mb-4 font-mono-wama text-[11px] uppercase tracking-[0.18em] text-tinto">
                {cat.title}
              </p>
              <MarqueeRow items={cat.items} reverse={cat.reverse} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
