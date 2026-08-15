import React, { useState, useEffect } from "react";
import { CheckCircle2, Sparkles, X } from "lucide-react";

const RECENT_ACTIVITIES = [
  { name: "Азиза (Косметолог)", location: "Ташкент, Ц-1", time: "2 мин назад" },
  { name: "Шохрух (Массажист)", location: "Ташкент, Юнусабад", time: "5 мин назад" },
  { name: "Елена (Телесный терапевт)", location: "Ташкент, Мирабад", time: "12 мин назад" },
  { name: "Бахтиёр (Тренер)", location: "Ташкент, Чиланзар", time: "25 мин назад" },
];

export const LiveSocialProofTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const showInterval = setInterval(() => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setCurrentIndex((prev) => (prev + 1) % RECENT_ACTIVITIES.length);
      }, 5000);
    }, 12000);

    // First appearance after 3 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setCurrentIndex((prev) => (prev + 1) % RECENT_ACTIVITIES.length);
      }, 5000);
    }, 3000);

    return () => {
      clearInterval(showInterval);
      clearTimeout(initialTimer);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const current = RECENT_ACTIVITIES[currentIndex];

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-xs sm:max-w-sm bg-[#062916]/95 border border-lime-500/40 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md text-white animate-bounce-short flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-lime-400 text-emerald-950 flex items-center justify-center shrink-0 font-bold shadow-md shadow-lime-500/30">
        <Sparkles className="w-5 h-5 animate-spin-slow" />
      </div>

      <div className="flex-1 text-xs">
        <div className="flex items-center gap-1 font-bold text-lime-300">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Новая запись на тест-драйв</span>
        </div>
        <p className="text-white font-medium">{current.name}</p>
        <p className="text-[10px] text-emerald-300/80">{current.location} • {current.time}</p>
      </div>

      <button
        onClick={() => setIsDismissed(true)}
        className="text-emerald-400 hover:text-white p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
