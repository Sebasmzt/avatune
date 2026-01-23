import { NodeSDK } from '@opentelemetry/sdk-node'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { metrics } from '@opentelemetry/api'

const prometheusExporter = new PrometheusExporter({
  port: parseInt(process.env.METRICS_PORT || '9464'),
  endpoint: '/metrics',
})

const sdk = new NodeSDK({
  instrumentations: [new HttpInstrumentation()],
  metricExporter: prometheusExporter,
})

sdk.start()

// Export metrics for use in the main app
export const meter = metrics.getMeter('avatar-api')

// Create counters
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