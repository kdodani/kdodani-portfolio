import type { MouseEvent as ReactMouseEvent } from "react";

/** Survives App Router transitions that drop the `#fragment` from `Link` / `router.push`. */
export const PENDING_SECTION_SCROLL_KEY = "kdodani-portfolio:pending-section-scroll";

/** When true, let the browser handle the anchor (new tab, middle click, modified clicks). */
export function shouldDeferToBrowserNavigation(e: ReactMouseEvent<HTMLElement>): boolean {
  if (e.defaultPrevented) return true;
  if (e.button !== 0) return true;
  return e.metaKey || e.ctrlKey || e.altKey || e.shiftKey;
}

export function scrollToSectionById(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  const next = `#${id}`;
  if (typeof window !== "undefined" && window.location.hash !== next) {
    window.history.replaceState(null, "", next);
  }
  return true;
}

export function scrollToHashFromLocation(): void {
  if (typeof window === "undefined") return;
  const raw = window.location.hash;
  if (!raw || raw === "#") return;
  const id = decodeURIComponent(raw.slice(1));
  if (!id) return;
  scrollToSectionById(id);
}

export function queueScrollAfterPaint(fn: () => void): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn);
  });
}

export function consumePendingSectionScroll(): string | null {
  try {
    const v = sessionStorage.getItem(PENDING_SECTION_SCROLL_KEY);
    if (v) sessionStorage.removeItem(PENDING_SECTION_SCROLL_KEY);
    return v;
  } catch {
    return null;
  }
}

export function setPendingSectionScroll(id: string): void {
  try {
    sessionStorage.setItem(PENDING_SECTION_SCROLL_KEY, id);
  } catch {
    /* quota / private mode */
  }
}
