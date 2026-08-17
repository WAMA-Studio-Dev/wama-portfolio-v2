import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import {
  clientConfirmationHtml,
  internalNotificationHtml,
} from "@/lib/email-templates";
import { isRateLimited } from "@/lib/rate-limit";

const CONTACT_RECIPIENT = "wamastudio.contacto@gmail.com";
const FROM_ADDRESS = "WAMA Studio <hola@wamastudio.com>";

function describeError(err: unknown) {
  if (err instanceof Error) {
    return { name: err.name, message: err.message, stack: err.stack };
  }
  return err;
}

function getClientIp(request: Request) {
  // Vercel / la mayoría de proxies anteponen la IP real del cliente a la
  // cabecera; el resto de la cadena son proxies intermedios de confianza.
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const body = await request.json().catch((err) => {
    console.error("[contact] Body no es JSON válido:", err);
    return null;
  });

  // Honeypot: campo oculto que un usuario real nunca rellena. Se comprueba
  // fuera del esquema de Zod para no acoplar la lógica anti-spam a los
  // mensajes de validación que ve la persona usuaria. Si un bot lo rellena,
  // respondemos como si hubiera ido bien (sin enviar nada) para no darle
  // pistas de que fue detectado.
  const honeypot =
    body && typeof body === "object" && "company" in body
      ? String((body as Record<string, unknown>).company ?? "")
      : "";
  if (honeypot.trim() !== "") {
    console.warn("[contact] Honeypot relleno, descartado silenciosamente.");
    return Response.json({ ok: true });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    console.warn(`[contact] Rate limit alcanzado para IP ${clientIp}.`);
    return Response.json(
      { error: "Has enviado el formulario hace un momento. Espera unos segundos e inténtalo de nuevo." },
      { status: 429 }
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    console.error(
      "[contact] Validación de Zod fallida:",
      JSON.stringify(parsed.error.issues, null, 2)
    );
    return Response.json(
      { error: "Datos de formulario inválidos." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY no está definida en process.env. " +
        "Revisa que exista en .env.local y reinicia `next dev` para que se recargue."
    );
    return Response.json(
      { error: "RESEND_API_KEY no configurada en el servidor." },
      { status: 500 }
    );
  }

  const { name, email, phone, instagram, sector, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    // wamastudio.com debe estar verificado en Resend (Domains) para que
    // el envío desde FROM_ADDRESS no sea rechazado.
    const [internalResult, confirmationResult] = await Promise.allSettled([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: CONTACT_RECIPIENT,
        replyTo: email,
        subject: `Nuevo proyecto — ${name} (${sector})`,
        html: internalNotificationHtml({
          name,
          email,
          phone,
          instagram,
          sector,
          message,
        }),
        text: [
          `Nombre: ${name}`,
          `Email: ${email}`,
          `Teléfono: ${phone}`,
          `Instagram: ${instagram || "No proporcionado"}`,
          `Sector: ${sector}`,
          "",
          "Mensaje:",
          message || "No proporcionado",
        ].join("\n"),
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        subject: "Hemos recibido tu solicitud | WAMA Studio",
        html: clientConfirmationHtml(name),
        text: `Hola${name ? `, ${name}` : ""}.\n\nHemos recibido tu solicitud y te responderemos en menos de 24 horas.\n\n— WAMA Studio`,
      }),
    ]);

    const internalFailed =
      internalResult.status === "rejected" ||
      (internalResult.status === "fulfilled" && internalResult.value.error);

    if (internalFailed) {
      console.error(
        "[contact] Fallo al enviar el email interno vía Resend:",
        internalResult.status === "rejected"
          ? describeError(internalResult.reason)
          : internalResult.value.error
      );
      return Response.json(
        { error: "No se pudo enviar el mensaje. Inténtalo de nuevo." },
        { status: 502 }
      );
    }

    if (confirmationResult.status === "rejected") {
      console.error(
        "[contact] No se pudo enviar el email de confirmación al cliente:",
        describeError(confirmationResult.reason)
      );
    } else if (confirmationResult.value.error) {
      console.error(
        "[contact] No se pudo enviar el email de confirmación al cliente:",
        confirmationResult.value.error
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] Excepción no controlada al enviar:", describeError(err));
    return Response.json(
      { error: "No se pudo enviar el mensaje. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
