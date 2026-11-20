import React from 'react';
import { ASTANA_CLINIC_CONFIG } from '@/src/config/astanaClinic';
import { ShieldCheck, MapPin, Phone, FileText } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
}

/**
 * Подвал сайта (Footer) для лендинга Астаны.
 */
export const AstanaFooter: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  return (
    <footer className="bg-[#0A2B1D] text-emerald-100/90 pt-14 pb-10 border-t border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-emerald-800/40">
          
          {/* Колонка 1: Бренд (логотип клиники, политика конфиденциальности, копирайт) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6 md:space-y-0">
            <div>
              <img
                src="/images/osam-logo.png"
                alt="Клиника OSAM"
                className="h-11 sm:h-12 w-auto bg-white/95 p-1.5 rounded-xl shrink-0 shadow-sm"
              />
            </div>

            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors cursor-pointer group"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-300" />
                <span className="underline underline-offset-4 decoration-emerald-700 hover:decoration-white">
                  Политика конфиденциальности
                </span>
              </button>
              <p className="text-emerald-300/60 text-[11px] sm:text-xs">
                © {new Date().getFullYear()} {ASTANA_CLINIC_CONFIG.legal.legalEntity}. Все права защищены.
              </p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Контакты в Астане
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{ASTANA_CLINIC_CONFIG.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:+${ASTANA_CLINIC_CONFIG.phoneRaw}`}
                  className="text-white hover:text-emerald-300 transition-colors font-medium"
                >
                  {ASTANA_CLINIC_CONFIG.phoneFormatted}
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Официальная деятельность
            </h4>
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{ASTANA_CLINIC_CONFIG.legal.legalEntity}</span>
              </div>
              <p className="text-emerald-200/80">
                Номер лицензии: <strong className="text-white">{ASTANA_CLINIC_CONFIG.legal.licenseNumber}</strong>
              </p>
              <p className="text-emerald-200/80">
                Дата выдачи: {ASTANA_CLINIC_CONFIG.legal.licenseDate}
              </p>
              <p className="text-emerald-300/60 text-[11px] leading-tight">
                {ASTANA_CLINIC_CONFIG.legal.authority}
              </p>
            </div>
          </div>

        </div>

        {/* Предупреждение о противопоказаниях и оферте */}
        <div className="pt-6 text-center text-[11px] text-emerald-400/50 leading-relaxed max-w-4xl mx-auto">
          Информация на сайте не является публичной офертой. Имеются противопоказания (беременность, наличие кардиостимулятора, острые воспалительные процессы). Требуется консультация специалиста клиники.
        </div>

      </div>
    </footer>
  );
};
