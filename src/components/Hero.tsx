import React from 'react';
import { ShieldCheck, Zap, Activity, Globe, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onScrollToCards: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCards }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#040D04] via-zinc-950 to-black py-16 md:py-24 px-4 border-b border-[#adff2f]/5" id="site-hero">
      
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(173,255,47,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(173,255,47,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Ambient lime glow backdrop */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#adff2f]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column - Content */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="inline-flex items-center space-x-2 bg-[#122c12]/60 border border-[#adff2f]/20 px-3 py-1 rounded-full text-[10px] md:text-xs font-mono font-medium text-[#adff2f] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Global Card Service</span>
          </div>

          <h1 className="font-sans font-extrabold tracking-tight text-white leading-none text-4xl sm:text-5xl md:text-6xl uppercase">
            SECURE GLOBAL
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-lime-200 to-[#adff2f]">
              PREPAID CARDS
            </span>
            PORTAL
          </h1>

          <p className="text-zinc-400 font-sans text-sm md:text-base leading-relaxed max-w-2xl">
            Instant access to secure, premium virtual prepaid credit cards globally. Fully calibrated, ready for fast setups, subscription authorizations, and unrestricted digital trials.
          </p>

          <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl max-w-xl flex items-start gap-3.5 font-sans shadow-md">
            <div className="p-2 bg-[#122812] border border-[#adff2f]/20 rounded-lg text-[#adff2f] h-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white text-xs font-bold uppercase tracking-wider font-mono">Mod 10 Luhn Conformity Check</h3>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                Our cards are meticulously generated using the <span className="text-[#adff2f] font-mono">Luhn (MOD 10) algorithm</span>. This ensures immediate recognition, valid authorization formatting, and flawless integration across international checkout gateways.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onScrollToCards}
              id="hero-buy-now-btn"
              className="px-6 py-3 bg-[#adff2f] hover:bg-[#bbf04d] text-block font-sans font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(173,255,47,0.25)] text-black flex items-center space-x-2 cursor-pointer"
            >
              <span>Instant Card Shop</span>
              <Zap className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={onScrollToCards}
              id="hero-features-btn"
              className="px-6 py-3 border border-zinc-800 hover:bg-zinc-900 text-zinc-300 hover:text-white font-sans text-xs uppercase tracking-widest rounded-xl transition-all duration-300 cursor-pointer"
            >
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-900 max-w-xl">
            <div>
              <p className="text-white font-sans font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight text-lime-400 font-mono">0s</p>
              <p className="text-[10px] text-zinc-500 uppercase font-sans tracking-wider mt-0.5">Activation</p>
            </div>
            <div>
              <p className="text-white font-sans font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight font-mono">100%</p>
              <p className="text-[10px] text-zinc-500 uppercase font-sans tracking-wider mt-0.5">Luhn Secure</p>
            </div>
            <div>
              <p className="text-white font-sans font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight font-mono">9+</p>
              <p className="text-[10px] text-zinc-500 uppercase font-sans tracking-wider mt-0.5">Top Providers</p>
            </div>
          </div>

        </div>

        {/* Right column - Interactive Graphic of a virtual custom card */}
        <div className="lg:col-span-5 relative flex items-center justify-center p-2">
          
          {/* Decorative geometric frames */}
          <div className="absolute -inset-2 border border-dashed border-[#adff2f]/10 rounded-3xl pointer-events-none" />
          
          <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-[#1b3a1b] to-black p-6 border border-[#adff2f]/20 shadow-[0_0_40px_rgba(173,255,47,0.06)] relative overflow-hidden group">
            
            {/* Glossy gradient strip */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-lime-400/10 via-transparent to-transparent rotate-45 pointer-events-none" />

            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-[10px] font-mono tracking-widest text-[#adff2f] uppercase font-bold text-left">NEOBYTE SHARP SECURE</p>
                <h4 className="text-xs text-white uppercase font-sans font-medium tracking-tight text-left mt-0.5">PREPAID CORE PRO</h4>
              </div>
              <Activity className="w-5 h-5 text-lime-400" />
            </div>

            {/* Chip rendering */}
            <div className="relative w-11 h-9 rounded-md bg-gradient-to-r from-yellow-500 to-yellow-600 border border-yellow-400 p-1 shadow-inner mb-6">
              <div className="absolute inset-x-2 top-0 bottom-0 border-x border-yellow-800" />
              <div className="absolute inset-y-2 left-0 right-0 border-y border-yellow-800" />
            </div>

            {/* Card number representation with partial mask */}
            <p className="text-lg text-white font-mono tracking-widest text-left mb-6 font-bold select-none">
              5574 **** **** 7378
            </p>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase text-left">Card Manager ID</p>
                <p className="text-xs text-white font-mono text-left font-bold tracking-wide mt-0.5 uppercase">EMELYAN MELILKUS</p>
              </div>
              
              <div className="text-right">
                <p className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase">EXP END</p>
                <p className="text-xs text-white font-mono font-bold mt-0.5">03/2029</p>
              </div>
            </div>

            {/* Simulated interactive trigger overlay */}
            <div className="absolute inset-0 bg-[#040D04]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <div className="text-center p-4">
                <span className="inline-block px-3 py-1 rounded bg-[#adff2f] text-black font-sans text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                  CUSTOMIZABLE VALUE
                </span>
                <p className="text-[11px] text-white">Adjust limits instantly in checkout</p>
              </div>
            </div>

          </div>

          {/* Floaters */}
          <div className="absolute -bottom-4 right-4 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl flex items-center space-x-2 shadow-lg scale-90 md:scale-100">
            <Globe className="w-4 h-4 text-lime-400 animate-spin" />
            <span className="text-[10px] font-mono font-bold text-white uppercase">US & REGIONAL CHANNELS</span>
          </div>

        </div>

      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-zinc-600">
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>

    </section>
  );
};
