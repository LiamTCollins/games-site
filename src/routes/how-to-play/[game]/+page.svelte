<script>
  export let data
  $: guide = data.guide
  $: kw = guide.tagline.replace(/\.$/, '')
</script>

<svelte:head>
  <title>How to Play {guide.name}: {kw} | daily-le.com</title>
  <meta name="description" content={guide.description} />
  <link rel="canonical" href={`https://daily-le.com/how-to-play/${data.slug}`} />
</svelte:head>

<main class="min-h-screen py-10 px-4">
  <div class="max-w-2xl mx-auto">
    <div class="page-header justify-between">
      <a href="/" class="back-btn">← Hub</a>
      <a href="/how-to-play" class="text-xs text-slate-500 hover:text-slate-300">All guides</a>
    </div>

    <div class="mb-8">
      <span class="inline-flex items-center justify-center w-12 h-12 rounded-xl text-lg font-bold mb-4"
        style="background:{guide.color}22; color:{guide.color}; border:1px solid {guide.color}44;">
        {guide.name.slice(0, 2)}
      </span>
      <h1 class="text-3xl font-bold text-white mb-2">How to Play {guide.name}</h1>
      <p class="text-slate-400">{guide.tagline}</p>
    </div>

    <div class="space-y-6">
      {#each guide.sections as section}
        <section>
          <h2 class="text-xl font-semibold text-white mb-2">{section.h}</h2>
          <p class="text-slate-300 leading-relaxed">{section.p}</p>
        </section>
      {/each}
    </div>

    <div class="mt-10">
      <a href={guide.route} class="btn text-white inline-block" style="background:{guide.color}">
        Play {guide.name} →
      </a>
    </div>
  </div>
</main>
