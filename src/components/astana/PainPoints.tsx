import React from 'react';

/**
 * Разворот 2: Проблематика (Боли).
 * Премиальные карточки в стиле медицинского велнеса:
 * - Скругленные мягкие плашки-«облачки» (rounded-[32px])
 * - Мягкие пастельные оттенки фона под каждую карточку
 * - В зоне иллюстраций — стильные скрещивающиеся органические овалы разных оттенков
 * - Центрированные 3D-модели без артефактов и рамок
 * - Строгое выравнивание: зона иллюстраций, разделитель и заголовки идут строго на одном уровне
 * 
 * Строго по ТЗ (без лишнего текста, без бейджей перегрузки и стрелочек):
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
      borderColor: 'border-[#2E5E4A]/10',
      blobBg1: 'bg-[#D6E7DC]',
      blobBg2: 'bg-[#E5F1E9]',
      blobBg3: 'bg-[#BFDBC8]',
    },
    {
      id: 2,
      image: '/images/3d-sedentary-work.png',
      title: 'Подолгу засиживаетесь за компьютером, в пробках и кафе',
      description: 'появляются отечность и лишний вес.',
      bgGradient: 'bg-gradient-to-b from-[#F1F5F8] to-[#FFFFFF]',
      borderColor: 'border-[#3A5D73]/10',
      blobBg1: 'bg-[#D6E5EE]',
      blobBg2: 'bg-[#E4EEF5]',
      blobBg3: 'bg-[#BCD4E4]',
    },
    {
      id: 3,
      image: '/images/3d-low-battery.png',
      title: 'Нет искры на жизнь',
      description: 'проснулись — а сил уже не хватает ни на спорт, ни на семью, ни на амбициозные цели.',
      bgGradient: 'bg-gradient-to-b from-[#F7F4EE] to-[#FFFFFF]',
      borderColor: 'border-[#7C6343]/10',
      blobBg1: 'bg-[#EDE2D2]',
      blobBg2: 'bg-[#F6EFE4]',
      blobBg3: 'bg-[#DECABA]',
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
        
        {/* Заголовок (H2) строго по ТЗ — без лишних плашек над ним */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2B1D] tracking-tight leading-tight">
            Знакомо состояние?
          </h2>
        </div>

        {/* 3 карточки с 3D-моделями и скрещивающимися овалами */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {painPoints.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-[32px] p-7 sm:p-8 ${item.bgGradient} border ${item.borderColor} shadow-md shadow-slate-900/5 hover:shadow-2xl hover:shadow-emerald-950/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full overflow-hidden`}
            >
              {/* 1. Зона иллюстрации строго фиксированной высоты с органическими скрещивающимися овалами */}
              <div className="w-full h-52 sm:h-56 flex items-center justify-center relative shrink-0">
                
                {/* Скрещивающиеся органические овалы разных оттенков на фоне */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  {/* Первый овал */}
                  <div
                    className={`absolute w-36 h-48 sm:w-40 sm:h-50 rounded-[45%_55%_60%_40%/50%_60%_40%_50%] ${item.blobBg1} opacity-70 blur-[1px] transform -rotate-12 group-hover:scale-105 transition-transform duration-500`}
                  />
                  {/* Второй скрещивающийся овал другого оттенка */}
                  <div
                    className={`absolute w-44 h-32 sm:w-48 sm:h-36 rounded-[55%_45%_40%_60%/40%_50%_60%_50%] ${item.blobBg2} opacity-80 blur-[1px] transform rotate-18 group-hover:rotate-12 transition-transform duration-500`}
                  />
                  {/* Небольшой акцентный блик/пятно */}
                  <div
                    className={`absolute w-24 h-24 rounded-full ${item.blobBg3} opacity-50 blur-md transform translate-x-3 -translate-y-2`}
                  />
                </div>

                {/* Чистая 3D-иллюстрация без рамок поверх фоновых овалов */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="relative z-10 max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* 2. Разделитель строго на одном фиксированном уровне во всех карточках */}
              <div className="w-full border-t border-slate-200/70 my-6 shrink-0" />

              {/* 3. Заголовок с фиксированной высотой контейнера, чтобы текст шел строго вровень */}
              <div className="min-h-[3.75rem] flex items-start mb-2 shrink-0">
                <h3 className="text-lg sm:text-xl font-bold text-[#0A2B1D] leading-snug">
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