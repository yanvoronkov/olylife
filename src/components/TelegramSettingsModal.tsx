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
        // Fetch leads list as well
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#051c10] border-2 border-emerald-700/80 rounded-3xl max-w-2xl w-full p-6 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950 text-emerald-300 hover:text-white border border-emerald-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-lime-400 text-emerald-950 flex items-center justify-center font-bold">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Интеграция с Telegram</h3>
            <p className="text-xs text-emerald-300">Настройка отправки лидов в ваш бот/чат</p>
          </div>
        </div>

        {/* Form to configure Token & Chat ID */}
        <form onSubmit={handleSaveConfig} className="space-y-4 mb-6 bg-[#03130a] p-5 rounded-2xl border border-emerald-800">
          <div>
            <label className="block text-xs font-semibold text-emerald-300 mb-1 flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-lime-400" />
              Telegram Bot Token (от @BotFather)
            </label>
            <input
              type="text"
              placeholder="e.g. 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#020d07] border border-emerald-700 text-white placeholder-emerald-700 font-mono text-xs focus:outline-none focus:border-lime-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-300 mb-1 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-lime-400" />
              Telegram Chat ID или ID группы
            </label>
            <input
              type="text"
              placeholder="e.g. -100123456789 или 987654321"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#020d07] border border-emerald-700 text-white placeholder-emerald-700 font-mono text-xs focus:outline-none focus:border-lime-400"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-lime-400 text-emerald-950 font-bold text-xs hover:bg-lime-300 transition-all cursor-pointer"
            >
              Сохранить ключи
            </button>

            <button
              type="button"
              onClick={handleTestSend}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-emerald-900 border border-emerald-600 text-emerald-200 font-bold text-xs hover:bg-emerald-800 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-lime-400" />
              Тест отправки
            </button>
          </div>
        </form>

        {statusMsg && (
          <div
            className={`p-3 rounded-xl mb-6 text-xs flex items-center gap-2 ${
              statusMsg.type === "success"
                ? "bg-lime-950 border border-lime-500 text-lime-300"
                : "bg-red-950 border border-red-500 text-red-300"
            }`}
          >
            {statusMsg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Submitted Leads History Section */}
        <div className="bg-[#03130a] p-5 rounded-2xl border border-emerald-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <History className="w-4 h-4 text-lime-400" />
              История поступивших заявок ({leads.length})
            </h4>
            <button
              onClick={fetchStatus}
              className="text-xs text-lime-300 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Обновить
            </button>
          </div>

          {leads.length === 0 ? (
            <p className="text-xs text-emerald-400/60 py-4 text-center italic">
              Заявок пока нет. Заполните форму на сайте, чтобы проверить интеграцию.
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-3 rounded-xl bg-[#020d07] border border-emerald-900 text-xs flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-bold text-white">{lead.name} ({lead.profession})</div>
                    <div className="text-emerald-400/80 font-mono text-[11px]">{lead.phone}</div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        lead.deliveredToTelegram
                          ? "bg-lime-950 text-lime-300 border border-lime-600/50"
                          : "bg-amber-950 text-amber-300 border border-amber-600/50"
                      }`}
                    >
                      {lead.deliveredToTelegram ? "TG OK" : "Сохранено"}
                    </span>
                    <div className="text-[9px] text-emerald-500 mt-0.5">
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
