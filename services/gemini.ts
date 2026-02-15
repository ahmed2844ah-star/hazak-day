
import { GoogleGenAI, Type } from "@google/genai";
import { UserInfo, ZodiacSign, HoroscopePrediction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHoroscope = async (userInfo: UserInfo, sign: ZodiacSign): Promise<HoroscopePrediction> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `أنا ${userInfo.name}، ولدت في ${userInfo.birthDate}. برجي هو ${sign}. 
    من فضلك قم بتوليد توقعات فلكية مفصلة لي لهذا اليوم تشمل:
    1. توقع يومي عام.
    2. توقعات الحب والعلاقات.
    3. توقعات العمل والمال.
    4. توقعات الصحة.
    5. نصيحة فلكية خاصة.
    اجعل الأسلوب غامضاً وممتعاً واحترافياً.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          daily: { type: Type.STRING, description: 'Daily general horoscope' },
          love: { type: Type.STRING, description: 'Love and relationships' },
          career: { type: Type.STRING, description: 'Career and finance' },
          health: { type: Type.STRING, description: 'Health and wellbeing' },
          astrologicalAdvice: { type: Type.STRING, description: 'Specific astrological advice' },
        },
        required: ["daily", "love", "career", "health", "astrologicalAdvice"]
      },
    },
  });

  return JSON.parse(response.text) as HoroscopePrediction;
};

export const getNatalAnalysis = async (userInfo: UserInfo, sign: ZodiacSign): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `تحليل الخريطة الفلكية الشخصية لـ ${userInfo.name} المولود في ${userInfo.birthDate} الساعة ${userInfo.birthTime || 'غير معروفة'} في ${userInfo.birthLocation || 'غير معروفة'}. 
    البرج الشمسي هو ${sign}.
    اشرح تأثير الشمس والقمر والمنازل الفلكية على شخصيته ومساره المهني وعلاقاته.`,
    config: {
      temperature: 0.8,
      topK: 40,
    }
  });

  return response.text;
};

export const generateZodiacImage = async (sign: ZodiacSign): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A mystical and artistic cinematic portrait of the zodiac sign ${sign}. High fantasy style, cosmic background with nebulae and stars, ethereal lighting, intricate details, glowing astrological symbols. The image should feel sacred and powerful.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating zodiac image:", error);
    return null;
  }
};
