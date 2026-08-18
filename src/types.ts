import { TrackingData } from "./utils/tracking";

export interface LeadFormData {
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
}

export interface LeadRecord extends LeadFormData {
  id: string;
  createdAt: string;
  deliveredToTelegram: boolean;
  telegramError?: string;
  deliveredToFacebook?: boolean;
  facebookError?: string;
}

export interface TelegramConfig {
  hasToken: boolean;
  hasChatId: boolean;
  chatIdMasked?: string;
}

export interface FacebookConfig {
  configured: boolean;
  pixelId: string;
  hasAccessToken: boolean;
  accessTokenMasked?: string;
  testEventCode?: string;
}

export interface ProfessionInfo {
  id: string;
  title: string;
  iconName: string;
  benefit: string;
  description: string;
}

export interface PainPoint {
  id: string;
  text: string;
  highlight: string;
}

export interface ClientBenefit {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export interface DeviceFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
