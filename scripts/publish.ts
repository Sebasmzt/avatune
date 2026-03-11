import { execSync, spawnSync } from 'node:child_process'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

function isVersionPublished(name: string, version: string): boolean {
  const result = spawnSync('npm', ['view', `${name}@${version}`, 'version'], {
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe'],
  })
  return result.status === 0 && result.stdout.trim() === version
}

const root = join(import.meta.dirname, '..')

const changesetConfig = JSON.parse(
  readFileSync(join(root, '.changeset/config.json'), 'utf-8'),
)
const ignoredPackages = new Set<string>(changesetConfig.ignore ?? [])

const packageGroups = readdirSync(join(root, 'packages'))

const results: {
  name: string
  version: string
  ok: boolean
  message: string
}[] = []
let published = 0
let skipped = 0
let failed = 0

for (const group of packageGroups) {
  const groupDir = join(root, 'packages', group)
  if (!statSync(groupDir).isDirectory()) continue

  for (const pkg of readdirSync(groupDir)) {
    const pkgDir = join(groupDir, pkg)
    if (!statSync(pkgDir).isDirectory()) continue

    const pkgJsonPath = join(pkgDir, 'package.json')
    let pkgJson: { name?: string; private?: boolean; version?: string }
    try {
      pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'))
    } catch {
      continue
    }

    const name = pkgJson.name ?? pkg
    const version = pkgJson.version ?? 'unknown'

    if (pkgJson.private) {
      results.push({ name, version, ok: false, message: 'skipped (private)' })
      skipped++
      continue
    }

    if (ignoredPackages.has(name)) {
      results.push({
        name,
        version,
        ok: false,
        message: 'skipped (changeset ignore)',
      })
      skipped++
      continue
    }

    if (isVersionPublished(name, version)) {
      results.push({ name, version, ok: true, message: 'already published' })
      skipped++
      continue
    }

    console.log(`\nPublishing ${name}@${version}...`)

    try {
      execSync('bun publish --access public', {
        cwd: pkgDir,
        stdio: 'inherit',
      })
      results.push({ name, version, ok: true, message: 'published' })
      published++
    } catch {
      results.push({ name, version, ok: false, message: 'failed' })
      failed++
    }
  }
}

console.log('\n--- Publish Summary ---')
for (const { name, version, ok, message } of results) {
  console.log(`${ok ? '✓' : '✗'} ${name}@${version} — ${message}`)
}
console.log(
  `\nTotal: ${results.length} | Published: ${published} | Skipped: ${skipped} | Failed: ${failed}`,
)

console.log('\nTagging releases...')
execSync('bunx changeset tag', { cwd: root, stdio: 'inherit' })
console.log('Done.')
