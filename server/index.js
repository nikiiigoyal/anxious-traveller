import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

const DEMO_BRIEFS_DIR = path.resolve(__dirname, '../public/demo-briefs');

// City to demo brief file mapping
const CITY_MAP = {
  rome: 'rome.json',
  'new york': 'new_york.json',
  newyork: 'new_york.json',
  nyc: 'new_york.json',
  tokyo: 'tokyo.json',
  reykjavik: 'reykjavik.json',
  bangkok: 'bangkok.json',
  cairo: 'cairo.json',
};

// In-memory store for briefs
const activeBriefs = new Map();

// ─────────────────────────────────────────────────────────────
// Llama live-brief generation
// Works with the Meta Model API or any OpenAI-compatible endpoint
// (Fireworks, Baseten, …). Configure via server/.env:
//   LLM_API_KEY, LLM_BASE_URL, LLM_MODEL
// ─────────────────────────────────────────────────────────────
const LLM_API_KEY = process.env.LLM_API_KEY || '';
const LLM_BASE_URL = (process.env.LLM_BASE_URL || '').replace(/\/+$/, '');
const LLM_MODEL = process.env.LLM_MODEL || '';

const llmConfigured = () => Boolean(LLM_API_KEY && LLM_BASE_URL && LLM_MODEL);

// Known-good Unsplash photo pool used to illustrate AI-generated place cards
const IMAGE_POOL = [
  'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80',
];
const BADGE_COLORS = ['#E8A437', '#10B981', '#3B82F6', '#8B5CF6'];

const VOICE_STYLES = {
  jarvis: 'a calm, precise, slightly formal AI butler',
  bro: 'a hyped, supportive gym-bro best friend',
  bestie: 'an excited, gossiping best friend',
  family: 'a warm, protective parent planning for kids',
  pet_parent: 'a doting pet parent travelling with a furry companion',
  dont_go: 'a hilariously pessimistic doomsayer who insists this trip is a terrible idea',
};

async function callLlama(destination, voice) {
  const persona = VOICE_STYLES[voice] || VOICE_STYLES.bro;
  const system = [
    'You are the Anxious Traveller pre-trip bureau — a travel analyst writing',
    `in the voice of ${persona}. Reply with a single JSON object only (no markdown, no prose)`,
    'with EXACTLY these keys:',
    '{ "destination": string (properly capitalized),',
    '  "vibe": { "status": short string, "badge": short string, "intro": "1-2 sentence in-voice overview" },',
    '  "weather": { "temp": "29°C", "high": "32°C", "low": "18°C", "condition": short string,',
    '               "icon": "single weather emoji", "uv": "7 (High)", "uvAdvice": short practical advice, "rainOdds": "10%" },',
    '  "budget": { "avgDaily": "local currency with $ equivalent (₹ for India)", "low": string, "mid": string,',
    '              "high": string, "note": "one practical money tip" },',
    '  "places": [ exactly 4 REAL famous sights at this destination, each',
    '              { "name", "tag": "2-3 WORD UPPERCASE CATEGORY", "desc": "1-2 sentences", "badge": "Must Visit" } ],',
    '  "eats": [ exactly 3 REAL famous food spots, each',
    '            { "name", "dish": "the iconic dish to order", "price": "local price range", "tip": "short insider tip" } ],',
    '  "tips": [ 3-4 short practical local tips: transport, bookings, etiquette ] }',
    'Use realistic current-season weather. Real landmark and restaurant names only — never placeholders.',
  ].join(' ');

  const payload = {
    model: LLM_MODEL,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: `Create the pre-trip brief for: ${destination}` },
    ],
    temperature: 0.7,
    // High cap: Muse Spark spends reasoning tokens before content —
    // a low cap leaves zero tokens for the actual JSON output.
    max_tokens: 8000,
    response_format: { type: 'json_object' },
  };

  let res = await fetch(`${LLM_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LLM_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  // Some providers reject response_format — retry once without it
  if (res.status === 400) {
    delete payload.response_format;
    res = await fetch(`${LLM_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LLM_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });
  }

  if (!res.ok) {
    const body = (await res.text()).slice(0, 200);
    throw new Error(`LLM API ${res.status}: ${body}`);
  }
  const rawText = await res.text();
  console.log(`[llama] HTTP ${res.status}, response ${rawText.length} chars, head: ${rawText.slice(0, 150).replace(/\n/g, ' ')}`);
  const data = JSON.parse(rawText);
  let content = data.choices?.[0]?.message?.content || '';
  console.log(`[llama] content ${content.length} chars, finish: ${data.choices?.[0]?.finish_reason}`);
  // Tolerate models that wrap JSON in markdown fences
  content = content.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
  return JSON.parse(content);
}

