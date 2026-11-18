import React from 'react';
import { Coffee, Monitor, BatteryLow } from 'lucide-react';

/**
 * Разворот 2: Проблематика (Боли).
 * Строго по ТЗ:
 * - Заголовок (H2): Знакомо состояние?
 * - Тезисы под инфографику/иконки:
 *    * Кофе не бодрит: накопилась тревожность, а отпустить мысли не получается.
 *    * Подолгу засиживаетесь за компьютером, в пробках и кафе — появляются отечность и лишний вес.
 *    * Нет искры на жизнь: проснулись — а сил уже не хватает ни на спорт, ни на семью, ни на амбициозные цели.
 */
export const AstanaPainPoints: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-y border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок (H2) строго по ТЗ */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2B1D] tracking-tight">
            Знакомо состояние?
          </h2>
        </div>

        {/* 3 тезиса под инфографику/иконки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Тезис 1 */}
          <div className="p-7 rounded-2xl bg-[#F0F7F2] border border-emerald-200/70 shadow-sm flex flex-col justify-start">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-emerald-100 flex items-center justify-center mb-6 text-emerald-800">
              <Coffee className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#0A2B1D] mb-2">
              Кофе не бодрит
            </h3>
            <p className="text-base text-slate-600 leading-relaxed">
              накопилась тревожность, а отпустить мысли не получается.
            </p>
          </div>

          {/* Тезис 2 */}
          <div className="p-7 rounded-2xl bg-[#F0F7F2] border border-emerald-200/70 shadow-sm flex flex-col justify-start">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-emerald-100 flex items-center justify-center mb-6 text-emerald-800">
              <Monitor className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#0A2B1D] mb-2">
              Подолгу засиживаетесь за компьютером, в пробках и кафе
            </h3>
            <p className="text-base text-slate-600 leading-relaxed">
              появляются отечность и лишний вес.
            </p>
          </div>

          {/* Тезис 3 */}
          <div className="p-7 rounded-2xl bg-[#F0F7F2] border border-emerald-200/70 shadow-sm flex flex-col justify-start">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-emerald-100 flex items-center justify-center mb-6 text-emerald-800">
              <BatteryLow className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#0A2B1D] mb-2">
              Нет искры на жизнь
            </h3>
            <p className="text-base text-slate-600 leading-relaxed">
              проснулись — а сил уже не хватает ни на спорт, ни на семью, ни на амбициозные цели.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
