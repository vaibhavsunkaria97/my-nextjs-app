import React from 'react';

export const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-900/30 rounded-full border border-emerald-500/30">
    {children}
  </span>
);