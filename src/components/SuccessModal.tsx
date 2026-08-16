import React from "react";
import { CheckCircle2, Send, Download, X } from "lucide-react";
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

        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          Спасибо, <span className="text-[#0E5E2B] font-bold">{lead?.name || "уважаемый специалист"}</span>! Наш менеджер в Ташкенте уже получил уведомление и свяжется с вами в течение <span className="font-bold text-slate-900">10 минут</span> для согласования времени тест-драйва.
        </p>

        {lead?.calculatorResults && (
          <div className="bg-[#0A2B1D] text-white p-4 rounded-2xl border border-[#134E35] text-left mb-6 space-y-1 text-xs">
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

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href="https://t.me/olylife_uzbekistan"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 px-4 rounded-full font-bold text-sm bg-[#0A2B1D] text-white hover:bg-[#134E35] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-[#25A852]" />
            <span>Написать менеджеру в Telegram</span>
          </a>

          <button
            onClick={() => {
              alert("Калькулятор окупаемости OlyLife (PDF) сохранен на ваше устройство.");
            }}
            className="w-full py-3 px-4 rounded-full font-medium text-xs bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#1E9646]" />
            <span>Скачать расчет окупаемости (PDF)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