// Maps raw Llama JSON onto the exact schema the brief UI renders
function normalizeLlmBrief(raw, destination, voice) {
  const w = raw.weather || {};
  const b = raw.budget || {};
  const vibe = raw.vibe || {};
  const places = Array.isArray(raw.places) ? raw.places.slice(0, 4) : [];
  const eats = Array.isArray(raw.eats) ? raw.eats.slice(0, 3) : [];
  const tips = Array.isArray(raw.tips) ? raw.tips : [];
  const name = raw.destination || destination;

  const placesWithImages = places.map((p, i) => ({
    name: p.name || `${name} Sight ${i + 1}`,
    tag: p.tag || 'LANDMARK',
    image: IMAGE_POOL[i % IMAGE_POOL.length],
    desc: p.desc || '',
    badge: p.badge || 'Worth Seeing',
    badgeColor: BADGE_COLORS[i % BADGE_COLORS.length],
  }));

  const famousEats = eats.map((e) => ({
    name: e.name || 'Local Favorite',
    dish: e.dish || 'Regional specialty',
    price: e.price || '$$',
    tip: e.tip || '',
  }));

  return {
    static_demo: true,
    ai_generated: true,
    destination: name,
    trip_window: 'Next 5–7 days',
    voice,
    dont_go: voice === 'dont_go',
    weather_stats: w,
    budget_stats: b,
    places_with_images: placesWithImages,
    famous_eats: famousEats,
    quick_read: {
      weather_md: `**Weather:** ${w.temp} (${w.condition}). High of ${w.high}, low of ${w.low}. Rain probability: ${w.rainOdds}.`,
      uv_md: `**UV Index:** ${w.uv}. ${w.uvAdvice || ''}`,
      uv_advisory_md: `*⚡ Generated live by Llama — Meta AI Developer Hackathon.*`,
      budget_hint_md: `**Daily budget:** ${b.avgDaily}. ${b.note || ''}`,
      intro_md: `> *${vibe.intro || ''}*`,
      do_now_md: tips.map((t) => `- ${t}`).join('\n'),
      restaurant_hook_md: `**Top food picks curated by Llama.** Real spots, iconic dishes, local prices.`,
    },
    happening: {
      news_md: `- **Civic & Transit Advisory:** Main tourist routes and transit operating normally.\n- **Entry Protocols:** Major sights open; pre-book popular slots online where available.\n- **Seasonal Conditions:** ${w.condition} — plan outdoor sights for mornings and late afternoons.`,
      entertainment_md: `- **Cultural Evenings:** Check local listings for evening ceremonies, markets and shows.\n- **Walking Tours:** Guided heritage walks run daily near the main sights.`,
    },
    watch_md: placesWithImages.map((p) => `- **${p.name}** — ${p.desc} *(${p.badge})*`).join('\n'),
    eat_md: famousEats.map((e) => `- **${e.name}** — ${e.dish} *(${e.price})*. ${e.tip}`).join('\n'),
    knowing_md: tips.map((t) => `- ${t}`).join('\n'),
    budget_usd: { daily_low: 45, daily_mid: 95, daily_high: 220, notes: b.note || '' },
    sources: [
      { label: 'Generated live by Llama — Meta AI Developer Hackathon', url: 'https://ai.meta.com' },
      { label: 'Local Tourism & Cultural Board', url: '#' },
      { label: 'Seasonal Meteorological Averages', url: '#' },
    ],
  };
}

