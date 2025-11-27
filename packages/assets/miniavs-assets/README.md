# @avatune/miniavs-assets

Miniavs style SVG assets for avatar generation.

## Description

This package provides SVG assets in miniavs style for creating customizable avatars. Assets include various options for hair, eyes, eyebrows, mouth, nose, ears, head shape, and body/clothing.

## Installation

```bash
npm install @avatune/miniavs-assets
```

## Usage

### SVG Paths

```typescript
import { hair, eyes, mouth } from '@avatune/miniavs-assets';
```

### React Components

```typescript
import { HairShort, EyesBoring, MouthSmile } from '@avatune/miniavs-assets/react';
```

### Svelte Components

```typescript
import { HairShort, EyesBoring, MouthSmile } from '@avatune/miniavs-assets/svelte';
```

### Vue Components

```typescript
import { HairShort, EyesBoring, MouthSmile } from '@avatune/miniavs-assets/vue';
```

## Available Assets

### Body

| Preview | Filename |
|---------|----------|
| ![golf](./src/svg/body/golf.svg) | `golf` |
| ![standard](./src/svg/body/standard.svg) | `standard` |

### Eyes

| Preview | Filename |
|---------|----------|
| ![confident](./src/svg/eyes/confident.svg) | `confident` |
| ![happy](./src/svg/eyes/happy.svg) | `happy` |
| ![standard](./src/svg/eyes/standard.svg) | `standard` |

### FaceDetails

| Preview | Filename |
|---------|----------|
| ![blushes](./src/svg/faceDetails/blushes.svg) | `blushes` |

### FaceHair

| Preview | Filename |
|---------|----------|
| ![freddy](./src/svg/faceHair/freddy.svg) | `freddy` |
| ![horshoe](./src/svg/faceHair/horshoe.svg) | `horshoe` |
| ![pencilThin](./src/svg/faceHair/pencilThin.svg) | `pencilThin` |
| ![pencilThinBeard](./src/svg/faceHair/pencilThinBeard.svg) | `pencilThinBeard` |

### Glasses

| Preview | Filename |
|---------|----------|
| ![glasses](./src/svg/glasses/glasses.svg) | `glasses` |

### Hair

| Preview | Filename |
|---------|----------|
| ![baldness](./src/svg/hair/baldness.svg) | `baldness` |
| ![classic1](./src/svg/hair/classic1.svg) | `classic1` |
| ![classic2](./src/svg/hair/classic2.svg) | `classic2` |
| ![curly](./src/svg/hair/curly.svg) | `curly` |
| ![elvis](./src/svg/hair/elvis.svg) | `elvis` |
| ![long](./src/svg/hair/long.svg) | `long` |
| ![ponyTail](./src/svg/hair/ponyTail.svg) | `ponyTail` |
| ![slaughter](./src/svg/hair/slaughter.svg) | `slaughter` |
| ![stylish](./src/svg/hair/stylish.svg) | `stylish` |

### Head

| Preview | Filename |
|---------|----------|
| ![standard](./src/svg/head/standard.svg) | `standard` |
| ![thin](./src/svg/head/thin.svg) | `thin` |
| ![wide](./src/svg/head/wide.svg) | `wide` |

### Mouth

| Preview | Filename |
|---------|----------|
| ![standard](./src/svg/mouth/standard.svg) | `standard` |
| ![toothless](./src/svg/mouth/toothless.svg) | `toothless` |

## License & Credits

See [LICENSE.md](LICENSE.md) for license information.

See [CREDITS.md](CREDITS.md) for attribution and credits.

## Development

Build the library:

```bash
bun run build
```

Build in watch mode:

```bash
bun dev
```
