#!/usr/bin/env node
/*
  scripts/fix_api_imports.js

  Scans and fixes API route folders and import paths in:
    - src/app/api/**
    - src/app/**
    - src/components/**
    - src/lib/**

  Creates or updates `route.ts` files to export HTTP handlers (GET/POST stubs if missing).
  Converts `@/...` imports to relative imports and fixes relative imports when target files exist.
  Removes unresolved imports and records all changes in a final report printed to stdout.

  Usage: node scripts/fix_api_imports.js

  Notes:
  - This script is conservative: it creates backups of files it modifies as `.bak`.
  - It only touches files under `src/app`, `src/components`, and `src/lib`.
*/

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');

const REPORT = {
  apiVerified: [],
  apiCreated: [],
  apiModified: [],
  importsFixed: [],
  importsRemoved: [],
  filesModified: [],
  errors: []
};

function toPosix(p) {
  return p.split(path.sep).join('/');
}

async function exists(file) {
  try { await fsp.access(file); return true; } catch { return false; }
}

async function readFileSafe(file) {
  try { return await fsp.readFile(file, 'utf8'); } catch (e) { return null; }
}

async function writeFileSafe(file, content) {
  await fsp.writeFile(file, content, 'utf8');
}

async function backupFile(file) {
  try {
    const data = await fsp.readFile(file, 'utf8');
    const bak = file + '.bak';
    await fsp.writeFile(bak, data, 'utf8');
  } catch (e) { /* ignore */ }
}

function tryExtensions(base) {
  const exts = ['.ts', '.tsx', '.js', '.jsx'];
  const candidates = [];
  for (const e of exts) candidates.push(base + e);
  for (const e of exts) candidates.push(path.join(base, 'index' + e));
  return candidates;
}

async function resolveImport(fromDir, importPath) {
  // return absolute file path if resolved, else null
  if (!importPath) return null;
  // handle absolute alias starting with @/
  if (importPath.startsWith('@/')) {
    const rel = importPath.slice(2); // after @/
    const candidateBase = path.join(SRC, rel);
    for (const c of tryExtensions(candidateBase)) if (await exists(c)) return c;
    return null;
  }

  // handle relative imports
  if (importPath.startsWith('.')) {
    const base = path.resolve(fromDir, importPath);
    for (const c of tryExtensions(base)) if (await exists(c)) return c;
    return null;
  }

  // non-relative, non-@ imports (node_modules / package) - assume ok
  return null;
}

function makeRelativeImport(fromFile, targetFile) {
  const fromDir = path.dirname(fromFile);
  let rel = path.relative(fromDir, targetFile);
  rel = toPosix(rel);
  if (!rel.startsWith('.')) rel = './' + rel;
  // strip extension
  rel = rel.replace(/(\.tsx?|\.jsx?)$/i, '');
  return rel;
}

async function walkDir(dir, cb) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git' || e.name === 'public' || e.name === 'styles') continue;
      await walkDir(p, cb);
    } else {
      await cb(p);
    }
  }
}

const IMPORT_RE = /(^\s*import[\s\S]*?from\s*['"]([^'\"]+)['"];?)/mg;

async function processImportsInFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.ts', '.tsx', '.js', '.jsx'].includes(ext)) return;
  const relPath = path.relative(ROOT, file);
  let content = await readFileSafe(file);
  if (content === null) return;

  let modified = false;
  const importChanges = [];
  const importsToRemove = [];

  const dir = path.dirname(file);
  let m;
  // collect matches first to avoid issues replacing while iterating
  const matches = [];
  while ((m = IMPORT_RE.exec(content)) !== null) {
    matches.push({ full: m[1], path: m[2], index: m.index });
  }

  for (const im of matches) {
    const importPath = im.path;
    // skip bare imports (package) - assume fine
    if (!importPath.startsWith('.') && !importPath.startsWith('@/')) continue;
    try {
      const resolved = await resolveImport(dir, importPath);
      if (resolved) {
        const newRel = makeRelativeImport(file, resolved);
        if (newRel !== importPath) {
          content = content.replace(im.full, im.full.replace(importPath, newRel));
          modified = true;
          importChanges.push({ file: relPath, from: importPath, to: newRel });
        }
      } else {
        // try another strategy: if importPath like ../something but referencing src via alias
        if (!importPath.startsWith('@/')) {
          const tryAlias = importPath.replace(/^\.\.?\//, '');
          const aliasPath = path.join(SRC, tryAlias);
          let found = null;
          for (const c of tryExtensions(aliasPath)) if (await exists(c)) { found = c; break; }
          if (found) {
            const newRel = makeRelativeImport(file, found);
            content = content.replace(im.full, im.full.replace(importPath, newRel));
            modified = true;
            importChanges.push({ file: relPath, from: importPath, to: newRel });
            continue;
          }
        }

        // unresolved - remove the import line
        content = content.replace(im.full, '');
        modified = true;
        importsToRemove.push({ file: relPath, import: importPath });
      }
    } catch (e) {
      REPORT.errors.push({ file: relPath, error: String(e) });
    }
  }

  if (modified) {
    try {
      await backupFile(file);
      await writeFileSafe(file, content);
      REPORT.filesModified.push(relPath);
      for (const c of importChanges) REPORT.importsFixed.push(c);
      for (const r of importsToRemove) REPORT.importsRemoved.push(r);
    } catch (e) {
      REPORT.errors.push({ file: relPath, error: String(e) });
    }
  }
}

