/**
 * Утилиты для сбора маркетинговых параметров (UTM, Meta fbclid, _fbc, _fbp)
 * и синхронизации событий браузерного Meta Pixel с Server Conversions API (CAPI).
 */

export interface TrackingData {
  eventId: string;
  fbclid?: string;
  fbc?: string;
  fbp?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  eventSourceUrl: string;
  referrer: string;
  userAgent: string;
}

const STORAGE_KEY = "olylife_marketing_params";

/**
 * Получает значение cookie по имени
 */
export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * Устанавливает cookie
 */
export function setCookie(name: string, value: string, days = 90): void {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
}

/**
 * Инициализирует сбор URL-параметров при первой загрузке страницы
 * и сохраняет их в sessionStorage / localStorage.
 */
export function initTracking(): void {
  if (typeof window === "undefined") return;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const existingDataStr = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    const existingData: Record<string, string> = existingDataStr ? JSON.parse(existingDataStr) : {};

    const keys = ["fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    let hasNew = false;

    keys.forEach((key) => {
      const val = urlParams.get(key);
      if (val) {
        existingData[key] = val;
        hasNew = true;
      }
    });

    // Обработка Meta Click ID (_fbc)
    const fbclid = urlParams.get("fbclid") || existingData["fbclid"];
    if (fbclid) {
      const existingFbc = getCookie("_fbc");
      if (!existingFbc) {
        // Формат: fb.1.{creation_time}.{fbclid}
        const fbcValue = `fb.1.${Date.now()}.${fbclid}`;
        setCookie("_fbc", fbcValue, 90);
        existingData["fbc"] = fbcValue;
      } else {
        existingData["fbc"] = existingFbc;
      }
    }

    if (hasNew || !existingDataStr) {
      const serialized = JSON.stringify(existingData);
      sessionStorage.setItem(STORAGE_KEY, serialized);
      localStorage.setItem(STORAGE_KEY, serialized);
    }
  } catch (e) {
    console.warn("Tracking initialization error:", e);
  }
}

/**
 * Генерирует уникальный event_id для дедупликации между Meta Pixel и Conversions API
 */
export function generateEventId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Возвращает полный пакет маркетинговых данных и параметров Facebook
 */
export function getTrackingPayload(customEventId?: string): TrackingData {
  const eventId = customEventId || generateEventId();
  let stored: Record<string, string> = {};

  if (typeof window !== "undefined") {
    try {
      const storedStr = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
      if (storedStr) {
        stored = JSON.parse(storedStr);
      }
    } catch (e) {
      console.warn("Error reading tracking storage:", e);
    }
  }

  const fbp = getCookie("_fbp") || (typeof window !== "undefined" ? (window as any)._fbp : undefined);
  let fbc = getCookie("_fbc") || stored["fbc"];

  // Если fbc нет в cookie, но есть fbclid
  if (!fbc && stored["fbclid"]) {
    fbc = `fb.1.${Date.now()}.${stored["fbclid"]}`;
  }

  return {
    eventId,
    fbclid: stored["fbclid"],
    fbc,
    fbp,
    utm_source: stored["utm_source"],
    utm_medium: stored["utm_medium"],
    utm_campaign: stored["utm_campaign"],
    utm_content: stored["utm_content"],
    utm_term: stored["utm_term"],
    eventSourceUrl: typeof window !== "undefined" ? window.location.href : "https://yarkozhivi.space/",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
  };
}

/**
 * Отправка события Lead через браузерный Meta Pixel с eventID для дедупликации
 */
export function trackMetaBrowserLead(eventId: string, leadData: { profession?: string; source?: string }): void {
  if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
    (window as any).fbq(
      "track",
      "Lead",
      {
        content_name: "Заявка на тест-драйв OlyLife P90",
        content_category: "Wellness & Beauty",
        profession: leadData.profession || "Не указана",
        lead_source: leadData.source || "Website Form",
        currency: "UZS",
        value: 0,
      },
      { eventID: eventId }
    );
  }
}

/**
 * Хэширование строки в SHA-256 через Web Crypto API браузера
 */
export async function sha256Browser(message: string): Promise<string> {
  if (!message) return "";
  try {
    const msgBuffer = new TextEncoder().encode(message.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return "";
  }
}

/**
 * Отправка события в Meta Conversions API напрямую из браузера при сборке со статическими секретами
 */
export async function sendMetaCAPIClientSide(
  lead: { name: string; phone: string; profession?: string; source?: string },
  tracking: TrackingData,
  accessToken: string,
  pixelId = "1420624392253746",
  testEventCode?: string
): Promise<void> {
  if (!accessToken || !pixelId) return;

  try {
    const normalizedPhone = lead.phone.replace(/\D/g, "");
    const hashedPhone = normalizedPhone ? await sha256Browser(normalizedPhone) : undefined;
    const hashedFirstName = lead.name ? await sha256Browser(lead.name) : undefined;

    const payload: any = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: tracking.eventId,
          event_source_url: tracking.eventSourceUrl,
          action_source: "website",
          user_data: {
            ph: hashedPhone ? [hashedPhone] : undefined,
            fn: hashedFirstName ? [hashedFirstName] : undefined,
            client_user_agent: tracking.userAgent || undefined,
            fbc: tracking.fbc || undefined,
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
      payload.test_event_code = testEventCode;
    }

    await fetch(`https://graph.facebook.com/v21.0/${pixelId.trim()}/events?access_token=${accessToken.trim()}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.warn("Client CAPI dispatch warning:", e);
  }
}
