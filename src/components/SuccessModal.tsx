import React from "react";
import { CheckCircle2, X } from "lucide-react";
import { LeadRecord } from "../types";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: LeadRecord | null;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, lead }) => {
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
          Спасибо, <span className="text-[#0E5E2B] font-bold">{lead?.name || "уважаемый специалист"}</span>! Наш менеджер в Ташкенте уже получил уведомление и свяжется с вами для согласования времени тест-драйва.
        </p>

        {lead?.calculatorResults && (
          <div className="bg-[#0A2B1D] text-white p-4 rounded-2xl border border-[#134E35] text-left mt-6 space-y-1 text-xs">
            <span className="font-bold text-[#A5DEBC] uppercase tracking-wider block mb-1">
              📊 Ваш прикрепленный расчет:
            </span>
            <p className="text-emerald-100">
              Выручка: ~{new Intl.NumberFormat("ru-RU").format(lead.calculatorResults.monthlyRevenue)} сум/мес
            </p>
            <p className="text-[#25A852] font-bold">
              Прибыль: ~{new Intl.NumberFormat("ru-RU").format(lead.calculatorResults.monthlyProfit)} сум/мес
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
