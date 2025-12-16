"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Circle, Flag } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const milestones = [
  {
    date: "Q3 2026",
    title: "Architecture Lock",
    desc: "Completed full ISA simulation. Validated 100x efficiency gains on FPGA prototype.",
    status: "current"
  },
  {
    date: "Q1 2027",
    title: "Tape-Out (TSMC 5nm)",
    desc: "GDSII files submitted for first test shuttles. Physical design verified.",
    status: "future"
  },
  {
    date: "Q3 2027",
    title: "First Silicon",
    desc: "Bring-up in lab. Running first LLM inference workloads on real silicon.",
    status: "future"
  },
  {
    date: "Q1 2027",
    title: "Pilot Deployment",
    desc: "Deployment of 50-rack cluster with launch partner (Tier 2 Cloud Provider).",
    status: "future"
  },
  {
    date: "2028",
    title: "Mass Production",
    desc: "General availability. Expansion to 3nm process node.",
    status: "future"
  }
];

export const Roadmap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id = "roadmap" ref={containerRef} className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4">
          Execution Plan
        </Badge>
        <h2 className="text-4xl font-bold text-white mb-6">Path to Production</h2>
        <p className="text-slate-400">
          We are not just a slide deck. We are executing on a 24-month path to silicon.
        </p>
      </div>

      <div className="relative">
        {/* The Vertical "Circuit Trace" Line */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-slate-800 -translate-x-1/2 rounded-full overflow-hidden">
          <motion.div 
            style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            className="w-full bg-gradient-to-b from-emerald-500 to-emerald-400 shadow-[0_0_15px_#10b981]"
          />
        </div>

        <div className="space-y-12">
          {milestones.map((item, i) => (
            <MilestoneCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const MilestoneCard = ({ item, index }: { item: any, index: number }) => {
  const isLeft = index % 2 === 0;
  const isComplete = item.status === 'complete';
  const isCurrent = item.status === 'current';

  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Spacer for centering */}
      <div className="flex-1 hidden md:block" />

      {/* The "Node" on the line */}
      <div className="relative z-10 flex-shrink-0">
        <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center bg-slate-950 ${
          isComplete ? 'border-emerald-500 text-emerald-500' :
          isCurrent ? 'border-amber-500 text-amber-500' : 'border-slate-700 text-slate-700'
        }`}>
          {isComplete ? <CheckCircle2 className="w-5 h-5" /> : 
           isCurrent ? <Circle className="w-4 h-4 fill-current animate-pulse" /> : 
           <Circle className="w-4 h-4" />}
        </div>
      </div>

      {/* The Content Card */}
      <div className="flex-1 w-full">
        <div className={`bg-slate-900/50 p-6 rounded-2xl border ${
          isCurrent ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'border-slate-800'
        }`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-bold font-mono ${
              isComplete ? 'text-emerald-400' : isCurrent ? 'text-amber-400' : 'text-slate-500'
            }`}>
              {item.date}
            </span>
            {isCurrent && <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-1 rounded">IN PROGRESS</span>}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-slate-400 text-sm">{item.desc}</p>
        </div>
      </div>

    </div>
  );
};