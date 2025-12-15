"use client";
import { Download, FileText } from 'lucide-react';

export const DeckDownload = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3 print:hidden">
      <button 
        onClick={handlePrint}
        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-4 rounded-full shadow-lg shadow-emerald-900/50 transition-all hover:scale-105"
      >
        <Download size={20} />
        <span>Download Pitch Deck</span>
      </button>
    </div>
  );
};