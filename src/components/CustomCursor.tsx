"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useFinePointer } from "@/lib/use-fine-pointer";

const SPRING = { stiffness: 900, damping: 40, mass: 0.4 };
const SPRING_SIZE = { stiffness: 400, damping: 28, mass: 0.3 };
const HOVER_PADDING = 8;

const EDITABLE_SELECTOR = 'input, textarea, select, [contenteditable="true"]';

export default function CustomCursor() {
  const enabled = useFinePointer();
  const [hovering, setHovering] = useState(false);
  const [editing, setEditing] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const width = useMotionValue(10);
  const height = useMotionValue(10);
  const radius = useMotionValue(9999);

  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const springWidth = useSpring(width, SPRING_SIZE);
  const springHeight = useSpring(height, SPRING_SIZE);
  const springRadius = useSpring(radius, SPRING_SIZE);

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const handleMove = (e: PointerEvent) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const eventTarget = e.target as HTMLElement | null;
        setEditing(!!eventTarget?.closest<HTMLElement>(EDITABLE_SELECTOR));

        const target = eventTarget?.closest<HTMLElement>("[data-cursor]");
        if (target) {
          const rect = target.getBoundingClientRect();
          const targetRadius = parseFloat(
            getComputedStyle(target).borderRadius
          );
          x.set(rect.left + rect.width / 2);
          y.set(rect.top + rect.height / 2);
          width.set(rect.width + HOVER_PADDING);
          height.set(rect.height + HOVER_PADDING);
          radius.set(
            Number.isFinite(targetRadius) && targetRadius > 0
              ? targetRadius + HOVER_PADDING / 2
              : 9999
          );
          setHovering(true);
        } else {
          x.set(e.clientX);
          y.set(e.clientY);
          width.set(10);
          height.set(10);
          radius.set(9999);
          setHovering(false);
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
  }, [enabled, x, y, width, height, radius]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
        width: springWidth,
        height: springHeight,
        borderRadius: springRadius,
        translateX: "-50%",
        translateY: "-50%",
        opacity: editing ? 0 : 1,
        background: hovering
          ? "rgba(122, 26, 36, 0.16)"
          : "rgba(242, 233, 216, 0.92)",
        border: hovering ? "1px solid rgba(242, 233, 216, 0.16)" : "none",
        boxShadow: hovering
          ? "inset 0 1px 0 rgba(242, 233, 216, 0.12), 0 0 24px var(--accent-tinto-glow)"
          : "0 0 16px var(--accent-tinto-glow)",
      }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
