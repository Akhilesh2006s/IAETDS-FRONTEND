"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Lock,
  Plus,
  Shield,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  SERVICES,
  formatInr,
  totalMonthly,
  type ServiceId,
} from "@/lib/marketing/services";
import { useOnboardStore, type InfraHost } from "@/lib/marketing/onboard-store";
import { cn } from "@/lib/utils";

const STEPS = ["Services", "Organization", "Infrastructure", "Review"] as const;

function genRef() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `IAE-${new Date().getFullYear()}-${n}`;
}

export default function GetStartedPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <span className="mkt-spinner" />
        </div>
      }
    >
      <GetStartedInner />
    </React.Suspense>
  );
}

function GetStartedInner() {
  const params = useSearchParams();
  const store = useOnboardStore();
  const [step, setStep] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const svc = params.get("service") as ServiceId | null;
    if (svc && SERVICES.some((s) => s.id === svc)) {
      if (svc === "ops_bundle") store.setServices(["ops_bundle"]);
      else {
        const next = new Set(store.services.filter((s) => s !== "ops_bundle"));
        next.add(svc);
        store.setServices([...next]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const monthly = totalMonthly(store.services);

  const validateStep = () => {
    if (step === 0 && store.services.length === 0) {
      toast.error("Select at least one service");
      return false;
    }
    if (step === 1) {
      if (!store.companyName.trim() || !store.workEmail.trim() || !store.primaryDomain.trim()) {
        toast.error("Company, work email, and primary domain are required");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.workEmail)) {
        toast.error("Enter a valid work email");
        return false;
      }
      if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(store.primaryDomain.replace(/^https?:\/\//, "").split("/")[0])) {
        toast.error("Enter a valid domain (e.g. acme.com)");
        return false;
      }
    }
    if (step === 2) {
      if (!store.backendApiUrl.trim()) {
        toast.error("Production API URL is required");
        return false;
      }
      try {
        // eslint-disable-next-line no-new
        new URL(store.backendApiUrl);
      } catch {
        toast.error("API URL must be a valid URL (https://…)");
        return false;
      }
      const host = store.hosts[0];
      if (!host?.host.trim() || !host.username.trim() || !host.secret.trim()) {
        toast.error("At least one SSH host with credentials is required");
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    // Simulated secure provisioning handoff
    await new Promise((r) => setTimeout(r, 1800));
    const ref = genRef();
    store.markSubmitted(ref);
    setSubmitting(false);
    setDone(true);
    toast.success("Provisioning request received", {
      description: `Reference ${ref} · estimated ${formatInr(monthly)}/mo`,
    });
  };

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-[color-mix(in_oklab,var(--mkt-teal)_18%,transparent)] text-[var(--mkt-teal)]">
          <Check className="size-7" />
        </div>
        <h1 className="mt-6 font-display text-3xl text-[var(--mkt-ink)]">Provisioning queued</h1>
        <p className="mt-3 text-sm text-[var(--mkt-muted)]">
          Reference <span className="font-mono font-semibold text-[var(--mkt-ink)]">{store.referenceId}</span>
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[var(--mkt-muted)]">
          We’ll verify domain ownership, probe your API endpoints, and install agents on the hosts you listed.
          Credentials are used for one-time agent bootstrap and are not retained in plaintext.
        </p>
        <p className="mt-4 text-sm font-semibold text-[var(--mkt-ink)]">
          Estimated billing: {formatInr(monthly)} / month
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--mkt-ink)] px-5 py-3 text-sm font-semibold text-[var(--mkt-bg)]"
          >
            Sign in to console <ArrowRight className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => {
              store.reset();
              setDone(false);
              setStep(0);
            }}
            className="rounded-md border border-[var(--mkt-line-strong)] px-5 py-3 text-sm font-semibold text-[var(--mkt-ink)]"
          >
            Start another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--mkt-teal)]">
        Provisioning
      </p>
      <h1 className="mt-2 font-display text-3xl tracking-tight text-[var(--mkt-ink)] sm:text-4xl">
        Connect IAETDS to your estate
      </h1>
      <p className="mt-3 text-sm text-[var(--mkt-muted)]">
        Select services, confirm organization details, then provide domain, API URLs, and SSH access for agent install.
      </p>

      {/* Steps */}
      <ol className="mt-10 flex gap-2">
        {STEPS.map((label, i) => (
          <li key={label} className="flex-1">
            <div
              className={cn(
                "h-1 rounded-full transition-colors",
                i <= step ? "bg-[var(--mkt-teal)]" : "bg-[var(--mkt-line)]",
              )}
            />
            <p
              className={cn(
                "mt-2 text-[11px] font-medium",
                i === step ? "text-[var(--mkt-ink)]" : "text-[var(--mkt-muted)]",
              )}
            >
              {label}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-2xl border border-[var(--mkt-line)] bg-[var(--mkt-surface)] p-5 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && <StepServices />}
            {step === 1 && <StepOrg />}
            {step === 2 && <StepInfra />}
            {step === 3 && <StepReview monthly={monthly} />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between border-t border-[var(--mkt-line)] pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--mkt-muted)] disabled:opacity-40"
          >
            <ArrowLeft className="size-4" /> Back
          </button>

          <div className="flex items-center gap-4">
            <p className="hidden text-sm text-[var(--mkt-muted)] sm:block">
              Est.{" "}
              <span className="font-semibold text-[var(--mkt-ink)]">{formatInr(monthly)}</span>
              /mo
            </p>
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--mkt-ink)] px-4 py-2.5 text-sm font-semibold text-[var(--mkt-bg)]"
              >
                Continue <ArrowRight className="size-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--mkt-teal)] px-4 py-2.5 text-sm font-semibold text-[var(--mkt-ink)] disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Securing handoff…
                  </>
                ) : (
                  <>
                    <Lock className="size-4" /> Submit provisioning
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-[var(--mkt-muted)]">
        <Shield className="mt-0.5 size-3.5 shrink-0 text-[var(--mkt-teal)]" />
        SSH and API credentials are transmitted over TLS, used solely to install a least-privilege agent, then discarded from the provisioning vault after bootstrap confirmation.
      </p>
    </div>
  );
}

