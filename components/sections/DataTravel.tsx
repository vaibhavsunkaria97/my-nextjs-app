"use client";
import React, { useState, useEffect } from 'react';
import { Database, Cpu, ArrowRight, Zap, Flame, AlertTriangle } from 'lucide-react';
import { motion, useAnimationControls } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

export const DataTravel = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [legacyImpact, setLegacyImpact] = useState(false);
  const controls = useAnimationControls();

  const startSimulation = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLegacyImpact(false);

    // Start the legacy travel animation
    controls.start({
      left: '100%',
      transition: { duration: 3, ease: "easeInOut" }
    });

    // Schedule the impact effect when travel completes
    setTimeout(() => {
      setLegacyImpact(true);
    }, 3000);

    // Reset everything
    setTimeout(() => {
      setIsAnimating(false);
      setLegacyImpact(false);
      controls.set({ left: '0%' });
    }, 5000);
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto bg-slate-950 overflow-hidden relative">
      {/* Ambient Background Pulse */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,rgba(0,0,0,0)_50%)] opacity-30 animate-pulse" />
      
      <div className="relative z-10 text-center mb-16">
        <Badge className="bg-emerald-500/10 text-emerald-400 mb-4 border-emerald-500/20">
          The Von Neumann Bottleneck
        </Badge>
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Visualizing <span className="text-red-500">Energy Waste</span>
        </h2>
        <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
          Moving data from external RAM to the processor costs <span className="text-white font-bold">100x</span> more energy than the computation itself. 
          <br />It's the hidden tax on AI performance.
        </p>
        
        <button 
          onClick={startSimulation}
          disabled={isAnimating}
          className="mt-10 group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-slate-900 font-mono rounded-full hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed border border-emerald-500/50 overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-emerald-400 group-hover:opacity-20"></span>
          {isAnimating ? 'Simulating Data Transit...' : 'Run Comparison Test'} <Zap className={`ml-2 w-5 h-5 ${isAnimating ? 'animate-pulse' : ''}`} />
        </button>
      </div>

      <div className="grid gap-12 max-w-4xl mx-auto relative z-10">
        
        {/* === PATH 1: LEGACY (THE BAD WAY) === */}
        <div className="bg-slate-900/80 backdrop-blur p-8 rounded-3xl border border-red-500/30 relative overflow-hidden">
          {/* Heat haze overlay during animation */}
          <motion.div 
            animate={{ opacity: isAnimating ? 0.2 : 0 }}
            className="absolute inset-0 bg-red-600 blur-3xl pointer-events-none"
          />
          
          <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-3">
                <div className="bg-red-500/20 p-2 rounded-lg">
                  <Database className="w-6 h-6 text-red-400" />
                </div>
                <span className="text-slate-300 font-bold uppercase tracking-wider text-sm">Off-Chip DRAM</span>
             </div>
             <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                <Flame className="w-4 h-4 animate-pulse" />
                <span className="font-bold text-sm">Standard Architecture</span>
             </div>
          </div>
          
          {/* The Long Wire Visualization */}
          <div className="relative h-24 bg-slate-950 rounded-2xl border border-red-900/50 flex items-center px-6 shadow-inner overflow-hidden">
             {/* The "Wire" that heats up */}
             <div className="h-2 bg-slate-800 flex-1 mx-6 relative rounded-full overflow-hidden">
                {/* The glowing heat trail behind the data */}
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-red-600 to-orange-500 blur-sm"
                  initial={{ width: '0%' }}
                  animate={controls}
                />
                
                {/* The Data Packet */}
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,1)] z-20 flex items-center justify-center border-2 border-white"
                  initial={{ left: '0%' }}
                  animate={controls}
                >
                  <Zap className="w-3 h-3 text-white fill-white" />
                </motion.div>
             </div>
             
             {/* Destination CPU with Impact Effect */}
             <motion.div
               animate={legacyImpact ? { 
                 x: [-5, 5, -5, 5, 0],
                 color: '#ef4444',
               } : { color: '#94a3b8' }}
               transition={{ duration: 0.5 }}
               className="relative"
             >
                <Cpu className="w-12 h-12 transition-colors duration-300" />
                {legacyImpact && (
                  <motion.div 
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 2 }}
                    className="absolute inset-0 bg-red-500 rounded-full blur-md"
                  />
                )}
             </motion.div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
             <div className="flex items-center text-red-400 text-sm font-mono gap-2">
                {isAnimating && <AlertTriangle className="w-4 h-4 animate-bounce" />}
                {isAnimating ? 'WARNING: HIGH RESISTANCE DETECTED' : 'Path Status: Idle'}
             </div>
             <div className="text-right">
               <div className="text-xs text-slate-500 uppercase tracking-wider">Energy Cost</div>
               <div className="text-2xl text-red-400 font-mono font-bold">~100 pJ/bit</div>
             </div>
          </div>
        </div>

        {/* === PATH 2: IFT (THE GOOD WAY) === */}
        <div className="bg-slate-900/80 backdrop-blur p-8 rounded-3xl border border-emerald-500/30 relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          
          <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-3">
                <div className="bg-emerald-500/20 p-2 rounded-lg">
                  <Database className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-slate-300 font-bold uppercase tracking-wider text-sm">Near-Memory Tiles</span>
             </div>
             <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4" />
                <span className="font-bold text-sm">IFT Energy Fabric</span>
             </div>
          </div>
          
          {/* The Short Path Visualization */}
          <div className="relative h-24 bg-slate-950 rounded-2xl border border-emerald-900/50 flex items-center justify-center px-6 shadow-inner">
             <div className="flex items-center gap-4 relative">
               <Database className="w-12 h-12 text-emerald-600" />
               
               {/* The connection "Snap" animation */}
               <div className="relative">
                 <ArrowRight className="w-8 h-8 text-emerald-800/50" />
                 <motion.div 
                    animate={{ 
                      opacity: isAnimating ? [0, 1, 0, 1, 0] : 0,
                      scale: isAnimating ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.5, times: [0, 0.1, 0.2, 0.3, 1] }}
                    className="absolute inset-0 flex items-center justify-center text-emerald-400"
                 >
                   <Zap className="w-10 h-10 fill-emerald-400 animate-ping absolute" />
                   <ArrowRight className="w-8 h-8 relative z-10" />
                 </motion.div>
               </div>

               <motion.div
                 animate={isAnimating ? { color: '#34d399', scale: [1, 1.1, 1] } : { color: '#34d399' }}
                 transition={{ delay: 0.1, duration: 0.4 }}
               >
                 <Cpu className="w-12 h-12 transition-colors duration-300" />
               </motion.div>
             </div>
             
             {/* Overlay text that appears during animation */}
             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isAnimating ? 1 : 0, y: isAnimating ? 0 : 10 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-emerald-400 uppercase tracking-[0.2em] bg-slate-950/90 px-4 py-1 rounded-full border border-emerald-500/20 whitespace-nowrap"
             >
               INSTANT ACCESS
             </motion.div>
          </div>

          <div className="mt-4 flex justify-between items-center">
             <div className="text-emerald-400 text-sm font-mono">
                Path Status: Optimal
             </div>
             <div className="text-right">
               <div className="text-xs text-slate-500 uppercase tracking-wider">Energy Cost</div>
               <div className="text-2xl text-emerald-400 font-mono font-bold">&lt; 5 pJ/bit</div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};