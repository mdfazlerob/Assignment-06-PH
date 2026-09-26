"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, X, CheckCircle2, Search } from "lucide-react";
import Loading from "@/components/Loading";
import SortDropdown, { sortWorkouts } from "@/components/SortDropdown";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";

const TABS = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" }
];

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const activeList = tab === "plan" ? plan : saved;

  const totals = activeList.reduce(
    (acc, w) => ({
      exercises: acc.exercises + 1,
      minutes: acc.minutes + (w.duration || 0),
      calories: acc.calories + (w.calories || 0)
    }),
    { exercises: 0, minutes: 0, calories: 0 }
  );

  const filtered = activeList.filter(
    (w) =>
      w.name.toLowerCase().includes(query.toLowerCase()) ||
      w.category.some((c) => c.toLowerCase().includes(query.toLowerCase()))
  );
  const list = sortWorkouts(filtered, sortBy);

  const handleRemove = (id) => {
    if (tab === "plan") removeFromPlan(id);
    else removeFromSaved(id);
    showToast(tab === "plan" ? "Removed from plan" : "Removed from saved");
  };

  const handleMarkDone = (id) => {
    markDone(id);
    showToast("Marked as done");
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <h1 className="font-display text-3xl uppercase tracking-wide text-white md:text-4xl">
        My Plan
      </h1>
      <p className="mt-1 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 grid grid-cols-3 divide-x divide-base-border rounded-card border border-base-border bg-base-panel">
        <Stat label="Exercises" value={totals.exercises} />
        <Stat label="Minutes" value={totals.minutes} />
        <Stat label="Calories" value={totals.calories} />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 rounded-full border border-base-border bg-base-panel p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={
                tab === t.key
                  ? "rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-black"
                  : "rounded-full px-4 py-1.5 text-xs font-semibold text-muted"
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or tag"
              className="rounded-full border border-base-border bg-base-card py-1.5 pl-8 pr-3 text-xs text-white placeholder:text-muted outline-none focus:border-accent"
            />
          </div>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <Loading label="Loading workouts…" />
        ) : list.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-3">
            {list.map((w) => (
              <PlanRow
                key={w.id}
                workout={w}
                tab={tab}
                onRemove={() => handleRemove(w.id)}
                onMarkDone={() => handleMarkDone(w.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="px-6 py-5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl text-accent">{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-base-border bg-base-panel py-20 text-center">
      <h3 className="font-display text-xl uppercase tracking-wide text-white">
        Nothing here yet
      </h3>
      <p className="max-w-xs text-sm text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-accent px-5 py-2 text-xs font-semibold text-black"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function PlanRow({ workout, tab, onRemove, onMarkDone }) {
  return (
    <div className="flex flex-col gap-4 rounded-card border border-base-border bg-base-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-base-panel">
          <Image src={workout.image} alt={workout.name} fill className="object-cover" />
        </div>
        <div>
          <p className="font-display text-sm uppercase tracking-wide text-white">
            {workout.name}
          </p>
          <p className="text-xs text-muted">{workout.equipment}</p>
          <div className="mt-1 flex items-center gap-3 text-[11px] text-muted">
            <span className="flex items-center gap-1">
              <Clock size={11} /> {workout.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Flame size={11} /> {workout.calories} kcal
            </span>
            <span className="flex items-center gap-1">
              <Star size={11} className="text-accent" /> {workout.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-base-border px-4 py-1.5 text-xs font-semibold text-white"
        >
          View Details
        </Link>
        {tab === "plan" && (
          <button
            onClick={onMarkDone}
            className={
              workout.done
                ? "flex items-center gap-1.5 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold text-accent"
                : "flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-black"
            }
          >
            <CheckCircle2 size={14} />
            {workout.done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={onRemove}
          aria-label="Remove"
          className="flex h-7 w-7 items-center justify-center rounded-full border border-base-border text-muted hover:text-white"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
