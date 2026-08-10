"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  delayStart?: number;
  as?: "h1" | "h2" | "span";
  hoverJump?: boolean;
}

/**
 * Descompone un titular en palabras que entran con stagger + blur-to-focus.
 * Anti-blank: sin JS, el <span> visible por defecto vía initial=false en SSR.
 */
export default function SplitText({
  text,
  className,
  delayStart = 0,
  as = "h1",
  hoverJump = true,
}: SplitTextProps) {
  const words = text.split(" ");

  const wordSpans = words.map((word, i) => (
    <motion.span
      key={`${word}-${i}`}
      className="mr-[0.28em] inline-block will-change-transform"
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        type: "spring",
        duration: 0.9,
        bounce: 0.22,
        delay: delayStart + i * 0.055,
      }}
      whileHover={
        hoverJump
          ? {
              y: -6,
              color: "#c94a5a",
              transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
            }
          : undefined
      }
    >
      {word}
    </motion.span>
  ));

  const wrapClassName = cn("flex flex-wrap", className);

  if (as === "h2") {
    return <motion.h2 className={wrapClassName}>{wordSpans}</motion.h2>;
  }
  if (as === "span") {
    return <motion.span className={wrapClassName}>{wordSpans}</motion.span>;
  }
  return <motion.h1 className={wrapClassName}>{wordSpans}</motion.h1>;
}
