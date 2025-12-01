# @avatune/rsbuild-plugin-raw-svg

[![npm version](https://img.shields.io/npm/v/@avatune/rsbuild-plugin-raw-svg)](https://www.npmjs.com/package/@avatune/rsbuild-plugin-raw-svg)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@avatune/rsbuild-plugin-raw-svg)](https://bundlephobia.com/package/@avatune/rsbuild-plugin-raw-svg)

Rsbuild plugin to import SVG files as raw strings with SVGO optimization.

## Usage

```ts
import { defineConfig } from '@rslib/core'
import { pluginRawSvg } from '@avatune/rsbuild-plugin-raw-svg'

export default defineConfig({
  plugins: [pluginRawSvg()],
})
```

In your code:

```ts
import iconSvg from './icon.svg?raw'

// iconSvg is now a string containing optimized SVG code
console.log(iconSvg) // '<svg>...</svg>'
```

## Options

```ts
pluginRawSvg({
  svgo?: boolean              // Enable/disable SVGO (default: true)
  svgoConfig?: SvgoConfig     // SVGO optimization config
  imports?: string            // Additional imports to inject
  replaceAttrValues?: Record<string, string>  // Replace attribute values
  exclude?: RegExp | RegExp[] // Files to exclude
})
```

## Import Queries

- `?raw` - Import as optimized SVG string

## License

MIT
