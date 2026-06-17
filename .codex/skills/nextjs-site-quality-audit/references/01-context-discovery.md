# 01 — Context Discovery

The audit must start by understanding the project before judging it. A technically correct pattern can still be wrong for the brand, content model, audience, or conversion goal.

## 1. Repository and framework discovery

Inspect:

- `package.json`, lockfile, scripts, package manager, Node version hints.
- `next.config.*`, `tsconfig.json`, `eslint.config.*` or `.eslintrc*`, `postcss.config.*`, `tailwind.config.*`.
- `app/`, `pages/`, `src/`, `components/`, `lib/`, `utils/`, `content/`, `data/`, `public/`, `styles/`.
- `middleware.*` and/or `proxy.*`.
- `vercel.json`, Dockerfile, deployment scripts, CI config.
- CMS, database, auth, analytics, email, payment, or booking integrations.

Detect:

- Next.js version and major release behavior.
- Router type: App Router, Pages Router, hybrid.
- TypeScript vs JavaScript.
- Rendering strategy: static, dynamic, ISR/revalidation, SSR, client-heavy SPA-like sections.
- Styling approach: Tailwind, CSS Modules, Sass, CSS-in-JS, design system.
- Content source: static files, CMS, database, API, markdown/MDX, Shopify, WordPress, Supabase, etc.

## 2. Brand and business discovery

Infer from content, metadata, copy, assets, README, docs, and page structure:

- Brand/company/site name.
- Primary offer: services, products, bookings, portfolio, restaurant, local business, SaaS, e-commerce, documentation, blog, etc.
- Target audience and search intent.
- Language and locale strategy.
- Geographic market if local SEO is relevant.
- Core conversion goals: contact form, phone call, reservation, quote request, purchase, booking, newsletter, account signup, document download.
- Tone of voice and visual identity.
- Trust signals: about page, testimonials, case studies, reviews, certifications, legal pages, privacy/cookie info, social profiles.

## 3. Route and page model discovery

Build a route map.

For App Router, inspect:

- `app/layout.*`, nested `layout.*`, route groups, parallel/intercepting routes.
- `page.*`, `loading.*`, `error.*`, `global-error.*`, `not-found.*`.
- `robots.*`, `sitemap.*`, `manifest.*`, `opengraph-image.*`, `twitter-image.*`, `icon.*`, `apple-icon.*`.
- Dynamic route segments like `[slug]`, `[id]`, `[...slug]`, `[[...slug]]`.
- Route handlers in `app/**/route.*`.

For Pages Router, inspect:

- `pages/_app.*`, `_document.*`, `_error.*`, `404.*`, `500.*`.
- `pages/api/**`.
- Dynamic page files.
- `next/head` usage.

## 4. Shared component discovery

Identify reusable patterns that influence many pages:

- Header, nav, mobile nav, breadcrumbs, footer.
- Layout wrappers and page shells.
- Buttons, links, cards, accordions, tabs, sliders, dialogs, dropdowns, menus.
- Forms, inputs, validation components.
- Image and media components.
- SEO/metadata/schema helpers.
- Analytics, cookie banner, tracking scripts.
- Typography primitives and rich text renderers.

If a shared component has an issue, report it once as a global pattern and list affected routes where possible.

## 5. Commands to consider

Run only safe read-only commands unless the user authorizes more.

```bash
pwd
ls
find . -maxdepth 3 -type f | sed 's#^./##' | sort | head -200
cat package.json
npm run lint
npm run typecheck
npm run build
```

Do not run package installs without explicit permission.

If dependencies are already installed, consider:

```bash
npx next info
npx next build
```

If a local server is available and safe:

```bash
npm run dev
```

Then test key pages manually or with browser tooling if available.

## 6. Context output

Before findings, include:

```md
## Audit Context

- Project type:
- Brand/site name:
- Primary audience:
- Primary conversions:
- Detected stack:
- Next.js version:
- Router:
- Styling system:
- Content sources:
- Representative routes reviewed:
- Commands/tools run:
- Limitations:
```
