import React from "react";
import { CheckCircle2, Clock, X } from "lucide-react";
import { LeadRecord } from "../types";
import { CityConfig } from "../config/cities";
import { Translations } from "../config/translations";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: LeadRecord | null;
  city?: CityConfig;
  managerCity?: string;
  translations?: Translations;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  lead,
  city,
  managerCity,
  translations,
}) => {
  if (!isOpen) return null;

  const isAlmaty = city?.id === "almaty" || lead?.city === "almaty";
  const effectiveManagerCity = managerCity || city?.successModalManagerCity || (isAlmaty ? "в Алматы" : "в Бишкеке");
  const timeZone = city?.timeZone || (isAlmaty ? "Asia/Almaty" : "Asia/Bishkek");
  const timeZoneLabel = city?.timeZoneLabel || (isAlmaty ? "ALMT" : "KGT");

  const title = translations?.successModal?.title || "Заявка успешно принята! 🚀";
  const name = lead?.name || "";
  const message = translations?.successModal?.getMessage
    ? translations.successModal.getMessage(name, effectiveManagerCity)
    : `Спасибо, ${name || "уважаемый специалист"}! Наш менеджер ${effectiveManagerCity} уже получил уведомление и свяжется с вами для согласования времени тест-драйва.`;

  const formattedTime = lead?.createdAt
    ? new Date(lead.createdAt).toLocaleTimeString("ru-RU", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleTimeString("ru-RU", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
      });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-slate-900 relative shadow-2xl text-center">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-[#EBF7F0] text-[#1E9646] border border-[#C3EBD4] flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <h3 className="text-2xl font-extrabold text-slate-950 mb-2">
          {title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed">
          {message}
        </p>

        {formattedTime && (
          <div className="mt-4 pt-3 border-t border-slate-100 inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#1E9646]" />
            <span>Время регистрации: {formattedTime} ({timeZoneLabel})</span>
          </div>
        )}

      </div>
    </div>
  );
};

