<script>
  const faqs = [
    { q: 'What is daily-le.com?', a: 'daily-le.com is a free collection of daily puzzle games covering reflexes, history, geography, science, sports, and language. Each game refreshes once per day with a brand-new challenge.' },
    { q: 'How often do the puzzles change?', a: 'Every game resets at midnight UTC. A new puzzle appears each day, and everyone in the world gets the same puzzle on the same day, so you can compare results fairly with friends.' },
    { q: 'Do I need an account to play?', a: 'No. There are no accounts, logins, or sign-ups. You can start playing any game immediately.' },
    { q: 'Where is my progress saved?', a: 'Your daily results and streaks are stored privately in your own browser using local storage. Nothing is uploaded to a server. If you clear your browser data or switch devices, your history will not carry over.' },
    { q: 'How do streaks work?', a: 'Each game tracks a streak — the number of consecutive days you have played and won. Miss a day, or fail a puzzle, and the streak resets. Streaks are a fun way to build a daily habit.' },
    { q: 'Can I play yesterday\'s puzzle?', a: 'No. Like most daily games, each puzzle is available only on its day. This keeps the playing field level and gives everyone a shared daily challenge. Come back tomorrow for the next one.' },
    { q: 'Why can I only enter certain answers?', a: 'Games with a text box use an autocomplete list of valid answers. If what you type does not appear in the list, it is not a recognised answer. This prevents typos and spelling from costing you a guess.' },
    { q: 'Is daily-le.com free?', a: 'Yes, completely free. The site may display advertising to cover hosting costs, but all games are free to play with no paywalls.' },
    { q: 'How can I share my results?', a: 'After finishing a game, use the Share button to copy an emoji result grid to your clipboard. You can paste it into messages or social media without spoiling the answer for others.' },
    { q: 'How do I suggest a new game or report a bug?', a: 'We welcome feedback and ideas. You can reach us at contact@daily-le.com.' }
  ]
</script>

<svelte:head>
  <title>FAQ — Frequently Asked Questions — daily-le.com</title>
  <meta name="description" content="Frequently asked questions about daily-le.com: how the daily puzzles work, where progress is saved, how streaks work, and more." />
  <link rel="canonical" href="https://daily-le.com/faq" />
</svelte:head>

<main class="min-h-screen py-10 px-4">
  <div class="max-w-2xl mx-auto">
    <div class="page-header justify-between">
      <a href="/" class="back-btn">← Hub</a>
    </div>

    <h1 class="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h1>

    <div class="space-y-6">
      {#each faqs as faq}
        <section>
          <h2 class="text-lg font-semibold text-white mb-1.5">{faq.q}</h2>
          <p class="text-slate-300 leading-relaxed text-sm">{faq.a}</p>
        </section>
      {/each}
    </div>
  </div>
</main>
