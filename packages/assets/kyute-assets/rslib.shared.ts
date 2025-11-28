import type { Config as SvgoConfig } from 'svgo'

const uid = () => Math.random().toString(36).slice(2, 9)

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

export const getReplaceAttrValues = (
  colorPropName = 'color',
  uidPropName = 'uid',
) => ({
  '#9A9A9A': `{${colorPropName}}`,
  '#334B71': `{${colorPropName}}`,
  '#537C1E': `{${colorPropName}}`,
  '#901A3E': `{${colorPropName}}`,
  '#C8D3E6': `{colord(${colorPropName}).lighten(0.53).desaturate(0.27).toHex()}`,
  '#4D8FAB': `{${colorPropName}}`,
  '#B78276': `{${colorPropName}}`,
  '#CF7621': `{${colorPropName}}`,
  '#9C6458': `{${colorPropName}}`,
  '#4B301C': `{${colorPropName}}`,
  'path-2-inside-1_13_1672': `{${uidPropName} + '-' + '${uid()}'}`,
  clip0_13_1632: `{${uidPropName} + '-' + '${uid()}'}`,
  'path-1-inside-1_13_548': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-1-inside-1_0_1': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-1-inside-1_26_815': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-1-inside-1_1_68': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-1-outside-1_6_96': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-3-outside-2_6_96': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-1-inside-1_1_894': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-1-outside-1_6_95': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-1-inside-1_1_929': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-1-outside-1_2_211': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-1-outside-1_6_54': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-7-outside-2_6_54': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-9-outside-3_6_54': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-1-outside-1_6_53': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-2-outside-1_6_97': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-1-outside-1_6_70': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-1-inside-1_1_849': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-2-outside-1_2_14': `{${uidPropName} + '-' + '${uid()}'}`,
  'path-1-inside-1_28_1': `{${uidPropName} + '-' + '${uid()}'}`,
})
