import React, { useState, useEffect, useMemo } from "react";
/* eslint-disable */
// Investigation Theatre — the absurd right-side stage that plays during loading.
// 12 short scenes cycling over ~35 seconds, each with its own goose chimera,
// cast of characters, backdrop, and caption. Tone: dry, deadpan, completely silly.

const { useState: useStateIT, useEffect: useEffectIT, useMemo: useMemoIT } = React;

// ── Reusable parts ─────────────────────────────────────────────────────────

// The iconic goose head only — used to graft onto chimera bodies.
function GooseHead({ x = 0, y = 0, scale = 1, flip = false, sleepy, accessory }) {
  const transform = `translate(${x}, ${y}) scale(${scale}) ${flip ? 'scale(-1, 1) translate(-60, 0)' : ''}`;
  return (
    <g transform={transform}>
      {/* neck stub */}
      <path d="M22 38 Q14 60 22 64 L42 64 Q50 60 42 38 Z" fill="#0F1726" stroke="#0F1726" strokeWidth="2.5" strokeLinejoin="round" />
      {/* head */}
      <ellipse cx="30" cy="20" rx="22" ry="18" fill="#0F1726" stroke="#0F1726" strokeWidth="2.5" />
      {/* eye */}
      {sleepy ? (
        <path d="M22 16 Q28 19 34 16" stroke="#FAF7F0" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <>
          <circle cx="22" cy="16" r="4.5" fill="#FAF7F0" />
          <circle cx="20" cy="17" r="2" fill="#0F1726" />
          <circle cx="18.5" cy="15.5" r=".8" fill="#FAF7F0" />
        </>
      )}
      {/* beak */}
      <path d="M8 19 L-8 16 L-8 30 L8 28 Z" fill="#E8A437" stroke="#0F1726" strokeWidth="2" strokeLinejoin="round" />
      <line x1="-8" y1="23" x2="8" y2="23.5" stroke="#0F1726" strokeWidth="1.5" />
      {accessory === 'sunglasses' && (
        <g>
          <rect x="6" y="13" width="14" height="6" rx="1" fill="#0F1726" stroke="#0F1726" strokeWidth="1.5" />
          <rect x="22" y="13" width="14" height="6" rx="1" fill="#0F1726" stroke="#0F1726" strokeWidth="1.5" />
          <line x1="20" y1="16" x2="22" y2="16" stroke="#0F1726" strokeWidth="1.5" />
        </g>
      )}
      {accessory === 'wizardHat' && (
        <g>
          <path d="M14 6 L30 -22 L46 6 Z" fill="#2E1A6B" stroke="#0F1726" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="36" cy="-10" r="2" fill="#F2D03A" />
          <circle cx="22" cy="0" r="1.5" fill="#F2D03A" />
        </g>
      )}
      {accessory === 'detective' && (
        <g>
          <ellipse cx="30" cy="6" rx="26" ry="3" fill="#7B2D26" stroke="#0F1726" strokeWidth="2" />
          <path d="M10 6 Q10 -10 30 -10 Q50 -10 50 6 Z" fill="#7B2D26" stroke="#0F1726" strokeWidth="2" strokeLinejoin="round" />
          <rect x="14" y="-4" width="4" height="4" fill="#A05148" />
          <rect x="22" y="-4" width="4" height="4" fill="#A05148" />
          <rect x="30" y="-4" width="4" height="4" fill="#A05148" />
          <rect x="38" y="-4" width="4" height="4" fill="#A05148" />
        </g>
      )}
      {accessory === 'tourist' && (
        <g>
          <rect x="6" y="2" width="48" height="4" fill="#E8C46A" stroke="#0F1726" strokeWidth="2" />
          <ellipse cx="30" cy="2" rx="32" ry="5" fill="#E8C46A" stroke="#0F1726" strokeWidth="2" />
          <rect x="6" y="0" width="48" height="2" fill="#7B2D26" />
        </g>
      )}
      {accessory === 'reporter' && (
        <g>
          {/* press hat */}
          <rect x="10" y="-2" width="40" height="10" fill="#FAF7F0" stroke="#0F1726" strokeWidth="2" />
          <text x="30" y="6" textAnchor="middle" fontFamily="VT323, monospace" fontSize="10" fill="#0F1726" fontWeight="bold">PRESS</text>
        </g>
      )}
    </g>
  );
}

