import React from "react";
/* eslint-disable */
// Smooth Goose — illustrated SVG with 5+ distinct personas + accessory props.
// Replaces the old pixel sprite system; keeps the same component name (PixelGoose)
// so existing call sites continue to work.

const __SG_OUTLINE = '#0F1726';
const __SG_OUTLINE_W = 3;

// ── Shared parts ─────────────────────────────────────────────────────────────
function GooseLegs() {
  return (
    <g className="g-legs">
      <rect x="86" y="200" width="9" height="32" fill="#D9A441" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      <rect x="112" y="200" width="9" height="32" fill="#D9A441" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      <ellipse cx="90" cy="232" rx="20" ry="6" fill="#D9A441" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      <ellipse cx="116" cy="232" rx="20" ry="6" fill="#D9A441" stroke={__SG_OUTLINE} strokeWidth="2.5" />
    </g>);

}

function GooseBody({ bodyCol = '#FAF7F0' }) {
  const wingCol = bodyCol === '#FAF7F0' ? '#F0E9D3' : '#FAF7F0';
  return (
    <g className="g-body">
      <ellipse cx="108" cy="165" rx="72" ry="56" fill={bodyCol} stroke={__SG_OUTLINE} strokeWidth={__SG_OUTLINE_W} />
      {/* tail tuft */}
      <path d="M176 150 Q193 135 183 162 Z" fill={bodyCol} stroke={__SG_OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
      {/* wing */}
      <path d="M93 155 Q73 150 68 175 Q83 195 103 185 Z" fill={wingCol} stroke={__SG_OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
    </g>);

}

function GooseNeckHead({ headCol = '#0F1726' }) {
  return (
    <g className="g-head">
      {/* neck */}
      <path d="M80 130 Q66 100 60 70 Q60 55 76 55 L106 55 L106 130 Z" fill={headCol} stroke={__SG_OUTLINE} strokeWidth={__SG_OUTLINE_W} strokeLinejoin="round" />
      {/* head */}
      <ellipse cx="80" cy="52" rx="32" ry="28" fill={headCol} stroke={__SG_OUTLINE} strokeWidth={__SG_OUTLINE_W} />
    </g>);

}

function GooseFace({ lashes, blush, visor, stern, sleepy, beakOpen }) {
  return (
    <g className="g-face">
      {!sleepy &&
      <>
          <circle cx="72" cy="44" r="5.5" fill="#FAF7F0" />
          <circle cx="70" cy="45" r="2.8" fill="#0F1726" />
          <circle cx="68.5" cy="43.5" r="1" fill="#FAF7F0" opacity=".9" />
        </>
      }
      {sleepy &&
      <path d="M65 44 Q72 47 79 44" fill="none" stroke="#FAF7F0" strokeWidth="2" strokeLinecap="round" />
      }
      {stern && (
      /* heavy brow over the eye */
      <path d="M62 36 L82 32 L82 38 L62 41 Z" fill="#7B2D26" stroke={__SG_OUTLINE} strokeWidth="1.5" />)
      }
      {lashes &&
      <g stroke="#0F1726" strokeWidth="1.5" strokeLinecap="round">
          <line x1="68" y1="38" x2="65" y2="33" />
          <line x1="72" y1="37" x2="71" y2="32" />
          <line x1="76" y1="37" x2="79" y2="33" />
        </g>
      }
      {visor &&
      <g>
          <rect x="44" y="38" width="54" height="11" rx="2" fill="#7BD7E8" stroke={__SG_OUTLINE} strokeWidth="2.5" />
          <rect x="48" y="42" width="4" height="2.5" fill="#C8F0F5" />
          <rect x="56" y="42" width="8" height="2.5" fill="#C8F0F5" />
          <rect x="72" y="42" width="5" height="2.5" fill="#C8F0F5" />
          <rect x="84" y="42" width="6" height="2.5" fill="#C8F0F5" />
        </g>
      }
      {/* beak */}
      <path d={beakOpen ?
      'M55 50 L33 45 L33 53 L55 52 Z M55 55 L33 56 L33 64 L55 60 Z' :
      'M55 50 L33 47 L33 62 L55 60 Z'}
      fill="#E8A437" stroke={__SG_OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
      {!beakOpen &&
      <line x1="33" y1="55" x2="55" y2="55.5" stroke={__SG_OUTLINE} strokeWidth="2" />
      }
      {blush &&
      <circle cx="95" cy="58" r="5" fill="#D97992" opacity=".5" />
      }
    </g>);

}

// ── Outfit overlays ──────────────────────────────────────────────────────────
function BroCap() {
  // Backwards red snapback — brim sticks out to the right (since goose faces left)
  return (
    <g className="g-cap">
      <path d="M53 30 Q53 13 80 13 Q108 13 108 30 L108 33 L53 33 Z" fill="#7B2D26" stroke={__SG_OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
      {/* back brim peeking out the right side */}
      <rect x="108" y="27" width="20" height="7" rx="2" fill="#5a1f1a" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      {/* adjuster */}
      <rect x="118" y="29" width="5" height="3" fill="#FAF7F0" />
      {/* logo */}
      <circle cx="80" cy="22" r="3" fill="#D9A441" />
    </g>);

}

function JarvisAntenna() {
  return (
    <g className="g-antenna">
      <line x1="82" y1="25" x2="82" y2="8" stroke={__SG_OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="82" cy="6" r="4" fill="#7BD7E8" stroke={__SG_OUTLINE} strokeWidth="2" />
      {/* signal arcs */}
      <path d="M75 0 Q82 -3 89 0" stroke="#7BD7E8" strokeWidth="1.5" fill="none" opacity=".6" />
      <path d="M71 -4 Q82 -9 93 -4" stroke="#7BD7E8" strokeWidth="1.5" fill="none" opacity=".4" />
    </g>);

}
function JarvisBowtie() {
  return (
    <g className="g-bowtie">
      <path d="M75 116 L92 110 L92 128 L75 122 Z" fill="#7B2D26" stroke={__SG_OUTLINE} strokeWidth="2" strokeLinejoin="round" />
      <path d="M109 116 L92 110 L92 128 L109 122 Z" fill="#7B2D26" stroke={__SG_OUTLINE} strokeWidth="2" strokeLinejoin="round" />
      <rect x="89" y="115" width="6" height="9" fill="#5a1f1a" />
    </g>);

}

function PinkScarf() {
  // Wraps around the lower neck/upper body
  return (
    <g className="g-scarf">
      <path d="M58 108 L108 108 L108 122 Q104 128 108 132 L108 148 L92 148 L92 124 L58 124 Z"
      fill="#D97992" stroke={__SG_OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="98" y1="135" x2="106" y2="135" stroke="#B95E78" strokeWidth="2" />
      <line x1="98" y1="141" x2="106" y2="141" stroke="#B95E78" strokeWidth="2" />
    </g>);

}

function BucketHat() {
  return (
    <g className="g-bucket">
      {/* brim */}
      <ellipse cx="80" cy="30" rx="42" ry="6" fill="#E8C46A" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      {/* crown */}
      <rect x="56" y="15" width="48" height="16" rx="2" fill="#E8C46A" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      <ellipse cx="80" cy="15" rx="24" ry="4" fill="#E8C46A" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      {/* band */}
      <rect x="56" y="24" width="48" height="4" fill="#7B2D26" />
    </g>);

}

function SunHat() {
  return (
    <g className="g-sunhat">
      <ellipse cx="80" cy="32" rx="52" ry="7" fill="#E8C46A" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      <rect x="56" y="10" width="48" height="22" rx="2" fill="#E8C46A" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      <ellipse cx="80" cy="10" rx="24" ry="5" fill="#E8C46A" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      <rect x="56" y="22" width="48" height="5" fill="#7B2D26" />
    </g>);

}

function DetectiveHat() {
  return (
    <g className="g-detectivehat">
      {/* deerstalker silhouette */}
      <ellipse cx="80" cy="32" rx="48" ry="6" fill="#7B2D26" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      <path d="M52 32 Q52 8 80 8 Q108 8 108 32 Z" fill="#7B2D26" stroke={__SG_OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
      {/* checker pattern */}
      <rect x="58" y="14" width="6" height="6" fill="#A05148" />
      <rect x="70" y="14" width="6" height="6" fill="#A05148" />
      <rect x="82" y="14" width="6" height="6" fill="#A05148" />
      <rect x="94" y="14" width="6" height="6" fill="#A05148" />
      <rect x="64" y="20" width="6" height="6" fill="#A05148" />
      <rect x="76" y="20" width="6" height="6" fill="#A05148" />
      <rect x="88" y="20" width="6" height="6" fill="#A05148" />
      {/* ear flaps */}
      <ellipse cx="55" cy="26" rx="6" ry="9" fill="#7B2D26" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      <ellipse cx="105" cy="26" rx="6" ry="9" fill="#7B2D26" stroke={__SG_OUTLINE} strokeWidth="2.5" />
    </g>);

}

function PoliceHat() {
  return (
    <g className="g-policehat">
      <ellipse cx="80" cy="35" rx="44" ry="5" fill="#1B3F6B" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      <path d="M50 35 L50 22 Q50 8 80 8 Q110 8 110 22 L110 35 Z" fill="#2A5489" stroke={__SG_OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
      {/* band */}
      <rect x="50" y="28" width="60" height="6" fill="#0F1726" />
      {/* badge */}
      <polygon points="80,12 85,20 94,21 87,27 89,36 80,32 71,36 73,27 66,21 75,20"
      fill="#D9A441" stroke={__SG_OUTLINE} strokeWidth="1.5" />
    </g>);

}

function PartyHat() {
  return (
    <g className="g-partyhat">
      <path d="M64 30 L80 -4 L96 30 Z" fill="#D97992" stroke={__SG_OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="80" cy="-4" r="3" fill="#F2D03A" stroke={__SG_OUTLINE} strokeWidth="2" />
      <line x1="72" y1="14" x2="88" y2="14" stroke="#F2D03A" strokeWidth="2" />
      <line x1="68" y1="22" x2="92" y2="22" stroke="#F2D03A" strokeWidth="2" />
    </g>);

}

function Headphones() {
  return (
    <g className="g-headphones">
      <path d="M48 50 Q48 18 80 18 Q112 18 112 50" fill="none" stroke={__SG_OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
      <rect x="42" y="40" width="12" height="20" rx="3" fill="#D9A441" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      <rect x="106" y="40" width="12" height="20" rx="3" fill="#D9A441" stroke={__SG_OUTLINE} strokeWidth="2.5" />
    </g>);

}

function MagGlass() {
  /* held below body, near where wing would be */
  return (
    <g className="g-magglass" transform="translate(-10, 30)">
      <circle cx="38" cy="180" r="22" fill="#BFE0F0" stroke={__SG_OUTLINE} strokeWidth="3" opacity=".85" />
      <circle cx="38" cy="180" r="22" fill="none" stroke="#FAF7F0" strokeWidth="3" opacity=".5" />
      {/* highlight */}
      <path d="M28 170 Q32 165 36 168" fill="none" stroke="#FAF7F0" strokeWidth="2" />
      {/* handle */}
      <rect x="54" y="194" width="22" height="6" rx="2" fill="#7B2D26" stroke={__SG_OUTLINE} strokeWidth="2" transform="rotate(45 65 197)" />
    </g>);

}

function PhoneToEar() {
  /* old-fashioned phone */
  return (
    <g className="g-phone" transform="translate(112, 38) rotate(15)">
      <rect x="0" y="0" width="16" height="36" rx="4" fill="#1B2638" stroke={__SG_OUTLINE} strokeWidth="2" />
      <rect x="3" y="4" width="10" height="14" rx="2" fill="#7BD7E8" />
      <circle cx="8" cy="30" r="1.5" fill="#FAF7F0" />
      {/* signal ripples */}
      <path d="M22 14 Q26 14 26 18" fill="none" stroke="#D9A441" strokeWidth="2" opacity=".8" />
      <path d="M22 8 Q30 10 30 18" fill="none" stroke="#D9A441" strokeWidth="2" opacity=".5" />
    </g>);

}

function Umbrella() {
  return (
    <g className="g-umbrella">
      <path d="M20 -10 Q80 -42 140 -10 Z" fill="#8FAF94" stroke={__SG_OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M20 -10 Q50 -22 80 -10" fill="none" stroke="#7C9C7F" strokeWidth="1.5" />
      <path d="M80 -10 Q110 -22 140 -10" fill="none" stroke="#7C9C7F" strokeWidth="1.5" />
      <line x1="80" y1="-12" x2="80" y2="16" stroke="#7B2D26" strokeWidth="3" strokeLinecap="round" />
      <path d="M76 16 Q80 22 84 16" fill="none" stroke="#7B2D26" strokeWidth="3" strokeLinecap="round" />
    </g>);

}

function Sparkle({ x = 130, y = 24, color = '#F2D03A' }) {
  const X = Number(x),Y = Number(y);
  return (
    <g className="g-sparkle">
      <path d={`M${X} ${Y - 8} L${X + 2} ${Y - 2} L${X + 8} ${Y} L${X + 2} ${Y + 2} L${X} ${Y + 8} L${X - 2} ${Y + 2} L${X - 8} ${Y} L${X - 2} ${Y - 2} Z`} fill={color} />
      <circle cx={X} cy={Y} r="1.5" fill="#FFFFFF" />
    </g>);

}

function CatCompanion() {
  return (
    <g className="g-cat" transform="translate(170, 0)">
      {/* body */}
      <ellipse cx="35" cy="220" rx="24" ry="14" fill="#E8A437" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      {/* head */}
      <circle cx="56" cy="205" r="14" fill="#E8A437" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      {/* ears */}
      <path d="M47 196 L50 187 L55 196 Z" fill="#E8A437" stroke={__SG_OUTLINE} strokeWidth="2" strokeLinejoin="round" />
      <path d="M58 196 L64 187 L65 196 Z" fill="#E8A437" stroke={__SG_OUTLINE} strokeWidth="2" strokeLinejoin="round" />
      {/* tabby stripes */}
      <path d="M28 214 Q26 219 28 224" stroke="#A57A26" strokeWidth="1.5" fill="none" />
      <path d="M38 214 Q36 219 38 224" stroke="#A57A26" strokeWidth="1.5" fill="none" />
      <path d="M48 197 L50 200" stroke="#A57A26" strokeWidth="1.5" fill="none" />
      <path d="M53 198 L55 201" stroke="#A57A26" strokeWidth="1.5" fill="none" />
      {/* eyes */}
      <circle cx="52" cy="206" r="1.5" fill="#0F1726" />
      <circle cx="60" cy="206" r="1.5" fill="#0F1726" />
      {/* nose */}
      <path d="M55 209 L57 210 L56 212 Z" fill="#7B2D26" />
      {/* tail */}
      <path d="M14 215 Q-2 200 8 188" stroke="#E8A437" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M14 215 Q-2 200 8 188" stroke={__SG_OUTLINE} strokeWidth="2.5" fill="none" />
    </g>);

}

function Duckling({ x, y, scale = 0.6 }) {
  const X = Number(x),Y = Number(y);
  return (
    <g className="g-duckling" transform={`translate(${X}, ${Y}) scale(${scale})`}>
      <ellipse cx="0" cy="0" rx="18" ry="13" fill="#F2D03A" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      <circle cx="-15" cy="-10" r="11" fill="#F2D03A" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      <path d="M-24 -10 L-32 -9 L-32 -5 L-24 -7 Z" fill="#E8A437" stroke={__SG_OUTLINE} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="-17" cy="-13" r="1.6" fill="#0F1726" />
      <line x1="-3" y1="12" x2="-3" y2="18" stroke="#D9A441" strokeWidth="3" strokeLinecap="round" />
      <line x1="5" y1="12" x2="5" y2="18" stroke="#D9A441" strokeWidth="3" strokeLinecap="round" />
    </g>);

}

// ── Goose persona definitions ───────────────────────────────────────────────
const PERSONA = {
  default: { headCol: '#0F1726', bodyCol: '#FAF7F0', wideBox: false },
  bro: { headCol: '#0F1726', bodyCol: '#FAF7F0', wideBox: false },
  jarvis: { headCol: '#0F1726', bodyCol: '#EEF6F8', wideBox: false },
  bestie: { headCol: '#0F1726', bodyCol: '#FAF7F0', wideBox: false },
  petparent: { headCol: '#0F1726', bodyCol: '#FAF7F0', wideBox: true },
  family: { headCol: '#0F1726', bodyCol: '#FAF7F0', wideBox: true }
};

// Outfit-specific render hooks
function PersonaLayers({ outfit, accessories }) {
  const acc = accessories || [];
  // Detect special accessories that override
  const has = (n) => acc.includes(n);

  return (
    <>
      {/* Hat layer (above head) */}
      {has('police') ? <PoliceHat /> :
      has('detective') ? <DetectiveHat /> :
      has('partyhat') ? <PartyHat /> :
      outfit === 'bro' ? <BroCap /> :
      outfit === 'bestie' ? <BucketHat /> :
      outfit === 'family' ? null : // family has no hat for primary goose
      outfit === 'family-mom' ? <BucketHat /> :
      null}

      {/* Jarvis antenna */}
      {outfit === 'jarvis' && <JarvisAntenna />}

      {/* Bowtie / scarf at neck */}
      {outfit === 'jarvis' && <JarvisBowtie />}
      {(outfit === 'bestie' || outfit === 'family-mom') && <PinkScarf />}

      {/* Held props */}
      {has('umbrella') && <Umbrella />}
      {has('magglass') && <MagGlass />}
      {has('phone') && <PhoneToEar />}
      {has('headphones') && <Headphones />}
    </>);

}

// ── Main goose component ────────────────────────────────────────────────────
function BigBow() {
  // Coral pink bow at the base of the neck — different silhouette from PinkScarf
  return (
    <g className="g-bow">
      <path d="M70 116 L92 108 L92 132 L70 124 Z" fill="#E27B91" stroke={__SG_OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M114 116 L92 108 L92 132 L114 124 Z" fill="#E27B91" stroke={__SG_OUTLINE} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="89" y="115" width="6" height="11" fill="#B85A6F" stroke={__SG_OUTLINE} strokeWidth="1.5" />
      {/* tails dangling */}
      <path d="M84 132 Q80 144 86 148" fill="none" stroke="#E27B91" strokeWidth="4" strokeLinecap="round" />
      <path d="M98 132 Q104 144 96 152" fill="none" stroke="#E27B91" strokeWidth="4" strokeLinecap="round" />
    </g>);

}

function CherrySunHat() {
  // Wider straw hat with two pixel cherries on the band — for the mom goose
  return (
    <g className="g-cherryhat">
      <ellipse cx="80" cy="34" rx="58" ry="8" fill="#E8C46A" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      <ellipse cx="80" cy="34" rx="58" ry="8" fill="none" stroke="#D9A441" strokeWidth="1" />
      <rect x="50" y="8" width="60" height="26" rx="3" fill="#E8C46A" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      <ellipse cx="80" cy="8" rx="30" ry="5" fill="#E8C46A" stroke={__SG_OUTLINE} strokeWidth="2.5" />
      {/* hat band */}
      <rect x="50" y="22" width="60" height="6" fill="#C24A3F" />
      {/* cherries */}
      <circle cx="92" cy="25" r="4" fill="#C24A3F" stroke={__SG_OUTLINE} strokeWidth="1.5" />
      <circle cx="100" cy="25" r="4" fill="#C24A3F" stroke={__SG_OUTLINE} strokeWidth="1.5" />
      <path d="M92 21 Q96 14 100 21" fill="none" stroke="#1F8A5B" strokeWidth="1.5" />
      <path d="M88 9 L91 14" stroke="#1F8A5B" strokeWidth="1.5" strokeLinecap="round" />
      {/* highlight */}
      <circle cx="91" cy="24" r="1" fill="#FAF7F0" />
      <circle cx="99" cy="24" r="1" fill="#FAF7F0" />
    </g>);

}

function MomGoose({ x = 0, y = 0 }) {
  // Slightly larger, distinctly feminine: pale cream body, big cherry hat,
  // coral bow at neck, longer eyelashes, blush. No bucket hat, no wrap-scarf.
  const headCol = '#0F1726';
  const bodyCol = '#F7F0DB'; // pale cream — clearly lighter than dad
  return (
    <g transform={`translate(${x}, ${y}) scale(1.05)`}>
      <GooseLegs />
      <GooseBody bodyCol={bodyCol} />
      <GooseNeckHead headCol={headCol} />
      <BigBow />
      <CherrySunHat />
      <GooseFace lashes blush />
    </g>);

}

function PixelGoose({
  outfit = 'default',
  pose, // ignored (legacy from pixel version)
  size = 200,
  sparkle = false,
  accessories = [],
  flip = false,
  bob = false,
  walk = false,
  style = {},
  className = ''
}) {
  const persona = PERSONA[outfit] || PERSONA.default;
  const isWide = persona.wideBox;
  const acc = accessories || [];

  // Special outfit composites (multi-goose scenes)
  if (outfit === 'family') {
    return (
      <svg
        className={`smooth-goose ${bob ? 'bob' : ''} ${walk ? 'walk' : ''} ${className}`}
        viewBox="-10 -20 400 290"
        width={size * 1.4}
        style={{ overflow: 'visible', transform: flip ? 'scaleX(-1)' : undefined, ...style }}
        aria-hidden="true">
        
        {/* Dad goose (left) */}
        <g>
          <GooseLegs />
          <GooseBody bodyCol={persona.bodyCol} />
          <GooseNeckHead headCol={persona.headCol} />
          <GooseFace />
        </g>
        {/* Mom goose (right) — clearly distinct: cream body, cherry sun hat, coral bow */}
        <MomGoose x={150} y={0} />
        {/* Ducklings — larger and more cheerful */}
        <Duckling x={70} y={248} scale={0.85} />
        <Duckling x={160} y={252} scale={0.78} />
        <Duckling x={252} y={252} scale={0.9} />
        {sparkle && <Sparkle x={160} y={30} />}
      </svg>);

  }

  if (outfit === 'petparent') {
    return (
      <svg
        className={`smooth-goose ${bob ? 'bob' : ''} ${walk ? 'walk' : ''} ${className}`}
        viewBox="-10 -20 280 280"
        width={size * 1.15}
        style={{ overflow: 'visible', transform: flip ? 'scaleX(-1)' : undefined, ...style }}
        aria-hidden="true">
        
        <GooseLegs />
        <GooseBody bodyCol={persona.bodyCol} />
        <GooseNeckHead headCol={persona.headCol} />
        <PersonaLayers outfit="default" accessories={acc} />
        <GooseFace />
        <CatCompanion />
        {sparkle && <Sparkle />}
      </svg>);

  }

  // Standard single-goose
  return (
    <svg
      className={`smooth-goose ${bob ? 'bob' : ''} ${walk ? 'walk' : ''} ${className}`}
      viewBox="-10 -20 240 280"
      width={size}
      style={{ overflow: 'visible', transform: flip ? 'scaleX(-1)' : undefined, ...style, opacity: "1" }}
      aria-hidden="true">
      
      <GooseLegs />
      <GooseBody bodyCol={persona.bodyCol} />
      <GooseNeckHead headCol={persona.headCol} />
      <PersonaLayers outfit={outfit} accessories={acc} />
      <GooseFace
        lashes={outfit === 'bestie'}
        blush={outfit === 'bestie'}
        visor={outfit === 'jarvis'}
        stern={acc.includes('sternbrow')}
        sleepy={acc.includes('closedeyes')}
        beakOpen={acc.includes('beakOpen')} />
      
      {sparkle && <Sparkle />}
    </svg>);

}

// Tiny brand mark — illustrated detective goose logo
function MiniGoose({ size = 28 }) {
  return (
    <img
      src="/bureau/assets/logo.png"
      width={size}
      height={size}
      alt="Anxious Traveller"
      style={{ verticalAlign: 'middle', display: 'inline-block', objectFit: 'contain', height: "47px", width: "49px", padding: "0px 0px 0px 14px" }} />);


}

// Speech bubble
function GooseBubble({ children, side = 'right', tone = 'normal', style }) {
  const bg = tone === 'warn' ? '#7B2D26' : tone === 'hot' ? '#D9A441' : tone === 'ink' ? '#1B2638' : tone === 'sage' ? '#5C7E63' : '#FAF7F0';
  return (
    <div className={`goose-bubble side-${side} tone-${tone}`} style={{ background: bg, ...style, width: "223px", borderWidth: "6px 3px 2px", height: "86px", letterSpacing: "0.5px", lineHeight: "1.25", fontSize: "17px", padding: "6px 16px 13px", margin: "-1px", borderStyle: "dashed" }}>
      {children}
    </div>);

}

const OUTFITS = {
  default: { line: '"I checked. You\'re good."' },
  bro: { line: '"Yo. Goose checked it. You\'re vibin\'."' },
  jarvis: { line: '"Situation: stable. Three caveats. Shall we?"' },
  bestie: { line: '"Babe, I have so much to tell you."' },
  petparent: { line: '"Pup-approved. Triple-checked. Tail intact."' },
  family: { line: '"Stroller-friendly. Snack-ready. Kid-safe."' }
};

// Animation CSS
const __sgStyle = document.createElement('style');
__sgStyle.textContent = `
.smooth-goose{ display:inline-block; vertical-align: bottom; }
.smooth-goose.bob{ animation: sg-bob 2.6s ease-in-out infinite; transform-origin: 50% 100%; }
.smooth-goose.walk{ animation: sg-walk 1.1s ease-in-out infinite; transform-origin: 50% 100%; }
@keyframes sg-bob{
  0%,100%{ transform: translateY(0); }
  50%{ transform: translateY(-6px); }
}
@keyframes sg-walk{
  0%,100%{ transform: translateY(0) rotate(-2deg); }
  50%{ transform: translateY(-4px) rotate(2deg); }
}

.goose-bubble{
  display:inline-block;
  font-family: "Instrument Serif", serif;
  font-size: 19px;
  font-style: italic;
  line-height: 1.3;
  padding: 12px 16px 14px;
  border: 2.5px solid #0F1726;
  border-radius: 16px;
  position: relative;
  box-shadow: 3px 3px 0 #0F1726;
  max-width: 300px;
  color: #1B2638;
}
.goose-bubble strong{
  font-style: normal;
  font-weight: 700;
  font-family: var(--font-body, "Inter", sans-serif);
  font-size: 12px;
  letter-spacing: .5px;
  text-transform: uppercase;
  display:block;
  margin-bottom: 5px;
  opacity:.6;
}
.goose-bubble.tone-warn{ color:#FAF7F0; box-shadow: 3px 3px 0 #2A0E0A; border-color:#5a1f1a; }
.goose-bubble.tone-hot{ color:#1B2638; box-shadow: 3px 3px 0 #6A4F18; border-color:#A57A26; }
.goose-bubble.tone-ink{ color:#FAF7F0; box-shadow: 3px 3px 0 #050912; }
.goose-bubble.tone-sage{ color:#FAF7F0; box-shadow: 3px 3px 0 #2F3F34; border-color:#3F5644; }
.goose-bubble::after{
  content:"";
  position:absolute;
  bottom: -14px;
  width: 18px; height: 16px;
  background: inherit;
  border: 2.5px solid inherit;
  border-color: #0F1726;
  border-top: none; border-right: none;
  clip-path: polygon(0 0, 100% 0, 30% 100%);
}
.goose-bubble.tone-warn::after{ border-color:#5a1f1a; }
.goose-bubble.tone-hot::after{ border-color:#A57A26; }
.goose-bubble.tone-sage::after{ border-color:#3F5644; }
.goose-bubble.side-left::after { right: 32px; left:auto; transform: scaleX(-1); }
.goose-bubble.side-right::after{ left: 32px; }
`;
document.head.appendChild(__sgStyle);


export { PixelGoose, MiniGoose, GooseBubble, OUTFITS, Sparkle };

if (typeof window !== "undefined") {
  Object.assign(window, { PixelGoose, MiniGoose, GooseBubble, OUTFITS, Sparkle });
}
