# PRD — Demo Personalized Academic GitHub Page

## Header
- **Project name:** Demo Personalized Academic GitHub Page  
- **Date:** 01 Feb 2026  
- **Author:** Berfin Berg
- **Version:** v1.0 (Draft)  
- **Short pitch:** A minimal, technology-focused academic website built on Academic Pages (Jekyll + GitHub Pages) with (1) a custom theme system beyond light/dark, (2) a personalized hero landing page, (3) an accessible CV in text + graphic + audio formats, and (4) interactive publications and projects browsing—optimized for MSc students and collaborators, deployed on GitHub Pages only.  
- **Relevant links:**
  - Academic Pages: https://academicpages.github.io/
  - ORCID: 0000-0002-3705-2221
  - Google Scholar: https://scholar.google.com/citations?user=-_u_0_sAAAAJ&hl=en

---

## 1) Core Context

### Problem
The baseline Academic Pages experience is functional but not sufficiently **personalized, accessible, or UX-focused**:
- Site feels generic and doesn’t reflect a distinct personal brand.
- Papers/projects are not optimized for fast discovery and scanning.
- CV consumption is not accessibility-first by default.

### Solution
Create a minimal, tech-forward academic website that:
- Communicates who you are and what you do immediately (hero-first landing).
- Makes CV, papers, and projects easy to discover, filter, and consume.
- Provides a multi-format, accessibility-first CV (text + graphic + audio).
- Remains static-hosted and maintainable via Markdown on GitHub Pages.

### Target Users
- **Recruiter** looking for employees.
- **Collaborators** evaluating fit and quickly finding relevant work.

### Primary Use Cases
- Understand research areas quickly from the homepage.
- Find latest papers and open a relevant publication fast.
- Download and review CV (including accessible variants).
- Browse projects and navigate to details and code.
- Contact via email.

### North-Star Metric
- **Median time-to-find a paper/project ≤ 45 seconds**
  - “Find” = user reaches the correct paper/project detail page (or opens the target) from landing.

### Non-Goals
- Authentication / accounts
- CMS / admin UI
- Teaching pages (out of scope for V1)
- Server-side features / dynamic databases

---

## 2) UX Foundations

### Personas
Personas are implicit (no formal persona docs); UX decisions optimize for:
- MSc students exploring fit
- Collaborators assessing relevance and track record

### Experience Principles
- **Minimal, high signal-to-noise**
- **Accessibility is default, not a feature**
- **Show work** (papers/projects are one click away)

### Accessibility & Inclusion Requirements
- Target **WCAG 2.1 AA**
- All themes must meet **AA color contrast** requirements.

### High-Level Journey
1) Land on hero → understand who you are + areas (AI, mobility, HCI)  
2) Browse papers/projects → filter/search quickly  
3) Review CV (text first; graphic/audio available)  
4) Email contact  

---

## 3) Scope & Priorities

### MVP (V1) Goals
P0 features:
- **Custom theming system** beyond light/dark (3 themes total)
- **Personalized hero landing page** with clear CTAs
- **Accessible CV** (text + PDF + graphic A4 + audio MP3 + transcript)
- **Interactive papers and projects** (filters + search + detail pages)

### Out of Scope (V1)
- Teaching pages
- Auth/CMS
- Server-side runtime features

### Assumptions & Risks
- Content maintained **manually via Markdown**.
- GitHub Pages static constraints mean “interactive” is **client-side JS only** or build-time generated.
- Integrations should degrade gracefully to profile links if automation/import isn’t used.

---

## 4) Tech Overview

### Frontend
- Academic Pages (Jekyll) with custom layouts/includes
- CSS variables (design tokens) for multi-theme support
- Lightweight vanilla JS for theme switching + filtering/search UI

### Backend
- None (static-only)

### Data / Content Model
- Markdown entries with frontmatter metadata
- Optional `_data` YAML/JSON for taxonomies and homepage feature selection
- Build-time generated JSON indexes for papers/projects search/filter

### Integrations
- ORCID + Google Scholar: prominent links in header/footer, About, and CV

### Deployment
- GitHub Pages **direct build/deploy** (no Actions required for V1)

### Security / Privacy
- No analytics in V1
- No form storage; email link only
- Safe external linking (`rel="noopener noreferrer"`)

---

## 5) Feature Modules

### Module 1 — Custom Theme System (P0)
**User Story:** As a visitor, I want to switch to a readable, high-contrast theme so I can comfortably browse the site.

**Acceptance Criteria**
- Exactly **3 themes**:
  - `Light` (default)
  - `Dark`
  - `Tech Blue` (custom minimal tech theme with blue/cyan accent)
- Global theme switcher, keyboard accessible, screen-reader friendly
- Persist selection via `localStorage`
- AA contrast compliance across all themes (text/links/focus/code/cards)
- CSS variables token system (no duplicated theme stylesheets)
- No-JS fallback uses default theme without layout breakage

### Module 2 — Personalized Hero Landing Page (P0)
**User Story:** As a first-time visitor, I want to understand who Berfin Berg is and what she works on, so I can explore projects/CV quickly.

