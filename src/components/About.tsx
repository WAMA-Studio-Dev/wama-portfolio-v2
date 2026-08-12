"use client";

import Reveal from "./Reveal";

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
              Somos dos fundadores y desarrolladores jóvenes.
            </span>{" "}
            Nuestra juventud es nuestra ventaja:{" "}
            <span className="font-semibold text-text">
              cercanía total, comunicación directa por WhatsApp/Slack sin
              intermediarios,
            </span>{" "}
            velocidad de ejecución y compromiso del 100% en cada línea de
            código.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
