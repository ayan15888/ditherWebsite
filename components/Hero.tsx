'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Terminal, ArrowRight, Play, Heart, Layers } from 'lucide-react';

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

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dotShape, setDotShape] = useState<'square' | 'round' | 'hex' | 'diamond'>('square');
  const [poked, setPoked] = useState(false);
  const rippleRef = useRef<{ x: number; y: number; r: number; active: boolean }>({
    x: 0,
    y: 0,
    r: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const width = canvas.width;
    const height = canvas.height;
    const gridSize = 48; // 48x48 dither grid
    const cellW = width / gridSize;
    const cellH = height / gridSize;

    const render = () => {
      time += 0.04;
      ctx.clearRect(0, 0, width, height);

      // Ripple update
      if (rippleRef.current.active) {
        rippleRef.current.r += 6;
        if (rippleRef.current.r > width * 0.8) {
          rippleRef.current.active = false;
        }
      }

      const sway = Math.sin(time * 1.5) * 6;
      const breath = Math.sin(time * 2.5) * 3;
      const eyeBlink = Math.sin(time * 0.8) > 0.94 ? 0.2 : 1.0;

      // Draw dithered Owl
      for (let gy = 0; gy < gridSize; gy++) {
        for (let gx = 0; gx < gridSize; gx++) {
          const cx = gx * cellW + cellW / 2;
          const cy = gy * cellH + cellH / 2;

          // Normalized coordinates (-1 to 1)
          const nx = (cx - width / 2 - sway) / (width * 0.35);
          const ny = (cy - height / 2 - breath) / (height * 0.35);

          // Owl body density field
          let density = 0.0;

          // Main body ellipse
          const bodyDist = (nx * nx) / 0.8 + (ny * ny) / 1.0;
          if (bodyDist < 1.0) {
            density = 0.85 * (1.1 - bodyDist * 0.6);
          }

          // Ears / Horns
          const earL = Math.hypot(nx + 0.55, ny + 0.85);
          const earR = Math.hypot(nx - 0.55, ny + 0.85);
          if (earL < 0.35) density = Math.max(density, 0.9);
          if (earR < 0.35) density = Math.max(density, 0.9);

          // Belly patch (lighter density)
          const bellyDist = (nx * nx) / 0.4 + ((ny - 0.2) * (ny - 0.2)) / 0.5;
          if (bellyDist < 0.7) {
            density = 0.35;
          }

          // Eyes clear-out (white sclera)
          const eyeL = Math.hypot(nx + 0.35, ny + 0.15);
          const eyeR = Math.hypot(nx - 0.35, ny + 0.15);
          if (eyeL < 0.28 || eyeR < 0.28) {
            // Sclera
            density = 0.05;
            // Pupil (black)
            const pupilL = Math.hypot(nx + 0.35, (ny + 0.15) / eyeBlink);
            const pupilR = Math.hypot(nx - 0.35, (ny + 0.15) / eyeBlink);
            if (pupilL < 0.14 || pupilR < 0.14) {
              density = 0.98;
            }
            // Catchlight (sparkle)
            if (Math.hypot(nx + 0.38, ny + 0.11) < 0.04 || Math.hypot(nx - 0.32, ny + 0.11) < 0.04) {
              density = 0.0;
            }
          }

          // Beak
          if (Math.abs(nx) < 0.12 && ny > 0.15 && ny < 0.35) {
            density = 0.95;
          }

          // Ripple shockwave distortion
          if (rippleRef.current.active) {
            const rDist = Math.hypot(cx - rippleRef.current.x, cy - rippleRef.current.y);
            const wave = Math.abs(rDist - rippleRef.current.r);
            if (wave < 25) {
              density = Math.min(1.0, density + (1 - wave / 25) * 0.5);
            }
          }

          // Bayer 8x8 threshold test
          const bx = gx % 8;
          const by = gy % 8;
          const threshold = BAYER_8X8[by][bx] / 64.0;

          if (density > threshold) {
            const dotSize = cellW * 0.88;
            ctx.fillStyle = '#FF5A1F';

            if (dotShape === 'square') {
              ctx.fillRect(cx - dotSize / 2, cy - dotSize / 2, dotSize, dotSize);
            } else if (dotShape === 'round') {
              ctx.beginPath();
              ctx.arc(cx, cy, dotSize / 2, 0, Math.PI * 2);
              ctx.fill();
            } else if (dotShape === 'hex') {
              ctx.beginPath();
              for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3;
                const hx = cx + (dotSize / 2) * Math.cos(angle);
                const hy = cy + (dotSize / 2) * Math.sin(angle);
                if (i === 0) ctx.moveTo(hx, hy);
                else ctx.lineTo(hx, hy);
              }
              ctx.closePath();
              ctx.fill();
            } else if (dotShape === 'diamond') {
              ctx.beginPath();
              ctx.moveTo(cx, cy - dotSize / 2);
              ctx.lineTo(cx + dotSize / 2, cy);
              ctx.lineTo(cx, cy + dotSize / 2);
              ctx.lineTo(cx - dotSize / 2, cy);
              ctx.closePath();
              ctx.fill();
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [dotShape]);

  const handlePoke = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 360;
    const y = ((e.clientY - rect.top) / rect.height) * 360;
    rippleRef.current = { x, y, r: 0, active: true };
    setPoked(true);
    setTimeout(() => setPoked(false), 500);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 dither-bg-pattern border-b border-dither-border">
      {/* Background glow flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-dither-orange/15 to-blue-600/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>v2.0.2 Live on pub.dev · 50 Chibi Animals</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Ordered-Dither <br />
              <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Animal Widgets
              </span> <br />
              for Flutter.
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
              Authentic 8×8 Bayer matrix stippling, unique signature animations, interactive poke shockwaves, and haptic feedback. Drop in cute companions for empty states, loading indicators, and onboarding.
            </p>

            {/* Quick Install Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dither-card border border-dither-border font-mono text-sm text-gray-200 shadow-xl w-full sm:w-auto">
                <Terminal className="w-4 h-4 text-orange-400" />
                <span>flutter pub add dither_animals</span>
              </div>

              <a
                href="#gallery"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-dither-orange to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] w-full sm:w-auto"
              >
                <span>Explore 50 Animals</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3 text-xs font-mono text-gray-400">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Ordered 8×8 Bayer Matrix</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Poke Ripple Physics</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">4 Dot Styles</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Zero Dependencies</span>
            </div>
          </div>

          {/* Right Column: Live Interactive Dither Canvas */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[380px] p-6 rounded-3xl bg-dither-card border border-dither-border shadow-2xl glow-orange">
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-dither-border/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-[11px] font-mono text-gray-400 ml-1">Live Bayer Canvas</span>
                </div>
                <span className="text-[10px] font-mono text-orange-400 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">
                  Tap to Poke!
                </span>
              </div>

              {/* Canvas viewport */}
              <div className="relative flex justify-center items-center bg-black/40 rounded-2xl overflow-hidden p-2 border border-white/5">
                <canvas
                  ref={canvasRef}
                  width={360}
                  height={360}
                  onClick={handlePoke}
                  className="w-full h-auto cursor-pointer select-none transition-transform active:scale-95"
                  title="Click anywhere to poke!"
                />
                {poked && (
                  <div className="absolute top-4 right-4 text-xs font-mono px-2 py-1 bg-orange-500 text-white rounded-lg animate-bounce">
                    Shockwave! ⚡
                  </div>
                )}
              </div>

              {/* Dot Shape Selector Buttons */}
              <div className="mt-4 pt-3 border-t border-dither-border/60">
                <div className="text-[11px] text-gray-400 font-mono mb-2 flex items-center justify-between">
                  <span>Dot Shape Matrix:</span>
                  <span className="text-white capitalize">{dotShape}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {(['square', 'round', 'hex', 'diamond'] as const).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setDotShape(shape)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-mono font-medium transition-all ${
                        dotShape === shape
                          ? 'bg-dither-orange text-white shadow-md shadow-orange-500/20'
                          : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 font-mono mt-3 text-center">
              Canvas rendered with authentic 8×8 Bayer Matrix Dithering
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

