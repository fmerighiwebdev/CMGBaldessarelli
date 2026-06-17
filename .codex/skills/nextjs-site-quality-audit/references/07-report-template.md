# 07 — Report Template

Use this structure for the final audit. Keep it technical, actionable, and evidence-based.

```md
# Next.js Site Quality Audit Report

## 1. Executive Summary

One compact paragraph summarizing overall quality, biggest risks, and recommended focus.

## 2. Audit Context

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

## 3. Scorecard

| Area | Status | Notes |
|---|---:|---|
| Next.js architecture | Good / Needs work / Risky | ... |
| Technical SEO | Good / Needs work / Risky | ... |
| On-page SEO | Good / Needs work / Risky | ... |
| Accessibility | Good / Needs work / Risky | ... |
| Performance-sensitive implementation | Good / Needs work / Risky | ... |
| Maintainability | Good / Needs work / Risky | ... |

## 4. Highest-Priority Findings

### [Critical/High/Medium/Low/Opportunity] Finding title

**Area:**  
**Affected:**  
**Evidence:**  
**Evidence strength:** Confirmed / Likely / Inference  
**Why it matters:**  
**Recommended fix:**  
**Verification:**  

## 5. Findings by Area

### Next.js Architecture

...

### Technical SEO

...

### On-page SEO and Content

...

### Accessibility

...

### Performance and Web Vitals Risk

...

### Maintainability / Production Readiness

...

## 6. Prioritized Remediation Plan

### Phase 1 — Blocking fixes

- [ ] ...

### Phase 2 — High-impact quality fixes

- [ ] ...

### Phase 3 — SEO/content growth opportunities

- [ ] ...

## 7. Suggested Codex Implementation Prompts

### Prompt 1 — Fix blocking technical issues

```txt
...
```

### Prompt 2 — Improve metadata/schema/navigation

```txt
...
```

### Prompt 3 — Improve accessibility components

```txt
...
```

## 8. Verification Checklist

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] Keyboard-only navigation tested on key routes
- [ ] Lighthouse/axe checked on key route templates
- [ ] Sitemap and robots validated
- [ ] Structured data validated
- [ ] Canonicals and metadata checked in rendered HTML
- [ ] Important forms tested for labels/errors/success states
```

## Reporting rules

- Report fewer stronger findings rather than many weak items.
- Group repeated component-level issues instead of duplicating the same finding for every page.
- Include code snippets only when useful and concise.
- Do not include full file dumps.
- If a command fails because dependencies are missing, report that as a limitation unless dependency setup is itself part of the problem.
- Suggested prompts must tell Codex exactly what to change and what not to change.

