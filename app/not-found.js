import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-5 py-28 text-center">
      <p className="text-xs font-semibold tracking-[0.2em] text-accent">ERROR 404</p>
      <h1 className="font-display text-4xl uppercase tracking-wide text-white">
        Set not found
      </h1>
      <p className="text-sm text-muted">
        This page doesn&apos;t exist. Head back to the library and pick a lift.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-black"
      >
        Go to workouts
      </Link>
    </div>
  );
}
