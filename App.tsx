
import React, { useState, useEffect, useCallback } from 'react';
import BirthForm from './components/BirthForm';
import AstrologyChart from './components/AstrologyChart';
import ZodiacArtwork from './components/ZodiacArtwork';
import { UserInfo, ZodiacSign, HoroscopePrediction } from './types';
import { ZODIAC_METADATA } from './constants';
import { getHoroscope, getNatalAnalysis, generateZodiacImage } from './services/gemini';

const App: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign | null>(null);
  const [prediction, setPrediction] = useState<HoroscopePrediction | null>(null);
  const [natalAnalysis, setNatalAnalysis] = useState<string | null>(null);
  const [zodiacImage, setZodiacImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateZodiac = (dateStr: string): ZodiacSign => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZodiacSign.Aries;
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZodiacSign.Taurus;
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZodiacSign.Gemini;
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZodiacSign.Cancer;
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZodiacSign.Leo;
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZodiacSign.Virgo;
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ZodiacSign.Libra;
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ZodiacSign.Scorpio;
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ZodiacSign.Sagittarius;
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZodiacSign.Capricorn;
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZodiacSign.Aquarius;
    return ZodiacSign.Pisces;
  };

  const handleFormSubmit = async (info: UserInfo) => {
    setLoading(true);
    setError(null);
    setUser(info);
    const sign = calculateZodiac(info.birthDate);
    setZodiacSign(sign);

    try {
      const [horoscopeData, natalData, imageData] = await Promise.all([
        getHoroscope(info, sign),
        getNatalAnalysis(info, sign),
        generateZodiacImage(sign)
      ]);
      setPrediction(horoscopeData);
      setNatalAnalysis(natalData);
      setZodiacImage(imageData);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء قراءة النجوم. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setUser(null);
    setZodiacSign(null);
    setPrediction(null);
    setNatalAnalysis(null);
    setZodiacImage(null);
    setError(null);
  };

  return (
    <div className="min-h-screen pb-12 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-700 rounded-full blur-[140px]"></div>
      </div>

      {/* Header */}
      <header className="pt-12 pb-8 text-center relative">
        <h1 className="text-5xl md:text-7xl font-bold mystic-font text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-300 to-pink-400 drop-shadow-lg">
          عالم الأسرار الفلكية
        </h1>
        <p className="mt-4 text-purple-200/80 text-lg md:text-xl font-light">
          اكتشف ما تخبئه لك النجوم من خلال تاريخ ميلادك
        </p>
      </header>

      <main className="container mx-auto px-4 relative z-10">
        {!user && !loading && (
          <div className="py-12">
            <BirthForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-2 border-4 border-pink-500 rounded-full border-b-transparent animate-spin-slow"></div>
            </div>
            <p className="text-2xl mystic-font text-purple-300 animate-pulse text-center">جاري استنطاق النجوم وتصوير الطالع فنيّاً...</p>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto mt-8 bg-red-900/40 border border-red-500 text-red-100 p-4 rounded-xl text-center">
            <p>{error}</p>
            <button onClick={reset} className="mt-4 underline">العودة للمحاولة</button>
          </div>
        )}

        {user && zodiacSign && !loading && (
          <div className="space-y-12 animate-fade-in-up">
            <div className="flex justify-center">
               <button 
                onClick={reset}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full border border-white/20 transition-all"
              >
                <i className="fas fa-redo ml-2"></i> تحليل تاريخ جديد
              </button>
            </div>

            {/* Zodiac Profile Card & AI Artwork */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Profile Card */}
              <div className="bg-slate-900/70 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/30 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-6 space-x-reverse mb-8">
                    <div className="text-7xl md:text-8xl p-4 bg-purple-900/40 rounded-2xl border border-purple-500/20 shadow-inner">
                      {ZODIAC_METADATA[zodiacSign].symbol}
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold text-purple-300 mystic-font">{zodiacSign}</h2>
                      <p className="text-slate-400 mt-1">{ZODIAC_METADATA[zodiacSign].dateRange}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-3 bg-purple-900/20 rounded-xl border border-purple-500/10 text-center">
                      <span className="block text-xs text-slate-500 uppercase">العنصر</span>
                      <span className="font-bold text-purple-200">{ZODIAC_METADATA[zodiacSign].element}</span>
                    </div>
                    <div className="p-3 bg-purple-900/20 rounded-xl border border-purple-500/10 text-center">
                      <span className="block text-xs text-slate-500 uppercase">النمط</span>
                      <span className="font-bold text-purple-200">{ZODIAC_METADATA[zodiacSign].modality}</span>
                    </div>
                    <div className="p-3 bg-purple-900/20 rounded-xl border border-purple-500/10 text-center">
                      <span className="block text-xs text-slate-500 uppercase">الكوكب الحاكم</span>
                      <span className="font-bold text-purple-200">{ZODIAC_METADATA[zodiacSign].ruler}</span>
                    </div>
                    <div className="p-3 bg-purple-900/20 rounded-xl border border-purple-500/10 text-center">
                      <span className="block text-xs text-slate-500 uppercase">أرقام الحظ</span>
                      <span className="font-bold text-purple-200">{ZODIAC_METADATA[zodiacSign].luckyNumbers.join(', ')}</span>
                    </div>
                  </div>

                  <p className="text-lg text-slate-300 leading-relaxed mb-6 italic">
                    "{ZODIAC_METADATA[zodiacSign].description}"
                  </p>
                </div>

                <div className="border-t border-purple-500/20 pt-6">
                  <h4 className="text-purple-300 mb-2 font-bold">التوافق المثالي:</h4>
                  <div className="flex flex-wrap gap-2">
                    {ZODIAC_METADATA[zodiacSign].compatibility.map((comp) => (
                      <span key={comp} className="bg-pink-900/30 text-pink-200 px-4 py-1 rounded-full text-sm border border-pink-500/20">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Artwork Display */}
              {zodiacImage ? (
                <ZodiacArtwork imageUrl={zodiacImage} signName={zodiacSign} />
              ) : (
                <AstrologyChart userSign={zodiacSign} />
              )}
            </div>

            {/* Visual Chart if Artwork is shown above */}
            {zodiacImage && (
              <div className="max-w-xl mx-auto">
                <AstrologyChart userSign={zodiacSign} />
              </div>
            )}

            {/* Horoscope Predictions */}
            {prediction && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-indigo-900/40 to-slate-900/70 p-8 rounded-3xl border border-indigo-500/30 shadow-xl">
                  <h3 className="text-3xl font-bold mb-6 text-indigo-300 flex items-center">
                    <i className="fas fa-star-and-crescent ml-3"></i> رسالة الكواكب لك اليوم
                  </h3>
                  <p className="text-xl text-slate-200 leading-relaxed mb-6 whitespace-pre-wrap">{prediction.daily}</p>
                  
                  <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20 flex items-start space-x-4 space-x-reverse">
                    <div className="text-yellow-400 text-2xl mt-1">
                      <i className="fas fa-lightbulb"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-300">نصيحة فلكية</h4>
                      <p className="text-slate-300 italic">{prediction.astrologicalAdvice}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-red-900/20 p-6 rounded-2xl border border-red-500/20 hover:bg-red-900/30 transition-colors">
                    <h4 className="text-xl font-bold text-red-300 mb-3 flex items-center">
                      <i className="fas fa-heart ml-2"></i> الحب والعلاقات
                    </h4>
                    <p className="text-slate-300">{prediction.love}</p>
                  </div>
                  <div className="bg-blue-900/20 p-6 rounded-2xl border border-blue-500/20 hover:bg-blue-900/30 transition-colors">
                    <h4 className="text-xl font-bold text-blue-300 mb-3 flex items-center">
                      <i className="fas fa-briefcase ml-2"></i> العمل والمال
                    </h4>
                    <p className="text-slate-300">{prediction.career}</p>
                  </div>
                  <div className="bg-emerald-900/20 p-6 rounded-2xl border border-emerald-500/20 hover:bg-emerald-900/30 transition-colors">
                    <h4 className="text-xl font-bold text-emerald-300 mb-3 flex items-center">
                      <i className="fas fa-heartbeat ml-2"></i> الصحة والعافية
                    </h4>
                    <p className="text-slate-300">{prediction.health}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Natal Analysis */}
            {natalAnalysis && (
              <div className="bg-slate-900/80 p-10 rounded-3xl border border-purple-500/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <i className="fas fa-scroll text-9xl text-purple-500"></i>
                </div>
                <h3 className="text-4xl font-bold mb-8 text-center text-purple-300 mystic-font">تحليل الخريطة الفلكية العميقة</h3>
                <div className="prose prose-invert prose-purple max-w-none text-slate-300 leading-loose">
                   {natalAnalysis.split('\n').map((para, i) => (
                     <p key={i} className="mb-4 text-lg">{para}</p>
                   ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-slate-500 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} عراف النجوم الرقمي. جميع الحقوق محفوظة للفضاء الخارجي.</p>
        <p className="mt-1">صُمم بشغف لعشاق علم الفلك والأبراج • مدعوم بـ Google Gemini</p>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default App;