// ── Scene backdrops ────────────────────────────────────────────────────────
function Backdrop({ kind }) {
  const W = 460, H = 280;
  if (kind === 'embassy') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="scene-bg">
        {/* sky */}
        <rect width={W} height={H} fill="#C9DCE7" />
        {/* embassy facade */}
        <rect x="0" y="60" width={W} height="200" fill="#E6DFC8" />
        {/* columns */}
        {[60, 140, 220, 300, 380].map(x => (
          <rect key={x} x={x} y="80" width="20" height="160" fill="#FAF7F0" stroke="#1B2638" strokeWidth="1.5" />
        ))}
        {/* pediment */}
        <polygon points={`30,80 ${W-30},80 ${W/2},20`} fill="#D6CDB7" stroke="#1B2638" strokeWidth="2" />
        {/* flagpole */}
        <line x1={W/2} y1="20" x2={W/2} y2="-20" stroke="#0F1726" strokeWidth="2" />
        <rect x={W/2} y="-18" width="20" height="14" fill="#C24A3F" />
        {/* steps */}
        <rect x="0" y="240" width={W} height="40" fill="#C5BCA3" />
      </svg>
    );
  }
  if (kind === 'alley') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="scene-bg">
        <rect width={W} height={H} fill="#3F4A5E" />
        {/* brick wall */}
        {[0,1,2,3,4,5,6,7].map(y => (
          [0,1,2,3,4,5,6,7,8,9,10].map(x => (
            <rect key={`${x},${y}`} x={x*48 - (y%2)*24} y={y*32} width="44" height="28" fill="#5A4A40" stroke="#3F2F25" strokeWidth="1" />
          ))
        ))}
        {/* graffiti */}
        <text x="80" y="120" fontFamily="VT323, monospace" fontSize="32" fill="#C24A3F" fontWeight="bold" transform="rotate(-4 80 120)">HONK</text>
        {/* trash can */}
        <rect x="380" y="200" width="40" height="60" fill="#2A3850" stroke="#0F1726" strokeWidth="2" />
        <ellipse cx="400" cy="200" rx="22" ry="5" fill="#1B2638" />
      </svg>
    );
  }
  if (kind === 'school') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="scene-bg">
        <rect width={W} height={H} fill="#F3E7B8" />
        {/* chalkboard */}
        <rect x="60" y="40" width="340" height="160" fill="#2F4A3A" stroke="#5C3A1F" strokeWidth="6" />
        <text x="80" y="80" fontFamily="VT323, monospace" fontSize="22" fill="#FAF7F0">FRIDAY:</text>
        <text x="80" y="110" fontFamily="VT323, monospace" fontSize="20" fill="#FAF7F0">— is Rome safe?</text>
        <text x="80" y="140" fontFamily="VT323, monospace" fontSize="20" fill="#FAF7F0">— any taxi strikes?</text>
        <text x="80" y="170" fontFamily="VT323, monospace" fontSize="20" fill="#FAF7F0">— who let the goose in</text>
        {/* floor */}
        <rect x="0" y="220" width={W} height="60" fill="#A77E4F" />
        <line x1="0" y1="222" x2={W} y2="222" stroke="#7A5733" strokeWidth="2" />
      </svg>
    );
  }
  if (kind === 'garden') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="scene-bg">
        {/* sky → grass */}
        <defs>
          <linearGradient id="grdSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B5D8B0" />
            <stop offset="100%" stopColor="#7C9C7F" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="url(#grdSky)" />
        {/* flowers */}
        {[40, 110, 190, 280, 360, 430].map((x, i) => (
          <g key={x}>
            <line x1={x} y1="200" x2={x} y2="240" stroke="#3F5644" strokeWidth="3" />
            <circle cx={x} cy="200" r="8" fill={['#C24A3F','#E8C46A','#D97992','#F2D03A','#7B2D26','#E27B91'][i%6]} stroke="#0F1726" strokeWidth="1.5" />
          </g>
        ))}
        {/* leaves underfoot */}
        {[20, 90, 170, 250, 330, 410].map((x, i) => (
          <ellipse key={x} cx={x} cy="250" rx="14" ry="4" fill="#3F5644" />
        ))}
      </svg>
    );
  }
  if (kind === 'wizard') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="scene-bg">
        <defs>
          <radialGradient id="grdWiz">
            <stop offset="0%" stopColor="#5E3B91" />
            <stop offset="100%" stopColor="#2E1A6B" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#grdWiz)" />
        {/* stars */}
        {[[40,30],[120,50],[220,20],[330,40],[400,80],[80,90],[420,140],[50,160],[260,80]].map(([x,y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="1.5" fill="#F2D03A" />
            <circle cx={x} cy={y} r="3" fill="#F2D03A" opacity=".3" />
          </g>
        ))}
        {/* crystal ball table */}
        <rect x={W/2 - 70} y="200" width="140" height="20" fill="#5C3A1F" stroke="#0F1726" strokeWidth="2" />
        <ellipse cx={W/2} cy="200" rx="44" ry="20" fill="#7BD7E8" opacity=".6" />
        <circle cx={W/2} cy="180" r="40" fill="#9DDCEE" stroke="#0F1726" strokeWidth="2" opacity=".85" />
        <circle cx={W/2 - 12} cy="170" r="8" fill="#FAF7F0" opacity=".5" />
        {/* ground */}
        <rect x="0" y="220" width={W} height="60" fill="#1F1547" />
      </svg>
    );
  }
  if (kind === 'fishtank') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="scene-bg">
        <defs>
          <linearGradient id="grdFt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7BD7E8" />
            <stop offset="100%" stopColor="#3A6FBF" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="url(#grdFt)" />
        {/* bubbles */}
        {[[60,200],[80,160],[100,200],[380,180],[400,140],[420,200]].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#FAF7F0" opacity=".7" stroke="#FAF7F0" strokeWidth="1" />
        ))}
        {/* seaweed */}
        <path d="M40 280 Q50 240 40 200 Q30 160 40 120" stroke="#3F5644" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M420 280 Q430 240 420 200 Q410 160 420 120" stroke="#3F5644" strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* sand */}
        <rect x="0" y="240" width={W} height="40" fill="#E8C46A" />
        {/* shells */}
        <ellipse cx="120" cy="262" rx="14" ry="5" fill="#FAF7F0" stroke="#0F1726" strokeWidth="1.5" />
        <ellipse cx="320" cy="266" rx="10" ry="4" fill="#D97992" stroke="#0F1726" strokeWidth="1.5" />
      </svg>
    );
  }
  if (kind === 'rooftop') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="scene-bg">
        <defs>
          <linearGradient id="grdRt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8623F" />
            <stop offset="100%" stopColor="#F5E6C2" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="url(#grdRt)" />
        {/* sunset Coliseum */}
        <g fill="#1B2638" opacity=".7">
          <rect x="120" y="160" width="220" height="80" rx="10" />
          {[150, 180, 210, 240, 270, 300].map(x => (
            <rect key={x} x={x} y="180" width="14" height="40" fill="#E8623F" />
          ))}
        </g>
        {/* rooftop */}
        <rect x="0" y="230" width={W} height="60" fill="#5A4A40" />
        <line x1="0" y1="230" x2={W} y2="230" stroke="#3F2F25" strokeWidth="2" />
        <rect x="40" y="210" width="40" height="20" fill="#3F2F25" />
        <rect x="380" y="200" width="40" height="30" fill="#3F2F25" />
      </svg>
    );
  }
  if (kind === 'office') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="scene-bg">
        <rect width={W} height={H} fill="#E6DFC8" />
        {/* window */}
        <rect x="60" y="40" width="160" height="120" fill="#7BD7E8" stroke="#5A4A40" strokeWidth="4" />
        <line x1="140" y1="40" x2="140" y2="160" stroke="#5A4A40" strokeWidth="3" />
        <line x1="60" y1="100" x2="220" y2="100" stroke="#5A4A40" strokeWidth="3" />
        {/* picture frame */}
        <rect x="280" y="40" width="120" height="80" fill="#FAF7F0" stroke="#5A4A40" strokeWidth="4" />
        <text x="340" y="84" textAnchor="middle" fontFamily="VT323, monospace" fontSize="18" fill="#7B2D26">WANTED</text>
        <text x="340" y="106" textAnchor="middle" fontFamily="VT323, monospace" fontSize="22" fill="#0F1726">🦢</text>
        {/* desk */}
        <rect x="0" y="220" width={W} height="60" fill="#5A4A40" />
      </svg>
    );
  }
  if (kind === 'park') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="scene-bg">
        <defs>
          <linearGradient id="grdPk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CDE1EC" />
            <stop offset="100%" stopColor="#B5D8B0" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="url(#grdPk)" />
        {/* trees */}
        <circle cx="60" cy="180" r="40" fill="#3F5644" />
        <rect x="55" y="200" width="10" height="40" fill="#5A4A40" />
        <circle cx="400" cy="180" r="40" fill="#3F5644" />
        <rect x="395" y="200" width="10" height="40" fill="#5A4A40" />
        {/* park bench */}
        <rect x="160" y="220" width="140" height="6" fill="#5A4A40" />
        <rect x="160" y="226" width="140" height="6" fill="#5A4A40" />
        <rect x="170" y="232" width="6" height="20" fill="#5A4A40" />
        <rect x="284" y="232" width="6" height="20" fill="#5A4A40" />
        {/* ground */}
        <rect x="0" y="240" width={W} height="40" fill="#7C9C7F" />
      </svg>
    );
  }
  if (kind === 'gangBackroom') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="scene-bg">
        <rect width={W} height={H} fill="#1F2937" />
        {/* hanging lamp */}
        <line x1={W/2} y1="0" x2={W/2} y2="40" stroke="#0F1726" strokeWidth="2" />
        <ellipse cx={W/2} cy="50" rx="22" ry="12" fill="#0F1726" />
        <ellipse cx={W/2} cy="56" rx="18" ry="6" fill="#F2D03A" />
        {/* spotlight pool */}
        <ellipse cx={W/2} cy="240" rx="170" ry="50" fill="#F2D03A" opacity=".18" />
        {/* poker table */}
        <ellipse cx={W/2} cy="220" rx="160" ry="36" fill="#1F8A5B" stroke="#0F1726" strokeWidth="2" />
        {/* cards */}
        <rect x="180" y="206" width="16" height="22" fill="#FAF7F0" stroke="#0F1726" strokeWidth="1.5" />
        <rect x="200" y="206" width="16" height="22" fill="#FAF7F0" stroke="#0F1726" strokeWidth="1.5" />
        <rect x="250" y="208" width="16" height="22" fill="#FAF7F0" stroke="#0F1726" strokeWidth="1.5" />
      </svg>
    );
  }
  return null;
}

