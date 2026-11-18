import React, { useState } from 'react';
import { User, Phone, Sparkles } from 'lucide-react';
import { ASTANA_CLINIC_CONFIG } from '@/src/config/astanaClinic';
import { AstanaTrackingData, AstanaLeadFormData } from '@/src/types/astanaClinic';
import { submitAstanaLead } from '@/src/utils/astanaTracking';

interface OfferCtaProps {
  tracking: AstanaTrackingData;
  onSuccess: (data: { name: string; phone: string; whatsappUrl: string }) => void;
  onOpenPrivacy: () => void;
}

/**
 * Разворот 5: Финальный призыв к действию (CTA).
 * Двухколоночная структура в премиальном оформлении со стеклянными рамками:
 * - Слева: Заголовок (жирным), подзаголовок (не жирным), стильная стеклянная ценовая плашка (10 000 тг ➔ 5 000 тг).
 * - Справа: Стеклянная карточка «Запись на сеанс», поля ввода (Имя, Телефон), кнопка.
 * - В самом конце: Финальный слоган/призыв.
 */
export const AstanaOfferCta: React.FC<OfferCtaProps> = ({ tracking, onSuccess, onOpenPrivacy }) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isAgreed, setIsAgreed] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Форматирует ввод номера под казахстанский стандарт +7 (7XX) XXX-XX-XX
   */
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');

    if (input.startsWith('8')) {
      input = '7' + input.slice(1);
    } else if (!input.startsWith('7') && input.length > 0) {
      input = '7' + input;
    }

    input = input.substring(0, 11);

    let formatted = '';
    if (input.length > 0) {
      formatted = '+7';
      if (input.length > 1) {
        formatted += ' (' + input.substring(1, 4);
      }
      if (input.length >= 4) {
        formatted += ') ';
      }
      if (input.length > 4) {
        formatted += input.substring(4, 7);
      }
      if (input.length >= 7) {
        formatted += '-';
      }
      if (input.length > 7) {
        formatted += input.substring(7, 9);
      }
      if (input.length >= 9) {
        formatted += '-';
      }
      if (input.length > 9) {
        formatted += input.substring(9, 11);
      }
    }

    setPhone(formatted);
    if (errorMessage) setErrorMessage(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setErrorMessage('Пожалуйста, укажите ваше имя');
      return;
    }

    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 11) {
      setErrorMessage('Пожалуйста, введите номер телефона: +7 (7XX) XXX-XX-XX');
      return;
    }

    if (!isAgreed) {
      setErrorMessage('Необходимо согласие с политикой конфиденциальности');
      return;
    }

    setIsSubmitting(true);

    const leadData: AstanaLeadFormData = {
      name: trimmedName,
      phone: phone.trim(),
      source: 'Форма записи со скидкой 50%',
    };

    try {
      const result = await submitAstanaLead(leadData, tracking);

      onSuccess({
        name: leadData.name,
        phone: leadData.phone,
        whatsappUrl: result.whatsappFallbackUrl,
      });

      setName('');
      setPhone('');
    } catch {
      const fallbackUrl = `https://wa.me/${ASTANA_CLINIC_CONFIG.whatsappPhone}?text=${encodeURIComponent(
        `Здравствуйте! Меня зовут ${leadData.name}, хочу записаться на 20-минутный сеанс на биохакинг-платформе со скидкой 50% (5 000 ₸). Телефон: ${leadData.phone}`
      )}`;

      onSuccess({
        name: leadData.name,
        phone: leadData.phone,
        whatsappUrl: fallbackUrl,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking-form" className="py-20 sm:py-28 bg-[#FAFCFB] relative overflow-hidden">
      {/* Декоративная фоновая текстура сетки */}
      <div className="absolute inset-0 bg-[radial-gradient(#0A2B1D_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none" />

      {/* Декоративное мягкое свечение на фоне */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-200/50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Главная карточка блока со стеклянной рамкой */}
        <div className="rounded-[36px] bg-gradient-to-b from-white via-white/95 to-[#F4FAF6]/90 backdrop-blur-xl border border-white/90 shadow-2xl shadow-emerald-950/10 p-7 sm:p-12 lg:p-14 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Левая колонка: Заголовок, подзаголовок и стильная стеклянная плашка цен */}
            <div className="lg:col-span-7 space-y-7">
              
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#0A2B1D] tracking-tight leading-[1.2]">
                  Не откладывайте себя «на потом» и не привыкайте жить вполсилы.
                </h2>
                
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                  Подарите себе глубокую перезагрузку по специальной цене.
                </p>
              </div>

              {/* Стильная стеклянная визитка цены */}
              <div className="pt-2">
                <div className="inline-flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-[24px] bg-gradient-to-br from-white via-[#F4FAF6] to-[#EEF7F2] border border-white/90 shadow-md shadow-emerald-950/5">
                  
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex flex-col whitespace-nowrap">
                      <span className="text-xs sm:text-sm font-semibold text-slate-400 line-through decoration-slate-400 decoration-2">
                        10 000 тг
                      </span>
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#064E3B] tracking-tight whitespace-nowrap">
                        5 000 тг
                      </span>
                    </div>

                    <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-sm shadow-emerald-800/25 shrink-0">
                      -50%
                    </span>
                  </div>

                  <div className="hidden sm:block h-10 w-px bg-emerald-200" />

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-900 font-medium">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Специальная цена на первый сеанс</span>
                  </div>

                </div>
              </div>

            </div>

            {/* Правая колонка: Форма в стеклянной плашке */}
            <div className="lg:col-span-5">
              <div className="p-7 sm:p-9 rounded-[30px] bg-gradient-to-b from-white via-[#F2F8F4] to-emerald-50/60 backdrop-blur-md border border-white/90 shadow-xl shadow-emerald-950/8">
                
                {/* Заголовок над полями формы */}
                <h3 className="text-xl sm:text-2xl font-black text-[#0A2B1D] text-center mb-6">
                  Запись на сеанс
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
                      {errorMessage}
                    </div>
                  )}

                  {/* Поле Имя */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={handleNameChange}
                      placeholder="Имя"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300/90 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-[#0A2B1D] placeholder:text-slate-400 bg-white transition-all text-base shadow-2xs"
                    />
                  </div>

                  {/* Поле Телефон */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+7 (7XX) XXX-XX-XX"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300/90 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-[#0A2B1D] placeholder:text-slate-400 bg-white transition-all text-base font-medium shadow-2xs"
                    />
                  </div>

                  {/* Чекбокс политики */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      id="lead-agreement"
                      type="checkbox"
                      checked={isAgreed}
                      onChange={(e) => setIsAgreed(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label htmlFor="lead-agreement" className="text-xs text-slate-600 leading-normal cursor-pointer select-none">
                      Нажимая кнопку, вы соглашаетесь с{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="text-emerald-700 underline font-semibold hover:text-emerald-800 cursor-pointer"
                      >
                        политикой конфиденциальности
                      </button>
                    </label>
                  </div>

                  {/* Кнопка записи */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-4 px-6 rounded-xl font-extrabold text-base text-white bg-gradient-to-r from-[#0E6244] to-[#137A55] hover:from-[#0B5037] hover:to-[#0F6547] active:scale-[0.98] transition-all shadow-md shadow-emerald-900/25 flex items-center justify-center cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? 'Отправка...' : 'Записаться со скидкой 50%'}
                  </button>
                </form>

              </div>
            </div>

          </div>
        </div>

        {/* Финальная мысль (слоган) строго по ТЗ */}
        <div className="mt-14 text-center max-w-3xl mx-auto">
          <p className="text-base sm:text-lg font-bold text-[#0A2B1D] leading-snug">
            Здоровье — это фундамент, на котором держится всё: ваше дело, семья и радость каждого дня.
          </p>
        </div>

      </div>
    </section>
  );
};