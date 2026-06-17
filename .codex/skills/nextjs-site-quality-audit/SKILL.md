---
name: nextjs-site-quality-audit
description: Audit a Next.js website or application for architecture, framework best practices, technical SEO, on-page SEO, accessibility, performance-sensitive implementation details, and production readiness. Use when the user asks to check, review, audit, improve, or validate a Next.js project without immediately modifying files.
---

# Next.js Site Quality Audit

## Goal

Produce a single, evidence-based audit report for a Next.js codebase covering:

1. Project and brand/context discovery.
2. Next.js architecture and implementation quality.
3. Technical SEO.
4. On-page SEO and content alignment.
5. Accessibility, targeting WCAG 2.2 AA where reasonably applicable.
6. Performance-sensitive implementation details that affect SEO, UX, and maintainability.
7. A prioritized remediation plan and optional implementation prompts.

The audit must be concrete enough that a developer can fix the findings without asking what files, routes, or components are involved.

## Non-negotiable behavior

- Do not modify files unless the user explicitly asks for implementation after the audit.
- Do not invent issues. Every finding must include evidence: file path, route, code pattern, rendered page observation, command output, or clearly marked inference.
- Do not treat the checklist as generic advice. First inspect the codebase, then judge issues against the actual project context.
- Do not assume the app uses the latest Next.js version. Detect the installed version and adapt checks accordingly.
- Do not recommend migration from Pages Router to App Router as a finding unless the project has a concrete business, maintainability, or technical reason to migrate.
- Do not report "missing keyword meta tag" as an SEO defect. Modern SEO should not rely on `keywords` meta. Mention only if the codebase uses it unnecessarily or inconsistently.
- Distinguish between blocking production defects, important improvements, and optional refinements.
- If runtime/browser checks cannot be run, say so and continue with static analysis.
- If the project includes multiple locales, brands, tenants, or verticals, audit each materially different route pattern and metadata/content strategy.

## Required workflow

### Phase 1 — Full codebase context discovery

Before any SEO, A11y, or Next.js judgment, inspect enough of the repository to understand the project.

Use the steps in `references/01-context-discovery.md`.

At minimum, identify:

- Project type: marketing site, portfolio, e-commerce, SaaS, dashboard, blog, restaurant/local business site, booking platform, documentation site, marketplace, or mixed.
- Brand identity: name, tone, visual style, main services/products, target audience, local market, language(s), and conversion goals.
- Framework setup: Next.js version, router mode, package manager, rendering strategy, deployment assumptions, styling system, CMS/data sources, auth, analytics, and third-party scripts.
- Route map: public routes, dynamic routes, API/route handlers, layouts, route groups, error/loading/not-found pages, sitemap/robots files, and app-wide metadata.
- Reusable patterns: navigation, footer, buttons/links, forms, cards, image components, schema components, SEO utilities, typography primitives, modal/dialog components, and interactive widgets.

Use the optional scripts if useful:

```bash
node .agents/skills/nextjs-site-quality-audit/scripts/collect-project-signals.mjs .
node .agents/skills/nextjs-site-quality-audit/scripts/static-seo-a11y-scan.mjs .
```

If the skill is installed globally, adjust the path to the scripts.

### Phase 2 — Establish audit scope and assumptions

Create a brief "Audit Context" section before findings:

- Project summary.
- Detected Next.js version and router.
- Primary user journeys and conversion goals.
- Representative routes reviewed.
- Tools/commands executed.
- Limitations, such as no live URL, no production build, no browser automation, or unavailable environment variables.

### Phase 3 — Next.js best-practices audit

Use `references/02-nextjs-best-practices.md`.

Audit architecture, routing, rendering, data fetching, cache strategy, server/client boundaries, metadata API usage, image/font/script handling, TypeScript quality, config, route handlers, error states, loading states, forms, security-sensitive patterns, and deployment readiness.

### Phase 4 — Technical SEO audit

Use `references/03-technical-seo.md`.

