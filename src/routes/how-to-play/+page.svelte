<script>
  import { guideList } from '$lib/data/guides.js'
</script>

<svelte:head>
  <title>How to Play — Game Guides — daily-le.com</title>
  <meta name="description" content="How-to-play guides and strategy tips for every daily game on daily-le.com, including Whodunit, Sportle, Capitdle, Datele, and more." />
  <link rel="canonical" href="https://daily-le.com/how-to-play" />
</svelte:head>

<main class="min-h-screen py-10 px-4">
  <div class="max-w-2xl mx-auto">
    <div class="page-header justify-between">
      <a href="/" class="back-btn">← Hub</a>
    </div>

    <h1 class="text-3xl font-bold text-white mb-2">Game Guides</h1>
    <p class="text-slate-400 mb-8">New to daily-le.com? Each guide explains the rules and shares strategy tips to help you improve your score and extend your streak.</p>

    <div class="space-y-3">
      {#each guideList as g}
        <a href={`/how-to-play/${g.slug}`} class="card card-hover block p-4">
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold shrink-0"
              style="background:{g.color}22; color:{g.color}; border:1px solid {g.color}44;">
              {g.name.slice(0, 2)}
            </span>
            <div>
              <h2 class="font-semibold text-white">How to Play {g.name}</h2>
              <p class="text-sm text-slate-400">{g.tagline}</p>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</main>
