"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionFrame } from "@/components/layout/SectionFrame";

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionFrame id="about" aria-labelledby="about-heading" viewportFocus>
      <div className="mx-auto w-full max-w-scene">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
          About
        </p>

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-x-12 lg:gap-y-8 xl:gap-x-14">
          <motion.div
            className="order-2 min-w-0 lg:order-1"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-56px" }}
            transition={{ duration: 0.6, ease }}
          >
            <h2
              id="about-heading"
              className="max-w-editorial font-display text-2xl font-medium leading-snug tracking-tight text-stone-900 sm:text-3xl lg:text-[clamp(1.75rem,1.5vw+1.35rem,2rem)] lg:leading-[1.22]"
            >
              I care about how products feel, how teams decide, and how systems hold up
              when reality gets messy.
            </h2>
            <div className="mt-6 max-w-editorial space-y-4 text-[15px] leading-[1.75] text-stone-600 sm:mt-7 sm:text-base sm:leading-[1.72]">
              <p className="text-pretty">
                My background blends product strategy with a respect for craft: clear
                narratives, honest metrics, and interfaces that earn trust—especially when
                you&apos;re asking people to change how they work.
              </p>
              <p className="text-pretty">
                I&apos;m drawn to problems where growth meets complexity: onboarding that
                compounds, AI-assisted workflows that stay explainable, and platforms that
                have to scale without losing a human voice.
              </p>
              <p className="text-pretty text-stone-500">
                If you&apos;re building something ambitious in product-led growth, AI, or
                platform—and you value thoughtful execution—I&apos;d love to hear what
                you&apos;re working on.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="order-1 flex justify-center self-center px-2 sm:px-4 lg:order-2 lg:justify-end lg:px-0"
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
    </SectionFrame>
  );
}
