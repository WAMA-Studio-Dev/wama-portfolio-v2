"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useContactDrawer } from "@/lib/contact-drawer-context";
import { useElementSize } from "@/lib/use-element-size";

type Phase = "ball" | "exploding" | "revealed";

const BALL_SIZE = 56;

function randomBallTarget(rangeX: number, rangeY: number) {
  return {
    x: (Math.random() * 2 - 1) * rangeX,
    y: (Math.random() * 2 - 1) * rangeY,
    rotate: Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1),
    duration: 2.5 + Math.random() * 3,
  };
}

const PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const distance = 50 + (i % 3) * 16;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: 5 + (i % 3) * 2,
  };
});

const EXPLOSION_DURATION = 550;

export default function RollingLogo() {
  const [phase, setPhase] = useState<Phase>("ball");
  const reduce = useReducedMotion();
  const { open } = useContactDrawer();
  const explodeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bounds = useElementSize(containerRef);

  const rangeX = Math.max(0, bounds.width / 2 - BALL_SIZE / 2 - 4);
  const rangeY = Math.max(0, bounds.height / 2 - BALL_SIZE / 2 - 4);
  // Estado inicial determinista (sin Math.random) para que SSR y el primer
  // render en cliente coincidan; el primer objetivo aleatorio real se fija
  // en el efecto de abajo, ya solo en cliente.
  const [target, setTarget] = useState({ x: 0, y: 0, rotate: 0, duration: 1 });
  const measured = bounds.width > 0 && bounds.height > 0;

  useEffect(() => {
    if (!measured) return;
    // Diferido a un timer (no síncrono en el efecto) para no encadenar
    // un re-render inmediato en el commit. Solo al medir por primera vez.
    const id = setTimeout(() => setTarget(randomBallTarget(rangeX, rangeY)), 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measured]);

  useEffect(() => {
    return () => {
      if (explodeTimeout.current) clearTimeout(explodeTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (phase !== "revealed") return;

    const onPointerDown = (e: PointerEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) {
        setPhase("ball");
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [phase]);

  const handleBallClick = () => {
    if (reduce) {
      setPhase("revealed");
      return;
    }
    setPhase("exploding");
    explodeTimeout.current = setTimeout(() => {
      setPhase("revealed");
    }, EXPLOSION_DURATION);
  };

  return (
    <div ref={containerRef} className="relative mx-auto h-56 w-64 md:mx-0 md:h-64 md:w-72">
      <AnimatePresence mode="wait" initial={false}>
        {phase === "ball" && (
          <motion.button
            key="ball"
            type="button"
            data-cursor
            aria-label="Descubrir el logo de WAMA"
            onClick={handleBallClick}
            className="absolute left-1/2 top-1/2 -ml-7 -mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#a8323f] to-[#3d0c12] shadow-[inset_-6px_-6px_14px_rgba(0,0,0,0.45),inset_5px_5px_10px_rgba(255,255,255,0.18),0_8px_20px_rgba(0,0,0,0.35)]"
            style={{ willChange: "transform" }}
            animate={
              reduce
                ? { x: 0, y: 0, rotate: 0 }
                : { x: target.x, y: target.y, rotate: target.rotate }
            }
            transition={
              reduce
                ? { duration: 0.2 }
                : { duration: target.duration, ease: "easeInOut" }
            }
            onAnimationComplete={() => {
              if (!reduce) setTarget(randomBallTarget(rangeX, rangeY));
            }}
          >
            <span
              aria-hidden
              className="font-sora text-lg font-bold text-text/90 [text-shadow:0_1px_1px_rgba(0,0,0,0.5)]"
            >
              W
            </span>
          </motion.button>
        )}

        {phase === "exploding" && (
          <motion.div
            key="explosion"
            className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0"
          >
            <motion.span
              aria-hidden
              initial={{ scale: 0.3, opacity: 0.6 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute left-0 top-0 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-tinto"
            />
            {PARTICLES.map((p, i) => (
              <motion.span
                key={i}
                aria-hidden
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                style={{ width: p.size, height: p.size }}
                className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tinto"
              />
            ))}
          </motion.div>
        )}

        {phase === "revealed" && (
          <motion.div
            key="panel"
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-xl"
          >
            <span className="relative block h-20 w-20 overflow-hidden rounded-xl shadow-[0_0_28px_var(--accent-tinto-glow)] md:h-24 md:w-24">
              <Image
                src="/logo.png"
                alt="WAMA"
                fill
                sizes="96px"
                className="object-cover"
              />
            </span>

            <button
              type="button"
              data-cursor
              onClick={open}
              className="rounded-full bg-tinto px-6 py-3 font-sora text-sm font-semibold text-text transition-transform duration-200 ease-out active:scale-[0.97]"
            >
              Confía en nosotros
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
