import React from "react";
import { PROFESSIONS_DATA, PAIN_POINTS } from "../data";
import { AlertTriangle, Flower2 } from "lucide-react";

import manicureIcon from "../../assets/icon_manicure.png";
import cosmetologistIcon from "../../assets/icon_cosmetologist.png";
import massageIcon from "../../assets/icon_massage.png";
import nutritionistIcon from "../../assets/icon_nutritionist.png";
import bodyTherapistIcon from "../../assets/icon_body_therapist.png";
import fitnessIcon from "../../assets/icon_fitness.png";

interface TargetAudienceSectionProps {
  onOpenCalculator: () => void;
  onScrollToForm: () => void;
}

export const TargetAudienceSection: React.FC<TargetAudienceSectionProps> = () => {
  const getIcon = (iconName: string) => {
    // Custom filter to convert black PNG to #a3e635 (lime-green)
    const limeFilter = "invert(83%) sepia(42%) saturate(981%) hue-rotate(34deg) brightness(103%) contrast(98%)";

    switch (iconName) {
      case "Massage": 
        return <img src={massageIcon} alt="Massage" className="w-8 h-8 object-contain" style={{ filter: limeFilter }} />;
      case "Activity": 
        return <img src={bodyTherapistIcon} alt="Body Therapist" className="w-8 h-8 object-contain" style={{ filter: limeFilter }} />;
      case "Sparkles": 
        return <img src={cosmetologistIcon} alt="Cosmetology" className="w-8 h-8 object-contain" style={{ filter: limeFilter }} />;
      case "Dumbbell": 
        return <img src={fitnessIcon} alt="Fitness" className="w-8 h-8 object-contain" style={{ filter: limeFilter }} />;
      case "Apple": 
        return <img src={nutritionistIcon} alt="Nutritionist" className="w-8 h-8 object-contain" style={{ filter: limeFilter }} />;
      case "Footprints": 
        return <img src={manicureIcon} alt="Manicure" className="w-8 h-8 object-contain" style={{ filter: limeFilter }} />;
      default: 
        return <Flower2 className="w-7 h-7 text-lime-400" />;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-[#03130a] text-white relative border-t border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-700/60 inline-block mb-3">
            Идеальное сочетание для вашей практики
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Для кого подходит наилучшим образом?
          </h2>
          <p className="mt-4 text-emerald-200/80 text-base sm:text-lg">
            Оборудование OlyLife встраивается в любой кабинет здоровья и красоты в Ташкенте без перепланировки и найма сотрудников.
          </p>
        </div>

        {/* 3 columns, 2 rows Grid of Professions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PROFESSIONS_DATA.map((prof) => (
            <div
              key={prof.id}
              className="bg-gradient-to-b from-[#062414] to-[#04190e] rounded-2xl p-6 border border-emerald-800/80 hover:border-lime-500/50 transition-all hover:-translate-y-1 shadow-lg shadow-black/40 group relative overflow-hidden flex flex-col justify-between min-h-[220px]"
            >
              {/* Subtle accent border top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div>
                <div className="flex flex-row items-center md:flex-col md:items-start gap-4 md:gap-0 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#03150b] border border-emerald-700/60 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform shrink-0">
                    {getIcon(prof.iconName)}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-lime-300 transition-colors md:hidden">
                    {prof.title}
                  </h3>
                </div>

                <h3 className="hidden md:block text-xl font-bold text-white mb-2 group-hover:text-lime-300 transition-colors">
                  {prof.title}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
                  {prof.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pain Points Block ("Каждый рано или поздно сталкивается с этим:") */}
        <div className="bg-gradient-to-br from-[#0c1f14] via-[#082618] to-[#04160d] rounded-3xl p-5 sm:p-8 lg:p-12 border-2 border-red-500/20 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-red-300 bg-red-950/80 border border-red-800/60 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Проблемы линейного бьюти-бизнеса
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Каждый рано или поздно сталкивается с этим:
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PAIN_POINTS.map((pain) => (
              <div
                key={pain.id}
                className="bg-[#031209]/90 rounded-2xl p-4 sm:p-5 border border-red-900/30 flex flex-col md:flex-row md:items-start gap-3 sm:gap-4 hover:border-red-500/40 transition-all"
              >
                {/* Header row on mobile (Icon + Title) */}
                <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-800/60 flex items-center justify-center shrink-0 text-red-400 text-lg font-bold">
                    ❌
                  </div>
                  <h4 className="text-base font-bold text-red-200 md:hidden">
                    {pain.text}
                  </h4>
                </div>

                {/* Content section */}
                <div className="flex-1">
                  <h4 className="hidden md:block text-base font-bold text-red-200 mb-1">
                    {pain.text}
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
                    {pain.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
