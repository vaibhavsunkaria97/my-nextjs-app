"use client";
import { Layers, Thermometer, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/Badge';

export const Technology = () => (
  <section className="py-20 px-6 max-w-7xl mx-auto bg-slate-950">
    <div className="grid md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <Badge>The Architecture</Badge>
        <h2 className="text-3xl font-bold text-white">Why It Works</h2>
        
        <div className="flex gap-4">
          <div className="bg-slate-900 p-3 rounded-lg h-fit border border-slate-800">
            <Layers className="text-emerald-400" />
          </div>
          <div>
            <h4 className="text-white font-bold text-lg">Near-Memory Compute</h4>
            <p className="text-slate-400 text-sm mt-1">Tiles combine compute + SRAM. Eliminates HBM traversal tax.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="bg-slate-900 p-3 rounded-lg h-fit border border-slate-800">
            <Thermometer className="text-emerald-400" />
          </div>
          <div>
            <h4 className="text-white font-bold text-lg">Microsecond Power Gating</h4>
            <p className="text-slate-400 text-sm mt-1">Tiles sleep instantly. No work = Zero dynamic power.</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-8 border border-slate-800">
        <h3 className="text-white mb-6 font-semibold">Joules per Inference (Lower is Better)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart layout="vertical" data={[
            { name: 'CPU', value: 100 },
            { name: 'GPU', value: 65 },
            { name: 'TPU', value: 45 },
            { name: 'IFT (Us)', value: 15 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
            <XAxis type="number" stroke="#64748b" />
            <YAxis dataKey="name" type="category" width={60} stroke="#cbd5e1" />
            <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{ backgroundColor: '#0f172a' }} />
            <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </section>
);