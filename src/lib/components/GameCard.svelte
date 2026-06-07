<script>
  export let name
  export let description
  export let route
  export let played = false
  export let streak = 0
  export let index = 0
</script>

<a href={route} class="card card-hover game-row">
  <div class="game-top">
    <span class="game-index">{String(index + 1).padStart(2, '0')}</span>
    <div class="game-status">
      {#if streak > 0}<span class="tag">Streak {streak}</span>{/if}
      {#if played}<span class="tag tag-done">Done</span>{/if}
    </div>
  </div>

  <h2 class="game-name">{name}</h2>
  <p class="game-desc">{description}</p>

  <span class="game-play">Play <span class="arrow">→</span></span>
</a>

<style>
  .game-row {
    display: flex;
    flex-direction: column;
    padding: 1.1rem 1.2rem 1rem;
    text-decoration: none;
    min-height: 100%;
  }
  .game-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .game-index {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--muted);
    letter-spacing: 0.02em;
  }
  .game-status {
    display: flex;
    gap: 0.4rem;
  }
  .tag-done {
    color: #2f6b46;
    border-color: #c2d9c6;
  }
  .game-name {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 1.35rem;
    font-weight: 600;
    color: var(--ink);
    margin: 0 0 0.25rem;
    line-height: 1.1;
  }
  .game-desc {
    font-size: 0.85rem;
    color: var(--ink-soft);
    line-height: 1.4;
    margin: 0 0 0.9rem;
    flex: 1;
  }
  .game-play {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    color: var(--accent);
    text-transform: uppercase;
  }
  .arrow {
    transition: margin-left 0.15s;
    display: inline-block;
  }
  .game-row:hover .arrow {
    margin-left: 0.25rem;
  }
</style>
