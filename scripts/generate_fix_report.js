const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const src = path.join(root, 'src')

function listApiRoutes() {
  const apiRoot = path.join(src, 'app', 'api')
  const routes = []
  if (!fs.existsSync(apiRoot)) return routes
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(p)
      else if (entry.isFile() && entry.name.startsWith('route')) {
        routes.push(path.relative(root, dir).split(path.sep).join('/') + '/route')
      }
    }
  }
  walk(apiRoot)
  return routes
}

function listBakFiles() {
  const results = []
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(p)
      else if (entry.isFile() && p.endsWith('.bak')) results.push(path.relative(root, p).split(path.sep).join('/'))
    }
  }
  walk(root)
  return results
}

function findBrokenImports() {
  const files = []
  const roots = [path.join(src, 'app'), path.join(src, 'components'), path.join(src, 'lib')]
  for (const r of roots) if (fs.existsSync(r)) files.push(...walkFiles(r))

  const broken = []
  for (const f of files) {
    const txt = fs.readFileSync(f, 'utf8')
    const imports = [...txt.matchAll(/from\s+['"](.*?)['"]/g)].map(m=>m[1]).filter(Boolean)
    for (const imp of imports) {
      if (imp.startsWith('.') ) {
        const candidate = path.resolve(path.dirname(f), imp)
        const exists = ['.ts','.tsx','.js','.jsx','/index.ts','/index.tsx','/index.js'].some(ext=>fs.existsSync(candidate+ext)) || fs.existsSync(candidate)
        if (!exists) broken.push({file: path.relative(root,f).split(path.sep).join('/'), import: imp})
      }
    }
  }
  return broken
}

function walkFiles(dir){
  let res=[]
  for (const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,entry.name)
    if(entry.isDirectory()) res=res.concat(walkFiles(p))
    else if(/\.(ts|tsx|js|jsx)$/.test(entry.name)) res.push(p)
  }
  return res
}

const report = {
  apiRoutes: listApiRoutes(),
  backups: listBakFiles(),
  brokenImports: findBrokenImports()
}

const out = JSON.stringify(report, null, 2)
fs.writeFileSync(path.join(root,'fix_report.json'), out, 'utf8')
console.log('Report written to fix_report.json')
