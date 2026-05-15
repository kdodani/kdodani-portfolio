"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BuildCard } from "@/components/builds/BuildCard";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { buildEntries } from "@/content/builds";
import { fadeUpInitial } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function BuildsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionFrame id="builds" aria-labelledby="builds-heading">
      <div className="mx-auto w-full max-w-scene">
        <motion.div
          className="min-w-0 max-w-editorial"
          initial={fadeUpInitial(reduceMotion, 10)}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-56px" }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
            Practice
          </p>
          <h2
            id="builds-heading"
            className="font-display mt-3 text-[clamp(1.85rem,2.2vw+1.1rem,2.35rem)] font-medium tracking-tight text-stone-900 sm:mt-4 lg:text-[clamp(2rem,1.8vw+1.25rem,2.5rem)]"
          >
            AI Builds
          </h2>
          <p className="mt-4 max-w-[min(100%,38rem)] text-[15px] leading-relaxed text-stone-600 sm:mt-5 sm:text-base">
            Hands-on AI projects exploring workflows, automation, product systems, and modern
            tooling — built to stay close to the future of product management.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-12 lg:gap-8">
          {buildEntries.map((build, index) => (
            <BuildCard key={build.id} build={build} index={index} />
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
