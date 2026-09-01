import {
  LayoutDashboard,
  Boxes,
  Wrench,
  KeyRound,
  ScrollText,
  Settings,
  Siren,
  PlugZap,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const BASE = "/console";

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: `${BASE}`, icon: LayoutDashboard },
      { label: "Infrastructure", href: `${BASE}/applications`, icon: Boxes },
      { label: "Connections", href: `${BASE}/connections`, icon: PlugZap },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Incidents", href: `${BASE}/incidents`, icon: Siren },
      { label: "Maintenance Reports", href: `${BASE}/maintenance-reports`, icon: Wrench },
    ],
  },
  {
    label: "Governance",
    items: [
      { label: "Identity & Access", href: `${BASE}/identity`, icon: KeyRound },
      { label: "Audit Logs", href: `${BASE}/audit`, icon: ScrollText },
    ],
  },
  {
    label: "Workspace",
    items: [
      { label: "Settings", href: `${BASE}/settings`, icon: Settings },
    ],
  },
];

export const flatNav: NavItem[] = navGroups.flatMap((g) => g.items);
