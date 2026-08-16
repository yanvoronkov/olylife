import React, { useState } from "react";
import { X, Calculator, TrendingUp, ArrowRight } from "lucide-react";
import { LeadFormData } from "../types";

interface ROICalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitWithCalc: (calcResults: LeadFormData["calculatorResults"]) => void;
}

export const ROICalculatorModal: React.FC<ROICalculatorModalProps> = ({
  isOpen,
  onClose,
  onSubmitWithCalc,
}) => {
  const [clientsPerDay, setClientsPerDay] = useState(5);
  const [sessionPrice, setSessionPrice] = useState(200000); // 200,000 UZS
  const [workingDays, setWorkingDays] = useState(25);

  if (!isOpen) return null;

  const monthlyRevenue = clientsPerDay * sessionPrice * workingDays;
  const operatingCosts = Math.round(monthlyRevenue * 0.02); // 2% electricity
  const monthlyProfit = monthlyRevenue - operatingCosts;

  // Approx cost of Tera-P90+ is $1500 ~ 19,000,000 UZS
  const devicePriceUzs = 19000000;
  const paybackMonths = (devicePriceUzs / Math.max(monthlyProfit, 1)).toFixed(1);

  const formatUzs = (num: number) => {
    return new Intl.NumberFormat("ru-RU").format(num) + " сум";
  };

  const handleApplyCalc = () => {
    onSubmitWithCalc({
      clientsPerDay,
      sessionPrice,
      workingDays,
      monthlyRevenue,
      monthlyProfit,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-slate-900 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF7F0] text-[#1E9646] border border-[#C3EBD4] flex items-center justify-center shadow-xs">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950">
              Калькулятор окупаемости OlyLife
            </h3>
            <p className="text-xs text-[#0E5E2B] font-semibold">
              Рассчитайте потенциальную прибыль вашего кабинета в Ташкенте
            </p>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-6 bg-slate-50 p-5 rounded-2xl border border-slate-200/90 mb-6">
          
          {/* Slider 1: Clients per day */}
          <div>
            <div className="flex items-center justify-between text-sm font-semibold mb-2">
              <span className="text-slate-700">Клиентов на OlyLife в день:</span>
              <span className="text-[#0E5E2B] font-bold text-sm px-3 py-0.5 rounded-full bg-[#EBF7F0] border border-[#C3EBD4]">
                {clientsPerDay} чел.
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={clientsPerDay}
              onChange={(e) => setClientsPerDay(Number(e.target.value))}
              className="w-full accent-[#1E9646] h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>1 чел/день</span>
              <span>15 чел/день</span>
            </div>
          </div>

          {/* Slider 2: Session Price */}
          <div>
            <div className="flex items-center justify-between text-sm font-semibold mb-2">
              <span className="text-slate-700">Стоимость 20-мин сеанса:</span>
              <span className="text-[#0E5E2B] font-bold text-sm px-3 py-0.5 rounded-full bg-[#EBF7F0] border border-[#C3EBD4]">
                {formatUzs(sessionPrice)}
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={500000}
              step={25000}
              value={sessionPrice}
              onChange={(e) => setSessionPrice(Number(e.target.value))}
              className="w-full accent-[#1E9646] h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>100 000 сум</span>
              <span>500 000 сум</span>
            </div>
          </div>

          {/* Slider 3: Working days */}
          <div>
            <div className="flex items-center justify-between text-sm font-semibold mb-2">
              <span className="text-slate-700">Рабочих дней в месяц:</span>
              <span className="text-[#0E5E2B] font-bold text-sm px-3 py-0.5 rounded-full bg-[#EBF7F0] border border-[#C3EBD4]">
                {workingDays} дней
              </span>
            </div>
            <input
              type="range"
              min={15}
              max={30}
              step={1}
              value={workingDays}
              onChange={(e) => setWorkingDays(Number(e.target.value))}
              className="w-full accent-[#1E9646] h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

        </div>

        {/* Results Card - OlyLife Dark Green Banner */}
        <div className="bg-[#0A2B1D] text-white p-5 sm:p-6 rounded-2xl border border-[#134E35] mb-6 space-y-3 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#134E35]/80 pb-2 text-xs text-emerald-200/80">
            <span>Выручка в месяц:</span>
            <span className="text-white font-bold text-sm">{formatUzs(monthlyRevenue)}</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#134E35]/80 pb-2 text-xs text-emerald-200/80">
            <span>Затраты на электричество (~2%):</span>
            <span className="text-emerald-300 font-medium text-xs">{formatUzs(operatingCosts)}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-bold text-[#A5DEBC] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#25A852]" />
              Чистая прибыль в месяц:
            </span>
            <span className="text-xl sm:text-2xl font-black text-[#25A852]">
              ~{formatUzs(monthlyProfit)}
            </span>
          </div>

          <div className="text-[11px] text-center text-emerald-200/90 pt-2 border-t border-[#134E35]/60">
            ⚡ Прибор OlyLife P90 окупается за <span className="font-bold text-[#25A852]">{paybackMonths} мес</span>!
          </div>
        </div>

        {/* Apply Calculation & Book Button */}
        <button
          onClick={handleApplyCalc}
          className="w-full py-4 px-6 rounded-full font-extrabold text-base text-white bg-[#0A2B1D] hover:bg-[#134E35] transition-all shadow-md flex items-center justify-center gap-3 uppercase cursor-pointer group"
        >
          <span>Зафиксировать расчет и записаться</span>
          <span className="w-7 h-7 rounded-full bg-[#1E9646] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shrink-0">
            <ArrowRight className="w-4 h-4" />
          </span>
        </button>

      </div>
    </div>
  );
};
