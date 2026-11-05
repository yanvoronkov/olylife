/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { TargetAudienceSection } from "./components/TargetAudienceSection";
import { TechnologySection } from "./components/TechnologySection";
import { TestDriveSection } from "./components/TestDriveSection";
import { SuccessModal } from "./components/SuccessModal";
import { PrivacyModal } from "./components/PrivacyModal";
import { TermsModal } from "./components/TermsModal";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import { LeadFormData, LeadRecord } from "./types";
import { getCurrentCity, CityConfig } from "./config/cities";
import { getTranslations, Translations } from "./config/translations";
import { initTracking, getTrackingPayload, trackMetaBrowserLead, sendMetaCAPIClientSide } from "./utils/tracking";

export default function App() {
  const [city] = useState<CityConfig>(getCurrentCity());
  const [translations] = useState<Translations>(getTranslations());
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latestLead, setLatestLead] = useState<LeadRecord | null>(null);

  const heroFormRef = useRef<HTMLDivElement>(null);
  const footerFormRef = useRef<HTMLDivElement>(null);

  const isKg = translations.locale === "kg";

  useEffect(() => {
    initTracking();
  }, []);

  const scrollToForm = () => {
    if (heroFormRef.current) {
      heroFormRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleLeadSubmit = async (formData: LeadFormData) => {
    setIsSubmitting(true);
    let newRecord: LeadRecord | null = null;
    try {
      // Сбор данных трекинга (fbclid, UTM-метки, _fbc, _fbp, eventId)
      const trackingData = getTrackingPayload();
      const payload: LeadFormData = {
        ...formData,
        city: city.id,
        notes: isKg ? "Язык заявки: Кыргызский (KG)" : "Язык заявки: Русский",
        tracking: trackingData,
      };

      newRecord = {
        id: trackingData.eventId,
        ...payload,
        createdAt: new Date().toISOString(),
        deliveredToTelegram: false,
      };

      // 1. Отправка события Lead в браузерный Meta Pixel (с eventID для дедупликации с CAPI)
      try {
        trackMetaBrowserLead(trackingData.eventId, {
          ...formData,
          source: `${formData.source || "Form"} [${city.cityName}${isKg ? " KG" : ""}]`,
        });
      } catch (pixelErr) {
        console.error("Meta Browser Lead tracking error:", pixelErr);
      }

      // 2. Достижение цели в Яндекс.Метрике
      try {
        if (typeof (window as unknown as { ym?: (id: number, action: string, target: string) => void }).ym === "function") {
          (window as unknown as { ym: (id: number, action: string, target: string) => void }).ym(103911648, "reachGoal", "lead_form_submitted");
        }
      } catch (ymErr) {
        console.error("Yandex Metrika tracking error:", ymErr);
      }

      // Определение Telegram бота и чата (поддержка отдельного потока для Бишкека)
      const isBishkek = city.id === "bishkek";
      const botToken = (isBishkek && import.meta.env.VITE_BISHKEK_TELEGRAM_BOT_TOKEN) || import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = (isBishkek && import.meta.env.VITE_BISHKEK_TELEGRAM_CHAT_ID) || import.meta.env.VITE_TELEGRAM_CHAT_ID;

      if (botToken && chatId) {
        // Прямая клиентская отправка для статического хостинга (GitHub Pages)
        const dateStr = new Date().toLocaleString("ru-RU", {
          timeZone: city.timeZone,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });

        const langTag = isKg ? " [КЫРГЫЗ ТИЛИ 🇰🇬]" : "";
        let message = `<b>⚡ НОВАЯ ЗАЯВКА НА ТЕСТ-ДРАЙВ OLYLIFE (${city.tgTag}${langTag}) с лендинга</b>\n\n`;
        message += `👤 <b>Имя:</b> ${formData.name}\n`;
        message += `📞 <b>Контакты:</b> ${formData.phone}\n`;
        message += `💼 <b>Профессия:</b> ${formData.profession}\n`;
        message += `📍 <b>Город:</b> ${city.cityName} (${city.countryName} ${city.flag})\n`;
        if (isKg) {
          message += `🌐 <b>Язык страницы:</b> Кыргызский (ky/kg)\n`;
        }
        if (formData.source) {
          message += `📝 <b>Форма:</b> ${formData.source}\n`;
        }
        message += `🕒 <b>Время заявки:</b> ${dateStr} (${city.timeZoneLabel})`;

        if (trackingData.utm_source || trackingData.utm_campaign || trackingData.utm_content || trackingData.utm_medium || trackingData.utm_term || trackingData.fbclid) {
          message += `\n\n🎯 <b>МАРКЕТИНГОВЫЕ МЕТКИ (META / UTM):</b>\n`;
          if (trackingData.utm_source) message += `• Source: ${trackingData.utm_source}\n`;
          if (trackingData.utm_campaign) message += `• Campaign: ${trackingData.utm_campaign}\n`;
          if (trackingData.utm_content) message += `• Content (Пост/Объявление): ${trackingData.utm_content}\n`;
          if (trackingData.utm_medium) message += `• Medium: ${trackingData.utm_medium}\n`;
          if (trackingData.utm_term) message += `• Term: ${trackingData.utm_term}\n`;
          if (trackingData.fbclid) message += `• FBCLID: ${trackingData.fbclid.substring(0, 20)}...\n`;
        }

        const url = `https://api.telegram.org/bot${botToken.trim()}/sendMessage`;

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId.trim(),
              text: message,
              parse_mode: "HTML",
              disable_web_page_preview: true,
            }),
          });

          const data = await response.json();
          if (!data.ok) {
            console.error("Telegram API response error:", data);
            newRecord.telegramError = data.description || "Ошибка Telegram API";
          } else {
            newRecord.deliveredToTelegram = true;
          }
        } catch (tgNetworkErr) {
          console.error("Telegram network dispatch error:", tgNetworkErr);
          newRecord.telegramError = tgNetworkErr instanceof Error ? tgNetworkErr.message : "Сетевая ошибка Telegram";
        }

        // Meta Conversions API (CAPI) client-side dispatch
        const fbAccessToken = import.meta.env.VITE_FB_ACCESS_TOKEN || import.meta.env.VITE_META_ACCESS_TOKEN;
        const fbPixelId = import.meta.env.VITE_FB_PIXEL_ID || "1420624392253746";
        const fbTestCode = import.meta.env.VITE_FB_TEST_EVENT_CODE;
        if (fbAccessToken) {
          sendMetaCAPIClientSide(formData, trackingData, fbAccessToken, fbPixelId, fbTestCode).catch((capiErr) => {
            console.error("Meta CAPI dispatch error:", capiErr);
          });
        }
      } else {
        // Отправка на бэкенд Express API (Telegram + Facebook Conversions API)
        try {
          const response = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const data = await response.json();
          if (!response.ok) {
            console.error("Express API error:", data);
            newRecord.telegramError = data.error || data.message || "Ошибка отправки заявки";
          } else {
            newRecord.id = data.leadId || newRecord.id;
            newRecord.deliveredToTelegram = data.deliveredToTelegram || false;
            newRecord.deliveredToFacebook = data.deliveredToFacebook || false;
            newRecord.telegramError = data.telegramError;
            newRecord.facebookError = data.facebookError;
          }
        } catch (apiErr) {
          console.error("Express API network error:", apiErr);
          newRecord.telegramError = apiErr instanceof Error ? apiErr.message : "Сетевая ошибка бэкенда";
        }
      }

      setLatestLead(newRecord);
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error("Error submitting lead:", err);
      // Гарантируем открытие красивого модального окна Спасибо даже при непредвиденном сбое
      const fallbackRecord: LeadRecord = newRecord || {
        id: `lead_${Date.now()}`,
        ...formData,
        city: city.id,
        createdAt: new Date().toISOString(),
        deliveredToTelegram: false,
        telegramError: err instanceof Error ? err.message : String(err),
      };
      setLatestLead(fallbackRecord);
      setIsSuccessModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7F2] text-slate-900 font-sans selection:bg-[#C3EBD4] selection:text-[#0E5E2B]">

      {/* Sticky Header / Navigation Bar */}
      <Navbar city={city} translations={translations} />

      {/* Screen 1: Hero Section + VSL + Lead Capture Form */}
      <HeroSection
        city={city}
        translations={translations}
        onSubmitLead={handleLeadSubmit}
        isSubmitting={isSubmitting}
        formRef={heroFormRef}
      />

      {/* Screen 2: Target Audience & Pain Points */}
      <TargetAudienceSection
        translations={translations}
        onScrollToForm={scrollToForm}
      />

      {/* Screen 3: Technology Essence & Benefits */}
      <TechnologySection translations={translations} />

      {/* Screen 4: Test Drive + Final Form + Footer */}
      <TestDriveSection
        city={city}
        translations={translations}
        onSubmitLead={handleLeadSubmit}
        isSubmitting={isSubmitting}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenTerms={() => setIsTermsModalOpen(true)}
        formRef={footerFormRef}
      />

      {/* Interactive Modals */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        lead={latestLead}
        city={city}
        managerCity={city.successModalManagerCity}
        translations={translations}
      />

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        city={city}
        locale={translations.locale}
      />

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        city={city}
        locale={translations.locale}
      />

      {/* Floating Scroll-to-Top Button */}
      <ScrollToTopButton />

    </div>
  );
}
