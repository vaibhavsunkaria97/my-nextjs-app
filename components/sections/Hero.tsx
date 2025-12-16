// components/sections/Hero.tsx
"use client";
import { motion } from 'framer-motion';
import { Zap, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ChipModel } from '@/components/ui/ChipModel';

export const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    <div className="absolute inset-0 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-center"
      >
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2">
          <Zap className="w-4 h-4 mr-2" />
          The Energy-First Inference Fabric
        </Badge>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight"
      >
        Solve the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Power Wall</span>, <br />
        Not Just the Compute Wall.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
      >
        We don't just maximize operations per second. We minimize <strong>Joules per Inference</strong>. 
        Scale your AI capacity within your existing grid limits.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-12 w-full max-w-lg mx-auto relative z-20"
      >
        <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full -z-10" />
        <ChipModel />
        <p className="text-center text-xs text-slate-500 mt-4 uppercase tracking-widest">
          Interactive Model • Drag to Rotate
        </p>
      </motion.div>
    </div>
  </section>
);