// ── Chimera bodies (head added by GooseHead) ───────────────────────────────

function SnailBody({ x = 0, y = 0 }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* shell */}
      <circle cx="64" cy="38" r="34" fill="#E8A437" stroke="#0F1726" strokeWidth="3" />
      <path d="M 64 38 m -24 0 a 24 24 0 1 1 48 0 a 18 18 0 1 1 -36 0 a 12 12 0 1 1 24 0" fill="none" stroke="#A57A26" strokeWidth="3" strokeLinecap="round" />
      {/* foot — slug body */}
      <path d="M 20 80 Q 16 100 30 102 L 100 102 Q 116 100 110 78 Q 100 60 50 60 Q 22 62 20 80 Z"
            fill="#F5DDA3" stroke="#0F1726" strokeWidth="2.5" strokeLinejoin="round" />
      {/* slime trail */}
      <path d="M 110 100 Q 130 96 144 100" stroke="#9DD9D5" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7" strokeDasharray="3 4" />
      {/* goose head poking out the front */}
      <GooseHead x={-12} y={42} scale={0.7} />
    </g>
  );
}

function CatBody({ x = 0, y = 0 }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* tail */}
      <path d="M 110 60 Q 134 30 124 14" stroke="#E8A437" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M 110 60 Q 134 30 124 14" stroke="#0F1726" strokeWidth="2" fill="none" />
      {/* body */}
      <ellipse cx="64" cy="80" rx="50" ry="28" fill="#E8A437" stroke="#0F1726" strokeWidth="2.5" />
      {/* stripes */}
      <path d="M 30 76 Q 28 84 30 92" stroke="#A57A26" strokeWidth="2" fill="none" />
      <path d="M 50 76 Q 48 84 50 92" stroke="#A57A26" strokeWidth="2" fill="none" />
      <path d="M 70 76 Q 68 84 70 92" stroke="#A57A26" strokeWidth="2" fill="none" />
      {/* legs */}
      <rect x="20" y="100" width="14" height="20" fill="#E8A437" stroke="#0F1726" strokeWidth="2" />
      <rect x="42" y="100" width="14" height="20" fill="#E8A437" stroke="#0F1726" strokeWidth="2" />
      <rect x="72" y="100" width="14" height="20" fill="#E8A437" stroke="#0F1726" strokeWidth="2" />
      <rect x="94" y="100" width="14" height="20" fill="#E8A437" stroke="#0F1726" strokeWidth="2" />
      {/* head — goose head on top of cat shoulders */}
      <GooseHead x={20} y={20} scale={0.85} />
    </g>
  );
}

