export default function ConsoleLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090B]">
      <div className="flex flex-col items-center gap-3">
        <span className="mkt-spinner" />
        <p className="text-sm text-zinc-500">Loading console…</p>
      </div>
    </div>
  );
}
