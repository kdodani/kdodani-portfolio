"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="scroll-mt-section border-t border-stone-200/80"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl px-6 py-section-pad sm:px-8 lg:px-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
          About
        </p>

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-x-14 lg:gap-y-10 xl:gap-x-16">
          <motion.div
            className="order-2 min-w-0 lg:order-1 lg:max-w-xl xl:max-w-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-56px" }}
            transition={{ duration: 0.6, ease }}
          >
            <h2
              id="about-heading"
              className="font-display text-2xl font-medium leading-snug tracking-tight text-stone-900 sm:text-3xl lg:text-[2rem] lg:leading-[1.2]"
            >
              I care about how products feel, how teams decide, and how systems hold up
              when reality gets messy.
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-[1.75] text-stone-600 sm:mt-7 sm:text-base sm:leading-[1.72]">
              <p>
                My background blends product strategy with a respect for craft: clear
                narratives, honest metrics, and interfaces that earn trust—especially when
                you&apos;re asking people to change how they work.
              </p>
              <p>
                I&apos;m drawn to problems where growth meets complexity: onboarding that
                compounds, AI-assisted workflows that stay explainable, and platforms that
                have to scale without losing a human voice.
              </p>
              <p className="text-stone-500">
                If you&apos;re building something ambitious in product-led growth, AI, or
                platform—and you value thoughtful execution—I&apos;d love to hear what
                you&apos;re working on.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="order-1 flex justify-center self-center px-4 sm:px-6 lg:order-2 lg:justify-end lg:px-0"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-56px" }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.08, ease }}
          >
            <div className="w-full max-w-[11.5rem] shrink-0 sm:max-w-[12.5rem] lg:max-w-[13rem]">
              <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200/90 shadow-md shadow-stone-900/5">
                <Image
                  src="/images/khushboo-dodani.png"
                  alt="Khushboo Dodani"
                  width={280}
                  height={350}
                  className="h-auto w-full object-cover object-top"
                  sizes="(min-width: 1024px) 208px, (min-width: 640px) 200px, 184px"
                  priority={false}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
