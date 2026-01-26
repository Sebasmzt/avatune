import { createOpenAPI } from '@scalar/openapi-router'
import type { OpenAPIDocument } from 'openapi3-ts'

export function createOpenAPISpec(): OpenAPIDocument {
  const themeNames = [
    'ashley-seo',
    'fatin-verse', 
    'kyute',
    'micah',
    'miniavs',
    'nevmstas',
    'pacovqzz',
    'pawel-olek-man',
    'pawel-olek-woman',
    'yanliu'
  ]

  return createOpenAPI({
    openapi: '3.1.0',
    info: {
      title: 'Avatar Generation API',
      description: 'API for generating customizable avatars with different themes and styles',
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
    paths: {
      '/themes': {
        get: {
          summary: 'List available themes',
          description: 'Returns a list of all available avatar themes',
          tags: ['Themes'],
          responses: {
            200: {
              description: 'List of available themes',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      themes: {
                        type: 'array',
                        items: {
                          type: 'string',
                          enum: themeNames
                        },
                        example: themeNames
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/random': {
        get: {
          summary: 'Generate random avatar',
          description: 'Generates a random avatar with optional theme and seed parameters',
          tags: ['Avatars'],
          parameters: [
            {
              name: 'theme',
              in: 'query',
              description: 'Specific theme to use (optional)',
              schema: {
                type: 'string',
                enum: themeNames
              },
              example: 'kyute'
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
            200: {
              description: 'Generated avatar SVG',
              content: {
                'image/svg+xml': {
                  schema: {
                    type: 'string',
                    example: '<svg width="400" height="400">...</svg>'
                  }
                }
              },
              headers: {
                'X-Avatar-Seed': {
                  description: 'The seed used for avatar generation',
                  schema: { type: 'string' }
                },
                'X-Avatar-Theme': {
                  description: 'The theme used for avatar generation',
                  schema: { type: 'string' }
                }
              }
            },
            429: {
              description: 'Rate limit exceeded'
            }
          }
        }
      },
      '/': {
        post: {
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
                  additionalProperties: true,
                  examples: {
                    simple: {
                      summary: 'Simple random avatar',
                      value: {}
                    },
                    withTheme: {
                      summary: 'Avatar with specific theme',
                      value: {
                        theme: 'kyute',
                        seed: 'user123'
                      }
                    },
                    randomTheme: {
                      summary: 'Random theme with seed',
                      value: {
                        theme: 'random',
                        seed: 'deterministic456'
                      }
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Generated avatar SVG',
              content: {
                'image/svg+xml': {
                  schema: {
                    type: 'string',
                    example: '<svg width="400" height="400">...</svg>'
                  }
                }
              }
            },
            400: {
              description: 'Bad request - invalid theme or configuration'
            },
            429: {
              description: 'Rate limit exceeded'
            }
          }
        }
      },
      '/docs': {
        get: {
          summary: 'API Documentation',
          description: 'Interactive API documentation powered by Scalar',
          tags: ['Documentation'],
          responses: {
            200: {
              description: 'Scalar UI documentation interface',
              content: {
                'text/html': {
                  schema: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Avatars',
        description: 'Avatar generation endpoints'
      },
      {
        name: 'Themes',
        description: 'Theme management endpoints'
      },
      {
        name: 'Documentation',
        description: 'API documentation'
      }
    ],
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            }
          },
          required: ['error']
        },
        RateLimitError: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Rate limit error message'
            }
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
  })
}