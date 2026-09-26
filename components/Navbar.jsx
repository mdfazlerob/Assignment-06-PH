"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const LINKS = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" }
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-base-border bg-base/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog" width={24} height={24} priority />
          <span className="font-display text-lg tracking-wide text-white">FITLOG</span>
        </Link>

        <div className="flex items-center gap-5 md:gap-8">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "text-sm font-medium text-accent"
                    : "text-sm font-medium text-muted transition-colors hover:text-white"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-black"
          >
            Plan <span>{plan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-base-border px-3 py-1 text-xs font-semibold text-white"
          >
            Saved <span>{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
