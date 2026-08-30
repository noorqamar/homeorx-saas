"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function searchMedicines(term: string) {
  if (!term || term.trim().length === 0) {
    return db.medicine.findMany({
      where: { active: true },
      take: 30,
      orderBy: { name: "asc" },
    });
  }

  const clean = term.trim();

  // Search across name, abbreviation, commonName, latinName
  const results = await db.medicine.findMany({
    where: {
      active: true,
      OR: [
        { name: { contains: clean } },
        { abbreviation: { contains: clean } },
        { commonName: { contains: clean } },
        { latinName: { contains: clean } },
      ],
    },
    take: 50,
    orderBy: { name: "asc" },
  });

  const query = clean.toLowerCase();

  // Smart sort:
  // 1. Exact start with name
  // 2. Exact start with abbreviation
  // 3. Alphabetical
  return results.sort((a, b) => {
    const aNameStart = a.name.toLowerCase().startsWith(query);
    const bNameStart = b.name.toLowerCase().startsWith(query);
    if (aNameStart && !bNameStart) return -1;
    if (!aNameStart && bNameStart) return 1;

    const aAbbrStart = a.abbreviation?.toLowerCase().startsWith(query) ?? false;
    const bAbbrStart = b.abbreviation?.toLowerCase().startsWith(query) ?? false;
    if (aAbbrStart && !bAbbrStart) return -1;
    if (!aAbbrStart && bAbbrStart) return 1;

    return a.name.localeCompare(b.name);
  });
}

export async function getMedicines(query?: string, page = 1, pageSize = 40) {
  const where: any = {};
  if (query && query.trim().length > 0) {
    const clean = query.trim();
    where.OR = [
      { name: { contains: clean } },
      { abbreviation: { contains: clean } },
      { commonName: { contains: clean } },
      { category: { contains: clean } },
    ];
  }

  const [total, medicines] = await Promise.all([
    db.medicine.count({ where }),
    db.medicine.findMany({
      where,
      orderBy: { name: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return { total, medicines, totalPages: Math.ceil(total / pageSize) };
}

export async function createMedicine(data: {
  name: string;
  latinName?: string;
  commonName?: string;
  abbreviation?: string;
  category?: string;
  description?: string;
}) {
  const med = await db.medicine.create({
    data: {
      name: data.name.trim(),
      latinName: data.latinName?.trim() || null,
      commonName: data.commonName?.trim() || null,
      abbreviation: data.abbreviation?.trim() || null,
      category: data.category?.trim() || null,
      description: data.description?.trim() || null,
    },
  });

  revalidatePath("/medicines");
  return med;
}

export async function getPrescriptionOptions() {
  const [potencies, forms, doses, frequencies, instructions] = await Promise.all([
    db.potency.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" } }),
    db.medicineForm.findMany({ where: { active: true }, orderBy: { id: "asc" } }),
    db.dose.findMany({ where: { active: true }, orderBy: { id: "asc" } }),
    db.frequency.findMany({ where: { active: true }, orderBy: { id: "asc" } }),
    db.instruction.findMany({ where: { active: true }, orderBy: { id: "asc" } }),
  ]);

  return {
    potencies: potencies.map((p) => p.name),
    forms: forms.map((f) => f.name),
    doses: doses.map((d) => d.name),
    frequencies: frequencies.map((freq) => freq.name),
    instructions: instructions.map((i) => i.name),
  };
}

export async function searchRepertoryRubrics(term?: string, section?: string) {
  const where: any = { active: true };
  if (section && section !== "ALL") {
    where.section = section;
  }
  if (term && term.trim().length > 0) {
    const clean = term.trim();
    where.OR = [
      { rubric: { contains: clean } },
      { relatedMedicines: { contains: clean } },
      { section: { contains: clean } },
    ];
  }

  return db.repertoryRubric.findMany({
    where,
    take: 50,
    orderBy: [{ section: "asc" }, { rubric: "asc" }],
  });
}
