/* --------------------------------------------------------------------------
   Content from the official "Tashkent Law School" brochure (PDF).
   Images were cropped from the brochure into /public/images/pdf.
   -------------------------------------------------------------------------- */
import type { L3 } from "./constants";

export const FOUNDED = 2023;

export const SLOGAN: L3 = {
  uz: "Kelajagingiz sari ishonchli qadam",
  ru: "Уверенный шаг к вашему будущему",
  en: "A confident step towards your future",
};

/** Headline figures ("Nima uchun bizga ishonishadi?" / "Raqamlar gapiradi"). */
export const BROCHURE_STATS = [
  { id: -1, value: 3000, suffix: "+", label_uz: "O‘quvchilar", label_ru: "Учеников", label_en: "Students", icon: "Users" },
  { id: -2, value: 500, suffix: "+", label_uz: "Yuridik OTM talabasi", label_ru: "Студентов юр. вузов", label_en: "Law-university students", icon: "GraduationCap" },
  { id: -3, value: 3000, suffix: "+", label_uz: "Sertifikatlar", label_ru: "Сертификатов", label_en: "Certificates", icon: "Award" },
  { id: -4, value: 3, suffix: "", label_uz: "Filiallar", label_ru: "Филиала", label_en: "Branches", icon: "Landmark" },
];

/* ---------------------------------------------------------------- Teachers */
export type Subject = "law" | "eulaw" | "history" | "english" | "russian";
export const SUBJECTS: Record<Subject, L3> = {
  law: { uz: "Huquq", ru: "Право", en: "Law" },
  eulaw: { uz: "Yevro huquq", ru: "Европейское право", en: "European law" },
  history: { uz: "Tarix", ru: "История", en: "History" },
  english: { uz: "Ingliz tili", ru: "Английский язык", en: "English" },
  russian: { uz: "Rus tili", ru: "Русский язык", en: "Russian" },
};

export interface BrochureTeacher {
  img: string;
  name: string;
  subject: Subject;
  years: number;
  students: string;
  studentsKind: "pupils" | "students";
  degree?: L3;
}

const MAGISTR: L3 = { uz: "Magistr", ru: "Магистр", en: "Master’s degree" };

export const BROCHURE_TEACHERS: BrochureTeacher[] = [
  { img: "t01", name: "Raxmonaliyev Mirjalol", subject: "law", years: 7, students: "1000+", studentsKind: "pupils", degree: { uz: "Magistr, doktorant", ru: "Магистр, докторант", en: "Master’s, doctoral candidate" } },
  { img: "t02", name: "Shavkatovna Kamilla", subject: "russian", years: 12, students: "4000+", studentsKind: "pupils" },
  { img: "t03", name: "Yaxshiboyev Diyorbek", subject: "law", years: 3, students: "200+", studentsKind: "students" },
  { img: "t04", name: "Turdiyev Dilshod", subject: "history", years: 6, students: "2000+", studentsKind: "pupils" },
  { img: "t05", name: "Fayziyev Murodali", subject: "history", years: 2, students: "300+", studentsKind: "students" },
  { img: "t06", name: "Nurullayev Sunnatillo", subject: "eulaw", years: 3, students: "250+", studentsKind: "pupils" },
  { img: "t07", name: "Xurramov Normurod", subject: "law", years: 3, students: "350+", studentsKind: "pupils" },
  { img: "t08", name: "Ilhamov Lazizbek", subject: "law", years: 3, students: "200+", studentsKind: "pupils" },
  { img: "t09", name: "Aytmurodov Ruslan", subject: "law", years: 4, students: "150+", studentsKind: "pupils", degree: MAGISTR },
  { img: "t10", name: "Ozodova Sevinch", subject: "law", years: 4, students: "350+", studentsKind: "pupils", degree: MAGISTR },
  { img: "t11", name: "Abdurahmonova Muslima", subject: "english", years: 3, students: "400+", studentsKind: "pupils" },
  { img: "t12", name: "Isakjonov Abdullajon", subject: "law", years: 3, students: "300+", studentsKind: "pupils" },
  { img: "t13", name: "Vapayev Karimjon", subject: "law", years: 3, students: "150+", studentsKind: "pupils", degree: MAGISTR },
  { img: "t14", name: "Akramov Sirojiddin", subject: "law", years: 3, students: "230+", studentsKind: "pupils", degree: MAGISTR },
];

