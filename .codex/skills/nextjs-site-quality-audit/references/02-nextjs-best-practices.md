# 02 — Next.js Best-Practices Audit

Use this checklist after context discovery. Adapt it to the detected Next.js version and router.

## 1. Version and framework mode

Check:

- Next.js version in `package.json`.
- React version compatibility.
- Node version support.
- App Router, Pages Router, or hybrid usage.
- Deprecated patterns relative to the installed version.
- Whether experimental features are enabled and justified.

Findings to consider:

- Old Next.js version with known architectural limitations or incompatibility with project requirements.
- Unclear router strategy: duplicated routes, mixed App/Pages without reason, stale migration leftovers.
- Framework features misused for a site that could be simpler, faster, or more static.

## 2. App Router architecture

For `app/` projects, check:

- Route groups are used for organization, not URL pollution.
- Layouts are scoped correctly and not forcing unnecessary client rendering.
- `page.tsx` remains focused on route composition.
- `loading.tsx`, `error.tsx`, `not-found.tsx`, and `global-error.tsx` exist where user experience requires them.
- Dynamic routes have deterministic params generation where static generation is intended.
- Route handlers are placed under `app/**/route.ts` and use standard Web Request/Response APIs.
- `redirect()`, `notFound()`, and `permanentRedirect()` are used instead of ad hoc client-side routing for server-known states.
- Static shell and dynamic content are separated where appropriate.
- Parallel/intercepting routes are used only when they simplify UX, not as accidental complexity.

## 3. Pages Router architecture

For `pages/` projects, check:

- `_app`, `_document`, `_error`, `404`, `500` are correctly implemented.
- `next/head` is used consistently and without duplicate/conflicting tags.
- `getStaticProps`, `getStaticPaths`, `getServerSideProps` are used intentionally.
- API routes are organized and do not contain frontend-only concerns.
- Migration to App Router is recommended only if it solves a concrete issue.

## 4. Server and Client Components

Check:

- Components are Server Components by default in App Router.
- `'use client'` appears only where browser APIs, state, effects, refs, event handlers, or client libraries are required.
- Large layout trees are not marked as client unnecessarily.
- Server-only code is not imported into Client Components.
- Secret environment variables never reach client bundles.
- Client Components receive serializable props.
- Interactive widgets are isolated instead of forcing full page hydration.
- Providers are placed as deep as possible.
- Browser APIs are guarded and not used during server render.

High-impact issues:

- Root layout marked `'use client'` without strong reason.
- Entire pages converted to client components because one child is interactive.
- Database/API/secrets imported by client-side modules.
- Hydration mismatches caused by time, random values, locale formatting, viewport checks, or browser-only state.

## 5. Data fetching and rendering

Check:

- Server Components fetch data directly where appropriate.
- Client-side fetching is used for user-specific, realtime, or interaction-driven data, not for static marketing content.
- Waterfalls are avoided where parallel fetching is possible.
- Dynamic rendering is intentional, not accidental due to `cookies()`, `headers()`, `searchParams`, uncached fetches, or runtime-only APIs.
- Static pages are statically rendered when possible.
- ISR/revalidation strategy matches content freshness requirements.
- Route segment config is not contradictory.
- Loading states and Suspense boundaries protect perceived performance.
- Errors are handled close to the route segment or component that can fail.

For Next.js versions using Cache Components:

- `cacheComponents` is enabled only when the team is intentionally using the newer explicit caching model.
- `'use cache'`, `cacheLife`, and `cacheTag` are used for stable, reusable data or components.
- Runtime/private data uses appropriate private caching or remains uncached.
- Cached metadata does not accidentally depend on uncached runtime data.

For previous caching model:

- `fetch` cache options and `next.revalidate` are used intentionally.
- `no-store`, `force-cache`, `revalidate`, `dynamic`, and `fetchCache` are not contradictory across route segments.

## 6. Metadata API and document structure

Check:

- App Router uses `metadata` or `generateMetadata` rather than manual head management.
- Root layout defines durable defaults and `metadataBase` when absolute social/canonical URLs are needed.
- Per-route metadata is unique, accurate, and content-aligned.
- Dynamic metadata handles params correctly and avoids unnecessary request-time rendering.
- Unsupported metadata is handled according to framework guidance.
- File-based metadata conventions are used where appropriate: icons, Open Graph images, Twitter images, manifest, sitemap, robots.
- Pages Router uses `next/head` carefully and avoids duplicates.

