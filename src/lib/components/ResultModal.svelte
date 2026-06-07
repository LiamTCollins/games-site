<script>
  export let won
  export let answer
  export let shareText
  export let color = '#285b7a'
  export let onClose = () => {}

  let copied = false

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(shareText)
      copied = true
      setTimeout(() => (copied = false), 2000)
    } catch {}
  }
</script>

<div class="overlay" on:click|self={onClose}>
  <div class="card sheet" class:won>
    <div class="sheet-head">
      <p class="kicker" style="color: {won ? '#2f6b46' : '#9c3b28'}">{won ? 'Solved' : 'Not quite'}</p>
      <h2 class="sheet-title">{won ? 'Nice work' : 'Better luck tomorrow'}</h2>
      {#if !won}
        <p class="sheet-answer">The answer was <strong>{answer}</strong></p>
      {/if}
    </div>

    <pre class="share-box">{shareText}</pre>

    <div class="sheet-actions">
      <button class="btn btn-ghost flex-1" on:click={onClose}>Close</button>
      <button class="btn flex-1" style="background: {color}; color: var(--paper); border-color: {color};" on:click={copyShare}>
        {copied ? 'Copied' : 'Share'}
      </button>
    </div>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: rgba(33, 32, 28, 0.45);
  }
  @media (max-width: 640px) { .overlay { align-items: flex-end; } }

  .sheet {
    width: 100%;
    max-width: 24rem;
    padding: 1.5rem;
    border-top: 3px solid #9c3b28;
    animation: slide-up 0.25s ease-out;
  }
  .sheet.won { border-top-color: #2f6b46; }

  .sheet-head { text-align: center; margin-bottom: 1.25rem; }
  .kicker {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 0.35rem;
  }
  .sheet-title {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 1.5rem;
    color: var(--ink);
    margin: 0;
  }
  .sheet-answer { font-size: 0.875rem; color: var(--ink-soft); margin-top: 0.5rem; }
  .sheet-answer strong { color: var(--ink); }

  .share-box {
    background: var(--paper);
    border: 1px solid var(--rule);
    border-radius: 4px;
    padding: 0.9rem 1rem;
    margin: 0 0 1.1rem;
    font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
    font-size: 0.85rem;
    color: var(--ink-soft);
    white-space: pre-wrap;
    line-height: 1.5;
    text-align: center;
  }

  .sheet-actions { display: flex; gap: 0.75rem; }
  .flex-1 { flex: 1; }

  @keyframes slide-up {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
</style>
