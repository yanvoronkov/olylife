import beautyCoworkingTashkent from "../../assets/beauty_coworking.jpeg";
import beautyCoworkingBishkek from "../../assets/beauty_coworking_bishkek.jpeg";

export type CityId = "tashkent" | "bishkek";

export interface CityConfig {
  id: CityId;
  cityName: string;
  cityNameGenitive: string;
  cityNamePrepositional: string;
  countryName: string;
  flag: string;
  phoneCode: string;
  phonePlaceholder: string;
  currency: string;
  timeZone: string;
  timeZoneLabel: string;
  tgTag: string;
  navbarCenterBadge: string;
  navbarRightBadge: string;
  logoAlt: string;
  heroTitleCity: string;
  formTitle: string;
  videoTitle: string;
  coworkingImg: string;
  coworkingAlt: string;
  coworkingTitle: string;
  successModalManagerCity: string;
}

export const CITIES_CONFIG: Record<CityId, CityConfig> = {
  tashkent: {
    id: "tashkent",
    cityName: "Ташкент",
    cityNameGenitive: "Ташкента",
    cityNamePrepositional: "в Ташкенте",
    countryName: "Узбекистан",
    flag: "🇺🇿",
    phoneCode: "+998",
    phonePlaceholder: "+998 (90) 123-45-67 или @username",
    currency: "UZS",
    timeZone: "Asia/Tashkent",
    timeZoneLabel: "UZT",
    tgTag: "ТАШКЕНТ 🇺🇿",
    navbarCenterBadge: "Центр Ташкента",
    navbarRightBadge: "Впервые в Узбекистане",
    logoAlt: "OlyLife Uzbekistan логотип",
    heroTitleCity: "Ташкента 🇺🇿",
    formTitle: "🎁 Запишитесь на бесплатный тест-драйв в Ташкенте",
    videoTitle: "Видеопрезентация бизнес-модели и оборудования OlyLife в Ташкенте",
    coworkingImg: beautyCoworkingTashkent,
    coworkingAlt: "Бьюти-коворкинг и демонстрационное пространство OlyLife в центре Ташкента",
    coworkingTitle: "Демонстрационный зал и бьюти-пространство OlyLife в центре Ташкента",
    successModalManagerCity: "в Ташкенте",
  },
  bishkek: {
    id: "bishkek",
    cityName: "Бишкек",
    cityNameGenitive: "Бишкека",
    cityNamePrepositional: "в Бишкеке",
    countryName: "Кыргызстан",
    flag: "🇰🇬",
    phoneCode: "+996",
    phonePlaceholder: "+996 (700) 123-456 или @username",
    currency: "KGS",
    timeZone: "Asia/Bishkek",
    timeZoneLabel: "KGT",
    tgTag: "БИШКЕК 🇰🇬",
    navbarCenterBadge: "Центр Бишкека",
    navbarRightBadge: "Впервые в Кыргызстане",
    logoAlt: "OliLife Кыргызстан логотип",
    heroTitleCity: "Бишкека 🇰🇬",
    formTitle: "🎁 Запишитесь на бесплатный тест-драйв в Бишкеке",
    videoTitle: "Видеопрезентация бизнес-модели и оборудования OlyLife в Бишкеке",
    coworkingImg: beautyCoworkingBishkek,
    coworkingAlt: "Демонстрационный зал и бьюти-пространство OlyLife в центре Бишкека",
    coworkingTitle: "Демонстрационный зал и бьюти-пространство OlyLife в центре Бишкека",
    successModalManagerCity: "в Бишкеке",
  },
};

/**
 * Определяет текущий город по URL или data-атрибуту документа
 */
export function getCurrentCity(): CityConfig {
  if (typeof window !== "undefined") {
    const datasetCity = document.documentElement.dataset.city;
    if (datasetCity === "bishkek") {
      return CITIES_CONFIG.bishkek;
    }

    const path = window.location.pathname.toLowerCase();
    if (path.includes("/bishkek")) {
      return CITIES_CONFIG.bishkek;
    }
  }

  return CITIES_CONFIG.tashkent;
}
