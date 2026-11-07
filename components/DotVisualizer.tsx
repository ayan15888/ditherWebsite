'use client';

import React, { useState } from 'react';
import { Layers, Sliders, Palette, Zap } from 'lucide-react';

export default function DotVisualizer() {
  const [activeShape, setActiveShape] = useState<'square' | 'round' | 'hex' | 'diamond'>('square');
  const [cells, setCells] = useState(80);
  const [colorMode, setColorMode] = useState<'solid' | 'twoTone' | 'gradient'>('solid');

  const shapes = [
    {
      id: 'square',
      name: 'Square Pixel',
      desc: 'Crisp 80s/90s Mac system retro pixel look. Highest frame rate and authentic order.',
      icon: '▪',
    },
    {
      id: 'round',
      name: 'Round Halftone',
      desc: 'Organic print-style stipple circles. Smooth circular multi-layer shading.',
      icon: '●',
    },
    {
      id: 'hex',
      name: 'Hexagonal',
      desc: 'Stylized honeycomb matrix with modern geometric gaming aesthetic.',
      icon: '⬡',
    },
    {
      id: 'diamond',
      name: 'Diamond Point',
      desc: '45-degree rotated diamond tiles for sharp retro RPG aesthetics.',
      icon: '◆',
    },
  ] as const;

  return (
    <section id="visualizer" className="py-20 bg-dither-card/50 border-b border-dither-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>Ordered Dither Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Matrix Dot Styles & Resolution
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Choose between 4 distinct dot geometries and fine-tune your grid density from coarse retro pixels to ultra-fine stipple shading.
          </p>
        </div>

        {/* Visualizer Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6 bg-dither-card p-6 rounded-3xl border border-dither-border">
            {/* Shape Buttons */}
            <div>
              <label className="text-xs font-mono text-gray-400 mb-2 block flex items-center justify-between">
                <span>Select Dot Shape:</span>
                <span className="text-white capitalize">{activeShape}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveShape(s.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      activeShape === s.id
                        ? 'bg-blue-600/20 border-blue-500/60 text-white'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="text-lg">{s.icon}</span>
                    <div>
                      <div className="text-xs font-semibold">{s.name}</div>
                      <div className="text-[10px] text-gray-400 font-mono">DitherDot.{s.id}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Density Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-gray-400">Grid Resolution:</span>
                <span className="text-blue-400 font-bold">{cells} × {cells} cells</span>
              </div>
              <input
                type="range"
                min="40"
                max="128"
                step="4"
                value={cells}
                onChange={(e) => setCells(Number(e.target.value))}
                className="w-full accent-blue-500 bg-dither-dark h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
                <span>40 (Coarse Retro)</span>
                <span>80 (Balanced)</span>
                <span>128 (Ultra Fine)</span>
              </div>
            </div>

            {/* Color Mode Picker */}
            <div>
              <label className="text-xs font-mono text-gray-400 mb-2 block">
                Theming Color Mode:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['solid', 'twoTone', 'gradient'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setColorMode(mode)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-medium capitalize border transition-all ${
                      colorMode === mode
                        ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 font-mono text-xs text-gray-300">
              <div className="text-gray-500 text-[10px] mb-1">// Generated Flutter configuration:</div>
              <div className="text-blue-400">DitherAnimal(</div>
              <div className="pl-4 text-orange-400">animal: DitherAnimalType.frog,</div>
              <div className="pl-4 text-purple-400">dot: DitherDot.{activeShape},</div>
              <div className="pl-4 text-green-400">cells: {cells},</div>
              {colorMode !== 'solid' && (
                <div className="pl-4 text-pink-400">
                  theme: DitherTheme(mode: DitherColorMode.{colorMode}),
                </div>
              )}
              <div className="text-blue-400">)</div>
            </div>
          </div>

          {/* Demonstration Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {shapes.map((s) => (
              <div
                key={s.id}
                onClick={() => setActiveShape(s.id)}
                className={`cursor-pointer p-6 rounded-3xl border transition-all ${
                  activeShape === s.id
                    ? 'bg-dither-card border-blue-500 shadow-xl glow-blue'
                    : 'bg-dither-card/50 border-dither-border hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl text-blue-400">
                    {s.icon}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400">
                    DitherDot.{s.id}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5">{s.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{s.desc}</p>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>Status:</span>
                  <span className={activeShape === s.id ? 'text-blue-400 font-bold' : 'text-gray-500'}>
                    {activeShape === s.id ? 'Active Matrix' : 'Click to preview'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

