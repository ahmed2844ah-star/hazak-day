
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
    <div className="max-w-md mx-auto bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-purple-500/30 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center mystic-font text-purple-300">اكتشف مصيرك الفلكي</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-purple-200">الاسم الكريم</label>
          <input
            type="text"
            required
            className="w-full bg-slate-800 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-500"
            placeholder="مثال: أحمد"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-purple-200">تاريخ الميلاد</label>
          <input
            type="date"
            required
            className="w-full bg-slate-800 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-purple-200">ساعة الميلاد (اختياري)</label>
            <input
              type="time"
              className="w-full bg-slate-800 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              value={formData.birthTime}
              onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-purple-200">مكان الميلاد (اختياري)</label>
            <input
              type="text"
              className="w-full bg-slate-800 border border-purple-500/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-500"
              placeholder="مثال: القاهرة"
              value={formData.birthLocation}
              onChange={(e) => setFormData({ ...formData, birthLocation: e.target.value })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105 active:scale-95"
        >
          كشف الأسرار
        </button>
      </form>
    </div>
  );
};

export default BirthForm;
