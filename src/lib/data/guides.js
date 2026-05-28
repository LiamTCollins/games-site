// How-to-play guides for each game. Substantial original written content for SEO + AdSense.
export const guides = {
  reaction: {
    name: 'Reactionle',
    route: '/reaction',
    color: '#22c55e',
    tagline: 'The daily five-second timing challenge.',
    description: 'Learn how to play Reactionle, the daily reaction-timing game. Stop the clock as close to five seconds as you can.',
    sections: [
      { h: 'What is Reactionle?', p: 'Reactionle is a daily timing game that tests your internal sense of how long five seconds really feels. After a short countdown, a timer starts running and your only job is to stop it as close to exactly 5.000 seconds as possible. It sounds easy, but most people are surprised by how far off they are on their first try.' },
      { h: 'How to play', p: 'Press START to begin the three-second countdown. When the countdown ends, the timer begins counting up. Watch the clock and hit STOP the instant you believe five seconds have elapsed. Your score is the absolute difference, in milliseconds, between your stop time and the five-second target. The lower your score, the better — a perfect run is zero milliseconds off.' },
      { h: 'Strategy and tips', p: 'The most reliable technique is to count in a steady rhythm rather than trying to "feel" the time. Many players mentally count "one-one-thousand, two-one-thousand" up to five. Others tap a finger to an internal beat. Because the timer is visible in Reactionle, you can also train your eye-to-hand reaction lag: most people react roughly 150–250 milliseconds after they decide to stop, so anticipating slightly can shave points off your score.' },
      { h: 'Scoring', p: 'A score under 100 milliseconds is excellent, under 500 is a solid result, and anything under 50 is genuinely uncanny. Only your first attempt of the day counts toward your record, so make it deliberate. Come back tomorrow for a fresh attempt and try to extend your streak.' }
    ]
  },
  blindtap: {
    name: 'Blindtap',
    route: '/blindtap',
    color: '#3b82f6',
    tagline: 'Five seconds, completely blind.',
    description: 'Learn how to play Blindtap, the daily no-timer challenge where you must tap after exactly five seconds with no visual feedback.',
    sections: [
      { h: 'What is Blindtap?', p: 'Blindtap is the harder cousin of Reactionle. The challenge is identical — stop after exactly five seconds — but there is no visible timer at all. You must rely entirely on your internal clock. With nothing to watch, Blindtap is a pure test of time perception, and it humbles even people who score well on timed reaction games.' },
      { h: 'How to play', p: 'Press START, then wait. When you feel that five seconds have passed, press STOP. The game then reveals how close you were. Because you cannot see the clock, you cannot make a last-instant correction, which makes consistency far more difficult than in a timed game.' },
      { h: 'Strategy and tips', p: 'Rhythmic counting is essential here. Establish a steady internal beat before you press START so you are not still settling into a rhythm when the clock begins. Avoid distractions and breathe steadily — holding your breath subtly speeds up your internal sense of time, causing most people to tap too early. With practice, you can calibrate your personal bias and adjust by a fraction of a second.' },
      { h: 'Scoring', p: 'Scores in Blindtap are naturally higher (worse) than in timed games because you get no feedback. Anything under 200 milliseconds off is excellent, and a score under 50 borders on superhuman. Only your first attempt counts each day.' }
    ]
  },
  whodunit: {
    name: 'Whodunit',
    route: '/whodunit',
    color: '#a855f7',
    tagline: 'Identify the famous figure from clues.',
    description: 'Learn how to play Whodunit, the daily guessing game where you identify a famous historical figure from progressive clues.',
    sections: [
      { h: 'What is Whodunit?', p: 'Whodunit challenges you to identify a famous person from history using a series of first-person clues. Each day features a different figure — scientists, leaders, artists, athletes, and cultural icons from across centuries and continents. The clues are written from the perspective of the mystery person, beginning vague and growing more specific.' },
      { h: 'How to play', p: 'You start with a single clue and one guess. Type a name; an autocomplete menu shows valid options, so you can only submit a recognised person. If your guess is wrong, the next clue is revealed and you try again. The fewer clues you need, the better your score. Guess correctly on the first clue for a perfect result.' },
      { h: 'Strategy and tips', p: 'Early clues often reference details like birthplace, era, or field of work. Resist the urge to guess wildly on clue one unless you are confident — a wrong guess costs you a clue. Instead, narrow the field: is this person a scientist or an artist? Ancient or modern? Use later clues, which usually mention a signature achievement, to lock in your answer.' },
      { h: 'Why people love it', p: 'Whodunit doubles as a daily history lesson. Even when you do not get the answer immediately, the clues teach you something memorable about a notable figure. Share your result grid to compare how many clues you needed with friends.' }
    ]
  },
  sportle: {
    name: 'Sportle',
    route: '/sportle',
    color: '#f97316',
    tagline: 'Name the sport from its description.',
    description: 'Learn how to play Sportle, the daily game where you identify a sport — often an obscure one — from a set of descriptive clues.',
    sections: [
      { h: 'What is Sportle?', p: 'Sportle is a daily game about the wide and wonderful world of sport. Each day describes a single sport through a series of clues, and your job is to name it from a bank of options. While some days feature household names like soccer or tennis, many days highlight fascinating but lesser-known sports such as kabaddi, sepak takraw, hurling, or bandy.' },
      { h: 'How to play', p: 'Read the first clue, then either reveal more clues or make your pick from the guess bank. You get one guess, so the strategy is balancing confidence against the clue count shown in your shareable result. Select the sport you believe is correct and confirm.' },
      { h: 'Strategy and tips', p: 'The opening clue usually describes the core mechanic of the sport — what players do with the ball, implement, or each other. Subsequent clues often reveal the region where the sport is popular or a famous competition. If you are unsure, reveal another clue: a worse score is better than a wrong guess. Geography is a huge hint, since many niche sports are tied to a specific country or culture.' },
      { h: 'Expand your sporting knowledge', p: 'Sportle is a great way to discover sports you never knew existed. From the Basque ball game of pelota to the head-first ice plunge of skeleton, each puzzle is a small window into global sporting culture.' }
    ]
  },
  physicsle: {
    name: 'Physicsle',
    route: '/physicsle',
    color: '#06b6d4',
    tagline: 'Name the physics phenomenon.',
    description: 'Learn how to play Physicsle, the daily science game where you identify a physics phenomenon from progressive clues.',
    sections: [
      { h: 'What is Physicsle?', p: 'Physicsle is a daily game for the scientifically curious. Each puzzle describes a physics phenomenon — from everyday effects like friction and buoyancy to mind-bending concepts like quantum tunneling, Hawking radiation, and wave-particle duality — and asks you to name it.' },
      { h: 'How to play', p: 'You begin with one clue. Type your answer into the autocomplete field, which only accepts recognised phenomena. A wrong guess reveals the next clue, so you are rewarded for identifying the concept early. The clues progress from a plain-language description toward the precise scientific name and historical context.' },
      { h: 'Strategy and tips', p: 'The first clue usually describes the observable effect in everyday terms. Ask yourself which branch of physics it belongs to: mechanics, thermodynamics, electromagnetism, optics, or quantum theory. Later clues often name the scientist associated with the discovery, which can be a decisive hint if you know your physics history.' },
      { h: 'Learn as you play', p: 'Physicsle is designed to teach. Whether you are a student, a teacher, or simply someone who enjoys science, each daily puzzle reinforces a key concept and the story behind it.' }
    ]
  },
  datele: {
    name: 'Datele',
    route: '/datele',
    color: '#eab308',
    tagline: 'Guess the month and year of history.',
    description: 'Learn how to play Datele, the daily history game where you guess the month and year of a famous historical event.',
    sections: [
      { h: 'What is Datele?', p: 'Datele is a daily game that tests your sense of history. Each day presents a famous event — from ancient milestones to recent headlines — and challenges you to pinpoint the month and year it happened. A correct answer unlocks a bonus round where you guess the exact day.' },
      { h: 'How to play', p: 'Select a month and enter a year, then submit your guess. After each guess, Datele tells you whether your date is too early or too late, and how close you are — within a year, within five years, or further off. You have six guesses to home in on the correct month and year. Nail it, and a bonus round invites you to guess the precise day for extra glory.' },
      { h: 'Strategy and tips', p: 'Treat it like a binary search. Start with a reasonable estimate, then use the "too early / too late" feedback to halve your range with each guess. The proximity hints ("within a year", "within five years") tell you how aggressively to adjust. After three wrong guesses, a contextual hint appears to help you close in.' },
      { h: 'A daily history refresher', p: 'From the Moon landing to the fall of the Berlin Wall, Datele turns historical literacy into a quick daily ritual. Even seasoned history buffs find the exact-month requirement satisfyingly tricky.' }
    ]
  },
  languagle: {
    name: 'Languagle',
    route: '/languagle',
    color: '#ec4899',
    tagline: 'Identify the language from a snippet.',
    description: 'Learn how to play Languagle, the daily linguistics game where you identify a world language from a short text snippet.',
    sections: [
      { h: 'What is Languagle?', p: 'Languagle is a daily game for language lovers. Each puzzle shows a short snippet of text in a mystery language, and your task is to identify which language it is. The pool spans dozens of languages, from widely spoken giants like Mandarin and Spanish to fascinating outliers like Basque, Welsh, and Esperanto.' },
      { h: 'How to play', p: 'Study the snippet, then type your guess into the autocomplete field. A wrong guess reveals a clue about the language — its family, region, writing system, or number of speakers. The fewer clues you need, the better your score.' },
      { h: 'Strategy and tips', p: 'Start with the script. Is it Latin, Cyrillic, Arabic, or something unique like Greek, Hebrew, Thai, or Devanagari? The alphabet alone narrows the field dramatically. Within Latin-script languages, look for telltale diacritics: ñ suggests Spanish, ø points to Scandinavian languages, and ł hints at Polish. Common short words and accent patterns are powerful clues.' },
      { h: 'A window into world languages', p: 'Languagle is a fun way to build linguistic awareness and learn how the world\'s writing systems differ. Each day introduces a language with notes on its history, region, and quirks.' }
    ]
  },
  statele: {
    name: 'Statele',
    route: '/statele',
    color: '#ef4444',
    tagline: 'Name the US state from a city.',
    description: 'Learn how to play Statele, the daily US geography game where you name the state or territory a given city belongs to.',
    sections: [
      { h: 'What is Statele?', p: 'Statele is a daily United States geography game. Each puzzle names a city — sometimes a famous one, often a state capital or a regional hub — and asks you to name the state or territory it belongs to. It covers all 50 states plus US territories like Puerto Rico, Guam, and the US Virgin Islands.' },
      { h: 'How to play', p: 'Type the state or territory into the autocomplete field. If you are wrong, a clue about the city is revealed — its geography, history, or a notable landmark. You score better the fewer clues you need, so a confident first guess is ideal.' },
      { h: 'Strategy and tips', p: 'Many puzzles feature state capitals that are not the largest city in their state — places like Pierre, Montpelier, or Frankfort. If a city name is unfamiliar, the first clue often reveals a defining geographic feature like a major river, mountain range, or coastline. Knowing regional clusters (New England, the Great Plains, the Mountain West) helps you narrow down quickly.' },
      { h: 'Master US geography', p: 'Statele is an excellent daily drill for students, trivia fans, and anyone who wants to sharpen their knowledge of American geography beyond the obvious big cities.' }
    ]
  },
  elemently: {
    name: 'Elemently',
    route: '/elemently',
    color: '#14b8a6',
    tagline: 'Guess the atomic number.',
    description: 'Learn how to play Elemently, the daily chemistry game where you guess a chemical element\'s atomic number with hot and cold feedback.',
    sections: [
      { h: 'What is Elemently?', p: 'Elemently is a daily chemistry game built around the periodic table. Each puzzle names a chemical element and shows its symbol, and you must guess its atomic number — its position on the periodic table, from 1 (hydrogen) to 118 (oganesson).' },
      { h: 'How to play', p: 'Enter a number between 1 and 118. After each guess, Elemently tells you whether the true atomic number is higher or lower, and how close you are using a hot-and-cold scale. You have five guesses. After your second wrong guess, a period hint appears; after your third, a group hint is revealed.' },
      { h: 'Strategy and tips', p: 'Use the hot/cold feedback like a binary search — start near the middle of the table (around 50) and adjust based on the higher/lower hints. If you know roughly where an element sits (the noble gases on the far right, the alkali metals on the far left), you can skip straight to that neighbourhood. The period and group hints are powerful: the period tells you the row, and the group tells you the column.' },
      { h: 'Learn the periodic table', p: 'Elemently rewards familiarity with the periodic table and helps you build it over time. Whether you are studying chemistry or just love science trivia, it is a satisfying daily challenge.' }
    ]
  },
  capitdle: {
    name: 'Capitdle',
    route: '/capitdle',
    color: '#10b981',
    tagline: 'Name the capital city.',
    description: 'Learn how to play Capitdle, the daily world geography game where you name the capital city of a given country.',
    sections: [
      { h: 'What is Capitdle?', p: 'Capitdle is a daily world geography game. Each puzzle names a country and asks you to identify its capital city. The pool covers nearly every country on Earth, from easy ones like France (Paris) to tricky ones where the capital is not the largest or best-known city — think Canberra for Australia or Brasília for Brazil.' },
      { h: 'How to play', p: 'Type the capital into the autocomplete field, which only accepts valid city names. You have four guesses. The fewer you use, the better your score and the stronger your streak.' },
      { h: 'Strategy and tips', p: 'Watch out for "trap" countries where the capital differs from the famous city: the capital of the United States is Washington, not New York; of Turkey it is Ankara, not Istanbul; of Switzerland it is Bern, not Zurich or Geneva. When in doubt, recall the political capital rather than the commercial one.' },
      { h: 'Travel the world daily', p: 'Capitdle is a fast, addictive way to learn and retain world capitals. It is perfect for travellers, quiz-night regulars, and geography students alike.' }
    ]
  },
  distantle: {
    name: 'Distantle',
    route: '/distantle',
    color: '#f59e0b',
    tagline: 'Estimate the distance between cities.',
    description: 'Learn how to play Distantle, the daily geography game where you estimate the distance in kilometres between two world cities.',
    sections: [
      { h: 'What is Distantle?', p: 'Distantle is a daily geography game with a numerical twist. Each puzzle shows two world cities, and you must estimate the great-circle distance between them in kilometres. It is a test of both your mental map of the world and your sense of scale.' },
      { h: 'How to play', p: 'Enter your distance estimate in kilometres. After each guess, Distantle tells you whether you are too high or too low, plus a warmth rating showing how close you are. You have five guesses, and a result within five percent of the true distance counts as a win.' },
      { h: 'Strategy and tips', p: 'Anchor yourself with reference distances you already know. For example, New York to London is about 5,600 km, and the Earth\'s circumference is roughly 40,000 km, so no two cities can be more than about 20,000 km apart. Use the too-high / too-low feedback to converge quickly, and lean on the warmth rating to judge how big each adjustment should be.' },
      { h: 'Build a mental world map', p: 'Distantle sharpens your intuition for global geography and distances. Over time, you will be surprised how accurate your estimates become.' }
    ]
  }
}

export const guideList = Object.entries(guides).map(([slug, g]) => ({ slug, ...g }))
