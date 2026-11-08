'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AnimalsGallery from '@/components/AnimalsGallery';
import DotVisualizer from '@/components/DotVisualizer';
import Recipes from '@/components/Recipes';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);

  return (
    <main className="min-h-screen flex flex-col bg-[#FCFAF6] text-neutral-800 ambient-peach overflow-x-hidden">
      {/* Curved Arc Loading Screen (Lower Right -> Upper Center -> Down Left) */}
      {showLoading && (
        <LoadingScreen
          isOpen={showLoading}
          onClose={() => setShowLoading(false)}
        />
      )}

      <Navbar onOpenLoading={() => setShowLoading(true)} />
      <Hero onOpenLoading={() => setShowLoading(true)} />
      <AnimalsGallery />
      <DotVisualizer />
      <Recipes />
      <Footer />
    </main>
  );
}
