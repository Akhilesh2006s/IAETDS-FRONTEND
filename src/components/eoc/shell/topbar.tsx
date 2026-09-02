"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Check,
  ChevronDown,
  Command as CommandIcon,
  Menu,
  Plus,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { flatNav, BASE } from "@/lib/eoc/nav";
import { currentUser } from "@/lib/eoc/data";
import { useAuthStore } from "@/store/auth";
import { useLogout } from "@/hooks/use-auth";
import { useEocStore } from "@/lib/eoc/store";
import { StatusPill } from "../primitives";

const menuCls =
  "z-[60] min-w-[220px] overflow-hidden rounded-xl border border-eoc-border bg-white p-1.5 shadow-xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95";
const itemCls =
  "flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-eoc-fg2 outline-none transition-colors data-[highlighted]:bg-slate-100 data-[highlighted]:text-eoc-fg";

export function Topbar({
  onOpenPalette,
  onOpenSidebar,
}: {
  onOpenPalette: () => void;
  onOpenSidebar: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const settings = useEocStore((s) => s.settings);
  const authUser = useAuthStore((s) => s.user);
  const logout = useLogout();

  const current = flatNav.find((n) =>
    n.href === BASE ? pathname === BASE : pathname.startsWith(n.href),
  );

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-eoc-border bg-eoc-bg/80 px-4 backdrop-blur-xl lg:px-6">
      <button
        onClick={onOpenSidebar}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-eoc-fg2 hover:bg-slate-100 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Workspace switcher */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex items-center gap-2 rounded-lg border border-eoc-border bg-white px-2.5 py-1.5 text-sm text-eoc-fg shadow-sm transition-colors hover:bg-slate-50 focus:outline-none">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-eoc-accent text-[10px] font-bold text-white">
            {settings.workspaceName.slice(0, 2).toUpperCase()}
          </span>
          <span className="hidden max-w-[140px] truncate font-medium sm:block">{settings.workspaceName}</span>
          <ChevronDown className="h-3.5 w-3.5 text-eoc-muted" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={menuCls} align="start" sideOffset={8}>
            <DropdownMenu.Label className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-eoc-muted">
              Workspace
            </DropdownMenu.Label>
            <DropdownMenu.Item className={itemCls} onSelect={() => router.push("/console/settings")}>
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-[10px] font-bold text-eoc-fg2">
                {settings.workspaceName.slice(0, 2).toUpperCase()}
              </span>
              <div className="flex-1">
                <p className="text-eoc-fg">{settings.workspaceName}</p>
                <p className="text-[11px] text-eoc-muted">{settings.workspacePlan}</p>
              </div>
              <Check className="h-4 w-4 text-eoc-accent" />
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="my-1 h-px bg-eoc-border" />
            <DropdownMenu.Item className={itemCls} onSelect={() => router.push("/console/settings")}>
              Workspace settings
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* Breadcrumb */}
      <div className="hidden items-center gap-2 text-sm text-eoc-muted md:flex">
        <span>/</span>
        <span className="text-eoc-fg2">{current?.label ?? "Dashboard"}</span>
      </div>

      {/* Search trigger */}
      <button
        onClick={onOpenPalette}
        className="group ml-auto flex h-9 items-center gap-2 rounded-lg border border-eoc-border bg-white px-3 text-sm text-eoc-muted shadow-sm transition-colors hover:bg-slate-50 md:w-72"
      >
        <Search className="h-4 w-4" />
        <span className="hidden flex-1 text-left md:block">Search everything…</span>
        <kbd className="hidden items-center gap-0.5 rounded-md border border-eoc-border px-1.5 py-0.5 text-[10px] md:flex">
          <CommandIcon className="h-2.5 w-2.5" />K
        </kbd>
      </button>

      {/* Quick create */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex h-9 items-center gap-1.5 rounded-lg bg-eoc-accent px-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-eoc-accent/90 focus:outline-none">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:block">Create</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={menuCls} align="end" sideOffset={8}>
            {[
              ["Add infrastructure asset", "/console/applications"],
              ["Prepare maintenance report", "/console/maintenance-reports"],
            ].map(([label, href]) => (
              <DropdownMenu.Item key={label} className={itemCls} onSelect={() => router.push(href)}>
                <Plus className="h-4 w-4 text-eoc-muted" />
                {label}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* User menu */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex items-center gap-2 rounded-lg pl-1 pr-2 outline-none transition-colors hover:bg-slate-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-eoc-accent text-xs font-semibold text-white">
            {authUser?.name?.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase() || currentUser.initials}
          </span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={menuCls} align="end" sideOffset={8}>
            <div className="border-b border-eoc-border px-2.5 py-2.5">
              <p className="text-sm font-medium text-eoc-fg">{settings.profileName}</p>
              <p className="text-xs text-eoc-muted">{settings.profileEmail}</p>
              <div className="mt-2">
                <StatusPill tone="info">{settings.profileRole}</StatusPill>
              </div>
            </div>
            {[
              ["Profile & preferences", "/console/settings"],
              ["Identity & access", "/console/identity"],
              ["Audit logs", "/console/audit"],
            ].map(([label, href]) => (
              <DropdownMenu.Item key={label} className={itemCls} onSelect={() => router.push(href)}>
                {label}
              </DropdownMenu.Item>
            ))}
            <DropdownMenu.Item className={itemCls} onSelect={() => { window.location.href = "mailto:info@iaetds.com?subject=IAETDS%20support%20request"; }}>
              Contact support · info@iaetds.com
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="my-1 h-px bg-eoc-border" />
            <DropdownMenu.Item className={cn(itemCls, "text-eoc-danger data-[highlighted]:text-eoc-danger")} onSelect={() => logout.mutate()}>
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </header>
  );
}
