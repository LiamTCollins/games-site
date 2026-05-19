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
      style="background:{color}"
      on:click={submit}
      disabled={disabled || !isExactMatch}
    >
      Guess
    </button>
  </div>

  {#if showList && filtered.length > 0 && !disabled}
    <ul class="absolute z-20 top-full left-0 right-20 mt-1 max-h-64 overflow-y-auto rounded-lg border border-white/10 bg-[#0f0f1a] shadow-xl">
      {#each filtered as opt, i}
        <li>
          <button
            class="w-full text-left px-3 py-2 text-sm transition-colors"
            style="background: {i === highlightIdx ? color + '22' : 'transparent'}; color: {i === highlightIdx ? 'white' : '#cbd5e1'};"
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
    <p class="text-xs text-red-400 mt-1">No matching option — must be from the list</p>
  {/if}
</div>
