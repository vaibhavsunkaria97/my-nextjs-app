"use client";
import React, { useState, useEffect } from 'react';
import { Activity, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

// Simulate live data stream
const generateData = () => {
  const points = [];
  for (let i = 0; i < 20; i++) {
    const baseLoad = 40 + Math.random() * 60; // Random workload 40-100%
    points.push({
      time: i,
      gpuPower: 95, // Legacy GPU is always near max power (static overhead)
      ourPower: baseLoad * 0.2 + 10, // Our chip scales linearly with load (10% idle)
      workload: baseLoad
    });
  }
  return points;
};

export const Simulation = () => {
  const [data, setData] = useState(generateData());
  const [currentEfficiency, setCurrentEfficiency] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const newLoad = 30 + Math.random() * 70; // Varying workload
        
        newData.push({
          time: prev[prev.length - 1].time + 1,
          gpuPower: 90 + Math.random() * 5, // Competitor stays high
          ourPower: (newLoad * 0.25) + 5, // We scale down
          workload: newLoad
        });
        
        // Calculate live efficiency gain for the UI
        const latest = newData[newData.length-1];
        setCurrentEfficiency(Math.round(((latest.gpuPower - latest.ourPower) / latest.gpuPower) * 100));
        
        return newData;
      });
    }, 800); // Update every 800ms

    return () => clearInterval(interval);
  }, []);

  return (
    <section id = "simulation" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Text Side */}
        <div className="lg:col-span-1 space-y-6">
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">Live Simulation</Badge>
          <h2 className="text-4xl font-bold text-white">Dynamic Power Gating</h2>
          <p className="text-slate-400 leading-relaxed">
            Watch how legacy chips (Red) burn power waiting for work, while our Energy Fabric (Green) scales power usage instantly to match the workload.
          </p>
          
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <div className="text-sm text-slate-500 mb-1">Real-Time Efficiency Gain</div>
            <div className="text-5xl font-mono font-bold text-emerald-400">{currentEfficiency}%</div>
            <div className="text-sm text-emerald-500/80 mt-2 flex items-center">
              <Zap className="w-4 h-4 mr-1" /> Less Power Used
            </div>
          </div>
        </div>

        {/* Graph Side */}
        <div className="lg:col-span-2 bg-slate-950 p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-6 right-6 flex gap-6 text-sm font-bold z-10">
            <div className="flex items-center text-red-400">
              <div className="w-3 h-3 bg-red-400 rounded-full mr-2 animate-pulse" /> Legacy GPU
            </div>
            <div className="flex items-center text-emerald-400">
              <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2 animate-pulse" /> Our Fabric
            </div>
          </div>

          <div className="h-[350px] w-full mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorGpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOur" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <YAxis hide domain={[0, 100]} />
                <Area 
                  type="monotone" 
                  dataKey="gpuPower" 
                  stroke="#f87171" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorGpu)" 
                  isAnimationActive={false}
                />
                <Area 
                  type="monotone" 
                  dataKey="ourPower" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorOur)" 
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="absolute bottom-4 left-0 w-full flex justify-center text-slate-500 text-xs tracking-widest uppercase">
            Live Inference Workload (Time)
          </div>
        </div>
      </div>
    </section>
  );
};