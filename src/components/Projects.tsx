"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";

interface Project {
  id: string;
  name: string;
  category: string;
  seed: string;
  description: string;
  longDescription: string;
  stack: string[];
  demoUrl: string;
}

// TODO(WAMA): sustituir seeds de picsum por capturas reales de cada proyecto entregado.
const PROJECTS: Project[] = [
  {
    id: "nortek",
    name: "Nortek Commerce",
    category: "E-Commerce",
    seed: "wama-nortek-commerce-storefront",
    description: "Tienda D2C con checkout propio y CMS headless.",
    longDescription:
      "Plataforma de e-commerce construida desde cero con Next.js y un checkout optimizado para conversión. Integración con pasarela de pago, gestión de inventario en tiempo real y panel de contenido headless para el equipo de marketing.",
    stack: ["Next.js", "Stripe", "Sanity", "Tailwind CSS"],
    demoUrl: "https://example.com",
  },
  {
    id: "orbita",
    name: "Órbita SaaS",
    category: "SaaS / App Web",
    seed: "wama-orbita-saas-dashboard",
    description: "Dashboard de analítica en tiempo real para equipos remotos.",
    longDescription:
      "Producto SaaS de analítica con dashboards en tiempo real, roles de equipo y facturación por suscripción. Arquitectura orientada a componentes reutilizables y websockets para datos en vivo.",
    stack: ["React", "Node.js", "PostgreSQL", "Framer Motion"],
    demoUrl: "https://example.com",
  },
  {
    id: "marbella",
    name: "Marbella Realty",
    category: "Web Corporativa",
    seed: "wama-marbella-realty-site",
    description: "Web institucional de alto impacto para inmobiliaria premium.",
    longDescription:
      "Sitio corporativo editorial para una inmobiliaria de lujo, con galería de propiedades, formulario de contacto cualificado y SEO técnico afinado para posicionamiento local.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://example.com",
  },
  {
    id: "vantage",
    name: "Vantage Studio",
    category: "Portfolio / Agencia",
    seed: "wama-vantage-studio-portfolio",
    description: "Portafolio interactivo para estudio de diseño industrial.",
    longDescription:
      "Portafolio cinemático con transiciones de página fluidas y galería de proyectos en scroll horizontal, pensado para presentar trabajo de diseño industrial de forma inmersiva.",
    stack: ["Next.js", "Framer Motion", "GSAP"],
    demoUrl: "https://example.com",
  },
];

function BrowserFrame({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-t-xl border border-b-0 border-line bg-[#111113]">
      <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 flex-1 truncate rounded-full bg-white/[0.06] px-3 py-1 text-center font-mono-wama text-[10px] text-text-dimmer">
          {project.demoUrl.replace("https://", "")}
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/${project.seed}/1200/750`}
          alt={`Captura del proyecto ${project.name}`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

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
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.07}>
              <div className="group overflow-hidden rounded-xl border border-line bg-fill-ghost transition-colors duration-300 hover:border-line-strong">
                <BrowserFrame project={project} />
                <div className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="font-mono-wama text-[10.5px] uppercase tracking-[0.16em] text-tinto">
                      {project.category}
                    </p>
                    <p className="mt-1.5 font-sora text-base font-semibold text-text">
                      {project.name}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      data-cursor
                      onClick={() => setActive(project)}
                      className="rounded-full border border-line px-4 py-2 font-sora text-xs font-semibold text-text-dim transition-colors duration-200 hover:border-line-strong hover:text-text"
                    >
                      View Details
                    </button>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-fill-solid text-text transition-colors duration-200 hover:bg-tinto"
                      aria-label={`Ver demo en vivo de ${project.name}`}
                    >
                      <ArrowUpRight size={15} weight="bold" />
                    </a>
                  </div>
                </div>
              </div>
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
                  src={`https://picsum.photos/seed/${active.seed}/1200/750`}
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
                  Live Demo
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
