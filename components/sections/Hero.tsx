"use client";
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const Hero = () => (
  <div className="relative flex flex-col items-center justify-center min-h-screen text-center bg-slate-950 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950" />
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 max-w-4xl mx-auto px-6"
    >
      <Badge>Series A Pitch</Badge>
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
        Scaling Intelligence, <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          Not Power.
        </span>
      </h1>
      <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        The bottleneck isn't silicon availability—it's the grid. We are building the first energy-native inference fabric for power-constrained datacenters.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={() => document.getElementById('simulation')?.scrollIntoView({ behavior: 'smooth'})} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2">
          View Live Simulation <Activity size={20} />
        </button>
      </div>
    </motion.div>
  </div>
);