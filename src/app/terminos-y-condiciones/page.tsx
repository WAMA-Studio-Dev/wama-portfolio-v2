import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Términos y Condiciones | WAMA Studio",
  description:
    "Condiciones que rigen la contratación de servicios de diseño y desarrollo web con WAMA Studio.",
};

const CONTACT_EMAIL = "wamastudio.contacto@gmail.com";

export default function TerminosYCondicionesPage() {
  return (
    <LegalLayout title="Términos y Condiciones" updated="14 de agosto de 2026">
      <LegalSection title="1. Objeto">
        <p>
          Estos Términos y Condiciones regulan la prestación de servicios de{" "}
          <strong className="text-text">
            ingeniería de software, diseño web, desarrollo a medida y
            dirección creativa
          </strong>{" "}
          ofrecidos por WAMA Studio a sus clientes, ya sean personas físicas o
          empresas, con independencia de que la contratación se inicie a
          través de este Sitio Web, redes sociales o comunicación directa.
        </p>
      </LegalSection>

      <LegalSection title="2. Proceso de contratación">
        <p>
          Toda colaboración comienza con una toma de contacto (a través del
          formulario, email o Instagram) en la que se recogen los
          requisitos del proyecto. A partir de ahí:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            WAMA Studio elabora una propuesta con alcance, plazos orientativos
            y precio cerrado.
          </li>
          <li>
            El proyecto se considera aceptado cuando el cliente confirma la
            propuesta por escrito (email, mensaje o firma de presupuesto).
          </li>
          <li>
            Cualquier ampliación de alcance no incluida en la propuesta
            original se presupuesta y factura de forma independiente.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Forma de pago y plazos">
        <p>
          Salvo acuerdo distinto reflejado por escrito, los proyectos se
          facturan en fases: un pago inicial al aceptar la propuesta y el
          resto contra entregables o al finalizar el proyecto. Los plazos de
          entrega comunicados en la propuesta son orientativos y pueden
          verse afectados por retrasos en la entrega de contenidos,
          accesos o feedback por parte del cliente.
        </p>
      </LegalSection>

      <LegalSection title="4. Obligaciones del cliente">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Facilitar en tiempo razonable los contenidos, accesos y
            materiales necesarios para el desarrollo del proyecto.
          </li>
          <li>
            Revisar y aprobar los entregables dentro de los plazos
            acordados.
          </li>
          <li>
            Abonar las cantidades pactadas en los plazos establecidos en la
            propuesta o factura correspondiente.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Obligaciones de WAMA Studio">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Ejecutar el proyecto conforme al alcance, plazos y calidad
            acordados en la propuesta aceptada.
          </li>
          <li>
            Mantener comunicación directa y transparente durante todo el
            proceso.
          </li>
          <li>
            Emitir factura oficial de cada pago recibido.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Propiedad intelectual">
        <p>
          Una vez abonada la totalidad del precio acordado, la titularidad
          del diseño y desarrollo final entregado (código específico del
          proyecto, contenidos y diseño visual creados para el cliente) se
          transfiere al cliente. WAMA Studio conserva:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            El derecho a exhibir el proyecto como parte de su portfolio y
            materiales promocionales, salvo acuerdo expreso de
            confidencialidad.
          </li>
          <li>
            La titularidad sobre componentes, librerías o herramientas
            internas de desarrollo propio reutilizadas en distintos
            proyectos (no exclusivas del cliente).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Cancelación y modificación de proyectos">
        <p>
          El cliente puede solicitar la cancelación del proyecto en
          cualquier momento por escrito. En ese caso, WAMA Studio facturará
          el trabajo efectivamente realizado hasta la fecha de cancelación,
          y las cantidades ya abonadas correspondientes a fases no
          iniciadas se reembolsarán proporcionalmente. Los cambios
          sustanciales de alcance sobre el proyecto ya iniciado se tratan
          como una ampliación y se presupuestan aparte.
        </p>
      </LegalSection>

      <LegalSection title="8. Mantenimiento">
        <p>
          El mantenimiento posterior al lanzamiento (actualizaciones,
          cambios de contenido, ampliaciones) es un servicio bajo demanda,
          sin permanencias forzosas, que se presupuesta de forma
          independiente al proyecto inicial.
        </p>
      </LegalSection>

      <LegalSection title="9. Herramientas de inteligencia artificial">
        <p>
          En WAMA Studio empleamos herramientas de inteligencia artificial
          como apoyo en procesos de diseño, desarrollo y generación de
          contenido. Esto no sustituye el criterio profesional del equipo,
          que supervisa y valida cada entrega antes de ponerla a disposición
          del cliente.
        </p>
      </LegalSection>

      <LegalSection title="10. Legislación aplicable">
        <p>
          Estos Términos y Condiciones se rigen por la legislación
          española. Para cualquier controversia que pudiera derivarse de la
          prestación de estos servicios, las partes se someterán a los
          juzgados y tribunales que resulten competentes conforme a
          derecho, tratando de resolver previamente cualquier discrepancia
          de forma amistosa.
        </p>
      </LegalSection>

      <LegalSection title="11. Contacto">
        <p>
          Para cualquier duda sobre estos Términos y Condiciones, puedes
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