/* ---------------------------------------------------------------- Results (BMBA) */
export const BROCHURE_RESULTS = [
  { img: "r01", name: "Karimov Islomjon", law: "28/30", bmba: "182.80" },
  { img: "r02", name: "Erkinboyeva Aziza", law: "28/30", bmba: "182.80" },
  { img: "r03", name: "Joldasbayev Allamurat", law: "28/30", bmba: "180.60" },
  { img: "r04", name: "Bo‘ronova Dildora", law: "28/30", bmba: "182.80" },
  { img: "r05", name: "Nematova Marjonaxon", law: "29/30", bmba: "185.90" },
  { img: "r06", name: "Turopova Shaxnoza", law: "29/30", bmba: "185.90" },
  { img: "r07", name: "Muhammadova Gulira’no", law: "28/30", bmba: "182.80" },
  { img: "r08", name: "Dehqonov Solihbek", law: "30/30", bmba: "187.90" },
  { img: "r09", name: "Haydarov Abduvohid", law: "28/30", bmba: "182.80" },
  { img: "r10", name: "Olimov Aslbek", law: "29/30", bmba: "181.50" },
];

/* ---------------------------------------------------------------- Course system */
export const COURSE_SYSTEM: { icon: string; big: L3; text: L3 }[] = [
  { icon: "Clock", big: { uz: "3 kun · 2 soat", ru: "3 дня · 2 часа", en: "3 days · 2 hours" }, text: { uz: "Haftasiga 3 kun, har bir dars 2 soatdan", ru: "3 раза в неделю, каждое занятие по 2 часа", en: "Three days a week, two hours per lesson" } },
  { icon: "ClipboardList", big: { uz: "Har oy", ru: "Каждый месяц", en: "Monthly" }, text: { uz: "Nazorat imtihoni — bilim har oy tekshiriladi", ru: "Контрольный экзамен — знания проверяются ежемесячно", en: "A control exam checks progress every month" } },
  { icon: "Target", big: { uz: "Har 3 oy", ru: "Каждые 3 месяца", en: "Every 3 months" }, text: { uz: "Bosqichli imtihon — keyingi darajaga o‘tish", ru: "Этапный экзамен — переход на следующий уровень", en: "A stage exam to move up to the next level" } },
  { icon: "RefreshCw", big: { uz: "Qayta tayyorlov", ru: "Повторная подготовка", en: "Re-training" }, text: { uz: "Bosqichdan o‘tmagan o‘quvchi qayta tayyorlanadi", ru: "Не прошедший этап ученик проходит его заново", en: "Students who don’t pass a stage are trained again" } },
];

/* ---------------------------------------------------------------- Advantages (9) */
export const BROCHURE_ADVANTAGES: { icon: string; title: L3; text: L3; img?: string }[] = [
  { icon: "ShieldCheck", title: { uz: "Kuchli nazorat tizimi", ru: "Строгая система контроля", en: "Strong control system" }, text: { uz: "Oylik nazorat va har 3 oyda bosqichli imtihonlar.", ru: "Ежемесячный контроль и этапные экзамены каждые 3 месяца.", en: "Monthly checks and stage exams every three months." } },
  { icon: "Users", title: { uz: "3 nafar ustoz nazorati", ru: "Контроль трёх преподавателей", en: "Three mentors per student" }, text: { uz: "Har bir o‘quvchi bilan uch nafar ustoz ishlaydi.", ru: "С каждым учеником работают три преподавателя.", en: "Every student is guided by three teachers." } },
  { icon: "TrendingUp", title: { uz: "Bosqichma-bosqich o‘qitish", ru: "Поэтапное обучение", en: "Step-by-step learning" }, text: { uz: "Mavzular oddiydan murakkabga, aniq bosqichlarda.", ru: "От простого к сложному, по чётким этапам.", en: "From simple to complex in clear stages." } },
  { icon: "Briefcase", title: { uz: "Professional pedagoglar", ru: "Профессиональные педагоги", en: "Professional educators" }, text: { uz: "Magistr va doktorant yuristlar, 1000+ o‘quvchi tajribasi.", ru: "Юристы-магистры и докторанты с опытом 1000+ учеников.", en: "Lawyers with master’s degrees and 1000+ students taught." }, img: "teachers/t01" },
  { icon: "CalendarClock", title: { uz: "Yakshanba bepul darslari", ru: "Бесплатные занятия по воскресеньям", en: "Free Sunday classes" }, text: { uz: "Har yakshanba qo‘shimcha bepul mashg‘ulotlar.", ru: "Дополнительные бесплатные занятия каждое воскресенье.", en: "Extra free lessons every Sunday." } },
  { icon: "Library", title: { uz: "Maxsus darsliklar", ru: "Собственные учебники", en: "Our own textbooks" }, text: { uz: "Markaz mualliflari tayyorlagan darslik va test to‘plamlari.", ru: "Учебники и сборники тестов от авторов центра.", en: "Textbooks and test books written by our team." }, img: "books/huquq9" },
  { icon: "Timer", title: { uz: "Tezlashtirilgan kurslar", ru: "Ускоренные курсы", en: "Accelerated courses" }, text: { uz: "Qisqa muddatda imtihonga tayyorlanish imkoniyati.", ru: "Подготовка к экзамену в сжатые сроки.", en: "Get exam-ready in a shorter time." } },
  { icon: "Landmark", title: { uz: "Yuridik muhit", ru: "Юридическая среда", en: "A legal environment" }, text: { uz: "Huquqshunoslar davrasida o‘qish va tadbirlar.", ru: "Учёба и мероприятия в кругу юристов.", en: "Learn among lawyers, with events and debates." }, img: "gallery/g8" },
  { icon: "MapPinned", title: { uz: "Qulay joylashuv", ru: "Удобное расположение", en: "Convenient locations" }, text: { uz: "Chilonzor, Yunusobod va Xorazmda filiallar.", ru: "Филиалы в Чиланзаре, Юнусабаде и Хорезме.", en: "Branches in Chilonzor, Yunusobod and Khorezm." } },
];

