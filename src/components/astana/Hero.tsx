import React from 'react';
import { trackInitiateCheckout } from '@/src/utils/astanaTracking';

interface HeroProps {
  onOpenBooking: () => void;
}

/**
 * Разворот 1: Главный экран (Hero).
 * Строго по ТЗ:
 * - H1: Устали от хронического стресса, сидячей работы и постоянной нехватки сил в Астане?
 * - Подзаголовок: Приходите на 20-минутный сеанс на биохакинг-платформе. Процедура снимет нервное напряжение, ускорит обмен веществ и вернет ресурсное состояние с 1-ого применения
 * - Фото-блок: изображение кабинета/платформы
 * - Кнопка: Записаться со скидкой 50%
 */
export const AstanaHero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const handleCtaClick = () => {
    trackInitiateCheckout('Astana Hero Main CTA');
    onOpenBooking();
  };

  return (
    <section className="relative overflow-hidden py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Левая колонка: Тексты и кнопка строго по ТЗ */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* H1 (SEO-заголовок) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2B1D] tracking-tight leading-[1.18]">
              Устали от хронического стресса, сидячей работы и постоянной нехватки сил в Астане?
            </h1>

            {/* Подзаголовок */}
            <p className="text-base sm:text-lg text-emerald-950/85 leading-relaxed font-normal">
              Приходите на 20-минутный сеанс на биохакинг-платформе. Процедура снимет нервное напряжение,
              ускорит обмен веществ и вернет ресурсное состояние с 1-ого применения
            </p>

            {/* Кнопка CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base sm:text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-lg shadow-emerald-700/20 transition-all duration-200 cursor-pointer"
              >
                Записаться со скидкой 50%
              </button>
            </div>

          </div>

          {/* Правая колонка: Фото-блок без плавающих плашек */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-emerald-100 bg-white">
              <img
                src="/images/hero-cozy-massage-room.jpeg"
                alt="Кабинет биохакинг-платформы в Астане"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
