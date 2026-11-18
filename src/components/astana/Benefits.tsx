import React from 'react';

/**
 * Разворот 3: Решение и выгоды (Как работает).
 * Премиальные 3D-карточки велнес-эффектов:
 * - Модели: Мозг (антистресс), Кристальная вода (детокс и лимфа), Энергетическое ядро клетки (подзарядка).
 * - Скругление rounded-[32px], деликатные пастельные градиенты.
 * - Скрещивающиеся мягкие органические овалы за 3D-объектами.
 * - Строгое выравнивание: зона иллюстраций, разделитель и заголовки идут строго на одном уровне.
 * 
 * Строго по ТЗ (без лишнего текста, без бейджей сеанса, без тегов и стрелочек):
 * - Заголовок (H2): Что происходит с телом за процедуру?
 * - Плашки выгод:
 *    * Антистресс: нервная система выходит из режима выживания, приходит глубокое спокойствие.
 *    * Детокс и метаболизм: разгоняется кровоток и лимфоток, уходят застойные жидкости.
 *    * Клеточная подзарядка: восстанавливается естественный потенциал организма, возвращается бодрость и ясность ума.
 */
export const AstanaBenefits: React.FC = () => {
  const benefits = [
    {
      id: 1,
      image: '/images/3d-antistress-brain.png',
      title: 'Антистресс',
      description: 'нервная система выходит из режима выживания, приходит глубокое спокойствие.',
      bgGradient: 'bg-gradient-to-b from-[#EDF6F1] to-[#FFFFFF]',
      borderColor: 'border-[#2E5E4A]/15',
    },
    {
      id: 2,
      image: '/images/3d-detox-water.png',
      title: 'Детокс и метаболизм',
      description: 'разгоняется кровоток и лимфоток, уходят застойные жидкости.',
      bgGradient: 'bg-gradient-to-b from-[#EBF3F8] to-[#FFFFFF]',
      borderColor: 'border-[#2B5470]/15',
    },
    {
      id: 3,
      image: '/images/3d-cellular-energy.png',
      title: 'Клеточная подзарядка',
      description: 'восстанавливается естественный потенциал организма, возвращается бодрость и ясность ума.',
      bgGradient: 'bg-gradient-to-b from-[#F7F4EB] to-[#FFFFFF]',
      borderColor: 'border-[#7A6038]/15',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F3F7F4] relative overflow-hidden">
      {/* Декоративные мягкие световые акценты */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Заголовок (H2) строго по ТЗ — без лишних плашек над ним */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2B1D] tracking-tight leading-tight">
            Что происходит с телом за процедуру?
          </h2>
        </div>

        {/* 3 карточки эффектов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {benefits.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-[32px] p-7 sm:p-8 ${item.bgGradient} border ${item.borderColor} shadow-lg shadow-emerald-950/5 hover:shadow-2xl hover:shadow-emerald-950/12 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full overflow-hidden`}
            >
              {/* 1. Зона иллюстрации строго фиксированной высоты (без подложки, чистые 3D-модели как просил клиент) */}
              <div className="w-full h-52 sm:h-56 flex items-center justify-center relative shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="relative z-10 max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* 2. Разделитель строго на одном фиксированном уровне во всех карточках */}
              <div className="w-full border-t border-slate-200/70 my-6 shrink-0" />

              {/* 3. Заголовок с фиксированной высотой контейнера, чтобы текст шел строго вровень */}
              <div className="min-h-[2.5rem] flex items-start mb-2 shrink-0">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0A2B1D] leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* 4. Описание строго по ТЗ */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};