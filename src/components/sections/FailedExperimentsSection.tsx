"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FailedExperimentCard } from "@/components/failed-experiments/FailedExperimentCard";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { failedExperiments } from "@/content/failed-experiments";
import { fadeUpInitial } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function FailedExperimentsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionFrame id="failed-experiments" aria-labelledby="failed-experiments-heading">
      <div className="mx-auto w-full max-w-scene">
        <motion.div
          className="min-w-0 max-w-editorial"
          initial={fadeUpInitial(reduceMotion, 10)}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-56px" }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
            Reflection
          </p>
          <h2
            id="failed-experiments-heading"
            className="font-display mt-3 text-[clamp(1.85rem,2.2vw+1.1rem,2.35rem)] font-medium tracking-tight text-stone-900 sm:mt-4 lg:text-[clamp(2rem,1.8vw+1.25rem,2.5rem)]"
          >
            Failed Experiments
          </h2>
          <blockquote className="mt-4 max-w-[min(100%,42rem)] border-l-2 border-[rgba(109,94,245,0.25)] pl-4 text-[15px] leading-relaxed text-stone-600 sm:mt-5 sm:pl-5 sm:text-base sm:leading-[1.72]">
            Some of my biggest product decisions came from ideas that didn&apos;t work as expected.
            These moments changed how I think about product strategy, customer behavior, and
            building software.
          </blockquote>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-12 lg:gap-8">
          {failedExperiments.map((lesson, index) => (
            <FailedExperimentCard key={lesson.id} lesson={lesson} index={index} />
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
