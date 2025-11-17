import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/svelte-vite'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  framework: {
    name: getAbsolutePath('@storybook/svelte-vite'),
    options: {},
  },
}
export default config
