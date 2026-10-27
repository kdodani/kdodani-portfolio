"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Artifact } from "@/content/intake-specialist";

type Props = {
  artifact: Artifact;
  sizes?: string;
  /** Hide the title/caption under the image */
  bare?: boolean;
  className?: string;
};

/** An artifact image with a caption; click to enlarge in a lightbox. */
export function ZoomFigure({ artifact: a, sizes = "(min-width: 1024px) 24rem, 100vw", bare, className }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <figure className={className}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Enlarge: ${a.title}`}
          className="group block w-full cursor-zoom-in overflow-hidden rounded-xl border border-stone-200/70 bg-stone-50 text-left transition-[border-color,box-shadow] duration-[250ms] hover:border-[rgba(109,94,245,0.3)] hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.14)]"
        >
          <Image src={a.src} alt={a.alt} width={a.width} height={a.height} sizes={sizes} className="h-auto w-full" />
        </button>
        {bare ? null : (
          <figcaption className="mt-2.5 px-0.5">
            <p className="text-[13px] font-medium leading-snug text-stone-800">{a.title}</p>
            <p className="mt-0.5 text-[12px] leading-[1.55] text-stone-500">{a.caption}</p>
          </figcaption>
        )}
      </figure>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={a.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setOpen(false)}
        >
          <div className="flex max-h-full w-full max-w-5xl flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-4 pb-3 text-white">
              <p className="text-[13px] font-medium">{a.title}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-white/15 px-3 py-1 text-[13px] text-white hover:bg-white/25"
              >
                Close
              </button>
            </div>
            <div className="min-h-0 overflow-auto rounded-xl bg-white">
              <Image
                src={a.src}
                alt={a.alt}
                width={a.width}
                height={a.height}
                sizes="100vw"
                className="mx-auto h-auto max-h-[78vh] w-auto max-w-full object-contain"
              />
            </div>
            <p className="pt-3 text-[12px] leading-[1.55] text-white/70">{a.caption}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
