import Image from "next/image";
import type { CaseStudyImage } from "@/content/case-studies/types";
import { CARD } from "./styles";

export function CaseStudyGallery({ images }: { images: CaseStudyImage[] }) {
  if (!images?.length) return null;

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {images.map((img) => (
        <figure key={img.src} className={`overflow-hidden ${CARD}`}>
          <div className="relative aspect-[16/10] bg-stone-50">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {img.caption && (
            <figcaption className="border-t border-stone-100 px-4 py-3 text-[11px] text-stone-500">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
