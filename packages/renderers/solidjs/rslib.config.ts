import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginSolid } from '@rsbuild/plugin-solid'
import { defineConfig } from '@rslib/core'

const __dirname = dirname(fileURLToPath(import.meta.url))

const pluginSvgToSolidJsx = () => ({
  name: 'generate-solid-jsx',
  setup(api) {
    api.onAfterBuild(async () => {
      const esbuild = await import('esbuild')
      const source = readFileSync(join(__dirname, 'src/index.tsx'), 'utf-8')
      const result = await esbuild.transform(source, {
        loader: 'tsx',
        jsx: 'preserve',
        format: 'esm',
      })
      writeFileSync(join(__dirname, 'dist/index.jsx'), result.code)
    })
  },
})

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      dts: true,
    },
    {
      format: 'cjs',
      syntax: ['node 18'],
      dts: false,
    },
  ],
  source: {
    entry: {
      index: './src/index.tsx',
    },
  },
  output: {
    target: 'web',
    minify: true,
    externals: {
      '@avatune/types': '@avatune/types',
      '@avatune/utils': '@avatune/utils',
      'solid-js': 'solid-js',
      'solid-js/web': 'solid-js/web',
    },
  },
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginSolid(),
    pluginSvgToSolidJsx(),
  ],
})
