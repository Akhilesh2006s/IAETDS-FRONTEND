import {
  LayoutDashboard,
  Boxes,
  Store,
  Workflow,
  Wrench,
  ShieldCheck,
  Gauge,
  Activity,
  BarChart3,
  CreditCard,
  Landmark,
  Plug,
  KeyRound,
  ScrollText,
  Database,
  BookOpen,
  Bell,
  Settings,
  Siren,
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
      { label: "Infrastructure", href: `${BASE}/applications`, icon: Boxes, badge: "7" },
      { label: "Connector Catalog", href: `${BASE}/marketplace`, icon: Store },
    ],
  },
  {
    label: "Response",
    items: [
      { label: "Runbook Automation", href: `${BASE}/automation`, icon: Workflow },
      { label: "Risk Analytics", href: `${BASE}/analytics`, icon: BarChart3 },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Incident Workbench", href: `${BASE}/incidents`, icon: Siren, badge: "1" },
      { label: "Maintenance Center", href: `${BASE}/maintenance`, icon: Wrench },
      { label: "Security Center", href: `${BASE}/security`, icon: ShieldCheck },
      { label: "Performance Center", href: `${BASE}/performance`, icon: Gauge },
      { label: "Monitoring", href: `${BASE}/monitoring`, icon: Activity },
    ],
  },
  {
    label: "Business",
    items: [
      { label: "Billing & Payments", href: `${BASE}/billing`, icon: CreditCard },
      { label: "Finance", href: `${BASE}/finance`, icon: Landmark },
      { label: "Integrations", href: `${BASE}/integrations`, icon: Plug },
    ],
  },
  {
    label: "Governance",
    items: [
      { label: "Identity & Access", href: `${BASE}/identity`, icon: KeyRound },
      { label: "Audit Logs", href: `${BASE}/audit`, icon: ScrollText },
      { label: "Storage", href: `${BASE}/storage`, icon: Database },
      { label: "Knowledge", href: `${BASE}/knowledge`, icon: BookOpen },
    ],
  },
  {
    label: "Workspace",
    items: [
      { label: "Notifications", href: `${BASE}/notifications`, icon: Bell },
      { label: "Settings", href: `${BASE}/settings`, icon: Settings },
    ],
  },
];

export const flatNav: NavItem[] = navGroups.flatMap((g) => g.items);
