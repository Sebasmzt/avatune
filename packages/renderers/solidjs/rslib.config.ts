import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginSolid } from '@rsbuild/plugin-solid'
import { defineConfig } from '@rslib/core'

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
  ],
})
