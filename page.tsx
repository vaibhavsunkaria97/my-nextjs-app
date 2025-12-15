import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Simulation } from '@/components/sections/Simulation';
import { Technology } from '@/components/sections/Technology';
import { Market } from '@/components/sections/Market';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen text-slate-200 selection:bg-emerald-500/30">
      <Navbar />
      <Hero />
      <Problem />
      <Simulation />
      <Technology />
      <Market />
      <Footer />
    </main>
  );
}