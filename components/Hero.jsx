import Image from "next/image";
import { PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-10 pt-12 md:px-8 md:pt-16">
      <div className="grid grid-cols-1 items-center gap-10 rounded-card border border-base-border bg-base-panel p-8 md:grid-cols-2 md:p-14">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-accent">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight text-white md:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-lg
 text-white md:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            BROWSE WORKOUTS
          </a>
        </div>
        <div className="relative mx-auto h-64 w-full max-w-sm md:h-80">
          <Image
            src="/banner.png"
            alt="Athlete training"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
