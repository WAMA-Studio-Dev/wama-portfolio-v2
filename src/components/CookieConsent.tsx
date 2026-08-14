"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { X } from "@phosphor-icons/react/dist/ssr";
import { useCookieConsent } from "@/lib/cookie-consent-context";

const STORAGE_KEY = "wama-cookie-consent";

interface Preferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_PREFERENCES: Preferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function readStoredPreferences(): Preferences | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Preferences>;
    if (
      typeof parsed.analytics === "boolean" &&
      typeof parsed.marketing === "boolean"
    ) {
      return {
        necessary: true,
        analytics: parsed.analytics,
        marketing: parsed.marketing,
      };
    }
  } catch {
    // localStorage corrupto o inaccesible: se trata como "sin decisión".
  }
  return null;
}

export default function CookieConsent() {
  const { settingsOpen, openSettings, closeSettings } = useCookieConsent();
  const [bannerVisible, setBannerVisible] = useState(false);
  const [hasDecision, setHasDecision] = useState(false);
  const [draft, setDraft] = useState<Preferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    // Diferido a un timer (no síncrono en el efecto) para no encadenar
    // un re-render inmediato en el commit.
    const id = setTimeout(() => {
      const stored = readStoredPreferences();
      if (stored) {
        setDraft(stored);
        setHasDecision(true);
      } else {
        setBannerVisible(true);
      }
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const persist = (prefs: Preferences) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setDraft(prefs);
    setHasDecision(true);
    setBannerVisible(false);
    closeSettings();
  };

  const acceptAll = () =>
    persist({ necessary: true, analytics: true, marketing: true });
  const rejectOptional = () =>
    persist({ necessary: true, analytics: false, marketing: false });

  const handleOpenSettings = () => {
    setDraft(readStoredPreferences() ?? DEFAULT_PREFERENCES);
    openSettings();
  };

  const handleCloseSettings = () => {
    closeSettings();
    if (!hasDecision) setBannerVisible(true);
  };

  return (
    <>
      <AnimatePresence>
        {bannerVisible && !settingsOpen && (
          <motion.div
            key="cookie-banner"
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
              web, y solo con tu permiso cookies analíticas o de marketing.
              Puedes leer más en nuestra{" "}
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
                onClick={acceptAll}
                className="inline-flex items-center rounded-full bg-tinto px-5 py-2.5 font-sora text-sm font-semibold text-text transition-transform duration-200 ease-out active:scale-[0.97]"
              >
                Aceptar todas
              </button>
              <button
                type="button"
                data-cursor
                onClick={rejectOptional}
                className="inline-flex items-center rounded-full border border-line px-5 py-2.5 font-sora text-sm font-semibold text-text-dim transition-colors duration-200 hover:border-line-strong hover:text-text"
              >
                Rechazar opcionales
              </button>
              <button
                type="button"
                data-cursor
                onClick={handleOpenSettings}
                className="inline-flex items-center px-2 py-2.5 font-mono-wama text-xs uppercase tracking-[0.1em] text-text-dimmer transition-colors duration-200 hover:text-text"
              >
                Configurar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            key="cookie-settings-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={handleCloseSettings}
          >
            <motion.div
              key="cookie-settings-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-settings-title"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-line-strong bg-[#111113] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
            >
              <div className="flex items-center justify-between">
                <h2
                  id="cookie-settings-title"
                  className="font-sora text-lg font-semibold text-text"
                >
                  Configurar cookies
                </h2>
                <button
                  type="button"
                  aria-label="Cerrar"
                  data-cursor
                  onClick={handleCloseSettings}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-text-dimmer transition-colors duration-200 hover:bg-white/10 hover:text-text"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-text-dim">
                Elige qué categorías de cookies quieres permitir. Puedes
                cambiar esta decisión cuando quieras desde el pie de página.
              </p>

              <div className="mt-5 space-y-4">
                <CategoryRow
                  title="Necesarias"
                  description="Imprescindibles para que la web funcione correctamente. Siempre activas."
                  checked
                  disabled
                />
                <CategoryRow
                  title="Analíticas"
                  description="Nos ayudan a entender cómo se usa la web para mejorarla. Actualmente no están en uso."
                  checked={draft.analytics}
                  onChange={(checked) =>
                    setDraft((d) => ({ ...d, analytics: checked }))
                  }
                />
                <CategoryRow
                  title="Marketing"
                  description="Permitirían medir campañas y personalizar anuncios. Actualmente no están en uso."
                  checked={draft.marketing}
                  onChange={(checked) =>
                    setDraft((d) => ({ ...d, marketing: checked }))
                  }
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  data-cursor
                  onClick={() => persist(draft)}
                  className="inline-flex items-center rounded-full bg-tinto px-5 py-2.5 font-sora text-sm font-semibold text-text transition-transform duration-200 ease-out active:scale-[0.97]"
                >
                  Guardar preferencias
                </button>
                <button
                  type="button"
                  data-cursor
                  onClick={acceptAll}
                  className="inline-flex items-center rounded-full border border-line px-5 py-2.5 font-sora text-sm font-semibold text-text-dim transition-colors duration-200 hover:border-line-strong hover:text-text"
                >
                  Aceptar todas
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CategoryRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label
      className={`flex items-start justify-between gap-4 rounded-xl border border-line bg-fill-ghost px-4 py-3.5 ${
        disabled ? "" : "cursor-pointer"
      }`}
    >
      <span>
        <span className="block font-sora text-sm font-semibold text-text">
          {title}
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-text-dim">
          {description}
        </span>
      </span>
      <input
        type="checkbox"
        data-cursor
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-line bg-transparent accent-tinto disabled:cursor-not-allowed disabled:opacity-60"
      />
    </label>
  );
}
