import { Server, Cpu, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const Market = () => (
  <section id="market" className="py-20 px-6 max-w-7xl mx-auto bg-slate-900/50">
    <div className="text-center mb-12">
      <Badge>Go To Market</Badge>
      <h2 className="text-3xl font-bold text-white mb-4">Complementary, Not Competitive</h2>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        { 
          title: "Hyperscalers", 
          desc: "Chiplets integrated into custom server designs.",
          icon: <Server className="mb-4 text-emerald-400" />
        },
        { 
          title: "Enterprise", 
          desc: "PCIe Accelerator cards for private clouds.",
          icon: <Cpu className="mb-4 text-blue-400" />
        },
        { 
          title: "Edge", 
          desc: "High-performance edge gateways.",
          icon: <Zap className="mb-4 text-amber-400" />
        }
      ].map((item, idx) => (
        <div key={idx} className="bg-slate-950 p-8 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-colors">
          {item.icon}
          <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
          <p className="text-slate-400">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Market; // 👈 Add this at the bottom