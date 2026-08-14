import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Aviso Legal | WAMA Studio",
  description: "Condiciones de acceso y uso del sitio web de WAMA Studio.",
};

const CONTACT_EMAIL = "wamastudio.contacto@gmail.com";

export default function AvisoLegalPage() {
  return (
    <LegalLayout title="Aviso Legal" updated="13 de agosto de 2026">
      <LegalSection title="1. Datos identificativos">
        <p>
          En cumplimiento del deber de información recogido en la
          legislación vigente, se informa a los usuarios de este sitio web
          de que el titular y responsable del mismo es{" "}
          <strong className="text-text">WAMA Studio</strong>, estudio de
          ingeniería de software y diseño web formado por dos profesionales
          que prestan sus servicios de forma directa. Puedes contactar con
          nosotros a través del correo electrónico{" "}
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

      <LegalSection title="2. Objeto">
        <p>
          El presente Aviso Legal regula el acceso y uso del sitio web{" "}
          <em>wama-portfolio-v2</em> (en adelante, &quot;el Sitio Web&quot;),
          que WAMA Studio pone a disposición de los usuarios de Internet con
          el fin de dar a conocer sus servicios de ingeniería de software,
          diseño web y dirección creativa, así como facilitar un canal de
          contacto directo con potenciales clientes.
        </p>
      </LegalSection>

      <LegalSection title="3. Condiciones de acceso y uso">
        <p>
          El acceso al Sitio Web es gratuito y no requiere registro previo.
          El usuario se compromete a hacer un uso adecuado y lícito del
          Sitio Web, de conformidad con la legislación aplicable, la buena
          fe y el orden público, absteniéndose de utilizarlo de cualquier
          forma que pueda impedir, dañar o deteriorar el normal
          funcionamiento del mismo.
        </p>
      </LegalSection>

      <LegalSection title="4. Propiedad intelectual e industrial">
        <p>
          Todos los contenidos del Sitio Web (textos, imágenes, código
          fuente, diseño, logotipos y demás elementos gráficos) son
          propiedad de WAMA Studio o de sus respectivos titulares, y están
          protegidos por la normativa de propiedad intelectual e
          industrial. Queda prohibida su reproducción, distribución o
          modificación total o parcial sin autorización expresa.
        </p>
      </LegalSection>

      <LegalSection title="5. Exclusión de responsabilidad">
        <p>
          WAMA Studio no se hace responsable de las interrupciones,
          errores u omisiones que puedan producirse en el Sitio Web por
          causas ajenas a su control, ni de los daños que pudieran
          derivarse del acceso, uso o mala utilización de sus contenidos.
        </p>
      </LegalSection>

      <LegalSection title="6. Enlaces externos">
        <p>
          El Sitio Web puede contener enlaces a redes sociales y otros
          sitios de terceros. WAMA Studio no controla ni asume
          responsabilidad alguna sobre los contenidos, políticas de
          privacidad o prácticas de dichos sitios externos.
        </p>
      </LegalSection>

      <LegalSection title="7. Transparencia sobre el uso de inteligencia artificial">
        <p>
          En WAMA Studio empleamos herramientas de inteligencia artificial
          como apoyo en procesos de diseño, desarrollo y generación de
          contenido de este Sitio Web y de los proyectos que entregamos a
          nuestros clientes. Esto no sustituye el criterio profesional del
          equipo, que supervisa y valida cada entrega.
        </p>
      </LegalSection>

      <LegalSection title="8. Legislación aplicable">
        <p>
          Las presentes condiciones se rigen por la legislación española.
          Para cualquier controversia derivada del acceso o uso del Sitio
          Web, las partes se someterán a los juzgados y tribunales que
          resulten competentes conforme a derecho.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
