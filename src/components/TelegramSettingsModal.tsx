import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, AlertCircle, RefreshCw, Key, MessageSquare, History } from "lucide-react";
import { LeadRecord } from "../types";

interface TelegramSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdated: () => void;
}

export const TelegramSettingsModal: React.FC<TelegramSettingsModalProps> = ({
  isOpen,
  onClose,
  onStatusUpdated,
}) => {
  const [botToken, setBotToken] = useState("");
  const [chatId, setChatId] = useState("");
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<LeadRecord[]>([]);

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/telegram/status");
      const data = await res.json();
      if (data.leadCount !== undefined) {
        const leadsRes = await fetch("/api/leads");
        const leadsData = await leadsRes.json();
        if (leadsData.leads) {
          setLeads(leadsData.leads);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/telegram/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botToken, chatId }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", text: "Настройки Telegram обновлены!" });
        onStatusUpdated();
      } else {
        setStatusMsg({ type: "error", text: data.error || "Ошибка при сохранении" });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: "Сетевая ошибка" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestSend = async () => {
    setIsLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/telegram/test", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", text: "Тестовое сообщение отправлено в Telegram!" });
        fetchStatus();
      } else {
        setStatusMsg({ type: "error", text: data.error || "Ошибка отправки в Telegram" });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: "Не удалось отправить тестовое сообщение" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-slate-900 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF7F0] text-[#1E9646] border border-[#C3EBD4] flex items-center justify-center shadow-xs">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950">Интеграция с Telegram</h3>
            <p className="text-xs text-slate-500 font-medium">Настройка отправки заявок в Telegram бот или группу</p>
          </div>
        </div>

        {/* Form to configure Token & Chat ID */}
        <form onSubmit={handleSaveConfig} className="space-y-4 mb-6 bg-slate-50 p-5 rounded-2xl border border-slate-200/90">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#1E9646]" />
              Telegram Bot Token (от @BotFather)
            </label>
            <input
              type="text"
              placeholder="e.g. 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 font-mono text-xs focus:outline-none focus:border-[#1E9646] focus:ring-2 focus:ring-[#1E9646]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#1E9646]" />
              Telegram Chat ID или ID группы
            </label>
            <input
              type="text"
              placeholder="e.g. -100123456789 или 987654321"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 font-mono text-xs focus:outline-none focus:border-[#1E9646] focus:ring-2 focus:ring-[#1E9646]/20"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-full bg-[#0A2B1D] text-white font-bold text-xs hover:bg-[#134E35] transition-all cursor-pointer shadow-xs"
            >
              Сохранить ключи
            </button>

            <button
              type="button"
              onClick={handleTestSend}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-full bg-[#EBF7F0] border border-[#C3EBD4] text-[#0E5E2B] font-bold text-xs hover:bg-[#D8F3E5] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-[#1E9646]" />
              Тест отправки
            </button>
          </div>
        </form>

        {statusMsg && (
          <div
            className={`p-3.5 rounded-xl mb-6 text-xs flex items-center gap-2 ${
              statusMsg.type === "success"
                ? "bg-[#EBF7F0] border border-[#C3EBD4] text-[#0E5E2B]"
                : "bg-rose-50 border border-rose-300 text-rose-800"
            }`}
          >
            {statusMsg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#1E9646]" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Submitted Leads History Section */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/90">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <History className="w-4 h-4 text-[#1E9646]" />
              История поступивших заявок ({leads.length})
            </h4>
            <button
              onClick={fetchStatus}
              className="text-xs text-[#0E5E2B] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Обновить
            </button>
          </div>

          {leads.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center italic">
              Заявок пока нет. Заполните форму на сайте, чтобы проверить интеграцию.
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-3 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between gap-2 shadow-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">{lead.name} ({lead.profession})</div>
                    <div className="text-slate-500 font-mono text-[11px]">{lead.phone}</div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        lead.deliveredToTelegram
                          ? "bg-[#EBF7F0] text-[#0E5E2B] border border-[#C3EBD4]"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {lead.deliveredToTelegram ? "TG Отправлено" : "Сохранено"}
                    </span>
                    <div className="text-[9px] text-slate-400 mt-0.5">
                      {new Date(lead.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
