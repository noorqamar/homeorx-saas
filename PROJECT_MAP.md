# PROJECT_MAP.md

> **Repository Structural Topology & Inventory**
> This document maps the physical layout of the repository, key files, and architectural roles. AI agents must consult this map before searching the repository and update it when altering directory structures.

---

## 1. High-Level Summary
- **Repository Root**: `Homeopathy`
- **Detected Language(s)**: TypeScript (React 19), CSS (TailwindCSS), Next.js 15 (App Router), Prisma
- **Brand / Practice**: Dr. Noor ul Qamar Homeopathy Care
- **Doctor**: Dr. Noor ul Qamar (D.H.M.S, R.H.M.P) — 10 Years of Experience
- **Primary Canonical Domain**: `https://dr.noorulqamar.com`
- **Total Tracked Directories**: 20+
- **Total Tracked Files**: 45+
- **Last Synchronized**: 2026-11-26 (Enterprise Security Hardening & 100% Medical SEO Optimization)

---

## 2. Directory Taxonomy & Purpose

| Directory Path | Role / Domain | Key Contents |
| :--- | :--- | :--- |
| `src/app/` | Public Clinic Site & SaaS Pages | Homepage (`page.tsx`), `/about`, `/womens-health`, `/treatments`, `/treatments/[slug]`, `/disease-kits`, `/blog`, `/blog/[slug]`, `/contact`, `/privacy-policy`, `/terms`, `/cancellation-refund`, `/sitemap.ts`, `/robots.ts` |
| `src/app/(dashboard)/` | Protected Doctor SaaS Workspace | Dashboard (`/dashboard`), `/patients`, `/prescriptions`, `/medicines`, `/repertory`, `/clinic`, `/admin`, `/settings` |
| `src/components/public/` | Public Website Components | `site-header.tsx`, `site-footer.tsx`, `floating-whatsapp.tsx`, `appointment-form.tsx`, `doctor-card.tsx`, `schema-markup.tsx` |
| `src/data/` | Centralized Practice Data Models | `clinic-info.ts`, `treatments.ts` (66 conditions), `disease-kits.ts`, `blog-posts.ts`, `faqs.ts`, `reviews.ts` |
| `src/components/dashboard/` | Doctor Dashboard UI | Behance-inspired clean clinical health dashboard view (`behance-dashboard-view.tsx`) |
| `src/components/layout/` | Workspace Layout Components | Sidebar navigation (`sidebar.tsx`), topbar (`topbar.tsx`), shell (`dashboard-shell.tsx`) |
| `src/components/prescription-templates/` | Prescription Print Engine | Single-Page A4 PDF letterhead generator (`prescription-renderer.tsx`, `medicine-bottle.tsx`) |
| `src/lib/` | Core Infrastructure Engines | Stateless JWT crypto (`auth.ts`), Prisma DB (`db.ts`), multi-tenancy (`tenant.ts`), validations (`validations.ts`) |
| `prisma/` | Database Schema & Seeder | SQLite schema (`schema.prisma`), master database seeder (`seed.ts`) |

---

## 3. Key Files & Entry Points

| File Path | Description | Role |
| :--- | :--- | :--- |
| `public/images/dr-noorul-qamar.jpg` | Official Doctor Portrait | High-resolution portrait of Dr. Noorul Qamar (926x1024) in medical coat & stethoscope with soft green arch backdrop |
| `public/images/treatments/` | 132 Treatment Condition Visuals | 66 primary clinical condition cards (`{slug}-primary.webp`) + 66 secondary holistic lifestyle protocol illustrations (`{slug}-secondary.webp`) |
| `public/images/categories/` | 8 Category Visuals | High-resolution category header visuals (`{slug}.webp`) for all 8 clinical categories |
| `public/images/kits/` | 6 Disease Kit Visuals | Premium product visuals (`{slug}.webp`) for all 6 specialized supportive health kits |
| `public/images/blog/` | 5 Health Blog Visuals | Cover visuals (`{slug}.webp`) for all 5 evidence-based clinical articles |
| `public/images/womens-health/` | 2 Women's Health Visuals | Dedicated clinical consultation (`hero.webp`) and lifestyle pacing (`lifestyle.webp`) visuals |
| `src/app/page.tsx` | Clinic Homepage | Hero with official doctor portrait & side credentials, featured treatments, women's health spotlight, disease kits, doctor profile, reviews, FAQs, appointment form |
| `src/app/about/page.tsx` | About Dr. Noor ul Qamar | Professional profile, credentials (D.H.M.S, R.H.M.P), 10 years experience, clinical philosophy |
| `src/app/womens-health/page.tsx` | Women's Health & Fertility Wing | PCOS, irregular cycles, low AMH, recurrent miscarriage, endometriosis, IVF/IUI companion care, specialist red flags |
| `src/app/treatments/page.tsx` | Treatments Directory | Searchable, filterable 60+ conditions directory with category tabs |
| `src/app/treatments/[slug]/page.tsx` | Individual Condition Guides | In-depth guides for 66 conditions with symptoms, consultation steps, urgent medical warnings, and condition FAQs |
| `src/app/disease-kits/page.tsx` | Homeopathic Disease Kits | Hair, Skin, PCOS, Digestive, Respiratory, and Joint kits with WhatsApp enquiry |
| `src/app/blog/page.tsx` | Health Blog Index | Featured articles on hair fall, PCOS, stress, digestive wellness, and category filters |
| `src/app/blog/[slug]/page.tsx` | Blog Reading Page | Full clinical articles with takeaways, related treatments, and booking CTAs |
| `src/app/contact/page.tsx` | Contact & Map Page | Noor Street, LDA Avenue 1, Lahore address, interactive Google Maps embed, phone, WhatsApp, timings |
| `src/components/public/floating-whatsapp.tsx` | Floating WhatsApp Button | Present across all pages linking directly to `wa.me/923004627881` |
| `src/components/public/appointment-form.tsx` | Appointment Booking Engine | Interactive form generating formatted WhatsApp appointment message |
| `src/components/public/schema-markup.tsx` | SEO JSON-LD Schema | LocalBusiness, Physician, MedicalClinic, FAQPage, and BlogPosting schemas |
| `src/data/clinic-info.ts` | Clinic Source of Truth | Contact details, coordinates, timings, WhatsApp booking URL generator |
| `src/data/treatments.ts` | 66 Treatment Conditions | Full repository of 66 conditions across 8 medical categories |
| `src/middleware.ts` | Edge Auth Middleware | Protects SaaS routes (`/dashboard`, `/patients`, etc.) while keeping clinic website fully public |
