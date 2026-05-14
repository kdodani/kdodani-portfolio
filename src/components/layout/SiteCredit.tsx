export function SiteCredit() {
  return (
    <footer className="border-t border-stone-200/60 py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-xl px-6 text-center sm:max-w-2xl lg:max-w-3xl lg:px-10">
        <p className="text-[12px] font-normal leading-[1.65] text-stone-500 sm:text-[13px] sm:leading-relaxed">
          Built &amp; designed as an exploration of AI-assisted product development, rapid
          iteration, and systems thinking.
        </p>
        <p className="mt-3 text-[11px] font-normal leading-[1.65] text-stone-400 sm:mt-3.5 sm:text-[12px] sm:leading-relaxed">
          By Khushboo Dodani with Cursor, ChatGPT, Next.js, React, Tailwind CSS, and Vercel.
        </p>
      </div>
    </footer>
  );
}
