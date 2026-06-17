# nextjs-site-quality-audit

Codex skill for auditing a Next.js project across:

- Next.js architecture and implementation best practices
- Technical SEO
- On-page SEO and content alignment
- Accessibility, oriented around WCAG 2.2 AA
- Performance-sensitive implementation details and Web Vitals risk
- Production readiness and maintainability

## Install

Copy the folder to one of these locations:

```txt
.agents/skills/nextjs-site-quality-audit
```

or globally:

```txt
$HOME/.agents/skills/nextjs-site-quality-audit
```

## Use with Codex

```txt
$nextjs-site-quality-audit

Audit this project for Next.js best practices, technical SEO, on-page SEO, accessibility, and performance-sensitive implementation details.

Do not modify files.
First inspect the entire codebase to understand brand identity, audience, business goals, route structure, metadata patterns, content model, components, and architecture.
Return a single prioritized report with severity, evidence, affected files/routes/components, recommended fixes, and suggested implementation prompts.
```

## Optional scripts

From the target project root, run:

```bash
node .agents/skills/nextjs-site-quality-audit/scripts/collect-project-signals.mjs .
node .agents/skills/nextjs-site-quality-audit/scripts/static-seo-a11y-scan.mjs .
```

If installed globally, adjust the path.

The scripts are intentionally dependency-free and read-only. They are not a substitute for manual audit judgment.
