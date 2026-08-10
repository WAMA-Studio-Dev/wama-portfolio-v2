"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

const PROJECT_TYPES = [
  "Web Corporativa",
  "E-Commerce",
  "SaaS / App Web",
  "Consultoría",
];

type Status = "idle" | "loading" | "success";

export default function Contact() {
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [status, setStatus] = useState<Status>("idle");

  // TODO(WAMA): conectar a un endpoint real (Resend / Formspree / API propia).
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1100);
  };

  return (
    <section
      id="contacto"
      className="relative border-t border-line bg-bg py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Reveal>
          <h2 className="font-sora text-3xl font-semibold leading-tight tracking-tight text-text md:text-4xl">
            ¿Tienes un proyecto en mente? Hablemos.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-text-dim">
            Cuéntanos qué necesitas. Respondemos en menos de 24 horas.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex items-center gap-3 rounded-2xl border border-line bg-fill-ghost px-6 py-8"
            >
              <CheckCircle size={22} weight="fill" className="shrink-0 text-tinto" />
              <p className="text-sm text-text">
                Mensaje enviado. Te responderemos muy pronto a tu correo.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-8">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.1em] text-text-dimmer">
                  Tipo de proyecto
                </p>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      data-cursor
                      onClick={() => setProjectType(type)}
                      aria-pressed={projectType === type}
                      className={cn(
                        "rounded-full border px-4 py-2 font-mono-wama text-[12.5px] transition-colors duration-200",
                        projectType === type
                          ? "border-tinto bg-fill-solid text-text"
                          : "border-line text-text-dim hover:border-line-strong hover:text-text"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <FormField label="Nombre" name="name" type="text" required />
                <FormField label="Email" name="email" type="email" required />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs uppercase tracking-[0.1em] text-text-dimmer"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full resize-none border-b border-line bg-transparent py-2 text-base text-text outline-none transition-colors duration-200 focus:border-tinto"
                />
              </div>

              <button
                type="submit"
                data-cursor
                disabled={status === "loading"}
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-tinto px-7 py-3.5 font-sora text-sm font-semibold text-text transition-transform duration-200 ease-out active:scale-[0.97] disabled:opacity-60"
              >
                {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
                {status !== "loading" && (
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs uppercase tracking-[0.1em] text-text-dimmer"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full border-b border-line bg-transparent py-2 text-base text-text outline-none transition-colors duration-200 focus:border-tinto"
      />
    </div>
  );
}
