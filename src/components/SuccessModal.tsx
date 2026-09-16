import React from "react";
import { CheckCircle2, X } from "lucide-react";
import { LeadRecord } from "../types";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: LeadRecord | null;
  managerCity?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  lead,
  managerCity = "в Ташкенте",
}) => {
  if (!isOpen) return null;

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
          Заявка успешно принята! 🚀
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed">
          Спасибо, <span className="text-[#0E5E2B] font-bold">{lead?.name || "уважаемый специалист"}</span>! Наш менеджер {managerCity} уже получил уведомление и свяжется с вами для согласования времени тест-драйва.
        </p>

      </div>
    </div>
  );
};
