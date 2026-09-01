"use client";
import * as React from "react";
import { Check, KeyRound, Search, X } from "lucide-react";
import { PageHeader } from "@/components/eoc/page-header";
import { SectionHeader, StatusPill, Surface, type Tone } from "@/components/eoc/primitives";
import { useResourceList } from "@/hooks/use-resource";
import type { User } from "@/lib/types";

const statusTone:Record<string,Tone>={active:"success",invited:"info",suspended:"danger"};
const roleLabel:Record<string,string>={super_admin:"Workspace Owner",security_analyst:"Security Analyst",maintenance_engineer:"Maintenance Engineer",operations_manager:"Operations Manager",viewer:"Viewer"};
export default function IdentityPage(){
 const [query,setQuery]=React.useState(""); const list=useResourceList<User>("users",{limit:100,search:query}); const users=list.data?.data||[];
 return <div className="space-y-6"><PageHeader eyebrow="Tenant identity" title="Identity & Access" description="Real users authorized for this workspace. Invitations will be enabled only after secure email delivery is configured."/>
 <div className="grid grid-cols-2 gap-4 lg:grid-cols-4"><Stat label="Members" value={users.length}/><Stat label="MFA enabled" value={users.filter(u=>u.mfaEnabled).length}/><Stat label="Pending invites" value={users.filter(u=>u.status==='invited').length}/><Stat label="Suspended" value={users.filter(u=>u.status==='suspended').length}/></div>
 <Surface className="p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><SectionHeader title="Members & roles" description="Tenant-scoped directory from the IAETDS identity service"/><div className="flex h-9 items-center gap-2 rounded-lg border border-eoc-border bg-white px-3 sm:w-64"><Search className="h-4 w-4 text-eoc-muted"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search members…" className="flex-1 bg-transparent text-sm outline-none"/></div></div>
 <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[680px]"><thead><tr className="text-left text-[11px] uppercase tracking-wide text-eoc-muted"><th className="pb-3">Member</th><th className="pb-3">Role</th><th className="pb-3">Department</th><th className="pb-3">MFA</th><th className="pb-3">Last active</th><th className="pb-3">Status</th></tr></thead><tbody>{list.isLoading?<tr><td colSpan={6} className="py-8 text-center text-sm text-eoc-muted">Loading authorized users…</td></tr>:users.length===0?<tr><td colSpan={6} className="py-8 text-center text-sm text-eoc-muted">No authorized users found.</td></tr>:users.map(u=><tr key={u._id} className="border-t border-eoc-border text-sm"><td className="py-3 pr-4"><p className="font-medium text-eoc-fg">{u.name}</p><p className="text-xs text-eoc-muted">{u.email}</p></td><td className="py-3 pr-4">{roleLabel[u.role]||u.role}</td><td className="py-3 pr-4">{u.department||'—'}</td><td className="py-3 pr-4">{u.mfaEnabled?<Check className="h-4 w-4 text-eoc-success"/>:<X className="h-4 w-4 text-eoc-muted"/>}</td><td className="py-3 pr-4 text-eoc-muted">{u.lastActiveAt?new Date(u.lastActiveAt).toLocaleString('en-IN'):'Never'}</td><td className="py-3"><StatusPill tone={statusTone[u.status]}>{u.status}</StatusPill></td></tr>)}</tbody></table></div></Surface></div>
}
function Stat({label,value}:{label:string;value:number}){return <Surface className="p-5"><div className="flex items-center gap-2"><KeyRound className="h-4 w-4 text-eoc-muted"/><p className="text-xs text-eoc-muted">{label}</p></div><p className="mt-1.5 text-2xl font-semibold text-eoc-fg">{value}</p></Surface>}
