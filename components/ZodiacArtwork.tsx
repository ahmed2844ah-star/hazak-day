
import React from 'react';

interface Props {
  imageUrl: string;
  signName: string;
}

const ZodiacArtwork: React.FC<Props> = ({ imageUrl, signName }) => {
  return (
    <div className="relative group max-w-2xl mx-auto lg:mx-0 h-full">
      {/* Outer Glow */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600/40 via-pink-600/40 to-blue-600/40 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-70 transition duration-1000"></div>
      
      <div className="relative h-full bg-slate-900 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col">
        <div className="relative flex-grow overflow-hidden">
          <img 
            src={imageUrl} 
            alt={`لوحة فنية لبرج ${signName}`}
            className="w-full h-full object-cover transform transition duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
          
          {/* Animated Overlay Details */}
          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] text-white/70 uppercase tracking-widest">
            AI Generated • Cosmic Art
          </div>
        </div>

        <div className="bg-slate-950/80 backdrop-blur-md p-6 border-t border-white/5">
          <h3 className="mystic-font text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 text-center drop-shadow-sm">
            تمجيد برج {signName}
          </h3>
          <p className="text-center text-slate-400 text-xs mt-2 italic">رؤية فنية مستوحاة من اصطفاف النجوم في لحظة ميلادك</p>
        </div>
      </div>
    </div>
  );
};

export default ZodiacArtwork;
