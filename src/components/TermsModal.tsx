import React from "react";
import { X, FileText } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
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
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-950">Условия использования сайта и сервиса</h3>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            <strong className="text-slate-900">1. Общие положения:</strong> Настоящие Условия регулируют порядок использования данного информационного ресурса и запись на ознакомительный тест-драйв оборудования OlyLife в Ташкенте (Республика Узбекистан).
          </p>
          <p>
            <strong className="text-slate-900">2. Статус продукции:</strong> Оборудование OlyLife относится к бытовой категории оздоровительной продукции (Wellness) и предназначено для индивидуального физио-ухода, релаксации и снятия усталости. Продукция не является медицинским оборудованием или лекарственным средством и не требует наличия медицинской лицензии для приобретения или демонстрации.
          </p>
          <p>
            <strong className="text-slate-900">3. Условия проведения тест-драйва:</strong> Запись на ознакомительный тест-драйв в демонстрационном пространстве в Ташкенте является бесплатной. Посещение демо-сеанса не обязывает пользователя к покупке оборудования.
          </p>
          <p>
            <strong className="text-slate-900">4. Расчет окупаемости и доходы:</strong> Все финансовые показатели, упоминаемые на сайте или формируемые калькулятором окупаемости, носят исключительно иллюстративный характер бизнес-моделирования. Фактический доход специалиста зависит от расценок на услуги, графика работы и клиентской базы.
          </p>
          <p>
            <strong className="text-slate-900">5. Интеллектуальная собственность:</strong> Все текстовые, графические и видеоматериалы, размещенные на сайте, защищены авторским правом. Несанкционированное копирование материалов запрещено.
          </p>
        </div>
      </div>
    </div>
  );
};
