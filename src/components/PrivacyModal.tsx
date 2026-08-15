import React from "react";
import { X, ShieldCheck } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#051c10] border border-emerald-700/80 rounded-3xl max-w-2xl w-full p-6 text-white relative shadow-2xl max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950 text-emerald-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-6 h-6 text-lime-400" />
          <h3 className="text-xl font-bold">Политика конфиденциальности & Условия</h3>
        </div>

        <div className="space-y-4 text-xs text-emerald-200/90 leading-relaxed">
          <p>
            <strong>1. Сбор и использование персональных данных:</strong> Заполняя форму записи на тест-драйв OlyLife в Ташкенте, вы даете согласие на обработку указанного имени, номера телефона или логина Telegram исключительно с целью связи с представителем OlyLife Uzbekistan.
          </p>
          <p>
            <strong>2. Конфиденциальность:</strong> Мы не передаем ваши контактные данные третьим лицам и не используем их для спама.
          </p>
          <p>
            <strong>3. Статус продукции:</strong> Оборудование OlyLife относится к бытовой категории продукции Wellness для физического ухода и оздоровления. Продукция не является медицинским оборудованием и не предназначена для лечения или диагностики заболеваний.
          </p>
          <p>
            <strong>4. Оговорка по доходам:</strong> Все расчеты в калькуляторе окупаемости являются ориентировочными и зависят от текущего потока клиентов в вашем кабинете.
          </p>
        </div>
      </div>
    </div>
  );
};
