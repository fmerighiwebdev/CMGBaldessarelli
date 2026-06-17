#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const ignoreDirs = new Set(['node_modules', '.git', '.next', 'out', 'dist', 'build', 'coverage', '.turbo', '.vercel']);
const sourceExt = new Set(['.js', '.jsx', '.ts', '.tsx', '.md', '.mdx', '.css', '.scss', '.json']);

function exists(p) {
  return fs.existsSync(path.join(root, p));
}

function readJson(rel) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
  } catch {
    return null;
  }
}

function walk(dir, maxFiles = 5000) {
  const out = [];
  function visit(abs) {
    if (out.length >= maxFiles) return;
    let entries;
    try {
      entries = fs.readdirSync(abs, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (out.length >= maxFiles) break;
      if (ignoreDirs.has(entry.name)) continue;
      const full = path.join(abs, entry.name);
      const rel = path.relative(root, full).replaceAll(path.sep, '/');
      if (entry.isDirectory()) visit(full);
      else if (sourceExt.has(path.extname(entry.name)) || entry.name.includes('.config.')) out.push(rel);
    }
  }
  visit(dir);
  return out.sort();
}

function safeRead(rel, max = 250_000) {
  try {
    const full = path.join(root, rel);
    const stat = fs.statSync(full);
    if (stat.size > max) return '';
    return fs.readFileSync(full, 'utf8');
  } catch {
    return '';
  }
}

function routeFromAppPage(file) {
  let route = file
    .replace(/^src\//, '')
    .replace(/^app\//, '/')
    .replace(/\/page\.(t|j)sx?$/, '')
    .replace(/\/route\.(t|j)s$/, '')
    .replace(/\/layout\.(t|j)sx?$/, '')
    .replace(/\([^/]+\)\//g, '')
    .replace(/\/\([^/]+\)$/g, '')
    .replace(/\/index$/, '/');
  if (route === '') route = '/';
  route = route.replace(/\/+/g, '/');
  return route || '/';
}

function routeFromPages(file) {
  let route = file
    .replace(/^src\//, '')
    .replace(/^pages\//, '/')
    .replace(/\.(t|j)sx?$/, '')
    .replace(/\/index$/, '/')
    .replace(/^\/_app$/, '')
    .replace(/^\/_document$/, '')
    .replace(/^\/_error$/, '');
  route = route.replace(/\/+/g, '/');
  return route || '/';
}

const pkg = readJson('package.json') || {};
const files = walk(root);
const sourceFiles = files.filter((f) => /\.(t|j)sx?$|\.mdx?$|\.css$|\.scss$/.test(f));

const appPages = files.filter((f) => /^(src\/)?app\/.*\/page\.(t|j)sx?$/.test(f) || /^(src\/)?app\/page\.(t|j)sx?$/.test(f));
const appRoutes = files.filter((f) => /^(src\/)?app\/.*\/route\.(t|j)s$/.test(f));
const pagesRoutes = files.filter((f) => /^(src\/)?pages\/.*\.(t|j)sx?$/.test(f) && !/\/(api)\//.test(f));
const apiRoutes = files.filter((f) => /^(src\/)?pages\/api\/.*\.(t|j)s$/.test(f));

const counts = {
  filesScanned: files.length,
  sourceFiles: sourceFiles.length,
  appPages: appPages.length,
  appRouteHandlers: appRoutes.length,
  pagesRoutes: pagesRoutes.length,
  pagesApiRoutes: apiRoutes.length,
};

const patternCounts = {
  useClient: 0,
  useServer: 0,
  useCache: 0,
  generateMetadata: 0,
  metadataExport: 0,
  nextHead: 0,
  nextImageImport: 0,
  rawImgTags: 0,
  nextLinkImport: 0,
  rawAnchorTags: 0,
  targetBlank: 0,
  targetBlankWithoutRel: 0,
  forms: 0,
  inputs: 0,
  labels: 0,
  ariaCurrent: 0,
  ariaLive: 0,
  dangerouslySetInnerHTML: 0,
  jsonLd: 0,
};

const notableFiles = [];
for (const f of sourceFiles) {
  const s = safeRead(f);
  if (!s) continue;
  const add = (key, re) => { const m = s.match(re); if (m) patternCounts[key] += m.length; };
  add('useClient', /['"]use client['"]/g);
  add('useServer', /['"]use server['"]/g);
  add('useCache', /['"]use cache(?:: private|: remote)?['"]/g);
  add('generateMetadata', /generateMetadata\s*\(/g);
  add('metadataExport', /export\s+(?:const|let|var)\s+metadata\b/g);
  add('nextHead', /from\s+['"]next\/head['"]/g);
  add('nextImageImport', /from\s+['"]next\/image['"]/g);
  add('rawImgTags', /<img\b/g);
  add('nextLinkImport', /from\s+['"]next\/link['"]/g);
  add('rawAnchorTags', /<a\b/g);
  add('targetBlank', /target=['"]_blank['"]/g);
  add('forms', /<form\b/g);
  add('inputs', /<(input|textarea|select)\b/g);
  add('labels', /<label\b/g);
  add('ariaCurrent', /aria-current=/g);
  add('ariaLive', /aria-live=/g);
  add('dangerouslySetInnerHTML', /dangerouslySetInnerHTML/g);
  add('jsonLd', /application\/ld\+json|@context\s*[:=]\s*['"]https?:\/\/schema\.org/g);
  if (/metadata|schema|jsonLd|robots|sitemap|generateMetadata|next\/head|next\/script|next\/image/i.test(s)) {
    notableFiles.push(f);
  }
  const blanks = s.match(/target=['"]_blank['"][^>]*>/g) || [];
  for (const tag of blanks) {
    if (!/rel=/.test(tag) || !/noopener/.test(tag)) patternCounts.targetBlankWithoutRel += 1;
  }
}

const nextVersion = pkg.dependencies?.next || pkg.devDependencies?.next || null;
const router = exists('app') || exists('src/app')
  ? (exists('pages') || exists('src/pages') ? 'hybrid-app-and-pages' : 'app-router')
  : (exists('pages') || exists('src/pages') ? 'pages-router' : 'unknown');

const configFiles = files.filter((f) => /(^|\/)(next\.config|tsconfig|eslint\.config|\.eslintrc|tailwind\.config|postcss\.config|vercel\.json|Dockerfile|middleware\.|proxy\.|robots\.|sitemap\.|manifest\.)/.test(f));

const routes = {
  appPages: appPages.map((f) => ({ file: f, route: routeFromAppPage(f) })),
  appRouteHandlers: appRoutes.map((f) => ({ file: f, route: routeFromAppPage(f) })),
  pagesRoutes: pagesRoutes.map((f) => ({ file: f, route: routeFromPages(f) })).filter((x) => x.route),
  pagesApiRoutes: apiRoutes,
};

const result = {
  root,
  generatedAt: new Date().toISOString(),
  package: {
    name: pkg.name || null,
    version: pkg.version || null,
    scripts: pkg.scripts || {},
    nextVersion,
    reactVersion: pkg.dependencies?.react || pkg.devDependencies?.react || null,
  },
  detected: {
    router,
    hasSrcDir: exists('src'),
    hasAppDir: exists('app') || exists('src/app'),
    hasPagesDir: exists('pages') || exists('src/pages'),
    hasPublicDir: exists('public'),
    hasMiddleware: files.some((f) => /(^|\/)middleware\.(t|j)s$/.test(f)),
    hasProxy: files.some((f) => /(^|\/)proxy\.(t|j)s$/.test(f)),
    hasRobots: files.some((f) => /(^|\/)(robots\.(t|j)s|robots\.txt)$/.test(f)),
    hasSitemap: files.some((f) => /(^|\/)(sitemap\.(t|j)s|sitemap\.xml)$/.test(f)),
    hasManifest: files.some((f) => /(^|\/)manifest\.(t|j)s(on)?$|(^|\/)manifest\.json$/.test(f)),
  },
  counts,
  patternCounts,
  configFiles,
  routes,
  notableFiles: [...new Set(notableFiles)].slice(0, 200),
};

console.log(JSON.stringify(result, null, 2));
