"use client";
import React, { useState, useEffect } from 'react';
import { Handshake, Zap, Scale, Server, Cpu, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';

export const Market = () => {
  const [activeMode, setActiveMode] = useState<'legacy' | 'sidecar'>('sidecar');

  return (
    <section id="market" className="py-24 px-6 max-w-7xl mx-auto bg-slate-900/30 rounded-3xl my-20">
      <div className="text-center mb-16">
        <Badge>Go To Market</Badge>
        <h2 className="text-4xl font-bold text-white mt-4 mb-6">The "Sidecar" Strategy</h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-8">
          We don't replace the H100. We save it. By offloading the 24/7 inference noise, we let the GPU do what it was born to do.
        </p>

        {/* Toggle Switch */}
        <div className="inline-flex bg-slate-950 p-1 rounded-full border border-slate-800">
          <button
            onClick={() => setActiveMode('legacy')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              activeMode === 'legacy' ? 'bg-red-500/20 text-red-400' : 'text-slate-500 hover:text-white'
            }`}
          >
            Legacy (GPU Only)
          </button>
          <button
            onClick={() => setActiveMode('sidecar')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              activeMode === 'sidecar' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-white'
            }`}
          >
            Sidecar Strategy
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        {/* Left: The Visualizer */}
        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 relative overflow-hidden min-h-[400px]">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          
          <div className="relative z-10 flex flex-col justify-between h-full gap-8">
            {/* Incoming Traffic Source */}
            <div className="flex items-center gap-4 text-slate-400">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <Server className="w-6 h-6" />
              </div>
              <div className="text-sm font-mono">Incoming AI Workload</div>
            </div>

            {/* The Routing Visual */}
            <div className="flex-1 relative flex items-center justify-center">
               {/* Traffic Animation */}
               <TrafficFlow mode={activeMode} />

               <div className="flex flex-col gap-12 w-full pl-20">
                 {/* GPU Destination */}
                 <div className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                   activeMode === 'legacy' ? 'bg-red-900/10 border-red-500/50' : 'bg-slate-900/50 border-slate-800'
                 }`}>
                   <div className="bg-slate-900 p-3 rounded-lg">
                     <Cpu className={`w-8 h-8 ${activeMode === 'legacy' ? 'text-red-400 animate-pulse' : 'text-slate-400'}`} />
                   </div>
                   <div>
                     <div className="text-white font-bold">NVIDIA H100</div>
                     <div className="text-xs text-slate-400">Heavy Training & Batches</div>
                   </div>
                   {activeMode === 'legacy' && (
                     <div className="ml-auto text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded">OVERLOADED</div>
                   )}
                 </div>

                 {/* Sidecar Destination */}
                 <div className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                   activeMode === 'sidecar' ? 'bg-emerald-900/10 border-emerald-500/50' : 'bg-slate-900/30 border-slate-800 opacity-50'
                 }`}>
                   <div className="bg-slate-900 p-3 rounded-lg">
                     <Zap className={`w-8 h-8 ${activeMode === 'sidecar' ? 'text-emerald-400' : 'text-slate-600'}`} />
                   </div>
                   <div>
                     <div className="text-white font-bold">Energy Fabric (Sidecar)</div>
                     <div className="text-xs text-slate-400">Routine Inference (24/7)</div>
                   </div>
                   {activeMode === 'sidecar' && (
                     <div className="ml-auto text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">ACTIVE</div>
                   )}
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right: The Cards */}
        <div className="space-y-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-colors group">
            <Handshake className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-2">Complementary</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We sit alongside the GPU via PCIe. We catch the small, frequent inference tasks that waste GPU cycles, letting the big chips focus on training.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-colors group">
            <Scale className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-2">Intelligent Offloading</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Just as a CPU offloads graphics to a GPU, the GPU now offloads inference to us. It's the natural evolution of datacenter specialization.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-colors group">
            <Zap className="w-8 h-8 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-2">40% TCO Reduction</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              By moving 80% of volume (inference) to a chip that uses 1/5th the power, total cluster costs drop dramatically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Subcomponent: Traffic Particles ---
const TrafficFlow = ({ mode }: { mode: 'legacy' | 'sidecar' }) => {
  return (
    <div className="absolute left-0 top-0 bottom-0 w-20 flex flex-col justify-center items-center gap-2 pointer-events-none">
      {/* Generate a stream of "Packets" */}
      {[...Array(8)].map((_, i) => (
        <TrafficPacket key={i} index={i} mode={mode} />
      ))}
    </div>
  );
};

const TrafficPacket = ({ index, mode }: { index: number, mode: 'legacy' | 'sidecar' }) => {
  // Randomize packet types (Small = Inference, Big = Training)
  const isTraining = index % 4 === 0; // Every 4th packet is big
  const size = isTraining ? 'w-4 h-4' : 'w-2 h-2';
  const color = isTraining ? 'bg-purple-400' : 'bg-slate-200';
  
  // Calculate destination Y position
  // 0 = Center (Source)
  // GPU is Top (-80px approx), Sidecar is Bottom (+80px approx)
  const destinationY = mode === 'legacy' 
    ? -50 // Everything goes to GPU (Top)
    : isTraining ? -50 : 50; // Training -> Top, Inference -> Bottom

  return (
    <motion.div
      className={`absolute rounded-full ${size} ${color} shadow-[0_0_8px_currentColor]`}
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{ 
        x: [0, 50, 200], // Move right
        y: [0, 0, destinationY], // Split paths
        opacity: [0, 1, 0] 
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        delay: index * 0.3, 
        ease: "linear" 
      }}
    />
  );
};