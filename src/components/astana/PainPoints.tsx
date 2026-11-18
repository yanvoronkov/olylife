import React from 'react';

/**
 * Вариант отображения иллюстраций в карточках болей:
 * - 'photos': Экспериментальный вариант — органические широкие пузырьки с живыми фото женщин азиатской внешности и плавным переходом краев
 * - '3d': Базовый вариант — минималистичные 3D-модели (чашка кофе, ноутбук, батарейка)
 * 
 * Легкий откат назад: достаточно переключить значение на '3d'.
 */
export const PAIN_POINTS_STYLE: 'photos' | '3d' = 'photos';

/**
 * Разворот 2: Проблематика (Боли).
 * Премиальные карточки в стиле медицинского велнеса:
 * - Скругленные мягкие плашки-«облачки» (rounded-[32px])
 * - Мягкие пастельные оттенки фона под каждую карточку
 * - В зоне иллюстраций — органические широкие пузырьки с плавным переходом краев
 * - Строгое выравнивание: зона иллюстраций, разделитель и заголовки идут строго на одном уровне
 */
export const AstanaPainPoints: React.FC = () => {
  const painPoints = [
    {
      id: 1,
      image3D: '/images/3d-coffee-exhaustion.png',
      imagePhoto: '/images/woman-coffee-bubble.png',
      title: 'Кофе не бодрит',
      description: 'накопилась тревожность, а отпустить мысли не получается.',
      bgGradient: 'bg-gradient-to-b from-[#F2F6F3] to-[#FFFFFF]',
      borderColor: 'border-[#2E5E4A]/10',
      blobBg1: 'bg-[#D6E7DC]',
      blobBg2: 'bg-[#E5F1E9]',
    },
    {
      id: 2,
      image3D: '/images/3d-sedentary-work.png',
      imagePhoto: '/images/woman-sedentary-bubble.png',
      title: 'Подолгу засиживаетесь за компьютером, в пробках и кафе',
      description: 'появляются отечность и лишний вес.',
      bgGradient: 'bg-gradient-to-b from-[#F1F5F8] to-[#FFFFFF]',
      borderColor: 'border-[#3A5D73]/10',
      blobBg1: 'bg-[#D6E5EE]',
      blobBg2: 'bg-[#E4EEF5]',
    },
    {
      id: 3,
      image3D: '/images/3d-low-battery.png',
      imagePhoto: '/images/woman-exhausted-bubble.png',
      title: 'Нет искры на жизнь',
      description: 'проснулись — а сил уже не хватает ни на спорт, ни на семью, ни на амбициозные цели.',
      bgGradient: 'bg-gradient-to-b from-[#F7F4EE] to-[#FFFFFF]',
      borderColor: 'border-[#7C6343]/10',
      blobBg1: 'bg-[#EDE2D2]',
      blobBg2: 'bg-[#F6EFE4]',
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

        {/* 3 карточки с увеличенными органическими пузырьками и плавным переходом краев */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {painPoints.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-[32px] p-7 sm:p-8 ${item.bgGradient} border ${item.borderColor} shadow-md shadow-slate-900/5 hover:shadow-2xl hover:shadow-emerald-950/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full overflow-hidden`}
            >
              {/* 1. Зона иллюстрации увеличенного размера с органическими пузырьками */}
              <div className="w-full h-56 sm:h-60 flex items-center justify-center relative shrink-0">
                
                {/* Скрещивающиеся мягкие органические ауры пузырька */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  {/* Первый фоновый овал (расширен под пузырек) */}
                  <div
                    className={`absolute w-56 h-44 sm:w-64 sm:h-48 rounded-[52%_48%_62%_38%/48%_55%_45%_52%] ${item.blobBg1} opacity-70 blur-md transform -rotate-6 group-hover:scale-105 transition-transform duration-500`}
                  />
                  {/* Второй скрещивающийся овал другого оттенка */}
                  <div
                    className={`absolute w-60 h-40 sm:w-68 sm:h-44 rounded-[58%_42%_45%_55%/45%_52%_48%_55%] ${item.blobBg2} opacity-80 blur-sm transform rotate-6 group-hover:rotate-3 transition-transform duration-500`}
                  />
                </div>

                {/* Фото/3D внутри органического пузырька с плавным переходом краев */}
                {PAIN_POINTS_STYLE === 'photos' ? (
                  <div className="relative z-10 w-full max-w-[280px] sm:max-w-[310px] h-48 sm:h-52 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-out">
                    <img
                      src={item.imagePhoto}
                      alt={item.title}
                      className="w-full h-full object-contain filter drop-shadow-md select-none"
                    />
                  </div>
                ) : (
                  <img
                    src={item.image3D}
                    alt={item.title}
                    className="relative z-10 max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                )}
              </div>

              {/* 2. Разделитель */}
              <div className="w-full border-t border-slate-200/70 my-5 sm:my-6 shrink-0" />

              {/* 3. Заголовок строго по ТЗ без искусственных пустот */}
              <h3 className="text-lg sm:text-xl font-bold text-[#0A2B1D] leading-snug mb-2 sm:mb-2.5">
                {item.title}
              </h3>

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