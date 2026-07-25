"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/get-started", label: "Get started" },
];

export function MarketingNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--mkt-line)] bg-[color-mix(in_oklab,var(--mkt-bg)_86%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-lg bg-[var(--mkt-ink)] text-[var(--mkt-bg)]">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" />
              <path d="M9.5 12.5l1.8 1.8 3.7-3.8" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-tight text-[var(--mkt-ink)]">IAETDS</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--mkt-muted)]">
              Defense &amp; Ops
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === l.href
                  ? "text-[var(--mkt-ink)]"
                  : "text-[var(--mkt-muted)] hover:text-[var(--mkt-ink)]",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-[var(--mkt-muted)] transition-colors hover:text-[var(--mkt-ink)]"
          >
            Sign in
          </Link>
          <Link
            href="/get-started"
            className="rounded-md bg-[var(--mkt-ink)] px-4 py-2 text-sm font-semibold text-[var(--mkt-bg)] transition-opacity hover:opacity-90"
          >
            Start provisioning
          </Link>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-md border border-[var(--mkt-line)] text-[var(--mkt-ink)] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--mkt-line)] bg-[var(--mkt-bg)] px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-[var(--mkt-ink)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-[var(--mkt-muted)]"
            >
              Sign in
            </Link>
            <Link
              href="/get-started"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-[var(--mkt-ink)] px-3 py-2.5 text-center text-sm font-semibold text-[var(--mkt-bg)]"
            >
              Start provisioning
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
