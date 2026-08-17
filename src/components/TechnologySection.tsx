import React from "react";
import { KEY_ADVANTAGES, CLIENT_BENEFITS } from "../data";
import { RefreshCw, Moon, Activity, Salad, Smile, BatteryCharging, Zap, Sparkles, Clock, UserCheck, Maximize2 } from "lucide-react";
import massageRoomImg from "../../assets/Cozy_massage_room.jpeg";

export const TechnologySection: React.FC = () => {

  const getAdvantageIcon = (iconName: string) => {
    switch (iconName) {
      case "Clock": return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E9646]" />;
      case "UserCheck": return <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E9646]" />;
      case "Sparkles": return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E9646]" />;
      case "Maximize2": return <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E9646]" />;
      default: return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E9646]" />;
    }
  };

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "RefreshCw": return <RefreshCw className="w-5 h-5 text-[#1E9646]" />;
      case "Moon": return <Moon className="w-5 h-5 text-[#1E9646]" />;
      case "Activity": return <Activity className="w-5 h-5 text-[#1E9646]" />;
      case "Salad": return <Salad className="w-5 h-5 text-[#1E9646]" />;
      case "Smile": return <Smile className="w-5 h-5 text-[#1E9646]" />;
      case "BatteryCharging": return <BatteryCharging className="w-5 h-5 text-[#1E9646]" />;
      default: return <Zap className="w-5 h-5 text-[#1E9646]" />;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-[#F0F7F2] text-slate-900 relative border-t border-[#D5E8D9] overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-0 w-[550px] h-[550px] bg-[#1E9646]/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Layout: Text Column on Left (60% width), Showcase Image on Right (40% width) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-16">
          
          {/* LEFT Text Column (60% width) */}
          <div className="w-full lg:w-[60%] space-y-6">
            <h3 className="text-2xl sm:text-3xl lg:text-[45px] font-extrabold text-slate-950 leading-[1.2]">
              Разместите у себя портативную «станцию биохакинга» и добавьте высокомаржинальную услугу к вашей основной процедуре
            </h3>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Монетизируйте текущую базу, реанимируйте уснувшую аудиторию и получайте партнерский % с реализации оборудования.
            </p>
          </div>

          {/* RIGHT Showcase Image (40% width) */}
          <div className="w-full lg:w-[40%] shrink-0">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden relative group">
              <img 
                src={massageRoomImg} 
                alt="Уютный массажный кабинет с биохакинг-станцией OlyLife" 
                title="Пример массажного кабинета с аппаратом OlyLife P90"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-xl sm:rounded-2xl object-cover hover:scale-[1.02] transition-transform duration-500" 
              />
            </div>
          </div>

        </div>

        {/* 4 Feature Cards Grid (2 rows on mobile, 4 columns on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-16 sm:mb-20">
          {KEY_ADVANTAGES.map((adv) => (
            <div
              key={adv.id}
              className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 hover:border-[#1E9646] transition-all shadow-xs hover:shadow-md flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-3 text-center sm:text-left min-h-[85px] sm:min-h-[90px]"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#EBF7F0] border border-[#C3EBD4] flex items-center justify-center shrink-0">
                {getAdvantageIcon(adv.iconName)}
              </div>

              <h3 className="text-xs sm:text-sm lg:text-base font-bold text-slate-900 leading-snug">
                {adv.title}
              </h3>
            </div>
          ))}
        </div>

        {/* "Что это дает клиентам?" Block */}
        <div className="bg-[#E5F2E8] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#CEE4D2] shadow-sm">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-[45px] font-extrabold text-slate-950 mb-3 leading-tight">
              Что это дает клиентам?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              В основе — запатентованное сочетание импульсного электромагнитного воздействия (PEMF) и терагерцовых волн (THz), которое решает главную проблему горожан — <span className="underline decoration-[#1E9646] font-bold text-slate-950">Хроническая усталость</span>.
            </p>
          </div>

          {/* 3x2 Grid of Client Benefits (Icon + Title only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {CLIENT_BENEFITS.map((benefit) => (
              <div
                key={benefit.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 hover:border-[#1E9646]/60 hover:shadow-md transition-all flex items-center gap-4 sm:gap-4.5 shadow-xs"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EBF7F0] border border-[#C3EBD4] flex items-center justify-center shrink-0">
                  {getBenefitIcon(benefit.iconName)}
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {benefit.title}
                </h4>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
