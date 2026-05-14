"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback } from "react";
import { Github, Linkedin, Mail } from "@/icons/lucide-social";
import { scrollToSectionById } from "@/lib/sectionScroll";
import { site } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

const iconLinkClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200/90 bg-white/80 text-stone-500 shadow-sm transition-all duration-300 hover:border-accent/25 hover:bg-white hover:text-accent hover:shadow-md active:scale-[0.97]";

const displayPairClass =
  "font-display text-[clamp(2.15rem,7.5vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.028em]";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const onExperienceClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (scrollToSectionById("experience")) e.preventDefault();
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[min(72svh,680px)] flex-col sm:min-h-[min(76svh,760px)] lg:min-h-[min(78svh,800px)]"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-6 pb-12 pt-2 sm:px-8 sm:py-8 sm:pb-14 sm:pt-3 lg:px-10 lg:py-10 lg:pb-16 lg:pt-4">
        <motion.p
          className="text-[15px] font-normal leading-relaxed tracking-tight text-stone-500 sm:text-base"
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
        >
          Hello, I&apos;m
        </motion.p>

        <motion.p
          className={`${displayPairClass} mt-2 text-balance text-stone-900 sm:mt-2.5`}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.04, ease }}
        >
          Khushboo Dodani.
        </motion.p>

        <motion.p
          className={`${displayPairClass} gradient-hero-text mt-1.5 max-w-4xl text-balance sm:mt-2`}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.08, ease }}
        >
          Product Manager — Growth, AI &amp; Platform.
        </motion.p>

        <motion.div
          className="mt-7 max-w-2xl space-y-4 text-[15px] leading-[1.72] text-stone-600 sm:mt-8 sm:space-y-[1.125rem] sm:text-base sm:leading-[1.7]"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.12, ease }}
        >
          <p className="text-pretty">
            I design products that change user behavior at scale — combining UX, data, and
            intelligent systems.
          </p>
          <p className="text-pretty text-stone-500">
            Currently exploring opportunities in product-led companies where I can work on
            growth and intelligent systems at scale.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10"
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.16, ease }}
        >
          <a
            href="#experience"
            onClick={onExperienceClick}
            className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-mid px-6 text-sm font-medium text-white shadow-md shadow-accent/20 transition hover:from-accent-mid hover:to-accent-blue hover:shadow-lg hover:shadow-accent/25"
          >
            View experience
          </a>
          <span className="hidden h-5 w-px bg-stone-200 sm:inline-block" aria-hidden />
          <div className="flex items-center gap-1.5">
            <motion.a
              href={`mailto:${site.email}`}
              className={iconLinkClass}
              aria-label="Email"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              transition={{ duration: 0.2, ease }}
            >
              <Mail className="h-[17px] w-[17px]" strokeWidth={1.5} aria-hidden />
            </motion.a>
            <motion.a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={iconLinkClass}
              aria-label="LinkedIn"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              transition={{ duration: 0.2, ease }}
            >
              <Linkedin className="h-[17px] w-[17px]" strokeWidth={1.5} aria-hidden />
            </motion.a>
            <motion.a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className={iconLinkClass}
              aria-label="GitHub"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              transition={{ duration: 0.2, ease }}
            >
              <Github className="h-[17px] w-[17px]" strokeWidth={1.5} aria-hidden />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
