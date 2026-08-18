import express from "express";
import path from "path";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

interface TrackingData {
  eventId?: string;
  fbclid?: string;
  fbc?: string;
  fbp?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  eventSourceUrl?: string;
  referrer?: string;
  userAgent?: string;
}

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
  tracking?: TrackingData;
  createdAt: string;
  deliveredToTelegram: boolean;
  telegramError?: string;
  deliveredToFacebook?: boolean;
  facebookError?: string;
}

function hashSha256(value: string): string {
  if (!value) return "";
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

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
  if (lead.source) {
    message += `📍 <b>Форма:</b> ${escapeHtml(lead.source)}\n`;
  }
  message += `🕒 <b>Время заявки:</b> ${dateStr} (UZT)`;

  if (lead.calculatorResults) {
    const calc = lead.calculatorResults;
    const revFormatted = new Intl.NumberFormat("ru-RU").format(calc.monthlyRevenue);
    const profitFormatted = new Intl.NumberFormat("ru-RU").format(calc.monthlyProfit);
    const priceFormatted = new Intl.NumberFormat("ru-RU").format(calc.sessionPrice);

    message += `\n\n📊 <b>РАСЧЕТ ОКУПАЕМОСТИ:</b>\n`;
    message += `• Клиентов в день: ${calc.clientsPerDay}\n`;
    message += `• Чек процедуры: ${priceFormatted} сум\n`;
    message += `• Выручка в мес: ~${revFormatted} сум\n`;
    message += `• Чистая прибыль: ~${profitFormatted} сум`;
  }

  // Маркетинговая атрибуция и UTM-метки
  if (lead.tracking) {
    const tr = lead.tracking;
    const hasUtm = Boolean(tr.utm_source || tr.utm_medium || tr.utm_campaign || tr.utm_content || tr.utm_term || tr.fbclid);

    if (hasUtm) {
      message += `\n\n🎯 <b>МАРКЕТИНГОВЫЕ МЕТКИ (META / UTM):</b>\n`;
      if (tr.utm_source) message += `• <b>UTM Source:</b> ${escapeHtml(tr.utm_source)}\n`;
      if (tr.utm_campaign) message += `• <b>UTM Campaign:</b> ${escapeHtml(tr.utm_campaign)}\n`;
      if (tr.utm_medium) message += `• <b>UTM Medium:</b> ${escapeHtml(tr.utm_medium)}\n`;
      if (tr.utm_content) message += `• <b>UTM Content:</b> ${escapeHtml(tr.utm_content)}\n`;
      if (tr.utm_term) message += `• <b>UTM Term:</b> ${escapeHtml(tr.utm_term)}\n`;
      if (tr.fbclid) message += `• <b>FBCLID:</b> <code>${escapeHtml(tr.fbclid.substring(0, 24))}...</code>\n`;
    }
  }

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
    return { success: false, error: "Telegram Bot Token или Chat ID не настроены в process.env" };
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

    const data = (await response.json()) as { ok: boolean; description?: string };
    if (data.ok) {
      return { success: true };
    } else {
      return { success: false, error: data.description || "Ошибка Telegram API" };
    }
  } catch (err: any) {
    return { success: false, error: err?.message || "Сетевая ошибка при отправке в Telegram" };
  }
}

/**
 * Отправка события лида в Facebook Conversions API (Meta CAPI)
 */
