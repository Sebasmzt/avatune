import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { RsbuildPlugin } from '@rsbuild/core'
import type { Config as SvgoConfig } from 'svgo'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export type PluginOptions = {
  imports?: string
  replaceAttrValues?: Record<string, string>
  exclude?: RegExp | RegExp[]
  svgo?: boolean
  svgoConfig?: SvgoConfig
}

const getDefaultSvgoConfig = () =>
  ({
    plugins: [
      {
        name: 'preset-default',
        params: { overrides: {} },
      },
    ],
  }) as SvgoConfig

export const PLUGIN_NAME = 'avatune:raw-svg'

export const pluginRawSvg = (options: PluginOptions = {}): RsbuildPlugin => ({
  name: PLUGIN_NAME,
  setup(api) {
    api.modifyBundlerChain((chain) => {
      // User-provided svgoConfig replaces defaults entirely (no merge)
      const merged = {
        svgo: options.svgo ?? true,
        svgoConfig: options.svgoConfig || getDefaultSvgoConfig(),
      }

      const replaceAttrValues = options.replaceAttrValues
        ? Object.entries(options.replaceAttrValues).reduce(
            (acc, [key, value]) => {
              acc[key] = value
              acc[key.toLowerCase()] = value
              return acc
            },
            options.replaceAttrValues,
          )
        : undefined

      chain.module
        .rule('svg-raw-transform')
        .test(/\.svg$/)
        .resourceQuery(/raw/)
        .type('javascript/auto')
        .use('raw-svg-loader')
        .loader(path.resolve(__dirname, './loader.mjs'))
        .options({
          imports: options.imports,
          replaceAttrValues,
          svgo: merged.svgo,
          svgoConfig: merged.svgoConfig,
        })
        .end()
    })
  },
})
