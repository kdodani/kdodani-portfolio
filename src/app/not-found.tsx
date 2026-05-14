import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-16 text-center sm:py-20">
      <p className="text-xs font-medium uppercase tracking-widest text-stone-500">404</p>
      <h1 className="font-display mt-3 text-2xl font-medium text-stone-900 sm:text-3xl">
        This page does not exist.
      </h1>
      <p className="mt-3 text-sm text-stone-600">
        The link may be outdated, or the project was moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white shadow-md transition hover:bg-stone-800"
      >
        Back home
      </Link>
    </div>
  );
}
