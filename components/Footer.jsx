import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-base-border bg-base-panel">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted md:flex-row md:px-8">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog" width={16} height={16} />
          <span className="font-display tracking-wide text-white">FITLOG</span>
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
