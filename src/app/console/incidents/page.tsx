"use client";
import { Siren } from "lucide-react";
import { PageHeader } from "@/components/eoc/page-header";
import { EmptyState, StatusPill, Surface, type Tone } from "@/components/eoc/primitives";
import { useResourceList } from "@/hooks/use-resource";
import type { Incident } from "@/lib/types";

const severityTone:Record<string,Tone>={sev1:"danger",sev2:"warning",sev3:"info",sev4:"neutral"};
export default function IncidentsPage(){
 const list=useResourceList<Incident>("incidents",{limit:100,sort:"-detectedAt"}); const incidents=list.data?.data||[];
 return <div className="space-y-6"><PageHeader eyebrow="Production response" title="Incidents" description="Real incidents recorded for this client workspace. Provider alerts appear only after a connection is verified."/>
 {list.isLoading?<Surface className="p-10 text-center text-sm text-eoc-muted">Loading incidents…</Surface>:incidents.length===0?<EmptyState icon={Siren} title="No incidents recorded" description="There are no production incidents in this workspace. Connect a provider to begin receiving verified alerts."/>:<div className="space-y-3">{incidents.map((i)=><Surface key={i._id} className="p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex items-center gap-2"><span className="font-mono text-xs text-eoc-muted">{i.incidentId}</span><StatusPill tone={severityTone[i.severity]||"neutral"}>{i.severity.toUpperCase()}</StatusPill><StatusPill tone={i.status==="resolved"?"success":"warning"}>{i.status.replaceAll("_"," ")}</StatusPill></div><h2 className="mt-2 font-semibold text-eoc-fg">{i.title}</h2>{i.summary&&<p className="mt-1 text-sm text-eoc-fg2">{i.summary}</p>}</div><div className="text-right text-xs text-eoc-muted"><p>{new Date(i.detectedAt||i.createdAt||Date.now()).toLocaleString()}</p><p className="mt-1">{i.category||"Operational"}</p></div></div>{i.rootCause&&<div className="mt-4 rounded-xl border border-eoc-border bg-slate-50 p-3"><p className="text-xs font-medium text-eoc-fg">Root cause</p><p className="mt-1 text-sm text-eoc-fg2">{i.rootCause}</p></div>}</Surface>)}</div>}</div>;
}
