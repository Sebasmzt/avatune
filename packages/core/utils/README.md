# @avatune/utils

[![npm version](https://img.shields.io/npm/v/@avatune/utils)](https://www.npmjs.com/package/@avatune/utils)
[![npm bundle size](https://img.shields.io/npm/unpacked-size/@avatune/utils)](https://www.npmjs.com/package/@avatune/utils)

Utility functions for Avatune avatar generation.

## Installation

```bash
npm install @avatune/utils
```

## Usage

```ts
import {
  seededRandom,
  selectItem,
  selectColor,
  selectItems,
  hashString,
} from '@avatune/utils'
```

## API

### `seededRandom(seed)`

Creates a seeded random number generator for reproducible results.

```ts
const random = seededRandom('user@example.com')
console.log(random()) // Always returns same sequence for same seed
```

### `selectItem(collection, identifier?, random?)`

Selects an avatar item from a collection.

```ts
const result = selectItem(theme.hair, 'short')
// { key: 'short', item: { ... } }
```

### `selectColor(options, random?)`

Selects a color from color options (string or array).

```ts
const color = selectColor(['#ff0000', '#00ff00', '#0000ff'], random)
```

### `selectItems(config, theme, predictions?)`

Selects all items and colors for avatar generation based on config, theme, and optional ML predictions.

```ts
const { selected, identifiers, colors, style } = selectItems(
  { seed: 'user@example.com', hair: 'short' },
  theme,
  { hairColor: 'brown', skinTone: 'medium' }
)
```

### `hashString(str)`

Simple string hash function for generating numeric seeds.

```ts
const hash = hashString('user@example.com')
```

## License

MIT
