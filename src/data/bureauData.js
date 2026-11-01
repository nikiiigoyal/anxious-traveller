/* eslint-disable */
// Anxious Traveller — demo data, voices, and the two scenarios

const VOICES = [
  {
    id: 'bro', name: 'Bro', tag: 'chill, slang',
    outfit: 'bro',
    preview: "“Rome's mostly chillin'. One transit thing Thursday. We're good.”",
    intro: "Yo. Goose did the rounds. Rome's mostly chillin' next week — one transit thing on Thursday, a sunny patch, no real blockers.",
    tldr: [
      "Rome is straight up vibing. No need to spiral.",
      "Thursday transit strike — don't book your airport day around it, bro.",
      "Two warm afternoons. Pack the linen, leave the puffer.",
    ],
    bubbles: {
      hero: "Yo. I did a lap. You're fine.",
      loading: "Hold up, I'm reading the room.",
      verdict_go: "Cleared. Go forth. Honk.",
      ruiner_intro: "Look bro, we need to talk. I'm gonna be real with you.",
    },
  },
  {
    id: 'jarvis', name: 'Jarvis', tag: 'concise, AI-coded',
    outfit: 'jarvis',
    preview: "“Rome: stable. One transit caveat (Thu). Weather: 24–29 °C.”",
    intro: "Destination assessment complete. Rome reads stable across all five signal layers, with one transit caveat and a brief warm spell to plan around.",
    tldr: [
      "Rome — operational status: green. No active restrictions.",
      "Single disruption: ATAC strike, Thu 20 Jun, 08:30–17:00 local.",
      "Forecast: 24–29 °C peak, 30% precip on day 4.",
    ],
    bubbles: {
      hero: "Investigation complete. Confidence: high.",
      loading: "Cross-referencing five sources. Stand by.",
      verdict_go: "Cleared for departure. Caveats logged.",
      ruiner_intro: "I need to flag a non-trivial concentration of risk signals.",
    },
  },
  {
    id: 'bestie', name: 'Bestie', tag: 'warm, gossipy',
    outfit: 'bestie',
    preview: "“Babe. Rome is gonna be perfect. Tiny heads-up about Thursday.”",
    intro: "Babe. I ran ALL the checks. Rome is genuinely going to be perfect — there are two tiny things and they're both very fixable, I promise.",
    tldr: [
      "Babe, Rome is giving. You picked the right week.",
      "Don't fly Thursday — transit strike, airport's a vibe disaster.",
      "Pack the linen set. Two warm evenings = perfect spritz hours.",
    ],
    bubbles: {
      hero: "Babe, I did the homework. Pack the linen.",
      loading: "OMG, I have so much to tell you.",
      verdict_go: "Cleared! Send me a postcard. Or don't. I'm not your mom.",
      ruiner_intro: "Okay babe, sit down, I love you, but I'm worried.",
    },
  },
  {
    id: 'petparent', name: 'Pet Parent', tag: 'extra calm, pup lens',
    outfit: 'petparent',
    preview: "“Rome is broadly dog-friendly. Carrier required on regional trains.”",
    intro: "I checked with the local geese and a few of the dogs. Rome is broadly pup-welcoming, with two warm afternoons to plan around. Carrier on regional trains, leash everywhere.",
    tldr: [
      "Rome is broadly dog-friendly — Trastevere especially.",
      "Carrier required on regional trains. Muzzle for transit.",
      "Two warm afternoons (29 °C) — walk early, cobblestones get hot.",
    ],
    bubbles: {
      hero: "Pup-approved. I triple-checked with three terriers.",
      loading: "Cross-checking with the local geese AND the dogs.",
      verdict_go: "Pack the collapsible bowl. Tail intact.",
      ruiner_intro: "Friend. I'd leave the pup home for this one.",
    },
  },
  {
    id: 'family', name: 'Family', tag: 'kid-safe, calm',
    outfit: 'family',
    preview: "“Stroller-friendly. Skip Thursday for the airport day.”",
    intro: "I ran a family-mode pass. Rome is stroller-friendly, kid-safe, and the only real planning ask is to skip Thursday for the airport day.",
    tldr: [
      "Family-mode: green. Strollers fine in the centre.",
      "Skip Thursday for the airport day — transit strike.",
      "Two hot afternoons — gelato is a strategy, not a treat.",
    ],
    bubbles: {
      hero: "Stroller-tested. Gelato-budgeted. Kid-safe.",
      loading: "Reading the kid-safe filter twice. Just in case.",
      verdict_go: "Cleared. Pack snacks. Always pack snacks.",
      ruiner_intro: "Listen — I'd reschedule. Three reasons, all reasonable.",
    },
  },
];

