'use client';

import React, { useState, useEffect } from 'react';
import { ANIMALS } from '../data/animals';
import DitherCanvas, { DitherDotShape, DitherThemeMode } from './DitherCanvas';
import { Copy, Check, Terminal, Sparkles, X, ChevronDown } from 'lucide-react';
import { sounds } from '../utils/sound';

const PRESET_PALETTES = [
  { label: 'Sunset Coral', p: '#FF6B35', s: '#F59E0B' },
  { label: 'Klein Blue', p: '#2563EB', s: '#06B6D4' },
  { label: 'Emerald Mint', p: '#10B981', s: '#84CC16' },
  { label: 'Berry Violet', p: '#8B5CF6', s: '#EC4899' },
  { label: 'Warm Amber', p: '#D97706', s: '#FCD34D' },
  { label: 'Midnight Slate', p: '#1E293B', s: '#64748B' },
];

const MOODS = [
  { id: 'happy', label: 'Happy', emoji: '😊' },
  { id: 'neutral', label: 'Calm', emoji: '😐' },
  { id: 'angry', label: 'Fierce', emoji: '😤' },
  { id: 'sleepy', label: 'Sleepy', emoji: '😴' },
] as const;

const DOT_SHAPES: { id: DitherDotShape; label: string; icon: string }[] = [
  { id: 'square', label: 'Square', icon: '■' },
  { id: 'round', label: 'Round', icon: '●' },
  { id: 'hex', label: 'Hex', icon: '⬡' },
  { id: 'diamond', label: 'Diamond', icon: '◆' },
];

interface CodeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  animalId?: string;
  defaultDotShape?: DitherDotShape;
}