/* ---------------------------------------------------------------- Directions (with durations) */
export interface Direction {
  key: string;
  match: RegExp;
  title: L3;
  duration: L3;
  visual: { kind: "img"; src: string; shape: "book" | "flag" } | { kind: "flag-ru" } | { kind: "icon"; icon: string };
}

export const DIRECTION_LIST: Direction[] = [
  { key: "law", match: /huquq|право|law|yurisprud/i, title: { uz: "Huquq", ru: "Право", en: "Law" }, duration: { uz: "8–12 oy", ru: "8–12 мес.", en: "8–12 months" }, visual: { kind: "img", src: "/images/pdf/books/huquq9.webp", shape: "book" } },
  { key: "english", match: /ingliz|english|англ/i, title: { uz: "Ingliz tili", ru: "Английский язык", en: "English" }, duration: { uz: "4 / 6 / 8 oy", ru: "4 / 6 / 8 мес.", en: "4 / 6 / 8 months" }, visual: { kind: "img", src: "/images/pdf/flags/uk.webp", shape: "flag" } },
  { key: "turkish", match: /turk|турец/i, title: { uz: "Turk tili", ru: "Турецкий язык", en: "Turkish" }, duration: { uz: "3 oy", ru: "3 мес.", en: "3 months" }, visual: { kind: "img", src: "/images/pdf/flags/tr.webp", shape: "flag" } },
  { key: "native", match: /ona tili|она тил|родн|o.?zbek tili|uzbek/i, title: { uz: "Ona tili", ru: "Родной язык", en: "Native language" }, duration: { uz: "1–3 oy", ru: "1–3 мес.", en: "1–3 months" }, visual: { kind: "img", src: "/images/pdf/flags/uz.webp", shape: "flag" } },
  { key: "math", match: /matem|матем|math/i, title: { uz: "Matematika", ru: "Математика", en: "Mathematics" }, duration: { uz: "3–6 oy", ru: "3–6 мес.", en: "3–6 months" }, visual: { kind: "icon", icon: "Calculator" } },
  { key: "history", match: /tarix|истор|history/i, title: { uz: "O‘zbekiston tarixi", ru: "История Узбекистана", en: "History of Uzbekistan" }, duration: { uz: "3 oy", ru: "3 мес.", en: "3 months" }, visual: { kind: "icon", icon: "ScrollText" } },
  // keep last: titles like "Tarix (Uzb/Rus)" mention Russian groups
  { key: "russian", match: /rus|рус/i, title: { uz: "Rus tili", ru: "Русский язык", en: "Russian" }, duration: { uz: "—", ru: "—", en: "—" }, visual: { kind: "flag-ru" } },
];

/** Finds the brochure direction that matches a backend course title (order matters: Russian is matched last). */
export function directionFor(title: string): Direction | null {
  return DIRECTION_LIST.find((d) => d.match.test(title)) ?? null;
}

