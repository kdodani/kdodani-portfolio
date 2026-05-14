"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  consumePendingSectionScroll,
  queueScrollAfterPaint,
  scrollToHashFromLocation,
  scrollToSectionById,
} from "@/lib/sectionScroll";

function scrollPendingOrHash(): void {
  const pending = consumePendingSectionScroll();
  if (pending) {
    queueScrollAfterPaint(() => {
      if (scrollToSectionById(pending)) return;
      window.setTimeout(() => {
        if (scrollToSectionById(pending)) return;
        window.setTimeout(() => {
          scrollToSectionById(pending);
        }, 280);
      }, 120);
    });
    return;
  }
  scrollToHashFromLocation();
}

/**
 * App Router often skips hash scrolling after client navigations.
 * Handles `window.location.hash` and a sessionStorage fallback from {@link HomeHashLink}.
 */
export function HashScrollOnRoute() {
  const pathname = usePathname();

  useEffect(() => {
    const run = () => queueScrollAfterPaint(scrollPendingOrHash);
    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, [pathname]);

  return null;
}
