import React, { useRef, useState } from 'react';
import { Play, Volume2, VolumeX, MapPin, Phone, Navigation } from 'lucide-react';
import { ASTANA_CLINIC_CONFIG } from '@/src/config/astanaClinic';

/**
 * Разворот 4: Экспертность, контакты и карта.
 * Строго по ТЗ:
 * - Видео-вставка в премиальном титановом мокапе смартфона (Space Gray / Metallic)
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
    <section className="py-20 sm:py-28 bg-white border-y border-emerald-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Левая колонка: Видео-вставка в современном мокапе iPhone (Space Gray / Metallic Titanium) */}
          <div className="lg:col-span-4 flex flex-col items-center">
            
            {/* Премиальная металлическая рамка iPhone */}
            <div className="relative w-full max-w-[275px] sm:max-w-[295px] aspect-[9/19] rounded-[52px] p-[3.5px] bg-gradient-to-b from-[#8C9196] via-[#4A4E53] to-[#25272A] shadow-[0_30px_70px_-15px_rgba(15,23,42,0.4),0_0_0_1px_rgba(255,255,255,0.2)] select-none">
              
              {/* Металлические аппаратные кнопки сбоку */}
              {/* Action button */}
              <div className="absolute -left-[4px] top-24 w-[3.5px] h-7 bg-[#585C61] rounded-l-xs shadow-xs" />
              {/* Volume Up */}
              <div className="absolute -left-[4px] top-35 w-[3.5px] h-12 bg-[#585C61] rounded-l-xs shadow-xs" />
              {/* Volume Down */}
              <div className="absolute -left-[4px] top-50 w-[3.5px] h-12 bg-[#585C61] rounded-l-xs shadow-xs" />
              {/* Power button */}
              <div className="absolute -right-[4px] top-36 w-[3.5px] h-16 bg-[#585C61] rounded-r-xs shadow-xs" />

              {/* Внутренняя черная рамка экрана (тонкий симметричный безель) */}
              <div className="w-full h-full rounded-[49px] p-[8px] bg-black relative flex flex-col justify-between overflow-hidden">
                
                {/* Dynamic Island */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-[21px] bg-black rounded-full z-30 flex items-center justify-between px-2.5 shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0E121A] border border-[#232938]" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
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
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-20" />
              </div>
            </div>

            {/* Подпись под видео строго по ТЗ */}
            <div className="text-center mt-5 max-w-[320px]">
              <p className="text-base sm:text-lg font-bold text-[#0A2B1D] leading-snug">
                Татьяна Маркина — директор и основатель клиники OSAM
              </p>
            </div>

          </div>

          {/* Правая колонка: Расширенный блок контактов и карта строго по ТЗ */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="p-7 sm:p-9 rounded-[32px] bg-[#F0F7F2] border border-emerald-200/80 shadow-md shadow-emerald-950/5 space-y-6">
              
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A2B1D] tracking-tight">
                  Клиника «Умай» / Клиника OSAM
                </h3>
              </div>

              {/* Контакты: Адрес в одну строку и Телефон */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-base">
                
                {/* Карточка Адреса (7 колонок из 12 — гарантированно помещается весь адрес в одну строку) */}
                <div className="md:col-span-7 flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-white border border-emerald-100 shadow-2xs">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs text-slate-500 font-medium block">Адрес</span>
                    <span className="font-bold text-[#0A2B1D] block whitespace-nowrap text-sm sm:text-base">
                      г. Астана, ул. Бокейхана, 16/3
                    </span>
                  </div>
                </div>

                {/* Карточка Телефона (5 колонок из 12) */}
                <div className="md:col-span-5 flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-white border border-emerald-100 shadow-2xs">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs text-slate-500 font-medium block">Телефон</span>
                    <a
                      href={`tel:+${ASTANA_CLINIC_CONFIG.phoneRaw}`}
                      className="font-bold text-[#0A2B1D] hover:text-emerald-700 transition-colors block whitespace-nowrap text-sm sm:text-base"
                    >
                      +7 (700) 965-12-34
                    </a>
                  </div>
                </div>

              </div>

              {/* Интерактивная карта (просторная) */}
              <div className="rounded-2xl overflow-hidden border border-emerald-200 bg-white shadow-inner">
                <iframe
                  title="Карта расположения клиники OSAM в Астане"
                  src="https://yandex.ru/map-widget/v1/?ll=71.432742%2C51.104618&z=16&pt=71.432742,51.104618,pm2rdm"
                  className="w-full h-72 sm:h-80 border-0"
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 transition-colors cursor-pointer"
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