/* ---------------------------------------------------------------- Books */
export const BOOKS: { img: string; title: string; text: L3 }[] = [
  { img: "pulemyot", title: "Пулемёт", text: { uz: "DTM testlari to‘plami — «Davlat va huquq asoslari»", ru: "Сборник тестов DTM — «Основы государства и права»", en: "DTM test collection — “Fundamentals of State and Law”" } },
  { img: "kodekslar", title: "Yurisprudensiya kodekslar", text: { uz: "Kodekslar bo‘yicha qo‘llanma, IV qism", ru: "Пособие по кодексам, часть IV", en: "Guide to the codes, part IV" } },
  { img: "qonunchilik", title: "Qonunchilik bo‘yicha testlar", text: { uz: "Adolat yo‘lini tanlaganlar uchun test kitobi", ru: "Книга тестов для выбравших путь справедливости", en: "A test book for those who choose justice" } },
  { img: "huquq9", title: "Huquq · Student’s book 9", text: { uz: "9-sinf huquq darsligi — professional yurist dunyoni o‘zgartiradi", ru: "Учебник права для 9 класса", en: "Grade 9 law textbook" } },
];

/* ---------------------------------------------------------------- Professions */
export const PROFESSIONS: { icon: string; title: L3 }[] = [
  { icon: "Briefcase", title: { uz: "Advokat", ru: "Адвокат", en: "Attorney" } },
  { icon: "Scale", title: { uz: "Yurist", ru: "Юрист", en: "Lawyer" } },
  { icon: "Gavel", title: { uz: "Sudya", ru: "Судья", en: "Judge" } },
  { icon: "Shield", title: { uz: "Prokuror", ru: "Прокурор", en: "Prosecutor" } },
  { icon: "FileSignature", title: { uz: "Notarius", ru: "Нотариус", en: "Notary" } },
  { icon: "Search", title: { uz: "Tergovchi", ru: "Следователь", en: "Investigator" } },
];

/* ---------------------------------------------------------------- Promotions */
export const PROMOS: { icon: string; condition: L3; reward: L3 }[] = [
  { icon: "Gift", condition: { uz: "3 ta kursga yoziling", ru: "Запишитесь на 3 курса", en: "Enrol in 3 courses" }, reward: { uz: "4-kurs BEPUL", ru: "4-й курс БЕСПЛАТНО", en: "4th course FREE" } },
  { icon: "Users", condition: { uz: "Bir oiladan 2 nafar farzand o‘qisa", ru: "Если учатся двое детей из одной семьи", en: "Two children from one family" }, reward: { uz: "20% chegirma", ru: "Скидка 20%", en: "20% discount" } },
  { icon: "CreditCard", condition: { uz: "3 oylik to‘lovni oldindan amalga oshiring", ru: "Оплатите 3 месяца заранее", en: "Pay for 3 months in advance" }, reward: { uz: "Maxsus bonus", ru: "Особый бонус", en: "Special bonus" } },
];

// Duplicates removed (g1 ≈ g8, g4 ≈ g2) — the sharper copy of each photo is kept.
export const GALLERY = ["g8", "g2", "g3", "g5", "g7", "g6", "g9"].map((g) => `/images/pdf/gallery/${g}.webp`);

/* ---------------------------------------------------------------- Institutions (official emblems, /public/images/logos) */
export interface Institution {
  key: string;
  short: string;
  name: L3;
  img: string;
  kind: "study" | "work";
}

export const INSTITUTIONS: Institution[] = [
  { key: "tdyu", short: "TDYU", kind: "study", img: "/images/logos/tsul-2025.png", name: { uz: "Toshkent davlat yuridik universiteti", ru: "Ташкентский государственный юридический университет", en: "Tashkent State University of Law" } },
  { key: "hmqa", short: "HMQA", kind: "study", img: "/images/logos/hmqa.png", name: { uz: "Huquqni muhofaza qilish akademiyasi", ru: "Правоохранительная академия", en: "Law Enforcement Academy" } },
  { key: "jidu", short: "JIDU", kind: "study", img: "/images/logos/jidu.png", name: { uz: "Jahon iqtisodiyoti va diplomatiya universiteti", ru: "Университет мировой экономики и дипломатии", en: "University of World Economy and Diplomacy" } },
  { key: "iib", short: "IIB", kind: "work", img: "/images/logos/iib.png", name: { uz: "Ichki ishlar vazirligi", ru: "Министерство внутренних дел", en: "Ministry of Internal Affairs" } },
  { key: "dxx", short: "DXX", kind: "work", img: "/images/logos/dxx.png", name: { uz: "Davlat xavfsizlik xizmati", ru: "Служба государственной безопасности", en: "State Security Service" } },
  { key: "prok", short: "Prokuratura", kind: "work", img: "/images/logos/prokuratura.png", name: { uz: "Prokuratura organlari", ru: "Органы прокуратуры", en: "Prosecutor’s Office" } },
  { key: "sud", short: "Oliy sud", kind: "work", img: "/images/logos/sud.png", name: { uz: "Sud tizimi", ru: "Судебная система", en: "Judiciary" } },
  { key: "adliya", short: "Adliya", kind: "work", img: "/images/logos/adliya.png", name: { uz: "Adliya vazirligi", ru: "Министерство юстиции", en: "Ministry of Justice" } },
];

