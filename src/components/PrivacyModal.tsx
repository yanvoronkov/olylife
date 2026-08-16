import React from "react";
import { X, ShieldCheck } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-slate-900 relative shadow-2xl max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#EBF7F0] text-[#1E9646] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-950">Политика конфиденциальности & Условия</h3>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            <strong className="text-slate-900">1. Сбор и использование персональных данных:</strong> Заполняя форму записи на тест-драйв OlyLife в Ташкенте, вы даете согласие на обработку указанного имени, номера телефона или логина Telegram исключительно с целью связи с представителем OlyLife Uzbekistan.
          </p>
          <p>
            <strong className="text-slate-900">2. Конфиденциальность:</strong> Мы не передаем ваши контактные данные третьим лицам и не используем их для спама.
          </p>
          <p>
            <strong className="text-slate-900">3. Статус продукции:</strong> Оборудование OlyLife относится к бытовой категории продукции Wellness для физического ухода и оздоровления. Продукция не является медицинским оборудованием и не предназначена для лечения или диагностики заболеваний.
          </p>
          <p>
            <strong className="text-slate-900">4. Оговорка по доходам:</strong> Все расчеты в калькуляторе окупаемости являются ориентировочными и зависят от текущего потока клиентов в вашем кабинете.
          </p>
        </div>
      </div>
    </div>
  );
};
