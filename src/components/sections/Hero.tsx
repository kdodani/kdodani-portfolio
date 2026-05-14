"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback } from "react";
import { Github, Linkedin, Mail } from "@/icons/lucide-social";
import { scrollToSectionById, shouldDeferToBrowserNavigation } from "@/lib/sectionScroll";
import { site } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

const iconLinkClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200/90 bg-white/80 text-stone-500 shadow-sm transition-all duration-300 hover:border-accent/25 hover:bg-white hover:text-accent hover:shadow-md active:scale-[0.97]";

const displayPairClass =
  "font-display text-[clamp(2.05rem,4.2vw+1.1rem,3.35rem)] font-medium leading-[1.06] tracking-[-0.028em]";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const onExperienceClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldDeferToBrowserNavigation(e)) return;
    if (scrollToSectionById("experience")) e.preventDefault();
  }, []);

  return (
    <section
      id="hero"
      className="scroll-mt-section relative flex min-h-[calc(100svh-4.75rem)] flex-col sm:min-h-[calc(100svh-3.25rem)]"
    >
      <div className="mx-auto flex w-full max-w-scene flex-1 flex-col justify-center px-page-x py-[clamp(2.5rem,6vh,4rem)] pb-[clamp(3rem,8vh,5rem)] pt-[clamp(0.75rem,2vh,1.25rem)] sm:pb-[clamp(3.25rem,9vh,5.5rem)]">
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
          className={`${displayPairClass} gradient-hero-text mt-1.5 max-w-[min(100%,44rem)] text-balance sm:mt-2`}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.08, ease }}
        >
          Product Manager — Growth, AI &amp; Platform.
        </motion.p>

        <motion.div
          className="mt-7 max-w-editorial space-y-4 text-[15px] leading-[1.72] text-stone-600 sm:mt-8 sm:space-y-[1.125rem] sm:text-base sm:leading-[1.7]"
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
