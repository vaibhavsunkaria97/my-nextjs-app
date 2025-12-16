import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Simulation } from '@/components/sections/Simulation';
import { Financials } from '@/components/sections/Financials'; // NEW
import { MarketDeepDive } from '@/components/sections/MarketDeepDive'; // NEW
import { Technology } from '@/components/sections/Technology';
import {Market}  from '@/components/sections/Market';
import { Footer } from '@/components/sections/Footer';
import { DeckDownload } from '@/components/ui/DeckDownload'; // NEW
import {DataTravel} from '@/components/sections/DataTravel';

export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen text-slate-200 selection:bg-emerald-500/30">
      <Navbar />
      
      {/* Slide 1 */}
      <Hero />
      
      {/* Slide 2 */}
      <Problem />

      < DataTravel />
      
      {/* Slide 3: Deep Market Data */}
      <MarketDeepDive />
      
      {/* Slide 4: The Solution Visualized */}
      <Simulation />
      
      {/* Slide 5: The Financial Argument (TCO) */}
      <Financials />
      
      {/* Slide 6 */}
      <Technology />
      
      {/* Slide 7 */}
      <Market />
      
      <Footer />
      
      {/* Floating Action Button */}
      <DeckDownload />
    </main>
  );
}