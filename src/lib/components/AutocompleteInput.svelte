<script>
  export let options = []        // array of strings (valid guesses)
  export let placeholder = 'Type to search...'
  export let color = '#6366f1'
  export let disabled = false
  export let onSubmit = () => {} // called with the valid string

  let value = ''
  let highlightIdx = 0
  let showList = false

  $: filtered = value.trim().length === 0
    ? []
    : options
        .filter(o => o.toLowerCase().includes(value.trim().toLowerCase()))
        .slice(0, 8)

  $: isExactMatch = options.some(o => o.toLowerCase() === value.trim().toLowerCase())

  function pick(opt) {
    value = opt
    showList = false
    submit()
  }

  function submit() {
    const match = options.find(o => o.toLowerCase() === value.trim().toLowerCase())
    if (!match) return
    onSubmit(match)
    value = ''
    highlightIdx = 0
    showList = false
  }

  function handleKey(e) {
    if (!showList) showList = true
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      highlightIdx = Math.min(highlightIdx + 1, filtered.length - 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      highlightIdx = Math.max(highlightIdx - 1, 0)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[highlightIdx]) {
        pick(filtered[highlightIdx])
      } else if (isExactMatch) {
        submit()
      }
    } else if (e.key === 'Escape') {
      showList = false
    }
  }

  function handleBlur() {
    setTimeout(() => showList = false, 150)
  }
</script>

<div class="relative">
  <div class="flex gap-2">
    <input
      class="input-field"
      type="text"
      bind:value
      on:keydown={handleKey}
      on:focus={() => showList = true}
      on:blur={handleBlur}
      {placeholder}
      {disabled}
      autocomplete="off"
    />
    <button
      class="btn text-white shrink-0"
      style="background:{color}; border-color:{color}"
      on:click={submit}
      disabled={disabled || !isExactMatch}
    >
      Guess
    </button>
  </div>

  {#if showList && filtered.length > 0 && !disabled}
    <ul class="ac-list">
      {#each filtered as opt, i}
        <li>
          <button
            class="ac-option"
            class:active={i === highlightIdx}
            on:mousedown={() => pick(opt)}
            on:mouseenter={() => highlightIdx = i}
          >
            {opt}
          </button>
        </li>
      {/each}
    </ul>
  {/if}

  {#if value.trim().length > 0 && filtered.length === 0 && !disabled}
    <p class="ac-empty">No matching option — must be from the list</p>
  {/if}
</div>

<style>
  .ac-list {
    position: absolute;
    z-index: 20;
    top: 100%;
    left: 0;
    right: 5rem;
    margin-top: 0.25rem;
    max-height: 16rem;
    overflow-y: auto;
    border: 1px solid var(--rule);
    border-radius: 4px;
    background: var(--paper-raised);
    box-shadow: 0 6px 20px rgba(33, 32, 28, 0.12);
    list-style: none;
    padding: 0;
  }
  .ac-option {
    width: 100%;
    text-align: left;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    color: var(--ink-soft);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background 0.1s, color 0.1s;
  }
  .ac-option.active {
    background: var(--accent-tint);
    color: var(--ink);
  }
  .ac-empty {
    font-size: 0.75rem;
    color: #9c3b28;
    margin-top: 0.35rem;
  }
</style>
