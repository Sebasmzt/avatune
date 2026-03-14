export function transformSvgToSolidSource(
  contents: string,
  options?: {
    svgo?: boolean
    svgoConfig?: object
    imports?: string
    replaceAttrValues?: Record<string, string>
  },
  resourcePath?: string,
): { jsxSource: string; raw: string }
