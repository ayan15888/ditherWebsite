'use client';

import React, { useState } from 'react';
import DitherCanvas from './DitherCanvas';
import { Copy, Check, Sparkles } from 'lucide-react';

export default function Recipes() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const recipes = [
    {
      title: 'Empty State Mascot',
      animalId: 'koala',
      color: '#4B5563',
      tag: 'UI Pattern',
      desc: 'Delight users when no search results are found or an inbox is empty by dropping in a peaceful sleeping animal.',
      code: `Column(
  mainAxisSize: MainAxisSize.min,
  children: const [
    SizedBox(
      width: 120,
      height: 120,
      child: DitherPet.koala(
        mood: PetMood.sleepy,
        dot: PetDot.square,
      ),
    ),
    SizedBox(height: 12),
    Text('No messages found', style: TextStyle(fontWeight: FontWeight.bold)),
    Text('Your inbox is peaceful and quiet.'),
  ],
)`,
    },
    {
      title: 'Reward Celebration',
      animalId: 'peacock',
      color: '#0284C7',
      tag: 'Gamification',
      desc: 'Celebrate user achievements with sparkling victory animations, fan shimmers, and subtle haptic buzzes.',
      code: `Container(
  padding: const EdgeInsets.all(16),
  decoration: BoxDecoration(
    color: Colors.amber.shade50,
    borderRadius: BorderRadius.circular(20),
  ),
  child: Row(
    children: const [
      SizedBox(
        width: 80,
        height: 80,
        child: DitherAnimal(
          animal: DitherAnimalType.peacock,
          color: Color(0xFF0284C7),
          signature: true,
          sparkles: true,
        ),
      ),
      SizedBox(width: 14),
      Text('Level 10 Achieved!'),
    ],
  ),
)`,
    },
    {
      title: 'Animated Loading Mascot',
      animalId: 'penguin',
      color: '#0D9488',
      tag: 'Feedback',
      desc: 'Replace standard circular spinners with a cute waddling penguin or swimming turtle while waiting for assets.',
      code: `Center(
  child: Column(
    mainAxisSize: MainAxisSize.min,
    children: const [
      SizedBox(
        width: 100,
        height: 100,
        child: DitherAnimal(
          animal: DitherAnimalType.penguin,
          motion: DitherMotion.loop,
          cells: 64,
        ),
      ),
      SizedBox(height: 8),
      Text('Loading assets...', style: TextStyle(fontFamily: 'monospace')),
    ],
  ),
)`,
    },
    {
      title: 'Parade Progress Bar Loading Screen',
      animalId: 'duck',
      color: '#EAB308',
      tag: 'Progress & Loading',
      desc: 'Show an adorable parade of chibi animal widgets moving smoothly across a progress runway from right to left as loading advances.',
      code: `// Flutter Right-to-Left Parade Progress Bar
Stack(
  alignment: Alignment.bottomCenter,
  children: [
    // Moving Parade Runway (Right-to-Left translation)
    AnimatedBuilder(
      animation: progressController,
      builder: (context, child) {
        final progress = progressController.value; // 0.0 -> 1.0
        return Transform.translate(
          // Moves characters from right (+screenWidth) to left
          offset: Offset(MediaQuery.of(context).size.width * (1.0 - progress * 2.2), -24),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: DitherAnimalType.values.take(12).map((type) =>
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8.0),
                child: Transform.flip(
                  flipX: true, // Face left towards motion direction
                  child: DitherAnimal(
                    animal: type,
                    motion: DitherMotion.loop,
                    cells: 48,
                  ),
                ),
              ),
            ).toList(),
          ),
        );
      },
    ),
    // Linear Progress Indicator Bar
    LinearProgressIndicator(
      value: progressController.value,
      color: const Color(0xFFFF6B35),
      backgroundColor: Colors.orange.shade50,
      minHeight: 8,
    ),
  ],
)`,
    },
    {
      title: 'Interactive Poke Pet',
      animalId: 'cat',
      color: '#D97706',
      tag: 'Engagement',
      desc: 'Keep users engaged on onboarding or profile screens with a cute pet companion that purrs and reacts when tapped.',
      code: `SizedBox(
  width: 140,
  height: 140,
  child: DitherPet.cat(
    mood: PetMood.happy,
    dot: PetDot.square,
    theme: PetTheme.solid,
  ),
)`,
    },
  ];

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section id="recipes" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold mb-3 rotate-[-1deg]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UI Recipes & Patterns</span>
            <span className="text-neutral-300">•</span>
            <span className="font-handwritten text-purple-700 text-sm font-bold">~copy & paste ✂~</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Delightful{' '}
            <span className="marker-highlight-pink px-1">
              Production Recipes
            </span>
          </h2>
          <p className="text-sm text-neutral-500 mt-2">
            Ready-to-use Flutter patterns for empty states, gamification rewards, and interactive onboarding companions.
          </p>
        </div>

        {/* 2x2 Floating Organic Pods Grid (Non-boxy) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recipes.map((r, idx) => {
            const isCopied = copiedIdx === idx;
            const isCardHovered = hoveredIdx === idx;
            return (
              <div
                key={r.title}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="bg-white/90 border border-orange-100/70 rounded-[2.5rem] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(255,107,53,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between washi-tape"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-neutral-100 font-mono text-xs">
                    <span className="text-[11px] text-orange-600 font-semibold px-3 py-0.5 rounded-full bg-orange-50 border border-orange-100/60">
                      {r.tag}
                    </span>
                    <button
                      onClick={() => copyCode(r.code, idx)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold rounded-full border transition-all ${
                        isCopied
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-neutral-50 text-neutral-600 border-neutral-200/60 hover:bg-orange-50 hover:text-orange-600'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Header & Description with mini live preview */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 h-20 shrink-0 bg-gradient-to-b from-orange-50/60 to-transparent rounded-2xl flex items-center justify-center p-1 border border-orange-100/50">
                      <DitherCanvas
                        animalId={r.animalId}
                        size={72}
                        cells={48}
                        color={r.color}
                        interactive={true}
                        animated={true}
                        animateOnHoverOnly={true}
                        isHovered={isCardHovered}
                        showFace={true}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-neutral-900">
                        {r.title}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                  </div>

                  {/* Code Block */}
                  <pre className="p-4 bg-neutral-900 rounded-[1.5rem] font-mono text-xs text-neutral-200 overflow-x-auto leading-relaxed shadow-sm">
                    <code>{r.code}</code>
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
