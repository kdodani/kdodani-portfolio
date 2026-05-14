"use client";

import type { ComponentType, SVGProps } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { Github, Linkedin, Mail } from "@/icons/lucide-social";
import { site } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

const cardBase =
  "group flex h-full min-h-[11.5rem] flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white/80 p-5 shadow-sm transition-all duration-300 ease-out hover:border-accent/25 hover:bg-white hover:shadow-md motion-safe:hover:-translate-y-0.5 sm:min-h-[12.5rem] sm:p-6";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type Row = {
  key: string;
  label: string;
  value: string;
  href: string;
  external: boolean;
  Icon: IconComponent;
};

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
    key: "github",
    label: "GitHub",
    value: site.github,
    href: site.github,
    external: true,
    Icon: Github,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: site.linkedin,
    href: site.linkedin,
    external: true,
    Icon: Linkedin,
  },
];

export function ContactSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionFrame id="contact" aria-labelledby="contact-heading" viewportFocus>
      <div className="mx-auto flex w-full max-w-frame flex-col items-stretch">
        <motion.div
          className="max-w-editorial"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
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
          <p className="mt-4 max-w-editorial text-[15px] leading-relaxed text-stone-600 sm:text-base">
            Email is best for a quick hello; GitHub and LinkedIn for context on how I build
            and collaborate.
          </p>
        </motion.div>

        <ul className="mx-auto mt-10 grid w-full max-w-[min(100%,52rem)] grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
          {rows.map((row, index) => {
            const Icon = row.Icon;
            const body = (
              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone-200/90 bg-stone-50 text-stone-500 transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent/8 group-hover:text-accent">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden />
                </span>
                <span className="mt-4 block text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500 sm:mt-5">
                  {row.label}
                </span>
                <span className="mt-2 min-h-0 min-w-0 flex-1 break-words text-[14px] leading-snug text-stone-700 transition-colors [overflow-wrap:anywhere] group-hover:text-stone-900 sm:text-[15px] sm:leading-snug">
                  {row.value}
                </span>
              </div>
            );

            return (
              <motion.li
                key={row.key}
                className="min-w-0"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.06, ease }}
              >
                {row.external ? (
                  <a
                    href={row.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardBase} h-full w-full min-w-0 max-w-full`}
                  >
                    {body}
                  </a>
                ) : (
                  <a href={row.href} className={`${cardBase} h-full w-full min-w-0 max-w-full`}>
                    {body}
                  </a>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </SectionFrame>
  );
}
