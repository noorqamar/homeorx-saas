# PROJECT_MAP.md

> **Repository Structural Topology & Inventory**
> This document maps the physical layout of the repository, key files, and architectural roles. AI agents must consult this map before searching the repository and update it when altering directory structures.

---

## 1. High-Level Summary
- **Repository Root**: `Homeopathy`
- **Detected Language(s)**: CSS, TypeScript (React), JavaScript, TypeScript
- **Total Tracked Directories**: 18
- **Total Tracked Files**: 31
- **Last Synchronized**: 2026-09-13 11:24:29

---

## 2. Directory Taxonomy & Purpose

| Directory Path | Role / Domain | Key Contents |
| :--- | :--- | :--- |
| `.agents/workflows/` | AI Agent & Automation | Standard operational runbooks (`audit.md`, `test-and-verify.md`, `feature-plan.md`) |
| `docs/decisions/` | Architecture Decision Records | Formal architectural decisions and historical context (`0001-record-architecture-decisions.md`) |
| `files/format/` | Clinical Assets & References | Letterhead specifications and clinical formatting references |
| `public/images/` | High-Resolution Photography | Elite clinical hospital backgrounds, doctor consultation, and portrait assets (`clinic-bg.jpg`, etc.) |
| `prisma/` | Database Schema & Seeding | Relational SQLite schema definition (`schema.prisma`) and master database seeder (`seed.ts`) |
| `scripts/` | Tooling & Build Scripts | Binary database bundler (`generate-db-binary.js`) and test verification suite (`verify-suite.ts`) |
| `src/app/` | Next.js 15 App Router | Route handlers, pages, layouts, and server actions (`(dashboard)`, `login`, `register`, `actions/`) |
| `src/components/` | React UI & Templates | UI primitives (`ui/`), workspace layouts (`layout/`), and letterhead engines (`prescription-templates/`) |
| `src/lib/` | Core Business Engines | Stateless auth (`auth.ts`), database client (`db.ts`), multi-tenancy (`tenant.ts`), feature gating (`feature-gate.ts`), validations (`validations.ts`) |
| `src/types/` | TypeScript Definitions | Shared application and domain interface contracts |

---

## 3. Key Files & Entry Points

| File Path | Description | Role |
| :--- | :--- | :--- |
| `src/app/layout.tsx` | Global root layout | Injects Noto Nastaliq Urdu fonts and global CSS |
| `src/app/(dashboard)/layout.tsx` | Protected clinic workspace layout | Verifies HMAC-SHA256 session token and injects tenant context |
| `src/app/login/page.tsx` | Authentication & Demo entry | 1-Click Instant Demo login & credentials authentication |
| `src/components/dashboard/behance-dashboard-view.tsx` | Behance Health Dashboard Engine | 6-card medical UI (Donut summary, Today Appointment, Next Patient, Reviews, Requests, Calendar) & clinical tools |
| `src/app/(dashboard)/prescriptions/[id]/print/print-client.tsx` | Single-page A4 PDF renderer | Single-page A4 print orchestrator with luxury layout presets |
| `src/components/prescription-templates/prescription-renderer.tsx` | Prescription Letterhead Engine | Luxury clinical letterhead with dermatome chart and amber dropper bottle |
| `src/lib/auth.ts` | Stateless JWT & Crypto Engine | HMAC-SHA256 token signing and verification across serverless lambdas |
| `src/lib/firebase.ts` | Firebase Client & Auth Setup | Google OAuth popup, email sign-in/up, and auth state management |
| `src/lib/db.ts` | Database & Runtime Migration | Prisma client initialization with automatic `ensureDbSchema()` runtime migration |
| `src/lib/tenant.ts` | Multi-Tenant Scoping | Extracts tenant/doctor context and enforces isolation boundaries |
| `src/lib/validations.ts` | Zod Validation Schemas | Request validation for patients, prescriptions, and clinic profiles |
| `src/middleware.ts` | Next.js Edge Auth Middleware | Strict route protection blocking unauthenticated access to all clinical features |
| `prisma/schema.prisma` | Relational Data Model | Complete Prisma schema for Tenants, Doctors, Patients, Prescriptions, Remedies |

---

## 4. Dependencies & Manifests
- **Primary Manifest**: `package.json`
- **Key Dependencies**:
- `@prisma/client`
- `clsx`
- `date-fns`
- `lucide-react`
- `next`
- `react`
- `react-dom`
- `react-hook-form`
- `tailwind-merge`
- `zod`

---

## 5. Physical File Tree (Filtered)
```text
Homeopathy/
├── .vercel/
│   ├── project.json
│   └── README.txt
├── files/
│   ├── format/
│   │   └── prescription-format-redesign-prompt.md
│   └── prescription-format-redesign-prompt.md
├── prisma/
│   ├── prisma/
│   │   └── dev.db
│   ├── dev.db
│   ├── schema.prisma
│   └── seed.ts
├── scripts/
│   ├── generate-db-binary.js
│   └── verify-suite.ts
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   ├── actions/
│   │   ├── login/
│   │   ├── register/
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── prescription-templates/
│   │   ├── ui/
│   │   └── upgrade-modal.tsx
│   ├── lib/
│   │   ├── account-lifecycle.ts
│   │   ├── auth.ts
│   │   ├── db-seed-binary.ts
│   │   ├── db.ts
│   │   ├── feature-gate.ts
│   │   ├── tenant.ts
│   │   ├── utils.ts
│   │   └── validations.ts
│   └── types/
... (10 items omitted for brevity)
```

---

## 6. Maintenance Protocol
Whenever a developer or agent adds, renames, moves, or deletes a directory or major entry point:
1. Update the table in Section 2 (Directory Taxonomy).
2. Update Section 3 (Key Files & Entry Points) if new entry points or configuration files were created.
3. Refresh the file tree snippet if core structure shifted.
