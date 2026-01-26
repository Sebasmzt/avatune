import { avatar } from '@avatune/vanilla'
import type { VanillaTheme } from '@avatune/types'
import { generateOpenAPISpec } from './openapi-generator'

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

// Generate OpenAPI specification
const openAPISpec = generateOpenAPISpec(themeNames)

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
  'Access-Control-Expose-Headers': 'X-Avatar-Seed, X-Avatar-Theme, X-Avatar-Config',
}



// In-memory rate limiting
class RateLimiter {
  private requests: Map<string, number[]> = new Map()
  private blocked: Map<string, number> = new Map()
  
  constructor(
    private maxRequests: number = 100,
    private windowMs: number = 60000, // 1 minute
    private blockDurationMs: number = 600000 // 10 minutes
  ) {}

  isAllowed(ip: string): { allowed: boolean; remaining: number; resetTime?: number } {
    const now = Date.now()
    
    // Check if IP is blocked
    const blockedUntil = this.blocked.get(ip)
    if (blockedUntil && blockedUntil > now) {
      return { 
        allowed: false, 
        remaining: 0, 
        resetTime: blockedUntil 
      }
    }
    
    // Remove expired block
    if (blockedUntil && blockedUntil <= now) {
      this.blocked.delete(ip)
    }
    
    const windowStart = now - this.windowMs
    
    // Get existing requests for this IP
    let timestamps = this.requests.get(ip) || []
    
    // Filter out old requests outside the window
    timestamps = timestamps.filter(timestamp => timestamp > windowStart)
    
    // Check if limit exceeded
    if (timestamps.length >= this.maxRequests) {
      // Block the IP for 10 minutes
      this.blocked.set(ip, now + this.blockDurationMs)
      return { 
        allowed: false, 
        remaining: 0, 
        resetTime: now + this.blockDurationMs 
      }
    }
    
    // Add current request
    timestamps.push(now)
    this.requests.set(ip, timestamps)
    
    // Clean up old entries periodically
    if (Math.random() < 0.01) { // 1% chance to clean up
      this.cleanup()
    }
    
    return { 
      allowed: true, 
      remaining: this.maxRequests - timestamps.length,
      resetTime: now + this.windowMs
    }
  }
  
  private cleanup(): void {
    const now = Date.now()
    const windowStart = now - this.windowMs
    
    // Clean up requests
    for (const [ip, timestamps] of this.requests.entries()) {
      const filtered = timestamps.filter(timestamp => timestamp > windowStart)
      if (filtered.length === 0) {
        this.requests.delete(ip)
      } else {
        this.requests.set(ip, filtered)
      }
    }
    
    // Clean up expired blocks
    for (const [ip, blockedUntil] of this.blocked.entries()) {
      if (blockedUntil <= now) {
        this.blocked.delete(ip)
      }
    }
  }
}

const rateLimiter = new RateLimiter(
  parseInt(process.env.RATE_LIMIT_REQUESTS || '100'),
  parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
  parseInt(process.env.RATE_LIMIT_BLOCK_DURATION_MS || '600000')
)

