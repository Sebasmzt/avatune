#!/usr/bin/env bun
/**
 * Generates README files for theme packages with credits, license, and usage examples
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseArgs } from 'node:util'

type Framework = 'react' | 'vue' | 'svelte' | 'vanilla'

interface ThemeInfo {
  name: string
  packageName: string
  assetsPackageName: string
  displayName: string
  hasCredits: boolean
  creditsContent?: string
  exampleItems?: {
    hair?: string
    body?: string
  }
}

// Discover available themes
async function discoverThemes(): Promise<ThemeInfo[]> {
  const packagesDir = join(process.cwd(), 'packages')
  const packages = readdirSync(packagesDir)

  const themePackages = packages.filter((pkg) => pkg.endsWith('-theme'))

  const themes = await Promise.all(
    themePackages.map(async (pkg) => {
      const name = pkg.replace('-theme', '')
      const assetsName = `${name}-assets`
      const creditsPath = join(packagesDir, assetsName, 'CREDITS.md')

      const hasCredits = existsSync(creditsPath)
      const creditsContent = hasCredits
        ? readFileSync(creditsPath, 'utf-8').trim()
        : undefined

      // Try to extract example items from vanilla.ts source file
      let exampleItems: { hair?: string; body?: string } | undefined
      try {
        const vanillaSourcePath = join(packagesDir, pkg, 'src', 'vanilla.ts')
        if (existsSync(vanillaSourcePath)) {
          const sourceCode = readFileSync(vanillaSourcePath, 'utf-8')

          // Extract hair items from withComponents('hair', { ... }) blocks
          const hairMatch = sourceCode.match(/\.withComponents\('hair',\s*\{([^}]+)\}/s)
          if (hairMatch) {
            const hairBlock = hairMatch[1]
            const hairKeys = hairBlock.match(/(\w+):\s*\{/g)
            if (hairKeys && hairKeys.length > 0) {
              exampleItems = exampleItems || {}
              exampleItems.hair = hairKeys[0].replace(/:\s*\{/, '').trim()
            }
          }

          // Extract body items from withComponents('body', { ... }) blocks
          const bodyMatch = sourceCode.match(/\.withComponents\('body',\s*\{([^}]+)\}/s)
          if (bodyMatch) {
            const bodyBlock = bodyMatch[1]
            const bodyKeys = bodyBlock.match(/(\w+):\s*\{/g)
            if (bodyKeys && bodyKeys.length > 0) {
              exampleItems = exampleItems || {}
              exampleItems.body = bodyKeys[0].replace(/:\s*\{/, '').trim()
            }
          }
        }
      } catch (error) {
        // If we can't parse the source, we'll use generic examples
        console.warn(`Could not parse theme ${pkg} for examples:`, error)
      }

      return {
        name,
        packageName: pkg,
        assetsPackageName: assetsName,
        displayName: toPascalCase(name).replace(/([A-Z])/g, ' $1').trim(),
        hasCredits,
        creditsContent,
        exampleItems,
      }
    })
  )

  return themes
}

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function generateFrameworkExample(framework: Framework, packageName: string): string {
  switch (framework) {
    case 'react':
      return `\`\`\`tsx
import { Avatar } from '@avatune/react'
import theme from '@avatune/${packageName}/react'

function App() {
  return (
    <Avatar
      theme={theme}
      size={300}
      seed="optional-seed-for-random-generation"
    />
  )
}
\`\`\``

    case 'vue':
      return `\`\`\`vue
<script setup lang="ts">
import { Avatar } from '@avatune/vue'
import theme from '@avatune/${packageName}/vue'
</script>

<template>
  <Avatar
    :theme="theme"
    :size="300"
    seed="optional-seed-for-random-generation"
  />
</template>
\`\`\``

    case 'svelte':
      return `\`\`\`svelte
<script lang="ts">
  import { Avatar } from '@avatune/svelte'
  import theme from '@avatune/${packageName}/svelte'
</script>

<Avatar
  theme={theme}
  size={300}
  seed="optional-seed-for-random-generation"
/>
\`\`\``

    case 'vanilla':
      return `\`\`\`typescript
import { avatar } from '@avatune/vanilla'
import theme from '@avatune/${packageName}/vanilla'

const container = document.getElementById('avatar-container')
const svg = avatar({
  theme,
  size: 300,
  seed: 'optional-seed-for-random-generation',
})

container?.appendChild(svg)
\`\`\``
  }
}

function generateREADME(theme: ThemeInfo): string {
  const { packageName, assetsPackageName, displayName, hasCredits, creditsContent, exampleItems } = theme

  // Use actual items from theme or fallback to generic examples
  const hairExample = exampleItems?.hair || 'braids'
  const bodyExample = exampleItems?.body || 'sweaterVest'

  return `# @avatune/${packageName}

Avatar theme for Avatune using ${displayName.toLowerCase()} design assets.

## Installation

\`\`\`bash
npm install @avatune/${packageName}
\`\`\`

## Usage

This theme is available for multiple frameworks: React, Vue, Svelte, and Vanilla JavaScript.

### React

${generateFrameworkExample('react', packageName)}

### Vue

${generateFrameworkExample('vue', packageName)}

### Svelte

${generateFrameworkExample('svelte', packageName)}

### Vanilla JavaScript

${generateFrameworkExample('vanilla', packageName)}

## Customization

You can override specific avatar parts:

\`\`\`tsx
<Avatar
  theme={theme}
  size={300}
  hair="${hairExample}"          // Choose specific hair style
  hairColor="#FF5733"    // Custom hair color
  body="${bodyExample}"     // Choose specific clothing
  bodyColor="#3498DB"    // Custom clothing color
/>
\`\`\`

## Design Assets

This theme uses assets from the [\`@avatune/${assetsPackageName}\`](../packages/${assetsPackageName}) package.

${hasCredits ? `## Credits & License\n\n${creditsContent}` : ''}

## Related Packages

- [\`@avatune/${assetsPackageName}\`](../packages/${assetsPackageName}) - SVG assets used by this theme
- [\`@avatune/react\`](../packages/react) - React avatar renderer
- [\`@avatune/vue\`](../packages/vue) - Vue avatar renderer
- [\`@avatune/svelte\`](../packages/svelte) - Svelte avatar renderer
- [\`@avatune/vanilla\`](../packages/vanilla) - Vanilla JavaScript avatar renderer

## Development

\`\`\`bash
# Build the theme
bun run build

# Build in watch mode
bun run dev

# Type checking
bun run check-types
\`\`\`
`
}

// Main execution
async function main() {
  const { values } = parseArgs({
    options: {
      theme: {
        type: 'string',
        short: 't',
      },
    },
  })

  const allThemes = await discoverThemes()
  const themes = values.theme
    ? allThemes.filter((t) => t.name === values.theme)
    : allThemes

  if (themes.length === 0) {
    console.error(`No themes found${values.theme ? ` matching "${values.theme}"` : ''}`)
    process.exit(1)
  }

  console.log(`Generating README for ${themes.length} theme(s)...`)

  for (const theme of themes) {
    const content = generateREADME(theme)
    const outputPath = join(
      process.cwd(),
      'packages',
      theme.packageName,
      'README.md',
    )

    writeFileSync(outputPath, content, 'utf-8')
    console.log(`✓ Generated README for ${theme.displayName} at ${outputPath}`)
  }
}

main()
