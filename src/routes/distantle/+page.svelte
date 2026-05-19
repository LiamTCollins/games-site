<script>
  import { getDailyIndex, getDailyNumber, getTodayKey } from '$lib/utils/daily.js'
  import { loadGameState, saveGameState, loadStreak, updateStreak } from '$lib/utils/storage.js'
  import { cities, allCityNames, haversineKm, bearing, bearingArrow } from '$lib/data/distantle.js'
  import ResultModal from '$lib/components/ResultModal.svelte'
  import ResultBar from '$lib/components/ResultBar.svelte'
  import AutocompleteInput from '$lib/components/AutocompleteInput.svelte'

  const GAME_ID = 'distantle'
  const COLOR = '#f59e0b'
  const MAX_GUESSES = 6
  const todayKey = getTodayKey()
  const gameNumber = getDailyNumber()
  const puzzle = cities[getDailyIndex(cities.length)]

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
    const city = cities.find(c => c.name === name)
    if (!city) return
    const correct = city.name === puzzle.name
    const km = correct ? 0 : Math.round(haversineKm(city, puzzle))
    const arrow = correct ? '🎯' : bearingArrow(bearing(city, puzzle))
    const proximity = correct ? 100 : Math.max(0, Math.round(100 * (1 - km / 20000)))
    guesses = [...guesses, { name: city.name, km, arrow, correct, proximity }]

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
    return guesses.map(g => g.correct ? '🟩' : g.km < 1000 ? '🟧' : g.km < 5000 ? '🟨' : '🟥').join('')
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
      <p class="text-sm text-slate-400">Guess the secret city. Get <span class="text-amber-400 font-semibold">distance + direction</span> feedback.</p>
    </div>

    {#if guesses.length > 0}
      <div class="space-y-1.5 mb-4">
        {#each guesses as g}
          <div class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm card {g.correct ? 'result-correct' : g.km < 1000 ? 'result-close' : 'result-wrong'}">
            <span class="font-semibold w-28 truncate">{g.name}</span>
            <span class="text-xs opacity-80 tabular-nums">{g.km.toLocaleString()} km</span>
            <span class="ml-auto text-lg">{g.arrow}</span>
            <span class="text-xs opacity-60 w-10 text-right">{g.proximity}%</span>
          </div>
        {/each}
      </div>
    {/if}

    {#if !gameOver}
      <AutocompleteInput options={allCityNames} placeholder="Type a city..." color={COLOR} onSubmit={onGuess} />
      <p class="text-xs text-slate-600 mt-2 text-center">{guesses.length}/{MAX_GUESSES} guesses used · Arrow points toward target</p>
    {/if}

    {#if gameOver}
      <ResultBar {won} answer={puzzle.name} shareText={getShareText()} color={COLOR} onShowModal={() => showModal = true} />
    {/if}

  </div>
</main>

{#if showModal}
  <ResultModal {won} answer={puzzle.name} shareText={getShareText()} color={COLOR} onClose={() => showModal = false} />
{/if}
