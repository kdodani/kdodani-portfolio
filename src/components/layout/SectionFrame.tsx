import type { ReactNode } from "react";

type SectionFrameProps = {
  id: string;
  "aria-labelledby"?: string;
  children: ReactNode;
  /** Top rule between major scenes */
  borderTop?: boolean;
  /**
   * Short editorial sections: use most of the viewport and vertically center
   * inner content on large screens (min-height is a floor; content can grow).
   */
  viewportFocus?: boolean;
  className?: string;
  innerClassName?: string;
};

/**
 * Shared outer shell: scroll anchor, horizontal rail, max width cap for ultra-wide screens.
 */
export function SectionFrame({
  id,
  "aria-labelledby": labelledBy,
  children,
  borderTop = true,
  viewportFocus = false,
  className,
  innerClassName,
}: SectionFrameProps) {
  return (
    <section
      id={id}
      {...(labelledBy ? { "aria-labelledby": labelledBy } : {})}
      className={[
        "scroll-mt-section",
        borderTop ? "border-t border-stone-200/80" : "",
        viewportFocus
          ? "flex min-h-[min(86svh,48rem)] flex-col justify-center sm:min-h-[min(88svh,52rem)] lg:min-h-[min(90svh,56rem)]"
          : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "mx-auto w-full max-w-frame px-page-x",
          viewportFocus
            ? "py-[clamp(3.25rem,7vh+1.5rem,6.25rem)]"
            : "py-section-pad",
          innerClassName ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </section>
  );
}
