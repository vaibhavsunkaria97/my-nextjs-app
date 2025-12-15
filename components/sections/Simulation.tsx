"use client";
import React, { useState } from 'react';
import { Activity, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const Simulation = () => {
  const [load, setLoad] = useState(30);
  
  // Mathematical Logic
  const gpuPower = 40 + (load * 0.6) + (load > 80 ? 20 : 0); 
  const iftPower = 5 + (load * 0.35);
  const tiles = Array.from({ length: 64 });

  return (
    <section id="simulation" className="py-12 px-6 max-w-7xl mx-auto">
      <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
        <div className="text-center mb-12">
          <Badge>The Solution</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Inference Fabric Tile (IFT)</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Drag the slider to simulate datacenter load and compare power consumption.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* CONTROLS */}
          <div className="col-span-1 bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-center">
            <label className="text-white font-semibold mb-4 flex justify-between">
              <span>Inference Request Load</span>
              <span className="text-emerald-400">{load}%</span>
            </label>
            <input 
              type="range" min="0" max="100" value={load} 
              onChange={(e) => setLoad(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-8"
            />
            
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-slate-900 rounded-lg border border-red-900/30">
                <div>
                  <div className="text-slate-400 text-sm">Legacy GPU Power</div>
                  <div className="text-2xl font-bold text-red-400">{Math.round(gpuPower)} Watts</div>
                </div>
                <Activity className="text-red-500 opacity-50" />
              </div>

              <div className="flex justify-between items-center p-4 bg-slate-900 rounded-lg border border-emerald-900/30">
                <div>
                  <div className="text-slate-400 text-sm">IFT Fabric Power</div>
                  <div className="text-2xl font-bold text-emerald-400">{Math.round(iftPower)} Watts</div>
                </div>
                <Zap className="text-emerald-500 opacity-50" />
              </div>
            </div>
          </div>

          {/* VISUALIZATION: LEGACY */}
          <div className="col-span-1 flex flex-col items-center">
            <h3 className="text-slate-400 mb-4 uppercase tracking-widest text-sm">Monolithic GPU</h3>
            <div className="w-64 h-64 bg-slate-800 rounded-lg border-2 border-slate-700 relative overflow-hidden transition-all duration-300"
                 style={{ boxShadow: `0 0 ${load / 2}px ${load / 5}px rgba(239, 68, 68, 0.3)` }}>
              <div 
                className="absolute inset-0 bg-red-500 transition-opacity duration-500"
                style={{ opacity: 0.2 + (load / 200) }} 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-red-200 font-mono text-xs p-2 text-center">High Static Leakage</span>
              </div>
            </div>
          </div>

          {/* VISUALIZATION: IFT */}
          <div className="col-span-1 flex flex-col items-center">
            <h3 className="text-slate-400 mb-4 uppercase tracking-widest text-sm">Inference Fabric (Tiles)</h3>
            <div className="w-64 h-64 grid grid-cols-8 gap-0.5 bg-slate-950 p-1 rounded-lg border-2 border-emerald-900/50">
              {tiles.map((_, i) => {
                const isActive = i < (load / 100) * 64;
                return (
                  <div 
                    key={i}
                    className={`rounded-sm transition-all duration-300 ${isActive ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]' : 'bg-slate-900'}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};