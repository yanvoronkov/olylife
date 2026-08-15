import React from "react";
import { CheckCircle2, Send, Download, PhoneCall, Sparkles, X } from "lucide-react";
import { LeadRecord } from "../types";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: LeadRecord | null;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, lead }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#052213] border-2 border-lime-400/60 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white relative shadow-2xl text-center">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950 text-emerald-300 hover:text-white border border-emerald-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-lime-400 text-emerald-950 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-lime-500/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="text-2xl font-black text-white mb-2">
          Заявка успешно принята! 🚀
        </h3>

        <p className="text-sm text-emerald-200/90 mb-6 leading-relaxed">
          Спасибо, <span className="text-lime-300 font-bold">{lead?.name || "уважаемый специалист"}</span>! Наш менеджер в Ташкенте уже получил уведомление и свяжется с вами в течение <span className="font-bold text-white">10 минут</span> для согласования времени тест-драйва.
        </p>

        {lead?.calculatorResults && (
          <div className="bg-[#03140a] p-4 rounded-2xl border border-emerald-800 text-left mb-6 space-y-1 text-xs">
            <span className="font-bold text-lime-300 uppercase tracking-wider block mb-1">
              📊 Ваш прикрепленный расчет:
            </span>
            <p className="text-emerald-200">
              Выручка: ~{new Intl.NumberFormat("ru-RU").format(lead.calculatorResults.monthlyRevenue)} сум/мес
            </p>
            <p className="text-lime-400 font-bold">
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
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-lime-400 text-emerald-950 hover:bg-lime-300 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Написать менеджеру в Telegram прямо сейчас
          </a>

          <button
            onClick={() => {
              alert("Калькулятор окупаемости OlyLife (PDF) сохранен на ваше устройство.");
            }}
            className="w-full py-3 px-4 rounded-xl font-medium text-xs bg-emerald-950 border border-emerald-700 text-emerald-200 hover:bg-emerald-900 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-lime-400" />
            Скачать Калькулятор окупаемости (PDF)
          </button>
        </div>

      </div>
    </div>
  );
};
