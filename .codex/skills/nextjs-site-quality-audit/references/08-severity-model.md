# 08 — Severity Model

Use severity to prioritize business and technical impact. Do not inflate severity to make the report look more important.

## Critical

Use when the issue is production-blocking or likely to severely damage indexing, access, conversion, or deployability.

Examples:

- Production site is globally `noindex` or blocked by robots.
- Main content is unavailable without broken client-side execution when server rendering should provide it.
- Navigation/contact/checkout/booking critical path is inaccessible by keyboard.
- Build fails or core route crashes.
- Canonicals point all pages to wrong domain/homepage.
- Secrets exposed to client bundle.
- Public mutation endpoint lacks validation/auth where abuse is likely.

## High

Use when impact is strong but not fully blocking.

Examples:

- Most pages share duplicate metadata.
- Root layout is client-rendered unnecessarily and causes broad hydration/performance issues.
- Key templates have missing H1/semantic structure.
- Important forms lack labels/error associations.
- LCP hero image is badly implemented across many pages.
- Dynamic routes accidentally render at request time and hurt performance.
- Schema markup is misleading or invalid on important pages.

## Medium

Use for clear, meaningful improvements.

Examples:

- Missing route-specific OG images for important shareable pages.
- Sitemap omits some secondary public pages.
- Breadcrumbs missing on deep hierarchy.
- Some buttons have weak accessible names.
- Several images have weak but not absent alt text.
- Revalidation strategy could be more explicit.

## Low

Use for minor consistency and cleanup.

Examples:

- Minor URL naming inconsistency.
- Optional metadata cleanup.
- Small design-system accessibility refinements.
- Duplicate utility code.
- Non-critical images could use better filenames.

## Opportunity

Use for strategic enhancements that are not defects.

Examples:

- Add service-area landing pages if search demand exists.
- Add FAQ content based on real customer objections.
- Add case studies/testimonials to strengthen trust.
- Generate dynamic OG images for editorial/blog content.
- Add structured content hubs.

## Evidence strength

Label evidence as:

- **Confirmed** — directly observed in code, rendered DOM, command output, or runtime test.
- **Likely** — strong static evidence, but runtime confirmation unavailable.
- **Inference** — plausible based on structure/content; requires validation.

Do not present inference as confirmed fact.
