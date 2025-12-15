"use client";
import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from '@/components/ui/Badge';

export const Financials = () => {
  const [racks, setRacks] = useState(10);
  const [powerCost, setPowerCost] = useState(0.12); // $ per kWh
  const [utilization, setUtilization] = useState(40); // %

  // Calculation Logic
  const gpuRackPower = 10; // kW
  const iftRackPower = 3;  // kW
  const annualHours = 8760;
  
  const gpuOpex = racks * gpuRackPower * annualHours * powerCost;
  const iftOpex = racks * (iftRackPower * (utilization/100) + 0.5) * annualHours * powerCost; 
  
  const savings = gpuOpex - iftOpex;

  const chartData = [
    { name: 'Year 1', GPU: gpuOpex, IFT: iftOpex },
    { name: 'Year 2', GPU: gpuOpex * 2, IFT: iftOpex * 2 },
    { name: 'Year 3', GPU: gpuOpex * 3, IFT: iftOpex * 3 },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto bg-slate-900 rounded-3xl my-12 border border-slate-800">
      <div className="mb-12">
        <Badge>Financial Impact</Badge>
        <h2 className="text-3xl font-bold text-white mb-4">TCO Calculator</h2>
        <p className="text-slate-400">
          Inference is an OpEx problem. Calculate how much capital is released by switching to an Energy-First architecture.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* INPUTS */}
        <div className="space-y-8 bg-slate-950 p-8 rounded-xl border border-slate-800">
          <div>
            <label className="text-white font-semibold flex justify-between mb-2">
              <span>Number of Server Racks</span>
              <span className="text-emerald-400">{racks}</span>
            </label>
            <input 
              type="range" min="1" max="100" value={racks} 
              onChange={(e) => setRacks(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <label className="text-white font-semibold flex justify-between mb-2">
              <span>Energy Cost ($/kWh)</span>
              <span className="text-emerald-400">${powerCost.toFixed(2)}</span>
            </label>
            <input 
              type="range" min="0.05" max="0.50" step="0.01" value={powerCost} 
              onChange={(e) => setPowerCost(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <label className="text-white font-semibold flex justify-between mb-2">
              <span>Cluster Utilization (%)</span>
              <span className="text-emerald-400">{utilization}%</span>
            </label>
            <input 
              type="range" min="10" max="100" value={utilization} 
              onChange={(e) => setUtilization(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="pt-6 border-t border-slate-800">
             <div className="flex items-center gap-3 text-emerald-400 mb-2">
                <DollarSign />
                <span className="font-bold text-lg">3-Year OpEx Savings</span>
             </div>
             <div className="text-4xl font-bold text-white">
               ${(savings * 3).toLocaleString(undefined, { maximumFractionDigits: 0 })}
             </div>
          </div>
        </div>

        {/* CHART */}
        <div className="h-[400px]">
          <h3 className="text-white font-semibold mb-6 text-center">Cumulative Energy Cost (OpEx)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" />
              
              {/* FIX 1: Use 'any' to bypass strict type check on YAxis */}
              <YAxis 
                stroke="#94a3b8" 
                tickFormatter={(value: any) => `$${value/1000}k`} 
              />
              
              <Tooltip 
                cursor={{fill: '#1e293b'}} 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                
                // FIX 2: Use 'any' here as well. This solves the "Type 'undefined' is not assignable to type 'number'" error.
                formatter={(value: any) => [`$${value?.toLocaleString()}`, 'Cost']}
              />
              <Legend />
              <Bar dataKey="GPU" fill="#ef4444" name="Legacy GPU Cluster" radius={[4, 4, 0, 0]} />
              <Bar dataKey="IFT" fill="#10b981" name="IFT Fabric" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};