const DEMO_CHIPS = [
  { label: 'Ujjain Mahakal trip', emoji: '🕉', query: 'Ujjain next weekend' },
  { label: 'Varanasi Ghats',      emoji: '🛕', query: 'Varanasi for 4 days' },
  { label: 'Jaipur Pink City',    emoji: '🏰', query: 'Jaipur this Friday' },
  { label: 'Goa beach escape',    emoji: '🏖', query: 'Goa next week' },
  { label: 'Rome ancient walk',   emoji: '🏛', query: 'Rome next week' },
  { label: 'Tokyo with my dog',   emoji: '🐕', query: 'Tokyo with my dog, next month' },
  { label: 'Paris for a week',    emoji: '🥐', query: 'Paris for a week' },
];

// SCOPE_CHIPS is now derived dynamically in views.jsx from state.destination
// + state.brief?.scope. Kept here as fallback only.
const SCOPE_CHIPS = ['destination', 'airport', 'transit', 'neighborhoods', '50 km radius'];

// LAYERS captions — city-agnostic, absurdist, calm. The bureau is universal.
const LAYERS = [
  {
    id: 'A', name: 'Advisories',  sub: 'Embassies, ministries, the dull but reliable',
    captions: [
      'queued',
      "Walking into the embassy. Asking for the manager.",
      "On hold with the foreign ministry. Their muzak is fine actually.",
      "Cross-referenced three government advisories.",
      "Checked the consulate page. Two updates this week.",
      "Advisories logged. None mention us specifically.",
    ],
  },
  {
    id: 'B', name: 'Local news',  sub: 'Local outlets, fresh off the press',
    captions: [
      'queued',
      "Reading the local paper over an espresso.",
      "Front page: a cat got stuck. Not relevant.",
      "Two outlets contradict each other. Investigating which one's wrong.",
      "Headline scanner online. Filtering panic from news.",
      "Stories filed. Nothing alarming.",
    ],
  },
  {
    id: 'C', name: 'Social vibe', sub: 'Reddit threads, Telegram channels, group chats',
    captions: [
      'queued',
      "Skimming Reddit so you don't have to.",
      "One taxi rant. One food rave. Vibes balanced.",
      "Snuck into a local Telegram channel. Mostly memes.",
      "WhatsApp groups (the ones we're not invited to) — calm.",
      "Vibe: stable. Drama mentions: contained.",
    ],
  },
  {
    id: 'D', name: 'Weather',     sub: 'Two forecasts, one trust, one backup',
    captions: [
      'queued',
      "Squinting at the sky.",
      "Two weather services disagree by 1°. Averaging.",
      "Negotiating with the cloud cover. They're cooperative.",
      "Forecast logged. Bring water, maybe a light shell.",
      "Sunscreen advisory issued (always).",
    ],
  },
  {
    id: 'E', name: 'Events',      sub: 'Holidays, concerts, strikes, mass services',
    captions: [
      'queued',
      "Cross-checking the calendar.",
      "Three events land in your window. Two are good.",
      "One transit strike logged. Plannable.",
      "Stopped to help a kitten cross the street. Back in 30s.",
      "Calendar synced. No surprises.",
    ],
  },
];

