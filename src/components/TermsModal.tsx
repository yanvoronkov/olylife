import React from "react";
import { X, FileText } from "lucide-react";
import { CityConfig } from "../config/cities";
import { Locale, getCurrentLocale } from "../config/translations";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  city?: CityConfig;
  locale?: Locale;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, city, locale }) => {
  if (!isOpen) return null;

  const currentLocale = locale || getCurrentLocale();
  const isKg = currentLocale === "kg";
  const isBishkek = city?.id === "bishkek" || isKg;
  
  const locationWithCountry = isBishkek
    ? "Бишкеке (Кыргызская Республика)"
    : "Ташкенте (Республика Узбекистан)";
  const locationCity = isBishkek ? "Бишкеке" : "Ташкенте";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl max-w-2xl w-full text-slate-900 relative shadow-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Fixed Header with Close Button */}
        <div className="flex items-start sm:items-center justify-between p-3.5 sm:p-5 border-b border-slate-100 bg-white/95 backdrop-blur-sm shrink-0 relative z-10 gap-3">
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#EBF7F0] text-[#1E9646] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-lg md:text-xl font-extrabold text-slate-950 leading-tight">
                {isKg ? "Сайтты жана кызматты колдонуу шарттары" : "Условия использования сайта и сервиса"}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 transition-all cursor-pointer shrink-0 shadow-xs"
            aria-label={isKg ? "Жабуу" : "Закрыть"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {isKg ? (
            /* ======================================================== */
            /* ТЕКСТ НА КЫРГЫЗСКОМ ТИЛИ (КЫРГЫЗСТАН / БИШКЕК)           */
            /* ======================================================== */
            <>
              <p>
                <strong className="text-slate-900">1. Жалпы жоболор:</strong> Бул Шарттар ушул маалыматтык ресурсту пайдалануу тартибин жана Бишкек шаарында (Кыргыз Республикасы) OlyLife жабдуусунун таанышуу тест‑драйвына жазылууну жөнгө салат.
              </p>
              <p>
                <strong className="text-slate-900">2. Продукциянын макамы:</strong> OlyLife жабдуусу тиричилик багытындагы ден соолукту чыңдоочу (Wellness) продукциясынын категориясына кирет жана жеке физио‑кам көрүүгө, эс алууга жана чарчоону басууга арналган. Продукция медициналык жабдуу же дары‑дармек каражаты болуп саналбайт жана аны сатып алуу же көрсөтүү үчүн медициналык лицензия талап кылынбайт.
              </p>
              <p>
                <strong className="text-slate-900">3. Тест‑драйвды өткөрүү шарттары:</strong> Бишкек шаарындагы демо‑мейкиндикте таанышуу тест‑драйвына жазылуу акысыз болуп саналат. Демо‑сеанска катышуу колдонуучуга жабдууну сатып алуу милдеттенмесин жүктөбөйт.
              </p>
              <p>
                <strong className="text-slate-900">4. Финансылык көрсөткүчтөр жана кирешелер:</strong> Сайтта же видеоматериалдарда көрсөтүлгөн бардык финансылык көрсөткүчтөр бизнес‑моделдөөнү көрсөтүү максатында гана берилген. Адистин иш жүзүндөгү кирешеси кызмат көрсөтүүлөрдүн баасына, иш графигине жана кардарлар базасына жараша болот.
              </p>
              <p>
                <strong className="text-slate-900">5. Интеллектуалдык менчик:</strong> Сайтта жайгаштырылган бардык тексттик, графикалык жана видео материалдар автордук укук менен корголгон. Материалдарды уруксатсыз көчүрүүгө же жайылтууга тыюу салынат.
              </p>
            </>
          ) : (
            /* ======================================================== */
            /* ТЕКСТ НА РУССКОМ ЯЗЫКЕ                                  */
            /* ======================================================== */
            <>
              <p>
                <strong className="text-slate-900">1. Общие положения:</strong> Настоящие Условия регулируют порядок использования данного информационного ресурса и запись на ознакомительный тест-драйв оборудования OlyLife в {locationWithCountry}.
              </p>
              <p>
                <strong className="text-slate-900">2. Статус продукции:</strong> Оборудование OlyLife относится к бытовой категории оздоровительной продукции (Wellness) и предназначено для индивидуального физио-ухода, релаксации и снятия усталости. Продукция не является медицинским оборудованием или лекарственным средством и не требует наличия медицинской лицензии для приобретения или демонстрации.
              </p>
              <p>
                <strong className="text-slate-900">3. Условия проведения тест-драйва:</strong> Запись на ознакомительный тест-драйв в демонстрационном пространстве в {locationCity} является бесплатной. Посещение демо-сеанса не обязывает пользователя к покупке оборудования.
              </p>
              <p>
                <strong className="text-slate-900">4. Финансовые показатели и доходы:</strong> Все финансовые показатели, упоминаемые на сайте или в видеоматериалах, носят исключительно иллюстративный характер бизнес-моделирования. Фактический доход специалиста зависит от расценок на услуги, графика работы и клиентской базы.
              </p>
              <p>
                <strong className="text-slate-900">5. Интеллектуальная собственность:</strong> Все текстовые, графические и видеоматериалы, размещенные на сайте, защищены авторским правом. Несанкционированное копирование материалов запрещено.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
