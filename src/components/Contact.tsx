"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { useContactDrawer } from "@/lib/contact-drawer-context";
import Reveal from "./Reveal";

export default function Contact() {
  const { open } = useContactDrawer();

  return (
    <section
      id="contacto"
      className="relative border-t border-line bg-bg py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <Reveal>
          <h2 className="font-sora text-3xl font-semibold leading-tight tracking-tight text-text md:text-4xl">
            ¿Tienes un proyecto en mente? Hablemos.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-dim">
            Cuéntanos qué necesitas. Respondemos en menos de 24 horas.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.button
            type="button"
            data-cursor
            onClick={open}
            whileTap={{ scale: 0.97 }}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-tinto px-8 py-4 font-sora text-sm font-semibold text-text transition-transform duration-200 ease-out"
          >
            Iniciar Proyecto
            <ArrowUpRight
              size={16}
              weight="bold"
              className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
}
