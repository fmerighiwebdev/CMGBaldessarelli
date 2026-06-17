# 09 — Legacy SEO/A11y Directives Adapted

This file adapts the user's older SEO/A11y checklist into the current skill. It should be treated as a baseline, not the full audit scope.

## Preserved from the legacy checklist

The old checklist correctly covered these fundamentals:

- App Router file-based routing.
- Clean, descriptive, hyphenated URLs.
- Per-page metadata.
- Open Graph and Twitter/X metadata.
- JSON-LD structured data.
- Single H1 and logical heading hierarchy.
- Visible content matching metadata.
- `next/image`, alt text, dimensions, modern image formats.
- `next/link`, meaningful link text, external link `rel`, and `aria-current`.
- Landmarks, form labels, ARIA caution, skip links, contrast, keyboard navigation, live regions.
- `next/font`, script deferral, sparing eager loading.
- Sitemap and robots.
- Consent-aware analytics.
- Breadcrumbs.
- `lang`, `dir`, and i18n.
- Canonical URLs.
- Custom 404/error pages.
- Validation tools like axe, Lighthouse, WAVE, screen readers, and Lighthouse CI.

## Corrections and upgrades

### Metadata

Prefer the App Router Metadata API where applicable. Do not force raw `<head>` usage unless needed. For Pages Router, `next/head` remains normal.

### Keywords meta

The legacy example includes `keywords`. Do not treat missing `keywords` as a defect. It is not a meaningful modern Google SEO requirement. If present, it should not distract from titles, descriptions, canonicalization, body content, internal links, and structured data.

### JSON-LD

Do not inject schema simply because it is possible. Schema must match visible content and business reality. Fake ratings, fake FAQs, fake prices, or unsupported claims are worse than no schema.

### External links

Do not automatically add `nofollow` to every external link. Use `noopener noreferrer` for security/privacy with `target="_blank"`. Use `nofollow`, `sponsored`, or `ugc` only when semantically appropriate.

### Images

Do not require `next/image` blindly for every image. SVG icons, tiny decorative images, or special cases may not benefit. Report raw `<img>` only when it harms optimization, layout stability, accessibility, or consistency.

### Preload

Do not recommend manual preload everywhere. Next.js features like `next/font`, `next/image`, and `next/script` often manage relevant hints. Manual preload must be justified, usually for the LCP image or critical asset not handled by framework primitives.

### Accessibility

Add WCAG 2.2-specific checks: focus not obscured, dragging alternatives, target size, consistent help, redundant entry, and accessible authentication.

### Codebase-first audit

The legacy file is page-focused. This skill must first inspect the full project: architecture, shared components, brand, content model, metadata utilities, rendering strategy, and route templates.

