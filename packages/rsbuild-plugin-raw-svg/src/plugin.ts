import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { RsbuildPlugin } from '@rsbuild/core'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export type PluginOptions = {
  imports?: string
  replaceAttrValues?: Record<string, string>
  exclude?: RegExp | RegExp[]
}

export const pluginRawSvg = (options: PluginOptions = {}): RsbuildPlugin => ({
  name: 'rsbuild-plugin-raw-svg',
  setup(api) {
    api.modifyBundlerChain((chain) => {
      chain.module
        .rule('svg-raw-transform')
        .test(/\.svg$/)
        .resourceQuery(/raw/)
        .type('javascript/auto')
        .use('raw-svg-loader')
        .loader(path.resolve(__dirname, './loader.mjs'))
        .options({
          imports: options.imports,
          replaceAttrValues: options.replaceAttrValues,
        })
        .end()
    })
  },
})
