import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, User, Phone, Briefcase, CheckCircle2, Clock, Check } from "lucide-react";
import { PROFESSION_OPTIONS } from "../data";
import { LeadFormData } from "../types";
import { CityConfig } from "../config/cities";
import { Translations } from "../config/translations";
import { formatFlexiblePhone } from "../utils/phoneFormatter";

interface TestDriveSectionProps {
  city: CityConfig;
  translations?: Translations;
  onSubmitLead: (data: LeadFormData) => Promise<void>;
  isSubmitting: boolean;
  onOpenPrivacy: () => void;
  onOpenTerms?: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

export const TestDriveSection: React.FC<TestDriveSectionProps> = ({
  city,
  translations,
  onSubmitLead,
  isSubmitting,
  onOpenPrivacy,
  onOpenTerms,
  formRef,
}) => {
  const isKg = translations?.locale === "kg";
  const professionOptions = translations?.hero?.form?.professionOptions || PROFESSION_OPTIONS;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState(professionOptions[0]);

  useEffect(() => {
    if (!professionOptions.includes(profession)) {
      setProfession(professionOptions[0]);
    }
  }, [professionOptions]);

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatFlexiblePhone(e.target.value, phone, city.id);
    setPhone(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const sourceLabel = isKg ? "Акыркы форма (Footer Form KG)" : "Footer Form";
    onSubmitLead({ name, phone, profession, city: city.id, source: sourceLabel });
  };

  const bullets = translations?.testDrive?.bullets || [
    "Ознакомление с принципом работы оборудования",
    "Прохождение тестового сеанса",
    "Ответы на все ваши вопросы",
    "Обсуждение возможностей внедрения в ваш кабинет",
    "План запуска с учетом вашего рабочего графика",
  ];

  return (
    <>
      <section className="pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#EAF3EC] to-[#E2EFE5] text-slate-900 relative border-t border-[#D5E8D9] overflow-hidden">

        {/* Ambient background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#1E9646]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-12">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EBF7F0] text-[#0E5E2B] border border-[#C3EBD4] mb-3">
              {translations?.testDrive?.badge || "БЕСПЛАТНЫЙ ТЕСТ-ДРАЙВ В БИШКЕКЕ"}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[45px] font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
              {translations?.testDrive?.title || "Проверьте на себе и оцените результат!"}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {translations?.testDrive?.description || "Приезжайте в наше демо-пространство, пройдите сеанс, задайте уточняющие вопросы, и мы обсудим персональный план запуска под ваш график."}
            </p>
          </div>

          {/* Layout: Image + Checklist on Left (6 cols), Booking Form Block on Right (6 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* LEFT: Composite Coworking Image & Bullet Checkpoints (6 cols) */}
            <div className="lg:col-span-6 space-y-5">
              <div className="bg-white rounded-3xl p-1 sm:p-1.5 border border-slate-200/90 shadow-xl shadow-slate-200/40 overflow-hidden relative group">
                <img
                  src={city.coworkingImg}
                  alt={city.coworkingAlt}
                  title={city.coworkingTitle}
                  width={800}
                  height={533}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-2xl object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Checklist points */}
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-2.5">
                <h4 className="text-sm font-bold text-slate-950 uppercase tracking-wider mb-2">
                  {isKg ? "Сиз төмөнкүлөргө мүмкүнчүлүк аласыз:" : "На тест-драйве вы сможете:"}
                </h4>
                {bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-[#EBF7F0] border border-[#C3EBD4] text-[#1E9646] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="leading-snug">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Final Booking Form Block (6 cols) */}
            <div ref={formRef} className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-slate-200/60 relative">

              <div className="text-center mb-8">
                <h3 className="text-[22px] sm:text-[24px] font-extrabold text-slate-950 leading-snug mb-4">
                  {translations?.testDrive?.formTitle || city.formTitle}
                </h3>

                {/* Urgency Counter Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 font-bold text-xs sm:text-sm shadow-xs">
                  <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span>{translations?.testDrive?.urgencyBadge || "Осталось 5 свободных окошек на этой неделе"}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Name Input */}
                  <div className="md:col-span-5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#1E9646]" />
                      {translations?.hero?.form?.nameLabel || "Ваше имя *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={translations?.hero?.form?.namePlaceholder || "Имя"}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1E9646] focus:ring-2 focus:ring-[#1E9646]/20 text-base transition-all"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="md:col-span-7">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#1E9646]" />
                      {translations?.hero?.form?.phoneLabel || "Телефон / Telegram / WhatsApp *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder={translations?.hero?.form?.phonePlaceholder || city.phonePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1E9646] focus:ring-2 focus:ring-[#1E9646]/20 text-base transition-all"
                    />
                  </div>
                </div>

                {/* Profession Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#1E9646]" />
                    {translations?.hero?.form?.professionLabel || "Ваша профессия *"}
                  </label>

                  <button
                    type="button"
                    onClick={() => setIsProfessionOpen(!isProfessionOpen)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#1E9646] focus:ring-2 focus:ring-[#1E9646]/20 text-base transition-all flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="font-medium">{profession}</span>
                    <span className={`transform transition-transform duration-200 ${isProfessionOpen ? 'rotate-180' : 'rotate-0'} text-xs text-[#1E9646]`}>
                      ▼
                    </span>
                  </button>

                  {/* Dropdown Options List */}
                  {isProfessionOpen && (
                    <div className="absolute z-50 left-0 right-0 mt-1.5 rounded-xl bg-white border border-slate-200 shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                      {professionOptions.map((prof) => (
                        <button
                          key={prof}
                          type="button"
                          onClick={() => {
                            setProfession(prof);
                            setIsProfessionOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[#EBF7F0] transition-colors text-slate-800 ${profession === prof ? 'bg-[#EBF7F0] text-[#0E5E2B] font-bold' : ''}`}
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
                  className="w-full py-3.5 px-4 sm:py-4 sm:px-6 rounded-full font-extrabold text-xs sm:text-base md:text-lg text-white bg-[#0A2B1D] hover:bg-[#134E35] active:scale-[0.98] transition-all shadow-md shadow-[#0A2B1D]/20 cursor-pointer flex items-center justify-center gap-2 sm:gap-3 uppercase tracking-tight sm:tracking-wide group mt-6"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {translations?.testDrive?.submittingBtn || "Запись..."}
                    </span>
                  ) : (
                    <>
                      <span className="text-center leading-snug">{translations?.testDrive?.submitBtn || "ЗАПИСАТЬСЯ НА ТЕСТ-ДРАЙВ"}</span>
                      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1E9646] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </span>
                    </>
                  )}
                </button>

              </form>

              <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1E9646] shrink-0" />
                <span>{translations?.testDrive?.privacyNote || "Ваши данные конфиденциальны."}</span>
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* FULL-WIDTH DARK GREEN FOOTER */}
      <footer className="w-full bg-[#061F15] border-t border-[#134E35] text-center text-xs text-emerald-100/80 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="font-bold text-white text-sm tracking-wide">
            {translations?.footer?.copyright || "OlyLife © 2026. Все права защищены."}
          </p>

          <p className="max-w-2xl mx-auto leading-relaxed text-[11px] text-emerald-200/60">
            {translations?.footer?.wellnessNotice || "Бытовая продукция категории Wellness. Не является лекарственным средством и медицинским оборудованием."}
          </p>

          <div className="flex items-center justify-center gap-4 text-xs pt-1 text-emerald-300">
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors underline cursor-pointer">
              {translations?.footer?.privacyPolicy || "Политика конфиденциальности"}
            </button>
            {onOpenTerms && (
              <>
                <span className="text-emerald-500">•</span>
                <button onClick={onOpenTerms} className="hover:text-white transition-colors underline cursor-pointer">
                  {translations?.footer?.termsOfService || "Условия использования"}
                </button>
              </>
            )}
          </div>
        </div>
      </footer>
    </>
  );
};

