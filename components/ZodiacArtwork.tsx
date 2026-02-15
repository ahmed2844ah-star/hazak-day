
import React from 'react';

interface Props {
  imageUrl: string;
  signName: string;
}

const ZodiacArtwork: React.FC<Props> = ({ imageUrl, signName }) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-slate-900 rounded-3xl overflow-hidden border border-purple-500/30">
        <img 
          src={imageUrl} 
          alt={`لوحة فنية لبرج ${signName}`}
          className="w-full h-auto object-cover transform transition duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
          <p className="mystic-font text-2xl text-purple-200 drop-shadow-lg">
            تجلي برج {signName} في الملكوت
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZodiacArtwork;
