import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

/**
 * Разворот 3: Решение и выгоды (Как работает).
 * Премиальные 3D-карточки велнес-эффектов:
 * - Модели: Мозг (антистресс), Кристальная вода (детокс и лимфа), Энергетическое ядро клетки (подзарядка).
 * - Скругление rounded-[32px], деликатные пастельные градиенты, круглый бейдж в верхнем углу.
 * 
 * Строго по ТЗ:
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
      tag: 'Баланс нервной системы',
      bgGradient: 'bg-gradient-to-b from-[#EDF6F1] to-[#FFFFFF]',
      badgeBg: 'bg-[#2E5E4A]/10 text-[#1F4C39]',
      borderColor: 'border-[#2E5E4A]/15',
    },
    {
      id: 2,
      image: '/images/3d-detox-water.png',
      title: 'Детокс и метаболизм',
      description: 'разгоняется кровоток и лимфоток, уходят застойные жидкости.',
      tag: 'Лимфодренаж и циркуляция',
      bgGradient: 'bg-gradient-to-b from-[#EBF3F8] to-[#FFFFFF]',
      badgeBg: 'bg-[#2B5470]/10 text-[#1E3F56]',
      borderColor: 'border-[#2B5470]/15',
    },
    {
      id: 3,
      image: '/images/3d-cellular-energy.png',
      title: 'Клеточная подзарядка',
      description: 'восстанавливается естественный потенциал организма, возвращается бодрость и ясность ума.',
      tag: 'Митохондриальный тонус',
      bgGradient: 'bg-gradient-to-b from-[#F7F4EB] to-[#FFFFFF]',
      badgeBg: 'bg-[#7A6038]/10 text-[#5F4926]',
      borderColor: 'border-[#7A6038]/15',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F3F7F4] relative overflow-hidden">
      {/* Декоративные мягкие световые акценты */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Заголовок (H2) строго по ТЗ */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/5 border border-emerald-900/10 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Эффект одного 20-минутного сеанса
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2B1D] tracking-tight leading-tight">
            Что происходит с телом за процедуру?
          </h2>
        </div>

        {/* 3 карточки эффектов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-[32px] p-7 sm:p-8 ${item.bgGradient} border ${item.borderColor} shadow-lg shadow-emerald-950/5 hover:shadow-2xl hover:shadow-emerald-950/12 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden`}
            >
              {/* Верхняя панель: тег эффекта и круглый бейдж */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-500 bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
                  {item.tag}
                </span>
                <div
                  className={`w-9 h-9 rounded-full ${item.badgeBg} flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-xs`}
                >
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              {/* Центрированная 3D-иллюстрация (бесшовный блендинг с фоном карточки) */}
              <div className="w-full h-48 sm:h-56 flex items-center justify-center my-2 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Текст: Название эффекта и описание строго по ТЗ */}
              <div className="pt-4 border-t border-slate-200/60">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0A2B1D] mb-2.5 leading-snug">
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