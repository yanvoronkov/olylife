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
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/osam-logo.png"
                alt="Клиника OSAM"
                className="h-10 w-auto bg-white/95 p-1 rounded-lg"
              />
              <div>
                <span className="text-white font-bold text-base block">
                  {ASTANA_CLINIC_CONFIG.clinicFullName}
                </span>
                <span className="text-xs text-emerald-300/80 block">
                  {ASTANA_CLINIC_CONFIG.hostClinicName} • г. {ASTANA_CLINIC_CONFIG.city}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-200/70 leading-relaxed max-w-sm">
              Инновационные аппаратные методики снятия хронического стресса, нормализации лимфотока
              и восстановления энергетического баланса организма.
            </p>
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

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60">
          <p>© {new Date().getFullYear()} {ASTANA_CLINIC_CONFIG.legal.legalEntity}. Все права защищены.</p>

          <button
            type="button"
            onClick={onOpenPrivacy}
            className="flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Политика конфиденциальности</span>
          </button>
        </div>

        <div className="mt-6 text-center text-[11px] text-emerald-400/50 leading-relaxed border-t border-emerald-900/40 pt-4">
          Информация на сайте не является публичной офертой. Имеются противопоказания (беременность, наличие кардиостимулятора, острые воспалительные процессы). Требуется консультация специалиста клиники.
        </div>

      </div>
    </footer>
  );
};
