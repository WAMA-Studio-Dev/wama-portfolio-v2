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

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
        <div className="fixed inset-0 z-[110]">
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
            aria-labelledby="contact-drawer-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-line bg-[#111113] shadow-[0_0_60px_rgba(0,0,0,0.5)]"
          >
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-tinto px-6 py-3 text-xs font-medium leading-relaxed text-text sm:text-sm"
            >
              ⚡ Estás a punto de escalar la tecnología de tu empresa.
              Hablemos hoy.
            </motion.div>

            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2
                id="contact-drawer-title"
                className="font-sora text-xl font-semibold text-text"
              >
                Hablemos de tu proyecto
              </h2>
              <button
                type="button"
                aria-label="Cerrar"
                data-cursor
                onClick={handleClose}
                className="flex h-9 w-9 items-center justify-center rounded-full text-text-dimmer transition-colors duration-200 hover:bg-white/10 hover:text-text"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 px-6 py-6">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-fill-ghost px-6 py-8"
                >
                  <CheckCircle
                    size={22}
                    weight="fill"
                    className="shrink-0 text-tinto"
                  />
                  <p className="text-sm text-text">
                    Mensaje enviado. Te responderemos muy pronto a tu correo.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                  noValidate
                >
                  <Field icon={User} label="Nombre completo" htmlFor="name" error={errors.name?.message}>
                    <input
                      id="name"
                      type="text"
                      {...register("name")}
                      className="w-full border-b border-line bg-transparent py-2 pl-6 text-base text-text outline-none transition-colors duration-200 focus:border-tinto"
                    />
                  </Field>

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
                          data-cursor
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

                  <button
                    type="submit"
                    data-cursor
                    disabled={isSubmitting || status === "loading"}
                    className={cn(
                      "inline-flex w-fit items-center gap-2 rounded-full bg-tinto px-7 py-3.5 font-sora text-sm font-semibold text-text transition-transform duration-200 ease-out active:scale-[0.97] disabled:opacity-60"
                    )}
                  >
                    {status === "loading" ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </form>
              )}
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