function FishBody({ x = 0, y = 0 }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* fish tail */}
      <path d="M -10 50 L -34 30 L -34 80 Z" fill="#C24A3F" stroke="#0F1726" strokeWidth="2.5" strokeLinejoin="round" />
      {/* body */}
      <ellipse cx="40" cy="55" rx="50" ry="28" fill="#C24A3F" stroke="#0F1726" strokeWidth="2.5" />
      {/* scales */}
      {[20, 40, 60].map(x => (
        <g key={x}>
          <path d={`M ${x} 40 Q ${x+8} 50 ${x} 60`} stroke="#7B2D26" strokeWidth="1.5" fill="none" />
          <path d={`M ${x+4} 50 Q ${x+12} 60 ${x+4} 70`} stroke="#7B2D26" strokeWidth="1.5" fill="none" />
        </g>
      ))}
      {/* top fin */}
      <path d="M 30 28 L 50 8 L 60 28 Z" fill="#7B2D26" stroke="#0F1726" strokeWidth="2" strokeLinejoin="round" />
      {/* head — goose head replaces the fish head */}
      <GooseHead x={64} y={28} scale={0.9} />
    </g>
  );
}

// ── Characters ────────────────────────────────────────────────────────────

function PoliceOfficer({ x = 0, y = 0, scale = 1, flip = false }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale}) ${flip ? 'scale(-1, 1) translate(-100, 0)' : ''}`}>
      {/* body — uniform */}
      <ellipse cx="50" cy="100" rx="34" ry="40" fill="#1B3F6B" stroke="#0F1726" strokeWidth="2.5" />
      {/* shirt buttons */}
      <circle cx="50" cy="90" r="2" fill="#D9A441" />
      <circle cx="50" cy="100" r="2" fill="#D9A441" />
      <circle cx="50" cy="110" r="2" fill="#D9A441" />
      {/* legs */}
      <rect x="32" y="138" width="14" height="22" fill="#0F1726" />
      <rect x="54" y="138" width="14" height="22" fill="#0F1726" />
      {/* arms */}
      <rect x="14" y="80" width="14" height="36" fill="#1B3F6B" stroke="#0F1726" strokeWidth="2" />
      <rect x="72" y="80" width="14" height="36" fill="#1B3F6B" stroke="#0F1726" strokeWidth="2" />
      {/* head — police goose */}
      <GooseHead x={20} y={40} scale={1.05} accessory="reporter" />
      {/* police cap on top */}
      <g transform="translate(20, 22)">
        <ellipse cx="30" cy="14" rx="26" ry="3" fill="#1B3F6B" stroke="#0F1726" strokeWidth="2" />
        <path d="M 8 14 L 8 4 Q 8 -8 30 -8 Q 52 -8 52 4 L 52 14 Z" fill="#2A5489" stroke="#0F1726" strokeWidth="2" strokeLinejoin="round" />
        <rect x="8" y="8" width="44" height="6" fill="#0F1726" />
        <polygon points="30,-4 34,4 42,5 36,11 38,20 30,16 22,20 24,11 18,5 26,4" fill="#D9A441" stroke="#0F1726" strokeWidth="1.2" />
      </g>
    </g>
  );
}

function GangMember({ x = 0, y = 0, scale = 1, color = '#7B2D26' }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* hood */}
      <path d="M 10 30 Q 50 -10 90 30 L 90 140 L 10 140 Z" fill={color} stroke="#0F1726" strokeWidth="2.5" strokeLinejoin="round" />
      {/* face dark */}
      <ellipse cx="50" cy="50" rx="22" ry="20" fill="#1F2937" stroke="#0F1726" strokeWidth="2" />
      {/* goose beak peeking from shadow */}
      <path d="M 22 56 L 6 50 L 6 60 L 22 64 Z" fill="#E8A437" stroke="#0F1726" strokeWidth="1.5" strokeLinejoin="round" />
      {/* glint eye */}
      <circle cx="40" cy="50" r="2" fill="#F2D03A" />
      {/* chain */}
      <circle cx="50" cy="78" r="6" fill="#D9A441" stroke="#0F1726" strokeWidth="1.5" />
      <circle cx="50" cy="78" r="2" fill="#0F1726" />
    </g>
  );
}

function Schoolchild({ x = 0, y = 0, scale = 1, hair = '#7B2D26' }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* legs */}
      <rect x="22" y="110" width="10" height="30" fill="#1B3F6B" />
      <rect x="36" y="110" width="10" height="30" fill="#1B3F6B" />
      {/* dress */}
      <path d="M 8 70 L 22 60 L 46 60 L 60 70 L 50 116 L 18 116 Z" fill="#D97992" stroke="#0F1726" strokeWidth="2" strokeLinejoin="round" />
      {/* head */}
      <circle cx="34" cy="44" r="20" fill="#F5DDA3" stroke="#0F1726" strokeWidth="2" />
      {/* hair */}
      <path d="M 14 36 Q 18 14 34 16 Q 50 14 54 36 Q 50 20 34 22 Q 18 20 14 36 Z" fill={hair} stroke="#0F1726" strokeWidth="1.5" strokeLinejoin="round" />
      {/* pigtails */}
      <circle cx="12" cy="44" r="6" fill={hair} stroke="#0F1726" strokeWidth="1.5" />
      <circle cx="56" cy="44" r="6" fill={hair} stroke="#0F1726" strokeWidth="1.5" />
      {/* face */}
      <circle cx="26" cy="46" r="2" fill="#0F1726" />
      <circle cx="42" cy="46" r="2" fill="#0F1726" />
      <path d="M 28 54 Q 34 58 40 54" stroke="#0F1726" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* hand raised */}
      <line x1="20" y1="80" x2="6" y2="40" stroke="#F5DDA3" strokeWidth="6" strokeLinecap="round" />
      <line x1="20" y1="80" x2="6" y2="40" stroke="#0F1726" strokeWidth="2" fill="none" />
    </g>
  );
}

function Wizard({ x = 0, y = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* robe */}
      <path d="M 14 60 L 30 50 L 70 50 L 86 60 L 76 160 L 24 160 Z" fill="#2E1A6B" stroke="#0F1726" strokeWidth="2.5" strokeLinejoin="round" />
      {/* stars on robe */}
      <text x="40" y="100" fontFamily="VT323, monospace" fontSize="14" fill="#F2D03A">✦</text>
      <text x="56" y="120" fontFamily="VT323, monospace" fontSize="14" fill="#F2D03A">✦</text>
      <text x="34" y="138" fontFamily="VT323, monospace" fontSize="14" fill="#F2D03A">✦</text>
      {/* head */}
      <circle cx="50" cy="36" r="20" fill="#F5DDA3" stroke="#0F1726" strokeWidth="2" />
      {/* beard */}
      <path d="M 32 44 Q 50 70 68 44 Q 60 56 50 58 Q 40 56 32 44 Z" fill="#FAF7F0" stroke="#0F1726" strokeWidth="1.5" strokeLinejoin="round" />
      {/* eyes */}
      <circle cx="42" cy="36" r="1.5" fill="#0F1726" />
      <circle cx="58" cy="36" r="1.5" fill="#0F1726" />
      {/* wizard hat */}
      <path d="M 24 26 L 50 -20 L 76 26 Z" fill="#2E1A6B" stroke="#0F1726" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="50" cy="26" rx="30" ry="4" fill="#2E1A6B" stroke="#0F1726" strokeWidth="2" />
      <circle cx="64" cy="0" r="2.5" fill="#F2D03A" />
      <circle cx="58" cy="12" r="1.8" fill="#F2D03A" />
      {/* staff */}
      <line x1="86" y1="20" x2="86" y2="160" stroke="#5A4A40" strokeWidth="4" />
      <circle cx="86" cy="14" r="6" fill="#7BD7E8" stroke="#0F1726" strokeWidth="2" />
    </g>
  );
}

function GardenSnail({ x = 0, y = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <circle cx="40" cy="30" r="22" fill="#7B2D26" stroke="#0F1726" strokeWidth="2.5" />
      <path d="M 40 30 m -14 0 a 14 14 0 1 1 28 0 a 9 9 0 1 1 -18 0" fill="none" stroke="#5a1f1a" strokeWidth="2" />
      <path d="M 12 60 Q 8 70 20 72 L 60 72 Q 76 70 70 60" fill="#F5DDA3" stroke="#0F1726" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="18" cy="56" r="2" fill="#0F1726" />
      <line x1="14" y1="56" x2="10" y2="48" stroke="#0F1726" strokeWidth="1.5" />
      <line x1="22" y1="56" x2="22" y2="46" stroke="#0F1726" strokeWidth="1.5" />
    </g>
  );
}

function RealCat({ x = 0, y = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx="50" cy="50" rx="30" ry="20" fill="#0F1726" stroke="#0F1726" strokeWidth="2" />
      <circle cx="76" cy="30" r="14" fill="#0F1726" />
      <polygon points="64,20 68,8 72,20" fill="#0F1726" />
      <polygon points="80,18 84,6 86,18" fill="#0F1726" />
      <circle cx="72" cy="30" r="2" fill="#F2D03A" />
      <circle cx="82" cy="30" r="2" fill="#F2D03A" />
      {/* tail */}
      <path d="M 22 50 Q 4 40 14 24" stroke="#0F1726" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* legs */}
      <rect x="26" y="64" width="6" height="14" fill="#0F1726" />
      <rect x="40" y="64" width="6" height="14" fill="#0F1726" />
      <rect x="54" y="64" width="6" height="14" fill="#0F1726" />
      <rect x="66" y="64" width="6" height="14" fill="#0F1726" />
    </g>
  );
}

function FishBuddy({ x = 0, y = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx="30" cy="20" rx="22" ry="14" fill="#E8C46A" stroke="#0F1726" strokeWidth="2" />
      <polygon points="8,12 -8,4 -8,36 8,28" fill="#E8C46A" stroke="#0F1726" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="40" cy="18" r="3" fill="#FAF7F0" />
      <circle cx="40" cy="18" r="1.5" fill="#0F1726" />
      <path d="M 42 24 Q 46 28 42 30" stroke="#0F1726" strokeWidth="1.5" fill="none" />
    </g>
  );
}

function Pigeon({ x = 0, y = 0, scale = 1, flip = false }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale}) ${flip ? 'scale(-1, 1) translate(-50, 0)' : ''}`}>
      <ellipse cx="30" cy="30" rx="22" ry="14" fill="#6B7280" stroke="#0F1726" strokeWidth="2" />
      <circle cx="48" cy="20" r="9" fill="#6B7280" stroke="#0F1726" strokeWidth="2" />
      <path d="M 54 20 L 64 18 L 64 24 L 54 24 Z" fill="#E8A437" stroke="#0F1726" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="50" cy="18" r="1.5" fill="#0F1726" />
      <line x1="22" y1="44" x2="22" y2="50" stroke="#0F1726" strokeWidth="2" />
      <line x1="34" y1="44" x2="34" y2="50" stroke="#0F1726" strokeWidth="2" />
      {/* sash */}
      <rect x="8" y="34" width="44" height="4" fill="#C24A3F" stroke="#0F1726" strokeWidth="1" />
    </g>
  );
}

