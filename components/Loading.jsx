export default function Loading({ label = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-muted">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-base-border border-t-accent" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

