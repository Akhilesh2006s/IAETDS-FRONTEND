import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES, formatInr } from "@/lib/marketing/services";

export const metadata = {
  title: "Services & pricing — IAETDS",
  description: "Security Defense Suite from ₹8,500/mo. Monitoring, incidents, identity, and full ops bundle.",
};

export default function ServicesPage() {
  return (
    <div className="mkt-root">
      <section className="border-b border-[var(--mkt-line)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--mkt-teal)]">
            Services
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl tracking-tight text-[var(--mkt-ink)] sm:text-5xl">
            Clear coverage. Transparent monthly pricing.
          </h1>
          <p className="mt-4 max-w-xl text-[var(--mkt-muted)]">
            Pick what you need — Security Defense Suite is our flagship at {formatInr(8500)}/month.
            Full bundle available if you want everything under one agreement.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 py-14 sm:px-8">
        {SERVICES.map((svc) => (
          <article
            key={svc.id}
            className={`grid gap-8 rounded-2xl border p-6 sm:p-8 md:grid-cols-[1.4fr_1fr] ${
              svc.featured
                ? "border-[var(--mkt-teal)] bg-[color-mix(in_oklab,var(--mkt-teal)_8%,var(--mkt-surface))]"
                : "border-[var(--mkt-line)] bg-[var(--mkt-surface)]"
            }`}
          >
            <div>
              {svc.featured && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--mkt-teal)]">
                  Recommended
                </p>
              )}
              <h2 className="font-display text-2xl text-[var(--mkt-ink)] sm:text-3xl">{svc.name}</h2>
              <p className="mt-1 text-sm font-medium text-[var(--mkt-muted)]">{svc.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--mkt-muted)]">{svc.description}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {svc.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--mkt-ink)]">
                    <Check className="mt-0.5 size-4 shrink-0 text-[var(--mkt-teal)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between border-t border-[var(--mkt-line)] pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--mkt-muted)]">Monthly</p>
                <p className="mt-1 font-display text-4xl text-[var(--mkt-ink)]">
                  {formatInr(svc.priceMonthly)}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[var(--mkt-muted)]">{svc.setupNotes}</p>
              </div>
              <Link
                href={`/get-started?service=${svc.id}`}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--mkt-ink)] px-4 py-3 text-sm font-semibold text-[var(--mkt-bg)] transition-opacity hover:opacity-90"
              >
                Add &amp; provision <ArrowRight className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