async function ensureRouteFile(dir) {
  // dir is folder under src/app/api/... representing a route
  const routePath = path.join(dir, 'route.ts');
  const rel = path.relative(ROOT, routePath);
  let modified = false;
  if (!(await exists(routePath))) {
    // create a simple stub route.ts with GET and POST
    const stub = `import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true, route: '${toPosix(path.relative(path.join(SRC, 'app', 'api'), dir))}' });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ ok: true, body });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }
}
`;
    try {
      await writeFileSafe(routePath, stub);
      REPORT.apiCreated.push(rel);
      REPORT.filesModified.push(path.relative(ROOT, routePath));
    } catch (e) {
      REPORT.errors.push({ file: rel, error: String(e) });
    }
    return;
  }

  // if exists, check for exported methods
  const content = await readFileSafe(routePath);
  if (content === null) return;
  const hasGET = /export\s+async\s+function\s+GET\s*\(/.test(content);
  const hasPOST = /export\s+async\s+function\s+POST\s*\(/.test(content);
  const hasPUT = /export\s+async\s+function\s+PUT\s*\(/.test(content);
  const hasDELETE = /export\s+async\s+function\s+DELETE\s*\(/.test(content);

  let newContent = content;
  const appended = [];
  if (!hasGET) { appended.push("export async function GET() { return new Response('ok', { status: 200 }); }"); }
  if (!hasPOST) { appended.push("export async function POST() { return new Response('ok', { status: 200 }); }"); }

  if (appended.length) {
    newContent = content + '\n\n/* auto-added handlers */\n' + appended.join('\n');
    try {
      await backupFile(routePath);
      await writeFileSafe(routePath, newContent);
      REPORT.apiModified.push(rel);
      REPORT.filesModified.push(path.relative(ROOT, routePath));
    } catch (e) {
      REPORT.errors.push({ file: rel, error: String(e) });
    }
  } else {
    REPORT.apiVerified.push(rel);
  }
}

async function processApiRoutes() {
  const apiRoot = path.join(SRC, 'app', 'api');
  if (!(await exists(apiRoot))) return;
  // Walk directories under apiRoot; ensure every directory which contains files or nested dirs has a route.ts
  async function walk(d) {
    const entries = await fsp.readdir(d, { withFileTypes: true });
    let hasFile = false;
    for (const e of entries) {
      if (e.isFile()) hasFile = true;
      else if (e.isDirectory()) {
        await walk(path.join(d, e.name));
        hasFile = true;
      }
    }
    if (hasFile) {
      await ensureRouteFile(d);
    }
  }
  await walk(apiRoot);
}

async function ensureAuthRegister() {
  const target = path.join(SRC, 'app', 'api', 'auth', 'register');
  const routeFile = path.join(target, 'route.ts');
  if (!(await exists(target))) {
    await fsp.mkdir(target, { recursive: true });
  }
  if (!(await exists(routeFile))) {
    const content = `import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // TODO: wire to real registration logic (lib/auth)
    return NextResponse.json({ ok: true, received: body });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }
}
`;
    await writeFileSafe(routeFile, content);
    REPORT.apiCreated.push(path.relative(ROOT, routeFile));
    REPORT.filesModified.push(path.relative(ROOT, routeFile));
  } else {
    // check imports validity inside this file
    await processImportsInFile(routeFile);
    REPORT.apiVerified.push(path.relative(ROOT, routeFile));
  }
}

async function main() {
  console.log('Scanning and fixing API routes and imports (this may take a moment)...');
  try {
    // 1) Fix imports in target dirs
    const targetDirs = [path.join(SRC, 'app'), path.join(SRC, 'components'), path.join(SRC, 'lib')];
    for (const d of targetDirs) {
      if (!(await exists(d))) continue;
      await walkDir(d, async (file) => {
        const skip = file.includes(path.join('src', 'app', 'api')) && path.basename(file) === 'route.ts';
        // We'll process api route.ts separately
        if (skip) return;
        await processImportsInFile(file);
      });
    }

    // 2) Process API routes
    await processApiRoutes();

    // 3) Ensure /api/auth/register
    await ensureAuthRegister();

    // 4) Also run import fix pass on api route files
    const apiRoot = path.join(SRC, 'app', 'api');
    if (await exists(apiRoot)) {
      await walkDir(apiRoot, async (file) => {
        if (['.ts', '.tsx', '.js', '.jsx'].includes(path.extname(file))) {
          await processImportsInFile(file);
        }
      });
    }

    // final report
    console.log('\n===== FIX REPORT =====\n');
    console.log('API files created:', REPORT.apiCreated.length ? '\n  - ' + REPORT.apiCreated.join('\n  - ') : 'none');
    console.log('\nAPI files modified:', REPORT.apiModified.length ? '\n  - ' + REPORT.apiModified.join('\n  - ') : 'none');
    console.log('\nAPI files verified (already OK):', REPORT.apiVerified.length ? '\n  - ' + REPORT.apiVerified.join('\n  - ') : 'none');
    console.log('\nImports fixed:', REPORT.importsFixed.length ? '\n  - ' + REPORT.importsFixed.map(i=>`${i.file}: ${i.from} -> ${i.to}`).join('\n  - ') : 'none');
    console.log('\nImports removed (unresolved):', REPORT.importsRemoved.length ? '\n  - ' + REPORT.importsRemoved.map(i=>`${i.file}: ${i.import}`).join('\n  - ') : 'none');
    console.log('\nFiles modified (backups created with .bak):', REPORT.filesModified.length ? '\n  - ' + REPORT.filesModified.join('\n  - ') : 'none');
    if (REPORT.errors.length) {
      console.log('\nErrors encountered:');
      for (const e of REPORT.errors) console.log('- ', e.file || '', e.error || JSON.stringify(e));
    }

    console.log('\nDone. Please run `npm run build` to verify the project compiles.');
  } catch (e) {
    console.error('Fatal error:', e);
    process.exitCode = 2;
  }
}

main();
