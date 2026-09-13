# AGENTS.md

> **HomeoRx SaaS — Project Operational Guidelines & Agent Contract**
> This file is the primary contract between human developers and AI coding agents operating in this repository. It defines core constraints, coding standards, memory synchronization rules, and architectural invariants.

---

## 1. Project Overview & Identity
- **Project Name**: HomeoRx SaaS (Multi-Tenant Homeopathic Clinical Prescription Suite)
- **Primary Tech Stack**: Next.js 15 (App Router), React 19, TypeScript, TailwindCSS, Prisma ORM, SQLite
- **Package Manager / Build Tool**: `npm`
- **Main Entry Points**:
  - `src/app/layout.tsx` (Global root layout with Urdu Nastaliq typography)
  - `src/app/(dashboard)/layout.tsx` (Protected doctor/admin workspace layout)
  - `src/app/login/page.tsx` (Authentication & 1-Click Demo entrypoint)
  - `src/app/(dashboard)/prescriptions/[id]/print/page.tsx` (Single-page A4 PDF clinical print generator)

---

## 2. Universal Agent Directives

1. **Memory Synchronization Rule (Crucial)**:
   - When new files, directories, dependencies, or architectural boundaries are introduced, you **must update** [PROJECT_MAP.md](./PROJECT_MAP.md) and [ARCHITECTURE.md](./ARCHITECTURE.md).
   - Never leave documentation stale after completing non-trivial changes.
2. **Stateless Cross-Lambda Execution**:
   - Authentication relies on **Stateless Cryptographic HMAC SHA-256 JWT Tokens** (`src/lib/auth.ts`).
   - Do NOT introduce stateful database session lookups that fail across ephemeral serverless lambda containers.
3. **Multi-Tenancy & Tenant Isolation**:
   - All patient and clinical queries for regular doctors must strictly scope to `tenantId` (`src/lib/tenant.ts`).
   - Super Admin accounts (`role === "SUPER_ADMIN"`) have global platform visibility and bypass demo creation quotas.
4. **Bilingual Urdu & English Nastaliq Standards**:
   - Always preserve bilingual formatting (`en • ur` or `en / ur`) using `.urdu-text`, `.urdu-inline`, and `.font-nastaliq`.
   - Never break RTL rendering or remove Noto Nastaliq Urdu font families.
5. **Strict Single-Page A4 Print Invariant**:
   - Prescriptions rendered via `PrescriptionRenderer` must fit exactly on a single A4 page (`minHeight: 272mm`, `maxHeight: 284mm`) without overflowing to page 2.
6. **Follow Standard Workflows**:
   - Refer to [.agents/workflows/](./.agents/workflows/) for standard procedures on auditing, testing, and feature planning.

---

## 3. Development & Verification Protocol

### Common Commands
- **Install Dependencies**: `npm install`
- **Generate Prisma Client**: `npx prisma generate`
- **Run Seed Database**: `npm run build` or `npx tsx prisma/seed.ts`
- **Run Dev Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Lint / Type Check**: `npm run lint`

### Verification Standards
- Always run `npm run build` before deploying to verify 0 TypeScript and Next.js compilation errors.
- Ensure `@media print` preserves full colors (`print-color-adjust: exact`) and strict A4 geometry.

---

## 4. Coding Standards & Conventions
- Maintain consistent functional component architecture in React / Next.js.
- Ensure server actions in `src/app/actions/` validate payloads with Zod schemas from `src/lib/validations.ts`.
- Maintain documentation integrity: preserve docstrings, type annotations, and existing comments unless updating them for correctness.
- Keep components modular, decoupled, and testable.

---

## 5. Architecture Decision Records (ADRs)
- Significant architectural modifications must be documented under [docs/decisions/](./docs/decisions/) using the standard ADR format.


