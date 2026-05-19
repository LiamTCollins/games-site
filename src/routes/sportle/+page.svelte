<script>
  import { getDailyIndex, getDailyNumber, getTodayKey } from '$lib/utils/daily.js'
  import { loadGameState, saveGameState, loadStreak, updateStreak } from '$lib/utils/storage.js'
  import { sports } from '$lib/data/sportle.js'
  import ResultModal from '$lib/components/ResultModal.svelte'
  import ResultBar from '$lib/components/ResultBar.svelte'

  const GAME_ID = 'sportle'
  const COLOR = '#f97316'
  const todayKey = getTodayKey()
  const gameNumber = getDailyNumber()
  const puzzle = sports[getDailyIndex(sports.length)]
  const MAX_CLUES = puzzle.clues.length

  // Build the guess bank: all sport names, shuffled, excluding today's answer last
  function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }
  const allSports = shuffle(sports.map(s => s.answer))

  let cluesRevealed = 1
  let selected = null       // currently highlighted tile
  let gameOver = false
  let won = false
  let showModal = false
  let streak = loadStreak(GAME_ID)

  const saved = loadGameState(GAME_ID)
  if (saved?.date === todayKey) {
    cluesRevealed = saved.cluesRevealed
    selected = saved.selected
    gameOver = true
    won = saved.won
  }

  function revealNextClue() {
    if (cluesRevealed < MAX_CLUES) cluesRevealed++
  }

  function selectSport(name) {
    if (gameOver) return
    selected = name
  }

  function submitGuess() {
    if (!selected || gameOver) return

    won = selected === puzzle.answer
    gameOver = true
    showModal = true
    streak = updateStreak(GAME_ID, won)
    saveGameState(GAME_ID, { date: todayKey, cluesRevealed, selected, won })
  }

  function getEmojiGrid() {
    const used = cluesRevealed
    return Array.from({ length: MAX_CLUES }, (_, i) => i < used ? '🟧' : '⬜').join('')
  }

  function getShareText() {
    return `Sportle #${gameNumber} ${won ? '✓' : '✗'} — ${cluesRevealed}/${MAX_CLUES} clues\n${getEmojiGrid()}\ndaily-le.com/sportle`
  }
</script>

<svelte:head><title>Sportle — daily-le.com</title></svelte:head>

<main class="min-h-screen py-10 px-4">
  <div class="max-w-lg mx-auto">

    <div class="page-header justify-between">
      <a href="/" class="back-btn">← Hub</a>
      <div class="flex items-center gap-3">
        {#if streak.current > 0}<span class="text-xs text-orange-400">🔥 {streak.current}</span>{/if}
        <span class="text-xs text-slate-500">Day #{gameNumber}</span>
      </div>
    </div>

    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-1">🏆 Sportle</h1>
      <p class="text-sm text-slate-400">Reveal clues, then pick the sport from the bank. <span class="text-orange-400 font-semibold">One guess.</span></p>
    </div>

    <!-- Clues -->
    <div class="space-y-2 mb-4">
      {#each puzzle.clues.slice(0, cluesRevealed) as clue, i}
        <div class="clue-card flex gap-3 items-start">
          <span class="tag mt-0.5 shrink-0" style="background:#f9731622;color:#f97316">#{i + 1}</span>
          <p class="text-slate-200 text-sm leading-relaxed">{clue}</p>
        </div>
      {/each}
      {#each Array(MAX_CLUES - cluesRevealed) as _, i}
        <div class="clue-card flex gap-3 items-center opacity-30">
          <span class="tag" style="background:#f9731611;color:#f97316">#{cluesRevealed + i + 1}</span>
          <p class="text-slate-500 text-sm">Locked</p>
        </div>
      {/each}
    </div>

    <!-- Reveal next clue button -->
    {#if !gameOver && cluesRevealed < MAX_CLUES}
      <button class="btn btn-ghost w-full mb-6 text-sm" on:click={revealNextClue}>
        Reveal clue #{cluesRevealed + 1} ↓
      </button>
    {:else if !gameOver}
      <div class="mb-6"></div>
    {/if}

    <!-- Guess bank -->
    {#if !gameOver}
      <p class="text-xs text-slate-500 mb-3 text-center">Select a sport from the bank, then confirm</p>
      <div class="flex flex-wrap gap-2 mb-4">
        {#each allSports as sport}
          <button
            class="px-3 py-1.5 rounded-lg text-sm font-medium border transition-all"
            style={selected === sport
              ? `background:${COLOR}33; border-color:${COLOR}; color:white;`
              : 'background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.1); color:#94a3b8;'}
            on:click={() => selectSport(sport)}
          >
            {sport}
          </button>
        {/each}
      </div>

      <button
        class="btn w-full text-white"
        style="background:#f97316"
        on:click={submitGuess}
        disabled={!selected}
      >
        {selected ? `Submit: ${selected}` : 'Select a sport above'}
      </button>

    {:else}
      <!-- Result state — show which was correct -->
      <div class="flex flex-wrap gap-2 mb-4">
        {#each allSports as sport}
          <div
            class="px-3 py-1.5 rounded-lg text-sm font-medium border"
            style={sport === puzzle.answer
              ? 'background:rgba(34,197,94,0.15); border-color:rgba(34,197,94,0.4); color:#4ade80;'
              : sport === selected && !won
              ? 'background:rgba(239,68,68,0.1); border-color:rgba(239,68,68,0.3); color:#f87171;'
              : 'background:rgba(255,255,255,0.03); border-color:rgba(255,255,255,0.06); color:#475569;'}
          >
            {sport}
          </div>
        {/each}
      </div>
    {/if}

    {#if gameOver}
      <ResultBar {won} answer={puzzle.answer} shareText={getShareText()} color={COLOR} onShowModal={() => showModal = true} />
    {/if}

  </div>
</main>

{#if showModal}
  <ResultModal
    {won}
    answer={puzzle.answer}
    shareText={getShareText()}
    color={COLOR}
    onClose={() => showModal = false}
  />
{/if}
