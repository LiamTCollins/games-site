<script>
  import { onMount } from 'svelte'
  import GameCard from '$lib/components/GameCard.svelte'
  import { getTodayKey, getDailyNumber } from '$lib/utils/daily.js'
  import { loadGameState, loadStreak } from '$lib/utils/storage.js'

  const games = [
    { id: 'reaction',  name: 'Reactionle',  emoji: '⏱️', color: '#22c55e', route: '/reaction',  description: 'Stop the timer at exactly 5 seconds.' },
    { id: 'blindtap',  name: 'Blindtap',    emoji: '👆', color: '#3b82f6', route: '/blindtap',  description: 'No timer. Tap after exactly 5 seconds.' },
    { id: 'whodunit',  name: 'Whodunit',    emoji: '🕵️', color: '#a855f7', route: '/whodunit',  description: 'Identify a famous person from clues.' },
    { id: 'sportle',   name: 'Sportle',     emoji: '🏆', color: '#f97316', route: '/sportle',   description: 'Name the sport from its description.' },
    { id: 'physicsle', name: 'Physicsle',   emoji: '⚛️', color: '#06b6d4', route: '/physicsle', description: 'Name the physics phenomenon described.' },
    { id: 'datele',    name: 'Datele',      emoji: '📅', color: '#eab308', route: '/datele',    description: 'Guess the month and year of a historical event.' },
    { id: 'languagle', name: 'Languagle',   emoji: '🌐', color: '#ec4899', route: '/languagle', description: 'Identify the language from a text snippet.' },
    { id: 'statele',   name: 'Statele',     emoji: '🗺️', color: '#ef4444', route: '/statele',   description: 'Name the US state or territory from a city.' },
    { id: 'elemently', name: 'Elemently',   emoji: '🔬', color: '#14b8a6', route: '/elemently', description: 'Guess the atomic number of an element.' },
    { id: 'capitdle',  name: 'Capitdle',    emoji: '🏛️', color: '#10b981', route: '/capitdle',  description: 'Name the capital city of the country.' },
    { id: 'distantle', name: 'Distantle',   emoji: '🧭', color: '#f59e0b', route: '/distantle', description: 'Guess the distance in km between two cities.' },
  ]

  let gameStatuses = {}
  let gameStreaks = {}
  const todayKey = getTodayKey()
  const dayNumber = getDailyNumber()

  onMount(() => {
    for (const g of games) {
      const state = loadGameState(g.id)
      gameStatuses[g.id] = state?.date === todayKey
      gameStreaks[g.id] = loadStreak(g.id).current
    }
    gameStatuses = gameStatuses
    gameStreaks = gameStreaks
  })

  $: playedCount = Object.values(gameStatuses).filter(Boolean).length

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'daily-le.com',
        url: 'https://daily-le.com/',
        description: 'Eleven free daily puzzle games covering geography, history, science, sports, and language.'
      },
      {
        '@type': 'ItemList',
        name: 'Daily Games',
        itemListElement: games.map((g, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: g.name,
          url: `https://daily-le.com${g.route}`,
          description: g.description
        }))
      }
    ]
  }
  const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`
</script>

<svelte:head>
  <title>daily-le — 11 Free Daily Puzzle Games, New Every Day</title>
  <meta name="description" content="Play 11 free daily puzzle games in one place: guess the famous person, sport, capital city, language, US state, chemical element, and more. A new challenge every day." />
  <link rel="canonical" href="https://daily-le.com/" />
  {@html jsonLdScript}
</svelte:head>

<main class="min-h-screen py-10 px-4">
  <div class="max-w-3xl mx-auto">

    <!-- Header -->
    <header class="text-center mb-10">
      <h1 class="text-4xl font-extrabold text-white tracking-tight mb-2">
        daily<span class="text-indigo-400">-le</span>.com
      </h1>
      <p class="text-slate-400 text-sm">Eleven free puzzles. New every day.</p>
      <div class="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-300">
        Day #{dayNumber} &nbsp;·&nbsp; {playedCount}/11 played today
      </div>
    </header>

    <!-- Game grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {#each games as game}
        <GameCard
          name={game.name}
          description={game.description}
          emoji={game.emoji}
          color={game.color}
          route={game.route}
          played={gameStatuses[game.id] ?? false}
          streak={gameStreaks[game.id] ?? 0}
        />
      {/each}
    </div>

    <!-- Sister sites -->
    <div class="mt-12 pt-8 border-t border-white/5">
      <p class="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">More daily games</p>
      <div class="flex flex-wrap justify-center gap-3">
        <a href="https://popdle.com" target="_blank" rel="noopener"
          class="card card-hover px-5 py-3 text-sm font-semibold text-slate-200 flex items-center gap-2">
          Popdle <span class="text-slate-500">↗</span>
        </a>
        <a href="https://playquotedle.com" target="_blank" rel="noopener"
          class="card card-hover px-5 py-3 text-sm font-semibold text-slate-200 flex items-center gap-2">
          Quotedle <span class="text-slate-500">↗</span>
        </a>
      </div>
    </div>

    <footer class="mt-10 text-center text-xs text-slate-600 space-y-2">
      <div class="flex flex-wrap justify-center gap-4">
        <a href="/about" class="hover:text-slate-400">About</a>
        <a href="/how-to-play" class="hover:text-slate-400">Guides</a>
        <a href="/faq" class="hover:text-slate-400">FAQ</a>
        <a href="/privacy" class="hover:text-slate-400">Privacy</a>
      </div>
      <p>Looking for more? Browse a big directory of daily games at <a href="https://listdle.com" target="_blank" rel="noopener" class="hover:text-slate-400 underline">Listdle</a>.</p>
      <p>Resets daily at midnight UTC · © {new Date().getFullYear()} daily-le.com</p>
    </footer>
  </div>
</main>
