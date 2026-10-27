import videoPreviewRu from "../../assets/video_preview.jpg";
import videoPreviewKg from "../../assets/video_preview_kg.png";

export type Locale = "ru" | "kg";

export interface Translations {
  locale: Locale;
  navbar: {
    locationBadge: string;
    firstInCountryBadge: string;
    logoAlt: string;
    switchLangText: string;
    switchLangHref: string;
  };
  hero: {
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix?: string;
    subtitle: string;
    videoHeading: string;
    videoWatchBtn: string;
    videoSrc: string;
    videoPoster: string;
    trustCards: {
      guarantee: string;
      noMedEducation: string;
      noConsumables: string;
    };
    form: {
      title: string;
      nameLabel: string;
      namePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      professionLabel: string;
      professionOptions: string[];
      submitBtn: string;
      submittingBtn: string;
      privacyNote: string;
    };
  };
  targetAudience: {
    title: string;
    subtitle: string;
    professions: {
      id: string;
      title: string;
      iconName: string;
    }[];
    painPointsTitle: string;
    painPoints: {
      id: string;
      title: string;
      description: string;
    }[];
    painPointsCallout: string;
  };
  technology: {
    badge: string;
    title: string;
    subtitle: string;
    advantagesHeading: string;
    advantages: {
      id: string;
      title: string;
      description?: string;
      iconName: string;
    }[];
    clientBenefitsTitle: string;
    clientBenefitsSubtitle: string;
    clientBenefits: {
      id: string;
      title: string;
      iconName: string;
    }[];
    disclaimer: string;
  };
  testDrive: {
    badge: string;
    title: string;
    description: string;
    bullets: string[];
    formTitle: string;
    urgencyBadge: string;
    submitBtn: string;
    submittingBtn: string;
    privacyNote: string;
  };
  footer: {
    copyright: string;
    wellnessNotice: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  successModal: {
    title: string;
    getMessage: (name: string, managerCity: string) => string;
  };
  privacyModal: {
    title: string;
    subtitle: string;
  };
  termsModal: {
    title: string;
  };
}

export const TRANSLATIONS: Record<Locale, Translations> = {
  ru: {
    locale: "ru",
    navbar: {
      locationBadge: "Центр Бишкека",
      firstInCountryBadge: "Впервые в Кыргызстане",
      logoAlt: "OliLife Кыргызстан логотип",
      switchLangText: "🇰🇬 КЫР",
      switchLangHref: "/kg/",
    },
    hero: {
      titlePrefix: "Как специалистам сферы здоровья и красоты Бишкека ",
      titleHighlight: "удвоить (X2) доход в кабинете",
      subtitle: "Без необходимости больше работать, найма персонала и вложений в рекламу",
      videoHeading: "🎬 Посмотрите 5-минутное видео о бизнес-модели",
      videoWatchBtn: "Смотреть видео",
      videoSrc: "https://video.inetskills.ru/oliylife_presentation.mp4",
      videoPoster: videoPreviewRu,
      trustCards: {
        guarantee: "Сертифицированная продукция и официальная гарантия",
        noMedEducation: "Не требуется медицинское образование",
        noConsumables: "Без расходов на расходные материалы",
      },
      form: {
        title: "🎁 Запишитесь на бесплатный тест-драйв в Бишкеке",
        nameLabel: "Ваше имя",
        namePlaceholder: "Иван Иванов",
        phoneLabel: "Телефон / WhatsApp / Telegram",
        phonePlaceholder: "+996 (700) 123-456 или @username",
        professionLabel: "Ваша сфера деятельности:",
        professionOptions: [
          "Массажист",
          "Косметолог",
          "Телесный терапевт",
          "Тренер",
          "Нутрициолог",
          "Подолог",
          "Другое",
        ],
        submitBtn: "ЗАПИСАТЬСЯ НА ТЕСТ\u2011ДРАЙВ",
        submittingBtn: "Запись...",
        privacyNote: "Ваши данные конфиденциальны.",
      },
    },
    targetAudience: {
      title: "Для кого подходит наилучшим образом?",
      subtitle: "Для специалистов сферы красоты и здоровья",
      professions: [
        { id: "massage", title: "Массажисты", iconName: "Massage" },
        { id: "body_therapist", title: "Телесные терапевты", iconName: "Activity" },
        { id: "cosmetologist", title: "Косметологи", iconName: "Sparkles" },
        { id: "fitness_trainer", title: "Фитнес / йога тренеры", iconName: "Dumbbell" },
        { id: "nutritionist", title: "Нутрициологи / детокс-эксперты", iconName: "Apple" },
        { id: "podologist", title: "Мастера маникюра / Подологи", iconName: "Footprints" },
      ],
      painPointsTitle: "Каждый рано или поздно сталкивается с этим:",
      painPoints: [
        {
          id: "fatigue",
          title: "Физическое ограничение",
          description: "Сильно устаете к концу дня, и сил ни на что не остается.",
        },
        {
          id: "financial_cap",
          title: "Финансовый потолок в 24 часах",
          description: "Чтобы зарабатывать больше, приходится либо поднимать цены, либо пахать без выходных.",
        },
        {
          id: "competition",
          title: "Высокая конкуренция",
          description: "Крупные игроки и новички демпингуют цены, нужно постоянно добывать новых клиентов для записи.",
        },
        {
          id: "no_pause",
          title: "Нельзя остановиться",
          description: "Если заболели, уехали в отпуск или взяли выходной — денежный поток мгновенно останавливается.",
        },
      ],
      painPointsCallout: "Хотите удвоить доход без перегрузок и найма персонала? Пора рассмотреть новые возможности.",
    },
    technology: {
      badge: "ТЕХНОЛОГИЯ OLYLIFE",
      title: "Разместите у себя портативную «станцию биохакинга» и добавьте высокомаржинальную услугу к вашей основной процедуре",
      subtitle: "Монетизируйте текущую базу, реанимируйте уснувшую аудиторию и получайте партнерский % с реализации оборудования.",
      advantagesHeading: "Ключевые преимущества для вас",
      advantages: [
        { id: "duration", title: "Сеанс длится 20 минут", iconName: "Clock" },
        { id: "hands_free", title: "Не требует участия", iconName: "UserCheck" },
        { id: "wow_effect", title: "Вызывает вау-эффект", iconName: "Sparkles" },
        { id: "compact", title: "Занимает 1 кв. м площади", iconName: "Maximize2" },
      ],
      clientBenefitsTitle: "Что это дает клиентам?",
      clientBenefitsSubtitle: "В основе — запатентованное сочетание импульсного электромагнитного воздействия (PEMF) и терагерцовых волн (THz), которое решает главную проблему горожан — хроническую усталость.",
      clientBenefits: [
        { id: "blood_flow", title: "Разгоняет кровообращение и лимфоток", iconName: "RefreshCw" },
        { id: "sleep", title: "Нормализует сон", iconName: "Moon" },
        { id: "metabolism", title: "Ускоряет метаболизм", iconName: "Activity" },
        { id: "digestion", title: "Способствует улучшению пищеварения", iconName: "Salad" },
        { id: "tension", title: "Снимает нервное напряжение", iconName: "Smile" },
        { id: "atp_energy", title: "Заряжает клетки энергией (АТФ)", iconName: "BatteryCharging" },
      ],
      disclaimer: "Важное примечание: продукция относится к категории бытовых оздоровительных приборов (Wellness). Не является лекарственным средством и медицинским оборудованием. Не гарантирует медицинского излечения заболеваний.",
    },
    testDrive: {
      badge: "БИШКЕКТЕ ТЕСТ-ДРАЙВ",
      title: "Проверьте на себе и оцените результат!",
      description: "Приезжайте в наше демо-пространство в центре Бишкека, пройдите сеанс, задайте уточняющие вопросы, и мы обсудим персональный план запуска под ваш график.",
      bullets: [
        "Ознакомление с принципом работы оборудования",
        "Прохождение тестового сеанса",
        "Ответы на все ваши вопросы",
        "Обсуждение возможностей внедрения в ваш кабинет",
        "План запуска с учетом вашего рабочего графика",
      ],
      formTitle: "🎁 Запишитесь на бесплатный тест-драйв в Бишкеке",
      urgencyBadge: "Осталось 5 свободных окошек на этой неделе",
      submitBtn: "ЗАПИСАТЬСЯ НА ТЕСТ\u2011ДРАЙВ",
      submittingBtn: "Запись...",
      privacyNote: "Ваши данные конфиденциальны.",
    },
    footer: {
      copyright: "OlyLife © 2026. Все права защищены.",
      wellnessNotice: "Бытовая продукция категории Wellness. Не является лекарственным средством и медицинским оборудованием.",
      privacyPolicy: "Политика конфиденциальности",
      termsOfService: "Условия использования",
    },
    successModal: {
      title: "Заявка успешно принята! 🚀",
      getMessage: (name, managerCity) =>
        `Спасибо, ${name || "уважаемый специалист"}! Наш менеджер ${managerCity} уже получил уведомление и свяжется с вами для согласования времени тест-драйва.`,
    },
    privacyModal: {
      title: "Политика конфиденциальности",
      subtitle: "В соответствии с Законом Кыргызской Республики от 14 апреля 2008 года № 58 «Об информации персонального характера»",
    },
    termsModal: {
      title: "Условия использования сайта и сервиса",
    },
  },

  kg: {
    locale: "kg",
    navbar: {
      locationBadge: "Бишкек шаарынын борбору",
      firstInCountryBadge: "Кыргызстанда алгачкы жолу!",
      logoAlt: "OlyLife Кыргызстан логотиби",
      switchLangText: "🇷🇺 РУС",
      switchLangHref: "/bishkek/",
    },
    hero: {
      titlePrefix: "Ден соолук жана сулуулук тармагындагы адистер Бишкекте ",
      titleHighlight: "кирешесин 2 эсеге кантип көбөйтө алышат?",
      subtitle: "Мындан көп иштөөнүн, кызматкерлерди жалдоонун жана жарнамага кошумча каражат коротуунун зарылдыгы жок.",
      videoHeading: "🎬 Бизнес-модель тууралуу 5 мүнөттүк видеону көрүңүз",
      videoWatchBtn: "Видеону көрүү",
      videoSrc: "https://video.inetskills.ru/oliylife_presentation_kg.mp4",
      videoPoster: videoPreviewKg,
      trustCards: {
        guarantee: "Сертификатталган продукция жана расмий кепилдик",
        noMedEducation: "Медициналык билимдин болушу талап кылынбайт",
        noConsumables: "Кошумча сарпталуучу материалдарга чыгым жок",
      },
      form: {
        title: "🎁 Бишкекте акысыз тест-драйвга жазылыңыз жана өз бизнесиңиздин өзүн-өзү актоо мөөнөтүн эсептөөчү калькуляторду алыңыз!",
        nameLabel: "Атыңыз:",
        namePlaceholder: "Атыңызды жазыңыз",
        phoneLabel: "Байланыш номериңиз:",
        phonePlaceholder: "Телефон / Telegram / WhatsApp",
        professionLabel: "Кайсы тармакта иштейсиз?",
        professionOptions: [
          "Массажист",
          "Косметолог",
          "Денени калыбына келтирүү боюнча адис",
          "Фитнес же йога боюнча машыктыруучу",
          "Нутрициолог",
          "Подолог",
          "Башка",
        ],
        submitBtn: "АКЫСЫЗ ТЕСТ\u2011ДРАЙВГА ЖАЗЫЛУУ",
        submittingBtn: "Жазылууда...",
        privacyNote: "Сиздин маалыматтарыңыз купуя сакталат.",
      },
    },
    targetAudience: {
      title: "БУЛ ЧЕЧИМ КИМДЕР ҮЧҮН ЫҢГАЙЛУУ?",
      subtitle: "Ден соолук жана сулуулук тармагында иштеген адистер үчүн",
      professions: [
        { id: "massage", title: "Массажисттер", iconName: "Massage" },
        { id: "body_therapist", title: "Дене менен иштөөчү адистер", iconName: "Activity" },
        { id: "cosmetologist", title: "Косметологдор", iconName: "Sparkles" },
        { id: "fitness_trainer", title: "Фитнес жана йога машыктыруучулары", iconName: "Dumbbell" },
        { id: "nutritionist", title: "Нутрициологдор жана детокс боюнча адистер", iconName: "Apple" },
        { id: "podologist", title: "Маникюр чеберлери жана подологдор", iconName: "Footprints" },
      ],
      painPointsTitle: "Ар бир адис эртеби-кечпи төмөнкү көйгөйлөргө туш болот:",
      painPoints: [
        {
          id: "fatigue",
          title: "Физикалык чарчоо",
          description: "Күндүн аягында катуу чарчайсыз. Өзүңүзгө, үй-бүлөңүзгө жана жеке жашооңузга күч калбайт.",
        },
        {
          id: "financial_cap",
          title: "Кирешенин чеги",
          description: "Көбүрөөк акча табуу үчүн кызматтарыңыздын баасын көтөрүүгө же дем алышсыз иштөөгө туура келет. Бирок убактыңыз чектелүү.",
        },
        {
          id: "competition",
          title: "Атаандаштыктын күчөшү",
          description: "Рынокто атаандаштар көбөйүүдө. Кээ бирлери бааны төмөндөтүп, кардарларды өзүнө тартууга аракет кылышат. Сиз болсо кардарлардын агымын сактап калуу үчүн тынымсыз аракеттенесиз.",
        },
        {
          id: "no_pause",
          title: "Иштебесеңиз, киреше да токтойт",
          description: "Ооруп калсаңыз, эс алууга кетсеңиз же бир күнгө ишти токтотсоңуз, кирешеңиз да азаят же токтоп калат.",
        },
      ],
      painPointsCallout: "Эгер кирешеңизди көбөйтүп, ошол эле учурда жумуш жүгүңүздү арттырбоону кааласаңыз, анда кошумча мүмкүнчүлүктөрдү карап көрүүгө убакыт келди.",
    },
    technology: {
      badge: "ЧЕЧИМ: OLYLIFE ТЕХНОЛОГИЯСЫ",
      title: "Кабинетиңизге жаңы кызмат кошуп, кирешеңизди көбөйтүңүз!",
      subtitle: "Портативдүү биохакинг станциясын орнотуп, негизги кызматтарыңызга кошумча кирешелүү кызматты киргизиңиз. Учурдагы кардарларыңызга жаңы кызмат сунуштаңыз, мурда активдүү болгон кардарларыңыз менен кайра байланышыңыз жана жабдууну сатуу аркылуу өнөктөштүк киреше алуу мүмкүнчүлүгүн карап көрүңүз.",
      advantagesHeading: "Сиз үчүн кандай артыкчылыктар бар?",
      advantages: [
        { id: "duration", title: "20 мүнөттүк сеанс", description: "Сеанстын узактыгы — болгону 20 мүнөт.", iconName: "Clock" },
        { id: "hands_free", title: "Минималдуу катышуу", description: "Сеанс учурунда адистин түздөн-түз катышуусу минималдуу болушу мүмкүн.", iconName: "UserCheck" },
        { id: "wow_effect", title: "Кардарлар үчүн жаңы тажрыйба", description: "Кызмат көрсөтүүлөрүңүзгө заманбап технологияны кошуп, кардарларыңызга жаңы тажрыйба сунуштаңыз.", iconName: "Sparkles" },
        { id: "compact", title: "Аз орун ээлейт", description: "Жабдууну жайгаштыруу үчүн болжол менен 1 м² орун жетиштүү.", iconName: "Maximize2" },
      ],
      clientBenefitsTitle: "Бул технология кардарларыңызга эмне сунуштайт?",
      clientBenefitsSubtitle: "OlyLife жабдуусунун технологиялык негизин импульстук электромагниттик талаа (PEMF) жана терагерцтик толкундар (THz) менен байланышкан технологиялар түзөт. Максат — кардарларыңызга ден соолугуна жана жалпы абалына кам көрүү үчүн жаңы мүмкүнчүлүк сунуштоо. Жабдуунун өндүрүүчүсү билдирген функциялардын негизинде төмөнкү багыттар көрсөтүлүшү мүмкүн:",
      clientBenefits: [
        { id: "blood_flow", title: "Кан айлануу жана лимфа айлануу процесстерин колдоого багытталган технология", iconName: "RefreshCw" },
        { id: "sleep", title: "Уйкунун сапатын колдоого багытталган ыкма", iconName: "Moon" },
        { id: "metabolism", title: "Организмдеги зат алмашуу процесстерине багытталган технология", iconName: "Activity" },
        { id: "digestion", title: "Тамак сиңирүү системасынын иштешин колдоого багытталган багыт", iconName: "Salad" },
        { id: "tension", title: "Эс алууга жана чыңалууну азайтууга багытталган сеанс", iconName: "Smile" },
        { id: "atp_energy", title: "Клеткалардагы энергия алмашуу процесстерине байланыштуу технология", iconName: "BatteryCharging" },
      ],
      disclaimer: "Маанилүү эскертүү: Жогорудагы функциялардын жана натыйжалардын ар бири өндүрүүчүнүн расмий документтери менен ырасталууга тийиш. Жабдуунун медициналык каражат катары каттоосу жок болсо, ооруларды дарылоо же конкреттүү физиологиялык натыйжаларга кепилдик берүү тууралуу билдирүүлөрдү колдонбоо керек.",
    },
    testDrive: {
      badge: "БИШКЕКТЕГИ АКЫСЫЗ ТЕСТ-ДРАЙВ",
      title: "Технологияны өзүңүз сынап көрүңүз!",
      description: "Биздин Бишкек шаарындагы демо-мейкиндигибизге келип, жабдууну жакындан көрүңүз жана сеанстан өтүңүз.",
      bullets: [
        "Жабдуунун иштөө принциби менен таанышуу",
        "Тесттик сеанстан өтүү",
        "Суроолоруңузга жооп алуу",
        "Кабинетиңизге киргизүү мүмкүнчүлүгүн талкуулоо",
        "Өзүңүздүн иш графигиңизге ылайык ишке киргизүү планын талкуулоо",
      ],
      formTitle: "🎁 Акысыз тест-драйвга жазылыңыз жана кирешелүүлүктү эсептөөчү калькуляторду алыңыз!",
      urgencyBadge: "⏳ Бул жумага тест-драйв үчүн 5 гана бош убакыт калды!",
      submitBtn: "АКЫСЫЗ ТЕСТ\u2011ДРАЙВГА ЖАЗЫЛУУ",
      submittingBtn: "Жазылууда...",
      privacyNote: "Сиздин маалыматтарыңыз купуя сакталат.",
    },
    footer: {
      copyright: "OlyLife © 2026. Бардык укуктар корголгон.",
      wellnessNotice: "Бул продукция Wellness категориясына кирет. Дары каражаты жана медициналык жабдуу болуп саналбайт.",
      privacyPolicy: "Купуялык саясаты",
      termsOfService: "Колдонуу шарттары",
    },
    successModal: {
      title: "Билдирме ийгиликтүү кабыл алынды! 🚀",
      getMessage: (name, _managerCity) =>
        `Рахмат, ${name || "урматтуу адис"}! Бишкектеги биздин менеджер билдирмени алды жана тест-драйвдын убактысын тактоо үчүн сиз менен байланышат.`,
    },
    privacyModal: {
      title: "Купуялык саясаты",
      subtitle: "Кыргыз Республикасынын 2008-жылдын 14-апрелиндеги № 58 «Жеке мүнөздөгү маалымат жөнүндө» Мыйзамына ылайык",
    },
    termsModal: {
      title: "Сайтты жана кызматты колдонуу шарттары",
    },
  },
};

/**
 * Получить текущий язык интерфейса ("ru" или "kg")
 */
export function getCurrentLocale(): Locale {
  if (typeof window !== "undefined") {
    const htmlLang = document.documentElement.lang?.toLowerCase();
    const datasetLang = document.documentElement.dataset.lang?.toLowerCase();
    if (htmlLang === "ky" || htmlLang === "kg" || datasetLang === "kg") {
      return "kg";
    }
    const path = window.location.pathname.toLowerCase();
    if (path.includes("/kg")) {
      return "kg";
    }
  }
  return "ru";
}

/**
 * Получить объект переводов для текущей локали
 */
export function getTranslations(locale?: Locale): Translations {
  const loc = locale || getCurrentLocale();
  return TRANSLATIONS[loc] || TRANSLATIONS.ru;
}
