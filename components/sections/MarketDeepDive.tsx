"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis, Cell } from 'recharts';
import { Badge } from '@/components/ui/Badge';

const tamData = [
  { year: '2023', training: 40, inference: 15 },
  { year: '2024', training: 65, inference: 35 },
  { year: '2025', training: 85, inference: 70 },
  { year: '2026', training: 100, inference: 130 },
  { year: '2027', training: 120, inference: 210 },
];

const competitorData = [
  { name: 'NVIDIA H100', x: 90, y: 30, z: 200 },
  { name: 'Google TPU v5', x: 70, y: 60, z: 100 },
  { name: 'Groq', x: 80, y: 50, z: 80 },
  { name: 'Legacy CPU', x: 20, y: 40, z: 50 },
  { name: 'IFT (Us)', x: 65, y: 95, z: 150 },
];

export const MarketDeepDive = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        
        {/* TAM CHART */}
        <div>
          <Badge>The Flip</Badge>
          <h2 className="text-3xl font-bold text-white mb-6">The Inference Explosion</h2>
          <p className="text-slate-400 mb-6">
            Historically, training dominated silicon spend. As models move to production, inference costs are growing 
            exponentially. By 2026, the inference market will eclipse training.
          </p>
          <div className="h-64 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tamData}>
                <defs>
                  <linearGradient id="colorInf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTrain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155'}} />
                <Area type="monotone" dataKey="training" stroke="#64748b" fillOpacity={1} fill="url(#colorTrain)" name="Training Market ($B)" />
                <Area type="monotone" dataKey="inference" stroke="#10b981" fillOpacity={1} fill="url(#colorInf)" name="Inference Market ($B)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* COMPETITIVE LANDSCAPE */}
        <div>
          <Badge>Competitive Landscape</Badge>
          <h2 className="text-3xl font-bold text-white mb-6">Positioning</h2>
          <p className="text-slate-400 mb-6">
            We do not compete on peak TOPS. We compete on <strong>Joules per Token</strong>.
            This opens a Blue Ocean strategy in the power-constrained hyperscale sector.
          </p>
          <div className="h-64 bg-slate-900 p-4 rounded-xl border border-slate-800 relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-slate-500 font-bold">HIGH EFFICIENCY</div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-slate-500 font-bold">LOW EFFICIENCY</div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-bold rotate-90">HIGH PERF</div>
            
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" dataKey="x" name="Performance" hide domain={[0, 100]} />
                <YAxis type="number" dataKey="y" name="Efficiency" hide domain={[0, 100]} />
                <ZAxis type="number" dataKey="z" range={[100, 400]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{backgroundColor: '#0f172a'}} />
                <Scatter name="Competitors" data={competitorData} fill="#8884d8">
                  {competitorData.map((entry, index) => (
                    // FIX: Changed <cell> to <Cell>
                    <Cell key={`cell-${index}`} fill={entry.name === 'IFT (Us)' ? '#10b981' : '#64748b'} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-slate-500 mt-2">X: Performance | Y: Energy Efficiency | Size: Market Presence</p>
        </div>

      </div>
    </section>
  );
};