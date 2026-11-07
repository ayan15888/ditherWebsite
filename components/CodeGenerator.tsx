'use client';

import React, { useState } from 'react';
import { ANIMALS } from '../data/animals';
import { Code2, Copy, Check, Sparkles, Terminal } from 'lucide-react';

export default function CodeGenerator() {
  const [animal, setAnimal] = useState('cat');
  const [widgetType, setWidgetType] = useState<'DitherPet' | 'DitherAnimal'>('DitherPet');
  const [mood, setMood] = useState<'happy' | 'neutral' | 'angry' | 'sleepy'>('happy');
  const [dot, setDot] = useState<'round' | 'square' | 'hex' | 'diamond'>('round');
  const [themeMode, setThemeMode] = useState<'solid' | 'gradient' | 'twoTone'>('solid');
  const [pokeable, setPokeable] = useState(true);
  const [signature, setSignature] = useState(true);
  const [copied, setCopied] = useState(false);

  const selectedAnimal = ANIMALS.find((a) => a.id === animal) || ANIMALS[0];

  const generateCode = () => {
    if (widgetType === 'DitherPet') {
      return `import 'package:dither_animals/dither_animals.dart';
import 'package:flutter/material.dart';

// Ultra-clean 1-line Pet Drop-in
Widget pet = const DitherPet.${selectedAnimal.id}(
  mood: PetMood.${mood},
  theme: PetTheme.${themeMode},
  dot: PetDot.${dot},
  size: 140,
);`;
    }

    return `import 'package:dither_animals/dither_animals.dart';
import 'package:flutter/material.dart';

// Granular Customizable DitherAnimal Widget
Widget animal = SizedBox(
  width: 150,
  height: 150,
  child: DitherAnimal(
    animal: DitherAnimalType.${selectedAnimal.id},
    dot: DitherDot.${dot},
    cells: 96,
    pokeable: ${pokeable},
    signature: ${signature},
    expression: DitherExpression.${mood},
    theme: const DitherTheme(
      mode: DitherColorMode.${themeMode},
      primary: ${selectedAnimal.color.replace('#', 'Color(0xFF')}),
    ),
    hooks: DitherHooks.haptics(),
  ),
);`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="generator" className="py-20 bg-dither-dark border-b border-dither-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono">
            <Code2 className="w-3.5 h-3.5" />
            <span>Interactive Code Builder</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Flutter Code Generator
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Configure any animal, choose between the high-level `DitherPet` or granular `DitherAnimal`, and copy production-ready Flutter code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-5 bg-dither-card p-6 rounded-3xl border border-dither-border">
            {/* Widget Mode Toggle */}
            <div>
              <label className="text-xs font-mono text-gray-400 mb-2 block">Widget API Mode:</label>
              <div className="grid grid-cols-2 gap-2">
                {(['DitherPet', 'DitherAnimal'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setWidgetType(type)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-medium transition-all ${
                      widgetType === type
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {type} {type === 'DitherPet' ? '(Fastest)' : '(Custom)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Animal Dropdown */}
            <div>
              <label className="text-xs font-mono text-gray-400 mb-1.5 block">Select Animal:</label>
              <select
                value={animal}
                onChange={(e) => setAnimal(e.target.value)}
                className="w-full py-2.5 px-3 bg-dither-dark border border-dither-border rounded-xl text-sm text-white font-mono focus:outline-none focus:border-blue-500"
              >
                {ANIMALS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.emoji} {a.name} ({a.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Mood Picker */}
            <div>
              <label className="text-xs font-mono text-gray-400 mb-2 block">Facial Mood:</label>
              <div className="grid grid-cols-4 gap-2">
                {(['happy', 'neutral', 'angry', 'sleepy'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-mono capitalize transition-all ${
                      mood === m
                        ? 'bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Dot Shape */}
            <div>
              <label className="text-xs font-mono text-gray-400 mb-2 block">Dot Shape:</label>
              <div className="grid grid-cols-4 gap-2">
                {(['round', 'square', 'hex', 'diamond'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDot(d)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-mono capitalize transition-all ${
                      dot === d
                        ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Mode */}
            <div>
              <label className="text-xs font-mono text-gray-400 mb-2 block">Theme Style:</label>
              <div className="grid grid-cols-3 gap-2">
                {(['solid', 'gradient', 'twoTone'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setThemeMode(t)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-mono capitalize transition-all ${
                      themeMode === t
                        ? 'bg-green-500/20 border border-green-500/40 text-green-300 font-bold'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            {widgetType === 'DitherAnimal' && (
              <div className="pt-2 border-t border-white/5 space-y-2">
                <label className="flex items-center justify-between text-xs font-mono text-gray-300 cursor-pointer">
                  <span>Interactive Poke Wave:</span>
                  <input
                    type="checkbox"
                    checked={pokeable}
                    onChange={(e) => setPokeable(e.target.checked)}
                    className="accent-blue-500 w-4 h-4 rounded"
                  />
                </label>
                <label className="flex items-center justify-between text-xs font-mono text-gray-300 cursor-pointer">
                  <span>Signature Move Action:</span>
                  <input
                    type="checkbox"
                    checked={signature}
                    onChange={(e) => setSignature(e.target.checked)}
                    className="accent-blue-500 w-4 h-4 rounded"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Code Output Column */}
          <div className="lg:col-span-7 bg-dither-card rounded-3xl border border-dither-border overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-dither-border">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-mono text-gray-300">
                  {selectedAnimal.id}_widget.dart
                </span>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-medium transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="p-6 text-xs sm:text-sm font-mono text-gray-200 overflow-x-auto leading-relaxed bg-black/60">
              <code>{generateCode()}</code>
            </pre>

            <div className="p-4 bg-black/30 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
              <span>Ready for Flutter 3.10+ / Dart 3.0+</span>
              <span className="text-green-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Tested with 0 warnings
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

