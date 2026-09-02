"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { CommandPalette } from "./command-palette";
import { useEocStore } from "@/lib/eoc/store";
import { useAuthStore } from "@/store/auth";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [mobileNav, setMobileNav] = React.useState(false);

  // Load persisted data from the browser after mount (avoids SSR hydration mismatch)
  React.useEffect(() => {
    useEocStore.persist.rehydrate();
  }, []);

  React.useEffect(() => {
    if (!user) return;
    const roleLabels: Record<string, string> = {
      super_admin: "Workspace Owner",
      security_analyst: "Security Analyst",
      maintenance_engineer: "Maintenance Engineer",
      operations_manager: "Operations Manager",
      viewer: "Viewer",
    };
    useEocStore.getState().updateSettings({
      profileName: user.name,
      profileEmail: user.email,
      profileRole: roleLabels[user.role] || user.role,
      workspaceName: user.workspaceName || "Workspace",
      workspacePlan: user.workspacePlan || "trial",
      workspaceRegion: user.workspaceName === "AsliLearn AI" ? "Asia/Kolkata (IST)" : "Not configured",
      mfa: Boolean(user.mfaEnabled),
    });
  }, [user]);

  // Keep the authenticated console aligned with the white marketing experience.
  React.useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  // Cmd/Ctrl + K
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    setMobileNav(false);
  }, [pathname]);

  React.useEffect(() => {
    if (hydrated && !user) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [hydrated, user, router, pathname]);

  if (!hydrated || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-eoc-bg text-sm text-eoc-muted">Securing workspace…</div>;
  }

  return (
    <div className="min-h-screen bg-eoc-bg text-eoc-fg antialiased">
      <div className="pointer-events-none fixed inset-0 eoc-grid opacity-[0.55]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[420px] eoc-radial" />

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-eoc-border bg-white lg:block">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileNav && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNav(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 left-0 z-50 w-64 border-r border-eoc-border bg-eoc-surface lg:hidden"
            >
              <Sidebar onNavigate={() => setMobileNav(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="relative lg:pl-64">
        <Topbar
          onOpenPalette={() => setPaletteOpen(true)}
          onOpenSidebar={() => setMobileNav(true)}
        />
        <main className="mx-auto w-full max-w-[1500px] px-4 py-6 lg:px-8 lg:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