const server = Bun.serve({
  port: parseInt(process.env.PORT || '3000'),
  async fetch(req) {
    const startTime = Date.now()
    const clientIP = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     '127.0.0.1'
    
    // Rate limiting check
    const rateLimitResult = rateLimiter.isAllowed(clientIP)
    if (!rateLimitResult.allowed) {
      const retryAfter = Math.ceil((rateLimitResult.resetTime! - Date.now()) / 1000)
      return new Response('Rate limit exceeded. Try again later.', {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': process.env.RATE_LIMIT_REQUESTS || '100',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': Math.ceil(rateLimitResult.resetTime! / 1000).toString(),
          ...corsHeaders,
        },
      })
    }
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    const url = new URL(req.url)

// GET /themes - list available themes
    if (req.method === 'GET' && url.pathname === '/themes') {
      const response = new Response(JSON.stringify({ themes: themeNames }), {
        headers: { 
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': process.env.RATE_LIMIT_REQUESTS || '100',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': Math.ceil(rateLimitResult.resetTime! / 1000).toString(),
          ...corsHeaders 
        },
      })
       
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
       
      const response = new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'X-Avatar-Seed': seed,
          'X-Avatar-Theme': usedThemeName,
          'X-RateLimit-Limit': process.env.RATE_LIMIT_REQUESTS || '100',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': Math.ceil(rateLimitResult.resetTime! / 1000).toString(),
          ...corsHeaders,
        },
      })
       
      return response
    }

    // GET / - generate avatar with query params (like api.avatune.dev)
    if (req.method === 'GET' && url.pathname === '/') {
      const themeName = url.searchParams.get('theme')

      // Theme is required (like Cloudflare Worker)
      if (!themeName) {
        return new Response(
          `Missing required parameter: theme. Available themes: ${themeNames.join(', ')}`,
          { status: 400, headers: corsHeaders }
        )
      }

      if (!themes[themeName]) {
        return new Response(
          `Unknown theme: ${themeName}. Available: ${themeNames.join(', ')}`,
          { status: 400, headers: corsHeaders }
        )
      }

      const theme = themes[themeName]
      const seed = url.searchParams.get('seed') || generateRandomSeed()

      // Extract all other query params as config (size, hair, body, etc.)
      const config: Record<string, string> = {}
      for (const [key, value] of url.searchParams.entries()) {
        if (key !== 'theme' && key !== 'seed') {
          config[key] = value
        }
      }

      const svg = avatar({ theme, seed, ...config })

      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=31536000, immutable',
          'X-Avatar-Seed': seed,
          'X-Avatar-Theme': themeName,
          'X-Avatar-Config': JSON.stringify(config),
          'X-RateLimit-Limit': process.env.RATE_LIMIT_REQUESTS || '100',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': Math.ceil(rateLimitResult.resetTime! / 1000).toString(),
          ...corsHeaders,
        },
      })
    }

    // POST / - generate avatar with config
    if (req.method === 'POST' && url.pathname === '/') {
      try {
        const body = await req.json()
        const { theme: themeName, seed: providedSeed, ...config } = body as { theme?: string; seed?: string; [key: string]: unknown }

        const seed = providedSeed || generateRandomSeed()

        let theme: VanillaTheme
        let usedThemeName: string
        if (themeName === 'random' || !themeName) {
          const randomIndex = Math.floor(Math.random() * themeNames.length)
          usedThemeName = themeNames[randomIndex]
          theme = themes[usedThemeName]
        } else if (themes[themeName]) {
          theme = themes[themeName]
          usedThemeName = themeName
        } else {
          return new Response(`Unknown theme: ${themeName}. Available: ${themeNames.join(', ')}`, {
            status: 400,
            headers: corsHeaders,
          })
        }

        const svg = avatar({ theme, seed, ...config })

        return new Response(svg, {
          headers: {
            'Content-Type': 'image/svg+xml',
            'X-Avatar-Seed': seed,
            'X-Avatar-Theme': usedThemeName,
            'X-Avatar-Config': JSON.stringify(config),
            'X-RateLimit-Limit': process.env.RATE_LIMIT_REQUESTS || '100',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': Math.ceil(rateLimitResult.resetTime! / 1000).toString(),
            ...corsHeaders
          },
        })
      } catch (e) {
        if (e instanceof Error) {
          return new Response(e.message, { status: 400, headers: corsHeaders })
        }
        return new Response('An unknown error occurred', { status: 500, headers: corsHeaders })
      }
    }



    // GET /docs - Scalar UI documentation
    if (req.method === 'GET' && url.pathname === '/docs') {
      const html = await Bun.file('./src/docs.html').text()
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html',
          ...corsHeaders,
        },
      })
    }

    // GET /openapi.json - OpenAPI specification
    if (req.method === 'GET' && url.pathname === '/openapi.json') {
      return new Response(JSON.stringify(openAPISpec, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      })
    }

    return new Response('Not Found. Try GET /?theme=name&seed=value, GET /random, GET /themes, GET /docs, or POST /', {
      status: 404,
      headers: corsHeaders,
    })
  },
})

const apiUrl = process.env.API_URL || `http://localhost:${server.port}`

console.log(`Listening on ${apiUrl} ...`)
console.log(`Available themes: ${themeNames.join(', ')}`)
console.log(`
Endpoints:
  GET  /               - Generate avatar (?theme=name&seed=value&hair=short&...) [like api.avatune.dev]
  GET  /random         - Generate random avatar (optional: ?theme=name&seed=value)
  GET  /themes         - List available themes
  GET  /docs           - Interactive API documentation (Scalar UI)
  GET  /openapi.json   - OpenAPI specification
  POST /               - Generate avatar with config { theme?: string, seed?: string, ... }

Response headers: X-Avatar-Seed, X-Avatar-Theme, X-Avatar-Config

Example: ${apiUrl}/?theme=kyute&seed=user123
`)
