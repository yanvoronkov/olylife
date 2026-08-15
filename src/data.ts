import { ProfessionInfo, PainPoint, ClientBenefit, DeviceFeature } from "./types";

export const PROFESSIONS_DATA: ProfessionInfo[] = [
  {
    id: "massage",
    title: "Массажисты",
    iconName: "Massage",
    benefit: "",
    description: "Дайте отдых своим рукам. Пока клиент проходит 20-минутный прогрев на платформе OlyLife, мышцы расслабляются, а эффективность последующего массажа возрастает в 2 раза.",
  },
  {
    id: "body_therapist",
    title: "Телесные терапевты",
    iconName: "Activity",
    benefit: "",
    description: "Импульсное PEMF и ТГц-воздействие снимает глубокие фасциальные и нервные блоки, ускоряя достижение результатов психосоматической проработки.",
  },
  {
    id: "cosmetologist",
    title: "Косметологи",
    iconName: "Sparkles",
    benefit: "",
    description: "Разгон лимфотока изнутри усиливает действие аппаратных и инъекционных процедур, убирает отечность лица и дарит сияющий цвет кожи.",
  },
  {
    id: "fitness_trainer",
    title: "Фитнес / йога тренеры",
    iconName: "Dumbbell",
    benefit: "",
    description: "Помогите подопечным быстро снять крепатуру, вынести молочную кислоту и восстановить энергетический баланс после интенсивных тренировок.",
  },
  {
    id: "nutritionist",
    title: "Нутрициологи / детокс-эксперты",
    iconName: "Apple",
    benefit: "",
    description: "Усильте действие детокс-программ. Импульсное электромагнитное поле стимулирует микроциркуляцию и клеточное очищение организма.",
  },
  {
    id: "podologist",
    title: "Мастера маникюра / Подологи",
    iconName: "Footprints",
    benefit: "",
    description: "Клиент совмещает уход за стопами с 20-минутной оздоровительной сессией на платформе. Дополнительная прибыль без удлинения времени приема.",
  },
];

export const PAIN_POINTS: PainPoint[] = [
  {
    id: "fatigue",
    text: "Физическое ограничение",
    highlight: "Сильно устаете к концу дня, и сил ни на что не остается.",
  },
  {
    id: "financial_cap",
    text: "Финансовый потолок в 24 часах",
    highlight: "Чтобы зарабатывать больше, приходится либо поднимать цены, либо пахать без выходных.",
  },
  {
    id: "competition",
    text: "Высокая конкуренция",
    highlight: "Крупные игроки и новички демпингуют цены, нужно постоянно добывать новых клиентов для записи.",
  },
  {
    id: "no_pause",
    text: "Нельзя остановиться",
    highlight: "Если заболели, уехали в отпуск или взяли выходной — денежный поток мгновенно останавливается.",
  },
];

export const KEY_ADVANTAGES: DeviceFeature[] = [
  {
    id: "duration",
    title: "⏱️ Сеанс длится 20 минут",
    description: "",
    iconName: "Clock",
  },
  {
    id: "hands_free",
    title: "🖐️ Не требует участия",
    description: "",
    iconName: "UserCheck",
  },
  {
    id: "wow_effect",
    title: "✨ Вызывает вау-эффект",
    description: "",
    iconName: "Zap",
  },
  {
    id: "compact",
    title: "📐 Занимает 1 кв. м площади",
    description: "",
    iconName: "Maximize2",
  },
];

export const CLIENT_BENEFITS: ClientBenefit[] = [
  {
    id: "blood_flow",
    iconName: "RefreshCw",
    title: "Разгоняет кровообращение и лимфоток",
    description: "Активирует капиллярный кровоток и снимает застойные явления в тканях и конечностях.",
  },
  {
    id: "sleep",
    iconName: "Moon",
    title: "Нормализует сон",
    description: "Балансирует вегетативную нервную систему, помогая быстрее засыпать и спать более глубоко.",
  },
  {
    id: "metabolism",
    iconName: "Activity",
    title: "Ускоряет метаболизм",
    description: "Стимулирует обменные процессы на клеточном уровне, способствуя снижению веса и детоксу.",
  },
  {
    id: "digestion",
    iconName: "Salad",
    title: "Способствует улучшению пищеварения",
    description: "Снимает спазмы гладкой мускулатуры и гармонизирует работу желудочно-кишечного тракта.",
  },
  {
    id: "tension",
    iconName: "Smile",
    title: "Снимает нервное напряжение",
    description: "Уменьшает уровень кортизола, убирает чувство тревоги и хронологической усталости.",
  },
  {
    id: "atp_energy",
    iconName: "BatteryCharging",
    title: "Заряжает клетки энергией (АТФ)",
    description: "Импульсы PEMF заряжают митохондрии, возвращая бодрость и ясность ума с первого сеанса.",
  },
];

export const PROFESSION_OPTIONS = [
  "Массажист",
  "Косметолог",
  "Телесный терапевт",
  "Тренер",
  "Нутрициолог",
  "Подолог",
  "Другое",
];

export const TASHKENT_TESTIMONIALS = [];
