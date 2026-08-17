"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "wama-cookie-consent";

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function readStoredPreferences(): CookiePreferences | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
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

/** Google Consent Mode v2: informa a gtag.js del estado real elegido por el usuario. */
function pushConsentUpdate(prefs: CookiePreferences) {
  window.gtag?.("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
  });
}

interface CookieConsentContextValue {
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  /** true una vez se ha comprobado localStorage en cliente (evita flashes de UI). */
  initialized: boolean;
  hasDecision: boolean;
  preferences: CookiePreferences;
  savePreferences: (prefs: CookiePreferences) => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null
);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [hasDecision, setHasDecision] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    // Diferido a un timer (no síncrono en el efecto) para no encadenar
    // un re-render inmediato en el commit.
    const id = setTimeout(() => {
      const stored = readStoredPreferences();
      if (stored) {
        setPreferences(stored);
        setHasDecision(true);
        pushConsentUpdate(stored);
      }
      setInitialized(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  const savePreferences = useCallback((prefs: CookiePreferences) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setHasDecision(true);
    pushConsentUpdate(prefs);
  }, []);

  const value = useMemo(
    () => ({
      settingsOpen,
      openSettings,
      closeSettings,
      initialized,
      hasDecision,
      preferences,
      savePreferences,
    }),
    [
      settingsOpen,
      openSettings,
      closeSettings,
      initialized,
      hasDecision,
      preferences,
      savePreferences,
    ]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error(
      "useCookieConsent debe usarse dentro de CookieConsentProvider"
    );
  }
  return ctx;
}
