import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-dither-dark text-gray-100 antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

