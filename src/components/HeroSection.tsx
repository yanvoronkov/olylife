import React, { useState, useEffect, useRef } from "react";
import { Play, ArrowRight, User, Phone, Briefcase, ShieldCheck, Sparkles, Droplets } from "lucide-react";
import { PROFESSION_OPTIONS } from "../data";
import { LeadFormData } from "../types";
import { CityConfig } from "../config/cities";
import { Translations } from "../config/translations";
import { formatFlexiblePhone } from "../utils/phoneFormatter";
import videoPreviewImg from "../../assets/video_preview.jpg";

interface HeroSectionProps {
  city: CityConfig;
  translations?: Translations;
  onSubmitLead: (data: LeadFormData) => Promise<void>;
  isSubmitting: boolean;
  formRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  city,
  translations,
  onSubmitLead,
  isSubmitting,
  formRef,
}) => {
  const isKg = translations?.locale === "kg";
  const professionOptions = translations?.hero?.form?.professionOptions || PROFESSION_OPTIONS;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState(professionOptions[0]);

  // Update profession if options change
  useEffect(() => {
    if (!professionOptions.includes(profession)) {
      setProfession(professionOptions[0]);
    }
  }, [professionOptions]);

  // Interactive VSL State
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStartVideo = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

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
    const sourceLabel = isKg ? "Башкы бет формасы (Hero Section KG)" : "Hero Section Form";
    onSubmitLead({ name, phone, profession, city: city.id, source: sourceLabel });
  };

  // Video source & poster
  const videoSrc = translations?.hero?.videoSrc || "https://video.inetskills.ru/oliylife_presentation.mp4";
  const videoPoster = translations?.hero?.videoPoster || videoPreviewImg;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#F0F7F2] via-[#EAF4ED] to-[#F0F7F2] text-slate-900">
      {/* Background ambient glowing soft gradients matching OlyLife logo brand palette */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-gradient-to-tr from-[#1E9646]/20 via-[#25A852]/12 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[#1E9646]/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-2/3 -left-20 w-[450px] h-[450px] bg-[#0E5E2B]/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Headline */}
        <div className="text-center max-w-5xl mx-auto mb-10 lg:mb-14">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.2] mb-5 sm:mb-6">
            {isKg ? (
              <>
                Ден соолук жана сулуулук тармагындагы<br className="hidden lg:inline" />
                {" "}адистер Бишкекте<br className="hidden lg:inline" />
                {" "}<span className="bg-gradient-to-r from-[#0E5E2B] via-[#1E9646] to-[#25A852] bg-clip-text text-transparent inline-block font-black">
                  кирешесин 2 эсеге кантип көбөйтө алышат?
                </span>
              </>
            ) : (
              <>
                Как специалистам сферы здоровья<br className="hidden lg:inline" />
                {" "}и красоты {city.heroTitleCity}<br className="hidden lg:inline" />
                {" "}<span className="bg-gradient-to-r from-[#0E5E2B] via-[#1E9646] to-[#25A852] bg-clip-text text-transparent inline-block font-black">
                  удвоить (X2) доход в кабинете
                </span>
              </>
            )}
          </h1>

          <p className="text-lg sm:text-2xl font-normal text-slate-600 max-w-5xl mx-auto leading-relaxed">
            {translations?.hero?.subtitle || "Без необходимости больше работать, найма персонала и вложений в рекламу"}
          </p>
        </div>

        {/* Grid Layout: Left Sleek Video Player + Right Lead Capture Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT: Premium Video Frame + 3 Trust Cards (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center w-full">

            {/* Heading Above Video */}
            <div className="w-full mb-3 flex items-center">
              <h3 className="text-base sm:text-lg font-bold text-slate-950 leading-tight">
                {translations?.hero?.videoHeading || "🎬 Посмотрите 5-минутное видео о бизнес-модели"}
              </h3>
            </div>

            {/* Sleek Modern Video Frame in Accent OlyLife Green */}
            <div className="w-full relative rounded-3xl p-1.5 sm:p-2.5 bg-gradient-to-tr from-[#0E5E2B] via-[#1E9646] to-[#25A852] border border-[#25A852]/50 shadow-2xl shadow-[#1E9646]/30 overflow-hidden">
              <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden shadow-inner">

                {/* Native HTML5 Video for Instant 0-latency Playback */}
                <video
                  ref={videoRef}
                  src={videoSrc}
                  poster={videoPoster}
                  controls={isPlaying}
                  playsInline
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Custom Branded Play Button Overlay */}
                {!isPlaying && (
                  <div
                    onClick={handleStartVideo}
                    className="absolute inset-0 flex flex-col justify-between p-2.5 sm:p-5 lg:p-6 cursor-pointer group overflow-hidden bg-black/25 hover:bg-black/15 transition-colors"
                  >
                    <img
                      src={videoPoster}
                      alt={city.videoTitle}
                      title={city.videoTitle}
                      width={1280}
                      height={720}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 pointer-events-none" />

                    {/* Center Play Button in OlyLife Logo Gradient */}
                    <div className="relative z-10 my-auto flex flex-col items-center justify-center gap-2 pointer-events-none">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-r from-[#1E9646] via-[#22A44E] to-[#25A852] group-hover:scale-110 active:scale-95 text-white flex items-center justify-center shadow-2xl shadow-black/50 transition-all group-hover:shadow-[#1E9646]/70">
                        <Play className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 fill-current ml-0.5 sm:ml-1" />
                      </div>
                      <span className="text-white text-xs sm:text-sm font-semibold tracking-wide drop-shadow-md">
                        {translations?.hero?.videoWatchBtn || "Смотреть видео"}
                      </span>
                    </div>

                    <div className="h-2 sm:h-4" />
                  </div>
                )}

              </div>
            </div>

            {/* Trust Elements Under Video */}
            <div className="w-full flex flex-wrap items-center justify-around gap-y-2 gap-x-4 pt-3.5 text-slate-600 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#1E9646] shrink-0" />
                <span>{translations?.hero?.trustCards?.guarantee || "Сертифицированная продукция и официальная гарантия"}</span>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#1E9646] shrink-0" />
                <span>{translations?.hero?.trustCards?.noMedEducation || "Не требуется медицинское образование"}</span>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-[#1E9646] shrink-0" />
                <span>{translations?.hero?.trustCards?.noConsumables || "Без расходов на расходные материалы"}</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Main Lead Capture Form Block (5 Cols) */}
          <div ref={formRef} className="lg:col-span-5 w-full">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-slate-200/60 relative">

              <h3 className="text-[20px] sm:text-[21px] font-bold text-slate-950 leading-tight mb-4">
                {translations?.hero?.form?.title || city.formTitle}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Name Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#1E9646]" />
                    {translations?.hero?.form?.nameLabel || "Ваше имя *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={translations?.hero?.form?.namePlaceholder || "Введите ваше имя"}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1E9646] focus:ring-2 focus:ring-[#1E9646]/20 text-base transition-all"
                  />
                </div>

                {/* Phone / Telegram Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#1E9646]" />
                    {translations?.hero?.form?.phoneLabel || "Телефон / Telegram / WhatsApp *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder={translations?.hero?.form?.phonePlaceholder || city.phonePlaceholder}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1E9646] focus:ring-2 focus:ring-[#1E9646]/20 text-base transition-all"
                  />
                </div>

                {/* Profession Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#1E9646]" />
                    {translations?.hero?.form?.professionLabel || "Ваша профессия *"}
                  </label>

                  {/* Custom Dropdown Trigger */}
                  <button
                    type="button"
                    onClick={() => setIsProfessionOpen(!isProfessionOpen)}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#1E9646] focus:ring-2 focus:ring-[#1E9646]/20 text-base transition-all flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="font-medium">{profession}</span>
                    <span className={`transform transition-transform duration-200 ${isProfessionOpen ? 'rotate-180' : 'rotate-0'} text-xs text-[#1E9646]`}>
                      ▼
                    </span>
                  </button>

                  {/* Dropdown Options List */}
                  {isProfessionOpen && (
                    <div className="absolute z-50 left-0 right-0 mt-1.5 rounded-xl bg-white border border-slate-200 shadow-xl overflow-hidden max-h-56 overflow-y-auto">
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

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-3.5 sm:py-3.5 sm:px-5 rounded-full font-bold text-[10.5px] sm:text-xs md:text-sm text-white bg-[#0A2B1D] hover:bg-[#134E35] active:scale-[0.98] transition-all shadow-md shadow-[#0A2B1D]/20 cursor-pointer flex items-center justify-center gap-2 sm:gap-2.5 uppercase tracking-tight sm:tracking-wider group mt-4 sm:mt-5"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {translations?.hero?.form?.submittingBtn || "Запись..."}
                    </span>
                  ) : (
                    <>
                      <span className="text-center leading-snug">{translations?.hero?.form?.submitBtn || "ЗАПИСАТЬСЯ НА ТЕСТ-ДРАЙВ"}</span>
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1E9646] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform shrink-0">
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </span>
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5">
                <span>{translations?.hero?.form?.privacyNote || "Ваши данные конфиденциальны."}</span>
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