/** Career carousel: official emblems where they exist, professional icons otherwise. */
export const CAREERS: { title: L3; org: L3; logo?: string; icon?: string }[] = [
  { title: { uz: "DXX xodimi", ru: "Сотрудник СГБ", en: "State security officer" }, org: { uz: "Davlat xavfsizlik xizmati", ru: "Служба госбезопасности", en: "State Security Service" }, logo: "/images/logos/dxx.png" },
  { title: { uz: "Prokuror", ru: "Прокурор", en: "Prosecutor" }, org: { uz: "Prokuratura organlari", ru: "Органы прокуратуры", en: "Prosecutor’s Office" }, logo: "/images/logos/prokuratura.png" },
  { title: { uz: "IIB xodimi", ru: "Сотрудник МВД", en: "Police officer" }, org: { uz: "Ichki ishlar vazirligi", ru: "Министерство внутренних дел", en: "Ministry of Internal Affairs" }, logo: "/images/logos/iib.png" },
  { title: { uz: "HMQA kursanti", ru: "Курсант академии", en: "Academy cadet" }, org: { uz: "Huquqni muhofaza qilish akademiyasi", ru: "Правоохранительная академия", en: "Law Enforcement Academy" }, logo: "/images/logos/hmqa.png" },
  { title: { uz: "Sudya", ru: "Судья", en: "Judge" }, org: { uz: "Sud tizimi", ru: "Судебная система", en: "Judiciary" }, logo: "/images/logos/sud.png" },
  { title: { uz: "Notarius", ru: "Нотариус", en: "Notary" }, org: { uz: "Adliya vazirligi", ru: "Министерство юстиции", en: "Ministry of Justice" }, logo: "/images/logos/adliya.png" },
  { title: { uz: "Advokat", ru: "Адвокат", en: "Attorney" }, org: { uz: "Advokatura", ru: "Адвокатура", en: "The Bar" }, icon: "Briefcase" },
  { title: { uz: "Yurist", ru: "Юрист", en: "Lawyer" }, org: { uz: "Kompaniya va tashkilotlar", ru: "Компании и организации", en: "Companies & organisations" }, icon: "Scale" },
  { title: { uz: "Tergovchi", ru: "Следователь", en: "Investigator" }, org: { uz: "Tergov organlari", ru: "Следственные органы", en: "Investigative bodies" }, icon: "Search" },
];

/* ---------------------------------------------------------------- TDYU 2026 admission results (from the Instagram landing page) */
export const ADMISSIONS: { img: string; name: string; kind: "grant" | "contract"; score: string }[] = [
  { img: "nematova", name: "Nematova Marjonaxon", kind: "grant", score: "185.9" },
  { img: "jumamurotov", name: "Jumamurotov Otabek", kind: "grant", score: "181.5" },
  { img: "qahramonova", name: "Qahramonova Shaxzoda", kind: "grant", score: "168.0" },
  { img: "iskandarova", name: "Iskandarova Shahzoda", kind: "grant", score: "151.0" },
  { img: "abdurahmonov", name: "Abdurahmonov Usmon", kind: "contract", score: "173.5" },
  { img: "ravshanov", name: "Ravshanov Firdavs", kind: "contract", score: "166.0" },
  { img: "axadov", name: "Axadov Odilbek", kind: "contract", score: "159.4" },
];

/** Slides for the /registration landing page. */
export const REG_SLIDES = [
  "/images/reg/banner-brand.webp",
  "/images/pdf/gallery/g6.webp",
  "/images/reg/banner-about.webp",
  "/images/pdf/gallery/g7.webp",
  "/images/reg/banner-branches.webp",
  "/images/pdf/gallery/g8.webp",
];
