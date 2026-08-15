import React, { useState } from "react";
import { X, Calculator, DollarSign, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#052012] border-2 border-lime-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950 text-emerald-300 hover:text-white hover:bg-emerald-900 border border-emerald-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-lime-400 text-[#041a0e] flex items-center justify-center shadow-lg shadow-lime-500/30">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Калькулятор окупаемости OlyLife
            </h3>
            <p className="text-xs text-lime-300 font-medium">
              Рассчитайте прибыль вашего кабинета в Ташкенте
            </p>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-6 bg-[#03140a] p-5 rounded-2xl border border-emerald-800/80 mb-6">
          
          {/* Slider 1: Clients per day */}
          <div>
            <div className="flex items-center justify-between text-sm font-semibold mb-2">
              <span className="text-emerald-200">Клиентов на OlyLife в день:</span>
              <span className="text-lime-300 font-bold text-base px-2.5 py-0.5 rounded bg-lime-950 border border-lime-500/30">
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
              className="w-full accent-lime-400 h-2 bg-emerald-950 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-emerald-400/60 mt-1">
              <span>1 чел/день</span>
              <span>15 чел/день</span>
            </div>
          </div>

          {/* Slider 2: Session Price */}
          <div>
            <div className="flex items-center justify-between text-sm font-semibold mb-2">
              <span className="text-emerald-200">Стоимость 20-мин сеанса:</span>
              <span className="text-lime-300 font-bold text-base px-2.5 py-0.5 rounded bg-lime-950 border border-lime-500/30">
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
              className="w-full accent-lime-400 h-2 bg-emerald-950 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-emerald-400/60 mt-1">
              <span>100 000 сум</span>
              <span>500 000 сум</span>
            </div>
          </div>

          {/* Slider 3: Working days */}
          <div>
            <div className="flex items-center justify-between text-sm font-semibold mb-2">
              <span className="text-emerald-200">Рабочих дней в месяц:</span>
              <span className="text-lime-300 font-bold text-base px-2.5 py-0.5 rounded bg-lime-950 border border-lime-500/30">
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
              className="w-full accent-lime-400 h-2 bg-emerald-950 rounded-lg cursor-pointer"
            />
          </div>

        </div>

        {/* Results Card */}
        <div className="bg-gradient-to-r from-lime-950 via-[#072d1a] to-emerald-950 p-5 rounded-2xl border border-lime-500/50 mb-6 space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-800/80 pb-2 text-xs text-emerald-300">
            <span>Выручка в месяц:</span>
            <span className="text-white font-bold text-sm">{formatUzs(monthlyRevenue)}</span>
          </div>

          <div className="flex items-center justify-between border-b border-emerald-800/80 pb-2 text-xs text-emerald-300">
            <span>Затраты на расходники / эл. энергию:</span>
            <span className="text-emerald-400 font-bold text-xs">{formatUzs(operatingCosts)} (~2%)</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-bold text-lime-300 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-lime-400" />
              Чистая прибыль в месяц:
            </span>
            <span className="text-xl sm:text-2xl font-black text-lime-400">
              ~{formatUzs(monthlyProfit)}
            </span>
          </div>

          <div className="text-[11px] text-center text-emerald-200/80 pt-2 border-t border-emerald-800/60">
            ⚡ Прибор OlyLife P90 окупается за <span className="font-bold text-lime-300">{paybackMonths} мес</span>!
          </div>
        </div>

        {/* Apply Calculation & Book Button */}
        <button
          onClick={handleApplyCalc}
          className="w-full py-4 px-6 rounded-2xl font-black text-base text-[#041a0e] bg-gradient-to-r from-lime-400 via-lime-300 to-emerald-400 hover:from-lime-300 transition-all shadow-xl shadow-lime-500/30 flex items-center justify-center gap-2 uppercase cursor-pointer"
        >
          <span>Зафиксировать расчет и записаться</span>
          <ArrowRight className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};
