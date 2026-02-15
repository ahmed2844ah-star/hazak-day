
import React, { useState } from 'react';
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError("تعذر الاتصال بالمجموعة النجمية حالياً. يرجى المحاولة بعد قليل.");
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
    <div className="min-h-screen pb-20 relative">
      {/* Glowing Orbs for Depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-700/10 rounded-full blur-[140px]"></div>
      </div>

      <header className="pt-16 pb-12 text-center relative px-4">
        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-300 text-xs tracking-widest uppercase animate-pulse">
          Celestial Intelligence Engine
        </div>
        <h1 className="text-5xl md:text-8xl font-bold mystic-font text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
           عراف <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">النجوم</span>
        </h1>
        <p className="mt-6 text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
          نحلل لغة الأفلاك لنرسم لك خارطة طريقك الروحية والمستقبلية بدقة الذكاء الاصطناعي
        </p>
      </header>

      <main className="container mx-auto px-4 max-w-6xl relative z-10">
        {!user && !loading && (
          <div className="py-10">
            <BirthForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-40 space-y-8 animate-pulse">
            <div className="relative">
              <div className="w-32 h-32 border-4 border-purple-500/10 rounded-full"></div>
              <div className="absolute inset-0 w-32 h-32 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-4 w-24 h-24 border-4 border-pink-500 rounded-full border-b-transparent animate-spin-slow"></div>
              <i className="fas fa-magic absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl"></i>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-white mystic-font">جاري قراءة الألواح السماوية...</h3>
              <p className="text-purple-300/60 text-sm">نحن نصل بين تاريخ ميلادك وحركة الكواكب الآن</p>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto mt-12 bg-red-950/30 border border-red-500/50 text-red-100 p-8 rounded-2xl text-center backdrop-blur-md">
            <i className="fas fa-exclamation-triangle text-3xl mb-4 text-red-500"></i>
            <p className="text-lg">{error}</p>
            <button onClick={reset} className="mt-6 px-6 py-2 bg-red-500/20 hover:bg-red-500/40 rounded-full transition-all">العودة للمحاولة</button>
          </div>
        )}

        {user && zodiacSign && !loading && (
          <div className="space-y-16 animate-fade-in-up">
            <div className="flex justify-center">
               <button 
                onClick={reset}
                className="group bg-white/5 hover:bg-white/10 text-white/70 hover:text-white px-8 py-3 rounded-full border border-white/10 transition-all flex items-center gap-3"
              >
                <i className="fas fa-sparkles text-purple-400 group-hover:rotate-45 transition-transform"></i>
                تحليل روح أخرى
              </button>
            </div>

            {/* Profile & Artwork Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Profile Card */}
              <div className="lg:col-span-5 bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-8 mb-10">
                    <div className="text-8xl p-6 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-3xl border border-white/10 shadow-inner flex items-center justify-center min-w-[140px] h-[140px]">
                      {ZODIAC_METADATA[zodiacSign].symbol}
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="text-sm text-purple-400 uppercase tracking-widest mb-1 font-bold">البرج الشمسي</div>
                      <h2 className="text-5xl md:text-6xl font-bold text-white mystic-font mb-2">{zodiacSign}</h2>
                      <p className="text-slate-400 flex items-center justify-center sm:justify-start gap-2">
                        <i className="fas fa-calendar-day text-xs"></i>
                        {ZODIAC_METADATA[zodiacSign].dateRange}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center">
                      <i className="fas fa-fire text-orange-400 mb-2 opacity-50"></i>
                      <span className="text-[10px] text-slate-500 uppercase tracking-tighter">العنصر</span>
                      <span className="font-bold text-slate-200">{ZODIAC_METADATA[zodiacSign].element}</span>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center">
                      <i className="fas fa-globe text-blue-400 mb-2 opacity-50"></i>
                      <span className="text-[10px] text-slate-500 uppercase tracking-tighter">الكوكب</span>
                      <span className="font-bold text-slate-200">{ZODIAC_METADATA[zodiacSign].ruler}</span>
                    </div>
                  </div>

                  <blockquote className="relative p-6 bg-purple-500/5 rounded-2xl border-r-4 border-purple-500/50 mb-10 italic text-slate-300 leading-relaxed text-lg">
                    "{ZODIAC_METADATA[zodiacSign].description}"
                  </blockquote>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <h4 className="text-slate-400 text-xs font-bold mb-4 uppercase tracking-widest">الأرواح المتآلفة:</h4>
                  <div className="flex flex-wrap gap-2">
                    {ZODIAC_METADATA[zodiacSign].compatibility.map((comp) => (
                      <span key={comp} className="bg-white/5 hover:bg-white/10 px-5 py-2 rounded-xl text-sm border border-white/5 text-purple-200 transition-colors cursor-default">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Artwork Box */}
              <div className="lg:col-span-7">
                {zodiacImage ? (
                  <ZodiacArtwork imageUrl={zodiacImage} signName={zodiacSign} />
                ) : (
                  <div className="h-full"><AstrologyChart userSign={zodiacSign} /></div>
                )}
              </div>
            </div>

            {/* Horoscope Predictions Grid */}
            {prediction && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Daily Card */}
                <div className="lg:col-span-2 bg-gradient-to-br from-indigo-950/40 to-slate-950/80 p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
                  
                  <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-4">
                    <span className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <i className="fas fa-star"></i>
                    </span>
                    طالعك اليوم يا {user.name}
                  </h3>
                  
                  <p className="text-xl text-slate-200 leading-[1.8] mb-10 whitespace-pre-wrap relative z-10 font-light">
                    {prediction.daily}
                  </p>
                  
                  <div className="p-6 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 flex items-start gap-4">
                    <i className="fas fa-crown text-yellow-500 text-2xl mt-1"></i>
                    <div>
                      <h4 className="font-bold text-yellow-300 mb-1">حكمة النجوم</h4>
                      <p className="text-slate-300 italic">{prediction.astrologicalAdvice}</p>
                    </div>
                  </div>
                </div>

                {/* Sub Cards Column */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-red-950/20 p-8 rounded-3xl border border-red-500/10 hover:border-red-500/30 transition-all group">
                    <h4 className="text-xl font-bold text-red-300 mb-4 flex items-center gap-3">
                      <i className="fas fa-heart text-red-500/50 group-hover:scale-125 transition-transform"></i>
                      في الحب
                    </h4>
                    <p className="text-slate-400 leading-relaxed text-sm">{prediction.love}</p>
                  </div>
                  <div className="bg-blue-950/20 p-8 rounded-3xl border border-blue-500/10 hover:border-blue-500/30 transition-all group">
                    <h4 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-3">
                      <i className="fas fa-coins text-blue-500/50 group-hover:rotate-12 transition-transform"></i>
                      في المال والعمل
                    </h4>
                    <p className="text-slate-400 leading-relaxed text-sm">{prediction.career}</p>
                  </div>
                  <div className="bg-emerald-950/20 p-8 rounded-3xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all group">
                    <h4 className="text-xl font-bold text-emerald-300 mb-4 flex items-center gap-3">
                      <i className="fas fa-leaf text-emerald-500/50 group-hover:-rotate-12 transition-transform"></i>
                      في الصحة
                    </h4>
                    <p className="text-slate-400 leading-relaxed text-sm">{prediction.health}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Natal Deep Analysis */}
            {natalAnalysis && (
              <div className="bg-white/5 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                   <i className="fas fa-scroll text-[20rem] text-white"></i>
                </div>
                
                <div className="max-w-4xl mx-auto relative z-10">
                  <div className="text-center mb-12">
                    <div className="text-purple-400 text-sm font-bold uppercase tracking-[0.3em] mb-4">Secret Archives</div>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mystic-font">الخريطة الفلكية العميقة</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-6"></div>
                  </div>
                  
                  <div className="prose prose-invert max-w-none text-slate-300 leading-[2] space-y-6">
                     {natalAnalysis.split('\n').filter(p => p.trim() !== '').map((para, i) => (
                       <p key={i} className="text-lg first-letter:text-4xl first-letter:font-bold first-letter:text-purple-400">{para}</p>
                     ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Show chart at bottom if artwork was main */}
            {zodiacImage && (
              <div className="max-w-2xl mx-auto opacity-70 hover:opacity-100 transition-opacity">
                <AstrologyChart userSign={zodiacSign} />
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-32 py-10 text-center border-t border-white/5">
        <div className="flex justify-center gap-6 mb-6 text-slate-500">
           <i className="fab fa-instagram hover:text-purple-400 transition-colors cursor-pointer"></i>
           <i className="fab fa-twitter hover:text-blue-400 transition-colors cursor-pointer"></i>
           <i className="fab fa-tiktok hover:text-pink-400 transition-colors cursor-pointer"></i>
        </div>
        <p className="text-slate-500 text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} عراف النجوم الرقمي • مشروع فني مدعوم بالذكاء الاصطناعي
        </p>
      </footer>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default App;
