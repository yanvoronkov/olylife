import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, ArrowRight, User, Phone, Briefcase } from "lucide-react";
import { PROFESSION_OPTIONS } from "../data";
import { LeadFormData } from "../types";

interface HeroSectionProps {
  onSubmitLead: (data: LeadFormData) => Promise<void>;
  isSubmitting: boolean;
  onOpenCalculator: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSubmitLead,
  isSubmitting,
  formRef,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState(PROFESSION_OPTIONS[0]);

  // Interactive VSL State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [isProfessionOpen, setIsProfessionOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfessionOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    onSubmitLead({ name, phone, profession, source: "Hero Section Form" });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 bg-gradient-to-b from-[#04190e] via-[#072d1a] to-[#041a0e] text-white">
      {/* Background glowing blurred circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-3/4 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Headline & Subheadline */}
        <div className="text-center max-w-4xl mx-auto mb-10 lg:mb-14">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] mb-6">
            Как специалистам сферы здоровья и красоты<br className="hidden min-[800px]:inline" /> Ташкента 🇺🇿{" "}
            <span className="bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-300 bg-clip-text text-transparent inline-block font-black">
              удвоить (X2) доход
            </span>{" "}
            <br className="hidden min-[800px]:inline" />в кабинете
          </h1>

          <p className="text-lg sm:text-2xl font-normal text-emerald-100/90 max-w-3xl mx-auto leading-relaxed">
            Без необходимости больше работать,<br className="hidden min-[800px]:inline" /> найма персонала и вложений в рекламу
          </p>
        </div>

        {/* Grid Layout: Left VSL Video (MacBook) + Right Lead Capture Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: MacBook VSL Container (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* VSL Header */}
            <div className="w-full mb-3 px-2 text-center sm:text-left">
              <span className="text-sm font-bold text-lime-300 inline-flex items-center gap-2">
                🎬 Посмотрите 5-минутное видео о бизнес-модели
              </span>
            </div>

            {/* MacBook Pro Enclosure Design */}
            <div className="w-full relative group">
              {/* Laptop Screen Frame */}
              <div className="bg-[#0f172a] rounded-t-2xl p-2.5 sm:p-4 border-t-2 border-x-2 border-slate-700/80 shadow-2xl shadow-black/80 relative overflow-hidden">
                {/* Camera dot */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 rounded-full bg-emerald-500" />
                </div>

                {/* Video Display Area */}
                <div className="relative aspect-video rounded-xl bg-black overflow-hidden border border-emerald-900/80">
                  {isPlaying ? (
                    <iframe
                      src="https://kinescope.io/embed/iuSwZBJp47vyCroCsjM3QZ?autoplay=1"
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
                      frameBorder="0"
                      allowFullScreen
                    />
                  ) : (
                    <div 
                      onClick={() => setIsPlaying(true)}
                      className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 cursor-pointer group"
                    >
                      {/* Video Background Visual Graphic */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#02130a] via-[#072a17] to-[#041a0e] opacity-90" />
                      
                      {/* Decorative device visual overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
                        <div className="w-64 h-64 rounded-full border-4 border-lime-400/30 animate-ping" />
                        <div className="w-48 h-48 rounded-full border-2 border-emerald-400/40" />
                      </div>

                      {/* Video Top Controls Overlay */}
                      <div className="relative z-10 flex items-center justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMuted(!isMuted);
                          }}
                          className="p-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-700/50 transition-all"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-lime-400" />}
                        </button>
                      </div>

                      {/* Center Play Button Overlay */}
                      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                        <button
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400 hover:scale-105 active:scale-95 text-[#041a0e] flex items-center justify-center shadow-2xl shadow-lime-500/40 transition-all cursor-pointer group-hover:shadow-lime-400/60"
                        >
                          <Play className="w-8 h-8 fill-current ml-1" />
                        </button>
                        <p className="mt-3 text-xs sm:text-sm font-semibold text-lime-200 bg-black/60 backdrop-blur px-3 py-1 rounded-md border border-lime-500/30">
                          Нажмите, чтобы включить презентацию
                        </p>
                      </div>

                      <div className="h-4" />
                    </div>
                  )}
                </div>
              </div>

              {/* Laptop Bottom Keyboard Base */}
              <div className="bg-slate-800 rounded-b-xl h-4 sm:h-5 w-full border-t border-slate-700 shadow-xl relative flex justify-center">
                <div className="w-20 h-1.5 bg-slate-900 rounded-b-md" />
              </div>
            </div>

            {/* Trust Elements Under Video */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <div className="flex items-center justify-center text-center p-3 rounded-xl bg-[#062414] border border-emerald-800/80 text-xs font-semibold text-emerald-200 shadow-sm min-h-[52px]">
                <span>🔒 Товар сертифицирован, официальная гарантия</span>
              </div>
              <div className="flex items-center justify-center text-center p-3 rounded-xl bg-[#062414] border border-emerald-800/80 text-xs font-semibold text-emerald-200 shadow-sm min-h-[52px]">
                <span>⚡ Не требует медицинского образования</span>
              </div>
              <div className="flex items-center justify-center text-center p-3 rounded-xl bg-[#062414] border border-emerald-800/80 text-xs font-semibold text-emerald-200 shadow-sm min-h-[52px]">
                <span>💧 0% затрат на расходники</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Main Lead Capture Form Block (5 Cols) */}
          <div ref={formRef} className="lg:col-span-5 w-full">
            <div className="bg-gradient-to-b from-[#092e1a] to-[#051c10] rounded-3xl p-6 sm:p-8 border-2 border-lime-500/30 shadow-2xl shadow-lime-900/30 relative">
              
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
                🎁 Запишитесь на бесплатный тест-драйв в Ташкенте и получите калькулятор окупаемости
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-lime-400" />
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full px-4 py-3 rounded-xl bg-[#03150b] border border-emerald-700/80 text-white placeholder-emerald-600 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 text-sm transition-all"
                  />
                </div>

                {/* Phone / Telegram Input */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-lime-400" />
                    Телефон / Telegram / WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 (90) 123-45-67 или @username"
                    className="w-full px-4 py-3 rounded-xl bg-[#03150b] border border-emerald-700/80 text-white placeholder-emerald-600 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 text-sm transition-all"
                  />
                </div>

                {/* Profession Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <label className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-lime-400" />
                    Ваша профессия *
                  </label>
                  
                  {/* Custom Dropdown Trigger */}
                  <button
                    type="button"
                    onClick={() => setIsProfessionOpen(!isProfessionOpen)}
                    className="w-full px-4 py-3 rounded-xl bg-[#03150b] border border-emerald-700/80 text-white focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 text-sm transition-all flex items-center justify-between text-left cursor-pointer"
                  >
                    <span>{profession}</span>
                    <span className={`transform transition-transform duration-200 ${isProfessionOpen ? 'rotate-180' : 'rotate-0'} text-xs text-lime-400`}>
                      ▼
                    </span>
                  </button>

                  {/* Dropdown Options List */}
                  {isProfessionOpen && (
                    <div className="absolute z-50 left-0 right-0 mt-1.5 rounded-xl bg-[#041a0e] border border-emerald-700/80 shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                      {PROFESSION_OPTIONS.map((prof) => (
                        <button
                          key={prof}
                          type="button"
                          onClick={() => {
                            setProfession(prof);
                            setIsProfessionOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-emerald-900/60 transition-colors text-white ${profession === prof ? 'bg-lime-400/10 text-lime-300 font-semibold' : ''}`}
                        >
                          {prof}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg text-[#041a0e] bg-gradient-to-r from-lime-400 via-lime-300 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 transition-all shadow-xl shadow-lime-500/30 hover:shadow-lime-400/50 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wide border border-lime-300 mt-6"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                      Запись...
                    </span>
                  ) : (
                    <>
                      <span>ЗАПИСАТЬСЯ НА ТЕСТ-ДРАЙВ</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
