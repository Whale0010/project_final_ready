const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const env = Object.assign({}, process.env, {
  NEXTAUTH_URL: 'http://localhost:3000',
  NEXTAUTH_SECRET: 'dev_nextauth_secret_change_me',
  MONGODB_URI: 'mongodb://localhost:27017/amed_dev'
})

try {
  console.log('Running build with env...')
  const out = execSync('npm run build', { env, encoding: 'utf8', stdio: 'pipe' })
  fs.writeFileSync(path.join(__dirname, '..', 'build_run_output.log'), out, 'utf8')
  console.log('Build finished (exit 0). Output saved to build_run_output.log')
  process.exit(0)
} catch (err) {
  const out = (err.stdout || '') + '\n' + (err.stderr || '') + '\n' + (err.message || '')
  fs.writeFileSync(path.join(__dirname, '..', 'build_run_output.log'), out, 'utf8')
  console.error('Build failed. See build_run_output.log')
  process.exit(err.status || 1)
}
