/**
 * Интерфейсы и типы данных для лендинга клиники OSAM в Астане (yarkozhivi.space/astana/).
 * Соответствует стандартам TypeScript Strict Mode экосистемы Antigravity.
 */

export interface ClinicCoordinates {
  readonly lat: number;
  readonly lng: number;
}

export interface ClinicPriceConfig {
  readonly standardPrice: number;
  readonly discountPrice: number;
  readonly discountPercent: number;
  readonly currencySymbol: string;
  readonly currencyCode: string;
}

export interface ClinicLegalInfo {
  readonly legalEntity: string;
  readonly licenseNumber: string;
  readonly licenseDate: string;
  readonly authority: string;
}

export interface ClinicConfig {
  readonly brandName: string;
  readonly clinicFullName: string;
  readonly hostClinicName: string;
  readonly city: string;
  readonly cityId: string;
  readonly address: string;
  readonly fullAddress: string;
  readonly coordinates: ClinicCoordinates;
  readonly phoneFormatted: string;
  readonly phoneRaw: string;
  readonly whatsappPhone: string;
  readonly whatsappDefaultMessage: string;
  readonly twoGisMapUrl: string;
  readonly workingHours: string;
  readonly founderName: string;
  readonly founderTitle: string;
  readonly founderBio: string;
  readonly prices: ClinicPriceConfig;
  readonly legal: ClinicLegalInfo;
  readonly webhookUrl: string;
  readonly metaPixelId: string;
  readonly yandexMetrikaId: number;
}

export interface AstanaLeadFormData {
  name: string;
  phone: string;
  source?: string;
}

export interface AstanaTrackingData {
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

export interface AstanaLeadSubmitPayload {
  readonly lead: AstanaLeadFormData;
  readonly tracking: AstanaTrackingData;
  readonly city: string;
  readonly clinic: string;
  readonly submittedAt: string;
}

export interface AstanaLeadSubmitResult {
  readonly success: boolean;
  readonly message?: string;
  readonly whatsappFallbackUrl: string;
}

export interface PainPointItem {
  readonly id: string;
  readonly iconName: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly impactTag: string;
}

export interface BenefitItem {
  readonly id: string;
  readonly iconName: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly badge: string;
}
