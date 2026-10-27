import { CARD } from "./styles";

export function PMJudgmentCallout({ text }: { text: string }) {
  return (
    <aside
      className={`my-5 border-[rgba(109,94,245,0.16)] bg-[rgba(109,94,245,0.04)] ${CARD} px-5 py-4 print:break-inside-avoid`}
      aria-label="Product judgment"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
        Product Judgment
      </p>
      <p className="mt-2 text-[13px] leading-[1.65] text-stone-700 sm:text-[14px]">
        &ldquo;{text}&rdquo;
      </p>
    </aside>
  );
}
