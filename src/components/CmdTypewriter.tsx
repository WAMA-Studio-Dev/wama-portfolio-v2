"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CmdTypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  /** Prefijo ">_" de terminal. Desactívalo para titulares grandes. */
  showPrefix?: boolean;
  as?: "span" | "h1" | "h2";
  /** Escribe, borra y repite en bucle infinito en vez de escribir una vez. */
  loop?: boolean;
  /** Divide el texto ya escrito en palabras hoverables (glow neón rojo). */
  wordHover?: boolean;
}

const PAUSE_FULL = 1400;
const PAUSE_EMPTY = 500;

/** Variación ±40% + pausa extra tras un espacio, para un ritmo de tecleo manual. */
function jitteredDelay(base: number, lastChar: string) {
  const variance = base * 0.4;
  const jitter = base + (Math.random() * 2 - 1) * variance;
  const wordPause = lastChar === " " ? base * 0.9 : 0;
  return Math.max(16, jitter + wordPause);
}

const NEON_HOVER_CLASS =
  "transition-[color,text-shadow] duration-200 ease-out hover:text-[#ff3b52] hover:[text-shadow:0_0_10px_rgba(255,59,82,0.9),0_0_26px_rgba(255,59,82,0.55)]";

function TypedWords({ text, typedCount }: { text: string; typedCount: number }) {
  const words = text.split(" ");
  const bounds = words.reduce<{ start: number; end: number }[]>((acc, word) => {
    const start = acc.length ? acc[acc.length - 1].end + 1 : 0;
    acc.push({ start, end: start + word.length });
    return acc;
  }, []);

  return (
    <>
      {words.map((word, i) => {
        const { start, end } = bounds[i];
        if (typedCount <= start) return null;
        const visible = text.slice(start, Math.min(typedCount, end));
        return (
          <span key={i} className="mr-[0.28em] inline-block">
            <span className={NEON_HOVER_CLASS}>{visible}</span>
          </span>
        );
      })}
    </>
  );
}

/**
 * Anti-blank: el primer render (SSR y no-JS) pinta el texto completo.
 * Solo tras montar en cliente se reinicia a "" y se reconstruye carácter a
 * carácter — nunca hay un estado donde el texto esté vacío sin JS activo.
 */
export default function CmdTypewriter({
  text,
  className,
  speed = 38,
  showPrefix = true,
  as = "span",
  loop = false,
  wordHover = false,
}: CmdTypewriterProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    let deleting = false;
    let stepId: ReturnType<typeof setTimeout>;

    const eraseSpeed = Math.max(16, speed * 0.5);

    function step() {
      if (cancelled) return;

      if (!deleting) {
        i += 1;
        setDisplay(text.slice(0, i));
        if (i >= text.length) {
          if (!loop) return;
          deleting = true;
          stepId = setTimeout(step, PAUSE_FULL);
          return;
        }
        stepId = setTimeout(step, jitteredDelay(speed, text[i - 1]));
        return;
      }

      i -= 1;
      setDisplay(text.slice(0, i));
      if (i <= 0) {
        deleting = false;
        stepId = setTimeout(step, PAUSE_EMPTY);
        return;
      }
      stepId = setTimeout(step, eraseSpeed);
    }

    // Reinicio a "" se dispara en un timer (no de forma síncrona en el
    // efecto) para no encadenar un re-render inmediato en el commit.
    const startId = setTimeout(() => {
      setDisplay("");
      step();
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(startId);
      clearTimeout(stepId);
    };
  }, [text, speed, loop]);

  const content = (
    <>
      {showPrefix && <span className="mr-2 text-tinto">&gt;_</span>}
      {wordHover ? (
        <TypedWords text={text} typedCount={display.length} />
      ) : (
        <span>{display}</span>
      )}
      <span
        aria-hidden
        className="wama-cursor-blink ml-0.5 inline-block h-[0.85em] w-[0.5ch] translate-y-[0.1em] bg-current align-middle"
      />
    </>
  );

  if (as === "h1") {
    return <h1 className={className}>{content}</h1>;
  }
  if (as === "h2") {
    return <h2 className={className}>{content}</h2>;
  }

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      {content}
    </span>
  );
}
