import type {
  AvatarConfig,
  SvelteAvatarItem,
  SvelteTheme,
} from '@avatune/types'
import AvatarComponent from './Avatar.svelte'

export type AvatarProps<T extends SvelteTheme = SvelteTheme> = AvatarConfig<
  SvelteAvatarItem,
  T
> & {
  theme: T
  size?: number
  class?: string
  style?: string
}

/**
 * Avatar component for Svelte.
 *
 * Note: Due to Svelte 5 generics limitations, autocomplete for specific identifiers
 * is not available. Props accept `string | string[]` types.
 *
 * For type-safe props with autocomplete, use React or Vue.
 */
export { AvatarComponent as Avatar }
