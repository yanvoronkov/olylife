import React from "react";
import logoImg from "../../assets/Olylife-logo.png";
import { MapPin, Zap } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#04190e]/95 backdrop-blur-md border-b border-emerald-900/60 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Left: Brand Logo (Image) */}
        <div 
          className="flex items-center gap-2 group cursor-pointer shrink-0" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src={logoImg} 
            alt="OlyLife" 
            className="h-8 sm:h-10 w-auto object-contain hover:opacity-90 transition-opacity" 
          />
        </div>

        {/* Center: Location Badge */}
        <div className="hidden sm:flex items-center justify-center">
          <span className="inline-flex items-center gap-1 px-2 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold bg-emerald-950/90 text-emerald-200 border border-emerald-700/60 shadow-sm whitespace-nowrap">
            <MapPin className="w-3 sm:w-4 h-3 sm:h-4 text-lime-400 shrink-0 animate-pulse" />
            <span>Центр Ташкента</span>
          </span>
        </div>

        {/* Right: Uzbekistan First Badge */}
        <div className="flex items-center justify-end">
          <span className="inline-flex items-center gap-1 px-2 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-bold bg-gradient-to-r from-lime-950 via-emerald-950 to-green-950 text-lime-300 border border-lime-500/50 shadow-md shadow-lime-900/30 whitespace-nowrap">
            <Zap className="w-3 sm:w-4 h-3 sm:h-4 text-lime-400 shrink-0" />
            <span>Впервые в Узбекистане</span>
          </span>
        </div>
      </div>
    </header>
  );
};

