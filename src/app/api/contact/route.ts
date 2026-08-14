import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

const CONTACT_RECIPIENT = "wamastudio.contacto@gmail.com";
const FROM_ADDRESS = "WAMA Studio <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function internalNotificationHtml(data: {
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  sector: string;
  message?: string;
}) {
  const rows = [
    ["Nombre", data.name],
    ["Email", data.email],
    ["Teléfono", data.phone],
    ["Instagram", data.instagram || "No proporcionado"],
    ["Sector", data.sector],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #232326;color:#9a9a9e;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #232326;color:#f2e9d8;font-size:14px;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `
  <div style="background:#0b0b0c;padding:32px 16px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#111113;border:1px solid #232326;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="background:linear-gradient(135deg,#7a1a24,#4d1017);padding:22px 24px;">
          <p style="margin:0;color:#f2e9d8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;">WAMA® Studio</p>
          <p style="margin:8px 0 0;color:#f2e9d8;font-size:15px;font-weight:600;">Nuevo lead desde la web</p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;">
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            ${rows}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px 24px;">
          <p style="margin:0 0 8px;color:#9a9a9e;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;">Mensaje</p>
          <p style="margin:0;color:#f2e9d8;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message || "No proporcionado")}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 24px 22px;border-top:1px solid #232326;">
          <p style="margin:0;color:#5f5f63;font-size:11px;line-height:1.6;">
            Responde directamente a este correo para contestar a ${escapeHtml(data.name)}.
          </p>
        </td>
      </tr>
    </table>
  </div>`;
}

function clientConfirmationHtml(name: string) {
  return `
  <div style="background:#0b0b0c;padding:32px 16px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#111113;border:1px solid #232326;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="background:linear-gradient(135deg,#7a1a24,#4d1017);padding:24px 28px;">
          <p style="margin:0;color:#f2e9d8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;">WAMA® Studio</p>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 28px 8px;">
          <h1 style="margin:0;color:#f2e9d8;font-size:22px;font-weight:600;">Hola${name ? `, ${escapeHtml(name)}` : ""}.</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 28px 8px;">
          <p style="margin:0 0 14px;color:#c9c4ba;font-size:14px;line-height:1.7;">
            Hemos recibido tu solicitud y ya la tenemos sobre la mesa. Nuestro equipo
            revisará los detalles de tu proyecto y te responderá en menos de
            <strong style="color:#f2e9d8;">24 horas</strong>.
          </p>
          <p style="margin:0 0 14px;color:#c9c4ba;font-size:14px;line-height:1.7;">
            Mientras tanto, si quieres añadir algo más a tu mensaje, puedes
            responder directamente a este correo.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 28px 32px;border-top:1px solid #232326;margin-top:8px;">
          <p style="margin:16px 0 0;color:#5f5f63;font-size:12px;line-height:1.6;">
            WAMA Studio — Ingeniería de software · Diseño web · Dirección creativa
          </p>
        </td>
      </tr>
    </table>
  </div>`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: "Datos de formulario inválidos." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "RESEND_API_KEY no configurada en el servidor." },
      { status: 500 }
    );
  }

  const { name, email, phone, instagram, sector, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    // TODO(WAMA): cambiar "from" a un dominio propio verificado en Resend
    // (onboarding@resend.dev solo funciona para pruebas).
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
      return Response.json(
        { error: "No se pudo enviar el mensaje. Inténtalo de nuevo." },
        { status: 502 }
      );
    }

    if (confirmationResult.status === "rejected") {
      console.error(
        "No se pudo enviar el email de confirmación al cliente:",
        confirmationResult.reason
      );
    } else if (confirmationResult.value.error) {
      console.error(
        "No se pudo enviar el email de confirmación al cliente:",
        confirmationResult.value.error
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "No se pudo enviar el mensaje. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
