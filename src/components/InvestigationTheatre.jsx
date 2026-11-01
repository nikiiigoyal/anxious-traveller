import React, { useState, useEffect } from 'react';
import { Goose } from './Goose';
import { LAYERS, FUN_FACTS } from '../data/layers';
import { CheckCircle2, Loader2, Sparkles, AlertCircle } from 'lucide-react';

const SCENES = [
  {
    title: 'The Embassy Corridor',
    caption: 'Consulting consular dispatches and foreign ministry cables...',
    outfit: 'detective',
    badge: 'LAYER A',
  },
  {
    title: 'Local Newsstand',
    caption: 'Translating neighborhood gazettes over an espresso...',
    outfit: 'sunglasses',
    badge: 'LAYER B',
  },
  {
    title: 'Digital Wiretap (Reddit & Telegram)',
    caption: 'Sifting through local forums so you do not have to doomscroll...',
    outfit: 'beanie',
    badge: 'LAYER C',
  },
  {
    title: 'Atmospheric Radar Watch',
    caption: 'Negotiating with cloud cover and mapping cobblestone heat indexes...',
    outfit: 'tourist',
    badge: 'LAYER D',
  },
  {
    title: 'Grand Central Bureau',
    caption: 'Compiling signals into a unified executive dossier...',
    outfit: 'wizardHat',
    badge: 'LAYER E',
  },
];

export function InvestigationTheatre({
  destination = 'Destination',
  voice = 'jarvis',
  progress = 0,
  currentLayerIndex = 0,
}) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  // Cycle through scenes every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSceneIndex((prev) => (prev + 1) % SCENES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Cycle through fun facts every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % FUN_FACTS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const activeScene = SCENES[sceneIndex];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Top Banner */}
      <div className="bureau-card p-4 mb-6 flex flex-wrap items-center justify-between gap-3 border-b-2 border-b-[#0F1726]/10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
          <span className="font-pixel text-xl tracking-wider text-[#0F1726]">
            INVESTIGATION IN PROGRESS: <span className="underline decoration-amber-500">{destination.toUpperCase()}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bureau-badge text-sm">VOICE: {voice.toUpperCase()}</span>
          <span className="bureau-badge text-sm bg-amber-100 border-amber-300 text-amber-900 font-bold">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Main Theatre Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: 5 Signal Layers Monitor */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <h3 className="font-pixel text-lg text-ink-muted uppercase tracking-wider px-1">
            Telemetry Signal Layers
          </h3>
          {LAYERS.map((layer, idx) => {
            const isCompleted = idx < currentLayerIndex;
            const isCurrent = idx === currentLayerIndex;

            return (
              <div
                key={layer.id}
                className={`bureau-card p-3 transition-all duration-300 ${
                  isCurrent
                    ? 'border-[#0F1726] shadow-[3px_3px_0px_#0F1726] bg-[#FAF7F0]'
                    : isCompleted
                    ? 'border-[#D8CEBE] opacity-90'
                    : 'opacity-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-sm px-1.5 py-0.5 rounded bg-[#EAE1D2] border border-[#D8CEBE]">
                      {layer.id}
                    </span>
                    <span className="font-semibold text-sm text-[#0F1726]">{layer.name}</span>
                  </div>
                  <div>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-amber-600 animate-spin" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border border-gray-400" />
                    )}
                  </div>
                </div>

                <p className="text-xs text-ink-muted mt-1 leading-snug">
                  {isCurrent
                    ? layer.captions[Math.min(2, layer.captions.length - 1)]
                    : isCompleted
                    ? layer.captions[layer.captions.length - 1]
                    : layer.sub}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Stage Theatre Scene */}
        <div className="md:col-span-7 flex flex-col">
          <div className="bureau-card p-6 flex flex-col items-center text-center relative overflow-hidden flex-1 justify-between min-h-[360px] scanlines bg-gradient-to-b from-[#FAF7F0] to-[#F4EFE6]">
            {/* Top Stage Header */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-[#D8CEBE]">
              <span className="font-pixel text-xs tracking-wider px-2 py-0.5 bg-[#0F1726] text-[#FAF7F0] rounded">
                STAGE {sceneIndex + 1}/{SCENES.length}
              </span>
              <span className="font-pixel text-xs tracking-wider text-ink-muted">
                {activeScene.badge}
              </span>
            </div>

            {/* Middle Stage: Goose + Visual Animation */}
            <div className="my-auto py-4 flex flex-col items-center">
              <Goose
                outfit={activeScene.outfit}
                size={140}
                honking={true}
                speech={activeScene.title}
              />
              <p className="font-hand text-lg text-ink-secondary mt-2 max-w-sm">
                "{activeScene.caption}"
              </p>
            </div>

            {/* Bottom Fun Fact Ticker */}
            <div className="w-full pt-3 border-t border-[#D8CEBE] flex items-center gap-2 text-left">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 animate-spin" />
              <p className="font-pixel text-sm text-ink-muted leading-tight animate-fade-in">
                {FUN_FACTS[factIndex]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestigationTheatre;
