import Link from "next/link";
import { searchRepertoryRubrics } from "@/app/actions/medicines";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Filter, Sparkles, PlusCircle } from "lucide-react";

export const dynamic = "force-dynamic";

const repertorySections = [
  "ALL",
  "Mind",
  "Head",
  "Vertigo",
  "Eyes",
  "Ears",
  "Nose",
  "Face",
  "Mouth",
  "Throat",
  "Stomach",
  "Abdomen",
  "Rectum",
  "Urinary",
  "Respiratory",
  "Cough",
  "Chest",
  "Back",
  "Extremities",
  "Sleep",
  "Fever",
  "Skin",
  "Generalities",
];

export default async function RepertoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; section?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const section = resolvedParams.section || "ALL";

  const rubrics = await searchRepertoryRubrics(query, section);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-emerald-600" />
            Homeopathic Repertory Browser
          </h1>
          <p className="text-sm text-slate-500">
            Search repertory chapters, rubrics, sub-rubrics, and remedy gradings
          </p>
        </div>

        <Link href="/prescriptions/new">
          <Button variant="primary" size="sm">
            <PlusCircle className="h-4 w-4 mr-1.5" />
            + New Prescription
          </Button>
        </Link>
      </div>

      {/* Search & Section Filter Bar */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <form method="GET" className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search rubrics e.g. headache, anxiety, motion, sweet desire..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <input type="hidden" name="section" value={section} />

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button type="submit" variant="secondary" size="md" className="flex-1 sm:flex-initial">
                Search Rubrics
              </Button>
              {(query || section !== "ALL") && (
                <Link href="/repertory">
                  <Button variant="ghost" size="md">
                    Clear
                  </Button>
                </Link>
              )}
            </div>
          </form>

          {/* Section Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1">
            {repertorySections.map((sec) => {
              const isSelected = section === sec;
              return (
                <Link
                  key={sec}
                  href={`/repertory?section=${encodeURIComponent(sec)}${
                    query ? `&q=${encodeURIComponent(query)}` : ""
                  }`}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    isSelected
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {sec}
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Rubrics Results */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
          <span>{rubrics.length} Rubrics Found</span>
          {section !== "ALL" && <span>Section: {section}</span>}
        </div>

        <div className="grid grid-cols-1 gap-3">
          {rubrics.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-slate-400 text-sm">
                No rubrics found for this search criteria.
              </CardContent>
            </Card>
          ) : (
            rubrics.map((r) => (
              <Card key={r.id} className="hover:border-slate-300 transition-all">
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Badge variant="primary" className="text-[10px]">
                        {r.section}
                      </Badge>
                      {r.source && (
                        <span className="text-[11px] text-slate-400 font-mono">
                          Source: {r.source}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-sm text-slate-900">
                      {r.rubric}
                    </h3>

                    {r.relatedMedicines && (
                      <div className="text-xs pt-1 flex flex-wrap items-center gap-1.5">
                        <span className="text-slate-500 font-semibold">
                          Remedies:
                        </span>
                        {r.relatedMedicines.split(",").map((med, idx) => {
                          const trimmed = med.trim();
                          const isHighGrade = trimmed.includes("(3)");
                          return (
                            <span
                              key={idx}
                              className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                                isHighGrade
                                  ? "bg-rose-50 text-rose-800 font-bold border border-rose-200"
                                  : "bg-slate-100 text-slate-700 font-medium"
                              }`}
                            >
                              {trimmed}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <Link href={`/prescriptions/new`}>
                    <Button size="sm" variant="outline" className="text-xs shrink-0">
                      Prescribe
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