function Dog({ x = 0, y = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx="50" cy="60" rx="34" ry="22" fill="#A57A26" stroke="#0F1726" strokeWidth="2" />
      <circle cx="80" cy="40" r="16" fill="#A57A26" stroke="#0F1726" strokeWidth="2" />
      <path d="M 64 30 L 64 16 L 72 24 Z" fill="#7B2D26" stroke="#0F1726" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M 90 30 L 90 16 L 98 24 Z" fill="#7B2D26" stroke="#0F1726" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="84" cy="38" r="2" fill="#0F1726" />
      <circle cx="76" cy="38" r="2" fill="#0F1726" />
      <ellipse cx="86" cy="48" rx="3" ry="2" fill="#0F1726" />
      <rect x="26" y="78" width="8" height="14" fill="#A57A26" stroke="#0F1726" strokeWidth="1.5" />
      <rect x="44" y="78" width="8" height="14" fill="#A57A26" stroke="#0F1726" strokeWidth="1.5" />
      <rect x="62" y="78" width="8" height="14" fill="#A57A26" stroke="#0F1726" strokeWidth="1.5" />
      <path d="M 18 56 Q 4 50 12 38" stroke="#A57A26" strokeWidth="6" fill="none" strokeLinecap="round" />
    </g>
  );
}

