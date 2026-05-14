"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback } from "react";
import { Github, Linkedin, Mail } from "@/icons/lucide-social";
import { scrollToSectionById, shouldDeferToBrowserNavigation } from "@/lib/sectionScroll";
import { site } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

const iconLinkClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300/90 bg-white text-stone-500 shadow-sm transition-colors duration-200 hover:border-stone-400 hover:bg-stone-50 hover:text-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/40";

const nameClass =
  "font-display text-[clamp(1.85rem,3.8vw+0.95rem,3.15rem)] font-medium leading-[1.08] tracking-[-0.028em] text-stone-900";

const roleLeadClass =
  "font-display text-[clamp(1.05rem,1.2vw+0.78rem,1.4rem)] font-medium leading-snug tracking-[-0.018em] text-stone-900 sm:text-[clamp(1.1rem,0.95vw+0.82rem,1.45rem)] sm:leading-[1.38]";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const onExperienceClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldDeferToBrowserNavigation(e)) return;
    if (scrollToSectionById("experience")) e.preventDefault();
  }, []);

  return (
    <section
      id="hero"
      className="scroll-mt-section relative isolate flex min-h-[calc(100svh-4.75rem)] flex-col overflow-hidden bg-[#faf9f6] text-stone-900 sm:min-h-[calc(100svh-3.25rem)]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_50%_at_50%_-18%,rgb(var(--accent-hero-2)/0.08),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-mesh-light opacity-[0.28]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-stone-200/90 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-scene flex-1 flex-col justify-center px-page-x py-[clamp(2.75rem,7vh,4.5rem)] pb-[clamp(3.25rem,9vh,5.75rem)] pt-[clamp(1rem,3vh,1.75rem)] sm:pb-[clamp(3.5rem,10vh,6rem)]">
        <p className="text-[13px] font-medium tracking-tight text-stone-500 sm:text-sm">
          Hi, my name is
        </p>

        <h1 className="mt-2 max-w-[min(100%,48rem)] text-balance">
          <motion.span
            className={`${nameClass} block`}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            Khushboo Dodani.
          </motion.span>
          <motion.span
            className={`${roleLeadClass} mt-3 block max-w-[min(100%,44rem)] text-pretty sm:mt-3.5`}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: reduceMotion ? 0 : 0.05, ease }}
          >
            <span className="block sm:inline sm:whitespace-nowrap">Product Manager —</span>{" "}
            <span className="gradient-hero-text block sm:inline-block">
              Building Growth Through UX, Platforms &amp; AI-Native Workflows
            </span>
          </motion.span>
        </h1>

        <motion.div
          className="mt-8 max-w-editorial space-y-4 text-[15px] leading-[1.72] text-stone-600 sm:mt-10 sm:space-y-[1.125rem] sm:text-base sm:leading-[1.7]"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.1, ease }}
        >
          <p className="text-pretty">
            With a background in marketing, UX research, and analytics, my work spans building
            intelligent workflows that improve adoption, reduce friction, and support better
            decision-making across complex systems.
          </p>
          <p className="text-pretty text-stone-600/90">
            Currently exploring opportunities in product-led companies where I can work on growth
            and intelligent systems at scale.
          </p>
        </motion.div>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3 sm:mt-11"
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.14, ease }}
        >
          <a
            href="#experience"
            onClick={onExperienceClick}
            className="inline-flex h-10 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium tracking-tight text-white shadow-sm transition-colors duration-200 hover:bg-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/50"
          >
            View experience
          </a>
          <span className="hidden h-5 w-px bg-stone-200 sm:inline-block" aria-hidden />
          <div className="flex items-center gap-1.5">
            <motion.a
              href={`mailto:${site.email}`}
              className={iconLinkClass}
              aria-label="Email"
              whileHover={reduceMotion ? undefined : { y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
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
              whileHover={reduceMotion ? undefined : { y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
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
              whileHover={reduceMotion ? undefined : { y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
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
