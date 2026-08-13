import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono-wama text-xs uppercase tracking-[0.16em] text-text-dimmer transition-colors duration-200 hover:text-text"
      >
        <ArrowLeft size={14} />
        Volver a WAMA
      </Link>

      <h1 className="mt-8 font-sora text-3xl font-semibold tracking-tight text-text md:text-4xl">
        {title}
      </h1>
      <p className="mt-2 font-mono-wama text-xs uppercase tracking-[0.14em] text-text-dimmer">
        Última actualización: {updated}
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-text-dim">
        {children}
      </div>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-sora text-lg font-semibold text-text">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
