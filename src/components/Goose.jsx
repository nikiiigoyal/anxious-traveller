import React from 'react';

export function Goose({
  outfit = 'default',
  size = 120,
  speech = null,
  honking = false,
  className = '',
}) {
  const OUTLINE = '#0F1726';
  const OUTLINE_W = 2.5;

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {speech && (
        <div className="mb-2 relative bg-[#FAF7F0] border-2 border-[#0F1726] rounded-xl px-3 py-1.5 shadow-[2px_2px_0px_#0F1726] max-w-xs text-center animate-bounce-short">
          <p className="font-pixel text-lg leading-tight text-[#0F1726]">{speech}</p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-[8px] border-t-[#0F1726]" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[3px] border-x-transparent border-t-[6px] border-t-[#FAF7F0]" />
        </div>
      )}

      <svg
        width={size}
        height={size * 1.1}
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-200 ${honking ? 'scale-105' : ''}`}
      >
        {/* Goose Legs */}
        <g className="legs">
          <rect x="85" y="150" width="8" height="30" fill="#E8A437" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
          <rect x="110" y="150" width="8" height="30" fill="#E8A437" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
          <ellipse cx="88" cy="180" rx="16" ry="6" fill="#E8A437" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
          <ellipse cx="114" cy="180" rx="16" ry="6" fill="#E8A437" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
        </g>

        {/* Goose Body */}
        <g className="body">
          <ellipse cx="100" cy="125" rx="55" ry="42" fill="#FAF7F0" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
          {/* Tail feathers */}
          <path d="M150 115 Q168 105 160 125 Z" fill="#FAF7F0" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
          {/* Wing */}
          <path d="M90 115 Q75 110 70 130 Q85 145 105 138 Z" fill="#F0E9D3" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
        </g>

        {/* Goose Neck & Head */}
        <g className="head">
          <path d="M78 100 Q68 75 62 55 Q62 42 74 42 L96 42 L98 100 Z" fill="#0F1726" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
          <ellipse cx="78" cy="40" rx="24" ry="20" fill="#0F1726" stroke={OUTLINE} strokeWidth={OUTLINE_W} />

          {/* Eye */}
          <circle cx="72" cy="35" r="4.5" fill="#FAF7F0" />
          <circle cx="70" cy="36" r="2.2" fill="#0F1726" />
          <circle cx="68.5" cy="34.5" r="0.8" fill="#FAF7F0" />

          {/* Beak */}
          <path d="M55 38 L32 35 L32 46 L55 45 Z" fill="#E8A437" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
          <line x1="32" y1="41" x2="55" y2="41.5" stroke={OUTLINE} strokeWidth="1.5" />
        </g>

        {/* Outfits & Accessories */}
        {outfit === 'sunglasses' && (
          <g className="accessory-sunglasses">
            <rect x="58" y="32" width="16" height="8" rx="2" fill="#0F1726" stroke="#FAF7F0" strokeWidth="1" />
            <rect x="74" y="32" width="10" height="8" rx="2" fill="#0F1726" stroke="#FAF7F0" strokeWidth="1" />
            <line x1="72" y1="36" x2="76" y2="36" stroke="#FAF7F0" strokeWidth="1" />
          </g>
        )}

        {outfit === 'detective' && (
          <g className="accessory-detective">
            {/* Detective Hat */}
            <ellipse cx="78" cy="22" rx="28" ry="4" fill="#7B2D26" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
            <path d="M60 22 Q60 8 78 8 Q96 8 96 22 Z" fill="#7B2D26" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
            {/* Trenchcoat collar */}
            <path d="M68 95 L85 110 L92 95 Z" fill="#C29B38" stroke={OUTLINE} strokeWidth="1.5" />
          </g>
        )}

        {outfit === 'tourist' && (
          <g className="accessory-tourist">
            {/* Tourist sun hat */}
            <ellipse cx="78" cy="24" rx="30" ry="5" fill="#3B82F6" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
            <path d="M62 24 Q62 10 78 10 Q94 10 94 24 Z" fill="#3B82F6" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
            {/* Camera strap */}
            <path d="M65 95 Q85 125 115 135" stroke="#0F1726" strokeWidth="2.5" fill="none" />
            <rect x="88" y="120" width="18" height="12" rx="2" fill="#374151" stroke={OUTLINE} strokeWidth="1.5" />
            <circle cx="97" cy="126" r="3" fill="#60A5FA" />
          </g>
        )}

        {outfit === 'beanie' && (
          <g className="accessory-beanie">
            {/* Cozy Knit Beanie */}
            <path d="M58 28 Q58 10 78 10 Q98 10 98 28 Z" fill="#D97706" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
            <rect x="56" y="24" width="44" height="6" rx="2" fill="#B45309" stroke={OUTLINE} strokeWidth="1.5" />
            <circle cx="78" cy="8" r="4" fill="#FAF7F0" stroke={OUTLINE} strokeWidth="1.5" />
          </g>
        )}

        {outfit === 'wizardHat' && (
          <g className="accessory-wizard">
            {/* Wizard Hat */}
            <path d="M60 25 L80 -5 L96 25 Z" fill="#2E1A6B" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
            <ellipse cx="78" cy="25" rx="25" ry="4" fill="#2E1A6B" stroke={OUTLINE} strokeWidth={OUTLINE_W} />
            <circle cx="85" cy="10" r="2" fill="#F2D03A" />
            <circle cx="72" cy="18" r="1.5" fill="#F2D03A" />
          </g>
        )}
      </svg>
    </div>
  );
}

export default Goose;
