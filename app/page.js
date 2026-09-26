"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import Loading from "@/components/Loading";
import SortDropdown, { sortWorkouts } from "@/components/SortDropdown";
import { fetchWorkouts } from "@/data/workouts";
import { Search } from "lucide-react";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    fetchWorkouts().then((data) => {
      if (active) {
        setWorkouts(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = workouts.filter(
    (w) =>
      w.name.toLowerCase().includes(query.toLowerCase()) ||
      w.category.some((c) => c.toLowerCase().includes(query.toLowerCase()))
  );
  const sorted = sortWorkouts(filtered, sortBy);

  return (
    <>
      <Hero />

      <section id="library" className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl uppercase tracking-wide text-white">
              The Library
            </h2>
            <p className="mt-1 text-sm text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          {!loading && (
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
          )}
        </div>

        {loading ? (
          <Loading label="Loading workouts…" />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