export default function CodeGeneratorModal({
  isOpen,
  onClose,
  animalId = 'cat',
  defaultDotShape = 'square',
}: CodeGeneratorModalProps) {
  const [selectedAnimalId, setSelectedAnimalId] = useState(animalId);
  const [widgetType, setWidgetType] = useState<'DitherAnimal' | 'DitherPet'>('DitherAnimal');
  const [mood, setMood] = useState<'happy' | 'neutral' | 'angry' | 'sleepy'>('happy');
  const [dot, setDot] = useState<DitherDotShape>(defaultDotShape);
  const [themeMode, setThemeMode] = useState<DitherThemeMode>('solid');
  const [primaryColor, setPrimaryColor] = useState('#FF6B35');
  const [secondaryColor, setSecondaryColor] = useState('#F59E0B');
  const [gradientAngle, setGradientAngle] = useState(90);
  const [twoToneMix, setTwoToneMix] = useState(0.35);
  const [pokeable, setPokeable] = useState(true);
  const [signature, setSignature] = useState(true);
  const [isSignaturePlaying, setIsSignaturePlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPreviewHovered, setIsPreviewHovered] = useState(false);

  // Sync state whenever animalId changes
  useEffect(() => {
    if (animalId) {
      setSelectedAnimalId(animalId);
      const found = ANIMALS.find((a) => a.id === animalId);
      if (found) {
        setPrimaryColor(found.color);
      }
    }
  }, [animalId]);

  // Handle ESC key and body scroll locking
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentAnimal = ANIMALS.find((a) => a.id === selectedAnimalId) || ANIMALS[0];

  const colorToDartHex = (hex: string) => `0xFF${hex.replace('#', '').toUpperCase()}`;

  const generateCode = () => {
    if (widgetType === 'DitherPet') {
      return `import 'package:dither_animals/dither_animals.dart';
import 'package:flutter/material.dart';

Widget pet = DitherPet.${currentAnimal.id}(
  mood: PetMood.${mood},
  dot: PetDot.${dot},
  theme: ${
    themeMode === 'solid'
      ? `PetTheme.solid`
      : themeMode === 'twoTone'
      ? `PetTheme.twoTone`
      : `PetTheme.gradient`
  },
  size: 140,
);`;
    }

    let themeDart = '';
    if (themeMode === 'solid') {
      themeDart = `const DitherTheme(
      mode: DitherColorMode.solid,
      primary: Color(${colorToDartHex(primaryColor)}),
    )`;
    } else if (themeMode === 'twoTone') {
      themeDart = `const DitherTheme(
      mode: DitherColorMode.twoTone,
      primary: Color(${colorToDartHex(primaryColor)}),
      secondary: Color(${colorToDartHex(secondaryColor)}),
      twoToneMix: ${twoToneMix},
    )`;
    } else {
      themeDart = `const DitherTheme(
      mode: DitherColorMode.gradient,
      primary: Color(${colorToDartHex(primaryColor)}),
      secondary: Color(${colorToDartHex(secondaryColor)}),
      gradientAngle: ${gradientAngle},
    )`;
    }

    return `import 'package:dither_animals/dither_animals.dart';
import 'package:flutter/material.dart';

Widget mascot = SizedBox(
  width: 150,
  height: 150,
  child: DitherAnimal(
    animal: DitherAnimalType.${currentAnimal.id},
    dot: DitherDot.${dot},
    cells: 80,
    pokeable: ${pokeable},
    signature: ${signature}, // ${currentAnimal.signature}
    expression: DitherExpression.${mood},
    theme: ${themeDart},
    hooks: DitherHooks.haptics(),
  ),
);`;
  };

  const copyCode = () => {
    sounds.playClick();
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playSignature = () => {
    sounds.playSpecialMove();
    setIsSignaturePlaying(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/65 backdrop-blur-md transition-opacity"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Modal Dialog Window */}
      <div
        className="relative w-full max-w-6xl max-h-[94vh] bg-[#FCFAF7] rounded-3xl sm:rounded-[2.25rem] border border-orange-100/90 shadow-[0_25px_80px_rgba(0,0,0,0.22)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sleek Responsive Header */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-3.5 bg-white/90 border-b border-orange-100/70 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-xl sm:text-2xl shadow-xs">
              {currentAnimal.emoji}
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="font-extrabold text-sm sm:text-lg text-neutral-900 tracking-tight">
                  {currentAnimal.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 font-mono text-[10px] sm:text-[11px] font-semibold">
                  {currentAnimal.category}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-400">Flutter Mascot Generator</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-all shadow-xs"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Responsive Layout */}
        <div className="p-3.5 sm:p-7 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
            
            {/* COLUMN 1: MASCOT PREVIEW */}
            <div className="lg:col-span-4 flex flex-col space-y-3.5">
              {/* Mascot Stage Card */}
              <div
                onMouseEnter={() => setIsPreviewHovered(true)}
                onMouseLeave={() => setIsPreviewHovered(false)}
                className="relative flex-1 min-h-[300px] flex flex-col items-center justify-between p-5 rounded-[2rem] bg-gradient-to-b from-orange-50/60 via-white to-amber-50/20 border border-orange-100/70 shadow-inner group"
              >
                {/* Top Controls on Stage: Selector & Special Move */}
                <div className="flex items-center justify-between w-full gap-2">
                  <div className="relative">
                    <select
                      value={selectedAnimalId}
                      onChange={(e) => {
                        const id = e.target.value;
                        setSelectedAnimalId(id);
                        const found = ANIMALS.find((a) => a.id === id);
                        if (found) setPrimaryColor(found.color);
                      }}
                      className="appearance-none bg-white/90 hover:bg-white border border-neutral-200/80 rounded-full text-xs font-semibold text-neutral-800 pl-3 pr-7 py-1.5 focus:border-orange-400 focus:outline-none shadow-xs cursor-pointer transition-colors"
                    >
                      {ANIMALS.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.emoji} {a.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <button
                    onClick={playSignature}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xs transition-all hover:scale-105 active:scale-95"
                    title={currentAnimal.signature}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                    <span>Special Move</span>
                  </button>
                </div>

                {/* Animated Mascot Canvas */}
                <div className="py-2 flex items-center justify-center">
                  <DitherCanvas
                    animalId={currentAnimal.id}
                    size={185}
                    cells={64}
                    dotShape={dot}
                    color={primaryColor}
                    secondaryColor={secondaryColor}
                    themeMode={themeMode}
                    gradientAngle={gradientAngle}
                    twoToneMix={twoToneMix}
                    interactive={true}
                    animated={true}
                    animateOnHoverOnly={true}
                    isHovered={isPreviewHovered}
                    signatureActive={isSignaturePlaying}
                    onSignatureEnd={() => setIsSignaturePlaying(false)}
                    showFace={true}
                    onPoke={() => sounds.playPoke()}
                    className="transition-transform group-hover:scale-105 cursor-pointer"
                  />
                </div>

                {/* Clean signature title */}
                <div className="text-center">
                  <span className="text-xs font-medium text-neutral-500">
                    {currentAnimal.signature}
                  </span>
                </div>
              </div>

              {/* Mood Selector Tabs */}
              <div className="p-3 bg-white rounded-2xl border border-orange-100/80 shadow-xs">
                <div className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-2">
                  Mood
                </div>
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-neutral-100/70 rounded-xl">
                  {MOODS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMood(m.id)}
                      className={`py-1.5 px-1 text-xs rounded-lg transition-all text-center font-medium flex items-center justify-center gap-1 ${
                        mood === m.id
                          ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                          : 'text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      <span className="text-sm">{m.emoji}</span>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* COLUMN 2: SETTINGS */}
            <div className="lg:col-span-4 flex flex-col space-y-3.5">
              
              {/* API Mode */}
              <div className="p-3 bg-white rounded-2xl border border-orange-100/80 shadow-xs">
                <div className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-2">
                  API
                </div>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-100/70 rounded-xl">
                  {(['DitherAnimal', 'DitherPet'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setWidgetType(type)}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-all text-center ${
                        widgetType === type
                          ? 'bg-white text-neutral-900 shadow-xs'
                          : 'text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Theme Selector */}
              <div className="p-3 bg-white rounded-2xl border border-orange-100/80 shadow-xs space-y-3">
                <div className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">
                  Theme
                </div>
                
                {/* Mode Segmented Controls */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-100/70 rounded-xl">
                  {(['solid', 'twoTone', 'gradient'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setThemeMode(mode)}
                      className={`py-1.5 text-xs capitalize rounded-lg transition-all text-center font-medium ${
                        themeMode === mode
                          ? 'bg-orange-500 text-white shadow-xs font-semibold'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {mode === 'twoTone' ? 'Two-Tone' : mode}
                    </button>
                  ))}
                </div>

                {/* Swatches & Color Picker */}
                <div className="flex items-center justify-between pt-1">
                  {/* Preset Swatches */}
                  <div className="flex items-center gap-1.5">
                    {PRESET_PALETTES.map((pal) => (
                      <button
                        key={pal.label}
                        onClick={() => {
                          setPrimaryColor(pal.p);
                          setSecondaryColor(pal.s);
                        }}
                        className={`w-5 h-5 rounded-full transition-transform ${
                          primaryColor === pal.p ? 'scale-125 ring-2 ring-orange-500 ring-offset-1' : 'hover:scale-110'
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

                  {/* Native Pickers */}
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-6 h-6 rounded-full cursor-pointer border border-neutral-300 p-0 overflow-hidden bg-transparent shadow-xs"
                      />
                    </label>

                    {themeMode !== 'solid' && (
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-6 h-6 rounded-full cursor-pointer border border-neutral-300 p-0 overflow-hidden bg-transparent shadow-xs"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Slider for Gradient / TwoTone */}
                {themeMode === 'gradient' && (
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-mono">
                    <span>Angle</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="360"
                        step="45"
                        value={gradientAngle}
                        onChange={(e) => setGradientAngle(Number(e.target.value))}
                        className="w-24 accent-orange-500 h-1.5 rounded-full"
                      />
                      <span>{gradientAngle}°</span>
                    </div>
                  </div>
                )}

                {themeMode === 'twoTone' && (
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-mono">
                    <span>Mix</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0.1"
                        max="0.8"
                        step="0.05"
                        value={twoToneMix}
                        onChange={(e) => setTwoToneMix(Number(e.target.value))}
                        className="w-24 accent-orange-500 h-1.5 rounded-full"
                      />
                      <span>{Math.round(twoToneMix * 100)}%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Dot Shape Selector */}
              <div className="p-3 bg-white rounded-2xl border border-orange-100/80 shadow-xs">
                <div className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-2">
                  Dot Shape
                </div>
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-neutral-100/70 rounded-xl">
                  {DOT_SHAPES.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDot(d.id)}
                      className={`py-1.5 text-xs rounded-lg transition-all text-center flex items-center justify-center gap-1.5 font-medium ${
                        dot === d.id
                          ? 'bg-neutral-900 text-white shadow-xs font-semibold'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      <span className="text-sm leading-none">{d.icon}</span>
                      <span>{d.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Poke Shockwave Toggle */}
              <div className="p-3 bg-white rounded-2xl border border-orange-100/80 shadow-xs flex items-center justify-between text-xs">
                <label className="flex items-center gap-2.5 cursor-pointer font-medium text-neutral-700">
                  <input
                    type="checkbox"
                    checked={pokeable}
                    onChange={(e) => setPokeable(e.target.checked)}
                    className="accent-orange-500 w-4 h-4 rounded cursor-pointer"
                  />
                  <span>Interactive Poke & Haptics</span>
                </label>
              </div>

            </div>

            {/* COLUMN 3: FLUTTER CODE & COPY ACTION */}
            <div className="lg:col-span-4 flex flex-col space-y-3.5">
              
              {/* Code Window */}
              <div className="flex-1 flex flex-col bg-neutral-950 rounded-[2rem] overflow-hidden shadow-xl border border-neutral-800/90">
                {/* IDE Style Title Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-neutral-400 font-mono text-xs ml-2">
                      dither_{currentAnimal.id}.dart
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest px-2 py-0.5 rounded bg-neutral-800">
                    Flutter
                  </span>
                </div>

                {/* Preformatted Code */}
                <pre className="flex-1 p-4 sm:p-5 font-mono text-xs text-neutral-200 overflow-x-auto leading-relaxed select-all min-h-[290px] max-h-[380px]">
                  <code>{generateCode()}</code>
                </pre>
              </div>

              {/* Prominent Copy Action */}
              <button
                onClick={copyCode}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-600 hover:via-amber-600 hover:to-rose-600 text-white font-bold text-sm shadow-md shadow-orange-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Copied to Clipboard! 🎉</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Flutter Code</span>
                  </>
                )}
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