// Fire-and-forget: fills activeBriefs[result_id] when done; polled via GET /api/brief/:id
async function generateBriefWithLlama(destination, voice, result_id) {
  try {
    console.log(`[llama] generating brief for "${destination}" (${voice})…`);
    const raw = await callLlama(destination, voice);
    const brief = normalizeLlmBrief(raw, destination, voice);
    activeBriefs.set(result_id, {
      status: 'complete',
      brief_id: result_id,
      query_id: result_id,
      voice,
      brief,
      audio_url: null,
      audio_source: 'llama-live',
      ai_generated: true,
      created_at: new Date().toISOString(),
    });
    console.log(`[llama] brief ready for "${destination}" (${result_id})`);
  } catch (e) {
    console.error(`[llama] generation failed for "${destination}":`, e.message);
    activeBriefs.set(result_id, {
      status: 'failed',
      error: String(e.message || e),
      voice,
      created_at: new Date().toISOString(),
    });
  }
}

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Anxious Traveller — Pixel-Goose Pre-Trip Bureau API',
    timestamp: new Date().toISOString(),
  });
});

/**
 * POST /api/brief
 * Starts a brief investigation and returns { result_id }
 */
app.post('/api/brief', (req, res) => {
  const { destination = 'Rome', voice = 'bro' } = req.body;
  const lowerDest = destination.toLowerCase();

  // Find matching city
  let matchedFile = null;
  let matchedCity = 'rome';
  for (const [key, file] of Object.entries(CITY_MAP)) {
    if (lowerDest.includes(key)) {
      matchedFile = file;
      matchedCity = key;
      break;
    }
  }

  // ── Any other city on Earth → live Llama generation ──────────
  if (!matchedFile) {
    if (!llmConfigured()) {
      // No key configured — tell the client to use its local fallback briefs
      return res.status(503).json({
        error: 'llm_not_configured',
        hint: 'Set LLM_API_KEY, LLM_BASE_URL and LLM_MODEL in server/.env',
      });
    }
    const result_id = `live-${voice}-${Date.now()}`;
    activeBriefs.set(result_id, {
      status: 'pending',
      brief_id: result_id,
      query_id: result_id,
      voice,
      created_at: new Date().toISOString(),
    });
    generateBriefWithLlama(destination, voice, result_id); // async; polled via GET
    return res.json({ result_id });
  }

  const result_id = `demo-${matchedCity.replace(/\s+/g, '-')}-${voice}-${Date.now()}`;

  let briefData = null;
  if (fs.existsSync(path.join(DEMO_BRIEFS_DIR, matchedFile))) {
    try {
      const raw = fs.readFileSync(path.join(DEMO_BRIEFS_DIR, matchedFile), 'utf8');
      briefData = JSON.parse(raw);
    } catch (e) {
      console.error('Error reading demo brief:', e);
    }
  }

  // Fallback if custom city or file not found
  if (!briefData) {
    const rawRome = fs.readFileSync(path.join(DEMO_BRIEFS_DIR, 'rome.json'), 'utf8');
    briefData = JSON.parse(rawRome);
    briefData.brief.destination = destination;
  }

  activeBriefs.set(result_id, {
    status: 'complete',
    brief_id: result_id,
    query_id: result_id,
    voice: briefData.voice || voice,
    brief: briefData.brief,
    audio_url: briefData.audio_url || null,
    audio_source: 'demo-static',
    audit_passed: true,
    fallback_used: false,
    created_at: new Date().toISOString(),
  });

  res.json({ result_id });
});

/**
 * GET /api/brief/:id
 * Polls status and content of the brief
 */
app.get('/api/brief/:id', (req, res) => {
  const { id } = req.params;
  const found = activeBriefs.get(id);

  if (!found) {
    // If not found in memory, check if ID starts with demo-
    const parts = id.split('-');
    const cityKey = parts[1]?.replace('_', ' ') || 'rome';
    const fileName = CITY_MAP[cityKey] || 'rome.json';
    const filePath = path.join(DEMO_BRIEFS_DIR, fileName);

    if (fs.existsSync(filePath)) {
      try {
        const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return res.json({
          status: 'complete',
          brief_id: id,
          query_id: id,
          voice: raw.voice || 'bro',
          brief: raw.brief,
          audio_url: raw.audio_url || null,
        });
      } catch (err) {
        // fallback
      }
    }
    return res.status(404).json({ error: 'Brief not found' });
  }

  res.json(found);
});

app.listen(PORT, () => {
  console.log(`[Anxious Traveller Bureau Server] Ready on http://localhost:${PORT}`);
});
