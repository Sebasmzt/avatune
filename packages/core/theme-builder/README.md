# @avatune/theme-builder

[![npm version](https://img.shields.io/npm/v/@avatune/theme-builder)](https://www.npmjs.com/package/@avatune/theme-builder)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@avatune/theme-builder)](https://bundlephobia.com/package/@avatune/theme-builder)

Theme builder utilities for creating custom Avatune themes.

## Installation

```bash
npm install @avatune/theme-builder
```

## Usage

```ts
import { createTheme, pos, absPos, fromHead, combinePositions } from '@avatune/theme-builder'

const theme = createTheme({
  style: {
    size: 200,
    backgroundColor: '#ffffff',
  },
  head: {
    standard: {
      Component: HeadComponent,
      position: pos(0, 0),
      layer: 0,
    },
  },
  hair: {
    short: {
      Component: ShortHairComponent,
      position: fromHead(0, -0.1),
      layer: 10,
    },
  },
  // ... other parts
})
```

## API

### `createTheme(config)`

Creates a theme configuration object.

### Position Utilities

- `pos(x, y)` - Create a static position
- `absPos(x, y)` - Create an absolute position
- `fromHead(xRatio, yRatio)` - Create position relative to head
- `combinePositions(...positions)` - Combine multiple position functions

## License

MIT
