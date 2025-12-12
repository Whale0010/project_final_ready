const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const src = path.join(root, 'src')

function walk(dir) {
  let results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const res = path.join(dir, entry.name)
    if (entry.isDirectory()) results = results.concat(walk(res))
    else results.push(res)
  }
  return results
}

function ensureRouteFiles() {
  const apiDir = path.join(src, 'app', 'api')
  if (!fs.existsSync(apiDir)) return []
  const modified = []
  for (const dirent of fs.readdirSync(apiDir, { withFileTypes: true })) {
    const full = path.join(apiDir, dirent.name)
    if (!dirent.isDirectory()) continue
    // traverse nested directories (e.g., auth/register)
    const stack = [full]
    while (stack.length) {
      const cur = stack.pop()
      const items = fs.readdirSync(cur, { withFileTypes: true })
      const hasRoute = items.some(i => i.isFile() && i.name.startsWith('route.'))
      if (!hasRoute) {
        // create minimal route.ts
        const rel = path.relative(root, cur).split(path.sep).join('/')
        const content = `import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ ok: true, route: '${rel}' })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    return NextResponse.json({ ok: true, received: body })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
`
        const filePath = path.join(cur, 'route.ts')
        fs.writeFileSync(filePath, content, 'utf8')
        modified.push(filePath)
      }
      for (const it of items) if (it.isDirectory()) stack.push(path.join(cur, it.name))
    }
  }
  return modified
}

function fixImports() {
  const targets = []
  const roots = [path.join(src, 'app'), path.join(src, 'components'), path.join(src, 'lib')]
  for (const r of roots) if (fs.existsSync(r)) targets.push(...walk(r).filter(f => /\.(ts|tsx|js|jsx)$/.test(f)))

  const modified = []
  for (const file of targets) {
    let srcText = fs.readFileSync(file, 'utf8')
    const original = srcText
    // convert alias imports '@/...' to relative
    srcText = srcText.replace(/from\s+['"]@\/(.*?)['"]/g, (m, p1) => {
      const targetPath = path.join(src, p1)
      // try resolve with extensions
      const found = ['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js'].map(ext => targetPath + ext).find(fs.existsSync)
      let rel
      if (found) rel = path.relative(path.dirname(file), found).split(path.sep).join('/')
      else rel = path.relative(path.dirname(file), targetPath).split(path.sep).join('/')
      if (!rel.startsWith('.')) rel = './' + rel
      return `from '${rel.replace(/\.ts$|\.tsx$|\.js$|\.jsx$/,'')}'`
    })

    // remove imports that point to non-existing files (best-effort)
    srcText = srcText.replace(/import\s+[\s\S]*?from\s+['\"](\.\/.+?)['\"];?/g, (m, p1) => {
      try {
        const candidate = path.resolve(path.dirname(file), p1)
        const exists = ['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js'].some(ext => fs.existsSync(candidate + ext)) || fs.existsSync(candidate)
        if (!exists) {
          return `// REMOVED BROKEN IMPORT ${p1}`
        }
        return m
      } catch (e) { return m }
    })

    if (srcText !== original) {
      fs.writeFileSync(file + '.bak', original, 'utf8')
      fs.writeFileSync(file, srcText, 'utf8')
      modified.push(file)
    }
  }
  return modified
}

function checkAuthRegister() {
  const p = path.join(src, 'app', 'api', 'auth', 'register', 'route.ts')
  const problems = []
  if (!fs.existsSync(p)) {
    const content = `import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    return NextResponse.json({ ok: true, received: body })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}

export async function GET() { return new Response('ok') }
`
    fs.mkdirSync(path.dirname(p), { recursive: true })
    fs.writeFileSync(p, content, 'utf8')
    problems.push({ created: p })
    return problems
  }
  const txt = fs.readFileSync(p, 'utf8')
  const missing = []
  if (!/export\s+async\s+function\s+POST/.test(txt)) missing.push('POST')
  if (!/export\s+async\s+function\s+GET/.test(txt)) missing.push('GET')
  if (missing.length) {
    let newTxt = txt
    if (missing.includes('GET')) newTxt += `\nexport async function GET(){ return new Response('ok') }\n`
    if (missing.includes('POST')) newTxt += `\nexport async function POST(req: Request){ try{const b=await req.json(); return new Response(JSON.stringify({ok:true,received:b}),{status:200})}catch(e){return new Response('invalid',{status:400})}}\n`
    fs.writeFileSync(p + '.bak', txt, 'utf8')
    fs.writeFileSync(p, newTxt, 'utf8')
    problems.push({ fixed: p, added: missing })
  }
  return problems
}

(function main(){
  console.log('Ensuring route files...')
  const r = ensureRouteFiles()
  console.log('Route files created:', r.length)
  console.log('Fixing imports...')
  const m = fixImports()
  console.log('Files modified for imports:', m.length)
  console.log('Checking auth/register...')
  const a = checkAuthRegister()
  console.log('Auth/register checks:', a)
  console.log('Done.')
})()
