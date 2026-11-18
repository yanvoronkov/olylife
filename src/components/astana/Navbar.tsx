import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { ASTANA_CLINIC_CONFIG } from '@/src/config/astanaClinic';

/**
 * Компонент верхней навигационной панели (Шапка) для лендинга Астаны.
 * Выделенная стеклянная плавающая капсула (Glassmorphism):
 * - Мягкое матовое стекло (backdrop-blur-xl, white/90)
 * - Четкая рамка со стеклянным бликом (border-white/80, shadow-lg)
 * - Логотип клиники, телефон в элегантном бейдже и кнопка «Написать в WhatsApp» с онлайн-индикатором.
 */
export const AstanaNavbar: React.FC = () => {
  return (
    <header className="sticky top-2 sm:top-3 z-50 w-full px-3 sm:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto rounded-[24px] sm:rounded-full bg-white/90 backdrop-blur-xl border border-white/90 shadow-xl shadow-emerald-950/8 px-4 sm:px-7 py-3 flex items-center justify-between pointer-events-auto transition-all duration-300">
        
        {/* Логотип клиники */}
        <div className="flex items-center">
          <a href="#" className="flex items-center group focus:outline-none">
            <img
              src="/images/osam-logo.png"
              alt="Клиника OSAM"
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </a>
        </div>

        {/* Правая часть: Телефон и «Написать в WhatsApp» */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Телефон в стильном бейдже */}
          <a
            href={`tel:+${ASTANA_CLINIC_CONFIG.phoneRaw}`}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-emerald-50/80 hover:bg-emerald-100/70 border border-emerald-200/70 text-xs sm:text-sm font-bold text-[#0A2B1D] transition-all shadow-2xs group"
            title="Позвонить в клинику"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-200/80 text-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span className="hidden md:inline">{ASTANA_CLINIC_CONFIG.phoneFormatted}</span>
          </a>

          {/* Написать в WhatsApp с акцентным градиентом */}
          <a
            href={`https://wa.me/${ASTANA_CLINIC_CONFIG.whatsappPhone}?text=${encodeURIComponent(ASTANA_CLINIC_CONFIG.whatsappDefaultMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#0E6244] to-[#14835A] hover:from-[#0B5037] hover:to-[#10704D] active:scale-95 transition-all shadow-md shadow-emerald-900/25"
            title="Написать в WhatsApp"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-200" />
            </span>
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Написать в WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

        </div>

      </div>
    </header>
  );
};