"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Star,
  HandCoins,
  Handshake,
  ClipboardText,
  Receipt,
  RocketLaunch,
  Wrench,
  MapTrifold,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";
import { useElementSize } from "@/lib/use-element-size";

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

const CHIP_SIZE = 72;

function randomChipTarget(rangeX: number, rangeY: number) {
  return {
    x: (Math.random() * 2 - 1) * rangeX,
    y: (Math.random() * 2 - 1) * rangeY,
    rotate: (Math.random() * 2 - 1) * 18,
    duration: 3 + Math.random() * 3.5,
  };
}

function FloatingChip({
  reason,
  bounds,
  floatingEnabled,
  onToggle,
}: {
  reason: (typeof REASONS)[number];
  bounds: { width: number; height: number };
  floatingEnabled: boolean;
  onToggle: () => void;
}) {
  const Icon = reason.icon;
  const rangeX = Math.max(0, bounds.width / 2 - CHIP_SIZE / 2 - 6);
  const rangeY = Math.max(0, bounds.height / 2 - CHIP_SIZE / 2 - 6);
  // Estado inicial determinista (sin Math.random) para que SSR y el primer
  // render en cliente coincidan; el primer objetivo aleatorio real se fija
  // en el efecto de abajo, ya solo en cliente.
  const [target, setTarget] = useState({ x: 0, y: 0, rotate: 0, duration: 1 });
  const measured = bounds.width > 0 && bounds.height > 0;

  useEffect(() => {
    if (!measured) return;
    // Diferido a un timer (no síncrono en el efecto) para no encadenar
    // un re-render inmediato en el commit. Solo al medir por primera vez.
    const id = setTimeout(() => setTarget(randomChipTarget(rangeX, rangeY)), 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measured]);

  return (
    <motion.button
      type="button"
      aria-label={`${reason.title} — ver más`}
      onClick={onToggle}
      className="absolute left-1/2 top-1/2 -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-fill-ghost transition-colors duration-200 hover:border-line-strong sm:-ml-8 sm:-mt-8 sm:h-16 sm:w-16 md:-ml-9 md:-mt-9 md:h-[72px] md:w-[72px]"
      style={{ willChange: "transform" }}
      animate={
        floatingEnabled
          ? { x: target.x, y: target.y, rotate: target.rotate }
          : { x: 0, y: 0, rotate: 0 }
      }
      transition={
        floatingEnabled
          ? { duration: target.duration, ease: "easeInOut" }
          : { duration: 0.3 }
      }
      onAnimationComplete={() => {
        if (floatingEnabled) setTarget(randomChipTarget(rangeX, rangeY));
      }}
      whileTap={{ scale: 0.94 }}
    >
      <Icon size={20} weight="duotone" className="text-tinto sm:hidden" />
      <Icon size={24} weight="duotone" className="hidden text-tinto sm:block" />
    </motion.button>
  );
}

function FloatingReasons() {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState<number | null>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const bounds = useElementSize(arenaRef);

  // Misma lógica flotante en desktop y móvil/táctil (solo se desactiva por
  // accesibilidad si el usuario pide "reduced motion").
  const floatingEnabled = !reduce;
  const active = expanded !== null ? REASONS[expanded] : null;
  const ActiveIcon = active?.icon;

  return (
    <div className="relative mt-14">
      <p className="mb-4 font-mono-wama text-[10.5px] uppercase tracking-[0.18em] text-text-dimmer">
        Pulsa un icono para ver más
      </p>

      <div ref={arenaRef} className="relative h-[320px] w-full overflow-hidden sm:h-[420px] md:h-[460px]">
        {REASONS.map((reason, i) => (
          <FloatingChip
            key={reason.title}
            reason={reason}
            bounds={bounds}
            floatingEnabled={floatingEnabled}
            onToggle={() => setExpanded(expanded === i ? null : i)}
          />
        ))}

        <AnimatePresence>
          {active && ActiveIcon && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-bg/80 backdrop-blur-sm"
              onClick={() => setExpanded(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-[85%] max-w-sm rounded-2xl border border-line-strong bg-fill-ghost p-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              >
                <button
                  type="button"
                  aria-label="Cerrar"
                  onClick={() => setExpanded(null)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-text-dimmer transition-colors duration-200 hover:bg-white/10 hover:text-text"
                >
                  <X size={14} />
                </button>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-fill-solid">
                  <ActiveIcon size={22} weight="duotone" className="text-tinto" />
                </div>
                <p className="mt-4 font-mono-wama text-[11px] uppercase tracking-[0.18em] text-tinto">
                  {active.number}
                </p>
                <h3 className="mt-1 font-sora text-lg font-semibold text-text">
                  {active.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-dim">
                  {active.body}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProcessRoadmap() {
  const [active, setActive] = useState(0);
  const ActiveIcon = PROCESS[active].icon;

  return (
    <div className="relative mx-auto mt-10 w-full max-w-[calc(100vw-2rem)] sm:max-w-none">
      <div className="relative">
        <div className="absolute left-[22px] right-[22px] top-[22px] h-px bg-line sm:left-7 sm:right-7 sm:top-7" />

        <div className="relative flex items-center justify-between">
          {PROCESS.map((step, i) => (
            <button
              key={step.title}
              type="button"
              aria-pressed={active === i}
              aria-label={`Paso ${i + 1}: ${step.title}`}
              onClick={() => setActive(i)}
              className={cn(
                "relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 font-mono-wama text-xs transition-all duration-300 sm:h-14 sm:w-14 sm:text-sm",
                active === i
                  ? "border-tinto bg-tinto text-text shadow-[0_0_0_6px_var(--accent-tinto-glow)]"
                  : "border-line bg-bg text-text-dim hover:border-line-strong"
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>

        <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-line">
          <motion.div
            animate={{ scaleX: (active + 1) / PROCESS.length }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            style={{ transformOrigin: "left", willChange: "transform" }}
            className="h-full w-full bg-tinto"
          />
        </div>

        <div className="relative mt-10 flex min-h-[190px] items-start justify-center px-2 text-center sm:mt-12 sm:min-h-[150px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full max-w-md flex-col items-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fill-solid">
                <ActiveIcon size={22} weight="duotone" className="text-tinto" />
              </div>
              <h4 className="mt-4 font-sora text-base font-semibold text-text sm:text-lg">
                {PROCESS[active].title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">
                {PROCESS[active].body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="font-mono-wama text-[11px] uppercase tracking-[0.22em] text-tinto">
            Metodología
          </p>
          <h2 className="mt-3 max-w-lg font-sora text-3xl font-semibold leading-tight tracking-tight text-text md:text-4xl">
            Cómo se trabaja en WAMA.
          </h2>
        </Reveal>

        <FloatingReasons />

        <div className="mt-24">
          <Reveal>
            <p className="font-mono-wama text-[11px] uppercase tracking-[0.22em] text-tinto">
              Proceso de trabajo
            </p>
            <h3 className="mt-3 max-w-lg font-sora text-2xl font-semibold leading-tight tracking-tight text-text md:text-3xl">
              Transparencia total, de la propuesta al mantenimiento.
            </h3>
          </Reveal>

          <ProcessRoadmap />
        </div>
      </div>
    </section>
  );
}
