export type ServiceId =
  | "security"
  | "monitoring"
  | "incident"
  | "identity"
  | "ops_bundle";

export type ServicePlan = {
  id: ServiceId;
  name: string;
  tagline: string;
  description: string;
  priceMonthly: number;
  currency: "INR";
  featured?: boolean;
  includes: string[];
  setupNotes: string;
};

export const SERVICES: ServicePlan[] = [
  {
    id: "security",
    name: "Security Defense Suite",
    tagline: "Threat detection, vulnerability & compliance",
    description:
      "Continuous security monitoring across your estate — findings triage, CVE tracking, misconfiguration detection, and compliance posture for SOC 2, ISO 27001, and GDPR.",
    priceMonthly: 8500,
    currency: "INR",
    featured: true,
    includes: [
      "24×7 threat & anomaly detection",
      "Vulnerability & CVE management",
      "Misconfiguration & identity risk scans",
      "Compliance control scoring",
      "Security score & risk export",
      "Dedicated security analyst workflow",
    ],
    setupNotes: "Requires domain, API endpoints, and read-scoped host access for agent install.",
  },
  {
    id: "monitoring",
    name: "Infrastructure Monitoring",
    tagline: "Latency, health & uptime command",
    description:
      "Live service health, P50/P95/P99 latency, resource utilization, and alerting across applications and gateways.",
    priceMonthly: 4500,
    currency: "INR",
    includes: [
      "Application & node health",
      "Latency distribution charts",
      "Uptime & error-rate alerts",
      "Capacity trend insights",
    ],
    setupNotes: "Needs backend base URLs and optional Prometheus/metrics endpoints.",
  },
  {
    id: "incident",
    name: "Incident & Maintenance Ops",
    tagline: "Response, patches & work orders",
    description:
      "Incident intake, severity routing, maintenance windows, patch orchestration, and audit-ready activity trails.",
    priceMonthly: 6200,
    currency: "INR",
    includes: [
      "Incident lifecycle management",
      "Maintenance scheduling",
      "Patch & change windows",
      "Ops audit trail",
    ],
    setupNotes: "SSH access used to schedule maintenance agents and verify patch status.",
  },
  {
    id: "identity",
    name: "Identity & Access Governance",
    tagline: "SSO-ready, MFA posture & members",
    description:
      "Workspace membership, role governance, MFA adoption tracking, and access reviews aligned to zero-trust practices.",
    priceMonthly: 5900,
    currency: "INR",
    includes: [
      "Member invite & suspend flows",
      "MFA & SSO posture dashboard",
      "Role-based access visibility",
      "Access request audit",
    ],
    setupNotes: "Domain verification required; IdP metadata optional for SSO.",
  },
  {
    id: "ops_bundle",
    name: "Full Operations Bundle",
    tagline: "Security + monitoring + incidents + identity",
    description:
      "Complete IAETDS coverage — security defense, monitoring, incident ops, and identity governance under one agreement.",
    priceMonthly: 18500,
    currency: "INR",
    includes: [
      "Everything in Security Defense Suite",
      "Everything in Infrastructure Monitoring",
      "Everything in Incident & Maintenance Ops",
      "Everything in Identity & Access Governance",
      "Priority provisioning (48h)",
      "Quarterly posture review call",
    ],
    setupNotes: "Single provisioning pass across all environments you list.",
  },
];

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getService(id: ServiceId) {
  return SERVICES.find((s) => s.id === id);
}

export function totalMonthly(ids: ServiceId[]) {
  const hasBundle = ids.includes("ops_bundle");
  if (hasBundle) return getService("ops_bundle")!.priceMonthly;
  return ids.reduce((sum, id) => sum + (getService(id)?.priceMonthly ?? 0), 0);
}
