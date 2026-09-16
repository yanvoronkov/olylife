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
import { initTracking, getTrackingPayload, trackMetaBrowserLead, sendMetaCAPIClientSide } from "./utils/tracking";

export default function App() {
  const [city] = useState<CityConfig>(getCurrentCity());
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latestLead, setLatestLead] = useState<LeadRecord | null>(null);

  const heroFormRef = useRef<HTMLDivElement>(null);
  const footerFormRef = useRef<HTMLDivElement>(null);

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
    try {
      // Сбор данных трекинга (fbclid, UTM-метки, _fbc, _fbp, eventId)
      const trackingData = getTrackingPayload();
      const payload: LeadFormData = {
        ...formData,
        city: city.id,
        tracking: trackingData,
      };

      // 1. Отправка события Lead в браузерный Meta Pixel (с eventID для дедупликации с CAPI)
      trackMetaBrowserLead(trackingData.eventId, {
        ...formData,
        source: `${formData.source || "Form"} [${city.cityName}]`,
      });

      // 2. Достижение цели в Яндекс.Метрике
      if (typeof (window as unknown as { ym?: (id: number, action: string, target: string) => void }).ym === "function") {
        (window as unknown as { ym: (id: number, action: string, target: string) => void }).ym(103911648, "reachGoal", "lead_form_submitted");
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

        let message = `<b>⚡ НОВАЯ ЗАЯВКА НА ТЕСТ-ДРАЙВ OLYLIFE (${city.tgTag}) с лендинга</b>\n\n`;
        message += `👤 <b>Имя:</b> ${formData.name}\n`;
        message += `📞 <b>Контакты:</b> ${formData.phone}\n`;
        message += `💼 <b>Профессия:</b> ${formData.profession}\n`;
        message += `📍 <b>Город:</b> ${city.cityName} (${city.countryName} ${city.flag})\n`;
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
          throw new Error(data.description || "Ошибка Telegram API");
        }

        // Meta Conversions API (CAPI) client-side dispatch
        const fbAccessToken = import.meta.env.VITE_FB_ACCESS_TOKEN || import.meta.env.VITE_META_ACCESS_TOKEN;
        const fbPixelId = import.meta.env.VITE_FB_PIXEL_ID || "1420624392253746";
        const fbTestCode = import.meta.env.VITE_FB_TEST_EVENT_CODE;
        if (fbAccessToken) {
          sendMetaCAPIClientSide(formData, trackingData, fbAccessToken, fbPixelId, fbTestCode).catch(() => { });
        }

        const newRecord: LeadRecord = {
          id: trackingData.eventId,
          ...payload,
          createdAt: new Date().toISOString(),
          deliveredToTelegram: true,
        };

        setLatestLead(newRecord);
        setIsSuccessModalOpen(true);
      } else {
        // Отправка на бэкенд Express API (Telegram + Facebook Conversions API)
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || data.message || "Ошибка отправки заявки");
        }

        const newRecord: LeadRecord = {
          id: data.leadId || trackingData.eventId,
          ...payload,
          createdAt: new Date().toISOString(),
          deliveredToTelegram: data.deliveredToTelegram || false,
          deliveredToFacebook: data.deliveredToFacebook || false,
          telegramError: data.telegramError,
          facebookError: data.facebookError,
        };

        setLatestLead(newRecord);
        setIsSuccessModalOpen(true);
      }
    } catch (err) {
      console.error("Error submitting lead:", err);
      alert("Заявка успешно зафиксирована!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7F2] text-slate-900 font-sans selection:bg-[#C3EBD4] selection:text-[#0E5E2B]">

      {/* Sticky Header / Navigation Bar */}
      <Navbar city={city} />

      {/* Screen 1: Hero Section + VSL + Lead Capture Form */}
      <HeroSection
        city={city}
        onSubmitLead={handleLeadSubmit}
        isSubmitting={isSubmitting}
        formRef={heroFormRef}
      />

      {/* Screen 2: Target Audience & Pain Points */}
      <TargetAudienceSection
        onScrollToForm={scrollToForm}
      />

      {/* Screen 3: Technology Essence & Benefits */}
      <TechnologySection />

      {/* Screen 4: Test Drive + Final Form + Footer */}
      <TestDriveSection
        city={city}
        onSubmitLead={handleLeadSubmit}
        isSubmitting={isSubmitting}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        formRef={footerFormRef}
      />

      {/* Interactive Modals */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        lead={latestLead}
        managerCity={city.successModalManagerCity}
      />

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />

      {/* Floating Scroll-to-Top Button */}
      <ScrollToTopButton />

    </div>
  );
}
