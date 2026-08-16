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
          <h3 className="text-xl font-extrabold text-slate-950">Политика конфиденциальности</h3>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            <strong className="text-slate-900">1. Сбор персональных данных:</strong> Заполняя любую форму заявки на сайте (запись на тест-драйв или расчет окупаемости), вы добровольно предоставляете свое имя, номер контактного телефона и сферу деятельности.
          </p>
          <p>
            <strong className="text-slate-900">2. Цель обработки данных:</strong> Предоставленные данные используются исключительно для оперативной связи официального представителя OlyLife в Ташкенте с вами, согласования удобного времени демонстрации оборудования и отправки расчетов бизнес-модели.
          </p>
          <p>
            <strong className="text-slate-900">3. Защита и нераспространение:</strong> Мы строго соблюдаем конфиденциальность. Ваши контактные данные никогда не передаются сторонним организациям, не публикуются в открытом доступе и не используются для массовых нежелательных рассылок (спама).
          </p>
          <p>
            <strong className="text-slate-900">4. Отзыв согласия:</strong> Вы можете в любой момент отозвать согласие на хранение и обработку персональных данных, уведомив менеджера при телефонном или мессенджер-разговоре.
          </p>
        </div>
      </div>
    </div>
  );
};
