/**
 * Guarda anti-duplicados en memoria: evita reenvíos del mismo origen en
 * una ventana corta (doble clic, reintentos de script, etc.).
 *
 * Limitación consciente: al vivir en memoria del proceso, en un despliegue
 * serverless con varias instancias cada una lleva su propio contador (no es
 * un rate limiter distribuido). Para eso haría falta un store compartido
 * (p.ej. Redis/Upstash), fuera del alcance de esta protección básica.
 */
const WINDOW_MS = 15_000;
const MAX_ENTRIES = 5000;

const lastSubmissionAt = new Map<string, number>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const last = lastSubmissionAt.get(key);

  lastSubmissionAt.set(key, now);

  if (lastSubmissionAt.size > MAX_ENTRIES) {
    for (const [k, t] of lastSubmissionAt) {
      if (now - t > WINDOW_MS * 4) lastSubmissionAt.delete(k);
    }
  }

  return last !== undefined && now - last < WINDOW_MS;
}
