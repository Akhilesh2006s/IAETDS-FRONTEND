import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-[var(--mkt-line)] bg-[var(--mkt-ink)] text-[var(--mkt-bg)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl tracking-tight">IAETDS</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
            Intelligent Architecture for Enterprise Technology Defense &amp; Sustainability —
            security, monitoring, and operations under one command surface.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Product</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><Link href="/services" className="hover:text-white">Services &amp; pricing</Link></li>
            <li><Link href="/get-started" className="hover:text-white">Provisioning</Link></li>
            <li><Link href="/login" className="hover:text-white">Console sign-in</Link></li>
            <li><Link href="/console" className="hover:text-white">Operations console</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Coverage</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>Security Defense from ₹8,500/mo</li>
            <li>Infrastructure monitoring</li>
            <li>Incident &amp; maintenance ops</li>
            <li>Identity governance</li>
            <li><a href="mailto:info@iaetds.com" className="hover:text-white">info@iaetds.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} IAETDS. All rights reserved.</span>
          <span>Credentials are used for agent install only · TLS in transit</span>
        </div>
      </div>
    </footer>
  );
}
