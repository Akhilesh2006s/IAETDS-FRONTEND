"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ServiceId } from "./services";

export type InfraHost = {
  label: string;
  host: string;
  port: string;
  username: string;
  authMethod: "password" | "ssh_key";
  secret: string;
};

export type OnboardDraft = {
  services: ServiceId[];
  companyName: string;
  contactName: string;
  workEmail: string;
  phone: string;
  primaryDomain: string;
  additionalDomains: string;
  backendApiUrl: string;
  stagingApiUrl: string;
  webhookUrl: string;
  hosts: InfraHost[];
  notes: string;
  submittedAt?: string;
  referenceId?: string;
};

type OnboardState = OnboardDraft & {
  setServices: (ids: ServiceId[]) => void;
  toggleService: (id: ServiceId) => void;
  patch: (partial: Partial<OnboardDraft>) => void;
  setHosts: (hosts: InfraHost[]) => void;
  markSubmitted: (referenceId: string) => void;
  reset: () => void;
};

const emptyHost = (): InfraHost => ({
  label: "Production",
  host: "",
  port: "22",
  username: "root",
  authMethod: "password",
  secret: "",
});

const initial: OnboardDraft = {
  services: ["security"],
  companyName: "",
  contactName: "",
  workEmail: "",
  phone: "",
  primaryDomain: "",
  additionalDomains: "",
  backendApiUrl: "",
  stagingApiUrl: "",
  webhookUrl: "",
  hosts: [emptyHost()],
  notes: "",
};

export const useOnboardStore = create<OnboardState>()(
  persist(
    (set, get) => ({
      ...initial,
      setServices: (ids) => set({ services: ids }),
      toggleService: (id) => {
        const current = get().services;
        if (id === "ops_bundle") {
          set({ services: current.includes("ops_bundle") ? [] : ["ops_bundle"] });
          return;
        }
        const withoutBundle = current.filter((s) => s !== "ops_bundle");
        if (withoutBundle.includes(id)) {
          set({ services: withoutBundle.filter((s) => s !== id) });
        } else {
          set({ services: [...withoutBundle, id] });
        }
      },
      patch: (partial) => set(partial),
      setHosts: (hosts) => set({ hosts }),
      markSubmitted: (referenceId) =>
        set({ submittedAt: new Date().toISOString(), referenceId }),
      reset: () => set({ ...initial, hosts: [emptyHost()], submittedAt: undefined, referenceId: undefined }),
    }),
    {
      name: "iaetds-onboard",
      // Never persist organization, infrastructure, host, or credential data in the browser.
      partialize: (state) => ({ services: state.services }),
    },
  ),
);
