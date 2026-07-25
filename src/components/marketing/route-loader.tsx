"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Top progress bar + brief overlay spinner on client navigations.
 */
export function RouteLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const prev = React.useRef(`${pathname}?${searchParams?.toString() ?? ""}`);

  React.useEffect(() => {
    const key = `${pathname}?${searchParams?.toString() ?? ""}`;
    if (key === prev.current) return;
    prev.current = key;

    setActive(true);
    setWidth(12);
    const t1 = window.setTimeout(() => setWidth(55), 80);
    const t2 = window.setTimeout(() => setWidth(78), 220);
    const t3 = window.setTimeout(() => {
      setWidth(100);
      window.setTimeout(() => {
        setActive(false);
        setWidth(0);
      }, 220);
    }, 480);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [pathname, searchParams]);

  if (!active && width === 0) return null;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] overflow-hidden"
      >
        <div
          className="h-full bg-[#0d9488] transition-[width] duration-300 ease-out"
          style={{
            width: `${width}%`,
            boxShadow: "0 0 12px rgba(13, 148, 136, 0.55)",
          }}
        />
      </div>
      {active && width < 100 && (
        <div
          className="pointer-events-none fixed inset-0 z-[99] grid place-items-center bg-black/10 backdrop-blur-[1px]"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/10 bg-white px-6 py-5 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.45)]">
            <span className="mkt-spinner" />
            <p className="text-xs font-medium tracking-wide text-slate-500">Loading…</p>
          </div>
        </div>
      )}
    </>
  );
}
