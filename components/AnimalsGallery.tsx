'use client';

import React, { useState } from 'react';
import { ANIMALS, AnimalData } from '../data/animals';
import DitherCanvas, { DitherDotShape } from './DitherCanvas';
import CodeGeneratorModal from './CodeGenerator';
import { Search, Copy, Check, Sparkles, Sliders, Dices } from 'lucide-react';
import { sounds } from '../utils/sound';

const CATEGORIES = ['All', 'Forest', 'Pets', 'Savanna', 'Ocean', 'Insects & Birds'] as const;

export default function AnimalsGallery() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [galleryDotShape, setGalleryDotShape] = useState<DitherDotShape>('square');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  
  // Modal state for Flutter Code Generator popup
  const [modalAnimalId, setModalAnimalId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openGenerator = (animalId: string) => {
    sounds.playBoing();
    setModalAnimalId(animalId);
    setIsModalOpen(true);
  };

  const pickSurprisePet = () => {
    const randomIndex = Math.floor(Math.random() * ANIMALS.length);
    const surprise = ANIMALS[randomIndex];
    sounds.playSpecialMove();
    setModalAnimalId(surprise.id);
    setIsModalOpen(true);
  };

  const filtered = ANIMALS.filter((a) => {
    const matchCat = category === 'All' || a.category === category;
    const q = search.toLowerCase();
    const matchSearch =
      a.name.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q) ||
      a.signature.toLowerCase().includes(q) ||
      a.personality.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const copySnippet = (animal: AnimalData) => {
    sounds.playSparkle();
    const code = `DitherPet.${animal.id}(
  mood: PetMood.happy,
  theme: PetTheme.solid,
  dot: PetDot.${galleryDotShape},
)`;
    navigator.clipboard.writeText(code);
    setCopiedId(animal.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="gallery" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>Chibi Companion Presets</span>
              <span className="text-neutral-300">•</span>
              <span className="font-handwritten text-orange-600 text-sm font-bold">~ready to drop in~</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              Meet All{' '}
              <span className="relative inline-block px-1">
                <span className="relative z-10 text-orange-600">50</span>
                {/* Hand-drawn sketch circle around 50 */}
                <svg
                  className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] text-orange-400 pointer-events-none -rotate-3 overflow-visible"
                  viewBox="0 0 54 46"
                  fill="none"
                >
                  <path
                    d="M 27 5 C 14 5 5 15 5 25 C 5 36 15 42 29 42 C 43 42 49 33 49 23 C 49 11 38 4 25 6"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>{' '}
              Pets
            </h2>
            <p className="text-sm text-neutral-500 mt-1 max-w-xl">
              Each animal has its own custom vector paths, cute blinks, and poke shockwaves. <span className="marker-highlight-yellow font-semibold text-neutral-900 px-1">Click any animal</span> to open the Flutter Code Generator & live theme settings!
            </p>
          </div>


        </div>

        {/* Filter and Search Bar (Soft responsive design) */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between mb-8 bg-white/70 backdrop-blur-md p-2.5 sm:p-2 rounded-2xl sm:rounded-full border border-neutral-200/60 shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setCategory(cat);
                }}
                onMouseEnter={() => sounds.playHover()}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  category === cat
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input & Surprise Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <span className="hidden xl:inline font-handwritten text-orange-600 font-bold text-xs rotate-[-2deg] select-none">
              can&apos;t pick? roll one! ↷
            </span>
            <button
              onClick={pickSurprisePet}
              onMouseEnter={() => sounds.playHover()}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-semibold shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
              title="Pick a random surprise pet & open generator!"
            >
              <Dices className="w-3.5 h-3.5" />
              <span>Surprise Pet 🎲</span>
            </button>

            <div className="relative flex-1 md:w-56">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search 50 pets..."
                className="w-full pl-9 pr-4 py-1.5 bg-neutral-50/70 border border-neutral-200/60 rounded-full text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-orange-300 transition-all"
              />
            </div>
          </div>
        </div>

        {/* The 50 Animal Cards Grid — 1 col on mobile, 2 on sm, 3 on md, 4 on lg, 5 on xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-5">
          {filtered.map((animal) => {
            const isCopied = copiedId === animal.id;
            const isCardHovered = hoveredCardId === animal.id;
            return (
              <div
                key={animal.id}
                onClick={() => openGenerator(animal.id)}
                onMouseEnter={() => {
                  setHoveredCardId(animal.id);
                  sounds.playHover();
                }}
                onMouseLeave={() => setHoveredCardId(null)}
                className="group relative flex flex-col justify-between p-3.5 sm:p-4 bg-white/90 rounded-3xl sm:rounded-[2rem] border border-orange-100/70 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_36px_rgba(255,107,53,0.12)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                title={`Click to open Flutter Code Generator for ${animal.name}`}
              >
                <div>
                  {/* Top Header: Badge & Category */}
                  <div className="flex items-center justify-between pb-1 text-[11px] font-medium text-neutral-400">
                    <span>{animal.category}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: animal.color }}
                      title={`Color: ${animal.color}`}
                    />
                  </div>

                  {/* Soft organic circular halo for Mascot Canvas */}
                  <div className="relative my-3 py-4 flex items-center justify-center rounded-[1.5rem] bg-gradient-to-b from-orange-50/40 to-transparent transition-colors overflow-hidden">
                    <DitherCanvas
                      animalId={animal.id}
                      size={145}
                      cells={48}
                      dotShape={galleryDotShape}
                      color={animal.color}
                      interactive={true}
                      animated={true}
                      animateOnHoverOnly={true}
                      isHovered={isCardHovered}
                      showFace={true}
                      className="mx-auto transition-transform group-hover:scale-105"
                    />
                  </div>

                  {/* Pet Name */}
                  <div className="text-center pt-1">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-base">{animal.emoji}</span>
                      <h3 className="font-bold text-sm text-neutral-900 group-hover:text-orange-600 transition-colors">
                        {animal.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openGenerator(animal.id);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 font-mono text-xs font-semibold rounded-2xl bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white border border-orange-200/80 hover:border-orange-500 transition-all shadow-xs"
                    title="Open Flutter Code Generator & Settings"
                  >
                    <Sliders className="w-4 h-4" />
                    <span>Customize</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copySnippet(animal);
                    }}
                    className="p-2.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 border border-neutral-200/60 transition-all shrink-0"
                    title="Quick copy 1-line Flutter snippet"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-neutral-400 text-sm">
            No cute pets found for &quot;{search}&quot;.
          </div>
        )}
      </div>

      {/* Pop-up Modal for Flutter Code Generator */}
      <CodeGeneratorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        animalId={modalAnimalId || 'cat'}
        defaultDotShape={galleryDotShape}
      />
    </section>
  );
}
