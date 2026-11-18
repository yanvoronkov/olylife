import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { ASTANA_CLINIC_CONFIG } from '@/src/config/astanaClinic';

/**
 * Компонент верхней навигационной панели (Шапка) для лендинга Астаны.
 * Содержит логотип клиники, телефон и кнопку «Написать в WhatsApp».
 * Адаптирован под мобильные устройства, планшеты и десктопы.
 */
export const AstanaNavbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#F0F7F2]/95 backdrop-blur-md border-b border-[#0A2B1D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Логотип клиники */}
          <div className="flex items-center">
            <a href="#" className="flex items-center group focus:outline-none">
              <img
                src="/images/osam-logo.png"
                alt="Клиника OSAM"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Правая часть: Телефон и «Написать в WhatsApp» */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Телефон */}
            <a
              href={`tel:+${ASTANA_CLINIC_CONFIG.phoneRaw}`}
              className="flex items-center gap-2 text-sm font-bold text-[#0A2B1D] hover:text-emerald-700 transition-colors p-2 sm:px-3 sm:py-2 rounded-xl hover:bg-emerald-100/50"
              title="Позвонить в клинику"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Phone className="w-4 h-4" />
              </div>
              <span className="hidden md:inline">{ASTANA_CLINIC_CONFIG.phoneFormatted}</span>
            </a>

            {/* Написать в WhatsApp */}
            <a
              href={`https://wa.me/${ASTANA_CLINIC_CONFIG.whatsappPhone}?text=${encodeURIComponent(ASTANA_CLINIC_CONFIG.whatsappDefaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all shadow-sm"
              title="Написать в WhatsApp"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Написать в WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
