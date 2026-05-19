<script>
  export let won
  export let answer
  export let shareText
  export let color = '#6366f1'
  export let onShowModal = () => {}

  let copied = false

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(shareText)
      copied = true
      setTimeout(() => (copied = false), 2000)
    } catch {}
  }

  // Extract just the emoji grid line from shareText
  $: emojiLine = shareText.split('\n').find(l => /[\u{1F000}-\u{1FFFF}⬛⬜]/u.test(l)) ?? ''
</script>

<div class="card mt-4 p-4" style="border-color: {won ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.2)'}">
  <div class="flex items-center justify-between gap-3 flex-wrap">
    <div>
      <p class="text-xs font-semibold mb-1" style="color: {won ? '#4ade80' : '#f87171'}">{won ? '✓ Solved!' : '✗ Better luck tomorrow'}</p>
      {#if !won}
        <p class="text-xs text-slate-400">Answer: <span class="text-white font-semibold">{answer}</span></p>
      {/if}
      {#if emojiLine}
        <p class="font-mono text-base mt-1 tracking-wide">{emojiLine}</p>
      {/if}
    </div>
    <div class="flex gap-2 shrink-0">
      <button class="btn btn-ghost text-sm py-2 px-3" on:click={onShowModal}>Results</button>
      <button class="btn text-white text-sm py-2 px-3" style="background:{color}" on:click={copyShare}>
        {copied ? '✓' : '📋 Share'}
      </button>
    </div>
  </div>
</div>
