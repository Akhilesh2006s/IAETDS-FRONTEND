"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Activity, Boxes, Cloud, Database, ShieldAlert, Wrench } from "lucide-react";
import { PageHeader, EButton } from "@/components/eoc/page-header";
import { EmptyState, StatusPill, Surface } from "@/components/eoc/primitives";
import { useDashboard } from "@/hooks/use-analytics";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

type Connection={provider:"digitalocean"|"mongodb_atlas";status:string;lastSuccessfulAt?:string;summary?:{dropletCount?:number;clusterCount?:number}};
export default function DashboardPage(){
 const user=useAuthStore((s)=>s.user); const dashboard=useDashboard();
 const connections=useQuery<Connection[]>({queryKey:["provider-connections"],queryFn:async()=>{const {data}=await api.get("/provider-connections");return data.data}});
 const k=dashboard.data?.kpis; const connected=(connections.data||[]).filter(c=>c.status==="connected");
 if(dashboard.isLoading||connections.isLoading)return <Surface className="p-10 text-center text-sm text-eoc-muted">Loading workspace status…</Surface>;
 return <div className="space-y-6"><PageHeader eyebrow={(user?.workspaceName||"Client workspace")+" · Live status"} title="Dashboard" description="Only verified records and connected-provider information are shown here." actions={<EButton variant="primary" asChild><Link href="/console/connections">Manage connections</Link></EButton>}/>
 <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={Boxes} label="Registered assets" value={k?.totalAssets||0}/><Metric icon={Cloud} label="Connected providers" value={connected.length}/><Metric icon={ShieldAlert} label="Open critical incidents" value={k?.criticalIncidents||0}/><Metric icon={Wrench} label="Open service tickets" value={k?.openTickets||0}/></div>
 <div className="grid gap-4 lg:grid-cols-2">{(["digitalocean","mongodb_atlas"] as const).map((p)=>{const c=connections.data?.find(x=>x.provider===p),Icon=p==="digitalocean"?Cloud:Database,name=p==="digitalocean"?"DigitalOcean":"MongoDB Atlas";return <Surface key={p} className="p-5"><div className="flex items-start gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-eoc-accent/10"><Icon className="h-5 w-5 text-eoc-accent"/></span><div className="flex-1"><div className="flex items-center justify-between gap-3"><h2 className="font-semibold text-eoc-fg">{name}</h2><StatusPill tone={c?.status==="connected"?"success":c?.status==="error"?"danger":"neutral"}>{c?.status||"Not connected"}</StatusPill></div>{c?.status==="connected"?<><p className="mt-2 text-sm text-eoc-fg2">{p==="digitalocean"?(c.summary?.dropletCount||0)+" Droplets discovered":(c.summary?.clusterCount||0)+" clusters discovered"}</p><p className="mt-1 text-xs text-eoc-muted">Last verified {c.lastSuccessfulAt?new Date(c.lastSuccessfulAt).toLocaleString():"—"}</p></>:<p className="mt-2 text-sm text-eoc-fg2">No telemetry is shown until a read-only connection is verified.</p>}</div></div></Surface>})}</div>
 {(k?.totalAssets||0)===0&&connected.length===0?<EmptyState icon={Activity} title="Workspace awaiting connections" description="Register client assets and connect DigitalOcean or MongoDB Atlas to begin verified monitoring." action={<EButton variant="primary" asChild><Link href="/console/connections">Connect provider</Link></EButton>}/>:<Surface className="p-5"><h2 className="font-semibold text-eoc-fg">Current verified records</h2><div className="mt-4 grid gap-3 sm:grid-cols-3"><Fact label="Operational asset records" value={k?.activeSystems||0}/><Fact label="Open tickets" value={k?.openTickets||0}/><Fact label="Recorded security events" value={dashboard.data?.recentSecurity.length||0}/></div><p className="mt-4 text-xs text-eoc-muted">Availability, performance, spend and security scores remain hidden until calculated from connected provider telemetry.</p></Surface>}</div>;
}
function Metric({icon:Icon,label,value}:{icon:typeof Boxes;label:string;value:number}){return <Surface className="p-5"><Icon className="h-5 w-5 text-eoc-accent"/><p className="mt-4 text-3xl font-semibold text-eoc-fg">{value}</p><p className="mt-1 text-sm text-eoc-muted">{label}</p></Surface>}
function Fact({label,value}:{label:string;value:number}){return <div className="rounded-xl border border-eoc-border bg-slate-50 p-4"><p className="text-2xl font-semibold text-eoc-fg">{value}</p><p className="mt-1 text-xs text-eoc-muted">{label}</p></div>}
