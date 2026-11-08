'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ANIMALS } from '../data/animals';
import DitherCanvas from './DitherCanvas';
import { sounds } from '../utils/sound';
import { Volume2, VolumeX, X, RotateCcw, Shuffle } from 'lucide-react';

interface LoadingScreenProps {
  isOpen?: boolean;
  onClose?: () => void;
  autoStart?: boolean;
}

interface BurstParticle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rot: number;
}

const TOTAL_ANIMALS = ANIMALS.length; // 50 animals in library
const VISIBLE_COUNT = 6; // Number of animals concurrently visible along the arc

export default function LoadingScreen({
  isOpen = true,
  onClose,
  autoStart = true,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoStart);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Deterministic order (0..49) ensures 100% identical SSR & client hydration
  const [animalOrder, setAnimalOrder] = useState<number[]>(() =>
    Array.from({ length: TOTAL_ANIMALS }, (_, i) => i)
  );

  const [pokedAnimalId, setPokedAnimalId] = useState<string | null>(null);
  const [particles, setParticles] = useState<BurstParticle[]>([]);

  const [isCompleted, setIsCompleted] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);

  const lastStepIndexRef = useRef(-1);
  const particleCounterRef = useRef(0);

  // Safe dismiss with smooth fade
  const handleDismiss = useCallback(() => {
    setIsDismissing(true);
    setTimeout(() => {
      onClose?.();
      setIsDismissing(false);
    }, 450);
  }, [onClose]);

  // Restart parade from 0%
  const handleReplay = useCallback(() => {
    sounds.playSparkle();
    setProgress(0);
    setIsCompleted(false);
    setIsPlaying(true);
    lastStepIndexRef.current = -1;
  }, []);

  // Shuffle the parade queue order
  const handleShuffleQueue = useCallback(() => {
    sounds.enable();
    sounds.playSparkle();
    setSoundEnabled(true);
    setAnimalOrder((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    });
  }, []);

  // Poke an individual marching animal
  const pokeAnimal = useCallback((animalId: string) => {
    sounds.enable();
    setSoundEnabled(true);
    sounds.playBoing();
    setPokedAnimalId(animalId);
    setTimeout(() => setPokedAnimalId(null), 500);

    const emojis = ['✨', '⭐', '🐾', '💖', '💫', '🎉'];
    const newParticles: BurstParticle[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const distance = 40 + Math.random() * 30;
      newParticles.push({
        id: ++particleCounterRef.current,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 15,
        rot: (Math.random() - 0.5) * 45,
      });
    }

    setParticles(newParticles);
    setTimeout(() => {
      setParticles([]);
    }, 700);
  }, []);

  // Progress ticker loop
  useEffect(() => {
    if (!isPlaying || isCompleted) return;

    let animId: number;
    let lastTime = performance.now();
    const duration = 8500; // 8.5 seconds smooth parade march for all 50 pets

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      setProgress((prev) => {
        const step = (delta / duration) * 100;
        const next = Math.min(100, prev + step);

        // Sound blip for footsteps along the march:
        // Ascending pitch as characters approach summit, descending into landing
        const stepIdx = Math.floor((next / 100) * 40);
        if (stepIdx !== lastStepIndexRef.current) {
          lastStepIndexRef.current = stepIdx;
          const pitchBase =
            next <= 50 ? 400 + (next / 50) * 220 : 620 - ((next - 50) / 50) * 200;
          sounds.playStep(pitchBase);
        }

        if (next >= 100) {
          setIsCompleted(true);
          setIsPlaying(false);
          sounds.playFanfare();
          setTimeout(() => {
            handleDismiss();
          }, 1100);
          return 100;
        }
        return next;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isCompleted, handleDismiss]);

  // Keyboard shortcut: Esc to skip, Space to pause/play
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      } else if (e.key === ' ') {
        e.preventDefault();
        if (isCompleted) {
          handleDismiss();
        } else {
          setIsPlaying((p) => {
            const next = !p;
            if (next) sounds.playClick();
            return next;
          });
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleDismiss, isCompleted]);

  if (!isOpen) return null;

  // Total parade march calculation:
  // All 50 animals enter one by one at lower right (+36vw, +22vh),
  // crest the summit at upper center (0vw, -6vh),
  // and descend to lower left (-36vw, +22vh) until 100%.
  const T = progress / 100;
  const step = 1 / (TOTAL_ANIMALS + VISIBLE_COUNT - 1);
  const L = VISIBLE_COUNT * step; // duration span each animal remains on screen

  // Compute active animals currently traversing the visible arc (0 <= s <= 1)
  const activeAnimals: {
    animal: (typeof ANIMALS)[0];
    queueIndex: number;
    s: number;
    xVw: number;
    yVh: number;
    tiltDeg: number;
    opacity: number;
    shadowScale: number;
    shadowOpacity: number;
  }[] = [];

  for (let queueIdx = 0; queueIdx < TOTAL_ANIMALS; queueIdx++) {
    const tEnter = queueIdx * step;
    const tExit = tEnter + L;

    if (T >= tEnter && T <= tExit) {
      const s = (T - tEnter) / L; // 0.0 at lower right, 0.5 at center summit, 1.0 at lower left
      const u = (0.5 - s) * 2; // +1.0 -> 0.0 -> -1.0
      const xVw = u * 36;
      const yVh = -6 + 28 * (u * u);
      const tiltDeg = u * 12; // leans forward up into climb, level at summit, forward down into descent
      const opacity = s < 0.06 ? s / 0.06 : s > 0.94 ? (1 - s) / 0.06 : 1;
      const shadowScale = 1 - 0.25 * (1 - u * u);
      const shadowOpacity = (0.35 - 0.15 * (1 - u * u)) * opacity;

      const animalIdx = animalOrder[queueIdx] % TOTAL_ANIMALS;
      const animal = ANIMALS[animalIdx];

      if (animal) {
        activeAnimals.push({
          animal,
          queueIndex: queueIdx,
          s,
          xVw,
          yVh,
          tiltDeg,
          opacity,
          shadowScale,
          shadowOpacity,
        });
      }
    }
  }

  // Current animal at or near the summit for the status label
  const currentLeaderQueueIdx = Math.min(
    TOTAL_ANIMALS - 1,
    Math.max(0, Math.floor(T * TOTAL_ANIMALS))
  );
  const currentLeader = ANIMALS[animalOrder[currentLeaderQueueIdx] % TOTAL_ANIMALS];

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-center items-center bg-[#FCFAF6] text-neutral-800 transition-opacity duration-500 overflow-hidden select-none ${
        isDismissing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Loading Screen"
    >
      {/* Background Soft Ambient Peach Glow & Clean Retro Pixel Grid */}
      <div className="absolute inset-0 retro-pixel-grid pointer-events-none opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[480px] bg-gradient-to-r from-orange-200/20 via-amber-100/15 to-rose-200/15 blur-3xl pointer-events-none -z-10" />

      {/* Top-Right Controls: Sound, Shuffle Parade Order, Skip */}
      <div className="absolute top-5 right-5 sm:top-7 sm:right-8 z-30 flex items-center gap-2">
        {/* Sound toggle */}
        <button
          onClick={() => {
            const next = sounds.toggle();
            setSoundEnabled(next);
          }}
          onMouseEnter={() => sounds.playHover()}
          className="p-2 rounded-full bg-white/80 hover:bg-white text-neutral-400 hover:text-neutral-700 transition-all shadow-xs"
          title={soundEnabled ? 'Mute' : 'Unmute (8-bit Sound FX)'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-amber-500 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        {/* Shuffle Parade Order */}
        <button
          onClick={handleShuffleQueue}
          onMouseEnter={() => sounds.playHover()}
          className="p-2 rounded-full bg-white/80 hover:bg-white text-neutral-400 hover:text-orange-600 transition-all shadow-xs"
          title="Shuffle Parade Order"
        >
          <Shuffle className="w-4 h-4" />
        </button>

        {/* Skip */}
        <button
          onClick={handleDismiss}
          onMouseEnter={() => sounds.playHover()}
          className="p-2 rounded-full bg-white/80 hover:bg-white text-neutral-400 hover:text-neutral-700 transition-all shadow-xs"
          title="Skip to Website"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Clean Retro Center Percentage & Realtime Parade Counter (Lower Center) */}
      <div className="relative z-10 flex flex-col items-center justify-center select-none pointer-events-none translate-y-16 sm:translate-y-20">
        <div className="font-mono text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-neutral-900/90 flex items-baseline">
          <span>{Math.round(progress)}</span>
          <span className="text-3xl sm:text-4xl md:text-5xl text-orange-500 font-extrabold ml-1.5">
            %
          </span>
        </div>

        <div className="mt-2 text-xs sm:text-sm font-mono text-neutral-500 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          <span>
            Pet {currentLeaderQueueIdx + 1} of {TOTAL_ANIMALS} in parade:
          </span>
          <span className="text-neutral-900 font-bold flex items-center gap-1">
            <span>{currentLeader?.emoji}</span>
            <span>{currentLeader?.name}</span>
          </span>
        </div>
      </div>

      {/* Lively Procession of Animals Streaming Along the Arc One by One */}
      {activeAnimals.map((item) => {
        const isPoked = pokedAnimalId === item.animal.id;

        return (
          <div
            key={item.animal.id}
            className="absolute top-1/2 left-1/2 z-20 will-change-transform pointer-events-auto"
            style={{
              transform: `translate(calc(-50% + ${item.xVw}vw), calc(-50% + ${item.yVh}vh))`,
              opacity: item.opacity,
            }}
          >
            <div
              className="relative flex flex-col items-center select-none transition-transform duration-100"
              style={{
                transform: `rotate(${item.tiltDeg}deg)`,
              }}
            >
              {/* Particle Burst on Poke */}
              {isPoked &&
                particles.map((p) => (
                  <span
                    key={p.id}
                    className="absolute text-xl pointer-events-none animate-particle-burst select-none"
                    style={
                      {
                        '--tw-burst-x': `${p.x}px`,
                        '--tw-burst-y': `${p.y}px`,
                        '--tw-burst-rot': `${p.rot}deg`,
                      } as React.CSSProperties
                    }
                  >
                    {p.emoji}
                  </span>
                ))}

              {/* Mascot Canvas */}
              <div
                onClick={() => pokeAnimal(item.animal.id)}
                onMouseEnter={() => sounds.playHover()}
                className={`cursor-pointer transition-transform duration-300 ${
                  isPoked ? '-translate-y-4 scale-115' : 'hover:scale-105 active:scale-95'
                }`}
                title={`Click to poke ${item.animal.name}!`}
              >
                {/* Facing LEFT with marching bob, rhythmically staggered delays */}
                <div
                  className="animate-walk-bob"
                  style={{
                    animationDelay: `${(item.queueIndex % 4) * 0.18}s`,
                    transform: 'scaleX(-1)',
                  }}
                >
                  <DitherCanvas
                    animalId={item.animal.id}
                    size={80}
                    cells={32}
                    dotShape="square"
                    color={item.animal.color}
                    interactive={false}
                    animated={false}
                    showFace={true}
                  />
                </div>
              </div>

              {/* Clean Mascot Name Pill Badge */}
              <button
                onClick={() => pokeAnimal(item.animal.id)}
                onMouseEnter={() => sounds.playHover()}
                className="mt-1 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 text-[10px] font-mono font-semibold text-neutral-800 shadow-xs hover:bg-orange-50 cursor-pointer transition-all hover:scale-105 active:scale-95 border border-neutral-200/60"
                title={`Click to poke ${item.animal.name}!`}
              >
                <span className="text-xs">{item.animal.emoji}</span>
                <span>{item.animal.name}</span>
              </button>

              {/* Dynamic Walking Shadow Beneath */}
              <div
                className="mt-0.5 h-1.5 bg-orange-950/20 rounded-full blur-[2px] pointer-events-none transition-all duration-150"
                style={{
                  width: `${80 * 0.5 * item.shadowScale}px`,
                  opacity: item.shadowOpacity,
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Bottom Shortcuts / Replay */}
      {isCompleted ? (
        <button
          onClick={handleReplay}
          onMouseEnter={() => sounds.playHover()}
          className="absolute bottom-8 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 hover:bg-white text-orange-600 font-mono text-xs font-semibold hover:scale-105 transition-all shadow-sm border border-neutral-200 cursor-pointer"
          title="Replay 50 Mascot Parade"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay 50 Mascot Parade</span>
        </button>
      ) : (
        <div className="absolute bottom-6 z-20 text-[11px] text-neutral-400 font-mono flex items-center gap-2 select-none pointer-events-none">
          <span>[Space] Pause</span>
          <span>•</span>
          <span>[Esc] Skip</span>
          <span>•</span>
          <span>Click any marching pet to poke</span>
        </div>
      )}
    </div>
  );
}
