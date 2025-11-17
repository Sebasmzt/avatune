/**
 * Loader for raw SVG files that transforms placeholders at build time
 * Converts {expression} syntax to ${expression} for template literal evaluation
 */
export default function loader(source) {
  // Mark as cacheable
  if (this?.cacheable) this.cacheable()

  const options = this.getOptions ? this.getOptions() : {}

  // Get the placeholder mappings
  const replacements = options.replaceAttrValues || {}

  // Sort keys by length (longest first) to prevent premature replacements
  const sortedKeys = Object.keys(replacements).sort((a, b) => b.length - a.length)

  let result = source

  for (const key of sortedKeys) {
    const value = replacements[key]
    result = result.replace(
      new RegExp(key.replace(/[()]/g, '\\$&'), 'g'),
      value,
    )
  }

  const imports = options.imports || ''

  // Escape backticks in the SVG, but keep ${...} expressions for template evaluation
  // Convert {expression} to ${expression} for template literal evaluation
  const escapedSvg = result
    .replace(/`/g, '\\`')
    .replace(/\{([^}]+)\}/g, (_match, expr) => `\${${expr}}`)

  // Extract variable names from replacement values to know what props to destructure
  const propsToExtract = new Set()
  for (const value of Object.values(replacements)) {
    // Match simple variables like {color} or function calls like {colord(color).lighten(0.2)}
    // Extract the base variable name (e.g., "color" from both examples)
    const matches = value.matchAll(/\{([a-zA-Z_$][a-zA-Z0-9_$]*)/g)
    for (const match of matches) {
      const varName = match[1]
      // Skip function names like 'colord', only capture property names
      if (varName !== 'colord') {
        propsToExtract.add(varName)
      }
    }
  }

  // Generate destructuring or use props directly
  const propsArray = Array.from(propsToExtract)
  const destructuring = propsArray.length > 0
    ? `const { ${propsArray.join(', ')} } = props;`
    : ''

  return `
${imports}

export default function(props) {
  ${destructuring}
  return \`${escapedSvg}\`;
}
`
}
