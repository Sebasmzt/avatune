# @avatune/typescript-config

[![npm version](https://img.shields.io/npm/v/@avatune/typescript-config)](https://www.npmjs.com/package/@avatune/typescript-config)

Shared TypeScript configurations for Avatune packages.

## Installation

```bash
npm install @avatune/typescript-config --save-dev
```

## Usage

Extend from one of the available configurations in your `tsconfig.json`:

### Base Configuration

```json
{
  "extends": "@avatune/typescript-config/base"
}
```

### React Library Configuration

```json
{
  "extends": "@avatune/typescript-config/react-library"
}
```

### Next.js Configuration

```json
{
  "extends": "@avatune/typescript-config/nextjs"
}
```

## Available Configurations

- `@avatune/typescript-config/base` - Base TypeScript configuration
- `@avatune/typescript-config/react-library` - Configuration for React libraries
- `@avatune/typescript-config/nextjs` - Configuration for Next.js applications

## License

MIT
