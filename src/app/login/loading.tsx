export default function LoginLoading() {
  return (
    <div className="mkt-root flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <span className="mkt-spinner" />
        <p className="text-sm text-[var(--mkt-muted)]">Loading sign-in…</p>
      </div>
    </div>
  );
}
