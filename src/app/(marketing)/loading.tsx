export default function MarketingLoading() {
  return (
    <div className="mkt-root flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <span className="mkt-spinner" />
        <p className="font-mkt text-sm text-[var(--mkt-muted)]">Preparing page…</p>
      </div>
    </div>
  );
}
