<script>
  import { getDailyIndex, getDailyNumber, getTodayKey } from '$lib/utils/daily.js'
  import { loadGameState, saveGameState, loadStreak, updateStreak } from '$lib/utils/storage.js'
  import { flags, allCountries } from '$lib/data/flagle.js'
  import ResultModal from '$lib/components/ResultModal.svelte'
  import ResultBar from '$lib/components/ResultBar.svelte'
  import AutocompleteInput from '$lib/components/AutocompleteInput.svelte'

  const GAME_ID = 'flagle'
  const COLOR = '#8b5cf6'
  const MAX_GUESSES = 6
  const todayKey = getTodayKey()
  const gameNumber = getDailyNumber()
  const puzzle = flags[getDailyIndex(flags.length)]

  let guesses = []
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

  function onGuess(name) {
    if (gameOver) return
    const correct = name === puzzle.answer
    guesses = [...guesses, { name, correct }]

    if (correct) {
      gameOver = true; won = true; showModal = true
      streak = updateStreak(GAME_ID, true)
      saveGameState(GAME_ID, { date: todayKey, guesses, won: true })
    } else if (guesses.length >= MAX_GUESSES) {
      gameOver = true; won = false; showModal = true
      streak = updateStreak(GAME_ID, false)
      saveGameState(GAME_ID, { date: todayKey, guesses, won: false })
    }
  }

  function getEmojiGrid() {
    const r = guesses.map(g => g.correct ? '🟩' : '🟥').join('')
    const pad = '⬜'.repeat(Math.max(0, MAX_GUESSES - guesses.length))
    return r + pad
  }

  function getShareText() {
    return `Flagle #${gameNumber} ${won ? guesses.length : 'X'}/${MAX_GUESSES}\n${getEmojiGrid()}\ndaily-le.com/flagle`
  }
</script>

<svelte:head><title>Flagle — daily-le.com</title></svelte:head>

<main class="min-h-screen py-10 px-4">
  <div class="max-w-lg mx-auto">

    <div class="page-header justify-between">
      <a href="/" class="back-btn">← Hub</a>
      <div class="flex items-center gap-3">
        {#if streak.current > 0}<span class="text-xs text-violet-400">🔥 {streak.current}</span>{/if}
        <span class="text-xs text-slate-500">Day #{gameNumber}</span>
      </div>
    </div>

    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-1">🚩 Flagle</h1>
      <p class="text-sm text-slate-400">Identify the <span class="text-violet-400 font-semibold">country</span> from its flag.</p>
    </div>

    <!-- Flag display -->
    <div class="card p-10 text-center mb-4" style="border-color:rgba(139,92,246,0.25)">
      <div class="text-8xl mb-2">{puzzle.flag}</div>
    </div>

    {#if guesses.length > 0}
      <div class="space-y-1.5 mb-4">
        {#each guesses as g}
          <div class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm card {g.correct ? 'result-correct' : 'result-wrong'}">
            <span class="font-semibold">{g.name}</span>
            <span class="ml-auto text-xs opacity-80">{g.correct ? '✓ Correct!' : '✗ Wrong'}</span>
          </div>
        {/each}
      </div>
    {/if}

    {#if !gameOver}
      <AutocompleteInput options={allCountries} placeholder="Type a country..." color={COLOR} onSubmit={onGuess} />
      <p class="text-xs text-slate-600 mt-2 text-center">{guesses.length}/{MAX_GUESSES} guesses used</p>
    {/if}

    {#if gameOver}
      <ResultBar {won} answer={puzzle.answer} shareText={getShareText()} color={COLOR} onShowModal={() => showModal = true} />
    {/if}

  </div>
</main>

{#if showModal}
  <ResultModal {won} answer={puzzle.answer} shareText={getShareText()} color={COLOR} onClose={() => showModal = false} />
{/if}
