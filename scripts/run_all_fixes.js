const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const ROOT = path.resolve(__dirname, '..')

function walk(dir) {
  const res = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) res.push(...walk(p))
    else res.push(p)
  }
  return res
}

function removeBakFiles() {
  const removed = []
  const files = walk(ROOT)
  for (const f of files) {
    if (f.endsWith('.bak')) {
      try {
        fs.unlinkSync(f)
        removed.push(path.relative(ROOT, f).split(path.sep).join('/'))
      } catch (e) {
        // ignore
      }
    }
  }
  return removed
}

function runScript(scriptPath) {
  const abs = path.join(ROOT, scriptPath)
  if (!fs.existsSync(abs)) return { ok: false, skipped: true }
  console.log(`\n> Running ${scriptPath}`)
  const res = spawnSync(process.execPath, [abs], { cwd: ROOT, encoding: 'utf8' })
  return { ok: res.status === 0, code: res.status, stdout: res.stdout, stderr: res.stderr }
}

function safeReadJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'))
  } catch (e) { return null }
}

function main() {
  console.log('Run all fixes — starting')

  // 1. delete .bak files
  const deleted = removeBakFiles()
  console.log(`Removed ${deleted.length} .bak files`)
  if (deleted.length) console.log(deleted.join('\n'))

  // 2. run existing fix scripts
  const scriptsToRun = [
    'scripts/move_backup.js',
    'scripts/auto_fix_routes_and_imports.js',
    'scripts/fix_api_imports.js'
  ]
  const runResults = {}
  for (const s of scriptsToRun) runResults[s] = runScript(s)

  // 3. ensure imports corrected (auto_fix and fix_api_imports do heavy lifting)
  // 4. generate final report
  const gen = runScript('scripts/generate_fix_report.js')
  if (!gen.ok && !gen.skipped) console.warn('generate_fix_report.js failed — report may be missing')

  const reportPath = path.join(ROOT, 'fix_report.json')
  const report = safeReadJSON(reportPath) || { apiRoutes: [], backups: [], brokenImports: [] }

  // 5. console summary
  console.log('\n=== Fix Summary ===')
  console.log(`.bak files removed: ${deleted.length}`)
  console.log('Scripts run:')
  for (const s of scriptsToRun) {
    const r = runResults[s]
    if (r.skipped) console.log(` - ${s}: skipped (not found)`)
    else console.log(` - ${s}: exit ${r.code} ${r.ok ? 'OK' : 'FAILED'}`)
  }
  console.log(` - scripts/generate_fix_report.js: ${gen.ok ? 'OK' : gen.skipped ? 'skipped' : 'FAILED'}`)

  console.log('\nAPI routes found:', report.apiRoutes.length)
  for (const r of report.apiRoutes.slice(0, 200)) console.log(' -', r)

  console.log('\nBackups (detected):', report.backups.length)
  for (const b of report.backups.slice(0, 200)) console.log(' -', b)

  console.log('\nBroken imports found:', report.brokenImports.length)
  for (const bi of report.brokenImports.slice(0, 200)) console.log(` - ${bi.file} -> ${bi.import}`)

  // write a final consolidated report with actions
  const final = {
    removedBakFiles: deleted,
    scriptResults: Object.fromEntries(Object.entries(runResults).map(([k,v])=>[k,{skipped:!!v.skipped,ok:!!v.ok,code:v.code}])),
    report
  }
  fs.writeFileSync(path.join(ROOT, 'fix_run_summary.json'), JSON.stringify(final, null, 2), 'utf8')
  console.log('\nWrote fix_run_summary.json')

  console.log('\nRun all fixes — completed')
}

main()
