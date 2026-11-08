'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/sound';

interface NavbarProps {
  onOpenLoading?: () => void;
}

export default function Navbar({ onOpenLoading }: NavbarProps = {}) {
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    const newState = sounds.toggle();
    setSoundOn(newState);
  };

  return (
    <header className="sticky top-2 sm:top-3 z-50 px-2 sm:px-6">
      <div className="max-w-4xl mx-auto h-12 sm:h-14 px-3 sm:px-5 rounded-full bg-white/80 backdrop-blur-xl border border-orange-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between transition-all">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-white font-mono font-bold text-xs flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            🐾
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="font-bold text-xs sm:text-sm tracking-tight text-neutral-800 group-hover:text-orange-500 transition-colors">
              dither_animals
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 font-semibold border border-orange-200/40">
              v2.1.0
            </span>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Retro Tamagotchi Sound FX Toggle Pill */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border transition-all ${
              soundOn
                ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-xs'
                : 'bg-neutral-50 text-neutral-400 border-neutral-200/60 hover:text-neutral-700'
            }`}
            title={soundOn ? 'Sound FX Enabled (Tamagotchi Mode)' : 'Click to enable 8-bit Sound FX'}
          >
            {soundOn ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span className="hidden sm:inline text-[11px] font-mono">8-Bit Sound ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px] font-mono">Sound: OFF</span>
              </>
            )}
          </button>

          <a
            href="https://pub.dev/packages/dither_animals"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-xs font-semibold rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-500/25 transition-all hover:scale-105"
          >
            <Package className="w-3.5 h-3.5" />
            <span>pub.dev</span>
          </a>
        </div>
      </div>
    </header>
  );
}
