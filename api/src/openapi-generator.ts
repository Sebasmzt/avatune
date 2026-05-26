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
  const publicBaseUrl = 'https://avatune.sebasgc.xyz'
  const routes: Route[] = [
    {
      path: '/themes',
      method: 'GET',
      summary: 'List available themes',
      description: 'Returns all available avatar themes. Use one of these names in the `theme` query parameter when calling GET /, GET /random, or POST /.',
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
      description: 'Generates a random avatar. If `theme` is omitted, the API chooses a random theme. If `seed` is omitted, the API creates a random seed. Save the `X-Avatar-Theme` and `X-Avatar-Seed` response headers to regenerate the same avatar later with GET /?theme={theme}&seed={seed}.',
      tags: ['Avatars'],
      parameters: [
        {
          name: 'theme',
          in: 'query',
          description: 'Specific theme to use. Omit this to choose a random theme.',
          schema: { type: 'string', enum: themeNames },
          example: themeNames[0]
        },
        {
          name: 'seed',
          in: 'query',
          description: 'Seed for deterministic avatar generation. Omit this to generate a random seed returned in `X-Avatar-Seed`.',
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
      description: 'Generates an avatar with query parameters. `theme` is required. Use the same `theme` and `seed` to regenerate the same avatar. Any other query parameter is passed to the selected theme as avatar configuration, such as `hair`, `eyes`, `body`, `hairColor`, or `skinColor`.',
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
          description: 'Seed for deterministic avatar generation. If omitted, a random seed is generated and returned in `X-Avatar-Seed`.',
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
        },
        {
          name: 'hair',
          in: 'query',
          description: 'Example theme option. Available part names and values depend on the selected theme.',
          schema: { type: 'string' },
          example: 'braids'
        },
        {
          name: 'body',
          in: 'query',
          description: 'Example theme option. Available part names and values depend on the selected theme.',
          schema: { type: 'string' },
          example: 'sweaterVest'
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
      description: 'Generates an avatar from a JSON body. `theme` can be a theme name or `random`. If `seed` is omitted, the API generates one. Extra JSON properties are passed to the theme as avatar part/color configuration.',
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
                  description: 'Seed for deterministic avatar generation. Omit this to generate a random seed.',
                  pattern: '^[a-zA-Z0-9]+$',
                  minLength: 1,
                  maxLength: 20
                },
                size: {
                  type: 'integer',
                  description: 'Avatar size in pixels'
                },
                backgroundColor: {
                  type: 'string',
                  description: 'Background color as a hex value'
                }
              },
              additionalProperties: true
            },
            examples: {
              simple: { summary: 'Simple random avatar', value: {} },
              withTheme: { summary: 'Avatar with specific theme', value: { theme: themeNames[0], seed: 'user123' } },
              randomTheme: { summary: 'Random theme with seed', value: { theme: 'random', seed: 'deterministic456' } },
              customized: { summary: 'Customized avatar parts', value: { theme: 'yanliu', seed: 'user123', hair: 'braids', body: 'sweaterVest', backgroundColor: '#3498DB' } }
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
    },
    {
      path: '/llms.txt',
      method: 'GET',
      summary: 'LLM-friendly documentation',
      description: 'Markdown documentation for LLMs and agents. Includes base URL, endpoints, themes, seed behavior, random avatar behavior, examples, and rate limit notes.',
      tags: ['Documentation'],
      responses: {
        '200': {
          description: 'Markdown documentation',
          content: {
            'text/markdown': {
              schema: { type: 'string' }
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
        url: publicBaseUrl
      }
    },
    servers: [
      {
        url: publicBaseUrl,
        description: 'Production server'
      },
      {
        url: 'http://localhost:3000',
        description: 'Development server'
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
