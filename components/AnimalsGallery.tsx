'use client';

import React, { useState } from 'react';
import { ANIMALS, AnimalData } from '../data/animals';
import { Search, Copy, Check, Sparkles, Filter } from 'lucide-react';

const CATEGORIES = ['All', 'Forest', 'Pets', 'Savanna', 'Ocean', 'Insects & Birds'] as const;

export default function AnimalsGallery() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = ANIMALS.filter((a) => {
    const matchCat = category === 'All' || a.category === category;
    const q = search.toLowerCase();
    const matchSearch =
      a.name.toLowerCase().includes(q) ||
      a.signature.toLowerCase().includes(q) ||
      a.personality.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const copySnippet = (animal: AnimalData) => {
    const code = `DitherPet.${animal.id}(
  mood: PetMood.happy,
  theme: PetTheme.solid,
  dot: PetDot.round,
)`;
    navigator.clipboard.writeText(code);
    setCopiedId(animal.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="gallery" className="py-20 bg-dither-dark border-b border-dither-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chibi Animal Presets</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Meet All 50 Animals
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Every animal has its own custom vector path layers, signature action curves, personality animations, and poke shockwaves.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-dither-card/60 p-4 rounded-2xl border border-dither-border">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  category === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 50 animals..."
              className="w-full pl-9 pr-4 py-2 bg-dither-dark border border-dither-border rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-mono"
            />
          </div>
        </div>

        {/* Count Indicator */}
        <div className="text-xs text-gray-400 font-mono mb-6">
          Showing {filtered.length} of {ANIMALS.length} animals
        </div>

        {/* Animal Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((animal, idx) => {
            const isCopied = copiedId === animal.id;
            return (
              <div
                key={animal.id}
                className="group relative flex flex-col justify-between p-4 rounded-2xl bg-dither-card border border-dither-border hover:border-gray-600 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: animal.color }}
                      title={`Theme Color: ${animal.color}`}
                    />
                  </div>

                  {/* Character Icon / Emoji */}
                  <div className="w-16 h-16 mx-auto my-3 rounded-2xl bg-dither-dark border border-dither-border flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-inner">
                    {animal.emoji}
                  </div>

                  {/* Animal Info */}
                  <div className="text-center">
                    <h3 className="font-bold text-white text-base tracking-wide group-hover:text-orange-400 transition-colors">
                      {animal.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5 font-medium">
                      {animal.signature}
                    </p>
                    <p className="text-[10px] text-gray-500 italic mt-0.5">
                      &quot;{animal.personality}&quot;
                    </p>
                  </div>
                </div>

                {/* Bottom Action: Copy Code */}
                <button
                  onClick={() => copySnippet(animal)}
                  className={`mt-4 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors border ${
                    isCopied
                      ? 'bg-green-500/20 text-green-400 border-green-500/40'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                  title="Copy Flutter Code Snippet"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gray-400" />
                      <span>Copy Dart</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500 font-mono text-sm">
            No matching animals found for &quot;{search}&quot;.
          </div>
        )}
      </div>
    </section>
  );
}

