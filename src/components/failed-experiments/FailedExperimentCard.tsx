"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { FailedExperiment } from "@/content/failed-experiments";
import { fadeUpInitial, motionDelay } from "@/lib/motion";

type Props = {
  lesson: FailedExperiment;
  index: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

function LessonField({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <p className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400">
        {label}
      </p>
      <p className="mt-2 text-[13px] leading-[1.65] text-stone-600 sm:text-[14px] sm:leading-[1.68]">
        {children}
      </p>
    </div>
  );
}

export function FailedExperimentCard({ lesson, index }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={fadeUpInitial(reduceMotion, 12)}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.42,
        delay: motionDelay(reduceMotion, index * 0.05),
        ease,
      }}
      className="h-full"
    >
      <div
        className={[
          "flex h-full flex-col rounded-2xl border border-stone-200/70 bg-white",
          "px-6 py-6 sm:px-7 sm:py-7",
          "transition-[border-color,box-shadow] duration-[250ms]",
          "hover:border-[rgba(109,94,245,0.22)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)]",
        ].join(" ")}
      >
        <h3 className="font-display text-[1.05rem] font-medium tracking-[-0.02em] text-stone-900 sm:text-[1.125rem]">
          {lesson.title}
        </h3>

        <div className="mt-5 flex flex-1 flex-col gap-5 sm:mt-6 sm:gap-5">
          <LessonField label="Original Assumption">{lesson.originalAssumption}</LessonField>
          <LessonField label="Reality">{lesson.reality}</LessonField>
          <LessonField label="Why It Happened">{lesson.whyItHappened}</LessonField>
          <div className="mt-auto border-t border-stone-200/50 pt-5">
            <div className="flex items-center gap-2">
              <span
                className="h-px w-3 shrink-0 rounded-full bg-gradient-to-r from-[#6D5EF5] to-[#4F8CFF]"
                aria-hidden
              />
              <p className="text-[10px] font-normal uppercase tracking-[0.22em] text-stone-400">
                Learning
              </p>
            </div>
            <p className="mt-2 text-[13px] leading-[1.65] text-stone-700 sm:text-[14px] sm:leading-[1.68]">
              {lesson.learning}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
