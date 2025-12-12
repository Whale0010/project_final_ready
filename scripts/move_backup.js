#!/usr/bin/env node
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')

const root = process.cwd()

const moves = [
  { from: 'nouveau_dossier_3/app/chat/page.tsx', to: 'src/app/chat/page.tsx' },
  { from: 'nouveau_dossier_3/app/help/page.tsx', to: 'src/app/help/page.tsx' },
  // convert pages/api/deepseek.ts -> app/api/chat/deepseek/route.ts
  { from: 'nouveau_dossier_3/pages/api/deepseek.ts', to: 'src/app/api/chat/deepseek/route.ts' },
  { from: 'nouveau_dossier_3/components/ChatBot.tsx', to: 'src/components/chat/ChatBot.tsx' },
  { from: 'nouveau_dossier_3/components/ChatRoom.tsx', to: 'src/components/chat/ChatRoom.tsx' },
  { from: 'nouveau_dossier_3/lib/firebase.ts', to: 'src/lib/firebase/config.ts' },
]

const extensionsToStrip = ['.ts', '.tsx', '.js', '.jsx']
function stripExt(p) {
  for (const e of extensionsToStrip) if (p.endsWith(e)) return p.slice(0, -e.length)
  return p
}
function toPosix(p) { return p.split(path.sep).join('/') }

;(async ()=>{
  console.log('Relocating files from nouveau_dossier_3 -> src/...')
  const createdDirs = new Set()
  const movedFiles = []
  const failed = []

  const movesMap = {}
  for (const m of moves) movesMap[path.resolve(root, m.from)] = path.resolve(root, m.to)

  for (const m of moves) {
    const oldAbs = path.resolve(root, m.from)
    const newAbs = path.resolve(root, m.to)
    try {
      if (!fs.existsSync(oldAbs)) {
        console.warn('SKIP (not found):', m.from)
        // file missing in backup — treat as non-fatal skip
        continue
      }

      const oldDir = path.dirname(oldAbs)
      const newDir = path.dirname(newAbs)
      if (!fs.existsSync(newDir)) {
        await fsp.mkdir(newDir, { recursive: true })
        createdDirs.add(toPosix(path.relative(root, newDir) || '.'))
      }

      let content = await fsp.readFile(oldAbs, 'utf8')

      // Special-case: converting pages/api/deepseek.ts to app route signature
      if (m.from.endsWith('pages/api/deepseek.ts') && m.to.endsWith('route.ts')) {
        // create a simple GET handler using NextResponse
        const body = `import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({ message: 'deepseek API placeholder' })
}
`
        content = body
      } else {
        // adjust relative imports found in the file
        const importExportRegex = /(?:import[\s\S]*?from\s+|export[\s\S]*?from\s+)(['"])(\.{1,2}\/[^'"\)]+?)\1/gm
        const requireRegex = /(?:require\(|import\()\s*(['"])(\.{1,2}\/[^'"\)]+?)\1\s*\)?/gm

        const relPaths = new Set()
        let m1
        importExportRegex.lastIndex = 0
        while ((m1 = importExportRegex.exec(content)) !== null) relPaths.add(m1[2])
        requireRegex.lastIndex = 0
        while ((m1 = requireRegex.exec(content)) !== null) relPaths.add(m1[2])

        const relMap = {}
        for (const rp of relPaths) {
          // resolve candidate absolute
          const absoluteTargetOld = path.resolve(oldDir, rp)
          let resolvedOld = null
          const tryCandidates = [absoluteTargetOld, ...extensionsToStrip.map(e=>absoluteTargetOld+e)]
          for (const cand of tryCandidates) if (fs.existsSync(cand)) { resolvedOld = cand; break }
          if (!resolvedOld) for (const e of extensionsToStrip) { const cand = path.join(absoluteTargetOld, 'index'+e); if (fs.existsSync(cand)) { resolvedOld = cand; break } }
          if (!resolvedOld) {
            const candidate = Object.keys(movesMap).find(k => stripExt(k) === stripExt(absoluteTargetOld))
            if (candidate) resolvedOld = candidate
          }
          if (!resolvedOld) { relMap[rp] = rp; continue }
          const newTargetAbs = movesMap[resolvedOld] || resolvedOld
          let rel = path.relative(newDir, newTargetAbs)
          rel = toPosix(rel)
          for (const e of extensionsToStrip) if (rel.endsWith(e)) { rel = rel.slice(0, -e.length); break }
          if (!rel.startsWith('./') && !rel.startsWith('../')) rel = './' + rel
          relMap[rp] = rel
        }
        for (const [oldRel, newRel] of Object.entries(relMap)) {
          const esc = oldRel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          content = content.replace(new RegExp("(['\"])" + esc + "\\1", 'g'), (w, q) => `${q}${newRel}${q}`)
        }
      }

      await fsp.writeFile(newAbs, content, 'utf8')
      await fsp.unlink(oldAbs)
      movedFiles.push({ from: path.relative(root, oldAbs), to: path.relative(root, newAbs) })
      console.log(`Moved: ${m.from} -> ${m.to}`)
    } catch (err) {
      console.error(`ERROR moving ${m.from} -> ${m.to}:`, err.message || err)
      failed.push({ file: m.from, reason: err.message || String(err) })
    }
  }

  // remove original folder if exists
  const backupDir = path.resolve(root, 'nouveau_dossier_3')
  try {
    if (fs.existsSync(backupDir)) {
      await fsp.rm(backupDir, { recursive: true, force: true })
      console.log('Removed folder: nouveau_dossier_3')
    }
  } catch (err) { console.warn('Could not remove folder:', err.message || err) }

  console.log('\n--- Summary ---')
  console.log('Created dirs:')
  for (const d of createdDirs) console.log('  -', d)
  console.log('\nMoved files:')
  for (const f of movedFiles) console.log('  -', f.from, '->', f.to)
  if (failed.length) {
    console.log('\nFailed operations:')
    for (const f of failed) console.log('  -', f.file, f.reason)
    process.exitCode = 2
  } else {
    console.log('\nAll requested files moved successfully (skips allowed).')
  }
})()
