import { NodeSDK } from '@opentelemetry/sdk-node'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'
import { metrics } from '@opentelemetry/api'
import { AggregationTemporality } from '@opentelemetry/sdk-metrics/build/src/export/types'

class InMemoryMetricReader {
  private metrics: string[] = []

  async export() {
    // Return Prometheus format metrics
    return this.metrics.join('\n')
  }

  addMetric(metric: string) {
    this.metrics.push(metric)
  }

  async forceFlush() {
    // No-op
  }

  async shutdown() {
    // No-op
  }
}

const inMemoryReader = new InMemoryMetricReader()

const sdk = new NodeSDK({
  instrumentations: [new HttpInstrumentation()],
})

sdk.start()

// Export metrics for use in the main app
export const meter = metrics.getMeter('avatar-api')

// Store metrics for Prometheus formatting
const prometheusMetrics: Map<string, any> = new Map()

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

// Function to get metrics in Prometheus format
export function getPrometheusMetrics(): string {
  let output = ''
  
  // Add help and type for each metric
  output += '# HELP avatar_requests_total Total number of avatar requests\n'
  output += '# TYPE avatar_requests_total counter\n'
  output += '# HELP avatar_theme_requests_total Number of requests per theme\n'
  output += '# TYPE avatar_theme_requests_total counter\n'
  output += '# HELP avatar_country_requests_total Number of requests per country\n'
  output += '# TYPE avatar_country_requests_total counter\n'
  output += '# HELP avatar_response_time_seconds Response time for avatar generation\n'
  output += '# TYPE avatar_response_time_seconds histogram\n'
  
  return output
}

console.log('OpenTelemetry initialized with in-memory metrics')