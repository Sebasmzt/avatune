import type { OpenAPIDocument } from 'openapi3-ts'

interface Route {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  summary: string
  description?: string
  parameters?: Array<{
    name: string
    in: 'query' | 'path' | 'header'
    description?: string
    required?: boolean
    schema: any
    example?: any
  }>
  requestBody?: {
    description?: string
    required?: boolean
    content?: {
      'application/json'?: {
        schema: any
        examples?: Record<string, { summary?: string; value: any }>
      }
    }
  }
  responses: Record<string, {
    description: string
    content?: Record<string, { schema: any; example?: any }>
    headers?: Record<string, { description: string; schema: any }>
  }>
  tags?: string[]
}

export function generateOpenAPISpec(themeNames: string[]): OpenAPIDocument {
  const routes: Route[] = [
    {
      path: '/themes',
      method: 'GET',
      summary: 'List available themes',
      description: 'Returns a list of all available avatar themes',
      tags: ['Themes'],
      responses: {
        '200': {
          description: 'List of available themes',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  themes: {
                    type: 'array',
                    items: { type: 'string', enum: themeNames },
                    example: themeNames
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      path: '/random',
      method: 'GET',
      summary: 'Generate random avatar',
      description: 'Generates a random avatar with optional theme and seed parameters',
      tags: ['Avatars'],
      parameters: [
        {
          name: 'theme',
          in: 'query',
          description: 'Specific theme to use (optional)',
          schema: { type: 'string', enum: themeNames },
          example: themeNames[0]
        },
        {
          name: 'seed',
          in: 'query',
          description: 'Seed for deterministic avatar generation (optional)',
          schema: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]+$',
            minLength: 1,
            maxLength: 20
          },
          example: 'abc123'
        }
      ],
      responses: {
        '200': {
          description: 'Generated avatar SVG',
          content: {
            'image/svg+xml': {
              schema: { type: 'string', example: '<svg width="400" height="400">...</svg>' }
            }
          },
          headers: {
            'X-Avatar-Seed': { description: 'The seed used for avatar generation', schema: { type: 'string' } },
            'X-Avatar-Theme': { description: 'The theme used for avatar generation', schema: { type: 'string' } }
          }
        },
        '429': { description: 'Rate limit exceeded' }
      }
    },
    {
      path: '/',
      method: 'GET',
      summary: 'Generate avatar',
      description: 'Generates an avatar with query parameters. Works like api.avatune.dev - use the same seed to regenerate the same avatar.',
      tags: ['Avatars'],
      parameters: [
        {
          name: 'theme',
          in: 'query',
          description: 'Theme to use (required)',
          required: true,
          schema: { type: 'string', enum: themeNames },
          example: themeNames[0]
        },
        {
          name: 'seed',
          in: 'query',
          description: 'Seed for deterministic avatar generation. Save this to regenerate the same avatar later.',
          schema: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]+$',
            minLength: 1,
            maxLength: 20
          },
          example: 'user123'
        },
        {
          name: 'size',
          in: 'query',
          description: 'Avatar dimensions in pixels',
          schema: { type: 'integer' },
          example: 400
        },
        {
          name: 'backgroundColor',
          in: 'query',
          description: 'Background color (hex)',
          schema: { type: 'string' },
          example: '#f0f0f0'
        }
      ],
      responses: {
        '200': {
          description: 'Generated avatar SVG',
          content: {
            'image/svg+xml': {
              schema: { type: 'string', example: '<svg width="400" height="400">...</svg>' }
            }
          },
          headers: {
            'X-Avatar-Seed': { description: 'The seed used (save this to regenerate the same avatar)', schema: { type: 'string' } },
            'X-Avatar-Theme': { description: 'The theme used', schema: { type: 'string' } },
            'X-Avatar-Config': { description: 'JSON-encoded config options used', schema: { type: 'string' } }
          }
        },
        '400': { description: 'Bad request - missing or invalid theme' },
        '429': { description: 'Rate limit exceeded' }
      }
    },
    {
      path: '/',
      method: 'POST',
      summary: 'Generate avatar with configuration',
      description: 'Generates an avatar with specific configuration parameters',
      tags: ['Avatars'],
      requestBody: {
        description: 'Avatar configuration',
        required: false,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                theme: {
                  type: 'string',
                  enum: ['random', ...themeNames],
                  description: 'Theme name or "random" for random theme selection',
                  default: 'random'
                },
                seed: {
                  type: 'string',
                  description: 'Seed for deterministic avatar generation',
                  pattern: '^[a-zA-Z0-9]+$',
                  minLength: 1,
                  maxLength: 20
                }
              },
              additionalProperties: true
            },
            examples: {
              simple: { summary: 'Simple random avatar', value: {} },
              withTheme: { summary: 'Avatar with specific theme', value: { theme: themeNames[0], seed: 'user123' } },
              randomTheme: { summary: 'Random theme with seed', value: { theme: 'random', seed: 'deterministic456' } }
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Generated avatar SVG',
          content: {
            'image/svg+xml': {
              schema: { type: 'string', example: '<svg width="400" height="400">...</svg>' }
            }
          },
          headers: {
            'X-Avatar-Seed': { description: 'The seed used for avatar generation (save this to regenerate later)', schema: { type: 'string' } },
            'X-Avatar-Theme': { description: 'The theme used for avatar generation', schema: { type: 'string' } },
            'X-Avatar-Config': { description: 'JSON-encoded configuration used for avatar generation', schema: { type: 'string' } }
          }
        },
        '400': { description: 'Bad request - invalid theme or configuration' },
        '429': { description: 'Rate limit exceeded' }
      }
    },
    {
      path: '/docs',
      method: 'GET',
      summary: 'API Documentation',
      description: 'Interactive API documentation powered by Scalar',
      tags: ['Documentation'],
      responses: {
        '200': {
          description: 'Scalar UI documentation interface',
          content: {
            'text/html': {
              schema: { type: 'string' }
            }
          }
        }
      }
    },
    {
      path: '/openapi.json',
      method: 'GET',
      summary: 'OpenAPI Specification',
      description: 'Raw OpenAPI 3.1.0 specification in JSON format',
      tags: ['Documentation'],
      responses: {
        '200': {
          description: 'OpenAPI specification',
          content: {
            'application/json': {
              schema: { type: 'object' }
            }
          }
        }
      }
    }
  ]

  // Build paths object
  const paths: Record<string, any> = {}
  
  routes.forEach(route => {
    if (!paths[route.path]) {
      paths[route.path] = {}
    }
    
    paths[route.path][route.method.toLowerCase()] = {
      summary: route.summary,
      description: route.description,
      tags: route.tags,
      parameters: route.parameters,
      requestBody: route.requestBody,
      responses: route.responses
    }
  })

  return {
    openapi: '3.1.0',
    info: {
      title: 'Avatar Generation API',
      description: 'API for generating customizable avatars with different themes and styles. Automatically generated from source code.',
      version: '1.0.0',
      contact: {
        name: 'Avatune API',
        url: 'https://avatune.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://api.avatar.sebasgc.xyz',
        description: 'Production server'
      }
    ],
    paths,
    tags: [
      { name: 'Avatars', description: 'Avatar generation endpoints' },
      { name: 'Themes', description: 'Theme management endpoints' },
      { name: 'Documentation', description: 'API documentation' }
    ],
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', description: 'Error message' }
          },
          required: ['error']
        },
        RateLimitError: {
          type: 'object',
          properties: {
            error: { type: 'string', description: 'Rate limit error message' }
          },
          required: ['error']
        }
      },
      securitySchemes: {
        rateLimit: {
          type: 'apiKey',
          in: 'header',
          name: 'X-RateLimit-Limit',
          description: 'Rate limiting is applied per IP address'
        }
      }
    }
  }
}