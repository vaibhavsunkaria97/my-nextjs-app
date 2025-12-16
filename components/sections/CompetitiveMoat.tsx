"use client";
import React from 'react';
import { Target, Lock, TrendingUp, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const CompetitiveMoat = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto bg-slate-950">
      <div className="text-center mb-16">
        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-4">
          Defensibility
        </Badge>
        <h2 className="text-4xl font-bold text-white mb-6">
          Why Can't Big Tech Just <br/><span className="text-blue-400">Copy This?</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Structural incentives and architectural debt prevent incumbents from optimizing for pure efficiency.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Argument 1: Technical Debt */}
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Lock className="w-24 h-24 text-slate-500" />
          </div>
          <div className="relative z-10">
            <div className="bg-slate-800 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-red-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">The Generalist Trap</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              <strong>NVIDIA & AMD</strong> must support Gaming, Crypto, and Training. Their architectures are "Jack of all trades."
            </p>
            <div className="text-emerald-400 text-sm font-bold border-t border-slate-700 pt-4">
              Our Advantage:
              <span className="block text-slate-300 font-normal mt-1">
                We strip away 80% of the silicon area dedicated to legacy features, dedicating every transistor to Inference Efficiency.
              </span>
            </div>
          </div>
        </div>

        {/* Argument 2: Business Model */}
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp className="w-24 h-24 text-slate-500" />
          </div>
          <div className="relative z-10">
            <div className="bg-slate-800 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-amber-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Cannibalization</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              <strong>Incumbents</strong> protect high-margin H100 sales. Building a cheap, efficient chip hurts their own bottom line.
            </p>
            <div className="text-emerald-400 text-sm font-bold border-t border-slate-700 pt-4">
              Our Advantage:
              <span className="block text-slate-300 font-normal mt-1">
                We have no legacy revenue to protect. We can aggressively attack the "Efficiency Gap" that they ignore.
              </span>
            </div>
          </div>
        </div>

        {/* Argument 3: Neutrality */}
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck className="w-24 h-24 text-slate-500" />
          </div>
          <div className="relative z-10">
            <div className="bg-slate-800 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Vendor Neutrality</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              <strong>Hyperscalers (Google/AWS)</strong> build internal chips, but they are locked to their own clouds.
            </p>
            <div className="text-emerald-400 text-sm font-bold border-t border-slate-700 pt-4">
              Our Advantage:
              <span className="block text-slate-300 font-normal mt-1">
                We are the "Switzerland" of silicon. We sell to CoreWeave, Lambda, and Multi-Cloud enterprises who fear vendor lock-in.
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};