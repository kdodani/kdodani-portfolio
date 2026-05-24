"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { fadeUpInitial, motionDelay } from "@/lib/motion";

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
            initial={fadeUpInitial(reduceMotion, 16)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-56px" }}
            transition={{ duration: 0.6, ease }}
          >
            <h2
              id="about-heading"
              className="max-w-editorial font-display text-2xl font-medium leading-snug tracking-tight text-stone-900 sm:text-3xl lg:text-[clamp(1.75rem,1.5vw+1.35rem,2rem)] lg:leading-[1.22]"
            >
              I&apos;m a Product Manager focused on building intelligent systems that
              improve how people work, decide, and interact with complex products.
            </h2>
            <div className="mt-6 max-w-editorial space-y-4 text-[15px] leading-[1.75] text-stone-600 sm:mt-7 sm:text-base sm:leading-[1.72]">
              <p className="text-pretty">
                My background spans marketing, analytics, UX research, and product
                management — which has shaped how I approach product development:
                understanding user behavior deeply, simplifying operational complexity, and
                designing systems that scale.
              </p>
              <p className="text-pretty">
                Over the past few years, I&apos;ve led platform migrations, digital
                adoption initiatives, API integration strategies, and AI-powered workflow
                experiments across healthcare and public-sector environments. Increasingly,
                I&apos;m interested in how AI-native products and agentic workflows can
                reshape operational software, decision support, and user experience.
              </p>
              <p className="text-pretty text-stone-500">
                I&apos;m especially drawn to product teams working on platforms, workflow
                tools, infrastructure, and AI-enabled systems where product, technology,
                and human behavior intersect.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="order-1 flex justify-center self-center px-2 sm:px-4 lg:order-2 lg:justify-end lg:px-0"
            initial={fadeUpInitial(reduceMotion, 14)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-56px" }}
            transition={{ duration: 0.6, delay: motionDelay(reduceMotion, 0.08), ease }}
          >
            <div className="w-full max-w-[10.5rem] shrink-0 sm:max-w-[11.5rem] lg:max-w-[12rem]">
              <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200/70 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
                <Image
                  src="/images/khushboo-dodani.png"
                  alt="Khushboo Dodani"
                  width={280}
                  height={350}
                  className="h-auto w-full object-cover object-center"
                  sizes="(min-width: 1024px) 192px, (min-width: 640px) 184px, 168px"
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
