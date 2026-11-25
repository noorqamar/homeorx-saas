# ARCHITECTURE.md

> **System Architecture, Subsystem Data Flow & Invariants**
> This document outlines the technical design, component boundaries, runtime data flows, and architectural invariants of HomeoRx & Dr. Noor ul Qamar Homeopathy Care. AI agents must preserve these invariants during all code generation, refactoring, and feature additions.

---

## 1. System Overview
- **Practice / Brand Name**: Dr. Noor ul Qamar Homeopathy Care
- **Doctor**: Dr. Noor ul Qamar (D.H.M.S, R.H.M.P) — 10 Years Clinical Experience
- **Architecture Pattern**: Dual-Tier Architecture:
  1. **Public Patient Medical Portal**: High-speed, SEO-optimized, responsive public clinic website (SSG/SSR, Schema markup, WhatsApp engine, 66 clinical condition guides).
  2. **Protected Doctor SaaS Suite**: Multi-tenant clinical management suite, patient records, master homeopathic repertory, and luxury Single-Page A4 PDF prescription generator.
- **Primary Tech Stack**: Next.js 15 (App Router), React 19, TypeScript, TailwindCSS, Prisma ORM, SQLite
- **Visual Design Identity**: Forest green (`#143e2e`), Sage green (`#588157`), Warm Ivory (`#faf8f2`), White, and restrained Gold accents (`#c5a059`). Typography: Playfair Display serif headings and Plus Jakarta Sans body.

---

## 2. Component Topology & Data Flow

```mermaid
flowchart TD
    subgraph ClientLayer [Client & Public Traffic]
        PatientVisitor([Patient / Mobile / Desktop])
        SearchCrawler([Google / Search Engine Crawlers])
        DoctorUser([Doctor / Clinic Staff])
    end

    subgraph EdgeRouting [Edge & Middleware Layer]
        AuthMiddleware[src/middleware.ts]
    end

    subgraph PublicPortal [Public Clinic Website - Dr. Noor ul Qamar]
        HomePage[Homepage /]
        AboutPage[/about]
        WomensHealth[/womens-health]
        TreatmentsDir[/treatments & /treatments/:slug]
        DiseaseKits[/disease-kits]
        BlogEngine[/blog & /blog/:slug]
        ContactPage[/contact with Google Map]
        WhatsAppEngine[WhatsApp Appointment Generator]
        SchemaEngine[JSON-LD Schema Markup]
    end

    subgraph DoctorSaaS [Protected Clinic Workspace]
        DashboardView[/dashboard]
        PatientRegistry[/patients]
        PrescriptionStudio[/prescriptions/new]
        SinglePageA4Print[/prescriptions/:id/print]
        RepertoryDatabase[/medicines & /repertory]
    end

    subgraph StorageLayer [Persistence & Models]
        StaticRepositories[src/data/ - Treatments, Kits, FAQs, Clinic Info]
        PrismaORM[Prisma Client ORM]
        SQLiteDB[(SQLite Database)]
    end

    PatientVisitor -->|Public HTTP| EdgeRouting
    SearchCrawler -->|SEO Sitemap / Robots| EdgeRouting
    DoctorUser -->|Session Cookie| EdgeRouting

    EdgeRouting -->|Public Routes| PublicPortal
    EdgeRouting -->|Protected Routes| DoctorSaaS

    PublicPortal --> StaticRepositories
    DoctorSaaS --> PrismaORM
    PrismaORM --> SQLiteDB
```

---

## 3. Core Architectural Invariants

1. **Strict Public vs. Protected Route Boundary**:
   - The public clinic website routes (`/`, `/about`, `/womens-health`, `/treatments/**`, `/disease-kits`, `/blog/**`, `/contact`, `/privacy-policy`, `/terms`, `/cancellation-refund`) are entirely public and must never require authentication cookies.
   - Protected clinical SaaS routes (`/dashboard`, `/patients/**`, `/prescriptions/**`, `/medicines/**`, `/repertory/**`, `/clinic/**`, `/admin/**`, `/settings/**`) are protected by `src/middleware.ts` and require a valid `homeorx_session_token`.

2. **Responsible Medical Language & Ethics Invariant**:
   - All medical copy for Dr. Noor ul Qamar Homeopathy Care must strictly adhere to responsible medical ethics:
     - No &ldquo;permanent cure&rdquo; claims or 100% guarantees.
     - Never advise patients to discontinue or alter prescribed conventional medications.
     - Always include explicit conventional medical caution and emergency red-flag symptoms.

3. **Floating WhatsApp & Direct Appointment Integration**:
   - The floating WhatsApp button must remain persistent across all public pages, configured to open `https://wa.me/923004627881`.
   - The appointment form generates formatted clinical WhatsApp messages directly linking patients to the clinic.

4. **SEO & Structured Data Architecture**:
   - Every public condition page (`/treatments/[slug]`) and blog page (`/blog/[slug]`) is pre-rendered with Static Site Generation (SSG) via `generateStaticParams`.
   - Dynamic JSON-LD structured data is injected for `LocalBusiness`, `Physician`, `MedicalClinic`, `FAQPage`, and `BlogPosting`.

5. **Single-Page A4 PDF Print Invariant (Preserved)**:
   - For prescriptions generated in the doctor workspace (`/prescriptions/[id]/print`), the layout must fit strictly onto a single A4 page (`minHeight: 272mm`, `maxHeight: 284mm`) with zero page-2 overflow.
