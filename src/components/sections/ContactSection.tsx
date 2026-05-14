"use client";

import type { ComponentType, SVGProps } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "@/icons/lucide-social";
import { site } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

const cardBase =
  "group flex h-full min-h-[12.5rem] flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white/80 p-5 shadow-sm transition-all duration-300 ease-out hover:border-violet-200/90 hover:bg-white hover:shadow-md motion-safe:hover:-translate-y-0.5 sm:min-h-[13.5rem] sm:p-6";

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
    <section
      id="contact"
      className="scroll-mt-24 border-t border-stone-200/80"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto min-w-0 max-w-6xl px-6 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="font-display mt-4 text-3xl font-medium tracking-tight text-stone-900 sm:mt-5 sm:text-[2rem] lg:text-4xl"
          >
            Let&apos;s connect
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-stone-600 sm:text-lg">
            Email is best for a quick hello; GitHub and LinkedIn for context on how I build
            and collaborate.
          </p>
        </motion.div>

        <ul className="mt-14 grid min-w-0 grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-3 sm:items-stretch sm:gap-5">
          {rows.map((row, index) => {
            const Icon = row.Icon;
            const body = (
              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone-200/90 bg-stone-50 text-stone-500 transition-colors duration-300 group-hover:border-violet-200 group-hover:bg-violet-50/80 group-hover:text-violet-700">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden />
                </span>
                <span className="mt-4 block text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500 sm:mt-5">
                  {row.label}
                </span>
                <span className="mt-2 min-h-0 min-w-0 flex-1 text-[14px] leading-snug text-stone-700 transition-colors [overflow-wrap:anywhere] group-hover:text-stone-900 sm:text-[15px] sm:leading-snug">
                  {row.value}
                </span>
              </div>
            );

            return (
              <motion.li
                key={row.key}
                className="flex min-h-0 min-w-0"
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
                    className={cardBase}
                  >
                    {body}
                  </a>
                ) : (
                  <a href={row.href} className={cardBase}>
                    {body}
                  </a>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
