import React, { useState, useEffect } from 'react';
import { AstanaNavbar } from '@/src/components/astana/Navbar';
import { AstanaHero } from '@/src/components/astana/Hero';
import { AstanaPainPoints } from '@/src/components/astana/PainPoints';
import { AstanaBenefits } from '@/src/components/astana/Benefits';
import { AstanaFounderVideo } from '@/src/components/astana/FounderVideo';
import { AstanaOfferCta } from '@/src/components/astana/OfferCta';
import { AstanaFooter } from '@/src/components/astana/Footer';
import { AstanaSuccessModal } from '@/src/components/astana/SuccessModal';
import { AstanaPrivacyModal } from '@/src/components/astana/PrivacyModal';
import { AstanaScrollNavButton } from '@/src/components/astana/ScrollNavButton';
import { initAstanaTrackingParams } from '@/src/utils/astanaTracking';
import { AstanaTrackingData } from '@/src/types/astanaClinic';

/**
 * Корневой компонент лендинга клиники OSAM в Астане (yarkozhivi.space/astana/).
 * Направление «Продукт» — полностью изолирован от страниц направления «Бизнес» (Алматы, Бишкек, Ташкент, KG).
 */
export const AstanaApp: React.FC = () => {
  const [tracking, setTracking] = useState<AstanaTrackingData>({
    eventId: '',
    eventSourceUrl: 'https://yarkozhivi.space/astana/',
    referrer: '',
    userAgent: '',
  });

  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [successData, setSuccessData] = useState<{
    isOpen: boolean;
    name: string;
    phone: string;
    whatsappUrl: string;
  }>({
    isOpen: false,
    name: '',
    phone: '',
    whatsappUrl: '',
  });

  useEffect(() => {
    const params = initAstanaTrackingParams();
    setTracking(params);
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById('booking-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSuccessSubmit = (data: { name: string; phone: string; whatsappUrl: string }) => {
    setSuccessData({
      isOpen: true,
      name: data.name,
      phone: data.phone,
      whatsappUrl: data.whatsappUrl,
    });
  };

  return (
    <div className="min-h-screen bg-[#F0F7F2] text-[#0A2B1D] font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Шапка: логотип, телефон, написать в WhatsApp */}
      <AstanaNavbar />

      <main className="flex-grow">
        {/* Разворот 1: Главный экран (Hero) */}
        <AstanaHero onOpenBooking={scrollToBooking} />

        {/* Разворот 2: Проблематика (Боли) */}
        <AstanaPainPoints />

        {/* Разворот 3: Решение и выгоды (Как работает) */}
        <AstanaBenefits />

        {/* Разворот 4: Экспертность, контакты и карта */}
        <AstanaFounderVideo />

        {/* Разворот 5: Финальный призыв к действию (CTA) */}
        <AstanaOfferCta
          tracking={tracking}
          onSuccess={handleSuccessSubmit}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
        />
      </main>

      {/* Подвал с реквизитами лицензии */}
      <AstanaFooter onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      {/* Модальное окно подтверждения заявки */}
      <AstanaSuccessModal
        isOpen={successData.isOpen}
        name={successData.name}
        phone={successData.phone}
        whatsappUrl={successData.whatsappUrl}
        onClose={() => setSuccessData((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Модальное окно Политики конфиденциальности */}
      <AstanaPrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
      {/* Интерактивная Liquid Glass кнопка быстрой прокрутки (вверх/вниз) */}
      <AstanaScrollNavButton />
    </div>
  );
};

export default AstanaApp;
