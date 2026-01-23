import { NodeSDK } from '@opentelemetry/sdk-node'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { metrics } from '@opentelemetry/api'

console.log('[INIT] Starting OpenTelemetry setup...')

// Create Prometheus exporter with detailed logging
console.log('[INIT] Creating Prometheus exporter...')
const prometheusExporter = new PrometheusExporter({
  port: parseInt(process.env.METRICS_PORT || '9464'),
  endpoint: '/metrics',
})

prometheusExporter.start().then(() => {
  console.log(`[INIT] Prometheus exporter started successfully on port ${process.env.METRICS_PORT || '9464'}`)
}).catch((error) => {
  console.error('[ERROR] Failed to start Prometheus exporter:', error)
})

const sdk = new NodeSDK({
  instrumentations: [
    new HttpInstrumentation({
      requestHook: (span, request) => {
        console.log('[HTTP] Request intercepted:', request.url)
      }
    })
  ],
  metricReader: prometheusExporter,
})

console.log('[INIT] Initializing NodeSDK...')
sdk.start().then(() => {
  console.log('[INIT] NodeSDK started successfully')
}).catch((error) => {
  console.error('[ERROR] Failed to start NodeSDK:', error)
})

// Wait a moment for initialization
setTimeout(() => {
  console.log('[INIT] Creating metrics...')
  
  // Create counters with validation
  try {
    console.log('[INIT] requestCounter created successfully')
  } catch (error) {
    console.error('[ERROR] Failed to create requestCounter:', error)
  }
  
  try {
    console.log('[INIT] themeCounter created successfully')
  } catch (error) {
    console.error('[ERROR] Failed to create themeCounter:', error)
  }
  
  try {
    console.log('[INIT] countryCounter created successfully')
  } catch (error) {
    console.error('[ERROR] Failed to create countryCounter:', error)
  }
  
  try {
    console.log('[INIT] responseTimeHistogram created successfully')
  } catch (error) {
    console.error('[ERROR] Failed to create responseTimeHistogram:', error)
  }
  
  console.log('[INIT] OpenTelemetry initialization complete')
}, 1000)

export const meter = metrics.getMeter('avatar-api')
export const requestCounter = meter.createCounter('avatar_requests_total', {
  description: 'Total number of avatar requests',
})
export const themeCounter = meter.createCounter('avatar_theme_requests_total', {
  description: 'Number of requests per theme',
})
export const countryCounter = meter.createCounter('avatar_country_requests_total', {
  description: 'Number of requests per country',
})
export const responseTimeHistogram = meter.createHistogram('avatar_response_time_seconds', {
  description: 'Response time for avatar generation',
})

console.log(`OpenTelemetry initialized with Prometheus exporter on port ${process.env.METRICS_PORT || '9464'}`)