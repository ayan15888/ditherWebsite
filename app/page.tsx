import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AnimalsGallery from '@/components/AnimalsGallery';
import DotVisualizer from '@/components/DotVisualizer';
import CodeGenerator from '@/components/CodeGenerator';
import Recipes from '@/components/Recipes';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-dither-dark">
      <Navbar />
      <Hero />
      <AnimalsGallery />
      <DotVisualizer />
      <CodeGenerator />
      <Recipes />
      <Footer />
    </main>
  );
}

