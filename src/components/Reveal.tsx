"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Scroll-reveal defensivo: el contenido nace visible (SSR/no-JS friendly).
 * Solo si el elemento está fuera del viewport al montar se oculta para
 * animar su entrada, con un timeout de seguridad de 5s por si el
 * IntersectionObserver nunca se dispara.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce) return;

    const rect = node.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight * 0.92;
    if (alreadyInView) return;

    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(node);

    const safety = setTimeout(() => setVisible(true), 5000);

    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, [reduce]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(6px)", transition: { duration: 0 } },
        shown: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      animate={visible ? "shown" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
