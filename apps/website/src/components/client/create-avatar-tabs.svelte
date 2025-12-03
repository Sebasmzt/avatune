<script lang="ts">
import ashleySeoTheme from '@avatune/ashley-seo-theme/svelte'
import fatinVerseTheme from '@avatune/fatin-verse-theme/svelte'
import kyuteTheme from '@avatune/kyute-theme/svelte'
import micahTheme from '@avatune/micah-theme/svelte'
import miniavsTheme from '@avatune/miniavs-theme/svelte'
import nevmstasTheme from '@avatune/nevmstas-theme/svelte'
import pacovqzzTheme from '@avatune/pacovqzz-theme/svelte'
import pawelOlekManTheme from '@avatune/pawel-olek-man-theme/svelte'
import pawelOlekWomanTheme from '@avatune/pawel-olek-woman-theme/svelte'
import { Avatar } from '@avatune/svelte'
import yanliuTheme from '@avatune/yanliu-theme/svelte'
import { codeToHtml } from 'shiki'
import {
  extractCategories,
  type FrameworkDefinition,
  frameworks,
  generateSnippet,
  type ThemeInfo,
  themeInfos,
} from '../../lib/create-avatar-showcase'

const themeMap: Record<string, unknown> = {
  kyute: kyuteTheme,
  micah: micahTheme,
  miniavs: miniavsTheme,
  pacovqzz: pacovqzzTheme,
  yanliu: yanliuTheme,
  nevmstas: nevmstasTheme,
  fatinVerse: fatinVerseTheme,
  ashleySeo: ashleySeoTheme,
  pawelOlekMan: pawelOlekManTheme,
  pawelOlekWoman: pawelOlekWomanTheme,
}

let selectedThemeId = 'kyute'
let selectedFrameworkId = 'react'
let selections: Record<string, string> = {}
let highlightedCode = ''

$: selectedThemeInfo =
  themeInfos.find((t) => t.id === selectedThemeId) ?? themeInfos[0]
$: selectedFramework =
  frameworks.find((f) => f.id === selectedFrameworkId) ?? frameworks[0]
$: svelteTheme = themeMap[selectedThemeId] ?? themeMap.kyute
$: categories = extractCategories(svelteTheme as Record<string, unknown>)
$: avatarProps = Object.fromEntries(
  Object.entries(selections).filter(([_, v]) => v && v !== 'none'),
)

$: updateHighlightedCode(selectedFrameworkId, selectedThemeInfo, selections)

