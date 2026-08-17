import { z } from "zod";

export const SECTORS = [
  "Restauración / Hostelería",
  "Clínicas / Salud y Bienestar",
  "Peluquerías / Estética",
  "Tiendas / E-commerce",
  "Servicios Profesionales",
  "Moda / Retail",
  "Inmobiliaria",
  "Otro",
] as const;

// Heurística anti-spam ligera: un nombre nunca debería llevar un enlace
// (los bots suelen rellenar campos de texto libre con URLs promocionales).
const NO_URL_REGEX = /https?:\/\/|www\./i;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre completo")
    .max(80, "El nombre es demasiado largo")
    .refine((val) => !NO_URL_REGEX.test(val), "El nombre no puede contener enlaces"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, "El email es demasiado largo")
    .email("Introduce un email válido"),
  phone: z
    .string()
    .trim()
    .min(6, "Introduce un teléfono válido")
    .max(32, "Introduce un teléfono válido")
    .regex(/^[+\d][\d\s()-]{5,}$/, "Introduce un teléfono válido"),
  instagram: z
    .string()
    .trim()
    .max(60, "El usuario de Instagram es demasiado largo")
    .optional()
    .or(z.literal("")),
  sector: z.enum(SECTORS, "Selecciona un sector"),
  message: z
    .string()
    .trim()
    .max(2000, "El mensaje es demasiado largo")
    .refine(
      (val) => val === "" || val.length >= 3,
      "Cuéntanos un poco más sobre tu proyecto"
    )
    .optional()
    .or(z.literal("")),
  consent: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar la Política de Privacidad para continuar",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
