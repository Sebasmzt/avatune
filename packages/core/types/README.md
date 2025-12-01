# @avatune/types

[![npm version](https://img.shields.io/npm/v/@avatune/types)](https://www.npmjs.com/package/@avatune/types)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@avatune/types)](https://bundlephobia.com/package/@avatune/types)

TypeScript type definitions for Avatune packages.

## Installation

```bash
npm install @avatune/types
```

## Usage

```ts
import type {
  Theme,
  ReactTheme,
  VueTheme,
  SvelteTheme,
  VanillaTheme,
  AvatarItem,
  AvatarConfig,
  AvatarPartCategory,
  Predictions,
} from '@avatune/types'
```

## Types

### Theme Types

- `Theme<T>` - Base theme interface
- `ReactTheme` - Theme with React components
- `ReactNativeTheme` - Theme with React Native components
- `VueTheme` - Theme with Vue components
- `SvelteTheme` - Theme with Svelte components
- `VanillaTheme` - Theme with vanilla SVG code

### Avatar Item Types

- `AvatarItem` - Base avatar item
- `ReactAvatarItem` - React component avatar item
- `VueAvatarItem` - Vue component avatar item
- `SvelteAvatarItem` - Svelte component avatar item
- `VanillaAvatarItem` - Vanilla SVG avatar item

### Configuration Types

- `AvatarConfig<I, T>` - Type-safe avatar configuration
- `AvatarPartCategory` - Avatar part categories (hair, eyes, mouth, etc.)
- `ThemeColorPalettes` - Color palette configuration
- `ThemePredictorMappings` - ML predictor mappings

### Predictor Types

- `Predictions` - Combined predictor results
- `HairLengthPredictorClass` - Hair length classes
- `HairColorPredictorClass` - Hair color classes
- `SkinTonePredictorClass` - Skin tone classes

## License

MIT
