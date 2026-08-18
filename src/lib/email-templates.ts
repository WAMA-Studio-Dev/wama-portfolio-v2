import { EMAIL_FOOTER_LOGO_BASE64 } from "./email-footer-logo";

// Colores de marca extraídos directamente de public/logo.png.
const WAMA_RED = "#94192C";
const WAMA_RED_DARK = "#4a0d16";
const WAMA_CREAM = "#FFFBE0";

// Estilo general unificado (fondo oscuro + bordes sutiles) del resto del sitio.
const BG = "#0b0b0c";
const CARD_BG = "#111113";
const BORDER = "#1f1f23";
const TEXT = "#f2e9d8";
const TEXT_DIM = "#c9c4ba";
const TEXT_DIMMER = "#9a9a9e";
const TEXT_FAINT = "#5f5f63";

// Fuente de marca (public/fonts/FatherGalaxy-Regular.otf) vía @font-face
// con fallback sólido: Apple Mail suele respetar @font-face, Gmail/Outlook
// lo ignoran silenciosamente y caen a Georgia/serif — nunca queda un hueco
// en blanco.
const FONT_FACE = `
  @font-face {
    font-family: 'FatherGalaxy';
    src: url('https://wamastudio.com/fonts/FatherGalaxy-Regular.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;
const HEADER_FONT_STACK =
  "'FatherGalaxy', 'Arial Black', 'Helvetica Neue', Helvetica, Arial, sans-serif";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function documentShell(title: string, bodyHtml: string) {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
    <title>${escapeHtml(title)}</title>
    <style>${FONT_FACE}</style>
  </head>
  <body style="margin:0;padding:0;background-color:${BG};">
    <div style="background-color:${BG};padding:32px 16px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
      <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background-color:${CARD_BG};border:1px solid ${BORDER};border-radius:16px;overflow:hidden;">
        ${bodyHtml}
      </table>
    </div>
  </body>
</html>`;
}

/**
 * Cabecera de marca compartida por ambas plantillas: banner en degradado
 * granate/burdeos (color sólido de respaldo vía bgcolor/background-color
 * para clientes que ignoran background-image, degradado real como mejora
 * progresiva) con "WAMA STUDIO" centrado, en mayúsculas y en negrita.
 */
function emailHeaderHtml() {
  return `
    <tr>
      <td
        align="center"
        bgcolor="${WAMA_RED_DARK}"
        style="padding:40px 24px;background-color:${WAMA_RED_DARK};background-image:linear-gradient(135deg, ${WAMA_RED_DARK} 0%, ${WAMA_RED} 100%);"
      >
        <p style="margin:0;font-family:${HEADER_FONT_STACK};font-size:26px;line-height:1.2;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${WAMA_CREAM};">
          WAMA STUDIO
        </p>
      </td>
    </tr>`;
}

/** Logo pequeño + copyright discreto, igual en ambas plantillas. */
function emailFooterHtml() {
  const year = new Date().getFullYear();
  return `
    <tr>
      <td align="center" style="padding:28px 24px 32px;border-top:1px solid ${BORDER};">
        <img
          src="data:image/png;base64,${EMAIL_FOOTER_LOGO_BASE64}"
          width="40"
          height="40"
          alt="WAMA"
          style="display:block;width:40px;height:40px;border:0;outline:none;text-decoration:none;margin:0 auto 12px;border-radius:9px;"
        />
        <p style="margin:0;color:${TEXT_FAINT};font-size:11px;line-height:1.6;">
          © ${year} WAMA Studio. Todos los derechos reservados.
        </p>
      </td>
    </tr>`;
}

export function internalNotificationHtml(data: {
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  sector: string;
  message?: string;
}) {
  const rows: [string, string][] = [
    ["Nombre", data.name],
    ["Email", data.email],
    ["Teléfono", data.phone],
    ...(data.instagram
      ? ([["Instagram", data.instagram]] as [string, string][])
      : []),
    ["Sector", data.sector],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid ${BORDER};color:${TEXT_DIMMER};font-size:12px;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:10px 16px;border-bottom:1px solid ${BORDER};color:${TEXT};font-size:14px;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const body = `
    ${emailHeaderHtml()}
    <tr>
      <td style="padding:20px 24px 4px;">
        <p style="margin:0;color:${TEXT};font-size:15px;font-weight:600;">Nuevo lead desde la web</p>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 0;">
        <table role="presentation" width="100%" style="border-collapse:collapse;">
          ${rowsHtml}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px 24px;">
        <p style="margin:0 0 8px;color:${TEXT_DIMMER};font-size:12px;text-transform:uppercase;letter-spacing:0.06em;">Mensaje</p>
        <p style="margin:0;color:${TEXT};font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message || "No proporcionado")}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 24px 22px;border-top:1px solid ${BORDER};">
        <p style="margin:0;color:${TEXT_FAINT};font-size:11px;line-height:1.6;">
          Responde directamente a este correo para contestar a ${escapeHtml(data.name)}.
        </p>
      </td>
    </tr>
    ${emailFooterHtml()}
  `;

  return documentShell("Nuevo lead desde la web | WAMA Studio", body);
}

export function clientConfirmationHtml(name: string) {
  const body = `
    ${emailHeaderHtml()}
    <tr>
      <td style="padding:28px 28px 8px;">
        <h1 style="margin:0;color:${TEXT};font-size:22px;font-weight:600;">Hola${name ? `, ${escapeHtml(name)}` : ""}.</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 28px 8px;">
        <p style="margin:0 0 14px;color:${TEXT_DIM};font-size:14px;line-height:1.7;">
          Hemos recibido tu solicitud y ya la tenemos sobre la mesa. Nuestro equipo
          revisará los detalles de tu proyecto y te responderá en menos de
          <strong style="color:${TEXT};">24 horas</strong>.
        </p>
        <p style="margin:0 0 14px;color:${TEXT_DIM};font-size:14px;line-height:1.7;">
          Mientras tanto, si quieres añadir algo más a tu mensaje, puedes
          responder directamente a este correo.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 28px 24px;">
        <p style="margin:0;color:${TEXT_FAINT};font-size:12px;line-height:1.6;">
          WAMA Studio — Ingeniería de software · Diseño web · Dirección creativa
        </p>
      </td>
    </tr>
    ${emailFooterHtml()}
  `;

  return documentShell("Hemos recibido tu solicitud | WAMA Studio", body);
}
