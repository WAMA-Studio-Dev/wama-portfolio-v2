"use client";

import { Gauge, Lightning, CodeBlock } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";

const METRICS = [
  {
    icon: Gauge,
    value: "100",
    unit: "/100",
    label: "Lighthouse Score",
    body: "Cero sobrecarga. Cada línea de código está auditada y optimizada desde cero.",
    featured: true,
  },
  {
    icon: Lightning,
    value: "<0.8",
    unit: "s",
    label: "Carga Inicial",
    body: "Retención máxima. Tus clientes ven contenido antes de que lo esperen.",
    featured: false,
  },
  {
    icon: CodeBlock,
    value: "100",
    unit: "%",
    label: "Bespoke Code",
    body: "Sin plantillas prefabricadas ni WordPress. Arquitectura propia, a medida.",
    featured: false,
  },
];

export default function Metrics() {
  return (
    <section className="relative border-t border-line bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <h2 className="max-w-lg font-sora text-3xl font-semibold leading-tight tracking-tight text-text md:text-4xl">
            Rendimiento que se nota antes de leer una palabra.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-5 md:grid-rows-2">
          {METRICS.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <Reveal
                key={metric.label}
                delay={i * 0.08}
                className={
                  metric.featured
                    ? "md:col-span-3 md:row-span-2"
                    : "md:col-span-2"
                }
              >
                <div
                  className={
                    "group relative h-full overflow-hidden rounded-3xl border border-line p-8 transition-colors duration-300 hover:border-line-strong " +
                    (metric.featured
                      ? "bg-gradient-to-br from-fill-solid via-bg to-bg"
                      : "bg-fill-ghost")
                  }
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle, var(--accent-tinto-glow), transparent 70%)",
                    }}
                  />
                  <Icon size={22} weight="duotone" className="text-tinto" />
                  <div className="mt-8 flex items-end gap-1">
                    <span
                      className={
                        "font-sora font-semibold leading-none tracking-tighter text-text " +
                        (metric.featured
                          ? "text-6xl md:text-7xl"
                          : "text-5xl")
                      }
                    >
                      {metric.value}
                    </span>
                    <span className="mb-1 font-mono-wama text-lg text-text-dim">
                      {metric.unit}
                    </span>
                  </div>
                  <p className="mt-4 font-mono-wama text-[11px] uppercase tracking-[0.16em] text-text-dim">
                    {metric.label}
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-dimmer">
                    {metric.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
