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

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre completo"),
  email: z.string().trim().email("Introduce un email válido"),
  phone: z
    .string()
    .trim()
    .min(6, "Introduce un teléfono válido")
    .regex(/^[+\d][\d\s()-]{5,}$/, "Introduce un teléfono válido"),
  instagram: z.string().trim().optional().or(z.literal("")),
  sector: z.enum(SECTORS, "Selecciona un sector"),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más sobre el proyecto"),
  consent: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar la Política de Privacidad para continuar",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
