"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { PlusCircle, Bookmark, BookmarkCheck, CheckCircle2 } from "lucide-react";
import Loading from "@/components/Loading";
import { fetchWorkoutById } from "@/data/workouts";
import { usePlan, PLAN_CAP } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";

const SPEC_ROWS = [
  { key: "equipment", label: "Equipment" },
  { key: "difficulty", label: "Difficulty" },
  { key: "sets", label: "Sets" },
  { key: "reps", label: "Reps" },
  { key: "duration", label: "Duration", suffix: " min" },
  { key: "calories", label: "Calories", suffix: " kcal" },
  { key: "rating", label: "Rating" }
];

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(undefined);
  const { addToPlan, addToSaved, isInPlan, isSaved, isPlanFull } = usePlan();
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    fetchWorkoutById(id).then((data) => {
      if (active) setWorkout(data);
    });
    return () => {
      active = false;
    };
  }, [id]);

  if (workout === undefined) return <Loading label="Loading workout…" />;
  if (workout === null) notFound();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const planFull = isPlanFull();

  const handleAddToPlan = () => {
    if (inPlan || planFull) return;
    addToPlan(workout);
    showToast("Added to today's plan");
  };

  const handleSave = () => {
    if (saved) return;
    addToSaved(workout);
    showToast("Saved for later");
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative h-72 w-full overflow-hidden rounded-card border border-base-border bg-base-panel md:h-full md:min-h-[420px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="font-display text-3xl uppercase tracking-wide text-white md:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {workout.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.category.map((c) => (
              <span
                key={c}
                className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-black"
              >
                {c}
              </span>
            ))}
          </div>

          <dl className="mt-6 divide-y divide-base-border rounded-card border border-base-border bg-base-card">
            {SPEC_ROWS.map((row) => (
              <div key={row.key} className="flex items-center justify-between px-4 py-2.5">
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                  {row.label}
                </dt>
                <dd className="text-sm font-medium text-white">
                  {workout[row.key]}
                  {row.suffix || ""}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              Instructions
            </h2>
            <ol className="mt-3 space-y-2.5">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-base-panel text-[11px] font-semibold text-accent">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={handleAddToPlan}
              disabled={inPlan || planFull}
              className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              {inPlan ? <CheckCircle2 size={16} /> : <PlusCircle size={16} />}
              {inPlan
                ? "In today's plan"
                : planFull
                ? `Plan full (${PLAN_CAP})`
                : "Add to today's plan"}
            </button>
            <button
              onClick={handleSave}
              disabled={saved}
              className="flex items-center gap-2 rounded-full border border-base-border px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              {saved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
