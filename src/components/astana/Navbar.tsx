import React, { useState, useEffect, useRef } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { ASTANA_CLINIC_CONFIG } from '@/src/config/astanaClinic';

/**
 * Компонент верхней навигационной панели (Шапка) для лендинга Астаны.
 * Выделенная стеклянная плавающая капсула (Glassmorphism):
 * - Мягкое матовое стекло (backdrop-blur-xl, white/90)
 * - Четкая рамка со стеклянным бликом (border-white/80, shadow-lg)
 * - Умное скрытие: при скролле вниз аккуратно сворачивается вверх, открывая контент,
 *   а при подъеме вверх (скролле вверх) плавно показывается.
 * - У самого верха страницы (до 60px) всегда видна.
 */
export const AstanaNavbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY <= 60) {
            // У самого верха страницы всегда открыта
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            // Скроллим вниз — аккуратно сворачиваем шапку
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            // Скроллим вверх (поднимаем сайт) — показываем шапку
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-2 sm:top-3 z-50 w-full px-3 sm:px-6 pointer-events-none transition-all duration-300 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
    }`}>
      <div className="max-w-7xl mx-auto rounded-[24px] sm:rounded-full bg-white/90 backdrop-blur-xl border border-white/90 shadow-xl shadow-emerald-950/8 px-4 sm:px-7 py-3 flex items-center justify-between pointer-events-auto transition-all duration-300">
        
        {/* Логотип клиники */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center group focus:outline-none">
            <img
              src="/images/osam-logo.png"
              alt="Клиника OSAM"
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </a>
          {/* Город на всех экранах, кроме мобильных */}
          <div className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A2B1D]/85">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
            <span>Астана город</span>
          </div>
        </div>

        {/* Правая часть: Телефон и «Написать в WhatsApp» */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Телефон в элегантном овале (вровень по высоте с WhatsApp, без кружка фона за иконкой) */}
          <a
            href={`tel:+${ASTANA_CLINIC_CONFIG.phoneRaw}`}
            className="h-9 sm:h-10 px-3 sm:px-4 rounded-full bg-emerald-50/80 hover:bg-emerald-100/70 border border-emerald-200/70 text-xs sm:text-sm font-bold text-[#0A2B1D] transition-all shadow-2xs inline-flex items-center justify-center gap-2 group"
            title="Позвонить в клинику"
          >
            <Phone className="w-4 h-4 text-emerald-800 shrink-0 group-hover:scale-105 transition-transform" />
            <span className="hidden md:inline">{ASTANA_CLINIC_CONFIG.phoneFormatted}</span>
          </a>

          {/* Написать в WhatsApp (по высоте строго вровень, без мигающей точки) */}
          <a
            href={`https://wa.me/${ASTANA_CLINIC_CONFIG.whatsappPhone}?text=${encodeURIComponent(ASTANA_CLINIC_CONFIG.whatsappDefaultMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 sm:h-10 px-3.5 sm:px-5 rounded-full text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#0E6244] to-[#14835A] hover:from-[#0B5037] hover:to-[#10704D] active:scale-95 transition-all shadow-md shadow-emerald-900/25 inline-flex items-center justify-center gap-2"
            title="Написать в WhatsApp"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Написать в WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

        </div>

      </div>
    </header>
  );
};