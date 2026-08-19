"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  User,
  EnvelopeSimple,
  Phone,
  InstagramLogo,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";
import { useContactDrawer } from "@/lib/contact-drawer-context";
import {
  contactSchema,
  SECTORS,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import SpecularButton from "./ui/SpecularButton";

type FieldIcon = React.ComponentType<{ size?: number; className?: string }>;

type Status = "idle" | "loading" | "success" | "error";

function subscribeNoop() {
  return () => {};
}
function getClientSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

/** Portal solo debe montarse en cliente; sin setState en efecto (evita cascading renders). */
function useMounted() {
  return useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);
}

export default function ContactDrawer() {
  const { isOpen, close, returnFocus } = useContactDrawer();
  const mounted = useMounted();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      instagram: "",
      sector: SECTORS[0],
      message: "",
      consent: false,
    },
  });

  const handleClose = () => {
    close();
    returnFocus();
    setStatus("idle");
    setErrorMessage("");
  };

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const focusId = window.setTimeout(() => {
      containerRef.current
        ?.querySelector<HTMLElement>("input, select, textarea")
        ?.focus();
    }, 60);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(focusId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key !== "Tab") return;

      const container = containerRef.current;
      if (!container) return;
      const focusables = container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onSubmit = async (
    values: ContactFormValues,
    event?: React.BaseSyntheticEvent
  ) => {
    setStatus("loading");
    setErrorMessage("");
    // Honeypot anti-bot: campo señuelo fuera del schema de validación
    // visible (ver src/app/api/contact/route.ts), leído del FormData nativo
    // del <form> para no acoplarlo al estado/errores de react-hook-form.
    const formEl = event?.target as HTMLFormElement | undefined;
    const honeypot = formEl ? new FormData(formEl).get("company") : "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          company: typeof honeypot === "string" ? honeypot : "",
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? "No se pudo enviar el mensaje.");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "No se pudo enviar el mensaje."
      );
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            key="panel"
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-[28px] border border-line bg-[#111113] shadow-[0_0_80px_rgba(0,0,0,0.55)]"
          >
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-tinto px-6 py-3 text-xs font-medium leading-relaxed text-text sm:px-8 sm:text-sm"
            >
              ⚡ Estás a punto de escalar la tecnología de tu empresa.
              Hablemos hoy.
            </motion.div>

            <div className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-8">
              <div>
                <p className="mb-1 font-mono-wama text-[11px] uppercase tracking-[0.22em] text-tinto">
                  Contacto
                </p>
                <h2
                  id="contact-modal-title"
                  className="font-sora text-xl font-semibold text-text"
                >
                  Hablemos de tu proyecto
                </h2>
              </div>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={handleClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-dimmer transition-colors duration-200 hover:bg-white/10 hover:text-text"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-6 sm:px-8">
              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center py-6 text-center"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-tinto/10">
                      <CheckCircle size={32} weight="fill" className="text-tinto" />
                    </div>
                    <h3 className="font-sora text-lg font-semibold text-text">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="mt-2 text-sm text-text-dim">
                      Te responderemos en menos de 24-48h.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                    noValidate
                  >
                    {/* Honeypot anti-bot: invisible y no enfocable para una persona
                        real (no usa display:none, que algunos bots evitan), pero
                        un bot que autorellena todos los inputs del formulario lo
                        encuentra. Ver comprobación en /api/contact. */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        width: 1,
                        height: 1,
                        overflow: "hidden",
                        clip: "rect(0 0 0 0)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <label htmlFor="company">No rellenar este campo</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <Field icon={User} label="Nombre completo" htmlFor="name" error={errors.name?.message}>
                      <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className="w-full border-b border-line bg-transparent py-2 pl-6 text-base text-text outline-none transition-colors duration-200 focus:border-tinto"
                      />
                    </Field>

                    <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
                      <Field icon={EnvelopeSimple} label="Email" htmlFor="email" error={errors.email?.message}>
                        <input
                          id="email"
                          type="email"
                          {...register("email")}
                          className="w-full border-b border-line bg-transparent py-2 pl-6 text-base text-text outline-none transition-colors duration-200 focus:border-tinto"
                        />
                      </Field>

                      <Field icon={Phone} label="Teléfono" htmlFor="phone" error={errors.phone?.message}>
                        <input
                          id="phone"
                          type="tel"
                          {...register("phone")}
                          className="w-full border-b border-line bg-transparent py-2 pl-6 text-base text-text outline-none transition-colors duration-200 focus:border-tinto"
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
                      <Field
                        icon={InstagramLogo}
                        label="Instagram (opcional)"
                        htmlFor="instagram"
                        error={errors.instagram?.message}
                      >
                        <input
                          id="instagram"
                          type="text"
                          {...register("instagram")}
                          className="w-full border-b border-line bg-transparent py-2 pl-6 text-base text-text outline-none transition-colors duration-200 focus:border-tinto placeholder:text-text-dimmer"
                        />
                      </Field>

                      <div>
                        <label
                          htmlFor="sector"
                          className="mb-2 block text-xs uppercase tracking-[0.1em] text-text-dimmer"
                        >
                          Sector / Tipo de empresa
                        </label>
                        <select
                          id="sector"
                          {...register("sector")}
                          className="w-full border-b border-line bg-transparent py-2 text-base text-text outline-none transition-colors duration-200 focus:border-tinto"
                        >
                          {SECTORS.map((sector) => (
                            <option key={sector} value={sector} className="bg-[#111113]">
                              {sector}
                            </option>
                          ))}
                        </select>
                        {errors.sector && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.sector.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-xs uppercase tracking-[0.1em] text-text-dimmer"
                      >
                        Mensaje / detalles del proyecto (opcional)
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        {...register("message")}
                        className="w-full resize-none border-b border-line bg-transparent py-2 text-base text-text outline-none transition-colors duration-200 focus:border-tinto"
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-400">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="consent"
                        className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-text-dim"
                      >
                        <input
                          id="consent"
                          type="checkbox"
                          {...register("consent")}
                          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-line bg-transparent accent-tinto"
                        />
                        <span>
                          He leído y acepto la{" "}
                          <a
                            href="/politica-de-privacidad"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text underline decoration-line-strong underline-offset-2 transition-colors duration-200 hover:text-tinto"
                          >
                            Política de Privacidad
                          </a>
                          .
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="mt-1.5 text-xs text-red-400">
                          {errors.consent.message}
                        </p>
                      )}
                    </div>

                    {status === "error" && (
                      <div className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/[0.06] px-4 py-3 text-xs text-red-300">
                        <WarningCircle size={16} className="mt-0.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="flex justify-center">
                      <SpecularButton
                        type="submit"
                        disabled={isSubmitting || status === "loading"}
                        radius={999}
                        lineColor="#ffffff"
                        textColor="var(--text)"
                        className={cn(
                          "inline-flex w-fit items-center gap-2 rounded-full bg-tinto px-7 py-3.5 font-sora text-sm font-semibold text-text transition-transform duration-200 ease-out active:scale-[0.97] disabled:opacity-60"
                        )}
                      >
                        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
                      </SpecularButton>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function Field({
  icon: Icon,
  label,
  htmlFor,
  error,
  children,
}: {
  icon: FieldIcon;
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.1em] text-text-dimmer"
      >
        <Icon size={13} className="text-tinto" />
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
