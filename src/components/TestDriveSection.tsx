import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, User, Phone, Briefcase, CheckCircle2 } from "lucide-react";
import { PROFESSION_OPTIONS } from "../data";
import { LeadFormData } from "../types";
import beautyCoworkingNewImg from "../../assets/beauty_coworking_olylife_new.jpg";

interface TestDriveSectionProps {
  onSubmitLead: (data: LeadFormData) => Promise<void>;
  isSubmitting: boolean;
  onOpenPrivacy: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

export const TestDriveSection: React.FC<TestDriveSectionProps> = ({
  onSubmitLead,
  isSubmitting,
  onOpenPrivacy,
  formRef,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState(PROFESSION_OPTIONS[0]);

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
    onSubmitLead({ name, phone, profession, source: "Footer Form" });
  };

  return (
    <section className="py-16 lg:py-24 bg-[#031108] text-white relative border-t border-emerald-900/60 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-lime-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Проверьте на себе и оцените результат!
          </h2>
          <p className="text-emerald-200/90 text-base sm:text-lg leading-relaxed">
            Приезжайте в наше демо-пространство, пройдите сеанс, задайте уточняющие вопросы, и мы обсудим персональный план запуска под ваш график.
          </p>
        </div>

        {/* Layout: Image on Left (6 cols), Booking Form Block on Right (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Composite Coworking Image (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-800/80 shadow-2xl group">
              <img
                src={beautyCoworkingNewImg}
                alt="Бьюти-коворкинг с обновленным оборудованием OlyLife"
                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041a0e]/40 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* RIGHT: Final Booking Form Block (Финальный блок записи, 6 cols) */}
          <div ref={formRef} className="lg:col-span-6 bg-gradient-to-b from-[#08301d] via-[#052214] to-[#03150c] rounded-3xl p-6 sm:p-10 border-2 border-lime-500/40 shadow-2xl relative">
            
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                🎁 Запишитесь на бесплатный тест-драйв в Ташкенте и получите калькулятор окупаемости
              </h3>

              {/* Urgency Counter Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 font-bold text-xs sm:text-sm shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span>Осталось 5 свободных окошек на этой неделе</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Name Input (4 cols / one-third) */}
                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-lime-400" />
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя"
                    className="w-full px-4 py-3 rounded-xl bg-[#03150b] border border-emerald-700/80 text-white placeholder-emerald-600 focus:outline-none focus:border-lime-400 text-sm transition-all"
                  />
                </div>

                {/* Phone Input (8 cols / two-thirds) */}
                <div className="md:col-span-8">
                  <label className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-lime-400" />
                    Телефон / Telegram / WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 (90) 123-45-67"
                    className="w-full px-4 py-3 rounded-xl bg-[#03150b] border border-emerald-700/80 text-white placeholder-emerald-600 focus:outline-none focus:border-lime-400 text-sm transition-all"
                  />
                </div>
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
                  className="w-full px-4 py-3 rounded-xl bg-[#03150b] border border-emerald-700/80 text-white focus:outline-none focus:border-lime-400 text-sm transition-all flex items-center justify-between text-left cursor-pointer"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl font-black text-lg text-[#041a0e] bg-gradient-to-r from-lime-400 via-lime-300 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 transition-all shadow-xl shadow-lime-500/30 hover:shadow-lime-400/50 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wide border border-lime-300 mt-6"
              >
                {isSubmitting ? (
                  <span>Запись...</span>
                ) : (
                  <>
                    <span>ЗАПИСАТЬСЯ НА ТЕСТ-ДРАЙВ</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

            </form>

            <p className="text-center text-xs text-emerald-400/70 mt-4 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" />
              Ваши данные конфиденциальны. Наш менеджер свяжется с вами в течение 10 минут.
            </p>

          </div>

        </div>

        {/* FOOTER */}
        <footer className="mt-20 pt-8 border-t border-emerald-900/80 text-center text-xs text-emerald-400/70 space-y-4">
          <p className="font-bold text-white text-sm">
            OlyLife © 2026. Все права защищены.
          </p>

          <p className="max-w-2xl mx-auto leading-relaxed text-[11px] text-emerald-300/60">
            Бытовая продукция категории Wellness. Не является лекарственным средством и медицинским оборудованием.
          </p>

          <div className="flex items-center justify-center gap-4 text-xs pt-2">
            <button onClick={onOpenPrivacy} className="hover:text-lime-300 transition-colors underline">
              Политика конфиденциальности
            </button>
            <span>|</span>
            <button onClick={onOpenPrivacy} className="hover:text-lime-300 transition-colors underline">
              Условия использования
            </button>
          </div>
        </footer>

      </div>
    </section>
  );
};
