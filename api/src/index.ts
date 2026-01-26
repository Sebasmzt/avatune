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

async function getCountryFromIP(ip: string): Promise<string> {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`)
    const data = await response.json()
    return data.country || 'unknown'
  } catch {
    return 'unknown'
  }
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
          headers: { 
            'Content-Type': 'image/svg+xml',
            'X-RateLimit-Limit': process.env.RATE_LIMIT_REQUESTS || '100',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': Math.ceil(rateLimitResult.resetTime! / 1000).toString(),
            ...corsHeaders 
          },
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

// GET /metrics - Fetch from metrics server and proxy response
    if (req.method === 'GET' && url.pathname === '/metrics') {
      console.log(`[${new Date().toISOString()}] /metrics endpoint accessed`)
      const metricsPort = process.env.METRICS_PORT || '9464'
      const metricsUrl = `http://localhost:${metricsPort}/metrics`
      
      try {
        console.log(`[${new Date().toISOString()}] Fetching metrics from: ${metricsUrl}`)
        const metricsResponse = await fetch(metricsUrl)
        
        if (!metricsResponse.ok) {
          console.log(`[${new Date().toISOString()}] Metrics server returned status: ${metricsResponse.status}`)
          const errorText = await metricsResponse.text()
          console.log(`[${new Date().toISOString()}] Error response:`, errorText)
          return new Response(`Metrics server error: ${errorText}`, {
            status: 503,
            headers: { 'Content-Type': 'text/plain' },
          })
        }
        
        const metricsText = await metricsResponse.text()
        console.log(`[${new Date().toISOString()}] Successfully fetched metrics (${metricsText.length} chars)`)
        
        return new Response(metricsText, {
          headers: { 'Content-Type': 'text/plain' },
        })
      } catch (error) {
        console.log(`[${new Date().toISOString()}] Failed to fetch metrics:`, error)
        return new Response(`Failed to fetch metrics: ${error}`, {
          status: 503,
          headers: { 'Content-Type': 'text/plain' },
        })
      }
    }

    return new Response('Not Found. Try GET /random, GET /themes, GET /metrics, or POST /', {
      status: 404,
      headers: corsHeaders,
    })
  },
})

const apiUrl = process.env.API_URL || `http://localhost:${server.port}`
const metricsUrl = process.env.METRICS_URL || 'https://metrics.avatar.sebasgc.xyz/metrics'

console.log(`Listening on ${apiUrl} ...`)
console.log(`Available themes: ${themeNames.join(', ')}`)
console.log(`Metrics available at ${metricsUrl}`)
console.log(`
Endpoints:
  GET  /random         - Generate random avatar (optional: ?theme=name&seed=value)
  GET  /themes         - List available themes
  GET  /metrics        - OpenTelemetry metrics (Prometheus format)
  POST /               - Generate avatar with config { theme?: string, seed?: string, ... }
`)
