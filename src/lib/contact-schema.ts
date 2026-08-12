import { z } from "zod";

export const SECTORS = [
  "Restauración",
  "E-commerce",
  "Servicios Profesionales",
  "Moda/Retail",
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
});

export type ContactFormValues = z.infer<typeof contactSchema>;
