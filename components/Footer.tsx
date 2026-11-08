'use client';

import React, { useState } from 'react';
import { ArrowUp, Heart, Copy, Check, Cloud, Github, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/sound';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyInstall = () => {
    sounds.playSparkle();
    navigator.clipboard.writeText('flutter pub add dither_animals');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative mt-20 sm:mt-28 w-full text-neutral-800 text-xs overflow-hidden select-none">
      
      {/* ============================================================== */}
      {/* UNIFIED CLOUD CREST (Zero background outside the cloud) */}
      {/* ============================================================== */}
      <div className="relative w-full leading-none select-none">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-24 sm:h-36 md:h-48 lg:h-56 block"
          aria-hidden="true"
        >
          <defs>
            {/* Unified 90deg Sunset Gradient: Exact 1:1 match with footer body */}
            <linearGradient id="unifiedCloudGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFA4B6" />
              <stop offset="25%" stopColor="#FFB68D" />
              <stop offset="50%" stopColor="#FFE082" />
              <stop offset="75%" stopColor="#C8B9FD" />
              <stop offset="100%" stopColor="#93C5FD" />
            </linearGradient>
          </defs>

          {/* Main Billowy Cloud Crest Silhouette */}
          <path
            d="M 0,200 L 0,150 C 35,120 80,120 115,132 C 150,90 210,90 250,108 C 295,52 365,52 415,75 C 470,30 575,30 635,60 C 690,44 775,44 835,70 C 890,56 975,56 1035,88 C 1090,84 1175,84 1235,118 C 1270,120 1335,120 1375,135 C 1405,132 1425,132 1440,150 L 1440,200 Z"
            fill="url(#unifiedCloudGrad)"
          />

          {/* Glowing White Highlight Rim Stroke Along Top Cloud Lobes */}
          <path
            d="M 0,150 C 35,120 80,120 115,132 C 150,90 210,90 250,108 C 295,52 365,52 415,75 C 470,30 575,30 635,60 C 690,44 775,44 835,70 C 890,56 975,56 1035,88 C 1090,84 1175,84 1235,118 C 1270,120 1335,120 1375,135 C 1405,132 1425,132 1440,150"
            fill="none"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Volumetric 3D Inner Cloud Puff Lines for Depth */}
          <path d="M 465,55 C 505,38 555,38 595,55" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 680,68 C 715,52 765,52 795,68" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 290,88 C 325,68 375,68 405,85" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 885,82 C 920,66 965,66 995,82" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>

      {/* ============================================================== */}
      {/* CLOUD BODY: Perfectly Continuous with Top Crest (Zero Seam) */}
      {/* ============================================================== */}
      <div 
        className="relative -mt-1 pt-4 pb-16 px-4 sm:px-6 lg:px-8 text-neutral-800"
        style={{
          background: 'linear-gradient(90deg, #FFA4B6 0%, #FFB68D 25%, #FFE082 50%, #C8B9FD 75%, #93C5FD 100%)',
        }}
      >
        {/* Subtle Ambient Fluffy Cloud Cushions inside the Footer */}
        <div className="absolute top-12 left-10 w-64 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-16 right-16 w-80 h-36 bg-white/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-48 bg-white/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          
          {/* Top Row: Brand & Quick Install Pill */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/60">
            {/* Brand & Tagline */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white text-orange-600 font-mono font-bold text-xl flex items-center justify-center shadow-md shadow-orange-500/15 ring-2 ring-white/90">
                🐾
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg text-neutral-900 tracking-tight">dither_animals</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/95 text-orange-600 text-[10px] font-mono font-bold shadow-xs border border-orange-200/80">
                    v2.0.2
                  </span>
                  <span className="font-handwritten text-orange-700 text-xs font-bold rotate-[-3deg] hidden sm:inline select-none">
                    ~handcrafted with love~
                  </span>
                </div>
                <p className="text-xs text-neutral-800 font-semibold mt-0.5">
                  Handcrafted retro pixel companions for Flutter & the Web
                </p>
              </div>
            </div>

            {/* Quick Install Pill */}
            <div className="flex items-center gap-2">
              <button
                onClick={copyInstall}
                onMouseEnter={() => sounds.playHover()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 hover:bg-white text-neutral-900 hover:text-orange-600 text-xs font-mono font-bold transition-all shadow-sm hover:shadow-md border border-white"
                title="Copy install command"
              >
                <span className="text-orange-600 font-bold">$</span>
                <span>flutter pub add dither_animals</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-neutral-500 group-hover:text-orange-500" />
                )}
              </button>
            </div>
          </div>

          {/* Middle Row: Floating Frosted Cloud Navigation Pills & Float to Top */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Colorful Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href="#gallery"
                onMouseEnter={() => sounds.playHover()}
                className="px-4 py-2 rounded-full bg-white/90 hover:bg-white text-neutral-900 font-bold text-xs transition-all shadow-xs hover:shadow-md hover:scale-105 border border-white/90"
              >
                🐾 50 Mascots
              </a>
              <a
                href="#visualizer"
                onMouseEnter={() => sounds.playHover()}
                className="px-4 py-2 rounded-full bg-white/90 hover:bg-white text-neutral-900 font-bold text-xs transition-all shadow-xs hover:shadow-md hover:scale-105 border border-white/90"
              >
                📐 Bayer Matrix
              </a>
              <a
                href="#recipes"
                onMouseEnter={() => sounds.playHover()}
                className="px-4 py-2 rounded-full bg-white/90 hover:bg-white text-neutral-900 font-bold text-xs transition-all shadow-xs hover:shadow-md hover:scale-105 border border-white/90"
              >
                ✨ Recipes
              </a>
              <a
                href="https://pub.dev/packages/dither_animals"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sounds.playHover()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs transition-all shadow-sm hover:scale-105"
              >
                <span>pub.dev</span>
                <ExternalLink className="w-3 h-3 text-white" />
              </a>
              <a
                href="https://github.com/ayan15888/dither_animals"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sounds.playHover()}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-neutral-900 font-bold text-xs transition-all shadow-xs hover:shadow-md hover:scale-105 border border-white/90"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Float to Top Pill */}
            <button
              onClick={scrollToTop}
              onMouseEnter={() => sounds.playHover()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 hover:bg-white text-orange-600 text-xs font-bold shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all group border border-white"
            >
              <Cloud className="w-3.5 h-3.5 text-orange-500 group-hover:scale-110 transition-transform" />
              <span>Float to top ☁️</span>
              <ArrowUp className="w-3.5 h-3.5 text-orange-600 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Bottom Colophon with Heart & MIT Info */}
          <div className="pt-6 border-t border-white/60 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-800 font-medium gap-3">
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <span>Floating softly on a colorful sunset cloud. Handcrafted with</span>
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600 inline-block animate-pulse" />
              <span>for Flutter & retro pixel art lovers.</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-800 font-bold">
              <span className="text-neutral-900 px-2 py-0.5 rounded-full bg-white/50 border border-white/60">MIT Licensed</span>
              <span>•</span>
              <span className="text-neutral-900 px-2 py-0.5 rounded-full bg-white/50 border border-white/60">Zero GPU Idle</span>
              <span>•</span>
              <span className="text-neutral-900 px-2 py-0.5 rounded-full bg-white/50 border border-white/60">50 Chibi Companions</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
