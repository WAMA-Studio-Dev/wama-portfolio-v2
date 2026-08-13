"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

const STORAGE_KEY = "wama-cookie-consent";

type Consent = "accepted" | "rejected";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Diferido a un timer (no síncrono en el efecto) para no encadenar
    // un re-render inmediato en el commit.
    const id = setTimeout(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const decide = (consent: Consent) => {
    window.localStorage.setItem(STORAGE_KEY, consent);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-consent"
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de cookies"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[200] mx-auto max-w-2xl rounded-2xl border border-line-strong bg-[#111113] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] sm:inset-x-6 sm:bottom-6 sm:p-6"
        >
          <p className="text-sm leading-relaxed text-text-dim">
            Usamos cookies técnicas necesarias para el funcionamiento de esta
            web. No utilizamos cookies analíticas ni publicitarias de
            terceros. Puedes leer más en nuestra{" "}
            <Link
              href="/politica-de-cookies"
              data-cursor
              className="text-text underline decoration-line-strong underline-offset-2 transition-colors duration-200 hover:text-tinto"
            >
              Política de Cookies
            </Link>
            .
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              data-cursor
              onClick={() => decide("accepted")}
              className="inline-flex items-center rounded-full bg-tinto px-5 py-2.5 font-sora text-sm font-semibold text-text transition-transform duration-200 ease-out active:scale-[0.97]"
            >
              Aceptar todas
            </button>
            <button
              type="button"
              data-cursor
              onClick={() => decide("rejected")}
              className="inline-flex items-center rounded-full border border-line px-5 py-2.5 font-sora text-sm font-semibold text-text-dim transition-colors duration-200 hover:border-line-strong hover:text-text"
            >
              Rechazar opcionales
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