// FUN_FACTS — the rotating goose progress line. Mix of serious, funny, absurdist.
// Bigger font + faster rotation gives the loading screen personality.
const FUN_FACTS = [
  "Visited 47 sources so you didn't have to.",
  "Saved you about 2.3 hours of doomscrolling.",
  "Zero hallucinated URLs. Every link tested.",
  "Cross-checked 4 languages. Translated 2 of them badly on purpose.",
  "Read 11 Reddit threads and one Telegram cat channel.",
  "Politely declined an espresso from the embassy goose.",
  "Two pigeons asked for directions. I gave them.",
  "Filed a complaint with the cloud federation. Pending.",
  "Filtered out 8 panic headlines disguised as news.",
  "Spoke to a local goose who said 'all is well, mostly'.",
  "Negotiated airspace clearance with three air-traffic seagulls.",
  "Investigated 200 thread comments. Found 4 useful ones.",
  "Bribed a customs cormorant with a single sardine. Worth it.",
  "Reviewed 6 menus to confirm: yes, you can find vegetarian options.",
  "Detoured around a pelican parliament arguing about fish prices.",
  "Studied the local pigeon dialect. They're optimistic this week.",
  "Counted ambient anxiety levels. They're below average. Good week.",
  "Bypassed three news outlets known to exaggerate. You're welcome.",
  "Convinced a tour guide to share which tourist trap to skip.",
  "Asked the moon for weather predictions. The moon said 'fine'.",
  "Audited 38 restaurant reviews. Most were written by their owners.",
  "Spoke to one elderly resident who said 'it's always been this way'.",
  "Mailed a postcard ahead of you. Just because.",
  "Cleared a pigeon roadblock outside the train station.",
  "Forwarded one suspicious headline straight to the bin.",
  "Checked if the city has changed since last year. Mostly no.",
  "Verified that the goose bureau is, in fact, working all flight.",
  "Surveyed 14 transit gripes. 12 are about Mondays.",
  "Quietly observed a flock of tourists. They survived.",
  "Read the local subreddit. Drama level: 3/10. Acceptable.",
  "Goose investigation bureau status: caffeinated, functional, calm.",
];

// Bragging-rights trivia for the end of every brief — surprising, dinner-party-grade
const TRIVIA = {
  default: [
    { emoji: '💰', label: "The Trevi Fountain collects about €1.4 million in coins every year — every cent is donated to Caritas to fund a supermarket for the city's poor.",
      tag: 'fact 01' },
    { emoji: '📮', label: "Vatican City has its own postal service that's so reliable that Romans drive across town to mail letters from there. Italian post arrives 3-7 days slower.",
      tag: 'fact 02' },
    { emoji: '🐈', label: "Rome's stray cats are protected as a 'bio-cultural heritage' by city law since 1991. You can't shoo them off the Colosseum floor.",
      tag: 'fact 03' },
    { emoji: '🏛', label: "There's a pyramid in Rome. The Pyramid of Cestius was built around 12 BCE, before most of the emperors you've heard of were born.",
      tag: 'fact 04' },
  ],
  ruiner: [
    { emoji: '⚰', label: "The Capuchin Crypt on Via Veneto is decorated with the bones of 3,700 monks arranged as chandeliers. A sign reads, in five languages, 'what you are now, we used to be.'",
      tag: 'fact 01' },
    { emoji: '🏬', label: "Piazzale Loreto, where Mussolini's body was strung up by his feet in 1945, is today a corner with a Subway, an Apple Store, and a McDonald's. Italians heal through retail.",
      tag: 'fact 02' },
    { emoji: '🦅', label: "Rome's seagulls have learned to flock around tourists at the Ponte Sisto at dusk. They will steal a slice of pizza from your hand. Locals carry a stick.",
      tag: 'fact 03' },
    { emoji: '🌧', label: "The Pantheon's oculus has been open to the sky since 126 AD. It rains inside. The original Roman floor drains still work, 1,900 years later.",
      tag: 'fact 04' },
  ],
};

// ── GREEN SCENARIO (default — Rome, mild caveats) ────────────────────────────
const CLUSTERS_HAPPENING = [
  {
    id: 'c1',
    title: 'Transit strike scheduled Thursday 20 Jun',
    interpretation:
      "ATAC and Cotral have called an 8.5-hour strike on Thursday — buses, metro, tram. Service runs during morning rush (until 08:30) and evening rush (17:00–20:00) only. Skip airport runs in the strike window or pre-book a private transfer. The goose walked the route; it's walkable.",
    confidence: 'very_high',
    needs_disclaimer: false,
    layer_diversity: 4,
    sources: [
      { publisher: 'ANSA', title: 'Sciopero trasporti 20 giugno: orari garantiti', date: 'Jun 18', fav: 'AN' },
      { publisher: 'Comune di Roma', title: 'Avviso sciopero — Linee ATAC', date: 'Jun 17', fav: 'CR' },
      { publisher: 'La Repubblica', title: 'Roma, mezzi a singhiozzo giovedì', date: 'Jun 18', fav: 'LR' },
      { publisher: 'Il Messaggero', title: 'Strike: cosa sapere', date: 'Jun 17', fav: 'IM' },
    ],
  },
  {
    id: 'c2',
    title: 'Heat advisory days 3 & 4 — 29 °C peak',
    interpretation:
      "Mid-trip warm spell — Wednesday and Thursday peak at 29 °C with low humidity. Not extreme by Rome standards, but plan outdoor walking before 11:00 or after 17:00. Carry water. Cobblestones get hot — consider the dog (or the kids, or yourself).",
    confidence: 'high',
    needs_disclaimer: false,
    layer_diversity: 3,
    sources: [
      { publisher: 'Meteo.it', title: 'Previsioni Roma 7 giorni', date: 'Jun 18', fav: 'MI' },
      { publisher: 'Aeronautica Militare', title: 'Bollettino meteorologico', date: 'Jun 18', fav: 'AM' },
      { publisher: 'AccuWeather', title: 'Rome 14-day forecast', date: 'Jun 18', fav: 'AW' },
    ],
  },
  {
    id: 'c3',
    title: 'Vatican Wednesday audience confirmed',
    interpretation:
      "Papal General Audience confirmed for Wednesday 19 Jun, 09:00 in St. Peter's Square. Free tickets via the Prefecture of the Papal Household. Expect a heavier crowd around Borgo Pio in the morning — the goose got there at 08:15 and saw fine.",
    confidence: 'high',
    needs_disclaimer: false,
    layer_diversity: 2,
    sources: [
      { publisher: 'Vatican News', title: 'Udienza generale del 19 giugno', date: 'Jun 17', fav: 'VN' },
      { publisher: 'Holy See Press Office', title: 'Weekly schedule', date: 'Jun 16', fav: 'HS' },
    ],
  },
];

