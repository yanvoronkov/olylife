import React, { useRef, useState } from 'react';
import { Play, Volume2, VolumeX, MapPin, Phone, Navigation } from 'lucide-react';
import { ASTANA_CLINIC_CONFIG } from '@/src/config/astanaClinic';

/**
 * Разворот 4: Экспертность, контакты и карта.
 * Оформлен с эффектом матового стекла (Glassmorphism), повторяющим стилистику 2 и 3 разворотов:
 * - Стеклянная подложка и рамки карточек (rounded-[36px], border-white/90, shadow-2xl)
 * - Видео-вставка в премиальном титановом мокапе смартфона (Space Gray Metallic)
 * - Подпись под видео: Татьяна Маркина — директор и основатель клиники OSAM
 * - Расширенный блок контактов и карта (адрес строго в одну строку):
 *    * Клиника «Умай» / Клиника OSAM
 *    * Адрес: г. Астана, ул. Бокейхана, 16/3
 *    * Телефон: +7 (700) 965-12-34
 *    * (Интерактивная карта)
 */
export const AstanaFounderVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      void videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAFCFB] relative overflow-hidden border-y border-emerald-100/80">
      {/* Декоративная фоновая текстура сетки */}
      <div className="absolute inset-0 bg-[radial-gradient(#0A2B1D_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none" />

      {/* Мягкие фоновые световые акценты */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Левая колонка: Видео-вставка в современном мокапе iPhone (Space Gray / Metallic Titanium) */}
          <div className="lg:col-span-4 flex flex-col items-center">
            
            {/* Премиальная металлическая рамка iPhone (Natural Titanium / Space Gray) */}
            <div className="relative w-full max-w-[280px] sm:max-w-[305px] aspect-[9/19.2] rounded-[52px] p-[9px] sm:p-[10px] bg-gradient-to-tr from-[#6E7378] via-[#A5ABB0] to-[#E2E6EA] shadow-[0_30px_70px_-12px_rgba(15,23,42,0.45),0_0_0_1px_rgba(255,255,255,0.5)_inset,0_0_0_1px_rgba(0,0,0,0.15)] select-none">
              
              {/* Металлические аппаратные кнопки сбоку */}
              {/* Action button */}
              <div className="absolute -left-[4.5px] top-24 w-[4px] h-7 bg-gradient-to-r from-[#8C9197] to-[#B0B5BA] rounded-l-xs shadow-xs" />
              {/* Volume Up */}
              <div className="absolute -left-[4.5px] top-35 w-[4px] h-12 bg-gradient-to-r from-[#8C9197] to-[#B0B5BA] rounded-l-xs shadow-xs" />
              {/* Volume Down */}
              <div className="absolute -left-[4.5px] top-50 w-[4px] h-12 bg-gradient-to-r from-[#8C9197] to-[#B0B5BA] rounded-l-xs shadow-xs" />
              {/* Power button */}
              <div className="absolute -right-[4.5px] top-36 w-[4px] h-16 bg-gradient-to-l from-[#8C9197] to-[#B0B5BA] rounded-r-xs shadow-xs" />

              {/* Тонкий симметричный OLED-безель экрана (стиль iPhone 15/16 Pro) */}
              <div className="w-full h-full rounded-[43px] p-[2.5px] bg-[#0E1013] relative flex flex-col justify-between overflow-hidden shadow-inner">
                
                {/* Dynamic Island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-22 h-[18px] bg-black rounded-full z-30 flex items-center justify-between px-2 shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#181D26] border border-[#2B3240]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/90 animate-pulse" />
                </div>

                {/* Экранная область видео */}
                <div
                  className="relative w-full h-full rounded-[41px] overflow-hidden bg-black cursor-pointer group"
                  onClick={togglePlay}
                >
                  <video
                    ref={videoRef}
                    src="/videos/tatiana_presentation.mp4"
                    poster="/videos/tatiana_poster.jpg"
                    playsInline
                    className="w-full h-full object-cover"
                    onEnded={() => setIsPlaying(false)}
                  />

                  {/* Оверлей при паузе */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 flex flex-col items-center justify-center transition-all">
                      <div className="w-16 h-16 rounded-full bg-emerald-600/95 text-white flex items-center justify-center shadow-xl shadow-emerald-950/40 transform group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Контрол звука */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="absolute bottom-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md transition-colors cursor-pointer"
                    title={isMuted ? 'Включить звук' : 'Выключить звук'}
                    aria-label="Переключить звук"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>

                  {/* Легкий диагональный стеклянный блик на экране */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none rounded-[41px]" />
                </div>

                {/* Home Bar */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-20" />
              </div>
            </div>

            {/* Подпись под видео строго по ТЗ */}
            <div className="text-center mt-5 max-w-[320px]">
              <p className="text-base sm:text-lg font-bold text-[#0A2B1D] leading-snug">
                Татьяна Маркина — основатель клиники OSAM
              </p>
            </div>

          </div>

          {/* Правая колонка: Расширенный блок контактов и карта в стеклянной рамке */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="p-4 sm:p-7 lg:p-10 rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-white/95 via-white/85 to-[#F0F7F2]/90 backdrop-blur-md border border-white/90 shadow-2xl shadow-emerald-950/10 space-y-4 sm:space-y-6 relative overflow-hidden">
              
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0A2B1D] tracking-tight">
                  Клиника OSAM
                </h3>
              </div>

              {/* Контакты: Компактные отступы на мобильных, чтобы адрес помещался целиком */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 text-base">
                
                {/* Карточка Адреса в стеклянном стиле */}
                <div className="md:col-span-7 flex items-center gap-2.5 sm:gap-3.5 p-3 sm:p-4 md:p-5 rounded-[18px] sm:rounded-[22px] bg-gradient-to-b from-[#F2F8F4] to-white border border-emerald-200/80 shadow-xs hover:shadow-md transition-all">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] sm:text-xs text-slate-500 font-medium block">Адрес</span>
                    <span className="font-bold text-[#0A2B1D] block text-xs sm:text-sm md:text-base leading-tight">
                      г. Астана, ул. Бокейхана, 16/3
                    </span>
                  </div>
                </div>

                {/* Карточка Телефона в стеклянном стиле */}
                <div className="md:col-span-5 flex items-center gap-2.5 sm:gap-3.5 p-3 sm:p-4 md:p-5 rounded-[18px] sm:rounded-[22px] bg-gradient-to-b from-[#F2F8F4] to-white border border-emerald-200/80 shadow-xs hover:shadow-md transition-all">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] sm:text-xs text-slate-500 font-medium block">Телефон</span>
                    <a
                      href={`tel:+${ASTANA_CLINIC_CONFIG.phoneRaw}`}
                      className="font-bold text-[#0A2B1D] hover:text-emerald-700 transition-colors block text-xs sm:text-sm md:text-base leading-tight"
                    >
                      +7 (700) 965-12-34
                    </a>
                  </div>
                </div>

              </div>

              {/* Интерактивная карта с аккуратной рамкой */}
              <div className="rounded-[24px] overflow-hidden p-1.5 bg-white border border-emerald-200/90 shadow-md">
                <iframe
                  title="Карта расположения клиники OSAM в Астане"
                  src="https://yandex.ru/map-widget/v1/?ll=71.432742%2C51.104618&z=16&pt=71.432742,51.104618,pm2rdm"
                  className="w-full h-72 sm:h-80 rounded-[20px] border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              {/* Кнопка 2GIS */}
              <div className="pt-1">
                <a
                  href="https://2gis.kz/astana/search/%D0%9A%D0%BB%D0%B8%D0%BD%D0%B8%D0%BA%D0%B0%C2%BB%20%D0%A3%D0%BC%D0%B0%D0%B9%C2%BB%20%D0%91%D0%BE%D0%BA%D0%B5%D0%B9%D1%85%D0%B0%D0%BD%D0%B0%2016%2F3%20%D0%B3.%20%D0%90%D1%81%D1%82%D0%B0%D0%BD%D0%B0/firm/70000001103491052/71.432727%2C51.104591?m=71.432742%2C51.104618%2F17.67"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-extrabold text-emerald-950 bg-white/90 hover:bg-white border border-emerald-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-emerald-700" />
                  <span>Открыть в 2GIS</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};