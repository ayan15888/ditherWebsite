'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getAnimalArt } from '../data/shapes';

export type DitherDotShape = 'square' | 'round' | 'hex' | 'diamond';
export type DitherThemeMode = 'solid' | 'twoTone' | 'gradient';

interface DitherCanvasProps {
  animalId: string;
  size?: number;
  cells?: number;
  dotShape?: DitherDotShape;
  color?: string;
  secondaryColor?: string;
  themeMode?: DitherThemeMode;
  gradientAngle?: number;
  twoToneMix?: number;
  interactive?: boolean;
  animated?: boolean;
  animateOnHoverOnly?: boolean;
  isHovered?: boolean;
  signatureActive?: boolean;
  showFace?: boolean;
  dotScale?: number;
  phase?: number;
  onPoke?: () => void;
  onSignatureEnd?: () => void;
  className?: string;
}

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

function parseHex(hex: string): [number, number, number] {
  let c = hex.replace('#', '').trim();
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const num = parseInt(c || '000000', 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function lerpRgb(c1: [number, number, number], c2: [number, number, number], t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * clamped);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * clamped);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * clamped);
  return `rgb(${r},${g},${b})`;
}

// Global density map cache to avoid re-rasterizing vector layers
const densityCache = new Map<string, Float32Array>();

function getDensityMap(animalId: string, cells: number): Float32Array {
  const key = `${animalId}_${cells}`;
  const cached = densityCache.get(key);
  if (cached) return cached;

  const art = getAnimalArt(animalId);
  const arr = new Float32Array(cells * cells);
  if (!art || !art.layers || art.layers.length === 0) {
    densityCache.set(key, arr);
    return arr;
  }

  // Create offscreen canvas for vector rasterization in 100x100 space
  if (typeof document === 'undefined') return arr;
  const offscreen = document.createElement('canvas');
  offscreen.width = cells;
  offscreen.height = cells;
  const ctx = offscreen.getContext('2d', { willReadFrequently: true });
  if (!ctx) return arr;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, cells, cells);

  // Scale from 100x100 art-space to cells x cells
  ctx.scale(cells / 100, cells / 100);

  for (const [pathStr, density] of art.layers) {
    try {
      const p = new Path2D(pathStr);
      const gray = Math.round(density * 255);
      ctx.fillStyle = `rgb(${gray},${gray},${gray})`;
      ctx.fill(p);
    } catch {
      // fallback
    }
  }

  // Sample densities
  const imgData = ctx.getImageData(0, 0, cells, cells);
  const pixels = imgData.data;
  for (let i = 0; i < cells * cells; i++) {
    arr[i] = pixels[i * 4] / 255.0;
  }

  densityCache.set(key, arr);
  return arr;
}

