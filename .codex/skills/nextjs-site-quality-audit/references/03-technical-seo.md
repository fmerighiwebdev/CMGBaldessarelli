# 03 — Technical SEO Audit

Audit technical SEO from code and, when available, rendered output. Use Google Search documentation as baseline, but keep findings tied to actual project evidence.

## 1. Indexability and crawlability

Check:

- Important pages are reachable through crawlable links.
- No accidental `noindex`, `nofollow`, blocked route, or disallow rule on production pages.
- Staging/private routes are blocked or protected.
- Canonicals point to indexable final URLs.
- HTTP status codes are correct: 200 for valid pages, 301/308 for permanent redirects, 404/410 for gone pages, 5xx only for real server errors.
- Soft 404s are avoided.
- Pages do not require client-side JavaScript to reveal core indexable content when server-rendering is feasible.
- Important content is present in initial HTML where appropriate.

## 2. Robots

Check:

- App Router: `app/robots.ts` or `app/robots.txt` pattern, or static `public/robots.txt`.
- Pages Router/static: `public/robots.txt` or equivalent route.
- Production robots allows crawl of public pages and points to sitemap.
- Staging/dev robots blocks indexing.
- No private/admin/API paths exposed unnecessarily.
- Rules do not block assets needed for rendering.

Report as Critical if the production site blocks all important public pages.

## 3. Sitemap

Check:

- Sitemap exists: `app/sitemap.ts`, generated route, static XML, or external generator.
- All canonical public URLs are included.
- Non-indexable, redirected, duplicate, parameter-only, auth-only, and dev URLs are excluded.
- Dynamic content has deterministic inclusion logic.
- `lastmod` is meaningful if present.
- Large sites split sitemap indexes where needed.
- Sitemap URL is referenced in `robots.txt`.
- Multilingual pages use hreflang/alternate handling where relevant.

## 4. Canonicalization

Check:

- Canonical exists for important pages when duplicates are possible.
- Canonicals use absolute final URLs.
- Canonicals match protocol, host, locale, trailing slash policy, and final route.
- Duplicate route variants redirect or canonicalize correctly: www/non-www, http/https, trailing slash, uppercase/lowercase, query params, legacy slugs.
- Paginated, filtered, searched, and sorted pages have intentional canonical logic.
- Canonical does not point every page to homepage.

## 5. Metadata

Check:

- Unique title and description per important page.
- Titles are accurate, concise, brand-aware, and route-specific.
- Descriptions match page content and search intent.
- Metadata does not promise content absent from the page.
- Root metadata defaults are not blindly reused on all pages.
- `metadataBase` is configured if relative URLs are used for canonical/social fields.
- Robots metadata is deliberate.
- Viewport is correctly defined using Next.js APIs where applicable.
- Unsupported tags are not forced through unsupported metadata fields.

Do not mark missing `keywords` meta as an issue. If present, it is usually low-value and can be removed unless a project-specific consumer needs it.

## 6. Open Graph and social metadata

Check:

- `og:title`, `og:description`, `og:url`, `og:site_name`, `og:type`, and image fields are present where share previews matter.
- Twitter/X cards are configured when relevant.
- Social images are 1200x630 or otherwise platform-appropriate.
- Images are absolute or correctly resolved through `metadataBase`.
- Dynamic routes generate route-specific social images when important.
- Social metadata mirrors but does not blindly duplicate SEO metadata if share intent differs.
- File-based metadata conventions are used when they improve consistency.

## 7. Structured data

Check JSON-LD implementation and validity.

Common schema types:

- `Organization`, `LocalBusiness`, `Restaurant`, `ProfessionalService`, `WebSite`, `WebPage`.
- `BreadcrumbList`.
- `Article`, `BlogPosting`, `NewsArticle`.
- `Product`, `Offer`, `AggregateRating`, `Review` where supported by real content.
- `FAQPage` only when visible FAQs exist and match the markup.
- `Service` where useful, although rich result eligibility may be limited.
- `Person` for author/portfolio pages where relevant.
- `Event` for real events.

Rules:

- JSON-LD must reflect visible content.
- Do not add fake ratings, reviews, prices, availability, authors, or FAQs.
- Use stable absolute URLs and image URLs.
- Avoid duplicate conflicting schema graphs.
- Prefer a centralized schema helper when many pages use similar patterns.
- Escape JSON safely; avoid XSS vectors when injecting schema from CMS/user data.

## 8. Internationalization and hreflang

Check if multiple languages/locales exist:

- `lang` is correct on `<html>`.
- Locale-specific URLs are stable.
- `alternates.languages` or equivalent hreflang tags are present.
- `x-default` is used when appropriate.
- Canonicals point to the current locale version, not always default language.
- Metadata is translated, not duplicated in one language.
- Sitemap includes alternate language signals if supported.
- Currency, phone, addresses, dates, and units match locale expectations.

## 9. Internal linking and crawl depth

Check:

- Important routes are linked from navigation, footer, content hubs, breadcrumbs, or related sections.
- Orphan pages are avoided.
- Anchor text is descriptive and context-aware.
- Internal links use stable canonical URLs.
- Excessive duplicate footer links do not replace meaningful contextual links.
- Dynamic collections have crawlable index pages.
- Pagination is crawlable if content must be discovered.

## 10. URL and information architecture

Check:

- URLs are short, descriptive, lowercase, and hyphenated.
- URL structure reflects user/search intent.
- Slugs are stable and not overloaded with implementation IDs unless needed.
- Local business URLs include meaningful service/location structure when useful.
- Content categories/tags are not creating thin duplicate archives.
- Query parameters are intentional and not indexable by default if they produce duplicates.

## 11. Redirects and legacy handling

Check:

- Old URLs redirect to relevant new URLs.
- Redirects are permanent for durable moves.
- No redirect chains or loops.
- www/non-www and http/https policy is consistent.
- Trailing slash policy matches Next.js config and canonical URLs.
- Locale redirects do not trap crawlers.

## 12. Media SEO

Check:

- Image filenames are descriptive when assets are controlled.
- Alt text is meaningful and not keyword-stuffed.
- Image dimensions and formats support performance.
- Important videos have transcripts/captions and descriptive context.
- Open Graph images exist and are accessible.
- Product/portfolio/gallery media has crawlable textual context.

## 13. Local SEO when applicable

For restaurants, local businesses, professionals, studios, shops, and service-area businesses, check:

- NAP consistency: name, address, phone.
- Opening hours.
- LocalBusiness subtype schema where appropriate.
- Contact methods and map links.
- Service area or physical location clarity.
- Location-specific landing pages only when they provide unique useful content.
- Reviews/testimonials are real and clearly represented.
- Social/profile links and trust signals.

## 14. E-commerce SEO when applicable

Check:

- Product pages have unique titles, descriptions, images, price/availability where appropriate.
- Product schema matches visible data.
- Category pages have useful introductory copy and crawlable product links.
- Facets/filters do not create uncontrolled index bloat.
- Out-of-stock handling is intentional.
- Cart/account/checkout are noindex/protected as appropriate.
- Canonicals on variants are deliberate.

## 15. Search Console readiness

Check:

- Sitemap and robots are ready for submission.
- Important pages are not hidden behind auth/client-only states.
- Structured data can be validated with Rich Results Test or Schema Markup Validator.
- Redirect/canonical/index states are predictable.
- Analytics/search verification tags are not duplicated.

