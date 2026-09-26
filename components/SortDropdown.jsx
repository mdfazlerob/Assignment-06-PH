"use client";

import { ChevronDown } from "lucide-react";

const OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" }
];

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <label className="mr-2 text-xs text-muted">Sort by</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none rounded-full border border-base-border bg-base-card py-1.5 pl-3 pr-8 text-xs font-medium text-white outline-none focus:border-accent"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    </div>
  );
}

export function sortWorkouts(list, sortBy) {
  const sorted = [...list];
  sorted.sort((a, b) => (b[sortBy] ?? 0) - (a[sortBy] ?? 0));
  return sorted;
}
