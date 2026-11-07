'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Github, Package, Copy, Check, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText('flutter pub add dither_animals');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-dither-dark/80 border-b border-dither-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-dither-orange to-dither-purple flex items-center justify-center text-white text-lg shadow-lg group-hover:scale-105 transition-transform">
            🦉
          </div>
          <div>
            <div className="font-bold text-white text-base tracking-wide flex items-center gap-1.5">
              dither_animals
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                v2.0.2
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono -mt-0.5">Flutter Bayer Dither Widgets</p>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <a href="#gallery" className="hover:text-white transition-colors">50 Animals</a>
          <a href="#visualizer" className="hover:text-white transition-colors">Matrix Styles</a>
          <a href="#generator" className="hover:text-white transition-colors">Code Generator</a>
          <a href="#recipes" className="hover:text-white transition-colors">UI Recipes</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={copyCommand}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dither-card border border-dither-border hover:border-gray-600 text-xs font-mono text-gray-300 transition-colors"
            title="Click to copy pub add command"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
            <span>flutter pub add dither_animals</span>
          </button>

          <a
            href="https://pub.dev/packages/dither_animals"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 hover:bg-blue-600/30 text-xs font-semibold transition-all"
          >
            <Package className="w-3.5 h-3.5" />
            <span>pub.dev</span>
          </a>

          <a
            href="https://github.com/ayan15888/dither_animals"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}

