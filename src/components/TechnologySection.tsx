import React from "react";
import { KEY_ADVANTAGES, CLIENT_BENEFITS } from "../data";
import { RefreshCw, Moon, Activity, Salad, Smile, BatteryCharging, Zap } from "lucide-react";
import devicesCollageImg from "../../assets/devices_collage.png";

export const TechnologySection: React.FC = () => {

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "RefreshCw": return <RefreshCw className="w-6 h-6 text-lime-400" />;
      case "Moon": return <Moon className="w-6 h-6 text-lime-400" />;
      case "Activity": return <Activity className="w-6 h-6 text-lime-400" />;
      case "Salad": return <Salad className="w-6 h-6 text-lime-400" />;
      case "Smile": return <Smile className="w-6 h-6 text-lime-400" />;
      case "BatteryCharging": return <BatteryCharging className="w-6 h-6 text-lime-400" />;
      default: return <Zap className="w-6 h-6 text-lime-400" />;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#041a0e] via-[#072a18] to-[#03130a] text-white relative border-t border-emerald-900/60 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-lime-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Main Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Суть технологии & Выгоды
          </h2>
        </div>

        {/* Layout: Text Column on Left (3/5 width), Collage Image on Right (2/5 width) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-16">
          
          {/* LEFT Text Column (3/5 width) */}
          <div className="w-full lg:w-[60%] space-y-6">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-[1.2]">
              Разместите у себя портативную «станцию биохакинга» и добавьте высокомаржинальную услугу к вашей основной процедуре
            </h3>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
              Монетизируйте текущую базу, реанимируйте уснувшую аудиторию и получайте партнерский % с реализации оборудования.
            </p>
          </div>

          {/* RIGHT Device Showcase (2/5 width) */}
          <div className="w-full lg:w-[40%] shrink-0">
            <div className="bg-gradient-to-b from-[#082e1b] to-[#04190e] rounded-3xl p-2 border-2 border-lime-500/30 shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <img 
                src={devicesCollageImg} 
                alt="Оборудование OlyLife" 
                className="w-full h-auto rounded-2xl object-cover hover:scale-[1.02] transition-transform duration-500" 
              />
            </div>
          </div>

        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {KEY_ADVANTAGES.map((adv) => (
            <div
              key={adv.id}
              className="bg-[#062414] rounded-2xl p-6 border border-emerald-800/80 hover:border-lime-500/50 transition-all shadow-lg flex items-center justify-center text-center min-h-[80px]"
            >
              <h3 className="text-lg font-bold text-white">
                {adv.title}
              </h3>
            </div>
          ))}
        </div>

        {/* "Что это дает клиентам?" Block */}
        <div className="bg-gradient-to-b from-[#072d1a] to-[#04190e] rounded-3xl p-8 lg:p-12 border border-emerald-700/60 shadow-2xl">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
              Что это дает клиентам?
            </h3>
            <p className="text-sm sm:text-base text-lime-300 font-medium max-w-2xl mx-auto leading-relaxed">
              В основе — запатентованное сочетание импульсного электромагнитного воздействия (PEMF) и терагерцовых волн (THz), которое решает главную проблему горожан — <span className="underline decoration-lime-400 font-bold">Нет сил</span>.
            </p>
          </div>

          {/* 3x2 Grid of Client Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENT_BENEFITS.map((benefit) => (
              <div
                key={benefit.id}
                className="bg-[#03150b] rounded-2xl p-5 border border-emerald-800/80 hover:border-lime-500/50 transition-all flex flex-col md:flex-row md:items-start gap-3 md:gap-4 shadow-md"
              >
                {/* Header row on mobile (Icon + Title) */}
                <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-[#082a17] border border-emerald-700/60 flex items-center justify-center shrink-0">
                    {getBenefitIcon(benefit.iconName)}
                  </div>
                  <h4 className="text-base font-bold text-white md:hidden">
                    {benefit.title}
                  </h4>
                </div>

                {/* Content section */}
                <div className="flex-1">
                  <h4 className="hidden md:block text-base font-bold text-white mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-emerald-200/80 leading-relaxed">
                    {benefit.description}
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
