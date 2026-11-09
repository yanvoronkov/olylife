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
import { initTracking, getTrackingPayload, trackMetaBrowserLead } from "./utils/tracking";

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

    try {
      // 1. Валидация номера телефона (минимум 9 цифр)
      const digits = (formData.phone || "").replace(/\D/g, "");
      if (digits.length < 9) {
        alert(
          isKg
            ? "Сураныч, телефон номериңизди туура жазыңыз (кеминде 9 сан)."
            : "Пожалуйста, введите корректный номер телефона (не менее 9 цифр)."
        );
        setIsSubmitting(false);
        return;
      }

      // 2. Сбор данных трекинга (fbclid, UTM-метки, _fbc, _fbp, eventId)
      const trackingData = getTrackingPayload();
      const webhookUrl =
        import.meta.env.VITE_LEAD_WEBHOOK_URL ||
        "https://automations.inetskills.ru/webhook/olylife-lead";

      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        profession: formData.profession || "Не указана",
        city: city.id,
        cityName: city.cityName,
        countryName: city.countryName,
        timeZone: city.timeZone,
        language: isKg ? "kg" : "ru",
        source: formData.source || "Website Form",
        turnstileToken: formData.turnstileToken || "",
        tracking: {
          ...trackingData,
          eventSourceUrl: typeof window !== "undefined" ? window.location.href : trackingData.eventSourceUrl,
          referrer: typeof document !== "undefined" ? document.referrer : trackingData.referrer,
        },
      };

      // 3. Отправка на защищенный серверный шлюз n8n
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Ошибка сервера (${response.status})`);
      }

      const result = await response.json().catch(() => ({ success: true }));

      // 4. ТОЛЬКО при успешной фиксации на сервере:
      // А) Отправляем Lead в браузерный Meta Pixel (с тем же eventId для дедупликации)
      try {
        trackMetaBrowserLead(trackingData.eventId, {
          profession: formData.profession,
          source: `${formData.source || "Form"} [${city.cityName}${isKg ? " KG" : ""}]`,
        });
      } catch (pixelErr) {
        console.error("Meta Browser Lead tracking error:", pixelErr);
      }

      // Б) Яндекс.Метрика цель
      try {
        if (
          typeof (window as unknown as { ym?: (id: number, action: string, target: string) => void })
            .ym === "function"
        ) {
          (window as unknown as { ym: (id: number, action: string, target: string) => void }).ym(
            103911648,
            "reachGoal",
            "lead_form_submitted"
          );
        }
      } catch (ymErr) {
        console.error("Yandex Metrika tracking error:", ymErr);
      }

      // В) Сохраняем запись и показываем модальное окно «Спасибо»
      const record: LeadRecord = {
        id: (result as { eventId?: string }).eventId || trackingData.eventId,
        ...formData,
        city: city.id,
        createdAt: new Date().toISOString(),
        deliveredToTelegram: true,
      };

      setLatestLead(record);
      setIsSuccessModalOpen(true);
    } catch (err: unknown) {
      console.error("Error submitting lead:", err);
      alert(
        isKg
          ? "Байланыш катасы кетти. Сураныч, бизге WhatsApp аркылуу жазыңыз же чалыңыз."
          : "Произошла ошибка связи при отправке заявки. Пожалуйста, напишите нам в WhatsApp или позвоните напрямую."
      );
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