// Standing goose (body + head), used by scenes without a disguise.
function GooseStanding({ x = 0, y = 0, scale = 1, accessory }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx="50" cy="110" rx="40" ry="32" fill="#FAF7F0" stroke="#0F1726" strokeWidth="2.5" />
      <GooseHead x={30} y={50} scale={1.2} accessory={accessory} />
    </g>
  );
}

// ── Scenes ────────────────────────────────────────────────────────────────
//
// Each scene: { kind, caption, render() }
// Caption shows in the bubble; the scene plays for `dur` seconds.
//
const SCENES = [
  // 1 — embassy front
  {
    bg: 'embassy',
    image: '/bureau/scenes/01-embassy.png',
    caption: 'Knocking on the embassy door. Asking for the manager.',
    render: () => (
      <g>
        <GooseHead x={140} y={120} scale={2.0} accessory="detective" />
        <text x={210} y={154} fontFamily="VT323, monospace" fontSize="20" fill="#1B2638">knock knock</text>
        <PoliceOfficer x={280} y={80} scale={0.9} />
      </g>
    ),
  },

  // 2 — talking to two police geese
  {
    bg: 'office',
    image: '/bureau/scenes/02-police.png',
    caption: 'Two police geese. They know things.',
    render: () => (
      <g>
        <PoliceOfficer x={50} y={60} scale={0.85} />
        <PoliceOfficer x={140} y={70} scale={0.85} flip />
        <g transform="translate(280, 80)">
          <PoliceOfficer x={0} y={0} scale={0.9} flip={false} />
          {/* sub-out the police hat — use detective head */}
        </g>
        <text x={260} y={50} fontFamily="VT323, monospace" fontSize="16" fill="#1B2638">…strike Thursday, sì</text>
      </g>
    ),
  },

  // 3 — alley meeting with local "gang"
  {
    bg: 'alley',
    image: '/bureau/scenes/03-locals.png',
    caption: 'Meeting with the locals. They know all the side streets.',
    render: () => (
      <g>
        <GangMember x={40} y={120} scale={0.9} color="#5a1f1a" />
        <GangMember x={300} y={130} scale={0.85} color="#1F2937" />
        <g transform="translate(170, 130)">
          <ellipse cx="50" cy="110" rx="40" ry="32" fill="#FAF7F0" stroke="#0F1726" strokeWidth="2.5" />
          <GooseHead x={30} y={50} scale={1.2} accessory="sunglasses" />
        </g>
        <text x={120} y={100} fontFamily="VT323, monospace" fontSize="16" fill="#F2D03A">"capisco. grazie."</text>
      </g>
    ),
  },

  // 4 — school visit
  {
    bg: 'school',
    image: '/bureau/scenes/04-schoolkids.png',
    caption: 'Asking the children. Children always know.',
    render: () => (
      <g>
        <Schoolchild x={60} y={130} scale={0.95} hair="#7B2D26" />
        <Schoolchild x={160} y={130} scale={0.9} hair="#E8C46A" />
        <Schoolchild x={250} y={130} scale={0.9} hair="#1F8A5B" />
        <g transform="translate(340, 110)">
          <ellipse cx="40" cy="100" rx="34" ry="32" fill="#FAF7F0" stroke="#0F1726" strokeWidth="2.5" />
          <GooseHead x={20} y={48} scale={1.0} />
        </g>
      </g>
    ),
  },

  // 5 — snail chimera in the garden
  {
    bg: 'garden',
    image: '/bureau/scenes/05-snail.png',
    caption: 'Disguised as a snail. The garden snails are weirdly informed.',
    render: () => (
      <g>
        <SnailBody x={130} y={150} />
        <GardenSnail x={320} y={200} scale={1.1} />
        <text x={250} y={150} fontFamily="VT323, monospace" fontSize="18" fill="#1B2638">"slow news day?"</text>
      </g>
    ),
  },

  // 6 — cat chimera meeting the local cats
  {
    bg: 'rooftop',
    image: '/bureau/scenes/06-cats.png',
    caption: 'Disguised as a cat. The Roman cats are connected.',
    render: () => (
      <g>
        <CatBody x={110} y={120} />
        <RealCat x={300} y={150} scale={1.1} />
        <text x={250} y={120} fontFamily="VT323, monospace" fontSize="18" fill="#1B2638">"mrrp. strike thursday."</text>
      </g>
    ),
  },

  // 7 — wizard consultation
  {
    bg: 'wizard',
    image: '/bureau/scenes/07-wizard.png',
    caption: 'Consulting the wizard. Goose checks every source.',
    render: () => (
      <g>
        <GooseStanding x={60} y={100} accessory="detective" />
        <Wizard x={270} y={70} scale={1} />
        <text x={150} y={70} fontFamily="VT323, monospace" fontSize="18" fill="#F2D03A">"the sources are... verified."</text>
      </g>
    ),
  },

  // 8 — fish chimera underwater
  {
    bg: 'fishtank',
    image: '/bureau/scenes/08-fish.png',
    caption: 'Disguised as a fish. The fish at the market hear EVERYTHING.',
    render: () => (
      <g>
        <FishBody x={110} y={110} />
        <FishBuddy x={310} y={140} scale={1.1} />
        <text x={250} y={110} fontFamily="VT323, monospace" fontSize="18" fill="#1B2638">"blub. ferry's late."</text>
      </g>
    ),
  },

  // 9 — gang back room (poker)
  {
    bg: 'gangBackroom',
    image: '/bureau/scenes/09-pokertable.png',
    caption: 'Joined a poker game. Picked up six insights and lost €40.',
    render: () => (
      <g>
        <GangMember x={40} y={120} scale={0.85} color="#5a1f1a" />
        <GooseStanding x={170} y={100} accessory="sunglasses" />
        <GangMember x={310} y={125} scale={0.85} color="#1F2937" />
        <text x={140} y={80} fontFamily="VT323, monospace" fontSize="18" fill="#F2D03A">"all in. on insights."</text>
      </g>
    ),
  },

  // 10 — talking to a dog
  {
    bg: 'park',
    image: '/bureau/scenes/10-dogs.png',
    caption: "Asked a Roman dog. He's lived here longer than most humans.",
    render: () => (
      <g>
        <GooseStanding x={70} y={100} accessory="tourist" />
        <Dog x={260} y={140} scale={1.1} />
        <text x={180} y={100} fontFamily="VT323, monospace" fontSize="18" fill="#1B2638">"woof. avoid the main square."</text>
      </g>
    ),
  },

  // 11 — post office / delivery
  {
    bg: 'office',
    image: '/bureau/scenes/11-postoffice.png',
    caption: "Slipped into the post office. Heard who's mailing what.",
    render: () => (
      <g>
        <GooseStanding x={70} y={100} accessory="reporter" />
        <Pigeon x={280} y={150} scale={1.2} flip />
        <Pigeon x={340} y={165} scale={1} />
      </g>
    ),
  },

  // 12 — pizza delivery finale
  {
    bg: 'park',
    image: '/bureau/scenes/12-pizzadelivery.png',
    caption: "Tailed a pizza courier through the bike lane. He knows every restaurant.",
    render: () => (
      <g>
        <GooseStanding x={60} y={100} accessory="detective" />
        <Pigeon x={300} y={160} scale={1.1} flip />
        <text x={170} y={100} fontFamily="VT323, monospace" fontSize="18" fill="#1B2638">"best margherita? follow me."</text>
      </g>
    ),
  },
];

