import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Política de Cookies | WAMA Studio",
  description: "Qué cookies y tecnologías similares utiliza este sitio web.",
};

const CONTACT_EMAIL = "wamastudio.contacto@gmail.com";

export default function PoliticaDeCookiesPage() {
  return (
    <LegalLayout title="Política de Cookies" updated="13 de agosto de 2026">
      <LegalSection title="1. ¿Qué son las cookies?">
        <p>
          Las cookies son pequeños archivos de texto que un sitio web
          almacena en tu navegador. Se utilizan para recordar información
          sobre tu visita, como tus preferencias, y facilitar tu
          experiencia de navegación en futuras visitas.
        </p>
      </LegalSection>

      <LegalSection title="2. Cookies y almacenamiento que utilizamos">
        <p>
          Este sitio web utiliza únicamente almacenamiento{" "}
          <strong className="text-text">técnico y necesario</strong> para
          su funcionamiento:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-text">wama-cookie-consent</strong>{" "}
            (localStorage): guarda tu decisión sobre este mismo aviso de
            cookies para que no vuelva a mostrarse en cada visita.
          </li>
        </ul>
        <p>
          Actualmente <strong className="text-text">no utilizamos</strong>{" "}
          cookies analíticas, de personalización ni publicitarias de
          terceros. Si en el futuro se incorporase alguna, actualizaremos
          esta política y solicitaremos tu consentimiento cuando sea
          necesario.
        </p>
      </LegalSection>

      <LegalSection title="3. Cómo gestionar o eliminar estas preferencias">
        <p>
          Puedes eliminar la preferencia guardada en cualquier momento
          borrando los datos de navegación (almacenamiento local) de tu
          navegador para este sitio, o desde la configuración de
          privacidad de tu navegador. Al hacerlo, el aviso de cookies
          volverá a mostrarse en tu próxima visita.
        </p>
      </LegalSection>

      <LegalSection title="4. Más información">
        <p>
          Para cualquier duda sobre esta Política de Cookies, puedes
          escribirnos a{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            data-cursor
            className="text-text underline decoration-line-strong underline-offset-2 hover:text-tinto"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