async function sendToFacebookCAPI(
  lead: StoredLead,
  clientIp: string,
  clientUserAgent: string
): Promise<{ success: boolean; error?: string }> {
  const pixelId = process.env.FB_PIXEL_ID || "1420624392253746";
  const accessToken = process.env.FB_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN || "";
  const testEventCode = process.env.FB_TEST_EVENT_CODE || process.env.META_TEST_EVENT_CODE || "";

  if (!pixelId || !accessToken) {
    return {
      success: false,
      error: "Meta Pixel ID или FB_ACCESS_TOKEN не задан в переменных окружения",
    };
  }

  try {
    const tracking = lead.tracking || {};
    const normalizedPhone = lead.phone.replace(/\D/g, "");
    const hashedPhone = normalizedPhone ? hashSha256(normalizedPhone) : undefined;
    const hashedFirstName = lead.name ? hashSha256(lead.name) : undefined;

    // FBC: cookie _fbc или генерация из fbclid
    let fbc = tracking.fbc;
    if (!fbc && tracking.fbclid) {
      fbc = `fb.1.${Date.now()}.${tracking.fbclid}`;
    }

    const eventTime = Math.floor(new Date(lead.createdAt).getTime() / 1000);
    const eventId = tracking.eventId || lead.id;
    const eventSourceUrl = tracking.eventSourceUrl || "https://yarkozhivi.space/";

    const payload: any = {
      data: [
        {
          event_name: "Lead",
          event_time: eventTime,
          event_id: eventId,
          event_source_url: eventSourceUrl,
          action_source: "website",
          user_data: {
            ph: hashedPhone ? [hashedPhone] : undefined,
            fn: hashedFirstName ? [hashedFirstName] : undefined,
            client_ip_address: clientIp || undefined,
            client_user_agent: clientUserAgent || tracking.userAgent || undefined,
            fbc: fbc || undefined,
            fbp: tracking.fbp || undefined,
          },
          custom_data: {
            content_name: "Заявка на тест-драйв OlyLife P90",
            content_category: "Wellness & Beauty",
            profession: lead.profession,
            lead_source: lead.source || "Website Form",
            currency: "UZS",
            value: 0,
            utm_source: tracking.utm_source || undefined,
            utm_medium: tracking.utm_medium || undefined,
            utm_campaign: tracking.utm_campaign || undefined,
            utm_content: tracking.utm_content || undefined,
            utm_term: tracking.utm_term || undefined,
          },
        },
      ],
    };

    if (testEventCode) {
      payload.test_event_code = testEventCode.trim();
    }

    const url = `https://graph.facebook.com/v21.0/${pixelId.trim()}/events?access_token=${accessToken.trim()}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as any;

    if (response.ok && data.events_received !== undefined) {
      return { success: true };
    } else {
      const errMsg = data.error?.message || data.error?.error_user_msg || JSON.stringify(data.error) || "Ошибка Meta Conversions API";
      console.warn("Meta CAPI Error:", errMsg);
      return { success: false, error: errMsg };
    }
  } catch (err: any) {
    console.error("Meta CAPI Network Error:", err);
    return { success: false, error: err?.message || "Сетевая ошибка при отправке в Meta Conversions API" };
  }
}

// Прием заявок с сайта
app.post("/api/leads", async (req, res) => {
  try {
    const { name, phone, profession, source, notes, calculatorResults, tracking } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: "Заполните имя и телефон" });
    }

    // Извлечение IP клиента и User Agent
    const clientIp = (req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() || req.socket.remoteAddress || "").replace(/^::ffff:/, "");
    const clientUserAgent = req.headers["user-agent"] || "";

    // Парсинг cookies _fbp / _fbc из заголовков запроса при наличии
    let fbpFromCookie: string | undefined;
    let fbcFromCookie: string | undefined;
    if (req.headers.cookie) {
      const matchFbp = req.headers.cookie.match(/_fbp=([^;]+)/);
      if (matchFbp) fbpFromCookie = decodeURIComponent(matchFbp[1]);
      const matchFbc = req.headers.cookie.match(/_fbc=([^;]+)/);
      if (matchFbc) fbcFromCookie = decodeURIComponent(matchFbc[1]);
    }

    const mergedTracking: TrackingData = {
      ...(tracking || {}),
      fbp: tracking?.fbp || fbpFromCookie,
      fbc: tracking?.fbc || fbcFromCookie,
      userAgent: tracking?.userAgent || clientUserAgent,
    };

    const newLead: StoredLead = {
      id: mergedTracking.eventId || "lead_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      name: String(name).trim(),
      phone: String(phone).trim(),
      profession: String(profession || "Не указана").trim(),
      source: source ? String(source).trim() : "Форма на сайте",
      notes: notes ? String(notes).trim() : undefined,
      calculatorResults: calculatorResults || undefined,
      tracking: mergedTracking,
      createdAt: new Date().toISOString(),
      deliveredToTelegram: false,
      deliveredToFacebook: false,
    };

    // 1. Отправка в Telegram
    const tgToken = process.env.TELEGRAM_BOT_TOKEN || "";
    const tgChatId = process.env.TELEGRAM_CHAT_ID || "";
    if (tgToken && tgChatId) {
      const tgResult = await sendToTelegram(formatTelegramMessage(newLead), tgToken, tgChatId);
      newLead.deliveredToTelegram = tgResult.success;
      if (!tgResult.success) {
        newLead.telegramError = tgResult.error;
      }
    }

    // 2. Отправка в Facebook Conversions API (CAPI)
    const fbAccessToken = process.env.FB_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN || "";
    if (fbAccessToken) {
      const fbResult = await sendToFacebookCAPI(newLead, clientIp, clientUserAgent);
      newLead.deliveredToFacebook = fbResult.success;
      if (!fbResult.success) {
        newLead.facebookError = fbResult.error;
      }
    }

    res.json({
      success: true,
      leadId: newLead.id,
      deliveredToTelegram: newLead.deliveredToTelegram,
      deliveredToFacebook: newLead.deliveredToFacebook,
      message: "Заявка успешно обработана",
    });
  } catch (error: any) {
    console.error("Error processing lead:", error);
    res.status(500).json({ success: false, error: "Внутренняя ошибка сервера" });
  }
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