const CLUSTERS_WATCH = [
  {
    id: 'c4',
    title: 'Possible taxi shortage Friday evening',
    interpretation:
      "Two Reddit threads flag long taxi waits Friday around 18:00 because of a Stadio Olimpico event. Single-layer signal — treat as soft, not a fact. The goose is mildly suspicious but admits he hasn't seen the venue's schedule himself.",
    confidence: 'low',
    needs_disclaimer: true,
    layer_diversity: 1,
    sources: [
      { publisher: 'r/rome', title: 'Taxi situation Friday?', date: 'Jun 17', fav: 'RD' },
    ],
  },
  {
    id: 'c5',
    title: 'Trastevere construction noise weekday mornings',
    interpretation:
      "Resurfacing on Via della Lungaretta runs weekday mornings 07:00–11:00 through the end of the month. Light disruption to walking routes near Piazza Trilussa. The goose recommends Via dei Genovesi as an alternate.",
    confidence: 'medium',
    needs_disclaimer: false,
    layer_diversity: 2,
    sources: [
      { publisher: 'Comune di Roma', title: 'Cantieri stradali — Municipio I', date: 'Jun 10', fav: 'CR' },
      { publisher: 'Trastevere News', title: 'Lavori in Via della Lungaretta', date: 'Jun 12', fav: 'TN' },
    ],
  },
];

const CLUSTERS_WORTH = [
  {
    id: 'c6',
    title: 'Festa della Musica — Saturday 21 Jun',
    interpretation:
      "Annual citywide music festival turns piazzas into free open-air concerts from late afternoon into the night. Centro Storico and Testaccio are the most active zones. The goose strongly recommends Piazza dei Mercanti around 21:00.",
    confidence: 'very_high',
    needs_disclaimer: false,
    layer_diversity: 3,
    sources: [
      { publisher: 'Turismo Roma', title: 'Festa della Musica 2026', date: 'Jun 5', fav: 'TR' },
      { publisher: 'RomaToday', title: 'Gli eventi del 21 giugno', date: 'Jun 15', fav: 'RT' },
      { publisher: 'Comune di Roma', title: 'Programma ufficiale', date: 'Jun 10', fav: 'CR' },
    ],
  },
  {
    id: 'c7',
    title: 'Negroni-shaped etiquette note',
    interpretation:
      "Aperitivo in Trastevere usually starts around 18:30 with a small snack included. Tipping is appreciated but not expected — round up the bill instead of doing percentages. Order a Negroni Sbagliato and you'll fit in instantly.",
    confidence: 'medium',
    needs_disclaimer: true,
    layer_diversity: 1,
    sources: [
      { publisher: 'Eater Rome', title: 'Aperitivo guide', date: 'Apr 22', fav: 'ER' },
    ],
  },
];

// ── RUINER SCENARIO — "Goose, talk me OUT of this." ─────────────────────────
// Used when user clicks the "Convince me NOT to go" card. The clusters get
// darker but every claim is still source-bound; tone stays calm, never sirens.

