<script>
  import { getDailyIndex, getDailyNumber, getTodayKey } from '$lib/utils/daily.js'
  import { loadGameState, saveGameState, loadStreak, updateStreak } from '$lib/utils/storage.js'
  import { people } from '$lib/data/whodunit.js'
  import ResultModal from '$lib/components/ResultModal.svelte'
  import ResultBar from '$lib/components/ResultBar.svelte'
  import AutocompleteInput from '$lib/components/AutocompleteInput.svelte'

  const allPeople = [...new Set(people.map(p => p.answer))].sort()

  const GAME_ID = 'whodunit'
  const COLOR = '#a855f7'
  const todayKey = getTodayKey()
  const gameNumber = getDailyNumber()
  const puzzle = people[getDailyIndex(people.length)]
  const MAX_CLUES = puzzle.clues.length

  let guesses = []
  let cluesRevealed = 1
  let gameOver = false
  let won = false
  let showModal = false
  let streak = loadStreak(GAME_ID)

  const saved = loadGameState(GAME_ID)
  if (saved?.date === todayKey) {
    guesses = saved.guesses
    cluesRevealed = saved.cluesRevealed
    gameOver = true
    won = saved.won
  }

  function normalise(s) {
    return s.toLowerCase().replace(/[^a-z]/g, '')
  }

  function submitGuess(name) {
    if (!name || gameOver) return
    guesses = [...guesses, name]

    if (normalise(name) === normalise(puzzle.answer)) {
      gameOver = true
      won = true
      showModal = true
      streak = updateStreak(GAME_ID, true)
      saveGameState(GAME_ID, { date: todayKey, guesses, cluesRevealed, won: true })
    } else if (cluesRevealed < MAX_CLUES) {
      cluesRevealed++
    } else {
      gameOver = true
      won = false
      showModal = true
      streak = updateStreak(GAME_ID, false)
      saveGameState(GAME_ID, { date: todayKey, guesses, cluesRevealed, won: false })
    }
  }

  function getEmojiGrid() {
    const used = guesses.length
    return Array.from({ length: MAX_CLUES }, (_, i) =>
      i < used ? (i === used - 1 && won ? '🟪' : '⬛') : '⬜'
    ).join('')
  }

  function getShareText() {
    const grid = getEmojiGrid()
    return `Whodunit #${gameNumber} ${won ? guesses.length : 'X'}/${MAX_CLUES}\n${grid}\ndaily-le.com/whodunit`
  }
</script>

<svelte:head><title>Whodunit — daily-le.com</title></svelte:head>

<main class="min-h-screen py-10 px-4">
  <div class="max-w-lg mx-auto">

    <div class="page-header justify-between">
      <a href="/" class="back-btn">← Hub</a>
      <div class="flex items-center gap-3">
        {#if streak.current > 0}<span class="text-xs text-purple-400">🔥 {streak.current}</span>{/if}
        <span class="text-xs text-slate-500">Day #{gameNumber}</span>
      </div>
    </div>

    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-1">🕵️ Whodunit</h1>
      <p class="text-sm text-slate-400">Identify the famous person. Fewer clues = better score.</p>
    </div>

    <!-- Clues -->
    <div class="space-y-2 mb-6">
      {#each puzzle.clues.slice(0, cluesRevealed) as clue, i}
        <div class="clue-card flex gap-3 items-start">
          <span class="tag mt-0.5 shrink-0" style="background:#a855f722;color:#a855f7">#{i + 1}</span>
          <p class="text-slate-200 text-sm leading-relaxed">{clue}</p>
        </div>
      {/each}
      {#each Array(MAX_CLUES - cluesRevealed) as _, i}
        <div class="clue-card flex gap-3 items-center opacity-30">
          <span class="tag" style="background:#a855f711;color:#a855f7">#{cluesRevealed + i + 1}</span>
          <p class="text-slate-500 text-sm">Locked — make a guess to reveal</p>
        </div>
      {/each}
    </div>

    <!-- Previous guesses -->
    {#if guesses.length > 0}
      <div class="mb-4 space-y-1.5">
        {#each guesses as g, i}
          <div class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm
            {i === guesses.length - 1 && won ? 'result-correct' : 'result-wrong'} card">
            <span>{i === guesses.length - 1 && won ? '✓' : '✗'}</span>
            <span>{g}</span>
          </div>
        {/each}
      </div>
    {/if}

    <!-- Input -->
    {#if !gameOver}
      <AutocompleteInput options={allPeople} placeholder="Type a famous person..." color={COLOR} onSubmit={submitGuess} />
      <p class="text-xs text-slate-600 mt-2 text-center">Clue {cluesRevealed}/{MAX_CLUES} revealed · Wrong guess reveals next clue</p>
    {/if}

    {#if gameOver}
      <ResultBar {won} answer={puzzle.answer} shareText={getShareText()} color="#a855f7" onShowModal={() => showModal = true} />
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
