'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Terminal, Dices } from 'lucide-react';
import DitherCanvas, { DitherDotShape, DitherThemeMode } from './DitherCanvas';
import { sounds } from '../utils/sound';
import { ANIMALS, AnimalData } from '../data/animals';

const PRESET_PALETTES = [
  { label: 'Coral & Gold', p: '#FF6B35', s: '#F59E0B' },
  { label: 'Electric Ocean', p: '#2563EB', s: '#06B6D4' },
  { label: 'Neon Mint', p: '#10B981', s: '#84CC16' },
  { label: 'Sunset Berry', p: '#E11D48', s: '#F59E0B' },
  { label: 'Lavender Dream', p: '#8B5CF6', s: '#EC4899' },
  { label: 'Charcoal Minimal', p: '#1E293B', s: '#64748B' },
];

interface HeroProps {
  onOpenLoading?: () => void;
}

export default function Hero({ onOpenLoading }: HeroProps = {}) {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalData>(ANIMALS[0]);
  const [dotShape, setDotShape] = useState<DitherDotShape>('square');
  const [cells, setCells] = useState(64);
  const [color, setColor] = useState(ANIMALS[0].color);
  const [secondaryColor, setSecondaryColor] = useState('#F59E0B');
  const [themeMode, setThemeMode] = useState<DitherThemeMode>('solid');
  const [gradientAngle, setGradientAngle] = useState(90);
  const [twoToneMix, setTwoToneMix] = useState(0.35);
  const [isSignaturePlaying, setIsSignaturePlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const [floatingActionText, setFloatingActionText] = useState<string | null>(null);

  // Pick a random pet from all 50 animals on initial mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * ANIMALS.length);
    const pet = ANIMALS[randomIndex];
    setSelectedAnimal(pet);
    setColor(pet.color);
  }, []);

  const pickRandomPet = () => {
    sounds.playSpecialMove();
    const randomIndex = Math.floor(Math.random() * ANIMALS.length);
    const pet = ANIMALS[randomIndex];
    setSelectedAnimal(pet);
    setColor(pet.color);
    showFloatingFeedback(`✨ ${pet.emoji} ${pet.name}!`);
  };

  const showFloatingFeedback = (text: string) => {
    setFloatingActionText(text);
    setTimeout(() => setFloatingActionText(null), 1800);
  };

  const copyCmd = () => {
    sounds.playSparkle();
    navigator.clipboard.writeText('flutter pub add dither_animals');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePoke = () => {
    sounds.playBoing();
    showFloatingFeedback('🐾 Poke Boing!');
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Soft ambient colorful blur circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] bg-gradient-to-tr from-orange-200/40 via-amber-100/30 to-rose-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Cute & Minimalist Typography */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Hand-drawn style Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50/80 border border-amber-200/80 shadow-2xs text-xs text-amber-900 font-medium rotate-[-1deg]">
              <span className="text-amber-500">✏️</span>
              <span>Handcrafted Flutter package</span>
              <span className="text-neutral-300">•</span>
              <span className="font-handwritten text-orange-600 font-bold text-sm">~50 companions!~</span>
            </div>

            {/* Friendly Headline with Hand-drawn Squiggly Underline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.14]">
              Cute pixel pets, <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                  ordered dithered.
                </span>
                {/* Hand-drawn squiggly brush underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3.5 text-orange-400 pointer-events-none overflow-visible"
                  viewBox="0 0 240 14"
                  fill="none"
                >
                  <path
                    d="M 3 9 C 40 2 80 12 120 7 C 160 2 200 11 237 8"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Authentic <span className="marker-highlight font-medium text-neutral-900">8×8 Bayer matrix</span> stipples, editable color themes, gentle breathing, and signature special moves. Drop into any Flutter app.
            </p>

            {/* Quick Install Command Box (Prominent & Clean) */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <div
                onClick={copyCmd}
                className="group flex items-center justify-between sm:justify-start gap-4 px-6 py-4 bg-white/95 hover:bg-orange-50/40 border-2 border-orange-200/80 hover:border-orange-400 rounded-2xl font-mono text-sm sm:text-base text-neutral-800 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto"
                title="Click to copy pub add command"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200/70 shadow-2xs group-hover:scale-110 transition-transform">
                    <Terminal className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="font-semibold tracking-tight text-neutral-900">flutter pub add dither_animals</span>
                </div>
                
                <div className="flex items-center gap-2 pl-3 border-l border-neutral-200 text-neutral-400 group-hover:text-orange-600">
                  {copied ? (
                    <span className="flex items-center gap-1.5 text-xs font-sans font-bold text-emerald-600 animate-pulse">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied!</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-sans font-semibold text-neutral-400 group-hover:text-orange-600 transition-colors">
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">Copy</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Pet Preview Card */}
          <div className="lg:col-span-6 flex flex-col items-center relative">
            {/* Hand-drawn Doodle Annotation Arrow */}
            <div className="hidden sm:flex items-center gap-1.5 absolute -top-8 -left-6 z-20 text-neutral-600 select-none pointer-events-none rotate-[-4deg]">
              <span className="font-handwritten text-base text-orange-600 font-bold">click me!</span>
              <svg width="36" height="24" viewBox="0 0 36 24" fill="none" className="text-orange-500 stroke-current">
                <path d="M 4 8 C 13 4 22 5 28 15 C 30 18 31 19 32 20" strokeWidth="2" strokeLinecap="round" />
                <path d="M 24 18 L 32 20 L 30 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="relative w-full max-w-md p-6 sm:p-7 rounded-[3rem] washi-tape bg-gradient-to-b from-white/95 to-orange-50/40 border-2 border-orange-100/90 shadow-[0_25px_60px_-10px_rgba(255,107,53,0.12)] transition-all">
              
              {/* Mascot Screen Display (Random character loaded on every visit/roll) */}
              <div
                onMouseEnter={() => setIsHeroHovered(true)}
                onMouseLeave={() => setIsHeroHovered(false)}
                className="relative flex justify-center items-center py-6 my-1 rounded-[2.5rem] bg-gradient-to-b from-orange-50/60 to-amber-50/30 border border-orange-100/70 overflow-hidden cursor-pointer group shadow-inner"
              >
                {/* Pet Name & Poke Badge */}
                <div className="absolute top-3 left-4 text-[10px] font-mono font-semibold text-orange-600 bg-white/95 border border-orange-100 px-2.5 py-0.5 rounded-full shadow-xs select-none flex items-center gap-1">
                  <span>{selectedAnimal.emoji}</span>
                  <span>{selectedAnimal.name}</span>
                </div>

                {/* Randomize Character Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    pickRandomPet();
                  }}
                  className="absolute top-3 right-4 z-20 flex items-center gap-1 text-[10px] font-mono font-semibold text-neutral-600 bg-white/95 hover:bg-orange-50 hover:text-orange-600 border border-neutral-200/70 hover:border-orange-200 px-2.5 py-1 rounded-full shadow-xs transition-all hover:scale-105"
                  title="Roll a random animal from all 50!"
                >
                  <Dices className="w-3.5 h-3.5 text-orange-500" />
                  <span>Roll Random</span>
                </button>

                {/* Floating Action Feedback Bubble */}
                {floatingActionText && (
                  <div className="absolute top-10 right-4 z-20 px-3 py-1 rounded-full bg-orange-500 text-white font-mono text-xs font-bold shadow-md animate-bounce">
                    {floatingActionText}
                  </div>
                )}

                {/* THE REAL CANVAS COMPONENT */}
                <DitherCanvas
                  animalId={selectedAnimal.id}
                  size={240}
                  cells={cells}
                  dotShape={dotShape}
                  color={color}
                  secondaryColor={secondaryColor}
                  themeMode={themeMode}
                  gradientAngle={gradientAngle}
                  twoToneMix={twoToneMix}
                  interactive={true}
                  animated={true}
                  animateOnHoverOnly={true}
                  isHovered={isHeroHovered}
                  signatureActive={isSignaturePlaying}
                  onSignatureEnd={() => setIsSignaturePlaying(false)}
                  showFace={true}
                  onPoke={handlePoke}
                  className="mx-auto drop-shadow-sm transition-transform group-hover:scale-105"
                />
              </div>

              {/* CONTROLS: Color Themes, Dot Shapes, and Palettes */}
              <div className="pt-3 space-y-3 border-t border-orange-100/60 text-xs">
                
                {/* Color Theme Mode Switcher */}
                <div>
                  <div className="flex items-center justify-between text-neutral-500 mb-1.5 font-medium">
                    <span>Color Theme Mode:</span>
                    <span className="font-semibold text-orange-600 capitalize">{themeMode}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-white/80 rounded-full border border-orange-100/70 shadow-2xs">
                    {(['solid', 'twoTone', 'gradient'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => {
                          sounds.playClick();
                          setThemeMode(mode);
                        }}
                        className={`py-1 rounded-full text-xs capitalize transition-all font-medium ${
                          themeMode === mode
                            ? 'bg-neutral-900 text-white shadow-xs'
                            : 'text-neutral-600 hover:text-neutral-900'
                        }`}
                      >
                        {mode === 'twoTone' ? 'Two-Tone' : mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Pickers & Presets */}
                <div className="p-3 bg-white/80 rounded-2xl border border-orange-100/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600 font-medium text-[11px]">Edit Colors:</span>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <span className="text-[10px] text-neutral-400 font-mono">Pri:</span>
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="w-6 h-6 rounded-full cursor-pointer border border-neutral-300 p-0 overflow-hidden bg-transparent shadow-2xs"
                          title="Pick primary color"
                        />
                      </label>

                      {themeMode !== 'solid' && (
                        <label className="flex items-center gap-1.5 cursor-pointer animate-fade-in">
                          <span className="text-[10px] text-neutral-400 font-mono">Sec:</span>
                          <input
                            type="color"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="w-6 h-6 rounded-full cursor-pointer border border-neutral-300 p-0 overflow-hidden bg-transparent shadow-2xs"
                            title="Pick secondary color"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Preset Cute Color Swatches */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-neutral-400 font-mono">Presets:</span>
                    <div className="flex items-center gap-1.5">
                      {PRESET_PALETTES.map((pal) => (
                        <button
                          key={pal.label}
                          onClick={() => {
                            sounds.playClick();
                            setColor(pal.p);
                            setSecondaryColor(pal.s);
                          }}
                          className={`w-4 h-4 rounded-full transition-transform ${
                            color === pal.p ? 'scale-125 ring-2 ring-orange-500 ring-offset-1' : 'hover:scale-110'
                          }`}
                          style={{
                            background:
                              themeMode === 'solid'
                                ? pal.p
                                : `linear-gradient(135deg, ${pal.p} 50%, ${pal.s} 50%)`,
                          }}
                          title={pal.label}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Gradient Angle / Two-Tone Mix Slider */}
                  {themeMode === 'gradient' && (
                    <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                      <span>Gradient Angle:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="360"
                          step="45"
                          value={gradientAngle}
                          onChange={(e) => setGradientAngle(Number(e.target.value))}
                          className="w-24 accent-orange-500 h-1"
                        />
                        <span>{gradientAngle}°</span>
                      </div>
                    </div>
                  )}

                  {themeMode === 'twoTone' && (
                    <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                      <span>Two-Tone Mix:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0.1"
                          max="0.8"
                          step="0.05"
                          value={twoToneMix}
                          onChange={(e) => setTwoToneMix(Number(e.target.value))}
                          className="w-24 accent-orange-500 h-1"
                        />
                        <span>{Math.round(twoToneMix * 100)}%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dot Geometry Selector */}
                <div>
                  <div className="flex items-center justify-between text-neutral-500 mb-1.5 font-medium">
                    <span className="text-[11px]">Dot Matrix Geometry:</span>
                    <span className="text-neutral-900 capitalize font-semibold">{dotShape}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 p-1 bg-white/80 rounded-full border border-orange-100/70 shadow-2xs">
                    {(['square', 'round', 'hex', 'diamond'] as const).map((shape) => (
                      <button
                        key={shape}
                        onClick={() => {
                          sounds.playClick();
                          setDotShape(shape);
                        }}
                        className={`py-1 rounded-full text-xs capitalize transition-all font-medium ${
                          dotShape === shape
                            ? 'bg-neutral-900 text-white shadow-xs'
                            : 'text-neutral-600 hover:text-neutral-900'
                        }`}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
