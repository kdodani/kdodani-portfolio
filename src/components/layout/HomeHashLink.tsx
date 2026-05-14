"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  scrollToSectionById,
  setPendingSectionScroll,
  shouldDeferToBrowserNavigation,
} from "@/lib/sectionScroll";

type Props = {
  sectionId: string;
  className?: string;
  children: React.ReactNode;
};

/** In-page `#id` on `/`; other routes use sessionStorage + `router.push("/#id")` so the fragment survives client navigation. */
export function HomeHashLink({ sectionId, className, children }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const onHomeClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname !== "/") return;
      if (shouldDeferToBrowserNavigation(e)) return;
      if (scrollToSectionById(sectionId)) e.preventDefault();
    },
    [pathname, sectionId],
  );

  const onAwayClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (shouldDeferToBrowserNavigation(e)) return;
      e.preventDefault();
      setPendingSectionScroll(sectionId);
      router.push(`/#${sectionId}`);
    },
    [router, sectionId],
  );

  if (pathname === "/") {
    return (
      <a href={`#${sectionId}`} className={className} onClick={onHomeClick}>
        {children}
      </a>
    );
  }

  return (
    <a href={`/#${sectionId}`} className={className} onClick={onAwayClick}>
      {children}
    </a>
  );
}
