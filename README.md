# 🪿 Anxious Traveller

**Let the goose plan your trip.**

Anxious Traveller is a pre-trip briefing app for people who worry before they travel. You type where you're going, and a friendly pixel goose "investigates" the destination. It then gives you one calm, easy-to-read brief: weather, UV, budget, places to see, where to eat, local news and practical tips. You don't have to open twenty tabs to get there.

---

## ✨ What it does

- **Ask about any destination.** Type a city (e.g. "Rome next week", "Jaipur", "Paris").
- **Watch the goose investigate.** A loading screen shows the goose checking 5 "signal layers":
  1. **Advisories**: embassy and official travel notices
  2. **Local News**: regional press and civic updates
  3. **Social Vibe**: Reddit and local chatter
  4. **Weather**: forecast and UV
  5. **Events & Transit**: strikes, closures, happenings
- **Get one brief.** A single page with:
  - Weather, UV advice and rain odds
  - Daily budget (low / mid / high) with money tips
  - 4 must-see places and 3 famous food spots
  - What's happening locally, plus a "do now" checklist
- **Pick a voice.** The brief is written in the personality you choose:

  | Voice | Style |
  |---|---|
  | 🤖 Jarvis | calm, precise AI butler |
  | 💪 Bro | hyped, supportive best friend |
  | 💅 Bestie | excited, gossipy best friend |
  | 👨‍👩‍👧 Family | warm, protective parent |
  | 🐶 Pet Parent | travelling with a furry companion |
  | ☠️ Don't Go ("Ruiner") | a funny doomsayer who insists the trip is a bad idea |

- **English / Hindi** language toggle.

---

## 🔄 How it works (the flow)

```
 ┌──────────────┐    1. type a city     ┌──────────────────┐
 │  Landing     │ ────────────────────▶ │  Loading screen  │
 │  page        │    + pick a voice     │  (goose checks   │
 └──────────────┘                       │   5 layers)      │
                                        └────────┬─────────┘
                                                 │ 2. POST /api/brief
                                                 ▼
                                        ┌──────────────────┐
                                        │  Backend server  │
                                        │  (Express)       │
                                        └────────┬─────────┘
                       ┌─────────────────────────┼──────────────────────────┐
                       ▼                         ▼                          ▼
              Demo city?                 Any other city?            Server down / no key?
     (Rome, New York, Tokyo,          Ask Llama to write a          Frontend builds a brief
      Reykjavik, Bangkok, Cairo)      brief as JSON, in the         locally from built-in
      Load a ready-made brief         chosen voice                  destination profiles
      from server/demo-briefs/
                       └─────────────────────────┼──────────────────────────┘
                                                 │ 3. frontend polls
                                                 │    GET /api/brief/:id
                                                 ▼
                                        ┌──────────────────┐
                                        │   Brief page     │
                                        │  (final report)  │
                                        └──────────────────┘
```

**Step by step:**

1. **Landing:** the user enters a destination and picks a voice (or presses the "Ruiner" button for the *Don't Go* voice).
2. **Request:** the frontend sends `POST /api/brief` with `{ destination, voice }` and gets back a `result_id`.
3. **Backend decides how to answer:**
   - **Demo cities** (Rome, New York, Tokyo, Reykjavik, Bangkok, Cairo) return a pre-written brief right away. Each demo city is tied to one voice.
   - **Any other city:** the server asks Llama for a structured JSON brief, then shapes it into the format the UI needs.
4. **Polling:** the loading screen calls `GET /api/brief/:id` every few seconds until the status is `complete`.
5. **Brief:** the result is shown as a readable report.
6. **Fallback:** if the server isn't running or no API key is set, the frontend builds a brief itself. The app always shows a result, even offline.

---

## 🧱 Tech stack

| Part | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, lucide-react icons, marked (Markdown) |
| Backend | Node.js, Express |
| AI | Llama via the Meta Model API (or any OpenAI-compatible endpoint, e.g. Fireworks, Baseten) |

---

## 📁 Project structure

```
anxious-traveller/
├── index.html               # App entry HTML
├── src/
│   ├── main.jsx             # Mounts the React app
│   ├── App.jsx              # App shell: routing, state, brief request flow
│   ├── components/
│   │   ├── views.jsx        # Pages: Landing, Loading, Brief, Settings, History, Auth
│   │   ├── geese.jsx        # Pixel goose characters
│   │   ├── theatre.jsx      # "Investigation" animation on the loading screen
│   │   ├── ExecutiveBrief.jsx
│   │   └── tweaks-panel.jsx # Dev panel to switch voice, viewport, etc.
│   ├── data/
│   │   ├── bureauData.js    # Voices and their text
│   │   ├── destinations.js  # Local fallback brief generator
│   │   ├── layers.js        # The 5 investigation layers
│   │   ├── translations.js  # English / Hindi strings
│   │   └── voices.js
│   └── styles/bureau.css
├── vercel.json              # Vercel deployment config (frontend + API services)
└── server/
    ├── index.js             # Express API + Llama integration
    ├── demo-briefs/         # Ready-made briefs for the 6 demo cities
    └── .env.example         # Template for your API settings
```

---

## 🚀 Getting started

### 1. Install dependencies

```bash
npm install
cd server && npm install && cd ..
```

### 2. (Optional) Turn on live Llama briefs

Without this step the app still works: demo cities and the local fallback cover you.

```bash
cp server/.env.example server/.env
```

Then fill in `server/.env`:

```env
LLM_API_KEY=your_key_here
LLM_BASE_URL=https://api.fireworks.ai/inference/v1     # or your Meta Model API URL
LLM_MODEL=accounts/fireworks/models/llama-v3p3-70b-instruct
```

> ⚠️ Never commit `server/.env`. It's already in `.gitignore`.

### 3. Run it

```bash
npm start
```

This starts both:
- the **frontend** at http://localhost:5173
- the **backend** at http://localhost:3005 (Vite forwards `/api` calls to it)

Open http://localhost:5173 and try **"Rome"** (demo) or any city like **"Jaipur"** (live Llama).

Other scripts:

| Command | What it does |
|---|---|
| `npm run dev` | Frontend only |
| `npm run server` | Backend only |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |

---

## 🔌 API reference

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/brief` | Start a brief. Body: `{ "destination": "Rome", "voice": "bro" }`. Returns `{ "result_id": "..." }` |
| `GET` | `/api/brief/:id` | Get a brief's status (`pending` / `complete` / `failed`) and content |

If no Llama key is configured, `POST /api/brief` returns `503 llm_not_configured` for non-demo cities, and the frontend switches to its local fallback.

---



