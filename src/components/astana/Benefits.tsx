import React from 'react';

/**
 * Разворот 3: Решение и выгоды (Как работает).
 * Строго по ТЗ:
 * - Заголовок (H2): Что происходит с телом за процедуру?
 * - Плашки выгод:
 *    * 🧘 Антистресс: нервная система выходит из режима выживания, приходит глубокое спокойствие.
 *    * 💧 Детокс и метаболизм: разгоняется кровоток и лимфоток, уходят застойные жидкости.
 *    * ⚡ Клеточная подзарядка: восстанавливается естественный потенциал организма, возвращается бодрость и ясность ума.
 */
export const AstanaBenefits: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F0F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок (H2) строго по ТЗ */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2B1D] tracking-tight">
            Что происходит с телом за процедуру?
          </h2>
        </div>

        {/* 3 плашки выгод строго по ТЗ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Плашка 1: Антистресс */}
          <div className="rounded-3xl bg-white p-8 border border-emerald-200/80 shadow-md flex flex-col justify-start">
            <div className="text-4xl mb-5">🧘</div>
            <h3 className="text-2xl font-bold text-[#0A2B1D] mb-3">
              Антистресс
            </h3>
            <p className="text-base text-slate-600 leading-relaxed">
              нервная система выходит из режима выживания, приходит глубокое спокойствие.
            </p>
          </div>

          {/* Плашка 2: Детокс и метаболизм */}
          <div className="rounded-3xl bg-white p-8 border border-emerald-200/80 shadow-md flex flex-col justify-start">
            <div className="text-4xl mb-5">💧</div>
            <h3 className="text-2xl font-bold text-[#0A2B1D] mb-3">
              Детокс и метаболизм
            </h3>
            <p className="text-base text-slate-600 leading-relaxed">
              разгоняется кровоток и лимфоток, уходят застойные жидкости.
            </p>
          </div>

          {/* Плашка 3: Клеточная подзарядка */}
          <div className="rounded-3xl bg-white p-8 border border-emerald-200/80 shadow-md flex flex-col justify-start">
            <div className="text-4xl mb-5">⚡</div>
            <h3 className="text-2xl font-bold text-[#0A2B1D] mb-3">
              Клеточная подзарядка
            </h3>
            <p className="text-base text-slate-600 leading-relaxed">
              восстанавливается естественный потенциал организма, возвращается бодрость и ясность ума.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
