import {
  AstanaTrackingData,
  AstanaLeadFormData,
  AstanaLeadSubmitPayload,
  AstanaLeadSubmitResult,
} from '@/src/types/astanaClinic';
import { ASTANA_CLINIC_CONFIG } from '@/src/config/astanaClinic';

const STORAGE_KEY = 'osam_astana_marketing_params';

/**
 * Получает значение cookie по его имени.
 *
 * @param name Имя cookie
 * @returns Значение или undefined
 */
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * Устанавливает cookie в браузере.
 *
 * @param name Имя cookie
 * @param value Значение
 * @param days Срок жизни в днях
 */
export function setCookie(name: string, value: string, days = 90): void {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = '; expires=' + date.toUTCString();
  const domain = window.location.hostname.includes('.') ? '; domain=' + window.location.hostname : '';
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/${domain}; SameSite=Lax`;
}

/**
 * Генерирует уникальный ID события для дедупликации в Meta Pixel и CAPI.
 *
 * @returns Строковый eventId
 */
export function generateEventId(): string {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 9);
  return `osam_astana_lead_${timestamp}_${randomPart}`;
}

/**
 * Инициализирует и извлекает маркетинговые метки (UTM, fbclid, _fbp, _fbc).
 * Сохраняет параметры в LocalStorage и Cookie для сквозной атрибуции.
 *
 * @returns Объект AstanaTrackingData
 */
export function initAstanaTrackingParams(): AstanaTrackingData {
  if (typeof window === 'undefined') {
    return {
      eventId: generateEventId(),
      eventSourceUrl: 'https://yarkozhivi.space/astana/',
      referrer: '',
      userAgent: '',
    };
  }

  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get('fbclid') || undefined;

  let fbc = getCookie('_fbc');
  if (fbclid && !fbc) {
    fbc = `fb.1.${Date.now()}.${fbclid}`;
    setCookie('_fbc', fbc, 90);
  }

  const fbp = getCookie('_fbp');

  let stored: Partial<AstanaTrackingData> = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      stored = JSON.parse(raw) as Partial<AstanaTrackingData>;
    }
  } catch {
    stored = {};
  }

  const current: AstanaTrackingData = {
    eventId: generateEventId(),
    fbclid: fbclid || stored.fbclid,
    fbc: fbc || stored.fbc,
    fbp: fbp || stored.fbp,
    utm_source: urlParams.get('utm_source') || stored.utm_source,
    utm_medium: urlParams.get('utm_medium') || stored.utm_medium,
    utm_campaign: urlParams.get('utm_campaign') || stored.utm_campaign,
    utm_content: urlParams.get('utm_content') || stored.utm_content,
    utm_term: urlParams.get('utm_term') || stored.utm_term,
    eventSourceUrl: window.location.href,
    referrer: document.referrer || '',
    userAgent: navigator.userAgent || '',
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // Безопасный перехват
  }

  return current;
}

/**
 * Отправляет событие Lead в браузерный Meta Pixel с eventID для дедупликации.
 *
 * @param eventId Идентификатор события
 * @param leadData Данные лида
 */
export function trackMetaBrowserLead(eventId: string, leadData: AstanaLeadFormData): void {
  if (typeof window !== 'undefined' && typeof (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq === 'function') {
    (window as unknown as { fbq: (...args: unknown[]) => void }).fbq(
      'track',
      'Lead',
      {
        content_name: 'Сеанс на биохакинг-платформе OSAM (Астана) со скидкой 50%',
        content_category: 'Preventive Medicine & Biohacking',
        lead_name: leadData.name,
        currency: ASTANA_CLINIC_CONFIG.prices.currencyCode,
        value: ASTANA_CLINIC_CONFIG.prices.discountPrice,
      },
      { eventID: eventId }
    );
  }
}

/**
 * Отправляет событие InitiateCheckout при клике на кнопку бронирования.
 *
 * @param contentName Название блока/кнопки
 */
export function trackInitiateCheckout(contentName = 'Astana Hero CTA'): void {
  if (typeof window !== 'undefined' && typeof (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq === 'function') {
    (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'InitiateCheckout', {
      content_name: contentName,
      currency: ASTANA_CLINIC_CONFIG.prices.currencyCode,
      value: ASTANA_CLINIC_CONFIG.prices.discountPrice,
    });
  }

  if (typeof window !== 'undefined' && typeof (window as unknown as { ym?: (...args: unknown[]) => void }).ym === 'function') {
    (window as unknown as { ym: (...args: unknown[]) => void }).ym(ASTANA_CLINIC_CONFIG.yandexMetrikaId, 'reachGoal', 'initiate_checkout');
  }
}

/**
 * Отправляет цель достижения в Яндекс Метрику.
 *
 * @param goal Имя цели
 */
export function trackYandexGoal(goal = 'lead_form_submit'): void {
  if (typeof window !== 'undefined' && typeof (window as unknown as { ym?: (...args: unknown[]) => void }).ym === 'function') {
    (window as unknown as { ym: (...args: unknown[]) => void }).ym(ASTANA_CLINIC_CONFIG.yandexMetrikaId, 'reachGoal', goal);
  }
}

/**
 * Формирует ссылку для перехода в WhatsApp с предзаполненным текстом заявки.
 *
 * @param lead Данные лида
 * @returns Полный URL для перехода в WhatsApp
 */
export function buildWhatsAppUrl(lead?: AstanaLeadFormData): string {
  const base = `https://wa.me/${ASTANA_CLINIC_CONFIG.whatsappPhone}`;
  let message = ASTANA_CLINIC_CONFIG.whatsappDefaultMessage;

  if (lead && lead.name && lead.phone) {
    message = `Здравствуйте! Меня зовут ${lead.name.trim()} (${lead.phone.trim()}). Хочу записаться на 20-минутный сеанс на биохакинг-платформе в Астане со скидкой 50% (5 000 ₸).`;
  }

  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Отправляет данные лида на сервер OlyLife (/api/lead) и n8n webhook,
 * инициирует аналитические события и возвращает fallback ссылку в WhatsApp.
 *
 * @param lead Данные формы заявки
 * @param tracking Маркетинговые метки
 * @returns Результат отправки с ссылкой WhatsApp
 */
export async function submitAstanaLead(
  lead: AstanaLeadFormData,
  tracking: AstanaTrackingData
): Promise<AstanaLeadSubmitResult> {
  const whatsappUrl = buildWhatsAppUrl(lead);

  // Аналитические трекеры
  trackMetaBrowserLead(tracking.eventId, lead);
  trackYandexGoal('lead_form_submit');

  const payload: AstanaLeadSubmitPayload = {
    lead,
    tracking,
    city: 'astana',
    clinic: ASTANA_CLINIC_CONFIG.clinicFullName,
    submittedAt: new Date().toISOString(),
  };

  // 1. Отправка на локальный сервер OlyLife (/api/lead) для Telegram и Server CAPI
  try {
    void fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: lead.name,
        phone: lead.phone,
        profession: 'Клиника OSAM (Астана)',
        city: 'astana',
        source: lead.source || 'yarkozhivi.space/astana/',
        notes: `Клиника OSAM / Умай, ул. Бокейхана 16/3. Оффер: 50% скидка (5 000 ₸).`,
        tracking,
      }),
    }).catch((err) => console.warn('API lead dispatch warning:', err));
  } catch (e) {
    console.warn('API lead catch:', e);
  }

  // 2. Отправка на webhook n8n
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(ASTANA_CLINIC_CONFIG.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn('Webhook response status:', response.status);
    }

    return {
      success: true,
      whatsappFallbackUrl: whatsappUrl,
    };
  } catch (error: unknown) {
    console.warn('Webhook delivery notice (falling back to WhatsApp flow):', error);
    return {
      success: true,
      message: 'Заявка принята! Перенаправляем на подтверждение...',
      whatsappFallbackUrl: whatsappUrl,
    };
  }
}
