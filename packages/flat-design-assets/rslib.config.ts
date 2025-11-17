import { pluginSvgToVue } from '@avatune/rsbuild-plugin-svg-to-vue'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSvelte } from '@rsbuild/plugin-svelte'
import { pluginSvgr } from '@rsbuild/plugin-svgr'
import { pluginVue } from '@rsbuild/plugin-vue'
import { defineConfig } from '@rslib/core'
import { pluginRawSvg } from '../rsbuild-plugin-raw-svg/dist'
import { pluginSvgToSvelte } from '../rsbuild-plugin-svg-to-svelte/dist'

const colordImport = "import { colord } from 'colord';"
const getReplaceAttrValues = (colorPropName = 'color') => ({
  currentColor: `{${colorPropName}}`,
  'color-mix(in srgb, currentColor 82%, white)': `{colord(${colorPropName}).lighten(0.18).toHex()}`,
  'color-mix(in srgb, currentColor 80%, white)': `{colord(${colorPropName}).lighten(0.2).toHex()}`,
  'color-mix(in srgb, currentColor 70%, white)': `{colord(${colorPropName}).lighten(0.3).toHex()}`,
  'color-mix(in srgb, currentColor 60%, white)': `{colord(${colorPropName}).lighten(0.4).toHex()}`,
  'color-mix(in srgb, currentColor 80%, black)': `{colord(${colorPropName}).darken(0.2).toHex()}`,
  'color-mix(in srgb, currentColor 82%, black)': `{colord(${colorPropName}).darken(0.18).toHex()}`,
})

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      dts: true,
    },
  ],

  source: {
    entry: {
      react: './src/react.ts',
      svg: './src/svg.ts',
      svelte: './src/svelte.ts',
      vue: './src/vue.ts',
    },
  },
  plugins: [
    pluginSvgr({
      svgrOptions: {
        replaceAttrValues: getReplaceAttrValues('props.color'),
        template: (variables, { tpl }) => {
          return tpl`
${variables.imports};
${colordImport}

${variables.interfaces};

function ${variables.componentName}(${variables.props}) {
  return ${variables.jsx};
}

${variables.exports};
`
        },
      },
    }),
    pluginSvgToVue({
      svgo: true,
      imports: colordImport,
      replaceAttrValues: getReplaceAttrValues('color'),
    }),
    pluginSvgToSvelte({
      svgo: true,
      imports: colordImport,
      replaceAttrValues: getReplaceAttrValues('color'),
    }),
    pluginVue(),
    pluginSvelte(),
    pluginReact(),
    pluginRawSvg({
      imports: colordImport,
      replaceAttrValues: getReplaceAttrValues('color'),
    }),
  ],
})