const RUINER_CLUSTERS_HAPPENING = [
  {
    id: 'r1',
    title: 'M 5.1 earthquake 90 km offshore, three aftershocks',
    interpretation:
      "Two government seismic agencies confirm an M 5.1 quake 90 km north-west, plus three aftershocks ≥ M 3 in the last 36 hours. No structural damage in central Rome itself, but the swarm pattern is non-trivial. The goose would re-check the day before flying.",
    confidence: 'very_high',
    needs_disclaimer: false,
    layer_diversity: 3,
    sources: [
      { publisher: 'INGV', title: 'Sequenza sismica — bollettino', date: 'Jun 18', fav: 'IN' },
      { publisher: 'USGS', title: 'M 5.1 — Tyrrhenian Sea', date: 'Jun 17', fav: 'US' },
      { publisher: 'Protezione Civile', title: 'Allerta gialla settori 5–7', date: 'Jun 18', fav: 'PC' },
    ],
  },
  {
    id: 'r2',
    title: 'Three-day general strike — air + rail + metro',
    interpretation:
      "Confederation of Italian transit unions announced a three-day general strike running Mon–Wed of your trip. Fiumicino and Ciampino expect ~60% cancellations on day one. Trenitalia advisories already published. This stacks with the existing Thursday metro strike.",
    confidence: 'very_high',
    needs_disclaimer: false,
    layer_diversity: 4,
    sources: [
      { publisher: 'Trenitalia', title: 'Sciopero nazionale 24–26', date: 'Jun 17', fav: 'TN' },
      { publisher: 'CGIL', title: 'Comunicato unitario', date: 'Jun 16', fav: 'CG' },
      { publisher: 'ANSA', title: 'Tre giorni di sciopero generale', date: 'Jun 17', fav: 'AN' },
      { publisher: 'Reuters', title: 'Italy nationwide transit strike', date: 'Jun 18', fav: 'RT' },
    ],
  },
  {
    id: 'r3',
    title: 'Spike in expat-targeted phone scams in EUR district',
    interpretation:
      "Local police bulletin and two Italian outlets describe a recent uptick in phone-based scams targeting foreigners in the EUR district — fake-courier money requests, mostly. Small money loss, big anxiety. Block unknown Italian numbers. Goose hates this trend.",
    confidence: 'high',
    needs_disclaimer: false,
    layer_diversity: 3,
    sources: [
      { publisher: 'Polizia di Stato', title: 'Truffe agli stranieri — EUR', date: 'Jun 14', fav: 'PS' },
      { publisher: 'Corriere della Sera', title: 'Truffe ai turisti, +40%', date: 'Jun 15', fav: 'CD' },
      { publisher: 'Il Fatto Quotidiano', title: 'Schema della truffa', date: 'Jun 12', fav: 'IF' },
    ],
  },
  {
    id: 'r4',
    title: 'Crypto entrepreneur abduction case in central Rome',
    interpretation:
      "Polizia di Stato confirmed a kidnapping case earlier this week — a foreign crypto founder taken near Piazza Navona, released within 18 hours. Two outlets corroborated. Statistically isolated, but the goose flags it because the victim profile matches a known pattern.",
    confidence: 'high',
    needs_disclaimer: false,
    layer_diversity: 3,
    sources: [
      { publisher: 'Polizia di Stato', title: 'Comunicato n. 184', date: 'Jun 15', fav: 'PS' },
      { publisher: 'Il Messaggero', title: 'Imprenditore rapito a Roma', date: 'Jun 15', fav: 'IM' },
      { publisher: 'Bloomberg', title: 'Crypto founder kidnapping wave', date: 'Jun 13', fav: 'BB' },
    ],
  },
];

const RUINER_CLUSTERS_WATCH = [
  {
    id: 'r5',
    title: 'Heatwave forecast revised upward — 36 °C peak',
    interpretation:
      "Two weather services revised the forecast up by 4–6 °C for Wed–Fri of your trip — three days at 33–36 °C. Not extreme by global standards, but Rome's cobblestone heat amplifies it. Health ministry will likely issue a yellow advisory.",
    confidence: 'medium',
    needs_disclaimer: false,
    layer_diversity: 2,
    sources: [
      { publisher: 'Meteo.it', title: 'Anticiclone africano in arrivo', date: 'Jun 18', fav: 'MI' },
      { publisher: 'Aeronautica Militare', title: 'Bollettino caldo settori 6–8', date: 'Jun 18', fav: 'AM' },
    ],
  },
  {
    id: 'r6',
    title: 'Protests planned around Piazza del Popolo',
    interpretation:
      "Three protest assemblies announced for Saturday afternoon. Police plan rerouting around the Tridente. Not violent historically — but if you wanted a calm aperitivo around Babington's, pick a different day.",
    confidence: 'medium',
    needs_disclaimer: false,
    layer_diversity: 2,
    sources: [
      { publisher: 'Questura di Roma', title: 'Avviso pubblico ordine sabato', date: 'Jun 17', fav: 'QR' },
      { publisher: 'Roma Today', title: 'Tre cortei sabato pomeriggio', date: 'Jun 17', fav: 'RT' },
    ],
  },
];

