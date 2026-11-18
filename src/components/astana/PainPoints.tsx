import React from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * Разворот 2: Проблематика (Боли).
 * Премиальные 3D-карточки в стиле медицинского велнеса (согласно референсу):
 * - Скругленные мягкие плашки-облачки (rounded-[32px])
 * - Мягкие пастельные оттенки фона под каждую карточку
 * - Центрированные 3D-модели (глиняно-матовый рендер)
 * - Круглые акцентные бейджи-кнопки со стрелкой в верхнем правом углу
 * 
 * Строго по ТЗ:
 * - Заголовок (H2): Знакомо состояние?
 * - Тезисы:
 *    * Кофе не бодрит: накопилась тревожность, а отпустить мысли не получается.
 *    * Подолгу засиживаетесь за компьютером, в пробках и кафе — появляются отечность и лишний вес.
 *    * Нет искры на жизнь: проснулись — а сил уже не хватает ни на спорт, ни на семью, ни на амбициозные цели.
 */
export const AstanaPainPoints: React.FC = () => {
  const painPoints = [
    {
      id: 1,
      image: '/images/3d-coffee-exhaustion.png',
      title: 'Кофе не бодрит',
      description: 'накопилась тревожность, а отпустить мысли не получается.',
      bgGradient: 'bg-gradient-to-b from-[#F2F6F3] to-[#FFFFFF]',
      badgeBg: 'bg-[#2E5E4A]/10 text-[#1F4C39]',
      borderColor: 'border-[#2E5E4A]/10',
    },
    {
      id: 2,
      image: '/images/3d-sedentary-work.png',
      title: 'Подолгу засиживаетесь за компьютером, в пробках и кафе',
      description: 'появляются отечность и лишний вес.',
      bgGradient: 'bg-gradient-to-b from-[#F1F5F8] to-[#FFFFFF]',
      badgeBg: 'bg-[#3A5D73]/10 text-[#2B4A5D]',
      borderColor: 'border-[#3A5D73]/10',
    },
    {
      id: 3,
      image: '/images/3d-low-battery.png',
      title: 'Нет искры на жизнь',
      description: 'проснулись — а сил уже не хватает ни на спорт, ни на семью, ни на амбициозные цели.',
      bgGradient: 'bg-gradient-to-b from-[#F7F4EE] to-[#FFFFFF]',
      badgeBg: 'bg-[#7C6343]/10 text-[#634E32]',
      borderColor: 'border-[#7C6343]/10',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAFCFB] relative overflow-hidden border-b border-emerald-900/5">
      {/* Декоративная фоновая текстура сетки */}
      <div className="absolute inset-0 bg-[radial-gradient(#0A2B1D_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none" />

      {/* Мягкие фоновые световые пятна */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Заголовок (H2) строго по ТЗ */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/5 border border-emerald-800/10 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
            Сигналы перегрузки организма
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2B1D] tracking-tight leading-tight">
            Знакомо состояние?
          </h2>
        </div>

        {/* 3 карточки с 3D-моделями в стиле референса */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {painPoints.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-[32px] p-7 sm:p-8 ${item.bgGradient} border ${item.borderColor} shadow-md shadow-slate-900/5 hover:shadow-2xl hover:shadow-emerald-950/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden`}
            >
              {/* Верхняя строка карточки: номер/категория + круглый бейдж со стрелкой */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-wider uppercase text-slate-400">
                  Симптом 0{item.id}
                </span>
                <div
                  className={`w-9 h-9 rounded-full ${item.badgeBg} flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-xs`}
                >
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              {/* 3D-иллюстрация (бесшовный блендинг с фоном карточки) */}
              <div className="w-full h-48 sm:h-56 flex items-center justify-center my-2 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Текст: Заголовок и пояснение строго по ТЗ */}
              <div className="pt-4 border-t border-slate-200/50">
                <h3 className="text-lg sm:text-xl font-bold text-[#0A2B1D] mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};