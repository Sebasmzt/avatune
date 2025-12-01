# @avatune/api-client

[![npm version](https://img.shields.io/npm/v/@avatune/api-client)](https://www.npmjs.com/package/@avatune/api-client)
[![npm bundle size](https://img.shields.io/npm/unpacked-size/@avatune/api-client)](https://www.npmjs.com/package/@avatune/api-client)

Typed API client for Avatune REST API.

## Installation

```bash
npm install @avatune/api-client
```

## Usage

```ts
import { createClient } from '@avatune/api-client'

const client = createClient({
  apiKey: 'your-api-key',
})

// Generate avatar URL
const url = client.getAvatarUrl('kyute', {
  seed: 'user@example.com',
  hair: 'short',
  hairColor: '#ff6b6b',
})

// Or generate avatar as base64
const base64 = await client.getAvatarBase64('kyute', {
  seed: 'user@example.com',
})
```

## API

### `createClient(config)`

Creates an API client instance.

```ts
const client = createClient({
  apiKey: string      // Your Avatune API key
  baseUrl?: string    // Custom API base URL (optional)
})
```

### `client.getAvatarUrl(theme, params)`

Returns a URL string for the avatar image.

### `client.getAvatarBase64(theme, params)`

Returns the avatar as a base64-encoded string.

### Supported Themes

- `kyute`
- `nevmstas`
- `micah`
- `miniavs`
- `pacovqzz`
- `yanliu`
- `fatin-verse`

## License

MIT