**Acceptance Criteria**
- Above-the-fold hero includes:
  - H1: “Berfin Berg”
  - Positioning aligned to: **User Experience Design, Service Design**
  - Research chips: **Design Thinking**, **Usability Testing**, **Human-Computer Interaction**
  - CTAs: **Publications**, **Projects**, **CV**, **Email**
  - Headshot with alt text and responsive behavior
- Below hero (“Show work”):
  - **Latest projects (3)** with 1-click to detail
  - **Featured projects (2)** with 1-click to detail
- Accessibility + performance:
  - Semantic structure; respects reduced motion; fast load

### Module 3 — Accessible CV (Text + Graphic + Audio) (P0)
**User Story:** As a visitor, I want to review the CV in the format that works for me (text/graphic/audio) so I can assess background and fit accessibly.

**Acceptance Criteria**
- `/cv/` includes:
  - **Text CV** (semantic HTML, headings/sections)
  - **Download CV (PDF)** prominent CTA
  - **Graphic CV** (A4 PDF + preview image with caption/alt)
  - **Audio CV**: repo-hosted MP3 (~5 minutes) embedded via HTML5 player
  - **Transcript** for audio (selectable text on same page)
- Public-safe defaults:
  - Exclude sensitive personal details by default (full address, phone, DOB)
- WCAG AA structure and contrast across themes

### Module 4 — Interactive Papers (P0)
**User Story:** As a visitor, I want to find relevant publications quickly by searching/filtering so I can open the right paper within 45 seconds.

**Acceptance Criteria**
- `/publications/`:
  - Default sort: newest first
  - Search (title + keywords)
  - Filters: **Year**, **Research Area Tags**, **Type** (Journal/Conference/Workshop/Preprint)
- Each paper list item shows: title, year, venue/type, optional authors; actions: **Details**, optional **PDF**, **DOI/arXiv**, **Code**
- On-site **detail pages** for every paper with full metadata + links + optional abstract
- Implemented via Markdown entries + build-time JSON index + lightweight JS filtering/search
- Keyboard accessibility for filters/results; readable focus states; AA contrast

### Module 5 — Interactive Projects (P0)
**User Story:** As a visitor, I want to browse projects by area and status and quickly reach details/code so I can assess practical work and collaboration fit.

**Acceptance Criteria**
- `/projects/`:
  - Default sort: newest first
  - Search (title + keywords)
  - Filters: **Research Area Tags** + **Status** (Ongoing/Completed)
- Project list items include title, short summary, tags, status; actions: **Details**, **Code**, optional **Demo**, optional **Related paper(s)**
- On-site **detail pages** with goal, role, outcomes, links, optional media with alt text
- Markdown + build-time JSON index + lightweight JS filtering/search; fully accessible

### Module 6 — Integrations (ORCID + Google Scholar) (P1)
**User Story:** As a visitor, I want canonical profile links so I can verify identity and browse complete outputs.

**Acceptance Criteria**
- ORCID + Scholar links in header/footer with accessible labels (not icon-only)
- Included on About + CV pages
- Safe external link behavior

---

## 6) AI Design
- **Not applicable for V1** (no AI features planned).

---

## 7) IA, Flows & UI

### Main Screens
- Home, About, CV, Publications, Projects

### Navigation (Top)
- **Home | About | CV | Publications | Projects**

### Key Flows
- Home → Publications/Projects → Detail → Email
- Publications/Projects → Search/filter → Detail within ≤ 45s median
- Home → CV → Read text / Download PDF / View graphic / Listen + transcript

### Components
- **Collapsible sections (accordion)** for CV and/or paper abstracts
  - Keyboard operable; correct ARIA
- **Citation copy button** on publication detail pages (optional also on list)
  - Accessible confirmation (toast + screen-reader announcement)
  - Clipboard API fallback

---

## 8) Iteration & Workflow

### Sprint Rhythm
- **1-week sprints**

### Review Process
- Single reviewer: **Berfin Berg**

### Spike / Risk Items
- None required for V1 (validate early during normal development)

---

## 9) Quality

### Testing Requirements
- Functional smoke tests for:
  - Theme switching + persistence
  - Publications/projects search + filters
  - CV downloads and audio/transcript

### Accessibility Checks
- Keyboard-only navigation pass
- Contrast checks for all 3 themes (AA)
- Screen-reader smoke test for CV and filtering UIs

### Performance Targets
- No explicit numeric target in V1; expectation is “**feels fast**”
  - Lightweight JS, compressed images, minimal dependencies

### Browser Support
- Latest versions of **Chrome, Firefox, Safari, Edge**

---

## 10) Metrics & Analytics

### V1
- **No analytics instrumentation**.

### V2 (planned)
- Add measurement approach for North-Star metric (median time-to-find paper/project), potentially via:
  - Privacy-friendly analytics or structured usability testing workflows.

---

## 11) Launch & Operations

### Environments
- **Single production environment** on GitHub Pages (V1)

### Rollout Plan
- **Immediate replace** / go-live on the primary GitHub Pages site once V1 is ready.

### Support & Maintenance
- Ongoing updates via Markdown edits (papers/projects/CV)
- Periodic checks:
  - Link health (PDF/DOI/code)
  - Theme contrast regressions when styles change
