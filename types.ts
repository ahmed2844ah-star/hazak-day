
export enum ZodiacSign {
  Aries = 'الحمل',
  Taurus = 'الثور',
  Gemini = 'الجوزاء',
  Cancer = 'السرطان',
  Leo = 'الأسد',
  Virgo = 'العذراء',
  Libra = 'الميزان',
  Scorpio = 'العقرب',
  Sagittarius = 'القوس',
  Capricorn = 'الجدي',
  Aquarius = 'الدلو',
  Pisces = 'الحوت'
}

export interface UserInfo {
  name: string;
  birthDate: string;
  birthTime?: string;
  birthLocation?: string;
}

export interface ZodiacData {
  sign: ZodiacSign;
  element: string;
  modality: string;
  ruler: string;
  symbol: string;
  dateRange: string;
  description: string;
  luckyNumbers: number[];
  luckyColor: string;
  compatibility: ZodiacSign[];
}

export interface HoroscopePrediction {
  daily: string;
  love: string;
  career: string;
  health: string;
  astrologicalAdvice: string;
}
