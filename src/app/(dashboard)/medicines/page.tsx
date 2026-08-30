import Link from "next/link";
import { getMedicines, createMedicine } from "@/app/actions/medicines";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Database,
  Search,
  Plus,
  BookOpen,
  Sparkles,
  Layers,
  FileSpreadsheet,
} from "lucide-react";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function MedicinesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const page = resolvedParams.page ? Number(resolvedParams.page) : 1;

  const { medicines, total, totalPages } = await getMedicines(query, page, 40);

  async function handleAddMedicine(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const abbreviation = formData.get("abbreviation") as string;
    const category = formData.get("category") as string;
    const commonName = formData.get("commonName") as string;
    const latinName = formData.get("latinName") as string;

    if (!name) return;

    await createMedicine({
      name,
      abbreviation,
      category,
      commonName,
      latinName,
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Database className="h-6 w-6 text-emerald-600" />
            Homeopathic Medicine Database
          </h1>
          <p className="text-sm text-slate-500">
            Authoritative repertory-ready medicine catalog with abbreviations & classifications
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/repertory">
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-1.5" />
              Repertory Module
            </Button>
          </Link>
        </div>
      </div>

      {/* Search & Add Remedy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Search & Remedy Table (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <Card>
            <CardContent className="p-4">
              <form method="GET" className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="q"
                    defaultValue={query}
                    placeholder="Search remedy name, abbreviation (Acon.), common name, or category..."
                    className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <Button type="submit" variant="secondary" size="md">
                  Search
                </Button>
                {query && (
                  <Link href="/medicines">
                    <Button variant="ghost" size="md">
                      Clear
                    </Button>
                  </Link>
                )}
              </form>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
            <span>{total} Total Remedies In Catalog</span>
            {query && <span>Filtered by &quot;{query}&quot;</span>}
          </div>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 font-semibold uppercase text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Remedy Name</th>
                    <th className="py-3 px-4">Abbreviation</th>
                    <th className="py-3 px-4">Common Name / Source</th>
                    <th className="py-3 px-4">Kingdom / Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medicines.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400">
                        No remedies matched your search query.
                      </td>
                    </tr>
                  ) : (
                    medicines.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4">
                          <strong className="font-bold text-slate-900 text-sm">
                            {m.name}
                          </strong>
                          {m.latinName && m.latinName !== m.name && (
                            <span className="block text-[11px] text-slate-400 italic">
                              {m.latinName}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-indigo-700">
                          {m.abbreviation || "—"}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {m.commonName || "—"}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              m.category === "Plant"
                                ? "success"
                                : m.category === "Mineral"
                                ? "secondary"
                                : m.category === "Nosode"
                                ? "danger"
                                : "default"
                            }
                          >
                            {m.category || "Homeopathic"}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Quick Add Custom Remedy Form (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Plus className="h-4 w-4 text-emerald-600" />
                Add Custom Remedy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action={handleAddMedicine} className="space-y-3">
                <Input
                  label="Remedy Name"
                  name="name"
                  required
                  placeholder="e.g. Baryta Muriatica"
                />

                <Input
                  label="Standard Abbreviation"
                  name="abbreviation"
                  placeholder="e.g. Bar-m."
                />

                <Input
                  label="Common Name"
                  name="commonName"
                  placeholder="e.g. Barium Chloride"
                />

                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Kingdom / Category
                  </label>
                  <select
                    name="category"
                    defaultValue="Mineral"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Plant">Plant (Vegetable Kingdom)</option>
                    <option value="Mineral">Mineral / Chemical</option>
                    <option value="Animal">Animal Kingdom</option>
                    <option value="Nosode">Nosode (Disease Product)</option>
                    <option value="Sarcode">Sarcode (Healthy Tissue)</option>
                    <option value="Imponderabilia">Imponderabilia</option>
                  </select>
                </div>

                <Button type="submit" variant="primary" size="md" className="w-full mt-2">
                  <Plus className="h-4 w-4 mr-1.5" />
                  Save Remedy to Database
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Import / Export Info Box */}
          <Card className="bg-slate-50 border-dashed border-slate-300">
            <CardContent className="p-4 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                Authoritative Master Dataset
              </div>
              <p>
                HomeoRx is pre-seeded with 130+ standard classical remedies. The database schema supports importing thousands of additional materia medica entries via structured CSV/JSON.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
