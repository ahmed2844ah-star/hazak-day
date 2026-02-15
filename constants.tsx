
import { ZodiacSign, ZodiacData } from './types';

export const ZODIAC_METADATA: Record<ZodiacSign, ZodiacData> = {
  [ZodiacSign.Aries]: {
    sign: ZodiacSign.Aries,
    element: 'نار',
    modality: 'كاردينال',
    ruler: 'المريخ',
    symbol: '♈',
    dateRange: '21 مارس - 19 أبريل',
    description: 'شجاع، واثق، وحماسي. الحمل هو القائد الطبيعي للأبراج.',
    luckyNumbers: [1, 8, 17],
    luckyColor: 'الأحمر',
    compatibility: [ZodiacSign.Leo, ZodiacSign.Sagittarius]
  },
  [ZodiacSign.Taurus]: {
    sign: ZodiacSign.Taurus,
    element: 'تراب',
    modality: 'ثابت',
    ruler: 'الزهرة',
    symbol: '♉',
    dateRange: '20 أبريل - 20 مايو',
    description: 'موثوق، صبور، وعملي. الثور يقدر الجمال والراحة المادية.',
    luckyNumbers: [2, 6, 9],
    luckyColor: 'الأخضر',
    compatibility: [ZodiacSign.Virgo, ZodiacSign.Capricorn]
  },
  [ZodiacSign.Gemini]: {
    sign: ZodiacSign.Gemini,
    element: 'هواء',
    modality: 'متغير',
    ruler: 'عطارد',
    symbol: '♊',
    dateRange: '21 مايو - 20 يونيو',
    description: 'لطيف، فضولي، وسريع التعلم. الجوزاء يتميز بازدواجية الشخصية والذكاء الاجتماعي.',
    luckyNumbers: [5, 7, 14],
    luckyColor: 'الأصفر',
    compatibility: [ZodiacSign.Libra, ZodiacSign.Aquarius]
  },
  [ZodiacSign.Cancer]: {
    sign: ZodiacSign.Cancer,
    element: 'ماء',
    modality: 'كاردينال',
    ruler: 'القمر',
    symbol: '♋',
    dateRange: '21 يونيو - 22 يوليو',
    description: 'عاطفي، حدسي، ومحب للاستقرار. السرطان يرتبط بقوة بالعائلة والمنزل.',
    luckyNumbers: [2, 3, 15],
    luckyColor: 'الفضي',
    compatibility: [ZodiacSign.Scorpio, ZodiacSign.Pisces]
  },
  [ZodiacSign.Leo]: {
    sign: ZodiacSign.Leo,
    element: 'نار',
    modality: 'ثابت',
    ruler: 'الشمس',
    symbol: '♌',
    dateRange: '23 يوليو - 22 أغسطس',
    description: 'كريم، واثق، ومبدع. الأسد يحب أن يكون مركز الاهتمام.',
    luckyNumbers: [1, 4, 10],
    luckyColor: 'الذهبي',
    compatibility: [ZodiacSign.Aries, ZodiacSign.Sagittarius]
  },
  [ZodiacSign.Virgo]: {
    sign: ZodiacSign.Virgo,
    element: 'تراب',
    modality: 'متغير',
    ruler: 'عطارد',
    symbol: '♍',
    dateRange: '23 أغسطس - 22 سبتمبر',
    description: 'محلل، عملي، ومجتهد. العذراء يسعى دائماً نحو الكمال والنظام.',
    luckyNumbers: [5, 22, 38],
    luckyColor: 'البني',
    compatibility: [ZodiacSign.Taurus, ZodiacSign.Capricorn]
  },
  [ZodiacSign.Libra]: {
    sign: ZodiacSign.Libra,
    element: 'هواء',
    modality: 'كاردينال',
    ruler: 'الزهرة',
    symbol: '♎',
    dateRange: '23 سبتمبر - 22 أكتوبر',
    description: 'دبلوماسي، عادل، واجتماعي. الميزان يبحث دائماً عن التوازن والانسجام.',
    luckyNumbers: [4, 6, 13],
    luckyColor: 'الوردي',
    compatibility: [ZodiacSign.Gemini, ZodiacSign.Aquarius]
  },
  [ZodiacSign.Scorpio]: {
    sign: ZodiacSign.Scorpio,
    element: 'ماء',
    modality: 'ثابت',
    ruler: 'بلوتو',
    symbol: '♏',
    dateRange: '23 أكتوبر - 21 نوفمبر',
    description: 'شجاع، عاطفي، وصادق. العقرب يتميز بالغموض والجاذبية القوية.',
    luckyNumbers: [8, 11, 18],
    luckyColor: 'الأسود',
    compatibility: [ZodiacSign.Cancer, ZodiacSign.Pisces]
  },
  [ZodiacSign.Sagittarius]: {
    sign: ZodiacSign.Sagittarius,
    element: 'نار',
    modality: 'متغير',
    ruler: 'المشتري',
    symbol: '♐',
    dateRange: '22 نوفمبر - 21 ديسمبر',
    description: 'متفائل، محب للحرية، وفيلسوف. القوس يسعى دائماً لاستكشاف العالم.',
    luckyNumbers: [3, 7, 9],
    luckyColor: 'الأرجواني',
    compatibility: [ZodiacSign.Aries, ZodiacSign.Leo]
  },
  [ZodiacSign.Capricorn]: {
    sign: ZodiacSign.Capricorn,
    element: 'تراب',
    modality: 'كاردينال',
    ruler: 'زحل',
    symbol: '♑',
    dateRange: '22 ديسمبر - 19 يناير',
    description: 'مسؤول، منضبط، وعملي. الجدي طموح جداً ويخطط للمستقبل بدقة.',
    luckyNumbers: [4, 8, 13],
    luckyColor: 'الرمادي الداكن',
    compatibility: [ZodiacSign.Taurus, ZodiacSign.Virgo]
  },
  [ZodiacSign.Aquarius]: {
    sign: ZodiacSign.Aquarius,
    element: 'هواء',
    modality: 'ثابت',
    ruler: 'أورانوس',
    symbol: '♒',
    dateRange: '20 يناير - 18 فبراير',
    description: 'تقدمي، أصيل، ومستقل. الدلو يهتم بالإنسانية والأفكار المبتكرة.',
    luckyNumbers: [4, 7, 11],
    luckyColor: 'الأزرق السماوي',
    compatibility: [ZodiacSign.Gemini, ZodiacSign.Libra]
  },
  [ZodiacSign.Pisces]: {
    sign: ZodiacSign.Pisces,
    element: 'ماء',
    modality: 'متغير',
    ruler: 'نبتون',
    symbol: '♓',
    dateRange: '19 فبراير - 20 مارس',
    description: 'رحيم، فني، وحدسي. الحوت يعيش في عالم من الخيال والروحانية.',
    luckyNumbers: [3, 9, 21],
    luckyColor: 'البحري',
    compatibility: [ZodiacSign.Cancer, ZodiacSign.Scorpio]
  }
};
