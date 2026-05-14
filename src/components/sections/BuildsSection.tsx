"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BuildCard } from "@/components/builds/BuildCard";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { buildEntries } from "@/content/builds";

const ease = [0.22, 1, 0.36, 1] as const;

export function BuildsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionFrame id="builds" aria-labelledby="builds-heading">
      <motion.div
        className="max-w-editorial"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-56px" }}
        transition={{ duration: 0.5, ease }}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
          Builds
        </p>
        <h2
          id="builds-heading"
          className="font-display mt-3 text-[clamp(1.85rem,2.2vw+1.1rem,2.35rem)] font-medium tracking-tight text-stone-900 sm:mt-4 lg:text-[clamp(2rem,1.8vw+1.25rem,2.5rem)]"
        >
          Experiments outside the roadmap.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-stone-600 sm:mt-5 sm:text-base">
          Side projects, AI prototypes, and technical play—where I chase curiosity, try
          new stacks, and keep my hands dirty away from core PM delivery.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:gap-6">
        {buildEntries.map((build, index) => (
          <BuildCard key={build.id} build={build} index={index} />
        ))}
      </div>
    </SectionFrame>
  );
}