const RUINER_CLUSTERS_WORTH = [
  {
    id: 'r7',
    title: 'Travel insurance coverage gap: civil unrest clause',
    interpretation:
      "Two major travel insurers excluded civil unrest from standard plans starting January. Goose verified with two policy PDFs. If you're going, top up with a supplement now (€18 / week for the standard tier).",
    confidence: 'high',
    needs_disclaimer: false,
    layer_diversity: 2,
    sources: [
      { publisher: 'AXA', title: 'Travel Policy 2026 v3', date: 'Jan 12', fav: 'AX' },
      { publisher: 'Allianz', title: 'Exclusion update memo', date: 'Feb 4', fav: 'AL' },
    ],
  },
];

// Don't-Go banner sources (used in ruiner scenario)
const RUINER_DONTGO_SOURCES = [
  { flag: '🇺🇸', label: 'US State Dept · Level 3 reissued' },
  { flag: '🇬🇧', label: 'UK FCDO · advise against non-essential' },
  { flag: '🇨🇦', label: 'GAC · regional warning extended' },
  { flag: '🇦🇺', label: 'Smartraveller · reconsider need' },
];

const HISTORY = [
  { id: 'h1', dest: 'Rome',       when: 'Jun 18 – 25',     created: 'today',         voice: 'Jarvis',     outfit: 'jarvis',     verdict: 'go',      teaser: "No blockers. One transit caveat (Thu)." },
  { id: 'h2', dest: 'Bangkok',    when: 'May 23 – 30',     created: '2 days ago',    voice: 'Bro',        outfit: 'bro',        verdict: 'go',      teaser: "Hot but workable. Tuk-tuk vibes confirmed." },
  { id: 'h3', dest: 'Lisbon',     when: 'Apr 14 – 21',     created: 'last month',    voice: 'Bestie',     outfit: 'bestie',     verdict: 'go',      teaser: "Babe, it was perfect, you know." },
  { id: 'h4', dest: 'Marrakech',  when: 'Oct 3 – 12',      created: 'Apr 19',        voice: 'Family',     outfit: 'family',     verdict: 'caution', teaser: "Re-run a week out — sandstorm pattern is shifting." },
  { id: 'h5', dest: 'Reykjavík',  when: 'Feb 9 – 15',      created: 'Jan 30',        voice: 'Pet Parent', outfit: 'petparent',  verdict: 'go',      teaser: "Pup-tested. Pup-approved. Bring booties." },
  { id: 'h6', dest: 'Cairo',      when: 'Nov 4 – 11',      created: "Oct 22 '25",    voice: 'Jarvis',     outfit: 'jarvis',     verdict: 'reread',  teaser: "Conditions shifted since. Re-run recommended." },
];



export {
  VOICES, DEMO_CHIPS, SCOPE_CHIPS, LAYERS, FUN_FACTS, TRIVIA,
  CLUSTERS_HAPPENING, CLUSTERS_WATCH, CLUSTERS_WORTH,
  RUINER_CLUSTERS_HAPPENING, RUINER_CLUSTERS_WATCH, RUINER_CLUSTERS_WORTH,
  RUINER_DONTGO_SOURCES,
  HISTORY,
};

if (typeof window !== "undefined") {
  Object.assign(window, {
    VOICES, DEMO_CHIPS, SCOPE_CHIPS, LAYERS, FUN_FACTS, TRIVIA,
    CLUSTERS_HAPPENING, CLUSTERS_WATCH, CLUSTERS_WORTH,
    RUINER_CLUSTERS_HAPPENING, RUINER_CLUSTERS_WATCH, RUINER_CLUSTERS_WORTH,
    RUINER_DONTGO_SOURCES,
    HISTORY,
  });
}
