"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHashTarget() {
  if (typeof window === "undefined") return;
  const raw = window.location.hash;
  if (!raw || raw === "#") return;
  const id = decodeURIComponent(raw.slice(1));
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

/**
 * App Router client navigations to `/#section` often skip native hash scrolling.
 * Re-run after route changes (and on hashchange) once the new tree has painted.
 */
export function HashScrollOnRoute() {
  const pathname = usePathname();

  useEffect(() => {
    const run = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToHashTarget);
      });
    };
    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, [pathname]);

  return null;
}
