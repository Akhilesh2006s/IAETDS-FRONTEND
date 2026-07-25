import Link from "next/link";
import { ArrowRight, ShieldCheck, Activity, KeyRound, Server } from "lucide-react";
import { formatInr } from "@/lib/marketing/services";

export default function HomePage() {
  return (
    <>
      {/* Hero — one composition */}
      <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden">
        <div className="mkt-hero-atmosphere absolute inset-0" aria-hidden />
        <div className="mkt-hero-grid absolute inset-0 opacity-40" aria-hidden />

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-end px-5 pb-16 pt-20 sm:px-8 sm:pb-20 lg:justify-center lg:pb-24">
          <div className="max-w-2xl">
            <p className="font-display text-5xl leading-[0.95] tracking-tight text-[var(--mkt-ink)] sm:text-6xl md:text-7xl">
              IAETDS
            </p>
            <h1 className="mt-5 max-w-xl font-display text-2xl leading-snug tracking-tight text-[var(--mkt-ink)] sm:text-3xl">
              Enterprise defense &amp; operations — provisioned on your stack.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--mkt-muted)] sm:text-lg">
              Security from {formatInr(8500)}/mo. We connect to your domain, APIs, and hosts — then run the command center.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--mkt-ink)] px-5 py-3 text-sm font-semibold text-[var(--mkt-bg)] transition-opacity hover:opacity-90"
              >
                Start provisioning <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--mkt-line-strong)] bg-[var(--mkt-surface)] px-5 py-3 text-sm font-semibold text-[var(--mkt-ink)] transition-colors hover:border-[var(--mkt-ink)]"
              >
                View services
              </Link>
            </div>
          </div>
        </div>

        {/* Dominant edge-to-edge visual plane */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] lg:block"
          aria-hidden
        >
          <div className="mkt-hero-panel absolute inset-0" />
          <div className="absolute inset-0 flex flex-col justify-end p-10">
            <div className="mkt-hero-scanline space-y-3 font-mono text-[11px] text-[var(--mkt-teal)]/90">
              <p>▸ domain.verify  acme.corp</p>
              <p>▸ api.probe      https://api.acme.corp/v1</p>
              <p>▸ ssh.agent      root@10.0.4.12:22</p>
              <p>▸ security.suite active · {formatInr(8500)}/mo</p>
              <p className="text-[var(--mkt-ink)]/70">provisioning queue · EST 2–4 hrs</p>
            </div>
          </div>
        </div>
      </section>

      {/* What we take / how it works */}
      <section className="border-t border-[var(--mkt-line)] bg-[var(--mkt-surface)]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--mkt-teal)]">
            How provisioning works
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl tracking-tight text-[var(--mkt-ink)] sm:text-4xl">
            You choose the service. We wire into your environment.
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--mkt-muted)]">
            Share your domain, backend URLs, and host credentials once. We install read-scoped agents, verify reachability, and open your console.
          </p>

          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Select coverage",
                body: "Security Defense Suite starts at ₹8,500/mo — or add monitoring, incidents, and identity.",
              },
              {
                n: "02",
                title: "Connect infrastructure",
                body: "Primary domain, API base URLs, SSH hosts with root or deploy user — encrypted in transit.",
              },
              {
                n: "03",
                title: "Go live in console",
                body: "Provisioning reference issued. Sign in to the operations console when agents report healthy.",
              },
            ].map((step) => (
              <li key={step.n} className="relative">
                <span className="font-display text-4xl text-[var(--mkt-ink)]/12">{step.n}</span>
                <h3 className="mt-2 font-display text-xl text-[var(--mkt-ink)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--mkt-muted)]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Offer strip */}
      <section className="border-t border-[var(--mkt-line)]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--mkt-teal)]">
                What we offer
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-[var(--mkt-ink)] sm:text-4xl">
                Production services, priced clearly.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--mkt-ink)] underline-offset-4 hover:underline"
            >
              Full catalog <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Security Defense",
                price: formatInr(8500),
                line: "Threats, CVEs, compliance posture",
              },
              {
                icon: Activity,
                title: "Monitoring",
                price: formatInr(4500),
                line: "Health, latency, uptime alerts",
              },
              {
                icon: Server,
                title: "Incident Ops",
                price: formatInr(6200),
                line: "Response, patches, work orders",
              },
              {
                icon: KeyRound,
                title: "Identity",
                price: formatInr(5900),
                line: "MFA posture, access governance",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-[var(--mkt-ink)] pt-5">
                <item.icon className="size-5 text-[var(--mkt-teal)]" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-lg text-[var(--mkt-ink)]">{item.title}</h3>
                <p className="mt-1 text-sm text-[var(--mkt-muted)]">{item.line}</p>
                <p className="mt-4 text-sm font-semibold text-[var(--mkt-ink)]">
                  {item.price}
                  <span className="font-normal text-[var(--mkt-muted)]"> / mo</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--mkt-line)] bg-[var(--mkt-ink)] text-[var(--mkt-bg)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-lg">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              Ready to connect your estate?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Takes about 8 minutes. You’ll leave with a provisioning reference and a clear monthly total.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--mkt-teal)] px-5 py-3 text-sm font-semibold text-[var(--mkt-ink)] transition-opacity hover:opacity-90"
            >
              Get started <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50"
            >
              Sign in to console
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
