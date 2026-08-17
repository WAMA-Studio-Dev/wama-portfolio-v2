"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useCookieConsent } from "@/lib/cookie-consent-context";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Monta gtag.js solo cuando el usuario ha aceptado cookies analíticas. */
export default function GoogleAnalyticsGate() {
  const { initialized, preferences } = useCookieConsent();

  if (!GA_MEASUREMENT_ID || !initialized || !preferences.analytics) {
    return null;
  }

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
