"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const SPRING = { stiffness: 340, damping: 28, mass: 0.5 };
const SPRING_SIZE = { stiffness: 300, damping: 24, mass: 0.4 };
const QUERY = "(hover: hover) and (pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function useFinePointer() {
  return useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    () => false
  );
}

export default function CustomCursor() {
  const enabled = useFinePointer();
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const size = useMotionValue(10);

  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const springSize = useSpring(size, SPRING_SIZE);

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const handleMove = (e: PointerEvent) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const target = (e.target as HTMLElement)?.closest<HTMLElement>(
          "[data-cursor]"
        );
        if (target) {
          const rect = target.getBoundingClientRect();
          x.set(rect.left + rect.width / 2);
          y.set(rect.top + rect.height / 2);
          size.set(Math.max(rect.width, rect.height) + 24);
          setHovering(true);
          setLabel(target.getAttribute("data-cursor-label"));
        } else {
          x.set(e.clientX);
          y.set(e.clientY);
          size.set(10);
          setHovering(false);
          setLabel(null);
        }
      });
    };

    const handleLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
      document.documentElement.classList.remove("has-custom-cursor");
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled, x, y, size]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full"
      style={{
        x: springX,
        y: springY,
        width: springSize,
        height: springSize,
        translateX: "-50%",
        translateY: "-50%",
        background: hovering
          ? "rgba(122, 26, 36, 0.16)"
          : "rgba(253, 251, 247, 0.92)",
        border: hovering ? "1px solid rgba(255,255,255,0.16)" : "none",
        backdropFilter: hovering ? "blur(10px)" : "none",
        boxShadow: hovering
          ? "inset 0 1px 0 rgba(255,255,255,0.12), 0 0 24px var(--accent-tinto-glow)"
          : "0 0 16px var(--accent-tinto-glow)",
      }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="font-mono-wama text-[10px] uppercase tracking-[0.18em] text-text"
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}
