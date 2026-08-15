import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory lead storage & runtime Telegram credentials overrides
interface StoredLead {
  id: string;
  name: string;
  phone: string;
  profession: string;
  source?: string;
  notes?: string;
  calculatorResults?: {
    clientsPerDay: number;
    sessionPrice: number;
    workingDays: number;
    monthlyRevenue: number;
    monthlyProfit: number;
  };
  createdAt: string;
  deliveredToTelegram: boolean;
  telegramError?: string;
}

const leadsStore: StoredLead[] = [];

let runtimeBotToken = process.env.TELEGRAM_BOT_TOKEN || "";
let runtimeChatId = process.env.TELEGRAM_CHAT_ID || "";

function formatTelegramMessage(lead: StoredLead): string {
  const dateStr = new Date(lead.createdAt).toLocaleString("ru-RU", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  let message = `<b>⚡ НОВАЯ ЗАЯВКА НА ТЕСТ-ДРАЙВ OLYLIFE (ТАШКЕНТ)</b>\n\n`;
  message += `👤 <b>Имя:</b> ${escapeHtml(lead.name)}\n`;
  message += `📞 <b>Контакты:</b> ${escapeHtml(lead.phone)}\n`;
  message += `💼 <b>Профессия:</b> ${escapeHtml(lead.profession)}\n`;
  message += `📍 <b>Локация:</b> Ташкент (Центр)\n`;
  message += `🕒 <b>Время заявки:</b> ${dateStr} (UZT)\n`;

  if (lead.calculatorResults) {
    const calc = lead.calculatorResults;
    const revFormatted = new Intl.NumberFormat("ru-RU").format(calc.monthlyRevenue);
    const profitFormatted = new Intl.NumberFormat("ru-RU").format(calc.monthlyProfit);
    const priceFormatted = new Intl.NumberFormat("ru-RU").format(calc.sessionPrice);

    message += `\n📊 <b>РАСЧЕТ ОКУПАЕМОСТИ:</b>\n`;
    message += `• Клиентов в день: ${calc.clientsPerDay}\n`;
    message += `• Чек процедуры: ${priceFormatted} сум\n`;
    message += `• Выручка в мес: ~${revFormatted} сум\n`;
    message += `• Чистая прибыль: ~${profitFormatted} сум\n`;
  }

  if (lead.notes) {
    message += `\n📝 <b>Заметка:</b> ${escapeHtml(lead.notes)}\n`;
  }

  message += `\n🚀 <i>Заявка с продающего лендинга OlyLife Uzbekistan</i>`;
  return message;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendToTelegram(text: string, token: string, chatId: string): Promise<{ success: boolean; error?: string }> {
  if (!token || !chatId) {
    return { success: false, error: "Telegram Bot Token или Chat ID не настроены" };
  }

  try {
    const url = `https://api.telegram.org/bot${token.trim()}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId.trim(),
        text: text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const data = await response.json() as { ok: boolean; description?: string };
    if (data.ok) {
      return { success: true };
    } else {
      return { success: false, error: data.description || "Ошибка Telegram API" };
    }
  } catch (err: any) {
    return { success: false, error: err?.message || "Сетевая ошибка при отправке в Telegram" };
  }
}

// API Routes
app.get("/api/telegram/status", (req, res) => {
  const token = runtimeBotToken || process.env.TELEGRAM_BOT_TOKEN || "";
  const chatId = runtimeChatId || process.env.TELEGRAM_CHAT_ID || "";

  res.json({
    configured: Boolean(token && chatId),
    hasToken: Boolean(token),
    hasChatId: Boolean(chatId),
    chatIdMasked: chatId ? chatId.substring(0, 3) + "***" + chatId.slice(-2) : "",
    leadCount: leadsStore.length,
  });
});

app.post("/api/telegram/config", (req, res) => {
  const { botToken, chatId } = req.body;
  if (typeof botToken === "string") runtimeBotToken = botToken;
  if (typeof chatId === "string") runtimeChatId = chatId;

  res.json({
    success: true,
    configured: Boolean(runtimeBotToken && runtimeChatId),
    message: "Настройки Telegram обновлены в памяти сервера",
  });
});

app.post("/api/telegram/test", async (req, res) => {
  const token = runtimeBotToken || process.env.TELEGRAM_BOT_TOKEN || "";
  const chatId = runtimeChatId || process.env.TELEGRAM_CHAT_ID || "";

  if (!token || !chatId) {
    return res.status(400).json({
      success: false,
      error: "Укажите Telegram Bot Token и Chat ID в настройках или .env",
    });
  }

  const testMsg = `<b>🔔 ТЕСТОВОЕ СООБЩЕНИЕ ИЗ ЛЕНДИНГА OLYLIFE ТАШКЕНТ</b>\n\nСвязь с Telegram ботом успешно установлена! Все новые заявки от клиентов будут поступать сюда.`;
  const result = await sendToTelegram(testMsg, token, chatId);

  if (result.success) {
    res.json({ success: true, message: "Тестовое сообщение отправлено в Telegram!" });
  } else {
    res.status(500).json({ success: false, error: result.error });
  }
});

app.post("/api/leads", async (req, res) => {
  try {
    const { name, phone, profession, notes, calculatorResults } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: "Заполните имя и телефон" });
    }

    const newLead: StoredLead = {
      id: "lead_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      name: String(name).trim(),
      phone: String(phone).trim(),
      profession: String(profession || "Не указана").trim(),
      notes: notes ? String(notes).trim() : undefined,
      calculatorResults: calculatorResults || undefined,
      createdAt: new Date().toISOString(),
      deliveredToTelegram: false,
    };

    const token = runtimeBotToken || process.env.TELEGRAM_BOT_TOKEN || "";
    const chatId = runtimeChatId || process.env.TELEGRAM_CHAT_ID || "";

    const tgResult = await sendToTelegram(formatTelegramMessage(newLead), token, chatId);
    newLead.deliveredToTelegram = tgResult.success;
    if (!tgResult.success) {
      newLead.telegramError = tgResult.error;
    }

    leadsStore.unshift(newLead);

    res.json({
      success: true,
      leadId: newLead.id,
      deliveredToTelegram: newLead.deliveredToTelegram,
      telegramError: newLead.telegramError,
      message: newLead.deliveredToTelegram
        ? "Заявка успешно отправлена в Telegram менеджерам!"
        : "Заявка принята и сохранена! (Для отправки в Telegram настройте Telegram Bot Token)",
    });
  } catch (error: any) {
    console.error("Error saving lead:", error);
    res.status(500).json({ success: false, error: "Внутренняя ошибка сервера" });
  }
});

app.get("/api/leads", (req, res) => {
  res.json({
    total: leadsStore.length,
    leads: leadsStore,
  });
});

async function startServer() {
  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`OlyLife Tashkent landing running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