Audit indexability, crawlability, canonicalization, metadata, Open Graph, Twitter/X cards, robots, sitemap, structured data, internationalization, redirects, status codes, pagination, faceted/dynamic URLs, internal linking, media indexing, performance-sensitive SEO, and Search Console-readiness.

### Phase 5 — On-page SEO and content audit

Use `references/04-on-page-seo.md`.

Audit how each important route communicates value, search intent, local relevance, topical coverage, headings, copy clarity, internal links, E-E-A-T signals, conversion support, image content, FAQs, breadcrumbs, and semantic consistency between page content and metadata.

### Phase 6 — Accessibility audit

Use `references/05-accessibility-wcag.md`.

Audit semantic HTML, landmarks, headings, names/roles/values, keyboard navigation, focus management, forms, dialogs, menus, skip links, contrast, motion, live regions, images, SVGs, icon buttons, touch targets, error handling, accessible authentication, redundant entry, and dynamic interactions.

### Phase 7 — Performance-sensitive implementation audit

Use `references/06-performance-and-web-vitals.md`.

Audit factors that can affect LCP, INP, CLS, FCP, TTFB, hydration, bundle size, script loading, image delivery, font loading, caching, static/dynamic rendering, CSS delivery, route transitions, and third-party scripts.

### Phase 8 — Report generation

Use `references/07-report-template.md` and `references/08-severity-model.md`.

The final report must include:

1. Executive summary.
2. Audit context.
3. Scorecard by area.
4. Findings grouped by severity.
5. Evidence for each finding.
6. Remediation plan.
7. Suggested Codex implementation prompts.
8. Verification checklist after fixes.

## Finding format

Each finding must use this format:

```md
### [Severity] Short issue title

**Area:** Next.js / Technical SEO / On-page SEO / Accessibility / Performance / Security-adjacent / Maintainability  
**Affected:** `file/path.tsx`, `/route`, component name, or global pattern  
**Evidence:** Specific code pattern, command output, route observation, or static-scan result.  
**Why it matters:** Practical impact for SEO, accessibility, UX, performance, maintainability, or conversion.  
**Recommended fix:** Concrete technical action.  
**Verification:** How to confirm the issue is fixed.
```

## Severity labels

Use only these severities:

- **Critical** — Production-blocking or likely to prevent indexing, navigation, interaction, conversion, or build/deploy correctness.
- **High** — Strong negative impact on SEO, A11y, performance, UX, or maintainability; should be fixed before meaningful optimization work.
- **Medium** — Important improvement with clear benefit, but not blocking.
- **Low** — Minor refinement, consistency improvement, or best-practice cleanup.
- **Opportunity** — Strategic enhancement, optional optimization, or content/UX growth idea.

## Output constraints

- Be specific and concise. Avoid generic educational explanations.
- Prioritize the highest-impact issues first.
- Include exact files/routes whenever possible.
- When a finding is based on inference, label it as inference and explain what would confirm it.
- Include commands to run only when they are safe and relevant.
- For client-facing projects, include a short business impact note where useful.

## Reference files

Read these when needed:

- `references/01-context-discovery.md`
- `references/02-nextjs-best-practices.md`
- `references/03-technical-seo.md`
- `references/04-on-page-seo.md`
- `references/05-accessibility-wcag.md`
- `references/06-performance-and-web-vitals.md`
- `references/07-report-template.md`
- `references/08-severity-model.md`
- `references/09-legacy-directives-adapted.md`
- `references/10-source-notes.md`

## Recommended invocation

```txt
$nextjs-site-quality-audit

Audit this project for Next.js best practices, technical SEO, on-page SEO, accessibility, and performance-sensitive implementation details.

Do not modify files.
First inspect the entire codebase to understand brand identity, audience, business goals, route structure, metadata patterns, content model, components, and architecture.
Return a single prioritized report with severity, evidence, affected files/routes/components, recommended fixes, and suggested implementation prompts.
```
