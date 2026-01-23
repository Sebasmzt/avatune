import { avatar } from '@avatune/vanilla'
import type { AvatarConfig, VanillaTheme } from '@avatune/types'

// Import all themes
import ashleySeoTheme from '@avatune/ashley-seo-theme/vanilla'
import fatinVerseTheme from '@avatune/fatin-verse-theme/vanilla'
import kyuteTheme from '@avatune/kyute-theme/vanilla'
import micahTheme from '@avatune/micah-theme/vanilla'
import miniavsTheme from '@avatune/miniavs-theme/vanilla'
import nevmstasTheme from '@avatune/nevmstas-theme/vanilla'
import pacovqzzTheme from '@avatune/pacovqzz-theme/vanilla'
import pawelOlekManTheme from '@avatune/pawel-olek-man-theme/vanilla'
import pawelOlekWomanTheme from '@avatune/pawel-olek-woman-theme/vanilla'
import yanliuTheme from '@avatune/yanliu-theme/vanilla'

const themes: Record<string, VanillaTheme> = {
  'ashley-seo': ashleySeoTheme,
  'fatin-verse': fatinVerseTheme,
  'kyute': kyuteTheme,
  'micah': micahTheme,
  'miniavs': miniavsTheme,
  'nevmstas': nevmstasTheme,
  'pacovqzz': pacovqzzTheme,
  'pawel-olek-man': pawelOlekManTheme,
  'pawel-olek-woman': pawelOlekWomanTheme,
  'yanliu': yanliuTheme,
}

const themeNames = Object.keys(themes)

function getRandomTheme(): VanillaTheme {
  const randomIndex = Math.floor(Math.random() * themeNames.length)
  return themes[themeNames[randomIndex]]
}

function generateRandomSeed(): string {
  return Math.random().toString(36).substring(2, 15)
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Expose-Headers': 'X-Avatar-Seed, X-Avatar-Theme',
}

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    const url = new URL(req.url)

    // GET /themes - list available themes
    if (req.method === 'GET' && url.pathname === '/themes') {
      return new Response(JSON.stringify({ themes: themeNames }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // GET /random - generate a fully random avatar
    if (req.method === 'GET' && url.pathname === '/random') {
      const themeName = url.searchParams.get('theme')
      const seed = url.searchParams.get('seed') || generateRandomSeed()

      let theme: VanillaTheme
      let usedThemeName: string
      if (themeName && themes[themeName]) {
        theme = themes[themeName]
        usedThemeName = themeName
      } else {
        const randomIndex = Math.floor(Math.random() * themeNames.length)
        usedThemeName = themeNames[randomIndex]
        theme = themes[usedThemeName]
      }

      const svg = avatar({ theme, seed })

      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'X-Avatar-Seed': seed,
          'X-Avatar-Theme': usedThemeName,
          ...corsHeaders,
        },
      })
    }

    // POST / - generate avatar with config
    if (req.method === 'POST' && url.pathname === '/') {
      try {
        const body = await req.json()
        const { theme: themeName, ...config } = body as { theme?: string } & AvatarConfig<VanillaTheme>

        let theme: VanillaTheme
        if (themeName === 'random' || !themeName) {
          theme = getRandomTheme()
        } else if (themes[themeName]) {
          theme = themes[themeName]
        } else {
          return new Response(`Unknown theme: ${themeName}. Available: ${themeNames.join(', ')}`, {
            status: 400,
            headers: corsHeaders,
          })
        }

        // If no config provided, use random seed
        const finalConfig = Object.keys(config).length === 0
          ? { seed: generateRandomSeed() }
          : config

        const svg = avatar({ theme, ...finalConfig })

        return new Response(svg, {
          headers: { 'Content-Type': 'image/svg+xml', ...corsHeaders },
        })
      } catch (e) {
        if (e instanceof Error) {
          return new Response(e.message, { status: 400, headers: corsHeaders })
        }
        return new Response('An unknown error occurred', { status: 500, headers: corsHeaders })
      }
    }

    return new Response('Not Found. Try GET /random, GET /themes, or POST /', {
      status: 404,
      headers: corsHeaders,
    })
  },
})

console.log(`Listening on http://localhost:${server.port} ...`)
console.log(`Available themes: ${themeNames.join(', ')}`)
console.log(`
Endpoints:
  GET  /random         - Generate random avatar (optional: ?theme=name&seed=value)
  GET  /themes         - List available themes
  POST /               - Generate avatar with config { theme?: string, seed?: string, ... }
`)