function StepServices() {
  const { services, toggleService } = useOnboardStore();
  return (
    <div>
      <h2 className="font-display text-xl text-[var(--mkt-ink)]">Choose what we run for you</h2>
      <p className="mt-1 text-sm text-[var(--mkt-muted)]">
        Security Defense Suite is {formatInr(8500)}/mo. Bundle replaces individual selections.
      </p>
      <div className="mt-6 space-y-3">
        {SERVICES.map((svc) => {
          const on = services.includes(svc.id);
          return (
            <button
              key={svc.id}
              type="button"
              onClick={() => toggleService(svc.id)}
              className={cn(
                "flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors",
                on
                  ? "border-[var(--mkt-teal)] bg-[color-mix(in_oklab,var(--mkt-teal)_10%,transparent)]"
                  : "border-[var(--mkt-line)] hover:border-[var(--mkt-line-strong)]",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 grid size-5 shrink-0 place-items-center rounded border",
                  on
                    ? "border-[var(--mkt-teal)] bg-[var(--mkt-teal)] text-[var(--mkt-ink)]"
                    : "border-[var(--mkt-line-strong)]",
                )}
              >
                {on && <Check className="size-3.5" strokeWidth={3} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-semibold text-[var(--mkt-ink)]">{svc.name}</span>
                  <span className="text-sm font-semibold text-[var(--mkt-ink)]">
                    {formatInr(svc.priceMonthly)}
                    <span className="font-normal text-[var(--mkt-muted)]">/mo</span>
                  </span>
                </span>
                <span className="mt-1 block text-xs text-[var(--mkt-muted)]">{svc.tagline}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mkt-muted)]">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-[11px] text-[var(--mkt-muted)]">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-[var(--mkt-line-strong)] bg-[var(--mkt-bg)] px-3 py-2.5 text-sm text-[var(--mkt-ink)] outline-none transition-shadow placeholder:text-[var(--mkt-muted)]/70 focus:border-[var(--mkt-teal)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--mkt-teal)_35%,transparent)]";

function StepOrg() {
  const s = useOnboardStore();
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl text-[var(--mkt-ink)]">Organization &amp; domain</h2>
        <p className="mt-1 text-sm text-[var(--mkt-muted)]">
          We use your primary domain for ownership checks and console branding.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company name">
          <input
            className={inputClass}
            value={s.companyName}
            onChange={(e) => s.patch({ companyName: e.target.value })}
            placeholder="Northwind Industries"
          />
        </Field>
        <Field label="Contact name">
          <input
            className={inputClass}
            value={s.contactName}
            onChange={(e) => s.patch({ contactName: e.target.value })}
            placeholder="Riya Kapoor"
          />
        </Field>
        <Field label="Work email">
          <input
            type="email"
            className={inputClass}
            value={s.workEmail}
            onChange={(e) => s.patch({ workEmail: e.target.value })}
            placeholder="ops@acme.com"
          />
        </Field>
        <Field label="Phone (optional)">
          <input
            className={inputClass}
            value={s.phone}
            onChange={(e) => s.patch({ phone: e.target.value })}
            placeholder="+91 98XXX XXXXX"
          />
        </Field>
        <Field label="Primary domain" hint="Without protocol — e.g. acme.com">
          <input
            className={inputClass}
            value={s.primaryDomain}
            onChange={(e) => s.patch({ primaryDomain: e.target.value })}
            placeholder="acme.com"
          />
        </Field>
        <Field label="Additional domains" hint="Comma-separated">
          <input
            className={inputClass}
            value={s.additionalDomains}
            onChange={(e) => s.patch({ additionalDomains: e.target.value })}
            placeholder="app.acme.com, api.acme.com"
          />
        </Field>
      </div>
    </div>
  );
}

function StepInfra() {
  const s = useOnboardStore();

  const updateHost = (idx: number, patch: Partial<InfraHost>) => {
    const hosts = s.hosts.map((h, i) => (i === idx ? { ...h, ...patch } : h));
    s.setHosts(hosts);
  };

  const addHost = () => {
    s.setHosts([
      ...s.hosts,
      {
        label: `Host ${s.hosts.length + 1}`,
        host: "",
        port: "22",
        username: "root",
        authMethod: "password",
        secret: "",
      },
    ]);
  };

  const removeHost = (idx: number) => {
    if (s.hosts.length <= 1) return;
    s.setHosts(s.hosts.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl text-[var(--mkt-ink)]">Backend URLs &amp; SSH access</h2>
        <p className="mt-1 text-sm text-[var(--mkt-muted)]">
          Production API base URL is required. SSH is used to install the monitoring/security agent.
        </p>
      </div>

      <div className="grid gap-4">
        <Field label="Production API base URL" hint="e.g. https://api.acme.com/v1">
          <input
            className={inputClass}
            value={s.backendApiUrl}
            onChange={(e) => s.patch({ backendApiUrl: e.target.value })}
            placeholder="https://api.yourdomain.com/v1"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Staging API URL (optional)">
            <input
              className={inputClass}
              value={s.stagingApiUrl}
              onChange={(e) => s.patch({ stagingApiUrl: e.target.value })}
              placeholder="https://staging-api.yourdomain.com"
            />
          </Field>
          <Field label="Webhook URL (optional)">
            <input
              className={inputClass}
              value={s.webhookUrl}
              onChange={(e) => s.patch({ webhookUrl: e.target.value })}
              placeholder="https://hooks.yourdomain.com/iaetds"
            />
          </Field>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--mkt-ink)]">SSH hosts</h3>
          <button
            type="button"
            onClick={addHost}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--mkt-teal)]"
          >
            <Plus className="size-3.5" /> Add host
          </button>
        </div>
        <div className="mt-3 space-y-4">
          {s.hosts.map((h, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[var(--mkt-line)] bg-[var(--mkt-bg)] p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <input
                  className="bg-transparent text-sm font-semibold text-[var(--mkt-ink)] outline-none"
                  value={h.label}
                  onChange={(e) => updateHost(idx, { label: e.target.value })}
                />
                {s.hosts.length > 1 && (
                  <button type="button" onClick={() => removeHost(idx)} className="text-[var(--mkt-muted)] hover:text-red-600">
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Host / IP">
                  <input
                    className={inputClass}
                    value={h.host}
                    onChange={(e) => updateHost(idx, { host: e.target.value })}
                    placeholder="10.0.4.12 or bastion.acme.com"
                  />
                </Field>
                <Field label="Port">
                  <input
                    className={inputClass}
                    value={h.port}
                    onChange={(e) => updateHost(idx, { port: e.target.value })}
                    placeholder="22"
                  />
                </Field>
                <Field label="Username">
                  <input
                    className={inputClass}
                    value={h.username}
                    onChange={(e) => updateHost(idx, { username: e.target.value })}
                    placeholder="root"
                  />
                </Field>
                <Field label="Auth method">
                  <select
                    className={inputClass}
                    value={h.authMethod}
                    onChange={(e) =>
                      updateHost(idx, { authMethod: e.target.value as InfraHost["authMethod"] })
                    }
                  >
                    <option value="password">Root / user password</option>
                    <option value="ssh_key">SSH private key</option>
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field
                    label={h.authMethod === "password" ? "Password" : "Private key (PEM)"}
                    hint="Never shared with third parties. One-time bootstrap only."
                  >
                    {h.authMethod === "password" ? (
                      <input
                        type="password"
                        autoComplete="new-password"
                        className={inputClass}
                        value={h.secret}
                        onChange={(e) => updateHost(idx, { secret: e.target.value })}
                        placeholder="••••••••••••"
                      />
                    ) : (
                      <textarea
                        className={cn(inputClass, "min-h-[100px] font-mono text-xs")}
                        value={h.secret}
                        onChange={(e) => updateHost(idx, { secret: e.target.value })}
                        placeholder="-----BEGIN OPENSSH PRIVATE KEY-----"
                      />
                    )}
                  </Field>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Field label="Notes for provisioning engineer (optional)">
        <textarea
          className={cn(inputClass, "min-h-[80px]")}
          value={s.notes}
          onChange={(e) => s.patch({ notes: e.target.value })}
          placeholder="VPN required? Jump host? Maintenance window preferences…"
        />
      </Field>
    </div>
  );
}

function StepReview({ monthly }: { monthly: number }) {
  const s = useOnboardStore();
  const selected = SERVICES.filter((svc) => s.services.includes(svc.id));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl text-[var(--mkt-ink)]">Review &amp; confirm</h2>
        <p className="mt-1 text-sm text-[var(--mkt-muted)]">
          Confirm details before we open a provisioning ticket.
        </p>
      </div>

      <div className="space-y-4 text-sm">
        <ReviewBlock title="Services">
          <ul className="space-y-1">
            {selected.map((svc) => (
              <li key={svc.id} className="flex justify-between gap-4">
                <span>{svc.name}</span>
                <span className="font-medium">{formatInr(svc.priceMonthly)}/mo</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 border-t border-[var(--mkt-line)] pt-3 text-base font-semibold text-[var(--mkt-ink)]">
            Total {formatInr(monthly)} / month
          </p>
        </ReviewBlock>

        <ReviewBlock title="Organization">
          <p>{s.companyName || "—"} · {s.workEmail || "—"}</p>
          <p className="mt-1 text-[var(--mkt-muted)]">Domain: {s.primaryDomain || "—"}</p>
        </ReviewBlock>

        <ReviewBlock title="Infrastructure">
          <p className="font-mono text-xs">{s.backendApiUrl || "—"}</p>
          {s.hosts.map((h, i) => (
            <p key={i} className="mt-1 font-mono text-xs text-[var(--mkt-muted)]">
              {h.username}@{h.host || "host"}:{h.port} · {h.authMethod} · ••••••••
            </p>
          ))}
        </ReviewBlock>
      </div>
    </div>
  );
}

function ReviewBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--mkt-line)] bg-[var(--mkt-bg)] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mkt-muted)]">{title}</p>
      <div className="mt-2 text-[var(--mkt-ink)]">{children}</div>
    </div>
  );
}
