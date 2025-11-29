<script lang="ts">
let svg = $state<string | null>(null)
let loading = $state(false)
let error = $state<string | null>(null)

async function fetchAvatar() {
  loading = true
  error = null
  svg = null

  try {
    const params = new URLSearchParams({
      theme: 'yanliu',
      seed: 'user-123',
      size: 200,
    })
    const response = await fetch(`https://api.avatune.dev/?${params}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    svg = await response.text()
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to fetch avatar'
  } finally {
    loading = false
  }
}
</script>

<div class="not-content my-6">
  <div class="flex min-h-[280px] flex-col items-center justify-center">
    {#if svg}
      <div class="flex items-center justify-center">
        {@html svg}
      </div>
    {:else}
      <div class="flex h-[200px] w-[200px] items-center justify-center rounded-full bg-gray-800/50 border border-white/5 overflow-hidden">
      </div>
    {/if}

    <button
      type="button"
      onclick={fetchAvatar}
      disabled={loading}
      class="mt-6 cursor-pointer px-6 py-2.5 text-sm font-medium text-white transition-all disabled:cursor-not-allowed disabled:opacity-50 bg-gray-700"
    >
      {#if loading}
        Fetching...
      {:else}
        Fetch Avatar
      {/if}
    </button>
  </div>
</div>
