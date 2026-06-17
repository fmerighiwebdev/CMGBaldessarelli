# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router site for CMG Baldessarelli. Route files live under `app/`, including public pages such as `app/page.js`, `app/catalogo`, `app/contatti`, `app/news`, and the contact route handler at `app/api/contact/route.js`. Shared UI components live in `components/`, each usually paired with a CSS Module. Static data is in `utils/` (`products.js`, `news.js`). Public assets are in `public/`; product images imported by data modules are in `assets/`. There is currently no dedicated test directory.

## Build, Test, and Development Commands

- `npm run dev`: start the local Next.js development server.
- `npm run build`: create a production build in `.next/`.
- `npm run start`: serve the production build after `npm run build`.
- `npm run lint`: run the configured Next.js ESLint checks.

No `npm test` script is defined. When adding tests, also add the command to `package.json` and document it here.

## Coding Style & Naming Conventions

Use JavaScript/JSX with App Router conventions. Prefer Server Components by default and add `"use client"` only for state, effects, browser APIs, or interactive libraries. Use CSS Modules named after the component or route, for example `header.module.css` or `catalogo.module.css`. Keep components focused and reuse existing patterns for metadata, JSON-LD, forms, and product/news data. Use two-space indentation in new JSX and keep imports grouped by framework, local modules, then styles/assets.

## Testing Guidelines

There is no formal test framework in the repository. For now, validate changes with `npm run lint` and, for route/metadata changes, `npm run build`. For UI or accessibility changes, manually verify representative routes in a browser, especially `/`, `/catalogo`, `/catalogo/[categorySlug]/[productSlug]`, `/news`, and `/contatti`.

## Commit & Pull Request Guidelines

Recent commits are short and descriptive, often in Italian, for example `Aggiunto PDF catalogo` and `Immagini aggiornate`. Keep commits focused on one change. Pull requests should include a concise summary, affected routes/components, validation commands run, and screenshots for visual UI changes. Link issues when available.

## Security & Configuration Tips

Do not commit `.env` files. Keep email credentials server-only in route handlers. Avoid adding fake structured data values; JSON-LD must match visible page content.
