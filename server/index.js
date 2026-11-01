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

  const result_id = `demo-${matchedCity.replace(/\s+/g, '-')}-${voice}-${Date.now()}`;

  let briefData = null;
  if (matchedFile && fs.existsSync(path.join(DEMO_BRIEFS_DIR, matchedFile))) {
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
