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

<main class="min-h-screen py-12 px-5">
  <div class="max-w-3xl mx-auto">

    <!-- Masthead -->
    <header class="masthead">
      <p class="eyebrow">Daily Puzzles</p>
      <h1 class="wordmark">daily<span class="wordmark-accent">-le</span></h1>
      <p class="lede">Eleven free puzzles. A new one every day.</p>
      <div class="dateline">
        <span>Day No. {dayNumber}</span>
        <span class="dateline-sep">·</span>
        <span>{playedCount} of 11 played today</span>
      </div>
    </header>

    <!-- Game index -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {#each games as game, i}
        <GameCard
          name={game.name}
          description={game.description}
          route={game.route}
          index={i}
          played={gameStatuses[game.id] ?? false}
          streak={gameStreaks[game.id] ?? 0}
        />
      {/each}
    </div>

    <!-- Sister sites -->
    <section class="sisters">
      <p class="section-label">More daily games</p>
      <div class="sister-links">
        <a href="https://popdle.com" target="_blank" rel="noopener" class="card card-hover sister-link">
          Popdle <span class="sister-arrow">↗</span>
        </a>
        <a href="https://playquotedle.com" target="_blank" rel="noopener" class="card card-hover sister-link">
          Quotedle <span class="sister-arrow">↗</span>
        </a>
      </div>
    </section>

    <footer class="site-foot">
      <div class="foot-links">
        <a href="/about">About</a>
        <a href="/how-to-play">Guides</a>
        <a href="/faq">FAQ</a>
        <a href="/privacy">Privacy</a>
      </div>
      <p>Looking for more? Browse a directory of daily games at <a href="https://listdle.com" target="_blank" rel="noopener" class="foot-inline">Listdle</a>.</p>
      <p>Resets daily at midnight UTC · © {new Date().getFullYear()} daily-le</p>
    </footer>
  </div>
</main>

<style>
  .masthead {
    text-align: center;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--rule);
  }
  .eyebrow {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.6rem;
  }
  .wordmark {
    font-family: 'Fraunces', Georgia, serif;
    font-size: clamp(2.8rem, 9vw, 4.2rem);
    font-weight: 600;
    line-height: 1;
    color: var(--ink);
    margin: 0;
  }
  .wordmark-accent { color: var(--accent); }
  .lede {
    font-size: 1rem;
    color: var(--ink-soft);
    margin-top: 0.7rem;
  }
  .dateline {
    margin-top: 1rem;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }
  .dateline-sep { opacity: 0.6; }

  .sisters {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--rule);
    text-align: center;
  }
  .section-label {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 1rem;
  }
  .sister-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }
  .sister-link {
    padding: 0.7rem 1.3rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--ink);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }
  .sister-arrow { color: var(--muted); }

  .site-foot {
    margin-top: 2.5rem;
    text-align: center;
    font-size: 0.78rem;
    color: var(--muted);
  }
  .foot-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.1rem;
    margin-bottom: 0.7rem;
  }
  .foot-links a, .foot-inline {
    color: var(--ink-soft);
    text-decoration: none;
  }
  .foot-links a:hover, .foot-inline:hover { color: var(--accent); }
  .foot-inline { text-decoration: underline; }
  .site-foot p { margin: 0.3rem 0; }
</style>
