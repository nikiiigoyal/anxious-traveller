# Anxious Traveller — Pixel-Goose Pre-Trip Bureau
## Private Architecture Guide & Meta Hackathon Documentation

This document explains the entire design, flow, visual systems (including the bottom animated train), and an exhaustive package-by-package inventory explaining **what** is installed and **why** each dependency is used.

---

## 1. Project Concept (Meta Hackathon)

**Anxious Traveller** is a pre-trip intelligence bureau led by pixel geese designed to combat pre-travel anxiety. 

Instead of travelers spending 3–6 hours frantically doomscrolling disjointed forums, weather radars, consular advisories, and transit strike reports, the bureau synthesizes verified travel intelligence across **5 Signal Layers**:
1. **Layer A — Advisories**: Consular bulletins, embassy advisories, travel rules.
2. **Layer B — Local News**: City gazettes, local municipal updates, transit authority notices.
3. **Layer C — Social Vibe**: Community chatter, sentiment tracking, ambient anxiety checks.
4. **Layer D — Weather**: UV indices, midday cobblestone heat, precipitation envelopes.
5. **Layer E — Events & Logistics**: Rail strikes, museum closures, concerts, public holidays.

The brief is delivered through distinct investigator voices:
- **Bro**: Relaxed, slang-inflected, calming, anti-spiral.
- **Jarvis**: Concise, analytical, AI-coded operational status.
- **Bestie**: Warm, reassuring, gossipy, aesthetic recommendations.
- **Pet Parent**: Pup-safe lens (carrier regulations, cobblestone heat warnings).
- **Family**: Kid-friendly, stroller logistics, snack strategies.
- **Goose Snob ("Talk me out of going")**: Devil's advocate reality check showing every pitfall, strike, and price surge.

---

## 2. Visual Systems & The Running Train Feature

The application features an ambient, multi-layered retro-pixel world:

1. **Ambient World (Top)**:
   - Soft sky gradient.
   - Drifting pixel clouds (`SkyClouds`).
   - Dot-matrix world map (`WorldMap`).
   - Twin pixel airliners drifting across the sky (`Plane`).

2. **The Ground Band (Bottom Animated Train & Countryside)**:
   - **Chunky Pixel Train (`Train`)**: Red locomotive engine with 3 cream passenger cars running continuously across pixelated railway tracks (`.train-pixel` on `.rails-svg`) using infinite CSS animation (`@keyframes train-roll`).
   - **Camper Van & School Bus (`Camper`, `SchoolBus`)**: Classic pixel vehicles.
   - **Countryside Meadow**: Animated grass tufts swaying in the wind (`tuft-sway`).
   - **Grazing Livestock**: Holstein cows and fluffy sheep grazing with head-bob animations (`animal-graze`).
   - **Landmark Horizon**: Pixel silhouettes of city landmarks (Eiffel Tower, Colosseum, etc.).

3. **Investigation Theatre (Loading Screen)**:
   - 12 distinct absurdist investigation scenes (Embassy corridor, newsstand espresso, pigeon interviews, cloud negotiations) cycling with real-time layer telemetry updates and a live counter of "hours of doomscrolling saved".

4. **Executive Dossier (Brief View)**:
   - Section 01: Quick read (weather, UV safety advisory, daily budget, do-now list).
   - Section 02: What's happening (news, transit strikes, events, concerts).
   - Section 03: What to watch (timed-entry spots, quiet viewpoints, free walks).
   - Section 04: Places to eat (Michelin Guide / Bib Gourmand local gems).
   - Section 05: Worth knowing (taxis vs apps, coffee customs, tipping, water fountains).
   - Section 06: Budget breakdown (low / mid / high estimates).
   - Section 07: Verified clickable sources with active scroll-to-source highlighting.

5. **Language Translation & Switching (English / हिन्दी)**:
   - Retro pixel toggle button `[ EN | हिन्दी ]` seamlessly integrated into the navigation top bar.
   - Comprehensive translations across all views: navigation items, hero headline ("हंस को अपनी यात्रा की योजना बनाने दें।"), lede, purpose of trip chips ("रोमांटिक यात्रा", "पारिवारिक यात्रा", "काम / व्यवसाय", आदि), persona cards (भाई, जार्विस, बेस्टी, पेट पेरेंट, परिवार), and Goose Snob mode.
   - Localized executive brief sections with Hindi translations for weather, UV advisories, transit strikes, dining spots, and cultural customs (`getLocalizedBrief`).

---

## 3. Package Inventory & Why Each Is Installed

| Package | Purpose & Why It Is Installed |
| :--- | :--- |
| **`react`** (`^18.3.1`) | The core UI framework. Manages reactive component state across the Landing hero, Loading Theatre, Brief views, Settings, History, and Auth. |
| **`react-dom`** (`^18.3.1`) | Renders and mounts React components directly into the DOM (`#root`). |
| **`marked`** (`^12.0.2`) | Ultra-fast markdown parser. The brief sections (weather, news, dining, tips) are stored in clean Markdown with bolding, lists, and inline links `[src N]`. `marked` parses them safely into HTML. |
| **`vite`** (`^6.1.0`) | High-speed frontend dev server and production bundler. Delivers instant Hot Module Replacement (HMR) and compiles all pixel artwork and SVGs with zero lag. |
| **`@vitejs/plugin-react`** (`^4.3.4`) | Vite plugin providing fast JSX compilation and React Fast Refresh. |
| **`tailwindcss`** (`^3.4.17`) & **`postcss`** | Utility styling engine supporting custom pixel font variables and responsive grids alongside the bureau design system. |
| **`express`** (`^4.21.2`) | Lightweight Node.js server in `server/index.js` providing `/api/brief` endpoints to serve the bureau dossiers. |
| **`cors`** (`^2.8.5`) | Middleware allowing the Vite client (`http://localhost:5173`) to make API requests to the server without cross-origin blocking. |
| **`concurrently`** (`^9.1.2`) | Utility in root `package.json` enabling `npm start` to run both the frontend and backend with a single command. |

---

## 4. How the Application Runs

### Development Mode
```bash
# Starts both Express backend (port 3001) and Vite frontend (port 5173)
npm start
```
- Open [http://localhost:5173](http://localhost:5173) to see the full application.

### Resilient Architecture
The app is built to be 100% resilient for hackathon presentations:
- All 6 demo cities (`Rome`, `New York`, `Tokyo`, `Reykjavik`, `Bangkok`, `Cairo`) have pre-compiled briefs in `public/demo-briefs/`.
- If the backend is running, `/api/brief` serves the requested city and voice.
- If running frontend-only (`npm run dev`), the client automatically falls back to the local demo briefs so presentations never stall or fail.
- When you are ready to connect a Meta AI model (e.g. Llama 3 via Meta AI / Ollama / Groq / HuggingFace), simply wire it into `server/index.js` under `POST /api/brief`.
