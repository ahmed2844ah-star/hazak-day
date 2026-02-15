
import React, { useState } from 'react';
import { UserInfo } from '../types';

interface Props {
  onSubmit: (info: UserInfo) => void;
}

const BirthForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserInfo>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.birthDate) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white/5 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_0_50px_rgba(147,51,234,0.15)] border border-white/10 animate-fade-in relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
      
      <div className="text-center mb-10">
        <i className="fas fa-moon text-4xl text-purple-400 mb-4 animate-bounce"></i>
        <h2 className="text-4xl font-bold mb-2 mystic-font text-white tracking-wide">بوابة العراف</h2>
        <p className="text-purple-200/60 text-sm">أدخل بيانات ميلادك لفك شفرة النجوم</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-purple-300/80 mr-1">الاسم الكريم</label>
          <div className="relative">
            <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-purple-500/50"></i>
            <input
              type="text"
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-slate-600 transition-all"
              placeholder="كيف نناديك؟"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-purple-300/80 mr-1">يوم ولدت</label>
          <div className="relative">
            <i className="fas fa-calendar-alt absolute left-4 top-1/2 -translate-y-1/2 text-purple-500/50"></i>
            <input
              type="date"
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white transition-all [color-scheme:dark]"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-purple-300/80 mr-1">ساعة الميلاد</label>
            <input
              type="time"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white transition-all [color-scheme:dark]"
              value={formData.birthTime}
              onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-purple-300/80 mr-1">محل الميلاد</label>
            <input
              type="text"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-slate-600 transition-all"
              placeholder="المدينة"
              value={formData.birthLocation}
              onChange={(e) => setFormData({ ...formData, birthLocation: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-700 text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_-10px_rgba(147,51,234,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(147,51,234,0.6)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 overflow-hidden group"
        >
          <span className="relative z-10">كشف الحجب وقراءة الطالع</span>
          <i className="fas fa-magic text-sm animate-pulse relative z-10"></i>
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </button>
      </form>
    </div>
  );
};

export default BirthForm;
