# @avatune/solidjs

[![npm version](https://img.shields.io/npm/v/@avatune/solidjs)](https://www.npmjs.com/package/@avatune/solidjs)
[![npm bundle size](https://img.shields.io/npm/unpacked-size/@avatune/solidjs)](https://www.npmjs.com/package/@avatune/solidjs)

SolidJS component for rendering avatars from themes.

## Installation

```bash
npm install @avatune/solidjs
```

## Usage

```tsx
import { Avatar } from '@avatune/solidjs'
import theme from '@avatune/nevmstas-theme/solidjs'

function App() {
  return (
    <Avatar
      theme={theme}
      seed="user@example.com"
      size={200}
    />
  )
}
```

## Props

```ts
{
  theme: SolidJsTheme        // Theme to use for rendering (required)
  seed?: string              // Random seed for avatar generation
  size?: number              // Avatar size in pixels (default: theme size)
  class?: string             // CSS class for SVG container
  style?: JSX.CSSProperties | string  // Inline styles for SVG container

  // Part selection (string identifier)
  body?: string
  ears?: string
  eyebrows?: string
  eyes?: string
  hair?: string
  head?: string
  mouth?: string
  nose?: string

  // Part colors (CSS color values)
  bodyColor?: string
  earsColor?: string
  eyebrowsColor?: string
  eyesColor?: string
  hairColor?: string
  headColor?: string
  mouthColor?: string
  noseColor?: string
}
```

## Examples

Random avatar with seed:
```tsx
<Avatar theme={nevmstasTheme} seed="521411f1-fab6-4ed5-90bf-2863028bcae6" />
```

Specific parts with custom colors:
```tsx
<Avatar
  theme={nevmstasTheme}
  hair="long"
  hairColor="#ff6b6b"
  eyes="happy"
  eyesColor="#4ecdc4"
/>
```
