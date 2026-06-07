<script>
  export let won
  export let answer
  export let shareText
  export let color = '#285b7a'
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

<div class="card result-bar" style="border-top: 3px solid {won ? '#2f6b46' : '#9c3b28'}">
  <div class="rb-inner">
    <div>
      <p class="rb-status" style="color: {won ? '#2f6b46' : '#9c3b28'}">{won ? 'Solved' : 'Better luck tomorrow'}</p>
      {#if !won}
        <p class="rb-answer">Answer: <strong>{answer}</strong></p>
      {/if}
      {#if emojiLine}
        <p class="rb-emoji">{emojiLine}</p>
      {/if}
    </div>
    <div class="rb-actions">
      <button class="btn btn-ghost text-sm py-2 px-3" on:click={onShowModal}>Results</button>
      <button class="btn text-sm py-2 px-3" style="background:{color}; color: var(--paper); border-color:{color}" on:click={copyShare}>
        {copied ? 'Copied' : 'Share'}
      </button>
    </div>
  </div>
</div>

<style>
  .result-bar { margin-top: 1rem; padding: 1rem; }
  .rb-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  .rb-status {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }
  .rb-answer { font-size: 0.8rem; color: var(--ink-soft); }
  .rb-answer strong { color: var(--ink); }
  .rb-emoji {
    font-family: ui-monospace, Menlo, monospace;
    font-size: 1rem;
    letter-spacing: 0.1em;
    margin-top: 0.35rem;
  }
  .rb-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }
</style>
