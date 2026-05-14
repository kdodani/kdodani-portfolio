import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-16 text-center sm:py-20">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500 sm:text-xs">
        404
      </p>
      <h1 className="font-display mt-3 text-2xl font-medium tracking-tight text-stone-900 sm:text-3xl">
        This page does not exist.
      </h1>
      <p className="mt-3 text-sm text-stone-600">
        The link may be outdated, or the project was moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/50"
      >
        Back home
      </Link>
    </div>
  );
}
