import beautyCoworkingTashkent from "../../assets/beauty_coworking.jpeg";
import beautyCoworkingBishkek from "../../assets/beauty_coworking_bishkek.jpeg";
import beautyCoworkingAlmaty from "../../assets/beauty_coworking_almaty.jpeg";
import { CityId } from "../types";

export type { CityId };

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
    logoAlt: "OlyLife Кыргызстан логотип",
    heroTitleCity: "Бишкека 🇰🇬",
    formTitle: "🎁 Запишитесь на бесплатный тест-драйв в Бишкеке",
    videoTitle: "Видеопрезентация бизнес-модели и оборудования OlyLife в Бишкеке",
    coworkingImg: beautyCoworkingBishkek,
    coworkingAlt: "Демонстрационный зал и бьюти-пространство OlyLife в центре Бишкека",
    coworkingTitle: "Демонстрационный зал и бьюти-пространство OlyLife в центре Бишкека",
    successModalManagerCity: "в Бишкеке",
  },
  almaty: {
    id: "almaty",
    cityName: "Алматы",
    cityNameGenitive: "Алматы",
    cityNamePrepositional: "в Алматы",
    countryName: "Казахстан",
    flag: "🇰🇿",
    phoneCode: "+7",
    phonePlaceholder: "+7 (701) 123-45-67 или @username",
    currency: "KZT",
    timeZone: "Asia/Almaty",
    timeZoneLabel: "ALMT",
    tgTag: "АЛМАТЫ 🇰🇿",
    navbarCenterBadge: "В центре Алматы",
    navbarRightBadge: "Впервые в Казахстане",
    logoAlt: "OlyLife Казахстан логотип",
    heroTitleCity: "Алматы 🇰🇿",
    formTitle: "🎁 Запишитесь на бесплатный тест-драйв в Алматы",
    videoTitle: "Видеопрезентация бизнес-модели и оборудования OlyLife в Алматы",
    coworkingImg: beautyCoworkingAlmaty,
    coworkingAlt: "Демонстрационный зал и бьюти-пространство OlyLife в центре Алматы",
    coworkingTitle: "Демонстрационный зал и бьюти-пространство OlyLife в центре Алматы",
    successModalManagerCity: "в Алматы",
  },
  bali: {
    id: "bali",
    cityName: "Бали",
    cityNameGenitive: "Бали",
    cityNamePrepositional: "на Бали",
    countryName: "Индонезия",
    flag: "🇮🇩",
    phoneCode: "+62",
    phonePlaceholder: "+62 812 3456 7890 или +7 (999) 123-45-67",
    currency: "USD",
    timeZone: "Asia/Makassar",
    timeZoneLabel: "WITA",
    tgTag: "БАЛИ 🇮🇩",
    navbarCenterBadge: "На Бали",
    navbarRightBadge: "Впервые на Бали",
    logoAlt: "OlyLife Бали логотип",
    heroTitleCity: "Бали 🇮🇩",
    formTitle: "🎁 Запишитесь на бесплатный тест-драйв на Бали",
    videoTitle: "Видеопрезентация бизнес-модели и оборудования OlyLife на Бали",
    coworkingImg: beautyCoworkingAlmaty,
    coworkingAlt: "Демонстрационный зал и бьюти-пространство OlyLife на Бали",
    coworkingTitle: "Демонстрационный зал и бьюти-пространство OlyLife на Бали",
    successModalManagerCity: "на Бали",
  },
};

/**
 * Определяет текущий город по URL или data-атрибуту документа
 */
export function getCurrentCity(): CityConfig {
  if (typeof window !== "undefined") {
    const datasetCity = document.documentElement.dataset.city;
    const datasetLang = document.documentElement.dataset.lang;
    const htmlLang = document.documentElement.lang?.toLowerCase();
    const path = window.location.pathname.toLowerCase();

    if (datasetCity === "bali" || path.includes("/bali")) {
      return CITIES_CONFIG.bali;
    }

    if (datasetCity === "almaty" || path.includes("/almaty")) {
      return CITIES_CONFIG.almaty;
    }

    if (datasetCity === "bishkek" || datasetLang === "kg" || htmlLang === "ky" || htmlLang === "kg" || path.includes("/bishkek") || path.includes("/kg")) {
      return CITIES_CONFIG.bishkek;
    }
  }

  return CITIES_CONFIG.tashkent;
}
