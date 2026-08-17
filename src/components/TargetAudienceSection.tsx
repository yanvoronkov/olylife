import React from "react";
import { PROFESSIONS_DATA, PAIN_POINTS } from "../data";
import { AlertTriangle, Flower2, ArrowRight } from "lucide-react";

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

export const TargetAudienceSection: React.FC<TargetAudienceSectionProps> = ({
  onScrollToForm,
}) => {
  const getIcon = (iconName: string) => {
    // Custom CSS filter for OlyLife brand green (#1E9646)
    const olylifeFilter = "invert(42%) sepia(74%) saturate(468%) hue-rotate(94deg) brightness(96%) contrast(92%)";

    switch (iconName) {
      case "Massage": 
        return <img src={massageIcon} alt="Иконка: Массажисты" title="Оборудование OlyLife для массажистов" width={32} height={32} loading="lazy" decoding="async" className="w-8 h-8 object-contain" style={{ filter: olylifeFilter }} />;
      case "Activity": 
        return <img src={bodyTherapistIcon} alt="Иконка: Телесные терапевты" title="Оборудование OlyLife для телесных терапевтов" width={32} height={32} loading="lazy" decoding="async" className="w-8 h-8 object-contain" style={{ filter: olylifeFilter }} />;
      case "Sparkles": 
        return <img src={cosmetologistIcon} alt="Иконка: Косметологи" title="Оборудование OlyLife для косметологов" width={32} height={32} loading="lazy" decoding="async" className="w-8 h-8 object-contain" style={{ filter: olylifeFilter }} />;
      case "Dumbbell": 
        return <img src={fitnessIcon} alt="Иконка: Фитнес-тренеры" title="Оборудование OlyLife для фитнес-тренеров" width={32} height={32} loading="lazy" decoding="async" className="w-8 h-8 object-contain" style={{ filter: olylifeFilter }} />;
      case "Apple": 
        return <img src={nutritionistIcon} alt="Иконка: Нутрициологи" title="Оборудование OlyLife для нутрициологов" width={32} height={32} loading="lazy" decoding="async" className="w-8 h-8 object-contain" style={{ filter: olylifeFilter }} />;
      case "Footprints": 
        return <img src={manicureIcon} alt="Иконка: Мастера маникюра и педикюра" title="Оборудование OlyLife для мастеров маникюра и педикюра" width={32} height={32} loading="lazy" decoding="async" className="w-8 h-8 object-contain" style={{ filter: olylifeFilter }} />;
      default: 
        return <Flower2 className="w-8 h-8 text-[#1E9646]" />;
    }
  };

  return (
    <section className="pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 bg-[#EAF3EC] text-slate-900 relative border-t border-[#D5E8D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[45px] font-extrabold text-slate-950 tracking-tight leading-tight">
            Для кого подходит наилучшим образом?
          </h2>
        </div>

        {/* 3 columns, 2 rows Grid of Professions (Icon to the left of text) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16">
          {PROFESSIONS_DATA.map((prof) => (
            <div
              key={prof.id}
              onClick={onScrollToForm}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 hover:border-[#1E9646] hover:shadow-lg shadow-xs transition-all duration-300 flex items-center gap-4 sm:gap-5 group cursor-pointer"
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#EBF7F0] border border-[#C3EBD4] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                {getIcon(prof.iconName)}
              </div>

              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 group-hover:text-[#0E5E2B] transition-colors leading-snug">
                {prof.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Pain Points Block - High Contrast Dark Banner */}
        <div className="bg-gradient-to-br from-[#061F15] via-[#0A2B1D] to-[#04160E] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#134E35] shadow-2xl text-white relative overflow-hidden">
          
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-[24px] sm:text-3xl lg:text-[45px] font-extrabold text-white tracking-tight leading-tight">
              Каждый рано или поздно сталкивается с этим:
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PAIN_POINTS.map((pain) => (
              <div
                key={pain.id}
                className="bg-[#03150C]/90 rounded-2xl p-5 border border-[#134E35]/60 flex flex-col md:flex-row md:items-start gap-4 hover:border-rose-500/40 transition-all"
              >
                {/* Header icon on mobile */}
                <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-rose-950/70 border border-rose-800/60 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                  </div>
                  <h4 className="text-[20px] md:text-base font-bold text-rose-200 md:hidden leading-snug">
                    {pain.text}
                  </h4>
                </div>

                {/* Content section */}
                <div className="flex-1">
                  <h4 className="hidden md:block text-base font-bold text-rose-200 mb-1">
                    {pain.text}
                  </h4>
                  <p className="text-[17px] md:text-sm text-emerald-100/90 leading-relaxed font-normal">
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