async function updateHighlightedCode(
  frameworkId: string,
  themeInfo: ThemeInfo,
  currentSelections: Record<string, string>,
) {
  const framework =
    frameworks.find((f) => f.id === frameworkId) ?? frameworks[0]
  const snippet = generateSnippet(frameworkId, themeInfo, currentSelections)
  // Use typescript for vue/svelte as shiki may not have these languages loaded
  const lang =
    framework.language === 'vue' || framework.language === 'svelte'
      ? 'html'
      : framework.language
  try {
    const html = await codeToHtml(snippet, {
      lang,
      theme: 'github-dark',
    })
    highlightedCode = html
  } catch {
    // Fallback to plain text if highlighting fails
    highlightedCode = `<pre class="shiki"><code>${snippet.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
  }
}

function selectTheme(id: string) {
  selectedThemeId = id
  selections = {}
}

function selectFramework(id: string) {
  selectedFrameworkId = id
}

function handleSelectChange(category: string, event: Event) {
  const target = event.target as HTMLSelectElement
  selections = { ...selections, [category]: target.value }
}

function formatItemName(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}
</script>

<div class="mt-8 space-y-4">
  <!-- Theme Selector -->
  <div>
    <p class="mb-2 text-sm font-medium text-slate-400">Theme</p>
    <div class="flex flex-wrap gap-1.5">
      {#each themeInfos as theme}
        <button
          type="button"
          class={`flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-all cursor-pointer ${
            selectedThemeId === theme.id
              ? 'bg-pink-500/20 text-pink-200 ring-1 ring-pink-500/30'
              : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-white'
          }`}
          onclick={() => selectTheme(theme.id)}
        >
          <span class="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-slate-700/50">
            <Avatar theme={themeMap[theme.id]} seed={theme.id} size={20} />
          </span>
          {theme.label}
        </button>
      {/each}
    </div>
  </div>

  <!-- Framework Tabs -->
  <p class="mb-2 text-sm font-medium text-slate-400">Framework</p>
  <div class="flex flex-wrap gap-1.5">
    {#each frameworks as framework}
      <button
        type="button"
        class={`flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-all ${
          selectedFrameworkId === framework.id
            ? 'bg-pink-500/20 text-pink-200 ring-1 ring-pink-500/30'
            : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-white'
        }`}
        onclick={() => selectFramework(framework.id)}
      >
        {#if framework.logo}
          <img src={framework.logo.src} alt={framework.logo.alt} class="h-5 w-5 shrink-0 object-contain" />
        {/if}
        <span class="hidden sm:inline">{framework.label}</span>
      </button>
    {/each}
  </div>

  <!-- Code and Preview -->
  <div class="flex flex-col gap-6 lg:flex-row">
    <div class="w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950 lg:w-2/3">
      <div class="flex items-center gap-2 border-b border-white/10 bg-slate-900/80 px-4 py-2.5">
        <div class="flex gap-1.5">
          <div class="h-3 w-3 rounded-full bg-pink-300"></div>
          <div class="h-3 w-3 rounded-full bg-pink-300"></div>
          <div class="h-3 w-3 rounded-full bg-pink-300"></div>
        </div>
        <div class="flex-1 text-center">
          <span class="font-mono text-xs text-slate-400">{selectedFramework.filePath}</span>
        </div>
        <div class="w-12"></div>
      </div>
      <div class="min-h-[200px] overflow-x-auto">
        {@html highlightedCode}
      </div>
    </div>

    <div class="w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 shadow-2xl lg:w-1/3">
      <div class="flex items-center gap-2 border-b border-white/10 bg-slate-900/80 px-4 py-2.5">
        <div class="flex gap-1.5">
          <div class="h-3 w-3 rounded-full bg-pink-300"></div>
          <div class="h-3 w-3 rounded-full bg-pink-300"></div>
          <div class="h-3 w-3 rounded-full bg-pink-300"></div>
        </div>
        <div class="flex-1 text-center">
          <span class="text-xs font-medium text-slate-400">Avatar Preview</span>
        </div>
        <div class="w-12"></div>
      </div>

      <div class="flex min-h-[200px] flex-col items-center justify-center bg-linear-to-br from-slate-900/50 to-slate-950 p-6 sm:p-8">
        {#if svelteTheme}
          {#key JSON.stringify(avatarProps)}
            <Avatar theme={svelteTheme} seed="my-avatar" size={200} {...avatarProps} />
          {/key}
        {/if}
      </div>
    </div>
  </div>

  <!-- Category Selects -->
  <div>
    <p class="mb-2 text-sm font-medium text-slate-400">Customize</p>
    <div class="flex flex-wrap gap-1.5">
      {#each categories as category}
        <div class="relative inline-block">
          <select
            class="h-8 cursor-pointer appearance-none rounded-md border border-white/10 bg-slate-800/60 pl-2.5 pr-7 text-xs text-slate-300 transition-all hover:border-white/20 hover:bg-slate-700/60 focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30"
            value={selections[category.id] || (category.optional ? 'none' : category.items[0])}
            onchange={(e) => handleSelectChange(category.id, e)}
          >
            {#if category.optional}
              <option value="none">{category.label}: None</option>
            {/if}
            {#each category.items as item}
              <option value={item}>{category.label}: {formatItemName(item)}</option>
            {/each}
          </select>
          <svg
            class="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  :global(.shiki) {
    margin: 0;
    padding: 1rem;
    background: transparent !important;
  }
</style>
