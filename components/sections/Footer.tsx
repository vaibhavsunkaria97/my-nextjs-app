import { Cpu } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-slate-950 py-12 border-t border-slate-900 text-center">
    <div className="flex items-center justify-center gap-2 mb-6 text-emerald-500">
      <Cpu size={32} />
      <span className="text-2xl font-bold text-white">InferenceFabric</span>
    </div>
    <p className="text-slate-500 mb-8">Building the silicon layer for the energy-constrained future.</p>
    <div className="mt-12 text-slate-700 text-sm">
      © 2025 Inference Fabric Technologies. Confidential.
    </div>
  </footer>
);