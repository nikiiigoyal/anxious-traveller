import { TRANSLATIONS, HI_VOICE_OVERRIDES, getLocalizedBrief } from "../data/translations";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { marked } from "marked";
import {
  VOICES, DEMO_CHIPS, SCOPE_CHIPS, LAYERS, FUN_FACTS, TRIVIA,
  CLUSTERS_HAPPENING, CLUSTERS_WATCH, CLUSTERS_WORTH,
  RUINER_CLUSTERS_HAPPENING, RUINER_CLUSTERS_WATCH, RUINER_CLUSTERS_WORTH,
  RUINER_DONTGO_SOURCES,
  HISTORY,
} from "../data/bureauData";
import { PixelGoose, MiniGoose, GooseBubble, OUTFITS, Sparkle } from "./geese";
import { InvestigationTheatre } from "./theatre";
/* eslint-disable */
// Anxious Traveller — view components (v3)



// ============================================================
// AMBIENT WORLD BACKGROUND
// ============================================================
// Layered atmospheric backdrop:
//  - sky gradient at top (soft blue → cream)
//  - pixelated world map mid (very faint)
//  - planes drift across the sky (fixed, viewport-anchored)
//  - ground band + train + cars + houses render INSIDE the document
//    just above the footer (NOT fixed — they only appear at page bottom)

function WorldBackground() {
  return (
    <div className="world-bg" aria-hidden="true">
      <div className="sky-layer" />
      <SkyClouds />
      <WorldMap />
      <div className="transit-layer">
        <Plane className="plane p1" />
        <Plane className="plane p2" />
      </div>
    </div>);

}

// Pixel clouds scattered in the sky band — fixed, very low opacity,
// slow drift so the sky doesn't feel static.
function SkyClouds() {
  const cloudShape = (style) => {
    const PAL = { W: '#FAF7F0', s: '#E5DFD3' };
    const rows = [
    '..WWWWWW.....',
    '.WWWWWWWWW...',
    'WWWWWWWWWWWW.',
    'WWWWWWWWWWWWW',
    '.WWWWWWWWWWWW',
    '...sssssss...'];

    return (
      <svg style={style} viewBox={`0 0 ${rows[0].length * 4} ${rows.length * 4}`} aria-hidden>
        {rows.map((row, y) => row.split('').map((c, x) => {
          if (!PAL[c]) return null;
          return <rect key={`${x},${y}`} x={x * 4} y={y * 4} width="4.2" height="4.2" fill={PAL[c]} />;
        }))}
      </svg>);

  };
  return (
    <div className="cloud-layer">
      {/* big and small clouds at varied positions, drifting at different speeds */}
      <div className="cloud cl-1" style={{ width: 110 }}>{cloudShape({ width: 110 })}</div>
      <div className="cloud cl-2" style={{ width: 80 }}>{cloudShape({ width: 80 })}</div>
      <div className="cloud cl-3" style={{ width: 130 }}>{cloudShape({ width: 130 })}</div>
      <div className="cloud cl-4" style={{ width: 64 }}>{cloudShape({ width: 64 })}</div>
      <div className="cloud cl-5" style={{ width: 96 }}>{cloudShape({ width: 96 })}</div>
      <div className="cloud cl-6" style={{ width: 110 }}>{cloudShape({ width: 110 })}</div>
      <div className="cloud cl-7" style={{ width: 72 }}>{cloudShape({ width: 72 })}</div>
    </div>);

}

// Tiny pixel seagull — used near water/ground in ruiner scenes
function Seagull({ size = 24, style }) {
  // Classic 'M'-shape pixel gull
  const rows = [
  '..KK........KK..',
  '.KKKK......KKKK.',
  'KKKKKKK..KKKKKKK',
  '...KKKKKKKKKK...',
  '.....KKKKKK.....'];

  const cell = 2;
  return (
    <svg style={{ width: size, ...style }} viewBox={`0 0 ${rows[0].length * cell} ${rows.length * cell}`} aria-hidden>
      {rows.map((row, y) => row.split('').map((c, x) => {
        if (c !== 'K') return null;
        return <rect key={`${x},${y}`} x={x * cell} y={y * cell} width={cell + 0.1} height={cell + 0.1} fill="#1B2638" />;
      }))}
    </svg>);

}

function WorldMap() {
  // Dot-pattern world map — rough but recognisable continents.
  // Each dot is a 4px square at 6px spacing.
  const layout = [
  // 50 cols × 22 rows; '#' = land, '.' = sea
  "..................................................",
  "..................................................",
  ".....##############...........###...........#####.",
  "....##################.......######........#######",
  "...####################......########.......#####.",
  "....##################.......##########....######.",
  "......#####.....###......####################.....",
  "......####......##......####################......",
  "........###.....##.....######################.....",
  ".........##......#.....######################.....",
  "..........#......#......#####################.....",
  "...........#............####################......",
  "...........##............##################.......",
  "..........###..............################.......",
  ".........####.............................###.....",
  "........####...........###.................##.....",
  ".........###........#######.................#.....",
  "..........##........######........................",
  "..........##.........#####........................",
  "...........#.........####.........................",
  "...........#..........###.........................",
  "............#..........##........................."];

  const dot = 6;
  return (
    <svg className="world-map-svg" viewBox={`0 0 ${50 * dot} ${layout.length * dot}`} aria-hidden>
      {layout.map((row, y) =>
      row.split('').map((c, x) => {
        if (c !== '#') return null;
        return <rect key={`${x},${y}`} x={x * dot} y={y * dot} width="4" height="4" fill="#1B2638" />;
      })
      )}
    </svg>);

}

function Plane({ className = '' }) {
  // Light gray airliner facing LEFT with a navy tail + red nav light,
  // discrete window cells, engine pod, light-blue horizontal stabilizers.
  const PAL = {
    K: '#0F1726', W: '#E6E2D6', w: '#C5C0AF',
    B: '#1B3F6B', b: '#2A5489', L: '#7BA8C8',
    G: '#3A4A66', g: '#5B6B85', R: '#C24A3F',
    m: '#A8A395', c: '#7BA8C8',
    '.': null
  };
  const rows = [
  '..............................................................R......',
  '.............................................................BBBB....',
  '............................................................BBBBB....',
  '...........................................................BBBBBB....',
  '..........................................................BBbBBBB....',
  '..........................................................BBbBBBB....',
  '.........................................................BBbBBBBB....',
  '.........................................................BBbBBBBB....',
  '.....WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWBBBBBBB....',
  '...WWccWWWWKKWKKWKKWKKWKKWKKWKKWKKWKKWKKWKKWKKWKKWKKWKKWKKWWWBBBBBLLLLL',
  '..WWccWWWWWKKWKKWKKWKKWKKWKKWKKWKKWKKWKKWKKWKKWKKWKKWKKWKKWWWBBBBLLLLLL',
  '..wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwBBBBLLLL.',
  '..mmmmwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwBBBL....',
  '......................GGGGGGGGGGGGGGGGGGGG............................',
  '.....................GGGgggggggggggggggGGGG...........................',
  '.....................GGgKKKKKKKKKKKKKKggGGG...........................',
  '......................GGGggggggggggggGGGG.............................',
  '.......................GGGGGGGGGGGGGGG................................',
  '..mm..........................mm......................................',
  '.......................................................................',
  '..mmm....................mm...........................................'];

  const cell = 4;
  const w = rows[0].length;
  const h = rows.length;
  return (
    <svg className={`transit-item plane-pixel ${className}`}
    viewBox={`0 0 ${w * cell} ${h * cell}`}
    width="120" aria-hidden
    style={{ shapeRendering: 'crispEdges' }}>
      {rows.map((row, y) => row.split('').map((ch, x) => {
        if (!PAL[ch]) return null;
        return <rect key={`${x},${y}`} x={x * cell} y={y * cell} width={cell + 0.2} height={cell + 0.2} fill={PAL[ch]} />;
      }))}
    </svg>);

}
function Train({ className = '' }) {
  // Chunky pixel train — red engine + 3 cream cars with windows
  const PAL = { K: '#0F1726', E: '#7B2D26', e: '#5a1f1a', W: '#FAF7F0', Y: '#E8C46A', S: '#7BD7E8', G: '#6B7280', A: '#1B2638', '.': null };
  const rows = [
  '.....KKK.........................................................',
  '.....KAK.........................................................',
  '....KEEEK.KKKKKKKKKKKK.KKKKKKKKKKKKK.KKKKKKKKKKKKK.KKKKKKKKKKKKKKK',
  '...KEEEEKKEWWWEWWWEWWEKEWWWEWWWEWWWEKEWWWEWWWEWWWEKEWWWEWWWEWWWEEK',
  '...KEEEEKKEWWWEWWWEWWEKEWWWEWWWEWWWEKEWWWEWWWEWWWEKEWWWEWWWEWWWEEK',
  '...KEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEK',
  '...KEeeEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEK',
  '...KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK',
  '.....KKK....KKK.......KKK.......KKK....KKK......KKK....KKK.......',
  '.....GGG....GGG.......GGG.......GGG....GGG......GGG....GGG.......'];

  return (
    <svg className={`transit-item ${className}`}
    viewBox={`0 0 ${rows[0].length * 4} ${rows.length * 4}`}
    width="420" aria-hidden
    style={{ shapeRendering: 'crispEdges' }}>
      {rows.map((row, y) => row.split('').map((c, x) => {
        if (!PAL[c]) return null;
        return <rect key={`${x},${y}`} x={x * 4} y={y * 4} width="4.2" height="4.2" fill={PAL[c]} />;
      }))}
    </svg>);

}

function Camper({ className = '' }) {
  // Orange camper van based on reference
  const PAL = { K: '#1B2638', O: '#E8A437', o: '#A57A26', W: '#FAF7F0', B: '#7BD7E8', G: '#3A4A66', '.': null };
  const rows = [
  '......KKKKKKKKKKKKKKKKKK',
  '....KKWWWWWWWWWWWWWWWWWK',
  '..KKWWWWWWWWWWWWWWWWWWWK',
  '.KWWBBBBWWWWWWWWWWWBBBBK',
  '.KWWBBBBWWWWWWWWWWWBBBBK',
  '.KOOOOOOOOOOOOOOOOOOOOOK',
  '.KOOOOOOOOOOKKKKOOOOOOOK',
  '.KOOOOOOOOOOKBBKOOOOOOOK',
  '.KOOOOOOOOOOKBBKOOOOOOOK',
  '.KOOOOOOOOOOKKKKOOOOOOOK',
  '.KOOOOOOOOOOOOOOOOOOOOOK',
  '.KKKKKKKKKKKKKKKKKKKKKKK',
  '...KGGGK........K..KGGGK',
  '...KGGGK........K..KGGGK',
  '....KKK............KKKKK'];

  return (
    <svg className={`transit-item ${className}`}
    viewBox={`0 0 ${rows[0].length * 5} ${rows.length * 5}`}
    width="160" aria-hidden
    style={{ shapeRendering: 'crispEdges' }}>
      {rows.map((row, y) => row.split('').map((c, x) => {
        if (!PAL[c]) return null;
        return <rect key={`${x},${y}`} x={x * 5} y={y * 5} width="5.2" height="5.2" fill={PAL[c]} />;
      }))}
    </svg>);

}

function SchoolBus({ className = '' }) {
  const PAL = { K: '#0F1726', Y: '#E8C46A', y: '#D9A441', W: '#FAF7F0', B: '#7BD7E8', G: '#1B2638', R: '#7B2D26', '.': null };
  const rows = [
  '.....KKKKKKKKKKKKKKKKKKKKKKKKKK',
  '....KYYYYYYYYYYYYYYYYYYYYYYYYYK',
  '.KKKKYYYYYYYYYYYYYYYYYYYYYYYYYK',
  'KRRKKYBBBKBBBKBBBKBBBKYYYYWWWYK',
  'KRRKKYBBBKBBBKBBBKBBBKYYYYWWWYK',
  '.KyyyyyyyyyyyyyyyyyyyyyyyyyyyyK',
  '.KyyyyyyyyyyyyyyyyyyyyyyyyyyyyK',
  '.KKKKKKKKKKKKKKKKKKKKKKKKKKKKKK',
  '....KGGK.......KGGK........KGGK',
  '....KGGK.......KGGK........KGGK',
  '....KKKK.......KKKK........KKKK'];

  return (
    <svg className={`transit-item ${className}`}
    viewBox={`0 0 ${rows[0].length * 4} ${rows.length * 4}`}
    width="180" aria-hidden
    style={{ shapeRendering: 'crispEdges' }}>
      {rows.map((row, y) => row.split('').map((c, x) => {
        if (!PAL[c]) return null;
        return <rect key={`${x},${y}`} x={x * 4} y={y * 4} width="4.2" height="4.2" fill={PAL[c]} />;
      }))}
    </svg>);

}

