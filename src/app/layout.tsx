import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import ContactDrawer from "@/components/ContactDrawer";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalyticsGate from "@/components/GoogleAnalyticsGate";
import GlobalStarfield from "@/components/GlobalStarfield";
import { ContactDrawerProvider } from "@/lib/contact-drawer-context";
import { CookieConsentProvider } from "@/lib/cookie-consent-context";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wamastudio.com"),
  title: "WAMA® — Web & Creative Studio",
  description:
    "Diseñamos y construimos sistemas web de alto rendimiento que escalan y convierten. Código 100% a medida, cero plantillas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text overflow-x-hidden">
        {/* Google Consent Mode v2: deniega analítica/publicidad por defecto,
            lo antes posible, hasta que CookieConsentProvider confirme la
            decisión real del usuario (ver lib/cookie-consent-context.tsx). */}
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
          `}
        </Script>
        <GlobalStarfield />
        <ContactDrawerProvider>
          <CookieConsentProvider>
            {children}
            <ContactDrawer />
            <CookieConsent />
            <GoogleAnalyticsGate />
          </CookieConsentProvider>
        </ContactDrawerProvider>
      </body>
    </html>
  );
}
