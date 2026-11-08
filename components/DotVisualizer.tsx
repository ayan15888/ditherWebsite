'use client';

import React, { useState } from 'react';
import DitherCanvas, { DitherDotShape } from './DitherCanvas';
import { Layers, Sparkles, Binary, Check } from 'lucide-react';
import { sounds } from '../utils/sound';

const BAYER_8X8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

export default function DotVisualizer() {
  const [activeShape, setActiveShape] = useState<DitherDotShape>('square');
  const [cells, setCells] = useState(64);
  const [sampleAnimal, setSampleAnimal] = useState('frog');
  const [isInspectorHovered, setIsInspectorHovered] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [hoveredMatrixCell, setHoveredMatrixCell] = useState<{ r: number; c: number; v: number } | null>(null);

  const shapes = [
    {
      id: 'square' as const,
      name: 'Square Pixel',
      enumCode: 'DitherDot.square',
      desc: 'Crisp 90s handheld retro pixel aesthetic. Sharp and authentic.',
      icon: '▪',
    },
    {
      id: 'round' as const,
      name: 'Round Halftone',
      enumCode: 'DitherDot.round',
      desc: 'Organic print-style stipple circles with lovely circular shading.',
      icon: '●',
    },
    {
      id: 'hex' as const,
      name: 'Hexagonal',
      enumCode: 'DitherDot.hex',
      desc: 'Geometric honeycomb matrix with modern gaming aesthetic.',
      icon: '⬡',
    },
    {
      id: 'diamond' as const,
      name: 'Diamond Point',
      enumCode: 'DitherDot.diamond',
      desc: '45-degree rotated diamond tiles for cute retro RPGs.',
      icon: '◆',
    },
  ];

  return (
    <section id="visualizer" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-3 rotate-[-1deg]">
            <Layers className="w-3.5 h-3.5" />
            <span>Ordered Dither Engine</span>
            <span className="text-neutral-300">•</span>
            <span className="font-handwritten text-blue-700 text-sm font-bold">~how it works~</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            <span className="relative inline-block">
              Dot Matrix
              {/* Hand-drawn underline */}
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-400 pointer-events-none overflow-visible" viewBox="0 0 160 10" fill="none">
                <path d="M 3 6 Q 40 1 80 5 T 155 5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
              </svg>
            </span>{' '}
            Geometries
          </h2>
          <p className="text-sm text-neutral-500 mt-2">
            Switch between 4 distinct dot styles and adjust resolution density from coarse retro pixels to silky fine stipples.
          </p>
        </div>

        {/* Floating Organic Stage (Non-boxy) */}
        <div className="p-6 sm:p-10 rounded-[3rem] bg-white/90 border border-orange-100/70 shadow-[0_20px_50px_-10px_rgba(255,107,53,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Dot Shape Selector */}
            <div>
              <div className="flex justify-between items-center text-xs text-neutral-500 mb-2 font-medium">
                <span>Choose Dot Geometry:</span>
                <span className="text-orange-600 capitalize font-semibold">{activeShape}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      sounds.playClick();
                      setActiveShape(s.id);
                    }}
                    className={`flex items-start gap-2.5 p-3 rounded-2xl text-left border transition-all ${
                      activeShape === s.id
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                        : 'bg-neutral-50/80 text-neutral-700 border-neutral-200/60 hover:bg-orange-50/50 hover:border-orange-200/60'
                    }`}
                  >
                    <span className="text-lg leading-none mt-0.5">{s.icon}</span>
                    <div>
                      <div className="text-xs font-bold">{s.name}</div>
                      <div className={`text-[10px] font-mono ${activeShape === s.id ? 'text-neutral-300' : 'text-neutral-400'}`}>
                        {s.enumCode}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Resolution Slider */}
            <div>
              <div className="flex justify-between items-center text-xs text-neutral-500 mb-2 font-medium">
                <span>Grid Resolution:</span>
                <span className="text-neutral-900 font-bold font-mono">{cells} × {cells} dots</span>
              </div>
              <input
                type="range"
                min="32"
                max="96"
                step="8"
                value={cells}
                onChange={(e) => setCells(Number(e.target.value))}
                className="w-full accent-orange-500 bg-neutral-200 h-1.5 rounded-full cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-neutral-400 mt-1">
                <span>32 (Retro)</span>
                <span>64 (Standard)</span>
                <span>96 (Ultra-Fine)</span>
              </div>
            </div>

            {/* Sample Animal Switcher */}
            <div>
              <div className="flex justify-between items-center text-xs text-neutral-500 mb-2 font-medium">
                <span>Try with:</span>
                <span className="text-neutral-900 capitalize font-medium">{sampleAnimal}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(['frog', 'cat', 'owl', 'elephant', 'turtle'] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => {
                      sounds.playClick();
                      setSampleAnimal(a);
                    }}
                    className={`px-3.5 py-1 text-xs rounded-full capitalize font-medium transition-all ${
                      sampleAnimal === a
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle Bayer 8x8 Threshold Matrix View */}
            <div className="pt-1">
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowMatrix(!showMatrix);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                  showMatrix
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-xs'
                    : 'bg-neutral-50 hover:bg-indigo-50/60 text-neutral-600 border-neutral-200/70'
                }`}
              >
                <Binary className="w-3.5 h-3.5 text-indigo-500" />
                <span>{showMatrix ? 'Hide Bayer Matrix 🔬' : 'Inspect 8×8 Bayer Matrix 🔬'}</span>
              </button>
            </div>

            {/* Generated Code Snippet */}
            <div className="p-4 bg-neutral-900 rounded-2xl font-mono text-xs text-neutral-200 shadow-sm">
              <div className="text-neutral-400 text-[10px] mb-1 flex items-center justify-between">
                <span>// Flutter DitherAnimal:</span>
                <span className="text-emerald-400">dot: DitherDot.{activeShape}</span>
              </div>
              <div className="text-neutral-400">DitherAnimal(</div>
              <div className="pl-4 text-orange-400">animal: DitherAnimalType.{sampleAnimal},</div>
              <div className="pl-4 text-white">dot: DitherDot.{activeShape},</div>
              <div className="pl-4 text-amber-300">cells: {cells},</div>
              <div className="text-neutral-400">)</div>
            </div>
          </div>

          {/* Right Column: Live Mascot Canvas & Matrix Inspector */}
          <div className="lg:col-span-6 flex flex-col items-center space-y-4">
            
            {/* Live Mascot Canvas */}
            <div
              onMouseEnter={() => setIsInspectorHovered(true)}
              onMouseLeave={() => setIsInspectorHovered(false)}
              className="relative w-full max-w-sm flex items-center justify-center p-8 rounded-[2.5rem] bg-gradient-to-b from-orange-50/50 via-amber-50/30 to-transparent border border-orange-100/60 cursor-pointer group shadow-xs"
            >
              <div className="absolute top-4 right-4 text-[10px] font-mono text-neutral-500 bg-white/90 border border-neutral-100 px-3 py-0.5 rounded-full shadow-sm">
                {isInspectorHovered ? 'Active motion' : 'Hover to wake'}
              </div>

              <DitherCanvas
                animalId={sampleAnimal}
                size={230}
                cells={cells}
                dotShape={activeShape}
                color="#FF6B35"
                interactive={true}
                animated={true}
                animateOnHoverOnly={true}
                isHovered={isInspectorHovered}
                showFace={true}
                className="transition-transform group-hover:scale-105"
              />
            </div>

            {/* Creative 8x8 Bayer Matrix Math View */}
            {showMatrix && (
              <div className="w-full max-w-sm p-4 bg-white rounded-3xl border border-indigo-100 shadow-md animate-in fade-in zoom-in-95 duration-200 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-800">8×8 Bayer Threshold Matrix</span>
                  <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {hoveredMatrixCell ? `M[${hoveredMatrixCell.r},${hoveredMatrixCell.c}] = ${(hoveredMatrixCell.v / 64).toFixed(3)}` : 'Hover a cell'}
                  </span>
                </div>

                {/* The 8x8 Grid */}
                <div className="grid grid-cols-8 gap-1 p-2 bg-neutral-900 rounded-2xl font-mono text-[9px] text-center select-none">
                  {BAYER_8X8.map((row, r) =>
                    row.map((val, c) => (
                      <div
                        key={`${r}-${c}`}
                        onMouseEnter={() => setHoveredMatrixCell({ r, c, v: val })}
                        className="py-1 rounded bg-neutral-800 hover:bg-orange-500 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        title={`Threshold: ${val}/64`}
                      >
                        {val}
                      </div>
                    ))
                  )}
                </div>

                <p className="text-[10px] text-neutral-400 font-mono text-center">
                  Brightness &gt; Threshold / 64 → Pixel turns into stipple dot!
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