// Bottom of the document — sky drops to ground silhouette, train rolls
// along rails, a camper + bus drive along a road. Renders inline above the
// footer (NOT fixed — only shows up at the very bottom of each page).
function GroundBand() {
  return (
    <div className="ground-band" aria-hidden="true">
      <svg className="ground-silhouette" viewBox="0 0 1600 110" preserveAspectRatio="xMidYMax meet">
        <path d="M0 78 Q120 50 240 75 T480 70 T720 78 T960 65 T1200 75 T1440 70 T1600 78 L1600 110 L0 110 Z" fill="#1B2638" opacity=".15" />
        <path d="M0 90 Q160 72 320 88 T640 85 T960 90 T1280 86 T1600 92 L1600 110 L0 110 Z" fill="#1B2638" opacity=".22" />
        <g fill="#1B2638" opacity=".4">
          <rect x="120" y="74" width="16" height="14" />
          <polygon points="118,74 128,68 138,74" />
          <rect x="540" y="72" width="18" height="16" />
          <polygon points="538,72 549,66 560,72" />
          <rect x="980" y="74" width="16" height="14" />
          <polygon points="978,74 988,68 998,74" />
          <rect x="1380" y="74" width="20" height="14" />
          <polygon points="1378,74 1390,68 1402,74" />
        </g>
        <g fill="#1B2638" opacity=".32">
          <circle cx="80" cy="80" r="6" /><rect x="78" y="80" width="4" height="8" />
          <circle cx="260" cy="84" r="5" /><rect x="258" y="84" width="3" height="6" />
          <circle cx="460" cy="80" r="5" /><rect x="458" y="80" width="3" height="7" />
          <circle cx="680" cy="82" r="6" /><rect x="678" y="82" width="4" height="6" />
          <circle cx="880" cy="80" r="5" /><rect x="878" y="80" width="3" height="7" />
          <circle cx="1080" cy="82" r="6" /><rect x="1078" y="82" width="4" height="7" />
          <circle cx="1300" cy="80" r="5" /><rect x="1298" y="80" width="3" height="7" />
          <circle cx="1500" cy="82" r="6" /><rect x="1498" y="82" width="4" height="6" />
        </g>
      </svg>

      {/* Train on rails */}
      <div className="train-rails">
        <Train className="train-pixel" />
        <svg className="rails-svg" viewBox="0 0 1600 18" preserveAspectRatio="xMidYMax meet">
          <line x1="0" y1="6" x2="1600" y2="6" stroke="#1B2638" strokeWidth="1.5" opacity=".4" />
          <line x1="0" y1="12" x2="1600" y2="12" stroke="#1B2638" strokeWidth="1.5" opacity=".4" />
          {Array.from({ length: 60 }).map((_, i) =>
          <rect key={i} x={i * 28} y="3" width="10" height="12" fill="#7B2D26" opacity=".35" />
          )}
        </svg>
      </div>

      {/* Field with cows and sheep flexing */}
      <div className="ground-field">
        <FieldGrass />
        <Cow style={{ left: '6%', bottom: 12 }} bob />
        <Sheep style={{ left: '18%', bottom: 8 }} />
        <Sheep style={{ left: '27%', bottom: 14 }} bob />
        <Cow style={{ left: '40%', bottom: 10 }} flip />
        <Sheep style={{ left: '54%', bottom: 8 }} />
        <Cow style={{ left: '64%', bottom: 12 }} bob />
        <Sheep style={{ left: '76%', bottom: 14 }} bob />
        <Sheep style={{ left: '87%', bottom: 8 }} flip />
      </div>
    </div>);

}

// Cow — small pixel sprite (Holstein black & white)
function Cow({ style, bob, flip }) {
  const PAL = { K: '#0F1726', W: '#FAF7F0', P: '#E8C5A0', G: '#3A4A66', '.': null };
  const rows = [
  '.........KKK.......',
  '........KWWWK......',
  '....KKKKKWWWKK.....',
  '...KWWKWWWWWKKKKK..',
  '..KWWKKWWKKKKKWWWK.',
  '..KWWWWWWWWWWWWWWK.',
  '..KWKWWWKKKWWKKWWK.',
  '..KKWWWWWWWWWWWKKK.',
  '...K..K....K..K....',
  '...K..K....K..K....',
  '...K..K....K..K....'];

  return (
    <svg
      className={`field-animal cow ${bob ? 'animal-bob' : ''}`}
      viewBox={`0 0 ${rows[0].length * 3} ${rows.length * 3}`}
      width="56"
      style={{ position: 'absolute', shapeRendering: 'crispEdges', transform: flip ? 'scaleX(-1)' : '', ...style }}
      aria-hidden>
      
      {rows.map((row, y) => row.split('').map((c, x) => {
        if (!PAL[c]) return null;
        return <rect key={`${x},${y}`} x={x * 3} y={y * 3} width="3.1" height="3.1" fill={PAL[c]} />;
      }))}
    </svg>);

}

// Sheep — fluffier silhouette
function Sheep({ style, bob, flip }) {
  const PAL = { K: '#0F1726', W: '#FAF7F0', F: '#F0E9D3', '.': null };
  const rows = [
  '......KKKK....',
  '....KKWFFFKK..',
  '...KWWWWFFFK..',
  '..KFFFFFFFFFK.',
  '..KFFFFFFFFFK.',
  '..KFFFFFFFFFK.',
  '..KFFFFFFFFFK.',
  '..KKFFFFFFKKK.',
  '...K..K..K....',
  '...K..K..K....',
  '...K..K..K....'];

  return (
    <svg
      className={`field-animal sheep ${bob ? 'animal-bob' : ''}`}
      viewBox={`0 0 ${rows[0].length * 3} ${rows.length * 3}`}
      width="48"
      style={{ position: 'absolute', shapeRendering: 'crispEdges', transform: flip ? 'scaleX(-1)' : '', ...style }}
      aria-hidden>
      
      {rows.map((row, y) => row.split('').map((c, x) => {
        if (!PAL[c]) return null;
        return <rect key={`${x},${y}`} x={x * 3} y={y * 3} width="3.1" height="3.1" fill={PAL[c]} />;
      }))}
    </svg>);

}

// Decorative grass tufts scattered across the field
function FieldGrass() {
  const tufts = Array.from({ length: 30 }, (_, i) => ({
    left: `${i * 3.6 % 100 + 0.5}%`,
    h: 4 + i % 3 * 2,
    delay: i * .2
  }));
  return (
    <div className="field-grass">
      {tufts.map((t, i) =>
      <span key={i} className="grass-tuft" style={{ left: t.left, height: t.h, animationDelay: `${t.delay}s` }} />
      )}
    </div>);

}

// Pixelated city silhouette behind hero goose (recognizable landmark)
function CitySkyline() {
  return (
    <svg viewBox="0 0 800 260" preserveAspectRatio="xMidYMax meet" aria-hidden>
      {/* far buildings (lighter) */}
      <g fill="#1B2638" opacity=".5">
        <rect x="40" y="160" width="36" height="100" />
        <rect x="80" y="140" width="28" height="120" />
        <rect x="112" y="170" width="40" height="90" />
        <rect x="160" y="130" width="32" height="130" />
        <rect x="200" y="155" width="38" height="105" />
        <rect x="640" y="170" width="34" height="90" />
        <rect x="680" y="150" width="40" height="110" />
        <rect x="724" y="160" width="30" height="100" />
        <rect x="758" y="138" width="34" height="122" />
      </g>
      {/* mid buildings */}
      <g fill="#1B2638" opacity=".7">
        <rect x="0" y="170" width="44" height="90" />
        <rect x="50" y="180" width="24" height="80" />
        <rect x="244" y="150" width="36" height="110" />
        <rect x="284" y="180" width="28" height="80" />
        <rect x="324" y="165" width="40" height="95" />
        <rect x="436" y="160" width="34" height="100" />
        <rect x="474" y="180" width="28" height="80" />
        <rect x="506" y="170" width="32" height="90" />
        <rect x="544" y="155" width="30" height="105" />
        <rect x="588" y="170" width="36" height="90" />
      </g>
      {/* Eiffel Tower — center */}
      <g fill="#1B2638">
        <polygon points="380,40 420,40 410,80 390,80" />
        <polygon points="386,80 414,80 414,120 386,120" />
        <polygon points="386,120 384,170 416,170 414,120" />
        <polygon points="370,170 430,170 440,260 360,260" />
        <line x1="400" y1="40" x2="400" y2="20" stroke="#1B2638" strokeWidth="3" />
        <rect x="396" y="14" width="8" height="8" />
      </g>
      {/* Coliseum-ish dome to the right of tower */}
      <g fill="#1B2638">
        <ellipse cx="200" cy="180" rx="38" ry="18" />
        <rect x="162" y="178" width="76" height="30" />
        {/* arches */}
        <circle cx="174" cy="195" r="4" fill="#FDFBF3" />
        <circle cx="186" cy="195" r="4" fill="#FDFBF3" />
        <circle cx="200" cy="195" r="4" fill="#FDFBF3" />
        <circle cx="214" cy="195" r="4" fill="#FDFBF3" />
        <circle cx="226" cy="195" r="4" fill="#FDFBF3" />
      </g>
      {/* Tokyo Tower (right) */}
      <g fill="#1B2638">
        <polygon points="595,90 615,90 612,140 598,140" />
        <polygon points="588,140 622,140 620,200 590,200" />
        <polygon points="572,200 638,200 644,260 566,260" />
        <line x1="605" y1="90" x2="605" y2="70" stroke="#1B2638" strokeWidth="3" />
      </g>
      {/* ground line */}
      <line x1="0" y1="259" x2="800" y2="259" stroke="#1B2638" strokeWidth="2" />
    </svg>);

}

// Verdict background lines (subtle dotted connectors behind the goose)
function VerdictBgLines() {
  return (
    <svg viewBox="0 0 320 280" aria-hidden>
      <g stroke="#1B2638" strokeWidth="1.5" strokeDasharray="3,5" fill="none">
        <path d="M20 40 Q80 60 100 120" />
        <path d="M300 60 Q240 90 220 140" />
        <path d="M30 240 Q90 200 130 220" />
        <path d="M290 230 Q230 200 200 220" />
      </g>
      <g fill="#1B2638">
        <circle cx="20" cy="40" r="3" />
        <circle cx="300" cy="60" r="3" />
        <circle cx="30" cy="240" r="3" />
        <circle cx="290" cy="230" r="3" />
      </g>
    </svg>);

}

// ============================================================
// PURPOSE OF TRIP — chip selector with custom field
// ============================================================
const PURPOSES = [
{ id: 'romantic', label: 'Romantic getaway', emoji: '🥂' },
{ id: 'family', label: 'Family trip', emoji: '🧺' },
{ id: 'normal', label: 'Just a trip', emoji: '✈' },
{ id: 'work', label: 'Work', emoji: '💼' },
{ id: 'solo', label: 'Solo escape', emoji: '🎒' },
{ id: 'other', label: 'Something else', emoji: '✍' }];


function PurposeStrip({ purpose, customPurpose, onChange, lang = 'en' }) {
  const isHi = lang === 'hi';
  const HI_PURPOSES = {
    romantic: 'रोमांटिक यात्रा',
    family: 'पारिवारिक यात्रा',
    normal: 'सामान्य यात्रा',
    work: 'काम / व्यवसाय',
    solo: 'अकेले यात्रा',
    other: 'कुछ और',
  };

  const [otherOpen, setOtherOpen] = useState(purpose === 'other');
  const [customText, setCustomText] = useState(customPurpose || '');

  const pick = (id) => {
    if (id === 'other') {
      setOtherOpen(true);
      onChange('other', customText);
    } else {
      setOtherOpen(false);
      onChange(id, '');
    }
  };
  const onCustom = (v) => {
    setCustomText(v);
    onChange('other', v);
  };

  return (
    <div className="purpose-strip">
      <div className="purpose-row">
        <span className="purpose-label">{isHi ? 'यात्रा किस लिए है?' : "What's the trip for?"}</span>
        <div className="purpose-chips">
          {PURPOSES.map((p) =>
            <button
              key={p.id}
              type="button"
              className={`purpose-chip ${purpose === p.id ? 'on' : ''}`}
              onClick={() => pick(p.id)}>
              <span className="pc-emoji">{p.emoji}</span> {isHi ? (HI_PURPOSES[p.id] || p.label) : p.label}
            </button>
          )}
        </div>
      </div>
      {otherOpen &&
        <input
          className="purpose-custom"
          placeholder={isHi ? 'कोई विशेष उद्देश्य, उत्सव, अवकाश...' : 'Funeral, materials run, marathon, divorce trip…'}
          value={customText}
          onChange={(e) => onCustom(e.target.value)} />
      }
    </div>
  );
}

// ============================================================
// TOP BAR
// ============================================================
function TopBar({ route, onNav, lang = "en", onToggleLang }) {
  const isHi = lang === "hi";
  const tr = TRANSLATIONS[lang || "en"];
  const links = [
    { id: "landing", label: tr.navHome },
    { id: "brief", label: tr.navBrief },
    { id: "history", label: tr.navHistory },
    { id: "settings", label: tr.navSettings }
  ];

  return (
    <header className="top-bar" style={{ height: "63px" }}>
      <button className="brand" onClick={() => onNav("landing")}>
        <MiniGoose size={38} />
        <span style={{ textAlign: "left", padding: "0px 5px 0px 0px", letterSpacing: "0.3px", lineHeight: "1.95", minWidth: "155px", fontSize: isHi ? "20px" : "22px" }}>
          {tr.brandTitle}
        </span>
      </button>
      <nav className="top-nav" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {links.map((l) =>
          <a key={l.id} href={`#${l.id}`}
             className={route === l.id ? "active" : ""}
             onClick={(e) => {e.preventDefault();onNav(l.id);}}>
            {l.label}
          </a>
        )}
        <a href="#auth" onClick={(e) => {e.preventDefault();onNav("auth");}} className="ghost-link">
          {tr.navSignIn}
        </a>

        {/* Retro Language Toggle Switch */}
        <button
          type="button"
          onClick={onToggleLang}
          className="lang-toggle-btn"
          title={isHi ? "Switch to English" : "हिंदी में बदलें"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 10px",
            fontSize: 12,
            fontFamily: "var(--font-pixel)",
            letterSpacing: "1px",
            borderRadius: 4,
            border: "1.5px solid var(--ink)",
            background: isHi ? "#E8A437" : "var(--card-bg, #FAF7F0)",
            color: "var(--ink)",
            boxShadow: "2px 2px 0 var(--ink)",
            cursor: "pointer",
            transition: "all 0.15s ease",
            marginLeft: 6,
          }}
        >
          <span style={{ fontWeight: !isHi ? "bold" : "normal", opacity: !isHi ? 1 : 0.65 }}>EN</span>
          <span style={{ opacity: 0.35 }}>|</span>
          <span style={{ fontWeight: isHi ? "bold" : "normal", opacity: isHi ? 1 : 0.65 }}>हिन्दी</span>
        </button>
      </nav>
    </header>
  );
}

