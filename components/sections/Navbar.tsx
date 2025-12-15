import { Cpu } from 'lucide-react';

export const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2 font-bold text-white text-xl">
        <Cpu className="text-emerald-500" /> IFT
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
        <a href="#problem" className="hover:text-emerald-400 transition-colors">The Problem</a>
        <a href="#simulation" className="hover:text-emerald-400 transition-colors">Simulation</a>
        <a href="#market" className="hover:text-emerald-400 transition-colors">Market</a>
      </div>
      <button className="bg-white text-slate-950 px-4 py-2 rounded font-semibold text-sm hover:bg-emerald-50 transition-colors">
        Invest Now
      </button>
    </div>
  </nav>
);