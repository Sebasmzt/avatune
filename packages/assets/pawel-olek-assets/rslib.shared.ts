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

const idReplacements = []

export const getReplaceAttrValues = (
  colorPropName = 'color',
  uidPropName = 'uid',
) => {
  const replacements: Record<string, string> = {
    '#FFF': `{${colorPropName}}`,
  }

  for (const id of idReplacements) {
    const uniqueId = uid()
    const replacement = `{${uidPropName} + '-' + '${uniqueId}'}`
    replacements[id] = replacement
    replacements[`url(#${id})`] =
      `{'url(#' + ${uidPropName} + '-' + '${uniqueId}' + ')'}`
  }

  return replacements
}
