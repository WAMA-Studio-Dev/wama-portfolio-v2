"use client";

import Reveal from "./Reveal";
import RollingLogo from "./RollingLogo";
import CmdTypewriter from "./CmdTypewriter";

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-line bg-bg py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="md:grid md:grid-cols-[1.15fr_1fr] md:items-stretch md:gap-16">
          <div>
            <Reveal>
              <p className="font-mono-wama text-[11px] uppercase tracking-[0.22em] text-tinto">
                Equipo
              </p>
            </Reveal>

            <CmdTypewriter
              as="h2"
              showPrefix={false}
              loop
              speed={130}
              text="WAMA Studio"
              className="mt-4 font-sora text-4xl font-semibold tracking-tight text-text md:text-5xl"
            />

            <Reveal delay={0.1}>
              <p className="mt-3 font-mono-wama text-xs uppercase tracking-[0.16em] text-text-dim">
                Ingeniería de software · Diseño web · Dirección creativa
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-dim">
                <span className="font-semibold text-text">
                  WAMA nace de una idea simple: la web de tu negocio no tiene
                  por qué parecerse a las demás.
                </span>{" "}
                Somos dos ingenieros que decidimos construir el estudio que
                nos habría gustado contratar — sin plantillas, sin
                intermediarios, sin sorpresas en la factura.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-dim">
                Diseñamos, programamos y lanzamos cada proyecto de principio a
                fin — sin agencias ni departamentos de por medio.{" "}
                <span className="font-semibold text-text">
                  Hablas directamente con quien escribe el código,
                </span>{" "}
                por WhatsApp o Slack, así que las decisiones son rápidas y el
                resultado se parece exactamente a lo que pediste.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-dim">
                Nuestra juventud no es una excusa: es la ventaja.{" "}
                <span className="font-semibold text-text">
                  Nos movemos rápido, aprendemos rápido y cuidamos cada línea
                </span>{" "}
                porque el nombre en el proyecto es el nuestro.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mt-10 md:mt-0">
            <RollingLogo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
