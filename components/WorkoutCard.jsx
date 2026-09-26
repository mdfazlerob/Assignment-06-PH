import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-card border border-base-border bg-base-card transition-colors hover:border-accent/60"
    >
      <div className="relative h-44 w-full bg-base-panel">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.category.map((c) => (
            <span
              key={c}
              className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-black"
            >
              {c}
            </span>
          ))}
        </div>
        <h3 className="font-display text-base uppercase tracking-wide text-white">
          {workout.name}
        </h3>
        <p className="mt-1 text-xs text-muted">{workout.equipment}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Clock size={13} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={13} /> {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} className="text-accent" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
