import type { Config as SvgoConfig } from 'svgo'

export const colordImport = "import { colord } from 'colord';"

export const svgoConfig: SvgoConfig = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: false,
        },
      },
    },
    {
      name: 'prefixIds',
      params: { prefix: false, prefixIds: false, prefixClassNames: false },
    },
  ],
}

export const getReplaceAttrValues = (colorPropName = 'color') => ({
  '#FF859B': `{${colorPropName}}`,
  '#E05A33': `{${colorPropName}}`,
  '#C53926': `{colord(${colorPropName}).rotate(-7).desaturate(0.05).darken(0.08).toHex()}`,
  '#1B0B47': `{${colorPropName}}`,
  '#000000': `{${colorPropName}}`,
  '#FFCB7E': `{${colorPropName}}`,
  '#F0BD70': `{colord(${colorPropName}).desaturate(0.08).darken(0.06).toHex()}`,
  '#E9B05B': `{colord(${colorPropName}).desaturate(0.16).darken(0.12).toHex()}`,
  '#B03E67': `{${colorPropName}}`,
  '#66253C': `{colord(${colorPropName}).rotate(3).darken(0.20).toHex()}`,
})
