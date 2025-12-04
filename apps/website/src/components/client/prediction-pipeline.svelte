<script lang="ts">
import kyuteTheme from '@avatune/kyute-theme/svelte'
import { Avatar } from '@avatune/svelte'
import type { Predictions } from '@avatune/types'
import photo1 from '../../assets/prediction-2.jpg'

type ThemeType = typeof kyuteTheme

const predictions: Predictions = {
  skinTone: 'medium',
  hairLength: 'medium',
  hairColor: 'brown',
}

const steps = [
  {
    id: 'skinTone',
    label: 'Detect Skin Tone',
    prediction: predictions.skinTone,
  },
  {
    id: 'hairLength',
    label: 'Detect Hair Length',
    prediction: predictions.hairLength,
  },
  {
    id: 'hairColor',
    label: 'Detect Hair Color',
    prediction: predictions.hairColor,
  },
  { id: 'combine', label: 'Mix it up', prediction: 'avatar' },
]

function getHeadComponent(
  theme: ThemeType,
): typeof kyuteTheme.head.standard.Component | null {
  const headCategory = theme.head as Record<
    string,
    { Component: typeof kyuteTheme.head.standard.Component }
  >
  const firstKey = Object.keys(headCategory)[0]
  return firstKey ? (headCategory[firstKey]?.Component ?? null) : null
}

function getHairComponent(
  theme: ThemeType,
  item: string,
): typeof kyuteTheme.hair.bob.Component | null {
  const hairCategory = theme.hair as Record<
    string,
    { Component: typeof kyuteTheme.hair.bob.Component }
  >
  return hairCategory?.[item]?.Component ?? null
}

function getSkinToneColors(theme: ThemeType): string[] {
  const skinToneMap = theme.predictorMappings?.skinTone
  if (!skinToneMap || !predictions.skinTone) return []
  return skinToneMap[predictions.skinTone] ?? []
}

function getHairItems(theme: ThemeType): string[] {
  const hairMap = theme.predictorMappings?.hair
  if (!hairMap || !predictions.hairLength) return []
  return hairMap[predictions.hairLength] ?? []
}

function getHairColors(theme: ThemeType): string[] {
  const colorMap = theme.predictorMappings?.hairColor
  if (!colorMap || !predictions.hairColor) return []
  return colorMap[predictions.hairColor] ?? []
}

const HeadComponent = getHeadComponent(kyuteTheme)
const skinToneColors = getSkinToneColors(kyuteTheme)
const hairItems = getHairItems(kyuteTheme)
const hairColors = getHairColors(kyuteTheme)
</script>

<section class="rounded-2xl border border-white/10 bg-slate-950/80 p-4 shadow-xl shadow-pink-500/5 sm:p-6">
  <div class="mb-4 text-center">
    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-pink-200/80">Prediction Flow</p>
    <h3 class="mt-1 text-xl font-semibold text-white sm:text-2xl">Or try out experimental</h3>
  </div>

  <div class="grid items-center gap-3 lg:grid-cols-[180px_auto_1fr_auto_120px]">
    <!-- Photo -->
    <div class="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-slate-900/50 p-3">
      <p class="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Input</p>
      <div class="h-32 w-32 overflow-hidden rounded-lg">
        <img
          class="h-full w-full object-cover"
          src={photo1.src}
          alt="Portrait for prediction"
          loading="lazy"
          width={photo1.width}
          height={photo1.height}
        />
      </div>
    </div>

    <!-- Connector line: Input -> Steps -->
    <div class="hidden items-center lg:flex">
      <div class="h-px w-10 bg-pink-500/50"></div>
    </div>

    <!-- Steps -->
    <div class="space-y-2">
      {#each steps as step, index}
        <div class="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-900/30 px-3 py-2">
          <!-- Step number -->
          <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-[10px] font-bold text-pink-200">
            {index + 1}
          </div>

          <!-- Step label -->
          <div class="min-w-[120px]">
            <p class="text-xs font-medium text-slate-300">{step.label}</p>
            <p class="text-[10px] text-slate-500">
              {#if step.id === 'combine'}
                Generate
              {:else}
                <span class="text-white">{step.prediction}</span>
              {/if}
            </p>
          </div>

          <!-- Asset previews -->
          <div class="flex flex-1 items-center justify-end gap-1.5">
            {#if step.id === 'skinTone'}
              {#each skinToneColors.slice(0, 3) as color}
                {#if HeadComponent}
                  <div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-slate-800/80">
                      <HeadComponent color={color} />
                  </div>
                {/if}
              {/each}
            {:else if step.id === 'hairLength'}
              {#each hairItems.slice(0, 3) as item}
                {@const HairComponent = getHairComponent(kyuteTheme, item)}
                {#if HairComponent}
                  <div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-slate-800/80">
                      <HairComponent color="#8B7355" />
                  </div>
                {/if}
              {/each}
            {:else if step.id === 'hairColor'}
              {#each hairColors.slice(0, 3) as color}
                {@const firstHair = hairItems[0]}
                {@const HairComponent = firstHair ? getHairComponent(kyuteTheme, firstHair) : null}
                {#if HairComponent}
                  <div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-slate-800/80">
                      <HairComponent color={color} />
                  </div>
                {/if}
              {/each}
            {:else if step.id === 'combine'}
              <div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-800/80">
                <Avatar theme={kyuteTheme} size={40} predictions={predictions} />
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    <!-- Connector line: Steps -> Result -->
    <div class="hidden items-center lg:flex">
      <div class="h-px w-10 bg-pink-500/50"></div>
    </div>

    <!-- Result -->
    <div class="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-slate-900/30 p-3">
      <p class="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Result</p>
      <Avatar theme={kyuteTheme} size={80} predictions={predictions} />
      <p class="mt-2 text-center text-[10px] text-slate-500">
        {predictions.hairLength}, {predictions.hairColor}, {predictions.skinTone}
      </p>
    </div>
  </div>
</section>
