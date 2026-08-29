import type { Metadata } from "next";
import { AppShell } from "@/components/eoc/shell/app-shell";

export const metadata: Metadata = {
  title: "IAETDS — Defense & Operations Console",
  description: "Cross-platform security monitoring, incident response, remediation, and audit evidence.",
};

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
