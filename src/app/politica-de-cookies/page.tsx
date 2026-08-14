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

      <LegalSection title="2. Categorías de cookies que utilizamos">
        <p>
          Clasificamos las cookies y el almacenamiento local que puede
          utilizar este sitio en tres categorías. Puedes decidir cuáles
          aceptas desde el panel{" "}
          <strong className="text-text">&quot;Configurar cookies&quot;</strong>,
          disponible en el pie de página en todo momento.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-text">Necesarias:</strong> imprescindibles
            para el funcionamiento del sitio (por ejemplo, recordar tu
            decisión sobre cookies). No requieren consentimiento y no se
            pueden desactivar.
          </li>
          <li>
            <strong className="text-text">Analíticas:</strong> nos
            permitirían medir el uso del sitio para mejorarlo (por ejemplo,
            Google Analytics). Requieren tu consentimiento previo.{" "}
            <strong className="text-text">
              Actualmente no están activas.
            </strong>
          </li>
          <li>
            <strong className="text-text">Marketing:</strong> permitirían
            medir campañas o mostrar contenido personalizado en redes
            sociales (por ejemplo, Meta Pixel). Requieren tu consentimiento
            previo.{" "}
            <strong className="text-text">
              Actualmente no están activas.
            </strong>
          </li>
        </ul>
        <p>
          Si en el futuro incorporamos cookies analíticas o de marketing,
          actualizaremos esta política y esa categoría solo se activará si
          la habilitas expresamente desde el panel de configuración.
        </p>
      </LegalSection>

      <LegalSection title="3. Tabla de cookies">
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[480px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-line bg-fill-ghost">
                <th className="px-4 py-3 font-mono-wama uppercase tracking-[0.08em] text-text-dimmer">
                  Nombre
                </th>
                <th className="px-4 py-3 font-mono-wama uppercase tracking-[0.08em] text-text-dimmer">
                  Categoría
                </th>
                <th className="px-4 py-3 font-mono-wama uppercase tracking-[0.08em] text-text-dimmer">
                  Finalidad
                </th>
                <th className="px-4 py-3 font-mono-wama uppercase tracking-[0.08em] text-text-dimmer">
                  Duración
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line">
                <td className="px-4 py-3 text-text">wama-cookie-consent</td>
                <td className="px-4 py-3 text-text-dim">Necesaria</td>
                <td className="px-4 py-3 text-text-dim">
                  Guarda tus preferencias de cookies para no volver a
                  preguntarte en cada visita.
                </td>
                <td className="px-4 py-3 text-text-dim">
                  Persistente (hasta que la borres)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="4. Cómo gestionar o eliminar estas preferencias">
        <p>
          Puedes cambiar tu decisión en cualquier momento desde el enlace{" "}
          <strong className="text-text">&quot;Configurar cookies&quot;</strong>{" "}
          en el pie de página, o eliminar la preferencia guardada borrando
          los datos de navegación (almacenamiento local) de tu navegador
          para este sitio. Al hacerlo, el aviso de cookies volverá a
          mostrarse en tu próxima visita.
        </p>
      </LegalSection>

      <LegalSection title="5. Más información">
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
