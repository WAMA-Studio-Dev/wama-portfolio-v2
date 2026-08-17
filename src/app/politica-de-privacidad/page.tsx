import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Política de Privacidad | WAMA Studio",
  description:
    "Cómo tratamos los datos personales que nos facilitas a través del formulario de contacto.",
};

const CONTACT_EMAIL = "wamastudio.contacto@gmail.com";

export default function PoliticaDePrivacidadPage() {
  return (
    <LegalLayout title="Política de Privacidad" updated="13 de agosto de 2026">
      <LegalSection title="1. Responsable del tratamiento">
        <p>
          El responsable del tratamiento de los datos personales
          recabados a través de este sitio web es{" "}
          <strong className="text-text">WAMA Studio</strong>. Puedes
          contactar con nosotros para cualquier cuestión relativa a esta
          política en{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-text underline decoration-line-strong underline-offset-2 hover:text-tinto"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Finalidad del tratamiento">
        <p>
          Los datos que nos facilitas a través del formulario de contacto
          (nombre, email, teléfono, Instagram opcional, sector y mensaje)
          se utilizan exclusivamente para:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Gestionar y responder a tu solicitud de información o presupuesto.</li>
          <li>Mantener comunicación directa contigo sobre tu proyecto.</li>
        </ul>
        <p>No utilizamos tus datos para ninguna otra finalidad ni los incorporamos a listas de envío comercial sin tu consentimiento expreso.</p>
      </LegalSection>

      <LegalSection title="3. Legitimación">
        <p>
          La base legal para el tratamiento de tus datos es tu{" "}
          <strong className="text-text">consentimiento expreso</strong>,
          otorgado al marcar la casilla de aceptación de esta Política de
          Privacidad antes de enviar el formulario de contacto (art. 6.1.a
          del RGPD).
        </p>
      </LegalSection>

      <LegalSection title="4. Destinatarios y encargados del tratamiento">
        <p>
          Para el envío de los correos electrónicos generados por el
          formulario de contacto utilizamos{" "}
          <strong className="text-text">Resend</strong>, un proveedor de
          infraestructura de email que actúa como encargado del
          tratamiento. No cedemos tus datos a ningún otro tercero salvo
          obligación legal.
        </p>
      </LegalSection>

      <LegalSection title="5. Plazo de conservación">
        <p>
          Conservamos tus datos únicamente durante el tiempo necesario
          para gestionar tu solicitud y, en su caso, durante el desarrollo
          de la relación comercial que pueda establecerse, salvo que
          solicites su supresión con anterioridad.
        </p>
      </LegalSection>

      <LegalSection title="6. Tus derechos">
        <p>
          Puedes ejercer en cualquier momento tus derechos de acceso,
          rectificación, supresión, oposición, limitación del tratamiento
          y portabilidad de tus datos (derechos ARCO+RGPD) escribiendo a{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-text underline decoration-line-strong underline-offset-2 hover:text-tinto"
          >
            {CONTACT_EMAIL}
          </a>
          . Asimismo, tienes derecho a presentar una reclamación ante la
          Agencia Española de Protección de Datos (
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text underline decoration-line-strong underline-offset-2 hover:text-tinto"
          >
            www.aepd.es
          </a>
          ) si consideras que el tratamiento de tus datos no se ajusta a
          la normativa vigente.
        </p>
      </LegalSection>

      <LegalSection title="7. Seguridad">
        <p>
          Aplicamos las medidas técnicas y organizativas razonables para
          proteger tus datos personales frente a accesos no autorizados,
          pérdida o alteración.
        </p>
      </LegalSection>

      <LegalSection title="8. Transferencias internacionales de datos">
        <p>
          Nuestro proveedor de email transaccional, Resend, puede procesar
          y almacenar datos en servidores ubicados fuera del Espacio
          Económico Europeo (por ejemplo, en Estados Unidos). En estos
          casos, la transferencia se realiza amparada en las garantías
          previstas por el RGPD, como las Cláusulas Contractuales Tipo
          aprobadas por la Comisión Europea u otro mecanismo equivalente
          ofrecido por el proveedor. Puedes solicitarnos más información al
          respecto en{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
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
