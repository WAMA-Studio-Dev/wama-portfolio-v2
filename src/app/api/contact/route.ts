import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

const CONTACT_RECIPIENT = "wamastudio.contacto@gmail.com";

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
    const { error } = await resend.emails.send({
      from: "WAMA Studio <onboarding@resend.dev>",
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `Nuevo proyecto — ${name} (${sector})`,
      text: [
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Teléfono: ${phone}`,
        `Instagram: ${instagram || "—"}`,
        `Sector: ${sector}`,
        "",
        "Mensaje:",
        message,
      ].join("\n"),
    });

    if (error) {
      return Response.json(
        { error: "No se pudo enviar el mensaje. Inténtalo de nuevo." },
        { status: 502 }
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
