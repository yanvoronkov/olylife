import React from "react";
import logoImg from "../../assets/Olylife-logo.png";
import { MapPin, Zap } from "lucide-react";
import { CityConfig } from "../config/cities";
import { Translations } from "../config/translations";

interface NavbarProps {
  city: CityConfig;
  translations?: Translations;
}

export const Navbar: React.FC<NavbarProps> = ({ city, translations }) => {
  const locationBadge = translations?.navbar?.locationBadge || city.navbarCenterBadge;
  const rightBadge = translations?.navbar?.firstInCountryBadge || city.navbarRightBadge;
  const logoAlt = translations?.navbar?.logoAlt || city.logoAlt;

  return (
    <header className="sticky top-0 z-40 bg-[#F0F7F2]/90 backdrop-blur-md border-b border-[#D8EADB] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">

        {/* Left: Brand Logo */}
        <div
          className="flex items-center gap-2 group cursor-pointer shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src={logoImg}
            alt={logoAlt}
            title={logoAlt}
            width={160}
            height={40}
            loading="eager"
            decoding="async"
            className="h-8 sm:h-10 w-auto object-contain hover:opacity-90 transition-opacity"
          />
        </div>

        {/* Center: Location Badge (hidden on screens up to 800px, visible on 800px+) */}
        <div className="hidden min-[800px]:flex items-center justify-center shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#EBF7F0] text-[#0E5E2B] border border-[#C3EBD4] shadow-xs whitespace-nowrap">
            <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#1E9646] shrink-0 animate-pulse" />
            <span>{locationBadge}</span>
          </span>
        </div>

        {/* Right: Country First Badge (sized strictly to content, single line on mobile) */}
        <div className="flex items-center justify-end shrink-0">
          <span className="w-fit inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-[9.5px] sm:text-xs md:text-sm font-bold bg-[#EBF7F0] text-[#0A3C28] border border-[#A5DEBC] shadow-xs whitespace-nowrap">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#1E9646] shrink-0" />
            <span>{rightBadge}</span>
          </span>
        </div>

      </div>
    </header>
  );
};

