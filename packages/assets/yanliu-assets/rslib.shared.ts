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
  '#323232': `{${colorPropName}}`,
  '#FC9D80': `{${colorPropName}}`,
  filter0_d_22_3268: `{${uidPropName} + '-' + '${uid()}'}`,
  filter0_f_23_2184: `{${uidPropName} + '-' + '${uid()}'}`,
  filter0_f_24_319: `{${uidPropName} + '-' + '${uid()}'}`,
  filter0_f_24_335: `{${uidPropName} + '-' + '${uid()}'}`,
  filter1_f_23_2184: `{${uidPropName} + '-' + '${uid()}'}`,
  filter1_f_24_319: `{${uidPropName} + '-' + '${uid()}'}`,
  filter2_d_24_319: `{${uidPropName} + '-' + '${uid()}'}`,
  paint0_linear_21_2301: `{${uidPropName} + '-' + '${uid()}'}`,
  paint1_linear_21_2301: `{${uidPropName} + '-' + '${uid()}'}`,
})
