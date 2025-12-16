"use client";
import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Activity, Flame, Snowflake } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';

// --- Configuration ---
const TOTAL_TILES = 64;
const STAGES = [
  { name: 'IDLE STATE', iftLoad: 0, legacyLoad: 100, duration: 2000 },
  { name: 'LLM TOKEN GEN', iftLoad: 12, legacyLoad: 100, duration: 3000 },
  { name: 'VECTOR SEARCH', iftLoad: 35, legacyLoad: 100, duration: 3000 },
];

export const Technology = () => {
  const [stageIndex, setStageIndex] = useState(0);
  const [iftActiveTiles, setIftActiveTiles] = useState<number[]>([]);
  
  // Current Simulation State
  const stage = STAGES[stageIndex];
  const legacyPower = 350; // Watts (Constant static overhead)
  const iftPower = Math.round(10 + (stage.iftLoad / 100) * 80); // Watts (Scales with load)
  const savings = Math.round(((legacyPower - iftPower) / legacyPower) * 100);

  // --- Automation Loop ---
  useEffect(() => {
    const timer = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % STAGES.length);
    }, stage.duration);

    return () => clearInterval(timer);
  }, [stage.duration]);

  // --- Tile Activation Logic ---
  useEffect(() => {
    // Legacy is always 100% lit up (simulated in CSS), so we only calc IFT tiles
    const tileCount = Math.floor((TOTAL_TILES * stage.iftLoad) / 100);
    const indices = Array.from({ length: TOTAL_TILES }, (_, i) => i);
    const shuffled = indices.sort(() => 0.5 - Math.random());
    setIftActiveTiles(shuffled.slice(0, tileCount));
  }, [stageIndex, stage.iftLoad]);

  return (
    <section id="technology" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 mb-4">
          <Activity className="w-3 h-3 mr-2" />
          Live Architecture Comparison
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Monolithic vs. <span className="text-emerald-400">Sparse</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Watch the difference in real-time. Legacy chips must activate the entire silicon die for simple tasks. 
          Our IFT Fabric wakes only the necessary tiles.
        </p>
      </div>

      {/* --- HUD: The Scoreboard --- */}
      <div className="grid grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
        <div className="text-center border-r border-slate-800">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Current Workload</div>
          <div className="text-xl font-mono text-white font-bold animate-pulse">
            {stage.name}
          </div>
        </div>
        <div className="text-center border-r border-slate-800">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Power Saved</div>
          <div className="text-xl font-mono text-emerald-400 font-bold">
            {savings}%
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Energy Waste</div>
          <div className="text-xl font-mono text-red-400 font-bold">
            {stage.name === 'IDLE STATE' ? 'CRITICAL' : 'HIGH'}
          </div>
        </div>
      </div>

      {/* --- The Head-to-Head Visualizer --- */}
      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        
        {/* LEFT: LEGACY CHIP */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-red-500/10 blur-3xl -z-10 rounded-full" />
          <div className="bg-slate-950 rounded-3xl p-6 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-red-400">
                <Flame className="w-5 h-5" />
                <span className="font-bold">Legacy GPU</span>
              </div>
              <div className="text-2xl font-mono font-bold text-red-400">{legacyPower}W</div>
            </div>

            {/* The "Always On" Grid */}
            <div className="aspect-square bg-slate-900/50 rounded-xl border border-slate-800 p-1 grid grid-cols-8 grid-rows-8 gap-1">
              {[...Array(TOTAL_TILES)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.8 }}
                  animate={{ 
                    opacity: [0.6, 1, 0.6],
                    backgroundColor: '#ef4444' // Red-500
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: Math.random() * 2 
                  }}
                  className="rounded-sm shadow-[0_0_5px_rgba(239,68,68,0.4)]"
                />
              ))}
            </div>
            <div className="text-center mt-4 text-xs text-red-400/60 font-mono uppercase">
              Status: Monolithic Activation (100%)
            </div>
          </div>
        </div>

        {/* RIGHT: IFT CHIP */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl -z-10 rounded-full" />
          <div className="bg-slate-950 rounded-3xl p-6 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-emerald-400">
                <Snowflake className="w-5 h-5" />
                <span className="font-bold">IFT Fabric</span>
              </div>
              <div className="text-2xl font-mono font-bold text-emerald-400">
                {iftPower}W
              </div>
            </div>

            {/* The "Sparse" Grid */}
            <div className="aspect-square bg-slate-900/50 rounded-xl border border-slate-800 p-1 grid grid-cols-8 grid-rows-8 gap-1">
              {[...Array(TOTAL_TILES)].map((_, i) => {
                const isActive = iftActiveTiles.includes(i);
                return (
                  <motion.div
                    key={i}
                    animate={{
                      backgroundColor: isActive ? '#10b981' : '#1e293b', // Emerald vs Slate
                      boxShadow: isActive ? '0 0 10px rgba(16, 185, 129, 0.8)' : 'none',
                    }}
                    transition={{ duration: 0.5 }}
                    className="rounded-sm"
                  />
                );
              })}
            </div>
            <div className="text-center mt-4 text-xs text-emerald-400/60 font-mono uppercase">
              Status: Sparse Activation ({stage.iftLoad}%)
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};