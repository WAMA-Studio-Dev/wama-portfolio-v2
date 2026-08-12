import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import ContactDrawer from "@/components/ContactDrawer";
import { ContactDrawerProvider } from "@/lib/contact-drawer-context";
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
        <ContactDrawerProvider>
          <CustomCursor />
          {children}
          <ContactDrawer />
        </ContactDrawerProvider>
      </body>
    </html>
  );
}
