import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import AgentationProvider from '@/components/AgentationProvider';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  preload: false,
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
  preload: false,
});

export const metadata: Metadata = {
  title: 'dither_animals — Animated Bayer Dither Animal Widgets for Flutter',
  description:
    'Flutter package with 50 cute chibi animal widgets rendered with retro 8x8 Bayer matrix dithering, poke ripple physics, signature animations, and studio playground.',
  keywords: [
    'flutter',
    'dithering',
    'ordered dithering',
    'bayer matrix',
    'chibi animals',
    'pixel art',
    'widgets',
    'animation',
    'haptics',
  ],
  authors: [{ name: 'ayan888' }],
  openGraph: {
    title: 'dither_animals — Animated Bayer Dither Animal Widgets for Flutter',
    description:
      '50 cute chibi animal widgets for Flutter with authentic retro ordered Bayer dithering, poke shockwaves, and expressions.',
    url: 'https://pub.dev/packages/dither_animals',
    siteName: 'dither_animals',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FBFBFB] text-neutral-900 font-sans antialiased selection:bg-orange-500 selection:text-white">
        {children}
        <AgentationProvider />
      </body>
    </html>
  );
}
