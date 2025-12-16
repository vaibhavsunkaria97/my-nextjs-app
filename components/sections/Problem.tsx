"use client";
import React, { useState } from 'react';
import { BatteryWarning, ThermometerSnowflake, AlertTriangle, Fan } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';

export const Problem = () => {
  const [load, setLoad] = useState(50);
  
  // Physics simulation
  const temperature = 40 + (load * 0.8); // Temp rises with load
  const isThrottling = temperature > 90;
  const performance = isThrottling ? 100 - (temperature - 90) * 2 : 100; // Perf drops if hot

  // Color logic
  const getTempColor = () => {
    if (temperature < 60) return 'text-emerald-400';
    if (temperature < 85) return 'text-amber-400';
    return 'text-red-500';
  };

  return (
    <section id="problem" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Narrative */}
        <div>
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20 mb-4">
            The Bottleneck
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-6">
            The <span className="text-red-500">Thermal Wall</span>
          </h2>
          <p className="text-xl text-slate-400 mb-8 leading-relaxed">
            Standard chips aren't just power hungry; they are hot. 
            <br /><br />
            When AI demand peaks, datacenters hit their cooling limits. 
            The result? <strong>Thermal Throttling.</strong> Chips intentionally slow down to prevent melting, wasting your investment.
          </p>
          
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Interactive Demo: Push the Limit</h3>
            <label className="text-white text-sm font-bold">AI Request Volume</label>
            <input 
              type="range" 
              min="0" 
              max="120" 
              value={load}
              onChange={(e) => setLoad(Number(e.target.value))}
              className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500 mt-2"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Idle</span>
              <span>Peak Load</span>
              <span>Overclocked</span>
            </div>
          </div>
        </div>

        {/* Right: The Server Rack Simulator */}
        <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
          
          {/* Status Overlay */}
          <div className="flex justify-between items-start mb-8 z-10 relative">
             <div className="text-center">
               <div className="text-xs text-slate-500 uppercase">Core Temp</div>
               <div className={`text-4xl font-mono font-bold ${getTempColor()}`}>
                 {temperature.toFixed(0)}°C
               </div>
             </div>
             
             <div className="text-center">
               <div className="text-xs text-slate-500 uppercase">Effective Perf</div>
               <div className={`text-4xl font-mono font-bold ${isThrottling ? 'text-red-500' : 'text-white'}`}>
                 {performance.toFixed(0)}%
               </div>
             </div>
          </div>

          {/* The Server Visualization */}
          <div className="relative h-64 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
            {/* Heat Gradient Overlay */}
            <motion.div 
              className="absolute inset-0 bg-red-600 blur-3xl"
              animate={{ opacity: (temperature - 40) / 100 }}
            />
            
            {/* Throttling Warning */}
            {isThrottling && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20 backdrop-blur-sm"
              >
                <AlertTriangle className="w-16 h-16 text-red-500 mb-2 animate-bounce" />
                <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Throttling</h3>
                <p className="text-red-400 font-mono">PROTECTIVE DOWNCLOCKING ACTIVE</p>
              </motion.div>
            )}

            {/* Fan Animation */}
            <div className="relative z-10 grid grid-cols-3 gap-4 p-4">
               {[1,2,3].map((i) => (
                 <motion.div 
                   key={i}
                   animate={{ rotate: 360 }}
                   transition={{ duration: isThrottling ? 0.2 : 2, repeat: Infinity, ease: "linear" }}
                 >
                   <Fan className={`w-12 h-12 ${isThrottling ? 'text-red-400' : 'text-slate-600'}`} />
                 </motion.div>
               ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm text-slate-400 bg-slate-900/50 p-4 rounded-lg">
            <ThermometerSnowflake className="w-5 h-5 text-blue-400" />
            <p>
              <strong>The Reality:</strong> Current chips hit 90°C instantly under AI loads, forcing cooling systems to consume 40% of the datacenter's power.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};