## 7. Routing and navigation

Check:

- URLs are clean, stable, lowercase, descriptive, and hyphenated.
- Internal navigation uses `next/link` or the framework-appropriate navigation API.
- Programmatic navigation is used only for actual interaction flows.
- Redirects are centralized and stable.
- Old URLs are redirected if routes were renamed.
- Dynamic slugs are stable and avoid exposing raw database IDs unless necessary.
- 404s are helpful and preserve navigation paths.
- Current nav state uses accessible markup.

## 8. Images and media

Check:

- `next/image` is used for local and remote images where beneficial.
- Remote images are configured with restrictive `remotePatterns`.
- Above-the-fold/LCP images use correct sizing, priority/preload strategy, and dimensions.
- Non-critical images remain lazy-loaded.
- `sizes` is accurate for responsive images.
- Width/height or `fill` container strategy prevents layout shift.
- Decorative images have empty alt; meaningful images have useful alt.
- SVGs are safe, accessible, and not blindly inlined when untrusted.
- Background images have text alternatives when content-bearing.
- Video/audio has captions/transcripts when content-bearing.

## 9. Fonts and CSS

Check:

- `next/font` is used where possible.
- Font subsets, weights, and display strategy are intentional.
- Excessive font families/weights are avoided.
- Critical CSS is not blocked by heavy global styles.
- Tailwind/content scanning is configured correctly.
- CSS Modules/global CSS/CSS-in-JS usage does not create duplication or runtime bloat.
- Responsive design is mobile-first and consistent.

## 10. Scripts and third-party integrations

Check:

- `next/script` is used for third-party scripts.
- Script loading strategy matches business need: `afterInteractive`, `lazyOnload`, or worker strategy where supported and appropriate.
- Analytics and tracking respect consent requirements.
- Third-party scripts do not block LCP/INP.
- No duplicate analytics pixels.
- No direct script tags in random components unless justified.

## 11. Forms and server actions

Check:

- Forms work without unnecessary client-side complexity where possible.
- Server Actions are used safely: validation, auth checks, rate limiting where relevant, no trust in client input.
- Route handlers validate input and return appropriate status codes.
- Form errors are accessible and actionable.
- Pending/success/error states are clear.
- Spam protection is suitable for public forms.
- Email/API credentials are server-only.

## 12. API routes and route handlers

Check:

- Correct HTTP methods and status codes.
- Zod or equivalent validation for external input.
- Authentication and authorization where required.
- Tenant/client/user scoping if multi-tenant.
- No service-role/admin keys in frontend bundles.
- Rate limiting for public mutation endpoints.
- Cache headers where appropriate.
- Consistent JSON/error response shape.

## 13. TypeScript, linting, and maintainability

Check:

- TypeScript strictness and project references where relevant.
- No broad `any` usage in critical paths.
- No disabled lint rules without justification.
- Components have clear boundaries.
- Business logic is not scattered across UI components.
- SEO/schema utilities are centralized enough to avoid inconsistencies.
- Dead code, duplicate components, unused dependencies, and stale assets are removed.
- Environment variable access is centralized and validated.

## 14. Configuration and deployment readiness

Check:

- `next.config.*` is minimal and intentional.
- Image domains are restricted.
- Headers, redirects, and rewrites are correct.
- Security headers are considered where relevant.
- Build output mode matches deployment target.
- Self-hosting assumptions are documented if not deploying to Vercel.
- Environment variable requirements are documented.
- CI runs lint/typecheck/build.

## 15. Next.js 16-specific checks when applicable

If the project uses Next.js 16 or newer:

- Prefer `proxy.ts` over deprecated `middleware.ts` unless there is a documented Edge runtime reason.
- Check whether Cache Components are enabled and used intentionally.
- Audit `'use cache'`, `cacheTag`, and `cacheLife` usage where present.
- Check React Compiler configuration only if enabled or relevant.
- Do not recommend older implicit caching assumptions as if they still applied to the project.

