"use client";

import type { ComponentType, SVGProps } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { Github, Linkedin, Mail } from "@/icons/lucide-social";
import { site } from "@/content/site";
import { fadeUpInitial, motionDelay } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

const cardBase = [
  "group flex h-full w-full min-w-0 flex-col rounded-xl border border-stone-200/70 bg-white",
  "px-6 py-6 sm:px-7 sm:py-7",
  "shadow-sm transition-[border-color,box-shadow,transform,background-color] duration-300 ease-out",
  "hover:border-stone-300/90 hover:bg-white hover:shadow-[0_20px_48px_-36px_rgba(28,25,23,0.12)]",
  "motion-safe:hover:-translate-y-px",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/35",
].join(" ");

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type Row = {
  key: string;
  label: string;
  value: string;
  /** Shorter label shown in the card to avoid awkward wraps */
  displayValue?: string;
  href: string;
  external: boolean;
  Icon: IconComponent;
};

function stripUrlProtocol(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/i, "");
}

const rows: Row[] = [
  {
    key: "email",
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
    Icon: Mail,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: site.linkedin,
    displayValue: stripUrlProtocol(site.linkedin),
    href: site.linkedin,
    external: true,
    Icon: Linkedin,
  },
  {
    key: "github",
    label: "GitHub",
    value: site.github,
    displayValue: stripUrlProtocol(site.github),
    href: site.github,
    external: true,
    Icon: Github,
  },
];

export function ContactSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionFrame id="contact" aria-labelledby="contact-heading" viewportFocus>
      <motion.header
        className="mx-auto w-full max-w-frame"
        initial={fadeUpInitial(reduceMotion, 12)}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-56px" }}
        transition={{ duration: 0.55, ease }}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
          Contact
        </p>
        <h2
          id="contact-heading"
          className="font-display mt-3 text-[clamp(1.85rem,2.2vw+1.1rem,2.35rem)] font-medium tracking-tight text-stone-900 sm:mt-4 lg:text-[clamp(2rem,1.8vw+1.25rem,2.5rem)]"
        >
          Let&apos;s connect
        </h2>
        <p className="mt-4 max-w-[min(100%,38rem)] text-[15px] leading-[1.72] text-stone-600 sm:mt-5 sm:text-base sm:leading-[1.7]">
          Looking forward to interesting conversations about product, technology, and
          building meaningful experiences. Feel free to say hello.
        </p>
      </motion.header>

      <ul
        className="mx-auto mt-10 grid w-full max-w-frame auto-rows-fr grid-cols-1 items-stretch gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 md:gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-6"
        aria-label="Contact methods"
      >
        {rows.map((row, index) => {
          const Icon = row.Icon;
          const shownValue = row.displayValue ?? row.value;
          const ariaLabel = row.external
            ? `${row.label}: ${shownValue} (opens in a new tab)`
            : `${row.label}: ${row.value}`;

          return (
            <motion.li
              key={row.key}
              className="flex min-h-0 min-w-0"
              initial={fadeUpInitial(reduceMotion, 14)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: motionDelay(reduceMotion, index * 0.06), ease }}
            >
              <a
                href={row.href}
                aria-label={ariaLabel}
                title={row.value}
                {...(row.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={cardBase}
              >
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone-200/90 bg-stone-50 text-stone-500 transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent/8 group-hover:text-accent"
                  aria-hidden
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                </span>
                <span className="mt-5 block text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500">
                  {row.label}
                </span>
                <span className="mt-2 min-w-0 flex-1 truncate text-[14px] leading-snug text-stone-700 transition-colors group-hover:text-stone-900 sm:text-[15px]">
                  {shownValue}
                </span>
                {row.external ? (
                  <span className="sr-only"> (opens in a new tab)</span>
                ) : null}
              </a>
            </motion.li>
          );
        })}
      </ul>
    </SectionFrame>
  );
}
