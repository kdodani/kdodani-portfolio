"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BuildCard } from "@/components/builds/BuildCard";
import { buildEntries } from "@/content/builds";

const ease = [0.22, 1, 0.36, 1] as const;

export function BuildsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="builds"
      className="scroll-mt-section border-t border-stone-200/80"
      aria-labelledby="builds-heading"
    >
      <div className="mx-auto max-w-6xl px-6 py-section-pad sm:px-8 lg:px-10">
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-56px" }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-indigo-600/90 sm:text-xs">
            Builds
          </p>
          <h2
            id="builds-heading"
            className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:mt-4 sm:text-[2rem] lg:text-4xl"
          >
            Experiments outside the roadmap.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 sm:mt-5 sm:text-lg">
            Side projects, AI prototypes, and technical play—where I chase curiosity, try
            new stacks, and keep my hands dirty away from core PM delivery.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-2 lg:gap-6">
          {buildEntries.map((build, index) => (
            <BuildCard key={build.id} build={build} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
