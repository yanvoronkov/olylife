import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Подняться наверх"
      title="Наверх"
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-[#1E9646] text-[#0E5E2B] hover:text-white border border-[#C3EBD4] hover:border-[#1E9646] shadow-lg shadow-[#0E5E2B]/10 hover:shadow-xl hover:shadow-[#1E9646]/30 backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 group ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </button>
  );
};
