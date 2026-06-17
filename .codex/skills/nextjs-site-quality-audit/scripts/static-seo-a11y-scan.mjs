#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const ignoreDirs = new Set(['node_modules', '.git', '.next', 'out', 'dist', 'build', 'coverage', '.turbo', '.vercel']);
const allowedExt = new Set(['.js', '.jsx', '.ts', '.tsx', '.mdx']);

function walk(dir, out = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const entry of entries) {
    if (ignoreDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (allowedExt.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function rel(abs) { return path.relative(root, abs).replaceAll(path.sep, '/'); }
function read(abs) { try { return fs.readFileSync(abs, 'utf8'); } catch { return ''; } }
function lineOf(s, index) { return s.slice(0, index).split(/\r?\n/).length; }

function add(findings, severity, area, file, line, title, evidence, recommendation) {
  findings.push({ severity, area, file, line, title, evidence, recommendation });
}

const files = walk(root);
const findings = [];
const pkgPath = path.join(root, 'package.json');
let nextMajor = null;
try {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const raw = pkg.dependencies?.next || pkg.devDependencies?.next || '';
  const m = raw.match(/(\d+)/);
  if (m) nextMajor = Number(m[1]);
} catch {}

const fileRels = files.map(rel);
const hasApp = fs.existsSync(path.join(root, 'app')) || fs.existsSync(path.join(root, 'src/app'));
const hasRobots = fileRels.some((f) => /(^|\/)(robots\.(t|j)s|robots\.txt)$/.test(f));
const hasSitemap = fileRels.some((f) => /(^|\/)(sitemap\.(t|j)s|sitemap\.xml)$/.test(f));
const hasMiddleware = fileRels.some((f) => /(^|\/)middleware\.(t|j)s$/.test(f));
const hasProxy = fileRels.some((f) => /(^|\/)proxy\.(t|j)s$/.test(f));

if (!hasRobots) add(findings, 'Medium', 'Technical SEO', 'project', null, 'No robots file detected', 'No robots.ts/robots.txt file found in app or public paths.', 'Add a production-aware robots file and reference the canonical sitemap URL.');
if (!hasSitemap) add(findings, 'Medium', 'Technical SEO', 'project', null, 'No sitemap detected', 'No sitemap.ts/sitemap.xml file found in app or public paths.', 'Generate a sitemap containing canonical public URLs only.');
if (nextMajor && nextMajor >= 16 && hasMiddleware && !hasProxy) add(findings, 'Low', 'Next.js', 'project', null, 'Next.js 16 project still uses middleware filename', 'Next.js major version appears to be 16+ and middleware.ts exists without proxy.ts.', 'Consider migrating middleware.ts to proxy.ts unless Edge runtime constraints require keeping middleware.');

for (const abs of files) {
  const file = rel(abs);
  const s = read(abs);
  if (!s) continue;

  if (hasApp && /from\s+['"]next\/head['"]/.test(s)) {
    add(findings, 'Medium', 'Next.js / Technical SEO', file, lineOf(s, s.search(/next\/head/)), 'next/head used inside an App Router project', 'Detected import from next/head while app directory exists.', 'Prefer the Metadata API in App Router routes unless this file is part of Pages Router.');
  }

  for (const match of s.matchAll(/<img\b[^>]*>/g)) {
    const tag = match[0];
    if (!/alt\s*=/.test(tag)) {
      add(findings, 'High', 'Accessibility / Performance', file, lineOf(s, match.index), 'Raw img without alt attribute', tag.slice(0, 180), 'Add meaningful alt text, empty alt for decorative images, and consider next/image when optimization or layout stability matters.');
    } else {
      add(findings, 'Low', 'Performance', file, lineOf(s, match.index), 'Raw img tag detected', tag.slice(0, 180), 'Confirm whether this should use next/image for optimization, sizing, and layout stability.');
    }
  }

  for (const match of s.matchAll(/<Image\b[^>]*>/g)) {
    const tag = match[0];
    if (!/alt\s*=/.test(tag)) {
      add(findings, 'High', 'Accessibility', file, lineOf(s, match.index), 'Next Image without alt attribute', tag.slice(0, 180), 'Add meaningful alt text or alt="" for decorative images.');
    }
    if (!/(width\s*=|height\s*=|fill\s*)/.test(tag)) {
      add(findings, 'Medium', 'Performance', file, lineOf(s, match.index), 'Image may lack stable sizing', tag.slice(0, 180), 'Confirm width/height or fill with a stable parent aspect ratio to avoid layout shift.');
    }
  }

  for (const match of s.matchAll(/<a\b[^>]*target=['"]_blank['"][^>]*>/g)) {
    const tag = match[0];
    if (!/rel=/.test(tag) || !/noopener/.test(tag)) {
      add(findings, 'Medium', 'Security-adjacent / Accessibility', file, lineOf(s, match.index), 'External target blank link missing noopener', tag.slice(0, 180), 'Add rel="noopener noreferrer". Add nofollow/sponsored/ugc only when semantically appropriate.');
    }
  }

  for (const match of s.matchAll(/<(button|a)\b([^>]*)>(\s*<[^>]+>\s*){0,3}<\/\1>/g)) {
    const tag = match[0];
    if (!/aria-label=|aria-labelledby=|sr-only|visually-hidden|title=/.test(tag) && !/>\s*[A-Za-zÀ-ÿ0-9]/.test(tag)) {
      add(findings, 'Medium', 'Accessibility', file, lineOf(s, match.index), 'Potential icon-only control without accessible name', tag.slice(0, 180), 'Give icon-only controls an accessible name via visible text, sr-only text, aria-label, or aria-labelledby.');
    }
  }

  for (const match of s.matchAll(/<input\b[^>]*>/g)) {
    const tag = match[0];
    if (/type=['"]hidden['"]/.test(tag)) continue;
    const before = s.slice(Math.max(0, match.index - 700), match.index);
    const after = s.slice(match.index, Math.min(s.length, match.index + 500));
    const hasAssociation = /<label[\s\S]{0,700}$/.test(before) || /aria-label=|aria-labelledby=/.test(tag) || /htmlFor=|<label/.test(after);
    if (!hasAssociation) {
      add(findings, 'High', 'Accessibility', file, lineOf(s, match.index), 'Input may lack accessible label', tag.slice(0, 180), 'Ensure every input has a visible label or a valid accessible name.');
    }
  }

  if (/onClick=/.test(s)) {
    for (const match of s.matchAll(/<(div|span|li|section)\b[^>]*onClick=[^>]*>/g)) {
      add(findings, 'High', 'Accessibility', file, lineOf(s, match.index), 'Non-interactive element has onClick', match[0].slice(0, 180), 'Use a native button/link or implement full keyboard semantics only when a native element is impossible.');
    }
  }

  for (const match of s.matchAll(/aria-hidden=['"]true['"][^>]*(tabIndex=|href=|onClick=)/g)) {
    add(findings, 'High', 'Accessibility', file, lineOf(s, match.index), 'aria-hidden element may be focusable/interactive', match[0].slice(0, 180), 'Do not hide focusable or interactive content from assistive technologies.');
  }

  if (/dangerouslySetInnerHTML/.test(s) && /application\/ld\+json|@context|schema\.org/.test(s)) {
    add(findings, 'Medium', 'Technical SEO / Security-adjacent', file, lineOf(s, s.search(/dangerouslySetInnerHTML/)), 'JSON-LD injection requires safe serialization', 'dangerouslySetInnerHTML appears near schema/JSON-LD usage.', 'Ensure schema values are safely serialized and never include unsanitized user/CMS HTML.');
  }

  const h1s = [...s.matchAll(/<h1\b/g)];
  if (h1s.length > 1) {
    add(findings, 'Medium', 'On-page SEO / Accessibility', file, lineOf(s, h1s[1].index), 'Multiple h1 elements in one file', `${h1s.length} <h1> tags detected in this file.`, 'Confirm rendered route has one primary H1 and use lower-level headings for sections.');
  }
}

const order = { Critical: 0, High: 1, Medium: 2, Low: 3, Opportunity: 4 };
findings.sort((a, b) => (order[a.severity] ?? 9) - (order[b.severity] ?? 9) || String(a.file).localeCompare(String(b.file)));
console.log(JSON.stringify({ root, generatedAt: new Date().toISOString(), nextMajor, counts: { filesScanned: files.length, findings: findings.length }, findings }, null, 2));
