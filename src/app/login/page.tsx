"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useLogin } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth";
import { apiError } from "@/lib/api";

const DEMO_ACCOUNTS = [
  { role: "Admin", email: "admin@iaetds.io" },
  { role: "Analyst", email: "analyst@iaetds.io" },
  { role: "Engineer", email: "engineer@iaetds.io" },
  { role: "Manager", email: "manager@iaetds.io" },
  { role: "Viewer", email: "viewer@iaetds.io" },
];

export default function LoginPage() {
  const router = useRouter();
  const login = useLogin();
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const [showPw, setShowPw] = React.useState(false);

  React.useEffect(() => {
    if (hydrated && user) router.replace("/console");
  }, [hydrated, user, router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login.mutateAsync({ email, password, remember });
      toast.success("Welcome back", { description: "Opening operations console…" });
    } catch (err) {
      toast.error("Sign-in failed", { description: apiError(err) });
    }
  };

  return (
    <div className="mkt-root relative min-h-screen">
      <div className="mkt-hero-atmosphere absolute inset-0" aria-hidden />
      <div className="mkt-hero-grid absolute inset-0 opacity-30" aria-hidden />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-12 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div className="mb-10 hidden flex-col justify-center lg:mb-0 lg:flex">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--mkt-muted)] hover:text-[var(--mkt-ink)]">
            <ArrowLeft className="size-4" /> Back to IAETDS
          </Link>
          <p className="mt-10 font-display text-5xl tracking-tight text-[var(--mkt-ink)]">IAETDS</p>
          <h1 className="mt-4 max-w-md font-display text-2xl leading-snug text-[var(--mkt-ink)]">
            Sign in to your operations console.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--mkt-muted)]">
            Security Defense, monitoring, and incident workflows — provisioned on the domains and hosts you connected.
          </p>
          <ul className="mt-8 space-y-2 font-mono text-[11px] text-[var(--mkt-teal)]">
            <li>▸ session · JWT + refresh</li>
            <li>▸ rbac · role-scoped permissions</li>
            <li>▸ console · /console</li>
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto w-full max-w-md"
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--mkt-muted)] hover:text-[var(--mkt-ink)] lg:hidden"
          >
            <ArrowLeft className="size-4" /> IAETDS
          </Link>

          <div className="rounded-2xl border border-[var(--mkt-line)] bg-[var(--mkt-surface)] p-6 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] sm:p-8">
            <h2 className="font-display text-2xl text-[var(--mkt-ink)]">Sign in</h2>
            <p className="mt-1.5 text-sm text-[var(--mkt-muted)]">
              Use your work credentials. New customer?{" "}
              <Link href="/get-started" className="font-semibold text-[var(--mkt-teal)] hover:underline">
                Start provisioning
              </Link>
            </p>

            <form onSubmit={submit} className="mt-7 space-y-4">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mkt-muted)]">
                  Work email
                </span>
                <div className="relative mt-1.5">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--mkt-muted)]" />
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-md border border-[var(--mkt-line-strong)] bg-[var(--mkt-bg)] py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[var(--mkt-teal)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--mkt-teal)_35%,transparent)]"
                  />
                </div>
              </label>

              <label className="block">
                <span className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mkt-muted)]">
                  Password
                  <button
                    type="button"
                    onClick={() =>
                      toast.info("Password reset", {
                        description: "A reset link would be emailed to your work address.",
                      })
                    }
                    className="normal-case tracking-normal text-[var(--mkt-teal)] hover:underline"
                  >
                    Forgot?
                  </button>
                </span>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--mkt-muted)]" />
                  <input
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-md border border-[var(--mkt-line-strong)] bg-[var(--mkt-bg)] py-2.5 pl-10 pr-10 text-sm outline-none focus:border-[var(--mkt-teal)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--mkt-teal)_35%,transparent)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--mkt-muted)]"
                  >
                    {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--mkt-muted)]">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="size-4 rounded border-[var(--mkt-line-strong)] accent-[var(--mkt-teal)]"
                />
                Keep me signed in
              </label>

              <button
                type="submit"
                disabled={login.isPending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--mkt-ink)] px-4 py-3 text-sm font-semibold text-[var(--mkt-bg)] disabled:opacity-70"
              >
                {login.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    Sign in <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--mkt-muted)]">
              <div className="h-px flex-1 bg-[var(--mkt-line)]" />
              Or
              <div className="h-px flex-1 bg-[var(--mkt-line)]" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {["SSO / SAML", "Microsoft Entra"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() =>
                    toast.info(p, { description: "Enterprise IdP handshake would open here." })
                  }
                  className="rounded-md border border-[var(--mkt-line-strong)] bg-[var(--mkt-bg)] px-3 py-2.5 text-xs font-semibold text-[var(--mkt-ink)] hover:border-[var(--mkt-ink)]"
                >
                  {p}
                </button>
              ))}
            </div>

            <details className="mt-6 rounded-lg border border-dashed border-[var(--mkt-line)] p-3">
              <summary className="cursor-pointer text-xs font-medium text-[var(--mkt-muted)]">
                Evaluation accounts
              </summary>
              <p className="mt-2 text-[11px] text-[var(--mkt-muted)]">
                Password: <span className="font-mono text-[var(--mkt-ink)]">Password123!</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {DEMO_ACCOUNTS.map((a) => (
                  <button
                    key={a.email}
                    type="button"
                    onClick={() => {
                      setEmail(a.email);
                      setPassword("Password123!");
                    }}
                    className="rounded border border-[var(--mkt-line)] px-2 py-1 text-[11px] font-medium hover:border-[var(--mkt-teal)]"
                  >
                    {a.role}
                  </button>
                ))}
              </div>
            </details>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
