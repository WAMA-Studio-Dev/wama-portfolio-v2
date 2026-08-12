"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CmdTypewriterProps {
  text: string;
  className?: string;
  speed?: number;
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
}: CmdTypewriterProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let i = 0;
    // Reinicio a "" se dispara en un timer (no de forma síncrona en el
    // efecto) para no encadenar un re-render inmediato en el commit.
    const resetId = setTimeout(() => setDisplay(""), 0);
    const id = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);

    return () => {
      clearTimeout(resetId);
      clearInterval(id);
    };
  }, [text, speed]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span className="mr-2 text-tinto">&gt;_</span>
      <span>{display}</span>
      <span
        aria-hidden
        className="wama-cursor-blink ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.1em] bg-current align-middle"
      />
    </span>
  );
}
