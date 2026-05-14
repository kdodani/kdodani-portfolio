"use client";

import { motion, useReducedMotion } from "framer-motion";
import { experienceEntries } from "@/content/experience";

const ease = [0.22, 1, 0.36, 1] as const;

export function ExperienceCareerSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="scroll-mt-section border-t border-stone-200/80"
      aria-labelledby="experience-career-heading"
    >
      <div className="mx-auto max-w-6xl px-6 py-section-pad sm:px-8 lg:px-10">
        <div className="min-w-0 max-w-2xl lg:max-w-xl xl:max-w-2xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-56px" }}
            transition={{ duration: 0.5, ease }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
              Career
            </p>
            <h2
              id="experience-career-heading"
              className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:mt-4 sm:text-[2rem] lg:text-4xl"
            >
              Experience
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-600 sm:text-base">
              A concise arc across regulated platforms, growth, and systems work—less
              resume-style listing, more how I think about product.
            </p>
          </motion.div>

          <ol className="mt-10 list-none space-y-0 sm:mt-12">
          {experienceEntries.map((entry, index) => (
            <motion.li
              key={`${entry.organization}-${entry.period}`}
              className="group relative border-b border-stone-200/90 py-8 last:border-b-0 last:pb-0 sm:py-10"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.05, ease }}
            >
              <div className="-mx-3 rounded-2xl px-3 py-2 transition-colors duration-300 group-hover:bg-white/70 sm:-mx-4 sm:px-4">
                <p className="text-[13px] font-normal leading-relaxed text-stone-500 sm:text-sm">
                  <span className="text-stone-600">{entry.period}</span>
                  <span className="mx-2 text-stone-400" aria-hidden>
                    ·
                  </span>
                  <span className="text-stone-700">{entry.organization}</span>
                </p>
                <h3 className="font-display mt-3 text-xl font-medium leading-snug tracking-tight text-stone-900 sm:mt-3.5 sm:text-2xl sm:leading-tight">
                  {entry.role}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.72] text-stone-600 sm:text-base sm:leading-[1.7]">
                  {entry.summary}
                </p>
                <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500">
                  {entry.listLabel}:
                </p>
                <ul className="mt-3 space-y-2.5 pl-0.5 text-[15px] leading-relaxed text-stone-600 sm:text-[15px]">
                  {entry.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        className="mt-[0.55em] h-px w-3 shrink-0 bg-emerald-400/70"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
