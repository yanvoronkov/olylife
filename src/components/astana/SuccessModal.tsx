import React from 'react';
import { CheckCircle2, MessageCircle, MapPin, Calendar, X, Sparkles } from 'lucide-react';
import { ASTANA_CLINIC_CONFIG } from '@/src/config/astanaClinic';

interface SuccessModalProps {
  isOpen: boolean;
  name: string;
  phone: string;
  whatsappUrl: string;
  onClose: () => void;
}

/**
 * Модальное окно подтверждения заявки для Астаны.
 */
export const AstanaSuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  name,
  phone,
  whatsappUrl,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-emerald-100 overflow-hidden text-center">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Закрыть окно"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="text-2xl font-extrabold text-[#0A2B1D]">
          {name ? `${name}, спасибо за заявку!` : 'Спасибо за вашу заявку!'}
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Скидка <strong className="text-emerald-700">50% зафиксирована</strong> за номером{' '}
          <span className="font-semibold">{phone}</span>.
        </p>

        <div className="my-6 p-4 rounded-2xl bg-[#F0F7F2] border border-emerald-200/80 text-left space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60 font-semibold text-[#064E3B]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Стоимость сеанса
            </span>
            <span className="text-base font-extrabold text-[#064E3B]">
              {ASTANA_CLINIC_CONFIG.prices.discountPrice.toLocaleString('ru-RU')} ₸
            </span>
          </div>

          <div className="flex items-start gap-2 text-slate-700">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{ASTANA_CLINIC_CONFIG.fullAddress}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-700">
            <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{ASTANA_CLINIC_CONFIG.workingHours}</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-4">
          Чтобы администратор мгновенно подобрал комфортное время сеанса, нажмите кнопку ниже:
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 transition-all duration-200 text-sm sm:text-base cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span>Подтвердить запись в WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 text-xs font-semibold text-slate-400 hover:text-slate-600 py-1 transition-colors cursor-pointer"
        >
          Вернуться на сайт
        </button>

      </div>
    </div>
  );
};
