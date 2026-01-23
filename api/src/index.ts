import { avatar } from '@avatune/vanilla'
import type { AvatarConfig, VanillaTheme } from '@avatune/types'
import { requestCounter, themeCounter, countryCounter, responseTimeHistogram } from './otel'

// Initialize OpenTelemetry
import('./otel')

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

async function getCountryFromIP(ip: string): Promise<string> {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`)
    const data = await response.json()
    return data.country || 'unknown'
  } catch {
    return 'unknown'
  }
}

const server = Bun.serve({
  port: parseInt(process.env.PORT || '3000'),
  async fetch(req) {
    const startTime = Date.now()
    const clientIP = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     '127.0.0.1'
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    const url = new URL(req.url)

    // GET /themes - list available themes
    if (req.method === 'GET' && url.pathname === '/themes') {
      requestCounter.add(1, { endpoint: '/themes', method: 'GET' })
      const country = await getCountryFromIP(clientIP)
      countryCounter.add(1, { country })
      
      const response = new Response(JSON.stringify({ themes: themeNames }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
      
      responseTimeHistogram.record((Date.now() - startTime) / 1000)
      return response
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
      
      // Track metrics
      requestCounter.add(1, { endpoint: '/random', method: 'GET' })
      themeCounter.add(1, { theme: usedThemeName })
      const country = await getCountryFromIP(clientIP)
      countryCounter.add(1, { country })
      
      const response = new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'X-Avatar-Seed': seed,
          'X-Avatar-Theme': usedThemeName,
          ...corsHeaders,
        },
      })
      
      responseTimeHistogram.record((Date.now() - startTime) / 1000)
      return response
    }

    // POST / - generate avatar with config
    if (req.method === 'POST' && url.pathname === '/') {
      try {
        const body = await req.json()
        const { theme: themeName, ...config } = body as { theme?: string } & AvatarConfig<VanillaTheme>

        let theme: VanillaTheme
        let usedThemeName: string
        if (themeName === 'random' || !themeName) {
          theme = getRandomTheme()
          usedThemeName = 'random'
        } else if (themes[themeName]) {
          theme = themes[themeName]
          usedThemeName = themeName
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
        
        // Track metrics
        requestCounter.add(1, { endpoint: '/', method: 'POST' })
        themeCounter.add(1, { theme: usedThemeName })
        const country = await getCountryFromIP(clientIP)
        countryCounter.add(1, { country })
        
        const response = new Response(svg, {
          headers: { 'Content-Type': 'image/svg+xml', ...corsHeaders },
        })
        
        responseTimeHistogram.record((Date.now() - startTime) / 1000)
        return response
      } catch (e) {
        if (e instanceof Error) {
          return new Response(e.message, { status: 400, headers: corsHeaders })
        }
        return new Response('An unknown error occurred', { status: 500, headers: corsHeaders })
      }
    }

    // GET /metrics - OpenTelemetry metrics endpoint (handled by PrometheusExporter)
    // The PrometheusExporter will automatically handle this route

    return new Response('Not Found. Try GET /random, GET /themes, GET /metrics, or POST /', {
      status: 404,
      headers: corsHeaders,
    })
  },
})

console.log(`Listening on http://localhost:${server.port} ...`)
console.log(`Available themes: ${themeNames.join(', ')}`)
console.log(`Metrics available on http://localhost:${server.port}/metrics`)
console.log(`
Endpoints:
  GET  /random         - Generate random avatar (optional: ?theme=name&seed=value)
  GET  /themes         - List available themes
  GET  /metrics        - OpenTelemetry metrics (Prometheus format)
  POST /               - Generate avatar with config { theme?: string, seed?: string, ... }
`)
