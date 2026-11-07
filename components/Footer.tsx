import React from 'react';
import Link from 'next/link';
import { Github, Package, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dither-dark text-gray-400 border-t border-dither-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-dither-orange to-dither-purple flex items-center justify-center text-white text-base">
            🦉
          </div>
          <div>
            <span className="font-bold text-white text-sm">dither_animals</span>
            <span className="text-xs text-gray-500 font-mono ml-2">v2.0.2</span>
            <p className="text-xs text-gray-500">Released under the MIT License</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <a
            href="https://pub.dev/packages/dither_animals"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Package className="w-4 h-4" />
            <span>pub.dev</span>
          </a>
          <a
            href="https://github.com/ayan15888/dither_animals"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>
          <a
            href="https://github.com/ayan15888/dither_animals/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Report Issue
          </a>
        </div>
      </div>
    </footer>
  );
}