// ── Theatre component ─────────────────────────────────────────────────────
// Animated minutes-saved counter — climbs smoothly to a randomized target
// per session (3.8h–6.5h). Hard-capped at ~7h so even a 10-min real wait
// never shows ridiculous numbers. easeInCubic curve = small early, jumps
// at end; after totalSec, holds at target.
function InvestigationTheatre({ tick = 0, scenesOverride, totalSec = 20, target: targetProp }) {
  const SCENE_DUR = 2.8;
  const scenes = scenesOverride || SCENES;
  const idx = Math.min(scenes.length - 1, Math.floor(tick / SCENE_DUR));
  const scene = scenes[idx];

  // Target minutes-saved. Prefer caller-supplied (synced with brief meta pill);
  // fallback random if standalone. 230..390 min = 3.8h–6.5h. Hard-cap 420 (7h).
  const targetRef = React.useRef(null);
  if (targetRef.current === null) {
    targetRef.current = (typeof targetProp === 'number' && targetProp > 0)
      ? Math.min(420, targetProp)
      : Math.floor(230 + Math.random() * 160);
  }
  const target = targetRef.current;

  const progress = Math.min(1, tick / totalSec);
  const eased = progress * progress * progress;
  const minutesSaved = Math.min(420, Math.max(5, Math.floor(5 + eased * (target - 5))));
  const display = minutesSaved >= 60
    ? `${(minutesSaved / 60).toFixed(1)} hours`
    : `${minutesSaved} minutes`;
  const isDone = progress >= 0.98;
  const [imgLoaded, setImgLoaded] = React.useState({});
  const [imgFailed, setImgFailed] = React.useState({});

  return (
    <div className="theatre">
      <div className="theatre-key">
        <span className="theatre-key-prelude">{isDone ? 'goose investigation bureau · saved you' : 'goose investigation bureau · saving you'}</span>
        <span className={`theatre-key-counter${isDone ? ' done' : ''}`} key={display}>{display}{isDone ? ' ✓' : ''}</span>
        <span className="theatre-key-coda">of doomscrolling</span>
      </div>
      <div className="theatre-frame" key={idx}>
        {/* Pixel-art SVG shows until the scene's image loads, and stays if the
            image is missing (the PNGs in public/bureau/scenes/ are optional). */}
        {!imgLoaded[idx] && (
          <svg viewBox="0 0 460 280" className="theatre-svg" aria-hidden>
            <Backdrop kind={scene.bg} />
            <g className="theatre-actors">{scene.render?.()}</g>
          </svg>
        )}
        {scene.image && !imgFailed[idx] && (
          <img src={scene.image} alt="" className="theatre-img"
            style={imgLoaded[idx] ? undefined : { display: 'none' }}
            onLoad={() => setImgLoaded((m) => ({ ...m, [idx]: true }))}
            onError={() => setImgFailed((m) => ({ ...m, [idx]: true }))} />
        )}
        <div className="theatre-caption" key={`cap-${idx}`}>
          <span className="theatre-quote">"</span>
          <span>{scene.caption}</span>
        </div>
      </div>
    </div>
  );
}



export { InvestigationTheatre, SCENES };

if (typeof window !== "undefined") {
  Object.assign(window, { InvestigationTheatre, SCENES });
}
