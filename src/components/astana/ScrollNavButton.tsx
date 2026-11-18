import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

/**
 * Интерактивная Liquid Glass кнопка быстрой прокрутки страницы:
 * - Скрыта в состоянии покоя (когда сайт остановлен)
 * - Появляется при начале прокрутки
 * - При скролле вниз появляется стрелка ВВЕРХ (чтобы поднять сайт наверх)
 * - При скролле вверх появляется стрелка ВНИЗ (чтобы опустить сайт до конца к контактам и форме)
 * - Если скролл останавливается — плавно скрывается
 * - Выполнена в едином фирменном стиле Liquid Glass (матовое стекло, блик, парящая тень)
 */
export const AstanaScrollNavButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const [isHovered, setIsHovered] = useState(false);

  const lastScrollY = useRef(0);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Показываем кнопку только когда страница уже немного прокручена (больше 80px)
      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY.current) {
          // Крутим вниз -> стрелочка вверх, чтобы поднять сайт
          setScrollDirection('down');
        } else if (currentScrollY < lastScrollY.current) {
          // Крутим вверх -> стрелочка вниз, чтобы опустить сайт до конца
          setScrollDirection('up');
        }

        // Показываем кнопку
        setIsVisible(true);

        // Сбрасываем предыдущий таймер скрытия
        if (hideTimeout.current) {
          clearTimeout(hideTimeout.current);
        }

        // Плавное исчезновение через 1.4 секунды после остановки скролла
        hideTimeout.current = setTimeout(() => {
          setIsVisible(false);
        }, 1400);
      } else {
        // У самого верха страницы кнопка не нужна
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  const handleClick = () => {
    if (scrollDirection === 'down') {
      // Поднять сайт наверх
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Опустить сайт вниз до конца
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const shouldShow = isVisible || isHovered;

  return (
    <div
      className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 ease-out select-none ${
        shouldShow
          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={handleClick}
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white/85 hover:bg-white backdrop-blur-xl border border-white/90 shadow-xl shadow-emerald-950/15 flex items-center justify-center text-[#0A2B1D] hover:text-emerald-700 active:scale-90 transition-all duration-200 cursor-pointer group"
        title={scrollDirection === 'down' ? 'Поднять сайт наверх' : 'Опустить сайт вниз к форме и контактам'}
        aria-label={scrollDirection === 'down' ? 'Поднять сайт наверх' : 'Опустить сайт вниз к форме и контактам'}
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          {scrollDirection === 'down' ? (
            <ArrowUp className="w-5 h-5 text-emerald-900 transition-transform duration-300 group-hover:-translate-y-0.5" />
          ) : (
            <ArrowDown className="w-5 h-5 text-emerald-900 transition-transform duration-300 group-hover:translate-y-0.5" />
          )}
        </div>
      </button>
    </div>
  );
};
