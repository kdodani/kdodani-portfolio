"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

type Props = {
  sectionId: string;
  className?: string;
  children: React.ReactNode;
};

function scrollToSection(id: string) {
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

/** Same-page `#id` on `/`, full `/#id` elsewhere so Next + browser scroll behave reliably. */
export function HomeHashLink({ sectionId, className, children }: Props) {
  const pathname = usePathname();

  const onHomeClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname !== "/") return;
      if (scrollToSection(sectionId)) e.preventDefault();
    },
    [pathname, sectionId],
  );

  if (pathname === "/") {
    return (
      <a href={`#${sectionId}`} className={className} onClick={onHomeClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/#${sectionId}`} className={className} scroll={false}>
      {children}
    </Link>
  );
}
