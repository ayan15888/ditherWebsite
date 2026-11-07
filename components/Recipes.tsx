'use client';

import React from 'react';
import { Sparkles, Trophy, Inbox, Sliders, Image as ImageIcon } from 'lucide-react';

export default function Recipes() {
  const recipes = [
    {
      title: 'Empty State & 404 Mascot',
      icon: <Inbox className="w-5 h-5 text-purple-400" />,
      tag: 'UI Pattern',
      desc: 'Delight users when no search results are found or an inbox is empty by dropping in a sleepy or curious animal.',
      code: `Column(
  mainAxisSize: MainAxisSize.min,
  children: const [
    SizedBox(
      width: 130,
      height: 130,
      child: DitherPet.koala(
        mood: PetMood.sleepy,
        dot: PetDot.round,
      ),
    ),
    SizedBox(height: 12),
    Text('No messages found', style: TextStyle(fontWeight: FontWeight.bold)),
    Text('Your inbox is peaceful and quiet.'),
  ],
)`,
    },
    {
      title: 'Gamification & Reward Celebrations',
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
      tag: 'Gamification',
      desc: 'Celebrate user achievements with sparkling victory animations, fan shimmers, and haptic buzzes.',
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
          color: Color(0xFF0E8A8A),
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
      title: 'Interactive Studio Playground',
      icon: <Sliders className="w-5 h-5 text-blue-400" />,
      tag: 'Developer Tooling',
      desc: 'Embed the pre-built `AnimalStudioPage` into your debug menu or settings to let designers preview all parameters live.',
      code: `// Open full studio page with 1 line
Navigator.of(context).push(
  MaterialPageRoute(
    builder: (_) => const AnimalStudioPage(
      animal: DitherAnimalType.owl,
    ),
  ),
);`,
    },
    {
      title: 'Custom Brand Image Dithering',
      icon: <ImageIcon className="w-5 h-5 text-green-400" />,
      tag: 'Artwork Dither',
      desc: 'Pass any Flutter ImageProvider to convert your company logo or user avatar into an animated ordered Bayer stipple widget.',
      code: `DitherAnimal(
  image: const AssetImage('assets/logo.png'),
  color: Colors.indigoAccent,
  cells: 112,
  dot: DitherDot.round,
  motion: DitherMotion.loop,
  pokeable: true,
)`,
    },
  ];

  return (
    <section id="recipes" className="py-20 bg-dither-card/30 border-b border-dither-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-World UI Patterns</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Production UI Recipes
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            How to seamlessly integrate dithered companions into your Flutter application workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recipes.map((r, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 rounded-3xl bg-dither-card border border-dither-border flex flex-col justify-between hover:border-gray-600 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {r.icon}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                    {r.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{r.title}</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">{r.desc}</p>
              </div>

              <div className="rounded-2xl bg-black/60 border border-white/5 overflow-hidden">
                <div className="px-4 py-2 bg-white/5 border-b border-white/5 text-[11px] font-mono text-gray-400">
                  Dart Code Example
                </div>
                <pre className="p-4 text-xs font-mono text-blue-300 overflow-x-auto leading-relaxed">
                  <code>{r.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

