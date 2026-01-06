import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 px-4 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[10px] font-black tracking-[0.2em] text-indigo-400 border border-indigo-500/30 bg-indigo-500/5 rounded-full uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          Senior Java Backend & SDET
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1]">
          Building <span className="gradient-text">Reliability</span> <br/>
          at the Speed of AI.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed mx-auto lg:mx-0">
          Architecting resilient Java 21 ecosystems and intelligent test automation harnesses for high-growth engineering teams.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
          <a href="#ai-tools" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20 text-center">
            Launch SDET Studio
          </a>
          <a href="#projects" className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl font-bold transition-all text-center border border-slate-700">
            Technical Architecture
          </a>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex flex-col">
            <span className="text-white font-bold text-2xl">93%</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">CI Cycle Reduction</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-2xl">5k+</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Managed UI Tests</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-2xl">100ms</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">P99 API Latency</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-2xl">Zero</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Breaking API Changes</span>
          </div>
        </div>
      </div>
    </section>
  );
};