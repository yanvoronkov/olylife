import React from 'react';
import { trackInitiateCheckout } from '@/src/utils/astanaTracking';

interface HeroProps {
  onOpenBooking: () => void;
}

/**
 * Разворот 1: Главный экран (Hero).
 * Оформлен с эффектом матового стекла и мягкими объемными тенями:
 * - Стеклянная рамка для фото-блока кабинета (rounded-[36px], border-white/90, shadow-2xl)
 * - Атмосферная фоновая сетка и деликатные световые акценты
 * - Премиальная кнопка с градиентом
 * 
 * Строго по ТЗ:
 * - H1: Устали от хронического стресса, сидячей работы и постоянной нехватки сил в Астане?
 * - Подзаголовок: Приходите на 20-минутный сеанс на биохакинг-платформе. Процедура снимет нервное напряжение, ускорит обмен веществ и вернет ресурсное состояние с 1-ого применения
 * - Кнопка: Записаться со скидкой 50%
 */
export const AstanaHero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const handleCtaClick = () => {
    trackInitiateCheckout('Astana Hero Main CTA');
    onOpenBooking();
  };

  return (
    <section className="relative overflow-hidden py-14 lg:py-24">
      {/* Декоративная фоновая текстура сетки */}
      <div className="absolute inset-0 bg-[radial-gradient(#0A2B1D_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none" />

      {/* Мягкие фоновые световые акценты */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Левая колонка: Тексты и кнопка строго по ТЗ */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-7">
            
            {/* H1 (SEO-заголовок в 3 строки без «в Астане») */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2B1D] tracking-tight leading-[1.2] sm:leading-[1.18] max-w-2xl">
              Устали от хронического стресса, сидячей работы и постоянной нехватки сил?
            </h1>

            {/* Подзаголовок и буллиты преимуществ */}
            <div className="space-y-3 sm:space-y-3.5">
              <p className="text-base sm:text-lg text-emerald-950/90 leading-relaxed font-normal">
                Приходите на 20-минутный сеанс на биохакинг-платформе. Процедура с первого применения:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-emerald-950/85 font-medium">
                <li className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span>снимет нервное напряжение</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span>ускорит обмен веществ</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span>вернет ресурсное состояние</span>
                </li>
              </ul>
            </div>

            {/* Кнопка CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 sm:px-9 sm:py-4.5 rounded-2xl text-base sm:text-lg font-extrabold text-white bg-gradient-to-r from-[#0E6244] to-[#137A55] hover:from-[#0B5037] hover:to-[#0F6547] active:scale-95 shadow-xl shadow-emerald-900/25 transition-all duration-200 cursor-pointer"
              >
                Записаться со скидкой 50%
              </button>
            </div>

          </div>

          {/* Правая колонка: Фото-блок в стеклянной рамке */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[36px] p-3 sm:p-4 bg-gradient-to-b from-white/95 via-white/80 to-[#F0F7F2]/90 backdrop-blur-md border border-white/90 shadow-2xl shadow-emerald-950/10">
              <div className="rounded-[26px] overflow-hidden aspect-[4/3] relative shadow-inner">
                <img
                  src="/images/hero-cozy-massage-room.jpeg"
                  alt="Кабинет биохакинг-платформы в Астане"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};