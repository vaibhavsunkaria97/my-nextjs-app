"use client";
import { XCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/Badge';

const data = [
  { year: '2020', power: 100, compute: 100 },
  { year: '2022', power: 180, compute: 140 },
  { year: '2024', power: 350, compute: 210 },
  { year: '2026', power: 600, compute: 290 },
];

export const Problem = () => (
  <section id="problem" className="py-20 px-6 md:px-12 max-w-7xl mx-auto bg-slate-950">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <Badge>The Problem</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Architectural Mismatch</h2>
        <p className="text-slate-400 mb-6 text-lg">
          Modern datacenters use GPUs optimized for <span className="text-white font-semibold">peak throughput</span>. 
          However, inference workloads are bursty, sparse, and memory-dominated.
        </p>
        <ul className="space-y-4 mb-8">
          <li className="flex items-start gap-3">
            <XCircle className="text-red-500 mt-1 flex-shrink-0" />
            <span className="text-slate-300"><strong>Energy Waste:</strong> GPUs burn power even when idle.</span>
          </li>
          <li className="flex items-start gap-3">
            <XCircle className="text-red-500 mt-1 flex-shrink-0" />
            <span className="text-slate-300"><strong>Data Movement:</strong> Moving data costs more energy than computing it.</span>
          </li>
        </ul>
      </div>
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
        <h3 className="text-white font-semibold mb-4">Power vs. Utility Gap</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
              <Line type="monotone" dataKey="power" stroke="#ef4444" strokeWidth={3} />
              <Line type="monotone" dataKey="compute" stroke="#94a3b8" strokeWidth={3} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </section>
);