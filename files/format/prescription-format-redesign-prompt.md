# Prescription Output Redesign — Spec for Antigravity

## 1. Context

The current prescription output (see reference screenshot "current-output") renders a homeopathy Rx with:
- Clinic header (name, doctor credentials, reg. no., Rx number, date)
- Patient info bar (avatar initial, name, patient ID, gender/age, phone, follow-up badge)
- Chief Complaint box
- Remedies table (Medicine, Potency, Form, Dose, Frequency, Duration, Instructions — with bilingual English/Urdu labels)
- "Doctor's Advice & General Instructions" section with icon bullets, each bilingual (English heading style not present here — content is pure Urdu with emoji icons)

**Problem:** Urdu text across the document is not visually consistent — different words render at different sizes, and some words appear to use a different font than others (likely because the Urdu is coming from mixed sources — table cells vs. instruction bullets — without a shared font-family/size token).

**Goal:** Redesign the visual system so it looks like a polished, modern clinic document (see reference "template-samples" A/B/C), while keeping all the existing data fields and structure intact. Also make branding (clinic name, doctor, contact info, logo, colors) fully editable per doctor, and ship it as 3-4 selectable style presets.

## 2. Fix: Unified Urdu Typography

- Pick **one** Urdu (Nastaliq) web font for the entire document — e.g. `Noto Nastaliq Urdu` or `Jameel Noori Nastaleeq` (whichever is already licensed/available) — and apply it via a single CSS class, e.g. `.urdu-text`, everywhere Urdu appears (table cells, bullet lists, instructions, footer).
- Set **one** base font-size for all Urdu body text (e.g. `16px` / `1rem`), with a slightly larger line-height than Latin text (Nastaliq needs more vertical breathing room — try `line-height: 2` or `2.2`).
- Do not let inline styles or per-component defaults override this — route every Urdu string through the same `.urdu-text` class/token so nothing drifts in size or family again.
- Keep Urdu right-to-left (`dir="rtl"`) and right-aligned within its own cell/block, while the surrounding English layout stays LTR.
- Headings/labels that are bilingual (e.g. "Chief Complaint (علامات)") should have the Urdu portion also styled with `.urdu-text`, just at the heading's font-size rather than body size — so it inherits the *family* consistently even where size differs by context (heading vs. body).

## 3. "Doctor's Advice & General Instructions" Layout

- Change this section from a single-column vertical list (one emoji instruction per line, as in the current output) to a **2-column grid** — two instructions per row, wrapping to a new row as needed.
- Each item keeps its emoji icon + `.urdu-text` styled instruction, just arranged as a grid (e.g. CSS `grid-template-columns: 1fr 1fr; gap: ...`) instead of stacked `<li>`/block elements.
- If an odd number of instructions exists, the last item simply sits alone in its row (no need to force a blank filler cell).
- This keeps the section more compact and reduces the vertical scroll length of the printed Rx.

## 4. Theme / Branding System (doctor-editable)

Introduce a `clinicTheme` config object that drives the header and footer of every generated Rx, editable from a settings screen:

```
clinicTheme = {
  clinicName: string,
  tagline: string,
  doctorName: string,
  credentials: string,        // e.g. "MD (Hom) • MD (Homeopathy), BHMS, Gold Medalist"
  regNo: string,
  phone: string,
  email: string,
  address: string,
  logoUrl: string,            // uploaded or preset icon
  accentColor: string,        // hex, drives buttons/badges/table header
  footerQuote: string         // e.g. "Similia similibus curentur."
}
```

This object should populate the same slots in every template preset below — so switching templates never requires re-entering clinic info.

## 5. Template Presets (style switcher)

Ship the following as selectable presets (a dropdown or thumbnail picker in settings), each just a different CSS theme layered on the same data structure:

1. **Sage/Nature** (green, leaf motifs) — closest to sample **A**
2. **Trust/Clinical** (blue, tree-of-health icon) — closest to sample **B**
3. **Floral/Warm** (rose/maroon, floral corners) — closest to sample **C**
4. **Minimal/Mono** *(new suggestion)* — black/white/single accent line, no illustration, just typography and whitespace; best for doctors who want a strictly clinical, non-decorative look and cheaper printing (less ink for logo/floral art)

Each preset should reuse: header bar with logo + clinic name + contact icons, Rx-number/date badge, patient info strip, chief complaint box, remedies table, advice section, footer signature line + quote — i.e. only colors, accent icons, and header layout differ, not the underlying content blocks.

## 6. Additional Suggestions (beyond the samples)

- **QR code** in the corner linking to a verification page (helps against prescription forgery) — optional per-clinic toggle.
- **Medicine-form icons** (small pill/globule/drop icon) next to each row in the remedies table for quick scanning.
- **Digital signature image upload** instead of a blank "Dr. Signature" line, so the same signature auto-applies to every Rx.
- **Allergy/warning strip** (red accent) that only appears if the patient has flagged allergies — reuses the same alert-style component as the advice section, so it stays visually consistent.
- **Print/PDF export** at A4 and Letter, tested with the Urdu font embedded (not system-dependent) so it renders correctly on any printer/device.

## 7. Ask to Antigravity

> Refactor the prescription renderer so that:
> 1. All Urdu text uses a single font-family + font-size token (`.urdu-text`), applied consistently across table cells, bullet lists, and footer — no per-instance overrides.
> 2. The "Doctor's Advice & General Instructions" section renders as a 2-column emoji-bullet grid (two instructions per row) instead of a single vertical list.
> 3. Clinic/doctor branding (name, credentials, reg no, phone, email, address, logo, accent color, footer quote) is pulled from one editable `clinicTheme` config, editable per doctor account.
> 4. Add a template-style switcher with 4 presets (Sage/Nature, Trust/Clinical, Floral/Warm, Minimal/Mono), where only the visual theme changes — the data structure and component layout (header, patient strip, chief complaint, remedies table, advice section, footer) stays shared.
> 5. Preserve every existing field currently rendered in the Rx output (RX number, date, patient ID, gender/age, phone, follow-up days, chief complaint, remedy table columns, advice bullets).
> 6. Ensure the result is print/PDF-clean at A4 and Letter sizes with the Urdu font embedded.
