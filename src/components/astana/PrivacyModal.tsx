import React from 'react';
import { X, Shield } from 'lucide-react';
import { ASTANA_CLINIC_CONFIG } from '@/src/config/astanaClinic';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Модальное окно с текстом Политики конфиденциальности клиники OSAM в Астане
 * по Закону РК «О персональных данных и их защите».
 */
export const AstanaPrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg sm:text-xl font-bold text-[#0A2B1D]">
              Политика конфиденциальности
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto py-5 pr-2 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Настоящая Политика обработки персональных данных регулирует порядок сбора, хранения и
            использования сведений, предоставляемых пользователями сайта {ASTANA_CLINIC_CONFIG.legal.legalEntity}{' '}
            (далее — «Клиника»), действующей на основании медицинской лицензии №{ASTANA_CLINIC_CONFIG.legal.licenseNumber}.
          </p>

          <h4 className="font-bold text-[#0A2B1D] text-sm">1. Общие положения</h4>
          <p>
            1.1. Клиника осуществляет обработку персональных данных в строгом соответствии с Законом
            Республики Казахстан от 21 мая 2013 года № 94-V «О персональных данных и их защите».
          </p>
          <p>
            1.2. Оставляя заявку на сайте (заполняя поля «Имя» и «Телефон»), Пользователь выражает свое
            полное и безоговорочное согласие на обработку его данных.
          </p>

          <h4 className="font-bold text-[#0A2B1D] text-sm">2. Состав собираемых данных</h4>
          <p>
            Клиника обрабатывает следующие персональные данные:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Имя пользователя;</li>
            <li>Контактный номер телефона;</li>
            <li>Маркетинговые метки и технические данные (cookie, UTM-метки, IP-адрес, тип браузера).</li>
          </ul>

          <h4 className="font-bold text-[#0A2B1D] text-sm">3. Цели обработки</h4>
          <p>
            Персональные данные собираются исключительно в целях:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Организации предварительной записи на оздоровительный сеанс в клинике;</li>
            <li>Информирования о деталях визита, подтверждения времени через звонок или мессенджер WhatsApp;</li>
            <li>Предоставления персональной скидки 50% на первый сеанс.</li>
          </ul>

          <h4 className="font-bold text-[#0A2B1D] text-sm">4. Защита данных</h4>
          <p>
            Клиника принимает все необходимые технические и организационные меры для защиты персональных
            данных от неправомерного доступа, изменения, раскрытия или уничтожения. Передача данных третьим
            лицам не осуществляется, за исключением случаев, предусмотренных законодательством РК.
          </p>

          <h4 className="font-bold text-[#0A2B1D] text-sm">5. Реквизиты оператора данных</h4>
          <p>
            {ASTANA_CLINIC_CONFIG.legal.legalEntity}<br />
            Лицензия на медицинскую деятельность №{ASTANA_CLINIC_CONFIG.legal.licenseNumber} от {ASTANA_CLINIC_CONFIG.legal.licenseDate}<br />
            Адрес: {ASTANA_CLINIC_CONFIG.fullAddress}<br />
            Телефон: {ASTANA_CLINIC_CONFIG.phoneFormatted}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Понятно
          </button>
        </div>

      </div>
    </div>
  );
};
