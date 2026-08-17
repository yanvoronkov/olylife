import React from "react";
import logoImg from "../../assets/Olylife-logo.png";
import { MapPin, Zap } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#F0F7F2]/90 backdrop-blur-md border-b border-[#D8EADB] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        
        {/* Left: Brand Logo */}
        <div 
          className="flex items-center gap-2 group cursor-pointer shrink-0" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src={logoImg} 
            alt="OlyLife Uzbekistan логотип" 
            title="OlyLife Uzbekistan — официальный логотип"
            width={160}
            height={40}
            loading="eager"
            decoding="async"
            className="h-8 sm:h-10 w-auto object-contain hover:opacity-90 transition-opacity" 
          />
        </div>

        {/* Center: Location Badge (hidden on mobile, visible on sm and up) */}
        <div className="hidden sm:flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#EBF7F0] text-[#0E5E2B] border border-[#C3EBD4] shadow-xs whitespace-nowrap">
            <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#1E9646] shrink-0 animate-pulse" />
            <span>Центр Ташкента</span>
          </span>
        </div>

        {/* Right: Uzbekistan First Badge */}
        <div className="flex items-center justify-end">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold bg-[#EBF7F0] text-[#0A3C28] border border-[#A5DEBC] shadow-xs whitespace-nowrap">
            <Zap className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#1E9646] shrink-0" />
            <span>Впервые в Узбекистане</span>
          </span>
        </div>

      </div>
    </header>
  );
};