// ============================================================
// VOICE PICKER
// ============================================================
function VoicePicker({ voiceId, onChange, compact = false, lang = 'en' }) {
  const isHi = lang === 'hi';
  const [hovered, setHovered] = useState(null);
  return (
    <div className="voice-grid">
      {VOICES.map((v) => {
        const selected = v.id === voiceId;
        const showPreview = hovered === v.id;
        const hiOverride = isHi ? HI_VOICE_OVERRIDES[v.id] : null;
        const displayName = hiOverride ? hiOverride.name : v.name;
        const displayTag = hiOverride ? hiOverride.tag : v.tag;
        const displayPreview = hiOverride ? hiOverride.preview : v.preview;

        return (
          <button
            key={v.id} type="button"
            className={`voice-card ${selected ? 'selected' : ''} ${showPreview ? 'previewing' : ''}`}
            onClick={() => onChange(v.id)}
            onMouseEnter={() => setHovered(v.id)}
            onMouseLeave={() => setHovered(null)}
            aria-pressed={selected}>
            <span className="vc-check">✓</span>
            <div className="vc-goose"><PixelGoose outfit={v.outfit} size={v.outfit === 'family' ? 90 : v.outfit === 'petparent' ? 78 : 70} /></div>
            <div className="vc-name">{displayName}</div>
            <div className="vc-tag">{displayTag}</div>
            {!compact &&
              <div className={`vc-preview ${showPreview ? 'show' : ''}`}>
                {displayPreview}
              </div>
            }
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// LANDING
// ============================================================
function LandingView({ state, setState, onSubmit, onRuiner, tweaks }) {
  const tr = TRANSLATIONS[state.lang || 'en'];
  const isHi = state.lang === 'hi';
  const [q, setQ] = useState(state.query || '');
  useEffect(() => { setQ(state.query || ''); }, [state.query]);

  const voice = VOICES.find((v) => v.id === state.voiceId) || VOICES[0];
  const hiVoice = isHi ? HI_VOICE_OVERRIDES[voice.id] : null;

  const submit = (override) => {
    const finalQ = (override ?? q).trim();
    if (!finalQ) return;
    setState((s) => ({ ...s, query: finalQ, scenario: 'default' }));
    onSubmit(finalQ);
  };

  const ruin = () => {
    const finalQ = (q || 'Rome next week').trim();
    setState((s) => ({ ...s, query: finalQ, scenario: 'ruiner' }));
    onRuiner(finalQ);
  };

  const headline = isHi ? (tr.headlinePrefix + '\n' + tr.headlineSuffix) : (tweaks.heroHeadline || "Let the goose\nplan your trip.");

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-left">
          <div className="eyebrow">
            <span className="dot" /> {tr.eyebrow}
          </div>
          <h1>
            {headline.split('\n').map((line, i) =>
              <span key={i} style={{ display: 'block' }}>{i === 1 ? <em>{line}</em> : line}</span>
            )}
          </h1>
          <p className="lede">
            {tr.lede}
          </p>

          <div className="query-card">
            <div className="query-input-row">
              <span className="query-prefix" aria-hidden>↳</span>
              <input
                className="query-input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={tr.queryPlaceholder}
                onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
                aria-label="Where are you headed?" />
              
              <button className="submit-btn" onClick={() => submit()}>
                {tr.submitBtn} <span className="arrow">→</span>
              </button>
            </div>

            <PurposeStrip
              purpose={state.purpose}
              customPurpose={state.customPurpose}
              lang={state.lang}
              onChange={(purpose, customPurpose) => setState((s) => ({ ...s, purpose, customPurpose }))} />

            <div className="voice-section">
              <div className="section-divider">
                <span>{tr.pickGoose}</span>
                <span className="divider-line" />
                <span className="kbd-tip">{tr.hoverTip}</span>
              </div>
              <VoicePicker voiceId={state.voiceId} lang={state.lang} onChange={(id) => setState((s) => ({ ...s, voiceId: id }))} />
            </div>

            <div className="chips-row">
              <span className="chips-label">{tr.orTry}</span>
              {DEMO_CHIPS.map((c) =>
                <button key={c.label} className="chip" onClick={() => { setQ(c.query); submit(c.query); }}>
                  <span className="chip-emoji">{c.emoji}</span> {c.label}
                </button>
              )}
            </div>

            {/* Goose Ruiner card */}
            <button className="ruiner-card" onClick={ruin}>
              <div className="ruiner-icon">!</div>
              <div className="ruiner-text">
                <div className="ruiner-eyebrow">{tr.ruinerEyebrow}</div>
                <strong>{tr.ruinerTitle}</strong>
                <p>{tr.ruinerDesc}</p>
              </div>
              <div className="ruiner-arrow">→</div>
            </button>

            <p className="footnote">
              <span className="pixel-tick" />
              {tr.footnote}
            </p>
          </div>
        </div>

        <HeroGooseStage outfit={voice.outfit} line={hiVoice ? hiVoice.hero : voice.bubbles.hero} lang={state.lang} />
      </section>

      <SocialProofStrip />
      <HowItWorks voice={voice} />
      <FAQSection />
    </div>
  );
}

function HeroGooseStage({ outfit, line, lang = 'en' }) {
  const isHi = lang === 'hi';
  const tr = TRANSLATIONS[lang || 'en'];
  return (
    <div className="goose-stage">
      <div className="stage-sun" />
      <div className="stage-clouds">
        <div className="stage-cloud cl1" />
        <div className="stage-cloud cl2" />
      </div>

      <div className="stage-city">
        <CitySkyline />
      </div>

      <div className="sticker tl"><span className="t-num">001</span> {tr.caseOpen}</div>
      <div className="sticker tr" style={{ backgroundColor: "rgb(113, 231, 150)", fontSize: "10px", letterSpacing: "2px", gap: "12px", height: "24px", alignItems: "stretch", lineHeight: "0.95" }}>{tr.verifiedGoose}</div>

      <div className="hero-bubble-wrap">
        <GooseBubble side="left">
          <strong style={{ height: "21px" }}>{tr.yourGooseSays}</strong>
          {line}
        </GooseBubble>
      </div>

      <div className="hero-goose-pose">
        <PixelGoose outfit={outfit} size={outfit === 'family' ? 280 : outfit === 'petparent' ? 240 : 220} sparkle bob />
      </div>

      <div className="stage-floor" />

      <div className="pin pin-a"><span className="tack" />{tr.pinAdvisories}<br /><b>0 {isHi ? 'अलर्ट' : 'alerts'}</b></div>
      <div className="pin pin-b"><span className="tack" />{tr.pinNews}<br /><b>8 {isHi ? 'आइटम' : 'items'}</b></div>
      <div className="pin pin-c"><span className="tack" />{isHi ? 'मौसम' : 'Weather'}<br /><b>24–29 °C</b></div>
      <div className="pin pin-d"><span className="tack" />{isHi ? 'हड़ताल' : 'Strike'}<br /><b>{isHi ? 'केवल गुरु' : 'Thu only'}</b></div>
    </div>
  );
}

function SocialProofStrip() {
  return (
    <section className="social-strip">
      <div className="ss-item">
        <span className="ss-num">47</span>
        <span className="ss-cap">sources checked per brief</span>
      </div>
      <span className="ss-sep" />
      <div className="ss-item">
        <span className="ss-num">~2.3h</span>
        <span className="ss-cap">of doomscrolling skipped</span>
      </div>
      <span className="ss-sep" />
      <div className="ss-item">
        <span className="ss-num">0</span>
        <span className="ss-cap">hallucinated links, ever</span>
      </div>
      <span className="ss-sep" />
      <div className="ss-item">
        <span className="ss-num">40s</span>
        <span className="ss-cap">from query to verdict</span>
      </div>
    </section>);

}

function HowItWorks({ voice }) {
  return (
    <section className="howitworks">
      <h2 className="section-display">How the goose works.</h2>
      <p className="section-sub">Three steps. Forty seconds. One brief. No siren emoji.</p>

      {/* Animated orange/red path that weaves between the 3 cards */}
      <HiwPath />

      <div className="hiw-grid">
        {/* Step 1 — thinking */}
        <div className="hiw-card hiw-1">
          <div className="hiw-num">01</div>
          <div className="hiw-thought" aria-hidden>
            <i /><i /><i />
          </div>
          <div className="hiw-goose">
            <PixelGoose outfit="default" size={96} />
          </div>
          <h3>You drop a place.</h3>
          <p>Type "Rome next week" or "Tokyo with my dog." The goose figures out the scope — no date wizard, no 12-step form, no popups.</p>
        </div>

        {/* Step 2 — making calls to the police geese */}
        <div className="hiw-card hiw-2">
          <div className="hiw-num">02</div>
          <PoliceCallScene />
          <h3>Goose makes calls.</h3>
          <p>Five layers in parallel — official advisories, local news, social chatter, weather, events. The goose calls embassy contacts, news desks, even the boys in blue.</p>
        </div>

        {/* Step 3 — verified */}
        <div className="hiw-card hiw-3">
          <div className="hiw-num">03</div>
          <div className="hiw-stamp">verified</div>
          <div className="hiw-goose">
            <PixelGoose outfit="default" accessories={['detective']} size={96} sparkle />
          </div>
          <h3>You get one calm brief.</h3>
          <p>Quick read in your voice. Five sections. Every line bound to its real source. No "BREAKING." No exclamation marks.</p>
        </div>
      </div>
    </section>);

}

// Goose talking to two police-hatted geese — used in step 2 of HowItWorks
function PoliceCallScene() {
  return (
    <div className="police-scene">
      <div className="ps-officer ps-l">
        <PixelGoose outfit="default" accessories={['police']} size={64} />
      </div>
      <div className="ps-officer ps-l2">
        <PixelGoose outfit="default" accessories={['police']} size={60} />
      </div>
      <div className="ps-main">
        <div className="ps-callout">Anything we should know?</div>
        <PixelGoose outfit="default" accessories={['phone']} size={88} flip />
      </div>
    </div>);

}

// Animated curved connector between the 3 HowItWorks cards
function HiwPath() {
  // Simple curving dashed loop — gentle wave under all 3 cards, drops below
  // and comes back, like a single trip line. Matches reference image.
  return (
    <svg className="hiw-path-svg" viewBox="0 0 1200 360" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="hiw-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C24A3F" />
          <stop offset="50%" stopColor="#E8623F" />
          <stop offset="100%" stopColor="#C24A3F" />
        </linearGradient>
      </defs>
      {/* one continuous flowing line that dips below and arches over */}
      <path
        id="hiw-motion-path"
        className="hiw-path-main"
        d="M -40 220 Q 80 360, 320 280 Q 540 220, 600 100 Q 660 -20, 880 60 Q 1080 130, 1240 200"
        fill="none" stroke="url(#hiw-grad)" strokeWidth="6" strokeLinecap="round"
        strokeDasharray="14 16" />
      
      {/* pulsing dot riding the path */}
      <circle r="7" fill="#C24A3F" className="hiw-path-dot">
        <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
          <mpath href="#hiw-motion-path" />
        </animateMotion>
      </circle>
    </svg>);

}

function FAQSection() {
  const [open, setOpen] = useState(0);
  const faqs = [
  { q: "Is the goose real?", a: "The goose is real in spirit. The data is real in fact. Every line in your brief is bound to a real source — embassies, national outlets, weather services, official event calendars. The goose just makes them readable." },
  { q: "What if I just want to feel less anxious without reading?", a: "Hit play on the audio bar. Your brief is narrated in your chosen voice — 40 seconds at 1.0×, faster if you cycle the speed. We never autoplay. The goose respects your ears." },
  { q: "What about the rare 'don't go' case?", a: "If multiple official advisories flag very-high risk for your destination, the brief opens with a calm, source-bound banner. We never amplify. We surface. You decide." },
  { q: "Will you sell my data?", a: "No. Your briefs are stored to your account so the goose can re-run them later. We don't email summaries. We don't run ads on anxiety." },
  { q: "Can the goose come with me?", a: "Soon. Telegram drop is in beta — verify your handle in Settings and your brief lands as a message. The goose stays in his pond." }];

  return (
    <section className="faq">
      <h2 className="section-display">Frequent goose questions.</h2>
      <div className="faq-list">
        {faqs.map((f, i) =>
        <div key={i} className={`faq-row ${open === i ? 'open' : ''}`}>
            <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
              <span>{f.q}</span>
              <span className="faq-plus">{open === i ? '–' : '+'}</span>
            </button>
            <div className="faq-a"><p>{f.a}</p></div>
          </div>
        )}
      </div>
    </section>);

}

// ============================================================
// LOADING — extended with rolling captions per layer + active goose
// ============================================================
function LoadingView({ state, onDone }) {
  const voice = VOICES.find((v) => v.id === state.voiceId) || VOICES[0];
  const isRuiner = state.scenario === 'ruiner';

  // Dynamic scope chips — built from user's destination + brief.scope when available.
  // Phase 11: brief.scope.airports + neighborhoods populate once polling returns
  // any partial data, but during the wait we show the city alone + radius.
  const destBase = (state.destination || 'Rome').split(',')[0].trim() || 'Rome';
  const dynamicScopeChips = [
    destBase,
    ...(state.brief?.brief?.scope?.airports?.slice(0, 2) ?? []),
    ...(state.brief?.brief?.scope?.neighborhoods?.slice(0, 3) ?? []),
    `${state.brief?.brief?.scope?.radius_km ?? 50} km radius`,
  ];

  // Error short-circuit — app.jsx polling sets briefStatus='failed' + briefError.
  if (state.briefStatus === 'failed') {
    return (
      <div className="page" style={{ paddingTop: 60, textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
        <PixelGoose outfit="default" size={120} accessories={['sternbrow']} />
        <h1 className="settings-h1" style={{ marginTop: 16 }}>The goose hit turbulence.</h1>
        <p className="sub" style={{ marginBottom: 8 }}>
          Random-city research takes longer than our current tier allows.
        </p>
        <p style={{ marginBottom: 24, fontSize: 14, color: 'var(--muted)' }}>
          For the demo, we have <strong>6 cities fully pre-investigated</strong> and ready instantly:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
          {['Rome', 'New York', 'Tokyo', 'Reykjavik', 'Bangkok', 'Cairo'].map(c => (
            <button
              key={c}
              className="ghost-btn"
              onClick={() => {
                window.location.hash = '#landing';
                setTimeout(() => {
                  const input = document.querySelector('input[type="text"], textarea');
                  if (input) { input.value = c; input.focus(); }
                }, 100);
              }}
              style={{ padding: '8px 16px', fontSize: 14 }}
            >
              {c}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 18, fontStyle: 'italic' }}>
          {state.briefError ?? 'Something went sideways during the investigation.'}
        </p>
        <button className="ghost-btn" onClick={() => window.location.reload()} style={{ marginRight: 10 }}>
          Try again →
        </button>
        <button className="ghost-btn" onClick={() => window.location.hash = '#landing'}>
          Back to the bureau
        </button>
      </div>);

  }

  const [scopeCount, setScopeCount] = useState(0);
  const [layerStates, setLayerStates] = useState(() => LAYERS.map(() => 'pending'));
  const [captionIdx, setCaptionIdx] = useState(LAYERS.map(() => 0));
  const [activeLayer, setActiveLayer] = useState(-1);
  const [factIdx, setFactIdx] = useState(0);
  const [tick, setTick] = useState(0);

  // Phase 11 design integration — animation runs in a loop; navigation
  // to /brief is driven by app.jsx polling effect (state.briefStatus →
  // nav('brief') when complete).
  //
  // Demo cities: hardcoded → 20s loading floor → compressed layer sequence
  // so all 5 layers visibly complete (yellow→green) + progress bar reaches
  // 100% inside the 20s window. Result reveal lands when everything is done.
  //
  // Live cities: fall back to long sequence (~150s) tracking real CF Worker
  // synth duration (45s wait + 60s normalize + 60s synth ≈ 165s typical).
  const isDemo = state.isDemoCity === true || state.localBrief === true || (typeof state.query_id === 'string' && state.query_id.startsWith('demo-'));
  const TOTAL_MS = isDemo ? 20000 : 120000;

  useEffect(() => {
    let cancelled = false;
    const timers = [];

    const scopeIvl = setInterval(() => {
      setScopeCount((c) => {if (c >= SCOPE_CHIPS.length) {clearInterval(scopeIvl);return c;}return c + 1;});
    }, 220);

    // Layer timing — 20s compressed for demos, 150s spread for live briefs.
    const sequence = isDemo ? [
      { d: 500,   i: 0, s: 'fetching' },
      { d: 4000,  i: 0, s: 'done' },

      { d: 3000,  i: 1, s: 'fetching' },
      { d: 8000,  i: 1, s: 'done' },

      { d: 7000,  i: 2, s: 'fetching' },
      { d: 12000, i: 2, s: 'done' },

      { d: 11000, i: 3, s: 'fetching' },
      { d: 16000, i: 3, s: 'done' },

      { d: 15000, i: 4, s: 'fetching' },
      { d: 19000, i: 4, s: 'done' },
    ] : [
    { d: 4000, i: 0, s: 'fetching' },
    { d: 28000, i: 0, s: 'done' },

    { d: 18000, i: 1, s: 'fetching' },
    { d: 52000, i: 1, s: 'done' },

    { d: 38000, i: 2, s: 'fetching' },
    { d: 78000, i: 2, s: 'done' },

    { d: 62000, i: 3, s: 'fetching' },
    { d: 108000, i: 3, s: 'done' },

    { d: 88000, i: 4, s: 'fetching' },
    { d: 148000, i: 4, s: 'done' }];


    sequence.forEach((step) => {
      timers.push(setTimeout(() => {
        if (cancelled) return;
        setLayerStates((prev) => {const next = [...prev];next[step.i] = step.s;return next;});
        if (step.s === 'fetching') setActiveLayer(step.i);
      }, step.d));
    });

    // Caption rotator within each fetching layer
    const captionRotator = setInterval(() => {
      setCaptionIdx((prev) => {
        const next = [...prev];
        for (let i = 0; i < LAYERS.length; i++) {
          if (layerStatesRef.current[i] === 'fetching') {
            const max = LAYERS[i].captions.length - 1;
            next[i] = Math.min(max - 1, (next[i] || 0) + 1);
          } else if (layerStatesRef.current[i] === 'done') {
            next[i] = LAYERS[i].captions.length - 1;
          }
        }
        return next;
      });
    }, 1800);

    // Fun-fact rotator (right column)
    const factIvl = setInterval(() => setFactIdx((i) => (i + 1) % FUN_FACTS.length), 2200);

    // Time tick — drives the InvestigationTheatre scene rotation
    const start = Date.now();
    const tickIvl = setInterval(() => {
      const t = (Date.now() - start) / 1000;
      setTick(t);
    }, 200);

    // Removed: setTimeout(onDone, 35000). Phase 11 polling drives navigation
    // via state.briefStatus === 'complete' in app.jsx. Keeping safety timeout
    // for 120s — if backend hangs that long, the loop just keeps animating
    // (app.jsx polling already sets briefError on its own MAX timeout).

    return () => {
      cancelled = true;
      clearInterval(scopeIvl);
      clearInterval(captionRotator);
      clearInterval(factIvl);
      clearInterval(tickIvl);
      timers.forEach(clearTimeout);
    };
  }, []);

  const layerStatesRef = useRef(layerStates);
  useEffect(() => {layerStatesRef.current = layerStates;}, [layerStates]);

  const progressPct = Math.min(100, tick / (TOTAL_MS / 1000) * 100);

  return (
    <div className="page">
      <div className="brief-eyebrow">
        Investigation in progress · {state.query || 'Rome next week'}
        {isRuiner && <span className="ruiner-badge"> · goose snob mode</span>}
      </div>
      <h1 className="loading-h1">
        Goose is on it. <em>Stand by.</em>
      </h1>
      <p className="loading-lede">
        Five signal layers running in parallel. The goose is showing his work.
      </p>
      {state.voiceSwapNotice &&
        <div style={{
          background:'var(--amber-soft)',
          border:'1px solid var(--amber)',
          borderRadius:8,
          padding:'10px 14px',
          margin:'8px 0 16px',
          fontSize:13.5,
          color:'var(--ink-2)',
        }}>
          🦆 {state.voiceSwapNotice}
        </div>
      }

      <div className="scope-chips" aria-label="Resolved scope">
        <span className="scope-label">scope →</span>
        {dynamicScopeChips.slice(0, scopeCount).map((c, i) =>
        <span key={`${c}-${i}`} className="scope-chip" style={{ animationDelay: `${i * 40}ms` }}>{c}</span>
        )}
        {scopeCount < dynamicScopeChips.length && <span className="scope-chip pending">…</span>}
      </div>

      <div className="loading-wrap">
        <div>
          <div className="layer-list">
            {LAYERS.map((L, i) => {
              const st = layerStates[i];
              const cIdx = captionIdx[i] || 0;
              const caption = L.captions[cIdx] || L.captions[0];
              return (
                <div key={L.id} className={`layer-row ${st}`}>
                  <div className="layer-letter">{L.id}</div>
                  <div className="layer-info">
                    <div className="layer-name">{L.name}</div>
                    <div className="layer-status">
                      <span className="dotpulse" />
                      <span className="ls-text">{st === 'pending' ? 'queued' : caption}</span>
                      {st === 'done' && <span className="ls-count">· {[5, 9, 16, 7, 4][i]} signals</span>}
                    </div>
                  </div>
                  <div className="layer-tick">{st === 'done' ? '✓' : st === 'fetching' ? '·' : ''}</div>
                </div>);

            })}
          </div>

          <div className="fun-fact">
            <MiniGoose size={24} /> {FUN_FACTS[factIdx]}
          </div>

          {/* gentle linear progress under the layer list — not a percent counter */}
          <div className="loading-progress" aria-hidden>
            <div className="loading-progress-fill" style={{ width: progressPct + '%' }} />
          </div>
        </div>

        {/* ABSURD INVESTIGATION THEATRE */}
        <InvestigationTheatre tick={tick} totalSec={TOTAL_MS / 1000} target={state.savedMinutes} />
      </div>
    </div>);

}

// ============================================================
// BRIEF
// ============================================================
// Phase 11 design integration — adapt backend BriefOutputSchema sections
// (vibe/knowing/areas/confidence/impact) onto design's 3 cluster sections
// (s2 What's happening / s3 What to watch / s4 Worth knowing). Each backend
// bullet becomes a ClusterCard; source_refs resolve to brief.sources entries.
const BACKEND_SECTION_MAP = {
  s2: ['knowing'],
  s3: ['areas'],
  s4: ['confidence', 'impact'],
};

function adaptBackendBrief(brief, designSectionId) {
  if (!brief?.sections) return null;
  const targetIds = BACKEND_SECTION_MAP[designSectionId];
  if (!targetIds) return null;
  const sources = brief.sources ?? [];
  const sourcesByIndex = new Map(sources.map((s) => [s.index, s]));
  const confidenceBand = brief.confidence_summary?.overall ?? 'medium';
  const out = [];
  let cid = 0;
  for (const sect of brief.sections) {
    if (!targetIds.includes(sect.id)) continue;
    for (const bullet of sect.bullets ?? []) {
      const refs = bullet.source_refs ?? [];
      const cardSources = refs
        .map((idx) => sourcesByIndex.get(idx))
        .filter(Boolean)
        .map((s) => ({
          fav: bullet.emoji ?? '📰',
          publisher: s.publisher ?? 'source',
          title: s.title ?? '—',
          date: typeof s.published_at === 'string' ? s.published_at.slice(0, 10) : '',
          url: s.url,
        }));
      out.push({
        id: `c${++cid}`,
        title: bullet.title || sect.title || '—',
        interpretation: bullet.body || sect.summary || '',
        confidence: confidenceBand,
        layer_diversity: Math.min(5, Math.max(1, cardSources.length)),
        needs_disclaimer: cardSources.length <= 1,
        sources: cardSources,
      });
    }
  }
  return out;
}

function vibeToVerdict(vibe) {
  if (!vibe) return 'go';
  if (['tense', 'disrupted', 'unstable'].includes(vibe)) return 'caution';
  return 'go';
}

function BriefView({ state, setState, onNav }) {
  const voice = VOICES.find((v) => v.id === state.voiceId) || VOICES[0];
  const isRuiner = state.scenario === 'ruiner';
  const realBrief = state.brief?.brief ?? null;

  // Phase 11 — static demo branch. Pre-rendered briefs for 6 demo cities use
  // a different schema (markdown blocks per section); they short-circuit the
  // entire adaptBackendBrief path and render via StaticDemoBriefView.
  if (realBrief?.static_demo === true) {
    return <StaticDemoBriefView state={state} setState={setState} onNav={onNav} voice={voice} brief={realBrief} />;
  }

  const dontGo = state.dontGo || isRuiner || (realBrief?.vibe && ['unstable', 'disrupted'].includes(realBrief.vibe));

  // Use real backend brief when present; fall back to canned design data.
  const clusters_happening = realBrief
    ? adaptBackendBrief(realBrief, 's2')
    : (isRuiner ? RUINER_CLUSTERS_HAPPENING : CLUSTERS_HAPPENING);
  const clusters_watch = realBrief
    ? adaptBackendBrief(realBrief, 's3')
    : (isRuiner ? RUINER_CLUSTERS_WATCH : CLUSTERS_WATCH);
  const clusters_worth = realBrief
    ? adaptBackendBrief(realBrief, 's4')
    : (isRuiner ? RUINER_CLUSTERS_WORTH : CLUSTERS_WORTH);

  // Quick read intro + tldr from real brief vibe section, else voice canned
  const realVibeSection = realBrief?.sections?.find((s) => s.id === 'vibe');
  const realIntro = realVibeSection?.summary;
  const realTldr = realVibeSection?.bullets?.slice(0, 3).map((b) => b.body).filter(Boolean);

  // Real source count for "layers · N sources" pill
  const realSourceCount = realBrief?.sources?.length;

  const [activeSection, setActiveSection] = useState('s1');
  const [showAnonCTA, setShowAnonCTA] = useState(!state.signedIn);

  const sections = [
  { id: 's1', num: '01', title: 'Quick read' },
  { id: 's2', num: '02', title: "What's happening" },
  { id: 's3', num: '03', title: 'What to watch' },
  { id: 's4', num: '04', title: 'Worth knowing' },
  { id: 's5', num: '05', title: 'Sources' }];


  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {if (e.isIntersecting) setActiveSection(e.target.id);});
      },
      { rootMargin: '-30% 0px -55% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [isRuiner]);

  const tripCountdown = 5;
  const dest = (state.destination || 'Rome').split(',')[0];

  return (
    <div className="page brief-page">
      {dontGo && <DontGoBanner voice={voice} isRuiner={isRuiner} />}

      <div className="brief-head">
        <div className="brief-head-main">
          <div className="brief-eyebrow">
            goose investigation · {voice.name.toLowerCase()} voice · IT-EN ·
            <span className="latency"> 4.2s run</span>
            {isRuiner && <span className="ruiner-badge"> · goose snob</span>}
          </div>
          <h1 className="brief-h1">
            {dest}<span className="brief-h1-dot">.</span>
            <span className="brief-h1-window"> {state.trip || 'Jun 18–25'}</span>
          </h1>

          <div className="brief-meta-row">
            <div className="countdown-badge">
              <span className="cd-num">{tripCountdown}</span>
              <span className="cd-cap">{isHi ? `दिन शेष ${dest} तक` : `sleeps to ${dest.toLowerCase()}`}</span>
            </div>
            <div className="meta-pill"><span className="mp-k">scope</span> {realBrief?.scope?.airports?.join(' · ') || 'Rome · FCO'} · {realBrief?.scope?.radius_km ?? 50} km</div>
            <div className="meta-pill"><span className="mp-k">layers</span> 5 of 5 · {realSourceCount ?? (isRuiner ? '38' : '22')} sources</div>
          </div>

          <div className="brief-actions">
            <RevoiceMenu state={state} setState={setState} />
            <button className="ghost-btn" onClick={() => {onNav('loading');}}>
              <span className="rotate-icon">↻</span> {tr.reRunBrief}
            </button>
            {isRuiner ?
            <button className="ghost-btn" onClick={() => setState((s) => ({ ...s, scenario: 'default' }))}>
                {tr.backOptimist}
              </button> :

            <button className="ghost-btn" onClick={() => setState((s) => ({ ...s, scenario: 'ruiner' }))}>
                {tr.trySnob}
              </button>
            }
            <button className="ghost-btn">{tr.pdfBtn}</button>
            <button className="ghost-btn">{tr.telegramBtn}</button>
          </div>
        </div>

        <div className={`brief-verdict-card ${dontGo ? 'warn' : ''}`}>
          <div className="verdict-bg-lines"><VerdictBgLines /></div>
          <GooseBubble side="left" tone={dontGo ? 'warn' : 'sage'}>
            <strong style={{ height: "19px" }}>{tr.verdictGoose}</strong>
            {dontGo ? voice.bubbles.ruiner_intro : voice.bubbles.verdict_go}
          </GooseBubble>
          <div className="verdict-goose">
            <PixelGoose
              outfit={voice.outfit}
              accessories={dontGo ? ['sternbrow'] : ['detective']}
              sparkle={!dontGo}
              size={voice.outfit === 'family' ? 200 : 150}
              bob />
            
          </div>
          <div className={`verdict-pill ${dontGo ? 'no' : ''}`}>
            {dontGo ? "Don't go yet" : 'Cleared — eyes open'}
          </div>
        </div>
      </div>

      {showAnonCTA &&
      <div className="anon-cta">
          <PixelGoose outfit="default" sparkle size={64} bob />
          <div>
            <strong>The goose remembers — if you let him.</strong>
            <p>Make a nest (free) and the goose keeps this brief, then re-runs it the day before you fly.</p>
          </div>
          <button className="cta-btn" onClick={() => onNav('auth')}>Make a nest →</button>
          <button className="cta-dismiss" onClick={() => setShowAnonCTA(false)} aria-label="Dismiss">×</button>
        </div>
      }

      <nav className="brief-toc">
        {sections.map((s) =>
        <a key={s.id} href={`#${s.id}`}
        className={activeSection === s.id ? 'active' : ''}
        onClick={(e) => {e.preventDefault();document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });}}>
            <span className="toc-num">{s.num}</span>
            <span className="toc-label">{s.title}</span>
          </a>
        )}
      </nav>

      <section className="section" id="s1">
        <SectionHeader num="01" title="Quick read" hint={`in ${voice.name.toLowerCase()} voice`} />
        <div className="tldr">
          <p className="tldr-intro">
            {realIntro ?? (isRuiner ? voice.bubbles.ruiner_intro + " I read everything so you don't have to. Here's why I'd reschedule." : voice.intro)}
          </p>
          <ul>
            {((realTldr && realTldr.length > 0) ? realTldr : (isRuiner ? [
            "Three independent risk signals stacked inside one week.",
            "Two of them are official. One is fresh and statistically rare.",
            "If you can move the trip ± 2 weeks, do it. If you can't, read this carefully."] :
            voice.tldr)).map((line, i) => <li key={i}>{line}</li>)}
          </ul>
        </div>
      </section>

      <Section id="s2" num="02" title="What's happening" hint={`${clusters_happening.length} clusters`}>
        {clusters_happening.map((c) => <ClusterCard key={c.id} cluster={c} />)}
      </Section>

      <Section id="s3" num="03" title="What to watch" hint="softer signals">
        {clusters_watch.map((c) => <ClusterCard key={c.id} cluster={c} />)}
      </Section>

      <Section id="s4" num="04" title="Worth knowing">
        {clusters_worth.map((c) => <ClusterCard key={c.id} cluster={c} />)}
      </Section>

      <Section id="s5" num="05" title="Sources" hint="all the receipts">
        <SourcesIndex isRuiner={isRuiner} realBrief={realBrief} />
      </Section>

      {/* Bragging rights — interesting facts you can drop at dinner */}
      <TriviaSection isRuiner={isRuiner} dest={dest} />

      <div className="brief-signoff">
        <PixelGoose outfit={voice.outfit} size={120} bob />
        <GooseBubble side="right">
          <strong>signed</strong>
          {isRuiner ? "That's the case. Sleep on it before you book." : "That's the brief. The goose has flown."}
        </GooseBubble>
      </div>

      <AudioPlayer voice={voice} audioUrl={state.brief?.audio_url} narration={buildNarration(state.brief?.brief)} />
    </div>);

}

// ─── Static demo brief view — renders the 6 pre-rendered briefs from briefs.ts
// Taste-skill design read: editorial/playful travel product, calm-but-warm,
// existing serif+pixel system. Variance 7, motion 5, density 4 (airy plates).
function MD({ children, inline = false, stripEmoji = false, linkSources = true }) {
  let text = children || '';
  // Optional: strip emojis from prose (news/advisories blocks). Targeted —
  // doesn't touch markdown syntax or [src N] refs.
  if (stripEmoji && text) {
    text = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E0}-\u{1F1FF}]️?\s?/gu, '');
  }
  let html = (typeof marked !== 'undefined' && text)
    ? (inline ? marked.parseInline(text, { gfm: true }) : marked.parse(text, { gfm: true, breaks: false }))
    : (text ? `<pre style="white-space:pre-wrap">${text.replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]))}</pre>` : '');
  // Convert [src N] markers into anchor links that scroll to sources section
  if (linkSources && html) {
    html = html.replace(/\[src\s+(\d+)(?:\s*,\s*(\d+))?(?:\s*,\s*(\d+))?\]/g, (_, a, b, c) => {
      const nums = [a, b, c].filter(Boolean);
      const links = nums.map(n => `<a class="src-ref" href="#s7" data-src-idx="${n}">${n}</a>`).join(', ');
      return `<sup class="src-refs">[${links}]</sup>`;
    });
  }
  return inline
    ? <span className="md md-inline" dangerouslySetInnerHTML={{ __html: html }} />
    : <div className="md" dangerouslySetInnerHTML={{ __html: html }} />;
}

// Split markdown bullet list into individual items
function parseBullets(md) {
  if (!md) return [];
  const lines = md.split(/\n/);
  const items = [];
  let cur = null;
  for (const l of lines) {
    if (l.startsWith('- ')) {
      if (cur) items.push(cur);
      cur = l.slice(2);
    } else if (cur && l.trim() && !l.startsWith('#')) {
      cur += '\n' + l;
    }
  }
  if (cur) items.push(cur);
  return items;
}

// Audio arrow indicator — appears bottom-left, points down-left to the audio
// player (sticky bottom). Dismisses on click of × or the whole bubble.
function AudioArrow({ onDismiss }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="audio-arrow">
      <div className="audio-arrow-bubble" onClick={() => { setHidden(true); onDismiss?.(); }}>
        <span className="audio-arrow-text">listen instead, if you don't feel like reading</span>
        <span className="audio-arrow-x" aria-label="dismiss">×</span>
      </div>
      <div className="audio-arrow-tail" aria-hidden="true">↙</div>
    </div>
  );
}

// DO NOW sticker — collapsed by default (just eyebrow + peek), expands on click.
// Hover gives a "open me" hint via small lift + glow.
function DoNowSticker({ doNowMd }) {
  const [open, setOpen] = useState(false);
  return (
    <aside
      className={`qr-plate-side ${open ? 'open' : 'closed'}`}
      onClick={() => setOpen((v) => !v)}
      role="button"
      tabIndex={0}
      aria-expanded={open}
    >
      <div className="qr-side-eyebrow">
        DO NOW
        <span className="qr-side-toggle" aria-hidden="true">{open ? '−' : '+'}</span>
      </div>
      <div className="qr-side-body">
        <MD>{doNowMd.replace(/^\*\*Do now:\*\*\s*/, '')}</MD>
      </div>
    </aside>
  );
}

// Swap-card strip — compact TL;DR of all 7 sections at top of brief.
// Tap a card → smooth-scrolls to that section. Plays into the "calm
// interpreter" promise: density on demand, not by default.
//
// Taste-skill anti-slop: no bright gradients, no glassmorphism, no equal
// 3-card grid. Horizontal scroll-snap row, each card has its own warm
// background using existing palette (paper / amber-soft / sage-soft /
// oxblood-soft / sky-tint), gentle hover lift, ink-deep hard shadow on
// hover only. Mobile = swipe.
function BriefSwapCards({ brief, totalSources }) {
  const cards = [
    {
      id: 's1',
      emoji: '☀️',
      label: 'Quick read',
      head: brief.quick_read?.weather_md?.replace(/[*_]/g, '').match(/([\d°C/ -]+)/)?.[1]?.trim() || 'Weather + UV',
      sub: brief.quick_read?.weather_md?.replace(/[*_]/g, '').slice(11, 36).trim() || 'overview',
      tone: 'paper',
    },
    {
      id: 's2',
      emoji: '📰',
      label: "What's happening",
      head: `${(brief.happening?.news_md?.match(/^- /gm) || []).length} updates`,
      sub: 'news · sports · culture',
      tone: 'amber',
    },
    {
      id: 's3',
      emoji: '📍',
      label: 'What to watch',
      head: `${(brief.watch_md?.match(/^- /gm) || []).length} picks`,
      sub: 'places + photo spots',
      tone: 'sage',
    },
    {
      id: 's4',
      emoji: '🍴',
      label: 'Places to eat',
      head: brief.eat_md?.includes('does not currently publish')
        ? 'Hotel only'
        : `${(brief.eat_md?.match(/^- /gm) || []).length} picks`,
      sub: brief.eat_md?.includes('does not currently publish') ? 'Michelin not here' : 'Michelin Guide',
      tone: 'oxblood',
    },
    {
      id: 's5',
      emoji: '🧠',
      label: 'Worth knowing',
      head: `${(brief.knowing_md?.match(/^- /gm) || []).length} tips`,
      sub: 'practical',
      tone: 'paper',
    },
    {
      id: 's6',
      emoji: '💰',
      label: 'Daily budget',
      head: `$${brief.budget_usd?.daily_mid ?? '—'}`,
      sub: 'mid · per day',
      tone: 'amber',
    },
  ];

  const jump = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Flash the section so user sees what they landed on
    el.classList.add('section-flash');
    setTimeout(() => el.classList.remove('section-flash'), 1800);
  };

  return (
    <div className="swap-cards-wrap" aria-label="Brief summary, tap a card to jump">
      <div className="swap-cards-rail">
        {cards.map((c) => (
          <button
            key={c.id}
            className={`swap-card swap-card-${c.tone}`}
            onClick={() => jump(c.id)}
            type="button"
            aria-label={`Jump to ${c.label}`}
          >
            <div className="swap-card-top">
              <span className="swap-card-emoji">{c.emoji}</span>
              <span className="swap-card-label">{c.label}</span>
            </div>
            <div className="swap-card-head">{c.head}</div>
            <div className="swap-card-sub">{c.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Interactive budget tier picker. Mid = default selected. Hover swaps preview;
// click promotes selection (sticky). Mouse-out reverts to selected.
function BudgetTiers({ budget, destination }) {
  const [selected, setSelected] = useState('mid');
  const [hovered, setHovered] = useState(null);
  const active = hovered ?? selected;

  // Tier-specific blurbs. Mid uses the brief's authored notes; cheap/splurge
  // are generated from numbers so they read naturally per city.
  const dest = destination || 'this city';
  const notes = {
    cheap: `Hostel or budget guesthouse, street food + supermarket meals, public transit only. Skip paid attractions or pick one free option per day. Walk where you can. $${budget.daily_low}/day in ${dest} buys you the trip, not the postcard — but you'll see the real place.`,
    mid: budget.notes,
    splurge: `4★+ hotel in the best neighborhood, two sit-down meals incl. one Michelin Guide pick, private driver for the day, premium attractions pre-booked. $${budget.daily_high}/day in ${dest} runs flat-out comfortable — book everything ahead and arrive with reservations in hand.`,
  };

  const tiers = [
    { id: 'cheap', label: 'Cheap', amount: budget.daily_low },
    { id: 'mid', label: 'Mid', amount: budget.daily_mid, recommended: true },
    { id: 'splurge', label: 'Splurge', amount: budget.daily_high },
  ];

  return (
    <>
      <div className="budget-cards">
        {tiers.map((t) => (
          <div
            key={t.id}
            className={`budget-card ${t.id === selected ? 'selected' : 'unselected'}`}
            onMouseEnter={() => setHovered(t.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelected(t.id)}
            role="button"
            tabIndex={0}
          >
            <div className="budget-card-tier">{t.label}</div>
            <div className="budget-card-amount">${t.amount}</div>
            <div className="budget-card-sub">
              {t.id === selected ? 'per day · your pick' : `per day${t.recommended ? ' · recommended' : ''}`}
            </div>
          </div>
        ))}
      </div>
      <p className="budget-notes" key={active}>{notes[active]}</p>
    </>
  );
}

function StaticDemoBriefView({ state, setState, onNav, voice, brief: rawBrief }) {
  const isHi = state.lang === 'hi';
  const tr = TRANSLATIONS[state.lang || 'en'];
  const brief = getLocalizedBrief(rawBrief, state.lang);
  const isDontGo = brief.dont_go === true;
  const dest = brief.destination;
  const [activeSection, setActiveSection] = useState('s1');

  const sections = [
    { id: 's1', num: '01', title: tr.tabQuickRead },
    { id: 's2', num: '02', title: tr.tabHappening },
    { id: 's3', num: '03', title: tr.tabWatch },
    { id: 's4', num: '04', title: tr.tabEat },
    { id: 's5', num: '05', title: tr.tabKnowing },
    { id: 's6', num: '06', title: tr.tabBudget },
    { id: 's7', num: '07', title: tr.tabSources },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: '-30% 0px -55% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });

    // Click handler for [src N] inline links — scroll to sources + flash
    const onSrcClick = (e) => {
      const t = e.target.closest('a.src-ref');
      if (!t) return;
      e.preventDefault();
      const idx = parseInt(t.dataset.srcIdx, 10);
      const sources = document.getElementById('s7');
      if (sources) sources.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const target = document.querySelector(`[data-src-card="${idx}"]`);
        if (target) {
          target.classList.add('src-flash');
          setTimeout(() => target.classList.remove('src-flash'), 1500);
        }
      }, 450);
    };
    document.addEventListener('click', onSrcClick);

    return () => {
      obs.disconnect();
      document.removeEventListener('click', onSrcClick);
    };
  }, []);

  const totalSources = brief.sources?.length ?? 0;
  const tripCountdown = 5;

  return (
    <div className="page brief-page demo-brief">
      {isDontGo && (
        <div className="dontgo">
          <div className="dontgo-goose">
            <PixelGoose outfit={voice.outfit} accessories={['sternbrow']} size={130} />
          </div>
          <div className="dontgo-main">
            <div className="dontgo-tag">🚨 classified signal · don't-go voice</div>
            <h2>Goose Investigation Bureau strongly advises against this trip.</h2>
            <p>Two government advisories active. Heat hospitalizes tourists every June. Air quality among the world's worst. Full case below — read it before booking.</p>
          </div>
        </div>
      )}

      <div className="brief-head">
        <div className="brief-head-main">
          <div className="brief-eyebrow">
            goose investigation · {voice.name.toLowerCase()} voice · {brief.ai_generated ? 'live llama briefing' : 'pre-rendered demo'}
          </div>
          <h1 className="brief-h1">
            {dest}<span className="brief-h1-dot">.</span>
            <span className="brief-h1-window"> {brief.trip_window}</span>
          </h1>

          <div className="brief-meta-row">
            <div className="countdown-badge">
              <span className="cd-num">{tripCountdown}</span>
              <span className="cd-cap">sleeps to {dest.toLowerCase()}</span>
            </div>
            <div className="meta-pill"><span className="mp-k">voice</span> {voice.name}</div>
            <div className="meta-pill"><span className="mp-k">sources</span> {totalSources} verified</div>
            {brief.ai_generated && (
              <div className="meta-pill"><span className="mp-k">⚡ generated live by</span> Llama</div>
            )}
            <div className="meta-pill meta-pill-saved">
              <span className="mp-k">saved you</span> {(() => {
                const m = state.savedMinutes ?? 360;
                return m >= 60 ? `~${(m / 60).toFixed(1)} hours` : `~${m} minutes`;
              })()} of doomscrolling
            </div>
          </div>

          <div className="brief-actions">
            <button className="ghost-btn" onClick={() => onNav('landing')}>← New search</button>
            <button className="ghost-btn">{tr.pdfBtn}</button>
          </div>
        </div>

        <div className={`brief-verdict-card ${isDontGo ? 'warn' : ''}`}>
          <div className="verdict-bg-lines"><VerdictBgLines /></div>
          <div className="verdict-goose">
            <PixelGoose
              outfit={voice.outfit}
              accessories={isDontGo ? ['sternbrow'] : ['detective']}
              sparkle={!isDontGo}
              size={voice.outfit === 'family' ? 200 : 150}
              bob />
          </div>
          <div className={`verdict-pill ${isDontGo ? 'no' : ''}`}>
            {isDontGo ? tr.dontGoYet : tr.clearedEyesOpen}
          </div>
        </div>
      </div>

      <BriefSwapCards brief={brief} totalSources={totalSources} />

      <nav className="brief-toc">
        {sections.map((s) =>
          <a key={s.id} href={`#${s.id}`}
            className={activeSection === s.id ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(s.id);
              if (!el) return;
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              el.classList.add('section-flash');
              setTimeout(() => el.classList.remove('section-flash'), 1800);
            }}>
            <span className="toc-num">{s.num}</span>
            <span className="toc-label">{s.title}</span>
          </a>
        )}
      </nav>

      {/* ── 01 Quick read ── weather/UV/budget mini-plates LEFT + DO NOW sticky RIGHT */}
      <section className="section" id="s1">
        <SectionHeader num="01" title="Quick read" hint={`in ${voice.name.toLowerCase()} voice`} />
        <div className="qr-grid">
          <div className="qr-left">
            {brief.weather_stats ? (
              <>
                {/* Clean visual weather — just the numbers, no paragraphs */}
                <div className="wx-card">
                  <div className="wx-icon" aria-hidden>{brief.weather_stats.icon}</div>
                  <div className="wx-main">
                    <div className="wx-temp">{brief.weather_stats.temp}</div>
                    <div className="wx-cond">{brief.weather_stats.condition}</div>
                  </div>
                  <div className="wx-meta">
                    <span>↑ {brief.weather_stats.high}</span>
                    <span>↓ {brief.weather_stats.low}</span>
                    <span>☂ {brief.weather_stats.rainOdds}</span>
                    <span>🔆 UV {brief.weather_stats.uv}</span>
                  </div>
                </div>
                <div className="qr-budget-plate">
                  <div className="qr-mini-label">Daily budget</div>
                  <div className="qr-mini-body wx-budget-line">{brief.budget_stats?.avgDaily}</div>
                </div>
              </>
            ) : (
              <>
                <div className="qr-mini-grid">
                  <div className="qr-mini-plate">
                    <div className="qr-mini-label">Weather</div>
                    <div className="qr-mini-body">
                      <MD inline>{brief.quick_read.weather_md.replace(/^\*\*Weather:\*\*\s*/, '')}</MD>
                    </div>
                  </div>
                  <div className="qr-mini-plate">
                    <div className="qr-mini-label">UV</div>
                    <div className="qr-mini-body">
                      <MD inline>{brief.quick_read.uv_md.replace(/^\*\*UV:\*\*\s*/, '')}</MD>
                    </div>
                  </div>
                </div>
                <div className="qr-source-note" role="note" aria-label="Source notice">
                  <MD inline>{brief.quick_read.uv_advisory_md.replace(/📎\s*/g, '')}</MD>
                </div>
                <div className="qr-budget-plate">
                  <div className="qr-mini-label">Daily budget</div>
                  <div className="qr-mini-body">
                    <MD inline>{brief.quick_read.budget_hint_md}</MD>
                  </div>
                </div>
                <div className="qr-restaurant-hook"><MD>{brief.quick_read.restaurant_hook_md}</MD></div>
              </>
            )}
          </div>
          <DoNowSticker doNowMd={brief.quick_read.do_now_md} />
        </div>

        {/* Wide goose-talk block — sits between Quick Read and What's Happening */}
        <div className="goose-talk">
          <MD>{brief.quick_read.intro_md}</MD>
        </div>
      </section>

      {/* ── 02 What's happening ── news + sports stacked, entertainment grid */}
      <section className="section" id="s2">
        <SectionHeader num="02" title="What's happening" hint="news · sports · entertainment" />

        <div className="happening-block">
          <div className="happening-tag happening-tag-news">News + advisories</div>
          <div className="happening-news">
            {parseBullets(brief.happening.news_md).map((bullet, i) => (
              <div key={i} className="news-item">
                <MD stripEmoji>{bullet}</MD>
              </div>
            ))}
          </div>
        </div>

        {brief.happening.sports_md && (
          <div className="happening-block">
            <div className="happening-tag happening-tag-sports">Sports</div>
            <div className="sports-grid">
              {parseBullets(brief.happening.sports_md).map((bullet, i) => (
                <div key={i} className="sport-card">
                  <MD>{bullet}</MD>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="happening-block">
          <div className="happening-tag happening-tag-entertainment">Entertainment + culture</div>
          <div className="entertainment-grid">
            {parseBullets(brief.happening.entertainment_md).map((bullet, i) => (
              <div key={i} className="ent-card">
                <MD>{bullet}</MD>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 What to watch ── photo cards when available, else text grid */}
      <section className="section" id="s3">
        <SectionHeader num="03" title="What to watch" hint="famous places" />
        {brief.places_with_images?.length > 0 ? (
          <div className="places-grid">
            {brief.places_with_images.map((p, i) => (
              <div key={i} className="place-card">
                <div className="place-img" style={{ backgroundImage: `url(${p.image})` }}>
                  <span className="place-badge" style={{ background: p.badgeColor || '#E8A437' }}>{p.badge}</span>
                </div>
                <div className="place-body">
                  <div className="place-tag">{p.tag}</div>
                  <h3 className="place-name">{p.name}</h3>
                  <p className="place-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="watch-grid">
            {parseBullets(brief.watch_md).map((bullet, i) => (
              <div key={i} className="watch-card">
                <MD>{bullet}</MD>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── 04 Places to eat ── clean dish cards when available, else markdown */}
      <section className="section" id="s4">
        <SectionHeader num="04" title="Places to eat" hint="local favourites" />
        {brief.famous_eats?.length > 0 ? (
          <div className="eats-grid">
            {brief.famous_eats.map((e, i) => (
              <div key={i} className="eat-tile">
                <div className="eat-dish">🍽 {e.dish}</div>
                <div className="eat-name">{e.name}</div>
                <div className="eat-price">{e.price}</div>
                <p className="eat-tip">{e.tip}</p>
              </div>
            ))}
          </div>
        ) : brief.eat_md.includes('does not currently publish') ? (
          <div className="eat-empty"><MD>{brief.eat_md}</MD></div>
        ) : (
          <>
            <div className="eat-intro"><MD>{brief.eat_md.split('\n\n')[0]}</MD></div>
            <div className="eat-grid">
              {parseBullets(brief.eat_md).map((bullet, i) => (
                <div key={i} className="eat-card">
                  <MD>{bullet}</MD>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* ── 05 Worth knowing ── card grid */}
      <section className="section" id="s5">
        <SectionHeader num="05" title="Worth knowing" hint="practical" />
        <div className="knowing-grid">
          {parseBullets(brief.knowing_md).map((bullet, i) => (
            <div key={i} className="knowing-card">
              <MD>{bullet}</MD>
            </div>
          ))}
        </div>
      </section>

      {/* ── 06 Daily budget ── clean single figure when stats available */}
      <section className="section" id="s6">
        <SectionHeader num="06" title="Daily budget" hint={brief.budget_stats ? 'per day' : 'USD per day'} />
        {brief.budget_stats ? (
          <div className="budget-simple">
            <div className="budget-simple-main">
              <div className="budget-simple-amount">{brief.budget_stats.avgDaily}</div>
              <div className="budget-simple-cap">average per day</div>
            </div>
            <div className="budget-simple-tiers">
              <span className="bst">💸 {brief.budget_stats.low} <em>budget</em></span>
              <span className="bst">😌 {brief.budget_stats.mid} <em>comfy</em></span>
              <span className="bst">✨ {brief.budget_stats.high} <em>splurge</em></span>
            </div>
            <p className="budget-notes">{brief.budget_stats.note}</p>
          </div>
        ) : (
          <BudgetTiers budget={brief.budget_usd} destination={dest} />
        )}
      </section>

      <section className="section" id="s7">
        <SectionHeader num="07" title="Sources" hint={`${totalSources} verified`} />
        <div className="cluster">
          <p className="body" style={{ margin: '0 0 14px' }}>
            Every line in this brief links to one of these {totalSources} sources. The goose visited every URL personally.
          </p>
          <div className="src-index">
            {brief.sources.map((s, i) =>
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className="src-card" data-src-card={i + 1}>
                <span className="src-favicon">{String(i + 1).padStart(2, '0')}</span>
                <span className="src-name">{s.label}</span>
                <span className="src-count">↗</span>
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="brief-signoff">
        <PixelGoose outfit={voice.outfit} size={120} bob />
        <GooseBubble side="right">
          <strong>signed</strong>
          {isDontGo ? "We've done the research. You haven't been told. End of signal." : "That's the brief. The goose has flown."}
        </GooseBubble>
      </div>

      <AudioArrow />
      <AudioPlayer voice={voice} audioUrl={state.brief?.audio_url} narration={buildNarration(brief)} />
    </div>
  );
}

function RevoiceMenu({ state, setState }) {
  const [open, setOpen] = useState(false);
  const voice = VOICES.find((v) => v.id === state.voiceId) || VOICES[0];
  return (
    <div className="revoice">
      <button className="ghost-btn" onClick={() => setOpen((o) => !o)}>
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <PixelGoose outfit={voice.outfit} size={26} />
        </span>
        Re-voice
        <span style={{ opacity: .5 }}>▾</span>
      </button>
      {open &&
      <div className="revoice-pop" onMouseLeave={() => setOpen(false)}>
          <div className="revoice-head">Pick a different goose</div>
          {VOICES.map((v) =>
        <button key={v.id}
        className={`revoice-row ${v.id === state.voiceId ? 'selected' : ''}`}
        onClick={() => {setState((s) => ({ ...s, voiceId: v.id }));setOpen(false);}}>
              <PixelGoose outfit={v.outfit} size={40} />
              <div>
                <div className="rr-name">{v.name}</div>
                <div className="rr-tag">{v.tag}</div>
              </div>
              {v.id === state.voiceId && <span className="rr-check">✓</span>}
            </button>
        )}
        </div>
      }
    </div>);

}

function Section({ id, num, title, hint, children }) {
  return (
    <section className="section" id={id}>
      <SectionHeader num={num} title={title} hint={hint} />
      <div className="cluster-grid">{children}</div>
    </section>);

}
function SectionHeader({ num, title, hint }) {
  return (
    <div className="section-h">
      <span className="num">{num}</span>
      <h2>{title}</h2>
      {hint && <span className="hint">{hint}</span>}
    </div>);

}

function ClusterCard({ cluster }) {
  const [open, setOpen] = useState(false);
  const div = cluster.layer_diversity;
  return (
    <article className="cluster">
      <div className="cluster-head">
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3>{cluster.title}</h3>
          <p className="body">{cluster.interpretation}</p>
        </div>
      </div>
      <div className="meta-row">
        <span className={`conf-pill conf-${cluster.confidence}`}>
          {cluster.confidence.replace('_', ' ')}
        </span>
        <span className="diversity">
          <span className="bars">
            {[0, 1, 2, 3, 4].map((i) => <i key={i} className={i < div ? 'on' : ''} />)}
          </span>
          {cluster.sources.length} sources · {div} layer{div > 1 ? 's' : ''}
        </span>
        {cluster.needs_disclaimer &&
        <span className="disclaimer-pill" title="Single-source signal — treat as soft.">
            single-source · soft signal
          </span>
        }
        <span style={{ flex: 1 }} />
        <button className={`sources-toggle ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)}>
          <span className="chev">▸</span> {open ? 'Hide' : 'Show'} sources
        </button>
      </div>
      <div className={`sources-list ${open ? 'open' : ''}`}>
        {cluster.sources.map((s, i) =>
        <a key={i} href="#" onClick={(e) => e.preventDefault()} className="source-row">
            <span className="source-favicon">{s.fav}</span>
            <span><span className="source-pub">{s.publisher}</span> · <span className="source-title">{s.title}</span></span>
            <span className="source-date">{s.date}</span>
            <span style={{ color: 'var(--muted)' }}>↗</span>
          </a>
        )}
      </div>
    </article>);

}

function TriviaSection({ isRuiner, dest }) {
  const facts = TRIVIA[isRuiner ? 'ruiner' : 'default'] || TRIVIA.default;
  return (
    <section className="trivia-section" aria-label="Bragging-rights facts">
      <div className="trivia-head">
        <div>
          <div className="trivia-eyebrow">bragging rights · drop at dinner</div>
          <h2 className="trivia-h2">Insanely cool facts about <em>{dest.toLowerCase()}</em>.</h2>
        </div>
        <p className="trivia-sub">
          For when someone says "oh you're going to {dest}?" and you want to sound like you've been.
        </p>
      </div>
      <div className="trivia-grid">
        {facts.map((f, i) =>
        <div key={i} className="trivia-card">
            <div className="trivia-emoji">{f.emoji}</div>
            <div className="trivia-tag">{f.tag}</div>
            <p className="trivia-text">{f.label}</p>
          </div>
        )}
      </div>
    </section>);

}

function SourcesIndex({ isRuiner, realBrief }) {
  // Phase 11 design integration — render real backend sources when present.
  if (realBrief?.sources && realBrief.sources.length > 0) {
    const byPub = {};
    realBrief.sources.forEach((s) => {
      const pub = s.publisher ?? 'source';
      byPub[pub] = (byPub[pub] || 0) + 1;
    });
    const list = Object.entries(byPub).sort((a, b) => b[1] - a[1]);
    const total = realBrief.sources.length;
    return (
      <div className="cluster">
        <p className="body" style={{ margin: '0 0 14px' }}>
          Every line in this brief traces back to one of these {total} sources, across {Object.keys(byPub).length} publishers.
          The goose visited every URL personally.
        </p>
        <div className="src-index">
          {list.map(([pub, n]) => {
            const firstSrc = realBrief.sources.find((s) => (s.publisher ?? 'source') === pub);
            return (
              <a key={pub} href={firstSrc?.url ?? '#'}
                target="_blank" rel="noopener noreferrer"
                className="src-card">
                <span className="src-favicon">{pub.slice(0, 2).toUpperCase()}</span>
                <span className="src-name">{pub}</span>
                <span className="src-count">×{n}</span>
              </a>);
          })}
        </div>
      </div>);
  }

  const data = isRuiner ?
  [...RUINER_CLUSTERS_HAPPENING, ...RUINER_CLUSTERS_WATCH, ...RUINER_CLUSTERS_WORTH] :
  [...CLUSTERS_HAPPENING, ...CLUSTERS_WATCH, ...CLUSTERS_WORTH];
  const all = data.flatMap((c) => c.sources);
  const byPub = {};
  all.forEach((s) => {byPub[s.publisher] = (byPub[s.publisher] || 0) + 1;});
  const list = Object.entries(byPub).sort((a, b) => b[1] - a[1]);
  return (
    <div className="cluster">
      <p className="body" style={{ margin: '0 0 14px' }}>
        Every line in this brief traces back to one of these {all.length} sources, across {Object.keys(byPub).length} publishers.
        The goose visited every URL personally.
      </p>
      <div className="src-index">
        {list.map(([pub, n]) =>
        <a key={pub} href="#" onClick={(e) => e.preventDefault()} className="src-card">
            <span className="src-favicon">{pub.slice(0, 2).toUpperCase()}</span>
            <span className="src-name">{pub}</span>
            <span className="src-count">×{n}</span>
          </a>
        )}
      </div>
    </div>);

}

function DontGoBanner({ voice, isRuiner }) {
  return (
    <div className="dontgo">
      {/* Seagulls flying above the banner — ruiner-flavor atmosphere */}
      {isRuiner &&
      <div className="dontgo-gulls" aria-hidden>
          <Seagull size={22} style={{ position: 'absolute', top: 12, left: '14%' }} />
          <Seagull size={18} style={{ position: 'absolute', top: 26, left: '24%', opacity: .7 }} />
          <Seagull size={20} style={{ position: 'absolute', top: 8, left: '38%' }} />
          <Seagull size={16} style={{ position: 'absolute', top: 32, left: '46%', opacity: .6 }} />
          <Seagull size={22} style={{ position: 'absolute', top: 16, right: '12%' }} />
        </div>
      }
      <div className="dontgo-goose">
        <PixelGoose outfit={voice.outfit} accessories={['sternbrow']} size={130} />
      </div>
      <div className="dontgo-main">
        <div className="dontgo-tag">layer A · very high · official</div>
        <h2>{isRuiner ? "I'd reschedule. Here's the case." : "Multiple advisories flag risk."}</h2>
        <p>
          {isRuiner ?
          "Four government sources have raised their travel level inside the last 96 hours, and three independent stories below stack on top of that. I'm not amplifying. I'm surfacing. Read each link before booking." :
          "Three government sources have raised their travel level inside the last 96 hours. I'm surfacing this calmly because the underlying records say so. Read each link before committing."}
        </p>
        <div className="sources-mini">
          {(isRuiner ? RUINER_DONTGO_SOURCES : RUINER_DONTGO_SOURCES.slice(0, 3)).map((s, i) =>
          <a key={i} href="#" onClick={(e) => e.preventDefault()}>{s.flag} {s.label}</a>
          )}
        </div>
      </div>
    </div>);

}

// Builds a ~60-second spoken narration from a brief's known schema.
// Used by AudioPlayer when no pre-rendered audio file exists — the brief is
// narrated live by the browser's speech engine, tuned per voice persona.
function buildNarration(brief) {
  if (!brief) return '';
  const strip = (md = '') => md.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/^[\s\-*>#_]+/gm, '').trim();
  const parts = [];
  const q = brief.quick_read || {};
  if (brief.destination) parts.push(`Here is your pre-trip brief for ${brief.destination}.`);
  if (q.intro_md) parts.push(strip(q.intro_md));
  const w = brief.weather_stats;
  if (w?.temp) parts.push(`Weather: ${w.temp}, ${w.condition}. High of ${w.high}, low of ${w.low}. UV index ${w.uv}.`);
  else if (q.weather_md) parts.push(strip(q.weather_md));
  const b = brief.budget_stats;
  if (b?.avgDaily) parts.push(`Budget: around ${b.avgDaily} per day. ${b.note || ''}`);
  const places = brief.places_with_images || [];
  if (places.length) parts.push(`Top places to see: ${places.map((p) => p.name).join(', ')}.`);
  const eats = brief.famous_eats || [];
  if (eats.length) parts.push(`Where to eat: ${eats.map((e) => `${e.name}, for ${e.dish}`).join('. ')}.`);
  if (q.do_now_md) {
    const tips = strip(q.do_now_md).split('\n').map((t) => t.trim()).filter(Boolean).slice(0, 4);
    if (tips.length) parts.push(`Before you go: ${tips.join('. ')}.`);
  }
  parts.push("That's the brief. The goose has flown.");
  return parts.join(' ');
}

// Persona flavor for browser speech — pitch per voice id.
const TTS_PITCH = { jarvis: 0.9, bro: 1.1, bestie: 1.3, family: 1.0, pet_parent: 1.2, dont_go: 0.7, ruiner: 0.7 };

function AudioPlayer({ voice, audioUrl, narration }) {
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [speed, setSpeed] = useState('1.0');
  const [dragging, setDragging] = useState(false);
  const [total, setTotal] = useState(38);
  const trackRef = useRef(null);
  const audioRef = useRef(null);
  const utterRef = useRef(null);
  const posRef = useRef(0);
  useEffect(() => { posRef.current = pos; }, [pos]);

  // TTS mode: no audio file, but narration text + browser speech synthesis.
  const useTts = !audioUrl && !!narration && typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Bind real HTMLAudioElement when audioUrl present. Falls back to live
  // speech synthesis (TTS) when narration exists, mock animation otherwise.
  useEffect(() => {
    if (!audioUrl) return;
    const a = new Audio(audioUrl);
    audioRef.current = a;
    const onMeta = () => { if (a.duration && isFinite(a.duration)) setTotal(a.duration); };
    const onTime = () => setPos(a.currentTime);
    const onEnd = () => { setPlaying(false); setPos(0); };
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('ended', onEnd);
    return () => {
      a.pause();
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('ended', onEnd);
      audioRef.current = null;
    };
  }, [audioUrl]);

  // TTS: estimate spoken duration (~150 wpm at 1.0×); stop speech on change/unmount.
  useEffect(() => {
    if (!useTts) return;
    const words = narration.split(/\s+/).filter(Boolean).length;
    setTotal(Math.max(20, Math.round(words / 2.5)));
    return () => window.speechSynthesis.cancel();
  }, [narration, useTts]);

  const speakFrom = (charOffset) => {
    const u = new SpeechSynthesisUtterance(narration.slice(charOffset));
    u.rate = parseFloat(speed);
    u.pitch = TTS_PITCH[voice?.id] ?? 1.0;
    u.onboundary = (e) => {
      if (typeof e.charIndex === 'number') {
        setPos(((charOffset + e.charIndex) / narration.length) * total);
      }
    };
    u.onend = () => {
      if (utterRef.current !== u) return; // superseded by seek/speed restart
      utterRef.current = null;
      setPlaying(false);
      setPos(0);
    };
    u.onerror = () => { if (utterRef.current === u) { utterRef.current = null; setPlaying(false); } };
    utterRef.current = u;
    window.speechSynthesis.cancel(); // previous utterance's onend is ignored via ref check
    window.speechSynthesis.speak(u);
  };

  // Real playback control when bound to HTMLAudioElement, TTS, or mock
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = parseFloat(speed);
      if (playing) audioRef.current.play().catch(() => setPlaying(false));
      else audioRef.current.pause();
      return;
    }
    if (useTts) {
      if (playing) {
        if (window.speechSynthesis.paused && utterRef.current) window.speechSynthesis.resume();
        else speakFrom(Math.round((posRef.current / total) * narration.length) || 0);
      } else if (utterRef.current) {
        window.speechSynthesis.pause();
      }
      return;
    }
    // Mock animation fallback
    if (!playing || dragging) return;
    const step = parseFloat(speed);
    const ivl = setInterval(() => {
      setPos((p) => {
        const next = p + step / 4;
        if (next >= total) {setPlaying(false);return 0;}
        return next;
      });
    }, 250);
    return () => clearInterval(ivl);
  }, [playing, speed, dragging, audioUrl]);

  const seekFromEvent = (e) => {
    const r = trackRef.current.getBoundingClientRect();
    const x = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const ratio = Math.max(0, Math.min(1, (x - r.left) / r.width));
    const next = ratio * total;
    setPos(next);
    if (audioRef.current) audioRef.current.currentTime = next;
    else if (useTts && playing) speakFrom(Math.round(ratio * narration.length));
  };

  const onDown = (e) => {setDragging(true);seekFromEvent(e);};
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => seekFromEvent(e);
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s) % 60).padStart(2, '0')}`;
  const cycleSpeed = () => setSpeed((s) => s === '1.0' ? '1.25' : s === '1.25' ? '1.5' : '1.0');
  const pct = pos / total * 100;

  const bars = useMemo(() => Array.from({ length: 56 }).map((_, i) => 18 + 16 * Math.abs(Math.sin(i * 0.5 + i * i * 0.04))), []);

  return (
    <div className="audio-bar">
      <button className="audio-play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
        {playing ?
        <svg width="14" height="14" viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" fill="currentColor" /><rect x="14" y="5" width="4" height="14" fill="currentColor" /></svg> :

        <svg width="14" height="14" viewBox="0 0 24 24"><polygon points="7,5 19,12 7,19" fill="currentColor" /></svg>
        }
      </button>

      <div className="audio-goose">
        <PixelGoose outfit={voice.outfit} accessories={['headphones']} size={50} />
      </div>

      <div className="audio-track">
        <div className="audio-meta">
          <span className="audio-name">narrated by the goose — {voice.name.toLowerCase()} voice</span>
          <span>{fmt(pos)} / {fmt(total)}</span>
        </div>
        <div className="audio-wave" ref={trackRef} onMouseDown={onDown} onTouchStart={onDown}>
          {bars.map((h, i) => {
            const active = i / bars.length * 100 <= pct;
            return <span key={i} className={`wb ${active ? 'on' : ''}`} style={{ height: h + 'px' }} />;
          })}
          <div className="audio-head" style={{ left: pct + '%' }} />
        </div>
      </div>

      <button className="audio-speed" onClick={cycleSpeed}>{speed}×</button>
    </div>);

}

// ============================================================
// SETTINGS
// ============================================================
function SettingsView({ state, setState }) {
  return (
    <div className="page narrow">
      <div className="brief-eyebrow">settings</div>
      <h1 className="settings-h1">How loud should the goose be?</h1>

      <div className="settings-card">
        <h3>Default voice</h3>
        <p className="help">The voice your briefs and audio default to. You can re-voice any brief without re-querying.</p>
        <VoicePicker voiceId={state.voiceId} onChange={(id) => setState((s) => ({ ...s, voiceId: id }))} />
      </div>

      <div className="settings-card">
        <h3>Default language</h3>
        <p className="help">Used for both written and narrated output.</p>
        <div className="field">
          <select defaultValue="en">
            <option value="en">English</option>
            <option value="it">Italiano</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
            <option value="pt">Português</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </div>

      <div className="settings-card">
        <h3>Audio</h3>
        <p className="help">Whether the sticky audio player is on when a brief opens.</p>
        <label className="toggle">
          <input type="checkbox" defaultChecked />
          <span className="track" />
          <span style={{ fontSize: 14, fontWeight: 500 }}>Audio on by default</span>
        </label>
      </div>

      <div className="settings-card">
        <h3>Telegram drop</h3>
        <p className="help">Optionally get the brief as a Telegram message. The goose won't DM you anything else.</p>
        <div className="field">
          <label>Telegram username</label>
          <div style={{ display: 'flex', gap: 10 }}>
            <input type="text" placeholder="@yourhandle" style={{ flex: 1 }} />
            <button className="ghost-btn">Verify</button>
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h3>Pre-trip nudge</h3>
        <p className="help">The goose can re-run your latest brief the day before you fly, and message you if anything material shifted.</p>
        <label className="toggle">
          <input type="checkbox" defaultChecked />
          <span className="track" />
          <span style={{ fontSize: 14, fontWeight: 500 }}>Re-run 24h before departure</span>
        </label>
      </div>

      <div className="settings-card">
        <h3>Account</h3>
        <div className="field">
          <label>Email</label>
          <input type="email" defaultValue="you@calmly.travel" readOnly />
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <button className="ghost-btn">Change password</button>
          <button className="ghost-btn" style={{ color: 'var(--oxblood)', borderColor: 'var(--oxblood)' }}>Sign out</button>
        </div>
      </div>
    </div>);

}

// ============================================================
// HISTORY
// ============================================================
function HistoryView({ state, onOpen, onNav }) {
  // Phase 11 design integration — fetch user's briefs from /api/history.
  // Empty array (signed-out user) → graceful fallback to the canned HISTORY
  // demo set so the layout still demos. Signed-in user → real briefs from
  // Supabase, scoped via auth.uid().
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/history')
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        if (Array.isArray(data) && data.length > 0) {
          // Augment with synthetic verdict + teaser for design parity
          const augmented = data.map((b) => ({
            ...b,
            verdict: deriveVerdictFromVibe(b.vibe),
            teaser: extractTeaserFromBrief(b.json_brief),
            created: relativeTime(b.created_at),
          }));
          setItems(augmented);
        } else {
          setItems([]); // signed-out OR no briefs yet
        }
      })
      .catch((e) => {
        if (alive) setError(String(e.message ?? e));
      });
    return () => { alive = false; };
  }, []);

  // Loading state
  if (items === null) {
    return (
      <div className="page">
        <div className="brief-eyebrow">history</div>
        <h1 className="settings-h1">Loading recent gooseings…</h1>
      </div>);

  }

  // Empty state — show canned demo HISTORY for unsigned users
  const display = items.length > 0 ? items : HISTORY;

  return (
    <div className="page">
      <div className="brief-eyebrow">history · {display.length} of 20 saved</div>
      <h1 className="settings-h1">Recent gooseings.</h1>
      <p className="history-lede">
        {items.length > 0 ?
        "Your saved briefs. Sources are cached — the goose remembers. Click any one to re-open it." :
        "Sign in to save your briefs across devices. Demo history below."}
      </p>
      {error && <div style={{ color: 'var(--oxblood)', fontSize: 13, marginBottom: 12 }}>{error}</div>}
      <div className="history-grid">
        {display.map((h) =>
        <button key={h.id} className={`history-card v-${h.verdict ?? 'go'}`} onClick={() => onOpen(h)}>
            <div className="hist-top">
              <div className="hist-goose">
                <PixelGoose outfit={h.outfit ?? h.voice ?? 'jarvis'} size={(h.outfit ?? h.voice) === 'family' ? 80 : 60} />
              </div>
              <div className="hist-name">
                <div className="hist-dest">{h.dest}</div>
                <div className="hist-meta">
                  <span>{h.when}</span><span>·</span>
                  <span className="voice">{h.voice}</span>
                  {h.created && <><span>·</span><span>{h.created}</span></>}
                </div>
              </div>
              <span className={`hist-verdict v-${h.verdict ?? 'go'}`}>
                {(h.verdict ?? 'go') === 'go' ? 'Cleared' : h.verdict === 'caution' ? 'Caution' : 'Re-read'}
              </span>
            </div>
            <p className="hist-teaser">{h.teaser ?? '—'}</p>
          </button>
        )}
      </div>
    </div>);

}

function deriveVerdictFromVibe(vibe) {
  if (!vibe) return 'go';
  if (vibe === 'unstable' || vibe === 'disrupted') return 'caution';
  if (vibe === 'tense') return 'caution';
  return 'go';
}

function extractTeaserFromBrief(brief) {
  if (!brief || typeof brief !== 'object') return '—';
  const sections = brief.sections ?? [];
  const vibeSection = sections.find((s) => s.id === 'vibe');
  return vibeSection?.summary ?? brief.summary ?? '—';
}

function relativeTime(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    const diffMs = Date.now() - d.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

// ============================================================
// AUTH
// ============================================================
function AuthView({ onNav }) {
  const [mode, setMode] = useState('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [confirmationSent, setConfirmationSent] = useState(false);

  // Phase 11 design integration — POST /api/auth/signup or signin.
  // Signup success with requires_confirmation: true → playful modal asking
  // user to click email link. Signin success → /bureau/ redirect.
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const path = mode === 'signin' ? '/api/auth/signin' : '/api/auth/signup';
      const res = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? data.message ?? `auth ${res.status}`);
      if (mode === 'signup' && data.requires_confirmation) {
        setConfirmationSent(true);
        return;
      }
      window.location.href = '/bureau/';
    } catch (err) {
      setError(String(err.message ?? err));
    } finally {
      setSubmitting(false);
    }
  };

  const onGoogle = () => {
    // OAuth Google sign-in — /auth/oauth?provider=google triggers Supabase OAuth
    // flow, callback writes session cookie, returns to /bureau/.
    window.location.href = '/api/auth/oauth?provider=google&redirect=/bureau/';
  };

  if (confirmationSent) {
    return (
      <div className="auth-wrap">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <div className="auth-goose">
            <PixelGoose outfit="default" sparkle size={140} bob />
          </div>
          <div style={{ height: 50 }} />
          <h2>Goose is on its way.</h2>
          <p className="sub" style={{ marginBottom: 22 }}>
            We sent a confirmation honk to <strong style={{ color: 'var(--ink)' }}>{email}</strong>.
            Tap the link to prove you're a real human and not a sneaky little gremlin.
            (Anti-spy protocol, very serious, the goose insists.)
          </p>
          <div style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 12,
            color: 'var(--muted)',
            letterSpacing: 1,
            textTransform: 'uppercase',
            marginBottom: 22,
          }}>
            check your inbox · also peek in spam · the goose is shy about borders
          </div>
          <button
            type="button"
            className="ghost-btn"
            style={{ width: '100%', justifyContent: 'center', marginBottom: 10 }}
            onClick={() => onNav('landing')}>
            Back to the bureau
          </button>
          <button
            type="button"
            className="ghost-btn"
            style={{ width: '100%', justifyContent: 'center', fontSize: 12.5 }}
            onClick={() => { setConfirmationSent(false); setMode('signin'); }}>
            Already confirmed? Sign in →
          </button>
        </div>
      </div>);

  }

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={onSubmit}>
        <div className="auth-goose">
          <PixelGoose outfit="default" sparkle size={120} bob />
        </div>
        <div style={{ height: 50 }} />
        <h2>{mode === 'signin' ? 'Welcome back.' : 'Make a nest.'}</h2>
        <p className="sub">
          {mode === 'signin' ?
          "Sign in to keep your briefs and the goose's long memory across devices." :
          "It's free. The goose saves your briefs, re-runs them before you fly, and never emails you anything else."}
        </p>

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email" />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            minLength={8} />
        </div>

        {mode === 'signin' &&
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
            <a href="/auth/reset" style={{ fontSize: 12.5, color: 'var(--muted)' }}>Forgot password?</a>
          </div>
        }

        {error &&
        <div style={{
          color: 'var(--oxblood)', fontSize: 13, marginBottom: 12,
          padding: '8px 12px', background: 'var(--oxblood-soft)', borderRadius: 6,
        }}>{error}</div>
        }

        <button
          type="submit"
          disabled={submitting}
          className="submit-btn"
          style={{ width: '100%', padding: '12px 0', justifyContent: 'center', opacity: submitting ? 0.6 : 1 }}>
          {submitting ? 'One sec…' : (mode === 'signin' ? 'Sign in' : 'Make my nest')} <span className="arrow">→</span>
        </button>

        <div className="auth-divider">or</div>

        <button type="button" className="ghost-btn" style={{ width: '100%', justifyContent: 'center', marginBottom: 10 }} onClick={onGoogle}>
          Continue with Google
        </button>

        <button type="button" className="ghost-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onNav('landing')}>
          Continue without an account
        </button>

        <p style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 18, textAlign: 'center' }}>
          {mode === 'signin' ?
          <>New here? <a href="#" onClick={(e) => {e.preventDefault();setMode('signup');}} style={{ color: 'var(--ink)' }}>Make a nest →</a></> :
          <>Already nested? <a href="#" onClick={(e) => {e.preventDefault();setMode('signin');}} style={{ color: 'var(--ink)' }}>Sign in →</a></>}
        </p>
      </form>
    </div>);

}


export {
  TopBar, LandingView, LoadingView, BriefView, StaticDemoBriefView,
  SettingsView, HistoryView, AuthView,
  WorldBackground, GroundBand, Train, Camper, SchoolBus, Cow, Sheep,
  CitySkyline, HeroGooseStage, PurposeStrip, VoicePicker, DontGoBanner,
  VerdictBgLines, RevoiceMenu, adaptBackendBrief, MD
};

if (typeof window !== "undefined") {
  Object.assign(window, {
    TopBar, LandingView, LoadingView, BriefView, StaticDemoBriefView,
    SettingsView, HistoryView, AuthView,
    WorldBackground, GroundBand, Train, Camper, SchoolBus, Cow, Sheep,
    CitySkyline, HeroGooseStage, PurposeStrip, VoicePicker, DontGoBanner,
    VerdictBgLines, RevoiceMenu, adaptBackendBrief, MD
  });
}
