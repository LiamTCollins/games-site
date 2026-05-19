<script>
  import { getDailyNumber, getTodayKey } from '$lib/utils/daily.js'
  import { loadGameState, saveGameState, loadStreak, updateStreak } from '$lib/utils/storage.js'
  import { cities, haversineKm, getDailyPair } from '$lib/data/distantle.js'
  import ResultModal from '$lib/components/ResultModal.svelte'
  import ResultBar from '$lib/components/ResultBar.svelte'

  const GAME_ID = 'distantle'
  const COLOR = '#f59e0b'
  const MAX_GUESSES = 5
  const TOLERANCE_PCT = 5  // within 5% = win
  const todayKey = getTodayKey()
  const gameNumber = getDailyNumber()

  // Pull deterministic pair for today
  const [cityA, cityB] = getDailyPair(gameNumber - 1)
  const actualKm = Math.round(haversineKm(cityA, cityB))

  let guesses = []   // [{value, diff, pct}]
  let input = ''
  let gameOver = false
  let won = false
  let showModal = false
  let streak = loadStreak(GAME_ID)

  const saved = loadGameState(GAME_ID)
  if (saved?.date === todayKey) {
    guesses = saved.guesses
    gameOver = true
    won = saved.won
  }

  function submitGuess() {
    const val = parseInt(input)
    if (isNaN(val) || val < 0 || gameOver) return

    const diff = val - actualKm
    const pct = Math.abs(diff) / actualKm * 100
    guesses = [...guesses, { value: val, diff, pct }]

    if (pct <= TOLERANCE_PCT) {
      gameOver = true; won = true; showModal = true
      streak = updateStreak(GAME_ID, true)
      saveGameState(GAME_ID, { date: todayKey, guesses, won: true })
    } else if (guesses.length >= MAX_GUESSES) {
      gameOver = true; won = false; showModal = true
      streak = updateStreak(GAME_ID, false)
      saveGameState(GAME_ID, { date: todayKey, guesses, won: false })
    }
    input = ''
  }

  function handleKey(e) {
    if (e.key === 'Enter') submitGuess()
  }

  function feedbackLabel(g) {
    if (g.pct <= TOLERANCE_PCT) return '✓ Correct!'
    const dir = g.diff > 0 ? 'Too high' : 'Too low'
    if (g.pct <= 15) return `🔥 Very close — ${dir}`
    if (g.pct <= 35) return `🌡️ Warm — ${dir}`
    if (g.pct <= 75) return `❄️ Cool — ${dir}`
    return `🧊 Cold — ${dir}`
  }

  function feedbackClass(g) {
    if (g.pct <= TOLERANCE_PCT) return 'result-correct'
    if (g.pct <= 15) return 'result-close'
    if (g.pct <= 35) return 'result-close'
    return 'result-wrong'
  }

  function getEmojiGrid() {
    const r = guesses.map(g => {
      if (g.pct <= TOLERANCE_PCT) return '🟩'
      if (g.pct <= 15) return '🟧'
      if (g.pct <= 35) return '🟨'
      return '🟥'
    }).join('')
    const pad = '⬜'.repeat(Math.max(0, MAX_GUESSES - guesses.length))
    return r + pad
  }

  function getShareText() {
    return `Distantle #${gameNumber} ${won ? guesses.length : 'X'}/${MAX_GUESSES}\n${getEmojiGrid()}\ndaily-le.com/distantle`
  }
</script>

<svelte:head><title>Distantle — daily-le.com</title></svelte:head>

<main class="min-h-screen py-10 px-4">
  <div class="max-w-lg mx-auto">

    <div class="page-header justify-between">
      <a href="/" class="back-btn">← Hub</a>
      <div class="flex items-center gap-3">
        {#if streak.current > 0}<span class="text-xs text-amber-400">🔥 {streak.current}</span>{/if}
        <span class="text-xs text-slate-500">Day #{gameNumber}</span>
      </div>
    </div>

    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-1">🧭 Distantle</h1>
      <p class="text-sm text-slate-400">Guess the <span class="text-amber-400 font-semibold">distance in km</span> between these two cities. Within {TOLERANCE_PCT}% = win.</p>
    </div>

    <!-- Two cities -->
    <div class="card p-6 mb-4 text-center" style="border-color:rgba(245,158,11,0.25)">
      <div class="grid grid-cols-3 items-center gap-2">
        <div>
          <p class="text-slate-400 text-[10px] uppercase tracking-wider mb-1">City A</p>
          <p class="text-2xl font-bold text-white leading-tight">{cityA.name}</p>
        </div>
        <div class="text-3xl text-amber-400">⟷</div>
        <div>
          <p class="text-slate-400 text-[10px] uppercase tracking-wider mb-1">City B</p>
          <p class="text-2xl font-bold text-white leading-tight">{cityB.name}</p>
        </div>
      </div>
    </div>

    {#if guesses.length > 0}
      <div class="space-y-1.5 mb-4">
        {#each guesses as g}
          <div class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm card {feedbackClass(g)}">
            <span class="font-mono font-bold tabular-nums w-20">{g.value.toLocaleString()} km</span>
            <span class="text-xs opacity-80 ml-auto">{feedbackLabel(g)}</span>
          </div>
        {/each}
      </div>
    {/if}

    {#if !gameOver}
      <div class="flex gap-2">
        <input
          class="input-field font-mono text-xl text-center"
          type="number"
          placeholder="Distance in km"
          bind:value={input}
          on:keydown={handleKey}
          min="0"
          autofocus
        />
        <button class="btn text-white shrink-0" style="background:#f59e0b" on:click={submitGuess} disabled={!input}>
          Guess
        </button>
      </div>
      <p class="text-xs text-slate-600 mt-2 text-center">{guesses.length}/{MAX_GUESSES} guesses used</p>
    {/if}

    {#if gameOver}
      <ResultBar {won} answer="{actualKm.toLocaleString()} km" shareText={getShareText()} color={COLOR} onShowModal={() => showModal = true} />
    {/if}

  </div>
</main>

{#if showModal}
  <ResultModal {won} answer="{actualKm.toLocaleString()} km ({cityA.name} ⟷ {cityB.name})" shareText={getShareText()} color={COLOR} onClose={() => showModal = false} />
{/if}
