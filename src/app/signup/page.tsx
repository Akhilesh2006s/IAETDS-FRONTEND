"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, Eye, EyeOff, Loader2, Lock, Mail, UserRound } from "lucide-react";
import { toast } from "sonner";
import { useRegister } from "@/hooks/use-auth";
import { apiError } from "@/lib/api";

export default function SignupPage() {
  const registerAccount = useRegister();
  const [showPassword, setShowPassword] = React.useState(false);
  const [form, setForm] = React.useState({ companyName: "", name: "", email: "", password: "", confirm: "" });
  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => setForm((state) => ({ ...state, [key]: event.target.value }));
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.password !== form.confirm) return toast.error("Passwords do not match");
    if (form.password.length < 8 || !/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/[0-9]/.test(form.password)) return toast.error("Use at least 8 characters with uppercase, lowercase, and a number");
    try {
      await registerAccount.mutateAsync({ companyName: form.companyName.trim(), name: form.name.trim(), email: form.email.trim(), password: form.password });
      toast.success("Workspace created", { description: "Your isolated IAETDS workspace is ready." });
    } catch (error) { toast.error("Could not create workspace", { description: apiError(error) }); }
  };
  return <div className="mkt-root min-h-screen bg-[var(--mkt-bg)] px-5 py-10 sm:py-16">
    <div className="mx-auto w-full max-w-md">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--mkt-muted)] hover:text-[var(--mkt-ink)]"><ArrowLeft className="size-4" /> IAETDS</Link>
      <div className="mt-8 rounded-2xl border border-[var(--mkt-line)] bg-white p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,.35)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-[var(--mkt-teal)]">Secure self-service onboarding</p>
        <h1 className="mt-2 font-display text-3xl text-[var(--mkt-ink)]">Create your workspace</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--mkt-muted)]">Your company receives an isolated workspace. You become its owner and can invite your team later.</p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <Input icon={Building2} label="Company name" type="text" value={form.companyName} onChange={update("companyName")} autoComplete="organization" placeholder="Acme Technologies" />
          <Input icon={UserRound} label="Your full name" type="text" value={form.name} onChange={update("name")} autoComplete="name" placeholder="Akhil Sharma" />
          <Input icon={Mail} label="Work email" type="email" value={form.email} onChange={update("email")} autoComplete="email" placeholder="you@company.com" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input icon={Lock} label="Password" type={showPassword ? "text" : "password"} value={form.password} onChange={update("password")} autoComplete="new-password" placeholder="••••••••" />
            <Input icon={Lock} label="Confirm" type={showPassword ? "text" : "password"} value={form.confirm} onChange={update("confirm")} autoComplete="new-password" placeholder="••••••••" />
          </div>
          <button type="button" onClick={() => setShowPassword((value) => !value)} className="inline-flex items-center gap-2 text-xs text-[var(--mkt-muted)]">{showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />} {showPassword ? "Hide" : "Show"} password</button>
          <button type="submit" disabled={registerAccount.isPending} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--mkt-ink)] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">{registerAccount.isPending ? <Loader2 className="size-4 animate-spin" /> : <>Create workspace <ArrowRight className="size-4" /></>}</button>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--mkt-muted)]">Already registered? <Link href="/login" className="font-semibold text-[var(--mkt-teal)] hover:underline">Sign in</Link></p>
      </div>
    </div>
  </div>;
}

function Input({ icon: Icon, label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon: typeof Building2; label: string }) {
  return <label className="block"><span className="text-xs font-semibold uppercase tracking-[.1em] text-[var(--mkt-muted)]">{label}</span><div className="relative mt-1.5"><Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--mkt-muted)]" /><input {...props} required className="w-full rounded-md border border-[var(--mkt-line-strong)] bg-[var(--mkt-bg)] py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[var(--mkt-teal)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--mkt-teal)_25%,transparent)]" /></div></label>;
}