export default function DitherCanvas({
  animalId,
  size = 280,
  cells = 64,
  dotShape = 'square',
  color = '#FF6B35',
  secondaryColor = '#FFB020',
  themeMode = 'solid',
  gradientAngle = 90,
  twoToneMix = 0.35,
  interactive = true,
  animated = true,
  animateOnHoverOnly = true,
  isHovered,
  signatureActive = false,
  showFace = true,
  dotScale = 0.9,
  phase = 0,
  onPoke,
  onSignatureEnd,
  className = '',
}: DitherCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [internalHover, setInternalHover] = useState(false);
  const [isPoked, setIsPoked] = useState(false);
  const ripplesRef = useRef<
    Array<{ x: number; y: number; r: number; active: boolean; age: number }>
  >([]);

  // Signature move tracking
  const sigProgressRef = useRef<{ active: boolean; start: number; duration: number }>({
    active: false,
    start: 0,
    duration: 2.2,
  });

  const effectiveHover = isHovered !== undefined ? isHovered : internalHover;
  const isSignatureRunning = signatureActive || sigProgressRef.current.active;
  const shouldAnimate = animated && (!animateOnHoverOnly || effectiveHover || isSignatureRunning);

  // Trigger signature when signatureActive prop changes to true
  useEffect(() => {
    if (signatureActive) {
      sigProgressRef.current = {
        active: true,
        start: performance.now(),
        duration: 2.2,
      };
    }
  }, [signatureActive]);

  const handlePointerDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.PointerEvent<HTMLCanvasElement>) => {
      if (!interactive) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * size;
      const y = ((e.clientY - rect.top) / rect.height) * size;

      ripplesRef.current.push({ x, y, r: 0, active: true, age: 0 });
      if (ripplesRef.current.length > 3) ripplesRef.current.shift();

      setIsPoked(true);
      setTimeout(() => setIsPoked(false), 450);
      onPoke?.();
    },
    [interactive, size, onPoke]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const art = getAnimalArt(animalId);
    const densityMap = getDensityMap(animalId, cells);

    // Precompile detail paths
    const precompiledDetails = (art?.details || []).map(([kind, pathStr, width]) => {
      let p: Path2D | null = null;
      try {
        p = new Path2D(pathStr);
      } catch {
        p = null;
      }
      return { kind, path: p, width };
    });

    const cellW = size / cells;
    const cellH = size / cells;
    const artScale = size / 100;

    const rgbPrimary = parseHex(color);
    const rgbSecondary = parseHex(secondaryColor);

    // Angle in radians for gradient
    const rad = (gradientAngle * Math.PI) / 180;
    const cosA = Math.cos(rad);
    const sinA = Math.sin(rad);

    const render = () => {
      const now = performance.now();

      // Signature move progress
      let sigU = 0; // 0..1 progress of signature move
      let isSig = false;
      if (sigProgressRef.current.active) {
        const elapsedSig = (now - sigProgressRef.current.start) / 1000;
        sigU = Math.min(1, elapsedSig / sigProgressRef.current.duration);
        isSig = true;
        if (sigU >= 1) {
          sigProgressRef.current.active = false;
          onSignatureEnd?.();
        }
      }

      if (shouldAnimate || isSig) {
        time += 0.035;
      } else {
        time = 0;
      }
      const elapsed = time + phase;
      ctx.clearRect(0, 0, size, size);

      // Signature jump / sway warp
      let sigDy = 0;
      let sigSway = 0;
      let sigScale = 1.0;
      if (isSig) {
        // Dramatic signature hop & celebration curve
        const hopEnvelope = Math.sin(sigU * Math.PI);
        sigDy = -Math.sin(sigU * Math.PI * 2) * (size * 0.08) * hopEnvelope;
        sigSway = Math.sin(sigU * Math.PI * 4) * (size * 0.05) * hopEnvelope;
        sigScale = 1.0 + 0.12 * hopEnvelope;
      }

      // Organic sway and breath
      const sway = (shouldAnimate ? Math.sin(elapsed * 1.5) * (size * 0.012) : 0) + sigSway;
      const breath = (shouldAnimate ? Math.sin(elapsed * 2.2) * (size * 0.008) : 0) + sigDy;
      const blinkCycle = shouldAnimate ? Math.sin(elapsed * 0.7) : 0;
      const isBlinking = blinkCycle > 0.94;
      const eyeScaleY = isBlinking ? 0.15 : 1.0;

      // Update ripples
      let hasActiveRipples = false;
      for (const rip of ripplesRef.current) {
        if (rip.active) {
          hasActiveRipples = true;
          rip.age += 0.035;
          rip.r += size * 0.035;
          if (rip.r > size * 0.9) rip.active = false;
        }
      }

      // Draw Bayer Dither Dots with Theme Mode
      for (let gy = 0; gy < cells; gy++) {
        for (let gx = 0; gx < cells; gx++) {
          let cx = gx * cellW + cellW / 2;
          let cy = gy * cellH + cellH / 2;

          let density = densityMap[gy * cells + gx];
          if (density <= 0.01) continue;

          // Apply subtle warp and signature scale
          const warpY = ((cy - size / 2) / size) * breath;
          const warpX = sway;
          cx = size / 2 + (cx - size / 2) * sigScale + warpX;
          cy = size / 2 + (cy - size / 2) * sigScale + warpY;

          // Apply Ripple shockwave physics
          let pushScale = 1.0;
          let isHighlighted = false;

          for (const rip of ripplesRef.current) {
            if (!rip.active) continue;
            const dx = cx - rip.x;
            const dy = cy - rip.y;
            const dist = Math.hypot(dx, dy) + 0.001;
            const wave = Math.abs(dist - rip.r);
            const ringWidth = size * 0.08;

            if (wave < ringWidth) {
              const factor = 1 - wave / ringWidth;
              const push = factor * 4.5;
              cx += (dx / dist) * push;
              cy += (dy / dist) * push;
              pushScale += factor * 0.4;
              if (factor > 0.3) isHighlighted = true;
            }
          }

          // Bayer 8x8 threshold comparison
          const bx = gx % 8;
          const by = gy % 8;
          const threshold = (BAYER_8X8[by][bx] + 0.5) / 64.0;

          if (density > threshold) {
            const dotW = cellW * dotScale * pushScale;
            const dotH = cellH * dotScale * pushScale;

            // Pick color according to themeMode
            if (isHighlighted) {
              ctx.fillStyle = '#18181B';
            } else if (themeMode === 'twoTone') {
              // Deterministic pseudo-random split
              const hash = ((gx * 37 + gy * 79) % 100) / 100;
              ctx.fillStyle = hash < twoToneMix ? secondaryColor : color;
            } else if (themeMode === 'gradient') {
              // Normalized projection along angle (-1..1 transformed to 0..1)
              const nx = (cx / size - 0.5) * 2;
              const ny = (cy / size - 0.5) * 2;
              const proj = (nx * cosA + ny * sinA + 1) / 2;
              ctx.fillStyle = lerpRgb(rgbPrimary, rgbSecondary, proj);
            } else {
              ctx.fillStyle = color;
            }

            if (dotShape === 'square') {
              ctx.fillRect(cx - dotW / 2, cy - dotH / 2, dotW, dotH);
            } else if (dotShape === 'round') {
              ctx.beginPath();
              ctx.arc(cx, cy, dotW / 2, 0, Math.PI * 2);
              ctx.fill();
            } else if (dotShape === 'hex') {
              ctx.beginPath();
              for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3 - Math.PI / 2;
                const hx = cx + (dotW * 0.56) * Math.cos(angle);
                const hy = cy + (dotW * 0.56) * Math.sin(angle);
                if (i === 0) ctx.moveTo(hx, hy);
                else ctx.lineTo(hx, hy);
              }
              ctx.closePath();
              ctx.fill();
            } else if (dotShape === 'diamond') {
              ctx.beginPath();
              ctx.moveTo(cx, cy - dotH * 0.6);
              ctx.lineTo(cx + dotW * 0.6, cy);
              ctx.lineTo(cx, cy + dotH * 0.6);
              ctx.lineTo(cx - dotW * 0.6, cy);
              ctx.closePath();
              ctx.fill();
            }
          }
        }
      }

      // Draw Face Overlays (Eyes, Cheeks, Details)
      if (showFace && art) {
        // Cheeks
        if (art.cheeks && art.cheeks.length > 0) {
          ctx.fillStyle = 'rgba(255, 105, 150, 0.7)';
          for (const [cxArt, cyArt, rArt] of art.cheeks) {
            const cx = cxArt * artScale + sway;
            const cy = cyArt * artScale + breath;
            const rx = rArt * artScale * 1.25 * sigScale;
            const ry = rArt * artScale * 0.9 * sigScale;
            ctx.beginPath();
            ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Eyes
        if (art.eyes && art.eyes.length > 0) {
          for (const [exArt, eyArt, rArt] of art.eyes) {
            const ex = exArt * artScale + sway;
            const ey = eyArt * artScale + breath;
            const eyeR = rArt * artScale * sigScale;

            // Eye Sclera (White base with refined contour)
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.ellipse(ex, ey, eyeR * 1.15, eyeR * 1.15 * eyeScaleY, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#27272A';
            ctx.lineWidth = Math.max(1.1, eyeR * 0.16);
            ctx.stroke();

            // Pupil
            if (!isBlinking) {
              ctx.fillStyle = '#18181B';
              ctx.beginPath();
              ctx.arc(ex, ey, eyeR * 0.72, 0, Math.PI * 2);
              ctx.fill();

              // Specular catchlight sparkle
              ctx.fillStyle = '#FFFFFF';
              ctx.beginPath();
              ctx.arc(ex + eyeR * 0.25, ey - eyeR * 0.25, eyeR * 0.28, 0, Math.PI * 2);
              ctx.fill();
            } else {
              // Closed eye line
              ctx.strokeStyle = '#18181B';
              ctx.lineWidth = Math.max(1.5, eyeR * 0.32);
              ctx.lineCap = 'round';
              ctx.beginPath();
              ctx.moveTo(ex - eyeR * 0.85, ey);
              ctx.lineTo(ex + eyeR * 0.85, ey);
              ctx.stroke();
            }
          }
        }

        // Detail vector lines (mouths, whiskers, toes, beaks)
        if (precompiledDetails.length > 0) {
          ctx.save();
          ctx.translate(sway, breath);
          ctx.scale(artScale, artScale);

          for (const d of precompiledDetails) {
            if (!d.path) continue;
            if (d.kind === 0) {
              ctx.strokeStyle = '#18181B';
              ctx.lineWidth = Math.max(0.75, d.width);
              ctx.lineCap = 'round';
              ctx.lineJoin = 'round';
              ctx.stroke(d.path);
            } else if (d.kind === 1) {
              ctx.fillStyle = '#18181B';
              ctx.fill(d.path);
            } else if (d.kind === 2) {
              ctx.strokeStyle = '#FFFFFF';
              ctx.lineWidth = Math.max(0.75, d.width);
              ctx.lineCap = 'round';
              ctx.lineJoin = 'round';
              ctx.stroke(d.path);
            } else if (d.kind === 3) {
              ctx.fillStyle = '#FFFFFF';
              ctx.fill(d.path);
            } else if (d.kind === 4) {
              ctx.fillStyle = 'rgba(255, 105, 150, 0.85)';
              ctx.fill(d.path);
            }
          }
          ctx.restore();
        }
      }

      // Draw Signature particle effect overlays
      if (isSig) {
        const particleEnv = Math.sin(sigU * Math.PI);
        const pCount = 7;
        for (let i = 0; i < pCount; i++) {
          const ang = (i / pCount) * Math.PI * 2 + sigU * 3;
          const dist = (size * 0.32) + sigU * (size * 0.2) + ((i % 2) * 8);
          const px = size / 2 + Math.cos(ang) * dist + sway;
          const py = size / 2 + Math.sin(ang) * dist * 0.8 + breath;
          const alpha = particleEnv * (1 - sigU * 0.7);

          if (animalId === 'elephant' || animalId === 'fish' || animalId === 'whale') {
            // Water Bubble stream
            ctx.beginPath();
            ctx.arc(px, py, 4.5 + (i % 3) * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.75})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          } else if (animalId === 'cat' || animalId === 'dog' || animalId === 'rabbit') {
            // Heart sparkles
            ctx.fillStyle = `rgba(244, 63, 94, ${alpha * 0.9})`;
            ctx.font = `${Math.round(14 * particleEnv)}px sans-serif`;
            ctx.fillText('💖', px - 7, py + 5);
          } else {
            // Star sparkles / confetti
            ctx.fillStyle = `rgba(251, 191, 36, ${alpha * 0.95})`;
            ctx.beginPath();
            const r = 5 * particleEnv;
            ctx.arc(px, py, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      if (shouldAnimate || hasActiveRipples || isSig) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [
    animalId,
    size,
    cells,
    dotShape,
    color,
    secondaryColor,
    themeMode,
    gradientAngle,
    twoToneMix,
    shouldAnimate,
    isSignatureRunning,
    showFace,
    dotScale,
    phase,
    onSignatureEnd,
  ]);

  return (
    <div
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        onPointerDown={handlePointerDown}
        className={`touch-none ${interactive ? 'cursor-pointer transition-transform active:scale-95' : ''}`}
        title={interactive ? `Click to poke ${animalId}!` : animalId}
      />
      {interactive && isPoked && (
        <span className="absolute -top-2 right-0 font-mono text-[10px] font-bold px-2 py-0.5 bg-orange-500 text-white rounded-full shadow-sm pointer-events-none animate-bounce">
          Shockwave ⚡
        </span>
      )}
      {isSignatureRunning && (
        <span className="absolute -top-2 left-0 font-mono text-[10px] font-bold px-2.5 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full shadow-sm pointer-events-none animate-pulse">
          Special Move ✨
        </span>
      )}
    </div>
  );
}
