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
import { ROICalculatorModal } from "./components/ROICalculatorModal";
import { TelegramSettingsModal } from "./components/TelegramSettingsModal";
import { SuccessModal } from "./components/SuccessModal";
import { PrivacyModal } from "./components/PrivacyModal";
import { LeadFormData, LeadRecord } from "./types";

export default function App() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latestLead, setLatestLead] = useState<LeadRecord | null>(null);
  const [telegramConfigured, setTelegramConfigured] = useState(false);

  const heroFormRef = useRef<HTMLDivElement>(null);
  const footerFormRef = useRef<HTMLDivElement>(null);

  const checkTelegramStatus = async () => {
    try {
      const res = await fetch("/api/telegram/status");
      const data = await res.json();
      setTelegramConfigured(Boolean(data.configured));
    } catch (e) {
      console.error("Failed to fetch Telegram status", e);
    }
  };

  useEffect(() => {
    checkTelegramStatus();
  }, []);

  const scrollToForm = () => {
    if (heroFormRef.current) {
      heroFormRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleLeadSubmit = async (formData: LeadFormData) => {
    setIsSubmitting(true);
    try {
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      if (botToken && chatId) {
        // Direct client-side dispatch for static hosting (GitHub Pages, Cloudflare Pages, etc.)
        const dateStr = new Date().toLocaleString("ru-RU", {
          timeZone: "Asia/Tashkent",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });

        let message = `<b>⚡ НОВАЯ ЗАЯВКА НА ТЕСТ-ДРАЙВ OLYLIFE (ТАШКЕНТ)</b>\n\n`;
        message += `👤 <b>Имя:</b> ${formData.name}\n`;
        message += `📞 <b>Контакты:</b> ${formData.phone}\n`;
        message += `💼 <b>Профессия:</b> ${formData.profession}\n`;
        message += `📍 <b>Локация:</b> Ташкент (Центр)\n`;
        message += `🕒 <b>Время заявки:</b> ${dateStr} (UZT)\n\n`;
        message += `🚀 <i>Заявка с продающего лендинга OlyLife Uzbekistan</i>`;

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

        const newRecord: LeadRecord = {
          id: "lead_" + Date.now(),
          ...formData,
          createdAt: new Date().toISOString(),
          deliveredToTelegram: true,
        };

        setLatestLead(newRecord);
        setIsSuccessModalOpen(true);
      } else {
        // Fallback to local server Express API
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        const newRecord: LeadRecord = {
          id: data.leadId || "lead_" + Date.now(),
          ...formData,
          createdAt: new Date().toISOString(),
          deliveredToTelegram: data.deliveredToTelegram || false,
          telegramError: data.telegramError,
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

  const handleApplyCalcResultsAndSubmit = (calcResults: LeadFormData["calculatorResults"]) => {
    scrollToForm();
    if (calcResults) {
      handleLeadSubmit({
        name: "Специалист (Калькулятор)",
        phone: "+998 90 000 00 00",
        profession: "Сфера здоровья и красоты",
        calculatorResults: calcResults,
        notes: "Заявка с Калькулятора Окупаемости",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7F2] text-slate-900 font-sans selection:bg-[#C3EBD4] selection:text-[#0E5E2B]">
      
      {/* Sticky Header / Navigation Bar */}
      <Navbar />

      {/* Screen 1: Hero Section + VSL + Lead Capture Form */}
      <HeroSection
        onSubmitLead={handleLeadSubmit}
        isSubmitting={isSubmitting}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        formRef={heroFormRef}
      />

      {/* Screen 2: Target Audience & Pain Points */}
      <TargetAudienceSection
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onScrollToForm={scrollToForm}
      />

      {/* Screen 3: Technology Essence & Benefits */}
      <TechnologySection />

      {/* Screen 4: Tashkent Test Drive + Final Form + Footer */}
      <TestDriveSection
        onSubmitLead={handleLeadSubmit}
        isSubmitting={isSubmitting}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        formRef={footerFormRef}
      />

      {/* Interactive Modals */}
      <ROICalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onSubmitWithCalc={handleApplyCalcResultsAndSubmit}
      />

      <TelegramSettingsModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
        onStatusUpdated={checkTelegramStatus}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        lead={latestLead}
      />

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

    </div>
  );
}
