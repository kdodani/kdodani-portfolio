"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { site } from "@/content/site";
import { HomeHashLink } from "@/components/layout/HomeHashLink";

const SECTION_IDS = ["about", "experience", "builds", "contact"] as const;

type NavItem =
  | { kind: "section"; id: string; label: string; variant?: "default" }
  | { kind: "file"; href: string; label: string; variant: "resume" };

const nav: NavItem[] = [
  { kind: "section", id: "about", label: "About" },
  { kind: "section", id: "experience", label: "Experience" },
  { kind: "section", id: "builds", label: "AI Builds" },
  { kind: "section", id: "contact", label: "Contact" },
  { kind: "file", href: site.resumePdf, label: "Resume", variant: "resume" },
];

function baseNavClass(variant?: "default" | "resume") {
  if (variant === "resume") {
    return "shrink-0 rounded-full border border-accent/20 bg-gradient-to-r from-accent/[0.07] to-accent-mid/[0.08] px-3.5 py-2 text-[13px] font-medium tracking-tight text-accent-strong shadow-sm transition-all duration-200 hover:border-accent/35 hover:from-accent/[0.11] hover:to-accent-mid/[0.12] hover:shadow-md";
  }
  return "shrink-0 rounded-md px-2.5 py-2 text-[13px] font-medium tracking-tight text-stone-600 transition-colors duration-200 hover:bg-stone-100/90 hover:text-stone-900";
}

function sectionNavClass(id: string, activeId: string) {
  const base = baseNavClass();
  if (activeId === id) {
    return `${base} bg-white/90 text-stone-900 shadow-sm ring-1 ring-stone-200/80`;
  }
  return base;
}

function NavItemControl({
  item,
  activeId,
}: {
  item: NavItem;
  activeId: string;
}) {
  if (item.kind === "section") {
    return (
      <HomeHashLink sectionId={item.id} className={sectionNavClass(item.id, activeId)}>
        {item.label}
      </HomeHashLink>
    );
  }
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={baseNavClass("resume")}
    >
      {item.label}
    </a>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState("");

  const updateActive = useCallback(() => {
    if (pathname !== "/") {
      setActiveId("");
      return;
    }
    const marker = window.scrollY + Math.min(window.innerHeight * 0.12, 96);
    let current = "";
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.offsetTop <= marker) current = id;
    }
    setActiveId(current);
  }, [pathname]);

  useEffect(() => {
    updateActive();
    if (pathname !== "/") return;
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [pathname, updateActive]);

  return (
    <header className="sticky top-0 z-50 isolate border-b border-stone-200/70 bg-[#faf9f6]/85 backdrop-blur-xl">
      <div className="mx-auto flex min-h-14 max-w-frame flex-wrap items-center justify-between gap-x-4 gap-y-2 px-page-x py-2.5 sm:h-[3.25rem] sm:flex-nowrap sm:py-0">
        <Link
          href="/"
          className="font-display shrink-0 text-[15px] font-medium tracking-tight text-stone-900 transition-colors hover:text-accent"
        >
          KD
        </Link>

        <nav
          className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-0.5 gap-y-1 sm:flex-nowrap sm:gap-1"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <NavItemControl key={item.label} item={item} activeId={activeId} />
          ))}
        </nav>
      </div>
    </header>
  );
}
