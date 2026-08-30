import { getPrescriptionOptions } from "@/app/actions/medicines";
import { getTenantContext } from "@/lib/tenant";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sliders,
  ShieldCheck,
  Database,
  Layers,
  Sparkles,
  CheckCircle2,
  Lock,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [options, tenant] = await Promise.all([
    getPrescriptionOptions(),
    getTenantContext(),
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Sliders className="h-6 w-6 text-emerald-600" />
          Master Configuration & SaaS Settings
        </h1>
        <p className="text-sm text-slate-500">
          Configurable homeopathic potencies, dosage options, and multi-tenant security status
        </p>
      </div>

      {/* Tenant Security & Isolation Card */}
      <Card className="border-emerald-200 bg-emerald-50/40">
        <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                Tenant Isolation: ACTIVE & ENFORCED
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Current Workspace: <strong className="text-emerald-950">{tenant.tenantName}</strong> (Tenant ID: <code className="font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-emerald-300 text-emerald-900">{tenant.tenantId}</code>)
              </p>
              <p className="text-[11px] text-emerald-700 mt-1">
                All patient records, visits, and prescriptions are strictly scoped to this tenant ID with database-level cascade safety.
              </p>
            </div>
          </div>

          <Badge variant="success" className="shrink-0 self-start sm:self-center">
            Cascade Purge Safe
          </Badge>
        </CardContent>
      </Card>

      {/* Master Configuration Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Potency System */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-slate-900 flex items-center justify-between">
              <span>Configured Potency Scales</span>
              <Badge variant="potency">{options.potencies.length} Potencies</Badge>
            </CardTitle>
            <CardDescription>
              Centesimal (C), Decimal (X), 50 Millesimal (LM), and Mother Tinctures (Q).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {options.potencies.map((pot) => (
                <Badge key={pot} variant="potency">
                  {pot}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Medicine Forms */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-slate-900 flex items-center justify-between">
              <span>Medicine Forms</span>
              <Badge variant="default">{options.forms.length} Forms</Badge>
            </CardTitle>
            <CardDescription>
              Dispensary forms available during prescription formulation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {options.forms.map((f) => (
                <Badge key={f} variant="secondary">
                  {f}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Standard Doses */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-slate-900 flex items-center justify-between">
              <span>Standard Dosages</span>
              <Badge variant="default">{options.doses.length} Doses</Badge>
            </CardTitle>
            <CardDescription>
              Quantities per intake (pills, drops, tablets).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {options.doses.map((d) => (
                <Badge key={d} variant="default">
                  {d}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Frequencies */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-slate-900 flex items-center justify-between">
              <span>Administration Frequencies</span>
              <Badge variant="default">{options.frequencies.length} Frequencies</Badge>
            </CardTitle>
            <CardDescription>
              Intervals of remedy repetition.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {options.frequencies.map((freq) => (
                <Badge key={freq} variant="success">
                  {freq}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Standard Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-slate-900">
            Standard Patient Instructions & Advice
          </CardTitle>
          <CardDescription>
            Classical homeopathic dietary and administration rules.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {options.instructions.map((inst, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-800"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span>{inst}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
