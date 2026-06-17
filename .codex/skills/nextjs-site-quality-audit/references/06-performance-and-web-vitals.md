# 06 — Performance and Web Vitals Audit

This skill is not a full performance benchmark, but it must identify implementation patterns that affect SEO, UX, accessibility, and conversion.

## 1. Core Web Vitals focus

Audit likely contributors to:

- LCP: hero images, fonts, server response time, blocking scripts, render strategy, CSS.
- INP: hydration size, client-heavy components, expensive event handlers, third-party scripts.
- CLS: image dimensions, font swaps, ads/embeds, late banners, dynamic content insertion.
- FCP/TTFB: rendering mode, caching, server work, route handlers, dynamic APIs.

## 2. Rendering and caching

Check:

- Static marketing pages are static where feasible.
- Dynamic rendering is not accidental.
- Cache strategy matches content update frequency.
- Heavy server work is cached or moved out of critical request path when safe.
- Suspense/loading boundaries support fast initial render.
- Partial prerender/static shell strategy is considered for mixed static/dynamic pages.
- Cache invalidation is explicit for CMS/product/blog data.

## 3. JavaScript and hydration

Check:

- `'use client'` is narrowly scoped.
- Heavy interactive libraries are dynamically imported if not immediately needed.
- Animation libraries do not hydrate entire pages unnecessarily.
- Client bundles do not include server-only utilities, CMS SDKs, database clients, or unnecessary large libraries.
- Component state is not lifted higher than needed.
- Route-level providers do not force excessive re-rendering.
- Third-party scripts are delayed and consent-gated when appropriate.

## 4. Images

Check:

- LCP image is optimized and not lazy-loaded if it is the main hero visual.
- Correct `sizes` for responsive images.
- Remote image patterns are configured.
- Images have dimensions or stable aspect ratio.
- Modern formats are supported.
- Thumbnails are not serving full-resolution originals.
- Background images are compressed and appropriately sized.
- Image priority/preload is used sparingly.

## 5. Fonts

Check:

- `next/font` or equivalent self-hosted optimized font loading.
- Only necessary weights/subsets/styles are loaded.
- Font display avoids invisible text.
- Brand display fonts do not harm body readability/performance.
- Avoid multiple external font providers and duplicate font loads.

## 6. CSS

Check:

- Global CSS is not bloated.
- Tailwind content paths are correct and unused utilities are purged.
- Critical above-the-fold UI is not blocked by massive CSS.
- CSS-in-JS runtime cost is acceptable if used.
- Animations/transitions are GPU-safe where appropriate and respect reduced motion.

## 7. Scripts and third parties

Check:

- `next/script` strategy is used.
- Analytics, maps, chat widgets, booking widgets, pixels, embeds, and consent banners are not blocking key content.
- Duplicate scripts are removed.
- Heavy widgets are loaded only where needed.
- Consent management does not break accessibility or cause layout shift.

## 8. Build and bundle indicators

When commands can be run, inspect:

```bash
npm run build
```

Look for:

- Large first-load JS.
- Unexpected dynamic routes.
- Route size outliers.
- Build warnings.
- Static vs dynamic route classification.
- Middleware/proxy cost.

If bundle analyzer is configured, use it. Do not install it without permission.

## 9. Deployment and hosting

Check:

- Self-hosted Next.js caches are understood and persistent if needed.
- Static assets have long cache headers.
- Dynamic routes have appropriate CDN/server cache policy.
- Image optimization works in the hosting environment.
- Environment variables required for production are documented.
- Health of `next start`, standalone output, Docker, or platform adapter if present.

