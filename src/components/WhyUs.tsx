"use client";

import {
  Star,
  HandCoins,
  Handshake,
  ClipboardText,
  Receipt,
  RocketLaunch,
  Wrench,
  MapTrifold,
} from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";

const REASONS = [
  {
    icon: Star,
    number: "01",
    title: "Diseño a medida",
    body: "Diseñamos cada web desde cero, adaptándonos a la identidad y necesidades de tu negocio.",
  },
  {
    icon: HandCoins,
    number: "02",
    title: "Precio sin sorpresas",
    body: "Soluciones profesionales y transparentes, adaptadas a cada proyecto y presupuesto.",
  },
  {
    icon: Handshake,
    number: "03",
    title: "Trato directo",
    body: "Somos un equipo de dos. Hablas directamente con nosotros durante todo el proceso.",
  },
  {
    icon: ClipboardText,
    number: "04",
    title: "Resultados",
    body: "Creamos webs rápidas, atractivas y funcionales que hacen que tu negocio se vea profesional.",
  },
];

const PROCESS = [
  {
    icon: Receipt,
    title: "Facturación y gestión oficial",
    body: "Todo el proceso queda respaldado por facturación y gestión 100% transparente, sin acuerdos informales.",
  },
  {
    icon: RocketLaunch,
    title: "Lanzamiento sin caídas",
    body: "Nos encargamos del despliegue y la configuración de dominio (Deploy & Domain setup) para que el lanzamiento oficial sea impecable.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento bajo demanda",
    body: "Servicio de mantenimiento y escalabilidad disponible cuando tu negocio lo necesite, sin permanencias forzadas.",
  },
  {
    icon: MapTrifold,
    title: "Claridad desde el Día 1",
    body: "Tras aceptar la propuesta recibes el Roadmap con precios cerrados, fechas exactas y entregables finales. Cero sorpresas.",
  },
];

export default function WhyUs() {
  return (
    <section className="relative border-t border-line bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <h2 className="max-w-lg font-sora text-3xl font-semibold leading-tight tracking-tight text-text md:text-4xl">
            Cómo se trabaja en WAMA.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.title} delay={i * 0.08} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-fill-ghost p-7 transition-colors duration-300 hover:border-line-strong">
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle, var(--accent-tinto-glow), transparent 70%)",
                    }}
                  />
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fill-solid">
                    <Icon size={20} weight="duotone" className="text-tinto" />
                  </div>
                  <p className="mt-6 font-mono-wama text-[11px] uppercase tracking-[0.18em] text-tinto">
                    {reason.number}
                  </p>
                  <h3 className="mt-1 font-sora text-lg font-semibold text-text">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-dim">
                    {reason.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-24">
          <Reveal>
            <p className="font-mono-wama text-[11px] uppercase tracking-[0.22em] text-tinto">
              Proceso de trabajo
            </p>
            <h3 className="mt-3 max-w-lg font-sora text-2xl font-semibold leading-tight tracking-tight text-text md:text-3xl">
              Transparencia total, de la propuesta al mantenimiento.
            </h3>
          </Reveal>

          <div className="mt-10 flex flex-col divide-y divide-line border-t border-line">
            {PROCESS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={i * 0.06}>
                  <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:gap-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-fill-solid">
                      <Icon size={20} weight="duotone" className="text-tinto" />
                    </div>
                    <div>
                      <h4 className="font-sora text-base font-semibold text-text">
                        {step.title}
                      </h4>
                      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-text-dim">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
